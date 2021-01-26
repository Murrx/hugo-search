import { StoreFactory } from "../store";
import { injectQueryStore } from "../testHelpers/Dependecies";
import { Store } from "../types/SearchStore.type";
import InputField from "./InputField";

describe("InputField", () => {
  window.customElements.define("hs-input", InputField);
  let element: HTMLElement;
  let queryStore: Store<string>;

  beforeEach(() => {
    queryStore = StoreFactory.create<string>("");
    element = document.createElement("hs-input");
    element.innerHTML = `<input></input>`;
    injectQueryStore(queryStore);
    document.body.appendChild(element);
  });

  test("basic", () => {
    expect(1).toBe(1);
  });
});
