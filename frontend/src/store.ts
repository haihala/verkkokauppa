import { Item } from "./models";

export class Store {
  backend_base_url: string;
  items: Item[];

  constructor(backend: string) {
    this.backend_base_url = backend;

    this.items = [];

    // Awaiting can't be done in the constructor
    this.populate();
  }

  async get<T>(endpoint: string): Promise<T> {
    const request = await fetch(`http://${this.backend_base_url}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Control-Allow-Origin": "*",
      },
    });
    return request.json();
  }

  async populate() {
    this.items = await this.get<Item[]>("items");
  }
}
