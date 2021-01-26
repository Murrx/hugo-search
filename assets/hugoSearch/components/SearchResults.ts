import { requestResultsStore } from "../eventHelper";
import { QueryData } from "../types/SearchStore.type";

export default class SearchResults extends HTMLElement {
  private _templateElement = document.createElement("template");
  private template: { parts: string[]; args: RegExpMatchArray } = {
    parts: [],
    args: [],
  };

  constructor() {
    super();
  }

  connectedCallback() {
    let template = this.getElementsByTagName("template")[0];
    this.parseTemplate(template.innerHTML);
    let resultsStore = requestResultsStore(this);
    resultsStore.subscribe(this.onResultsChange);
    this.appendChild(this._templateElement.content.cloneNode(true));
  }

  onResultsChange = (data: QueryData[]) => {
    this.render(data);
  };

  render(results: QueryData[]) {
    this._templateElement.innerHTML = results
      .map(function (result) {
        return this.renderFromTemplate(result);
      }, this)
      .join("");
  }

  parseTemplate(str: string) {
    this.template.parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ]*\}/);
    this.template.args = str.match(/[^{\}]+(?=})/g) || [];
  }

  renderFromTemplate(result: QueryData) {
    let parameters = this.template.args.map((argument) =>
      result[argument] === undefined ? "" : result[argument]
    );
    return String.raw({ raw: this.template.parts }, ...parameters);
  }
}
