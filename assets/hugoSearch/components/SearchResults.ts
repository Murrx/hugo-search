import { requestResultsStore } from "../eventHelper";
import { QueryData } from "../types/SearchStore.type";
import ResultCard from "./ResultCard";

export default class SearchResults extends HTMLElement {
  private _template = document.createElement("template");

  constructor() {
    super();
  }
  connectedCallback() {
    let resultsStore = requestResultsStore(this);
    resultsStore.subscribe(this.onResultsChange);
    this.appendChild(this._template.content.cloneNode(true));
  }

  onResultsChange = (data: QueryData[]) => {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    data &&
      data.forEach((result: QueryData) => {
        let card = new ResultCard({
          name: result.name,
          category: result.category,
          sub_category: result.sub_category,
          uri: result.uri,
        });
        this.appendChild(card);
      });
  };
}
