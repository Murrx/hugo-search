export default class ResultCard extends HTMLElement {
  private _template = document.createElement("template");

  private _name: any;
  private _category: any;
  private _sub_category: any;
  private _uri: any;

  constructor(attributes: {
    name: string;
    category: string;
    sub_category: string;
    uri: string;
  }) {
    super();
    this._name = attributes.name;
    this._category = attributes.category;
    this._sub_category = attributes.sub_category;
    this._uri = attributes.uri;

    this._template.innerHTML = `
    <style>
    .search-result {
      padding: 1em;
      border: 1px solid black;
      height: 350px;
      text-align: left;
    }
    </style>

    <a href=${this._uri}>
      <div class="search-result">
        <h2>${this._name}</h2>
        <h3>${this._category}</h3>
        <p>${this._sub_category}</p>
      </div>
    </a>`;
  }

  connectedCallback() {
    this.appendChild(this._template.content.cloneNode(true));
  }
}
