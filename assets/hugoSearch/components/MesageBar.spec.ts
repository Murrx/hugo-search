import { StoreFactory } from "../store";
import {
  MessagesConfig,
  QueryData,
  RequestInstanceEvent,
  Store,
} from "../types/SearchStore.type";
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

    window.addEventListener("MessagesConfig", (e: Event) => {
      let messagesConfigEvent = e as RequestInstanceEvent<MessagesConfig>;
      messagesConfigEvent.detail.instance = messages;
    });

    window.addEventListener("Store<string>", (e: Event) => {
      let queryStoreEvent = e as RequestInstanceEvent<Store<string>>;
      queryStoreEvent.detail.instance = queryStore;
    });

    window.addEventListener("Store<QueryData[]>", (e: Event) => {
      let resultsStoreEvent = e as RequestInstanceEvent<Store<QueryData[]>>;
      resultsStoreEvent.detail.instance = resultsStore;
    });

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
