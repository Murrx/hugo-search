import { requestQueryStore } from "../eventHelper";
import { InputController, Store } from "../types/SearchStore.type";

export default class HugoSearchInput
  extends HTMLElement
  implements InputController
{
  private inputElement!: HTMLInputElement;
  private queryStore: Store<string>;

  private _template = document.createElement("template");
  // todo: maybe provide a default for the slot?
  private _innerHTML = `<slot name="input"></slot>`;

  constructor() {
    super();
    this._template.innerHTML = this._innerHTML;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this._template.content.cloneNode(true));
    this.inputElement = this.shadowRoot.firstChild as HTMLInputElement;
  }

  get value() {
    return this.inputElement?.value;
  }
  set value(val: string) {
    this.inputElement.value = val;
  }

  onQueryChange = (newValue: string) => {
    if (this.value !== newValue) {
      this.value = newValue;
    }
  };

  connectedCallback() {
    this.queryStore = requestQueryStore(this);
    this.queryStore.subscribe(this.onQueryChange);

    this.shadowRoot.addEventListener("slotchange", (event) => {
      this.inputElement = event.target.assignedElements()[0];
      if (this.inputElement) {
        console.log(this.inputElement);
        this.inputElement.focus();
      }
      this.inputElement.addEventListener(
        "keypress",
        function (event: { key: string }) {
          if (event.key === "Enter") {
            this.queryStore.value = this.value;
          }
        }.bind(this)
      );
    });
  }
}
