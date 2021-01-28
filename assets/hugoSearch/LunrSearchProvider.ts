import lunr from "lunr";
import { QueryData, Store } from "./types/SearchStore.type";

export class LunrSearchProvider {
  private searchStore: Store<QueryData[]>;
  private queryStore: Store<string>;
  private isInitialized: boolean = false;
  private searchFieds: string[];

  // todo: see if we can use lunr.Index Build or Load.
  // todo: should be private
  public index: lunr.Index;
  // todo: rename type QueryData to HugoSearchData
  private searchData: QueryData[];
  private queryDataMap: Map<string, QueryData>;
  private searchCollection: string;

  constructor(
    searchStore: Store<QueryData[]>,
    queryStore: Store<string>,
    searchFields: string[],
    searchCollection: string
  ) {
    this.searchCollection = searchCollection;
    this.searchFieds = searchFields;
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
  public async initialize(): Promise<void> {
    const res = await fetch(`/${this.searchCollection}/index.json`);
    if (res.status == 404) {
      console.log(`/${this.searchCollection}/index.json not found`);
      this.searchData = [];
    } else {
      this.searchData = await res.json();
    }
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
      this.searchStore.value = result.map((r) => this.queryDataMap.get(r.ref));
    } else {
      this.searchStore.value = [];
    }
  }

  private config(data: QueryData[]) {
    this.searchData = data;
    this.queryDataMap = new Map(data.map((key) => [key.uri, key]));
    // should use IOC to remove this dependency on lunr
    let searchFields = this.searchFieds;
    this.index = lunr(function () {
      this.ref("uri");
      searchFields.forEach((field: string) => {
        this.field(field);
      }, this);
      data.forEach((d) => {
        this.add(d);
      }, this);
    });
  }
}
