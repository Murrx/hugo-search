import {
  requestMessagesConfig,
  requestQueryStore,
  requestResultsStore,
} from "../eventHelper";
import { messages } from "../HugoConfig";
import { QueryData, Store } from "../types/SearchStore.type";

export default class ResultCard extends HTMLElement {
  private messages;
  private _template = document.createElement("template");
  private queryStore: Store<string>;
  private resultsStore: Store<QueryData[]>;
  private query: string = "";
  private results: QueryData[] = [];

  private message;

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
      this.message = this.messages.welcomeMsg;
    } else if (this.results.length === 0) {
      this.message = this.messages.emptyResultsMsg;
    } else {
      this.message = this.messages.successMsg;
    }
    this._template.innerHTML = `<p id="message">${this.message}</p>`;
    this.replaceChild(this._template.content.cloneNode(true), this.firstChild!);
  }

  constructor() {
    super();
    this.messages = requestMessagesConfig();
    this.queryStore = requestQueryStore();
    this.resultsStore = requestResultsStore();

    this.message = messages.welcomeMsg;
    this._template.innerHTML = `<p id="message">${this.message}</p>`;
  }

  connectedCallback() {
    this.appendChild(this._template.content.cloneNode(true));
    this.queryStore.subscribe(this.onQueryChange);
    this.resultsStore.subscribe(this.onResultsChange);
  }
}
