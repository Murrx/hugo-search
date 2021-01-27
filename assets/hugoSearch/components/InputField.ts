import { requestQueryStore } from "../eventHelper";
import { InputController, Store } from "../types/SearchStore.type";

export default class HugoSearchInput
  extends HTMLElement
  implements InputController {
  private inputElement!: HTMLInputElement;
  private queryStore: Store<string>;

  constructor() {
    super();
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
    this.inputElement = this.firstElementChild as HTMLInputElement;
    if (this.inputElement) {
      this.inputElement.focus();
    } else {
      throw new Error(
        "No child element found. Please insert an HTMLInputElement as child of the HugoSearchInput component"
      );
    }
    this.queryStore.subscribe(this.onQueryChange);

    this.inputElement.addEventListener(
      "keypress",
      function (event: { key: string }) {
        if (event.key === "Enter") {
          this.queryStore.value = this.value;
        }
      }.bind(this)
    );
  }
}
