import lunr from "lunr";
import { QueryData, Store } from "./types/SearchStore.type";

export class LunrSearchProvider {
  private searchStore: Store<QueryData[]>;
  private queryStore: Store<string>;
  private isInitialized: boolean = false;

  // todo: see if we can use lunr.Index Build or Load.
  // todo: this should be private
  public index: lunr.Index;
  // todo: rename type QueryData to HugoSearchData
  private searchData: QueryData[];
  private queryDataMap: Map<string, QueryData>;

  constructor(searchStore: Store<QueryData[]>, queryStore: Store<string>) {
    this.queryStore = queryStore;
    this.queryStore.subscribe(this.onQueryChange);
    this.searchStore = searchStore;
    // todo: find cleaner way to initialize lunr
    this.index = lunr(function () {});
    this.searchData = [];
    this.queryDataMap = new Map<string, QueryData>();
  }

  onQueryChange = (query: string) => {
    this.search(query);
  };

  // todo: should be private
  async initialize(): Promise<void> {
    // todo: make the json file configurable
    const res = await fetch("/entities/index.json");
    this.searchData = await res.json();
    this.config(this.searchData);
    this.isInitialized = true;
  }

  async search(query: string): Promise<void> {
    // todo: test -> what happens when search gets called when with an empty query?
    if (!this.isInitialized) {
      await this.initialize();
    }
    if (query) {
      let result = [...new Set(this.index.search(query))];
      this.searchStore.value = result.map((r) => this.queryDataMap.get(r.ref)!);
    } else {
      this.searchStore.value = [];
    }
  }

  private config(data: QueryData[]) {
    this.searchData = data;
    this.queryDataMap = new Map(data.map((key) => [key.uri, key]));
    // should use IOC to remove this dependency on lunr
    this.index = lunr(function () {
      this.ref("uri");
      this.field("category");
      this.field("name");
      this.field("sub_category");
      this.field("location");
      data.forEach((d) => {
        this.add(d);
      }, this);
    });
  }
}
