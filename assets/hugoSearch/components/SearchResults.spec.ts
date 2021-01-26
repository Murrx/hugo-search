import { StoreFactory } from "../store";
import { injectResultsStore } from "../testHelpers/Dependecies";
import { Store, QueryData } from "../types/SearchStore.type";
import SearchResults from "./SearchResults";
import ResultCard from "./ResultCard";

describe("SearchResults component", () => {
  window.customElements.define("hs-results", SearchResults);
  window.customElements.define("hs-result", ResultCard);

  let element: HTMLElement;
  let resultsStore: Store<QueryData[]>;
  beforeEach(() => {
    resultsStore = StoreFactory.create<QueryData[]>([]);
    injectResultsStore(resultsStore);

    element = document.createElement("hs-results");
    document.body.appendChild(element);
  });

  describe("rendering results", () => {
    test("is empty when there are no results", () => {
      expect(element.childNodes.length).toBe(0);
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
      expect(element.children.length).toBe(1);
    });
  });
});
