import { queryStore } from "../CompositionRoot";
import { InputController } from "../types/SearchStore.type";

export default class HugoSearchInput
  extends HTMLElement
  implements InputController {
  inputElement!: HTMLInputElement;

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
    // todo: this needs IOC
    this.inputElement = this.firstElementChild as HTMLInputElement;
    if (this.inputElement) {
      this.inputElement.focus();
    } else {
      throw new Error(
        "No child element found. Please insert an HTMLInputElement as child of the HugoSearchInput component"
      );
    }
    queryStore.subscribe(this.onQueryChange);

    this.inputElement.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        // todo: this needs IOC
        queryStore.value = this.value;
      }
    });
  }
}
