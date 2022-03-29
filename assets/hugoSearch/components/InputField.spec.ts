import { StoreFactory } from "../store";
import { injectQueryStore } from "../testHelpers/Dependecies";
import { Store } from "../types/SearchStore.type";
import InputField from "./InputField";

describe("InputField", () => {
  window.customElements.define("hs-input", InputField);
  let hsInput: HTMLElement;
  let queryStore: Store<string>;
  let input: HTMLInputElement;

  beforeEach(() => {
    queryStore = StoreFactory.create<string>("");
    hsInput = document.createElement("hs-input");

    input = hsInput.shadowRoot.firstChild as HTMLInputElement;
    injectQueryStore(queryStore);
    document.body.appendChild(hsInput);
  });

  it("sets its value when the value of the querystore changes", () => {
    queryStore.value = "newValue";
    expect(input.value).toBe("newValue");
  });
});
