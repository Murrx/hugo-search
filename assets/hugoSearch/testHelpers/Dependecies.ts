import {
  MessagesConfig,
  QueryData,
  RequestInstanceEvent,
  Store,
} from "../types/SearchStore.type";

export function injectMessagesConfig(messages: MessagesConfig): void {
  window.addEventListener("MessagesConfig", (e: Event) => {
    let messagesConfigEvent = e as RequestInstanceEvent<MessagesConfig>;
    messagesConfigEvent.detail.instance = messages;
  });
}

export function injectQueryStore(store: Store<string>): void {
  window.addEventListener("Store<string>", (e: Event) => {
    let queryStoreEvent = e as RequestInstanceEvent<Store<string>>;
    queryStoreEvent.detail.instance = store;
  });
}

export function injectResultsStore(store: Store<QueryData[]>): void {
  window.addEventListener("Store<QueryData[]>", (e: Event) => {
    let resultsStoreEvent = e as RequestInstanceEvent<Store<QueryData[]>>;
    resultsStoreEvent.detail.instance = store;
  });
}
