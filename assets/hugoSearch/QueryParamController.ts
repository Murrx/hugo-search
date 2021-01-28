import { InputController, Store } from "./types/SearchStore.type";
export class QueryParamController implements InputController {
  private queryStore: Store<string>;

  constructor(store: Store<string>) {
    this.queryStore = store;
    this.queryStore.subscribe(this.onQueryChange);

    if (this.value) {
      this.queryStore.value = this.value;
    }

    window.onpopstate = function () {
      this.value = this.queryParam;
    }.bind(this);
  }

  set value(value: string) {
    this.queryParam = value;
    this.queryStore.value = value;
  }

  get value() {
    return this.queryParam;
  }

  private get queryParam() {
    return decodeURIComponent(window.location.hash.slice(1));
  }

  private set queryParam(value: string) {
    window.location.hash = value;
  }

  onQueryChange = (newValue: string): void => {
    if (this.value !== newValue) {
      this.value = newValue;
    }
  };

  destroy() {
    window.onpopstate = null;
    window.location.hash = "";
  }
}
