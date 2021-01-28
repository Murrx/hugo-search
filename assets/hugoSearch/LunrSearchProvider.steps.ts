import { LunrSearchProvider } from "./LunrSearchProvider";

describe("Store", () => {
  let provider: LunrSearchProvider;
  let resultsStore = { value: [], subscribe: jest.fn() };
  let queryStore = { value: "", subscribe: jest.fn() };

  beforeEach(() => {
    provider = new LunrSearchProvider(
      resultsStore,
      queryStore,
      ["title", "description"],
      "posts"
    );
    provider.index.search = jest.fn();
    provider.initialize = jest.fn();
  });

  it("calls provider.index.search", async () => {
    await provider.search("test");
    expect(provider.index.search).toBeCalledWith("test");
  });

  test("does not search when called with empty string", async () => {
    await provider.search("");
    expect(provider.index.search).toHaveBeenCalledTimes(0);
  });
});
