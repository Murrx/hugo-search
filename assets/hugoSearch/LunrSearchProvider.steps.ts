import { defineFeature, loadFeature } from "jest-cucumber";
import { LunrSearchProvider } from "./LunrSearchProvider";

const storeFeature = loadFeature(
  "./assets/hugoSearch/features/LunrSearchProvider.feature"
);

defineFeature(storeFeature, (test) => {
  let provider: LunrSearchProvider;
  let resultsStore = { value: [], subscribe: jest.fn() };
  let queryStore = { value: "", subscribe: jest.fn() };

  const givenAnInstanceOfLunrSearchProvider = (given: any) => {
    given("an instance of LunrSearchProvider", () => {
      provider = new LunrSearchProvider(resultsStore, queryStore);
      provider.index.search = jest.fn();
      provider.initialize = jest.fn();
    });
  };
  const whenSearchIsCalledWithValue = (when: any) => {
    when(/^search is called with "(.*)"$/, async (query) => {
      await provider.search(query);
    });
  };
  test("Search function", ({ given, when, then }) => {
    givenAnInstanceOfLunrSearchProvider(given);
    whenSearchIsCalledWithValue(when);
    then(/^index.search is called with "(.*)"$/, (value) => {
      expect(provider.index.search).toBeCalledWith(value);
    });
  });

  test("Search function empty query", ({ given, when, then }) => {
    givenAnInstanceOfLunrSearchProvider(given);
    whenSearchIsCalledWithValue(when);
    then("index.search is not called", () => {
      expect(provider.index.search).toHaveBeenCalledTimes(0);
    });
  });
});
