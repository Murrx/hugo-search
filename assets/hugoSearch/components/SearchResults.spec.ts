import { StoreFactory } from "../store";
import { injectResultsStore } from "../testHelpers/Dependecies";
import { Store, QueryData } from "../types/SearchStore.type";
import SearchResults from "./SearchResults";

describe("SearchResults component", () => {
  window.customElements.define("hs-results", SearchResults);

  let element: HTMLElement;
  let resultsStore: Store<QueryData[]>;
  beforeEach(() => {
    resultsStore = StoreFactory.create<QueryData[]>([]);
    injectResultsStore(resultsStore);

    element = document.createElement("hs-results");
    element.innerHTML = `
    <template>
      <p>test</p>
    </template>`;
    document.body.appendChild(element);
  });

  describe("rendering results", () => {
    test("is empty when there are no results", () => {
      expect(
        element.getElementsByTagName("template")[0].childElementCount
      ).toBe(0);
    });
    test("renders a resultsCard for each result", () => {
      resultsStore.value = [
        {
          category: "test",
          ref: 1,
          name: "test",
          uri: "test",
          sub_category: "test",
          tags: [],
        },
      ];
      // todo: make this test more resilient
      expect(element.getElementsByTagName("template")[0].innerHTML.trim()).toBe(
        "<p>test</p>"
      );
    });
  });
});
