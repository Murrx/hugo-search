import { queryStore, resultsStore } from "../CompositionRoot";
import { QueryData, Store } from "../types/SearchStore.type";

// todo: make messages configurable
const welcomeMsg =
  "Welcome to Search-Salone. Please use the search box to find what you are looking for";
const emptyResultsMsg = "No results found... Please search for something else";
const successMsg = "Search Salone proudly presents you these results";

export default class ResultCard extends HTMLElement {
  private _template = document.createElement("template");
  private queryStore: Store<string>;
  private resultsStore: Store<QueryData[]>;
  private query: string = "";
  private results: QueryData[] = [];

  private message = welcomeMsg;

  onQueryChange = (query: string) => {
    this.query = query;
    this.refreshMessage();
  };

  onResultsChange = (results: QueryData[]) => {
    this.results = results;
    this.refreshMessage();
  };

  refreshMessage() {
    if (this.query === "") {
      this.message = welcomeMsg;
    } else if (this.results.length === 0) {
      this.message = emptyResultsMsg;
    } else {
      this.message = successMsg;
    }
    this._template.innerHTML = `<p id="message">${this.message}</p>`;
    this.replaceChild(this._template.content.cloneNode(true), this.firstChild!);
  }

  constructor() {
    super();
    // todo: apply IOC
    this.queryStore = queryStore;
    this.resultsStore = resultsStore;
    this._template.innerHTML = `<p id="message">${this.message}</p>`;
  }

  connectedCallback() {
    this.appendChild(this._template.content.cloneNode(true));
    this.queryStore.subscribe(this.onQueryChange);
    this.resultsStore.subscribe(this.onResultsChange);
  }
}
