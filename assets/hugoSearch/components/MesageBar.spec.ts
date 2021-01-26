import { StoreFactory } from "../store";
import {
  injectMessagesConfig,
  injectQueryStore,
  injectResultsStore,
} from "../testHelpers/Dependecies";
import { MessagesConfig, QueryData, Store } from "../types/SearchStore.type";
import MessageBar from "./MessageBar";

describe("MessageBar", () => {
  window.customElements.define("hs-message", MessageBar);
  let element: HTMLElement;
  let messages: MessagesConfig;
  let queryStore: Store<string>;
  let resultsStore: Store<QueryData[]>;

  beforeEach(() => {
    messages = {
      welcomeMsg: "welcome",
      emptyResultsMsg: "no results",
      successMsg: "success",
    };
    queryStore = StoreFactory.create<string>("");
    resultsStore = StoreFactory.create<QueryData[]>([]);
    injectMessagesConfig(messages);
    injectQueryStore(queryStore);
    injectResultsStore(resultsStore);

    element = document.createElement("hs-message");
    document.body.appendChild(element);
  });
  describe("Message", () => {
    test("when rendered the welcome message shows", () => {
      expect(element.firstChild.textContent).toBe(messages.welcomeMsg);
    });
    test("when query is set and results are empty the noResultsMessage shows", () => {
      queryStore.value = "test";
      expect(element.firstChild.textContent).toBe(messages.emptyResultsMsg);
    });

    test("when query is set and there are results the successMessage shows", () => {
      queryStore.value = "test";
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
      expect(element.firstChild.textContent).toBe(messages.successMsg);
    });
  });
});
