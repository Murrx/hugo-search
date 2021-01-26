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
    // todo: how to handle cases where no template is present?
    let template = this.getElementsByTagName("template")[0];
    this.parseTemplate(template.innerHTML);
    let resultsStore = requestResultsStore(this);
    resultsStore.subscribe(this.onResultsChange);
  }

  onResultsChange = (data: QueryData[]) => {
    // todo: figure out why results change twice, on initial pageload
    this.render(data);
  };

  render(results: QueryData[]) {
    this._templateElement.innerHTML = results
      .map(function (result) {
        return this.renderFromTemplate(result);
      }, this)
      .join("");
    while (this.firstChild) {
      this.removeChild(this.lastChild);
    }
    this.appendChild(this._templateElement.content);
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
