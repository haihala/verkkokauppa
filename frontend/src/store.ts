import { makeAutoObservable, runInAction } from "mobx";
import { Buffer } from "buffer";

import { Cat, Item } from "./models";

export class Store {
  backend_base_url: string;
  items: Item[];
  cats: Cat[];

  // TODO: Could store theses in localstorage to persist over reloads
  username?: string;
  password?: string;
  action_after_login?: { action: "adoption"; data: any };

  constructor(backend: string) {
    this.backend_base_url = backend;

    this.items = [];
    this.cats = [];

    makeAutoObservable(this);
  }

  public login = (username: string, password: string) => {
    runInAction(() => {
      this.username = username;
      this.password = password;
    });

    switch (this.action_after_login?.action) {
      case "adoption":
        this.adopt(this.action_after_login.data);
        break;
      default:
        console.error("Unhandled action");
        break;
    }

    runInAction(() => {
      this.action_after_login = undefined;
    });
  };

  get logged_in() {
    return this.username !== undefined && this.password !== undefined;
  }

  get prompt_for_login() {
    return !!this.action_after_login;
  }

  get credentials() {
    // This will base64 encode the username and password, which is required for basic auth.
    return Buffer.from(`${this.username}:${this.password}`, "binary").toString(
      "base64"
    );
  }

  async request<T>(method: string, endpoint: string): Promise<T> {
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept-Control-Allow-Origin": "*",
    };

    if (this.logged_in) {
      headers["Authorization"] = `Basic ${this.credentials}`;
    }

    const request = await fetch(`http://${this.backend_base_url}/${endpoint}`, {
      method,
      headers,
    });
    return await request.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return await this.request("GET", endpoint);
  }

  async post<T>(endpoint: string): Promise<T> {
    return await this.request("POST", endpoint);
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

  public async adopt(cat_id: string) {
    // TODO: Proper query param handling
    if (this.logged_in) {
      await this.post(`adopt?uuid=${cat_id}`);
      runInAction(() => {
        this.cats = this.cats.filter((cat) => cat.id !== cat_id);
      });
    } else {
      this.action_after_login = { action: "adoption", data: cat_id };
    }
  }
}
