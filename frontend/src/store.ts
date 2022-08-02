import { makeAutoObservable } from "mobx";

import { Cat, Item } from "./models";

export class Store {
  backend_base_url: string;
  items: Item[];
  cats: Cat[];

  constructor(backend: string) {
    this.backend_base_url = backend;

    this.items = [];
    this.cats = [];

    makeAutoObservable(this);
  }

  async get<T>(endpoint: string): Promise<T> {
    const request = await fetch(`http://${this.backend_base_url}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Control-Allow-Origin": "*",
      },
    });
    return await request.json();
  }

  // Awaiting can't be done in the constructor
  public async populate() {
    this.items = await this.get<Item[]>("items");
    this.cats = await this.get<Cat[]>("cats");
  }
}
