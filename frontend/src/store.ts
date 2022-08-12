import { makeAutoObservable, runInAction } from "mobx";
import { Buffer } from "buffer";

import { Cat, Item } from "./models";

export class Store {
  backendBaseUrl: string;
  items: Item[];
  cats: Cat[];

  // TODO: Could store theses in localstorage to persist over reloads
  username?: string;
  password?: string;
  cart: Record<string, number>;

  actionAfterLogin?: () => void;

  constructor(backend: string) {
    this.backendBaseUrl = backend;

    this.items = [];
    this.cats = [];
    this.cart = {};

    makeAutoObservable(this);
  }

  public login = (username: string, password: string) => {
    runInAction(() => {
      this.username = username;
      this.password = password;
    });

    if (this.actionAfterLogin) {
      this.actionAfterLogin();
    } else {
      console.error("Undefined action after login");
    }

    runInAction(() => {
      this.actionAfterLogin = undefined;
    });
  };

  public cancelLogin = () => {
    runInAction(() => {
      this.username = undefined;
      this.password = undefined;
      this.actionAfterLogin = undefined;
    });
  };

  get loggedIn() {
    return this.username !== undefined && this.password !== undefined;
  }

  get promptForLogin() {
    return !!this.actionAfterLogin;
  }

  get credentials() {
    // This will base64 encode the username and password, which is required for basic auth.
    return Buffer.from(`${this.username}:${this.password}`, "binary").toString(
      "base64"
    );
  }

  async request<T>(
    method: string,
    endpoint: string,
    body?: string
  ): Promise<T> {
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept-Control-Allow-Origin": "*",
    };

    if (this.loggedIn) {
      headers["Authorization"] = `Basic ${this.credentials}`;
    }

    const request = await fetch(`http://${this.backendBaseUrl}/${endpoint}`, {
      method,
      headers,
      body,
    });
    return await request.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return await this.request("GET", endpoint);
  }

  async post<T>(endpoint: string, json?: string): Promise<T> {
    return await this.request("POST", endpoint, json);
  }

  // Awaiting can't be done in the constructor
  public async populate() {
    const items = await this.get<Item[]>("items");
    const cats = await this.get<Cat[]>("cats");
    runInAction(() => {
      this.items = items;
      this.cats = cats;
    });
  }

  public async adopt(catId: string) {
    // TODO: Proper query param handling
    if (this.loggedIn) {
      await this.post(`adopt?uuid=${catId}`);
      runInAction(() => {
        this.cats = this.cats.filter((cat) => cat.id !== catId);
      });
    } else {
      this.actionAfterLogin = () => {
        this.adopt(catId);
      };
    }
  }

  get cartTotal() {
    return Object.entries(this.cart)
      .map(
        ([itemId, amount]) =>
          (this.items.find((item) => item.id === itemId)?.price || 0) * amount
      )
      .reduce((a, b) => a + b, 0)
      .toFixed(2);
  }

  public addToCart(itemId: string) {
    if (itemId in this.cart) {
      this.cart[itemId]++;
    } else {
      this.cart[itemId] = 1;
    }
  }

  public async order() {
    if (this.loggedIn) {
      const cart = Object.entries(this.cart).map(([id, amount]) => {
        return { product: id, amount };
      });

      if (cart.length > 0) {
        await this.post("buy", JSON.stringify(cart));
        runInAction(() => {
          this.cart = {};
        });
      }
    } else {
      this.actionAfterLogin = () => {
        this.order();
      };
    }
  }
}
