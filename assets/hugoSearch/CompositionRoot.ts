import { LunrSearchProvider } from "./LunrSearchProvider";
import { QueryParamController } from "./QueryParamController";
import { StoreFactory } from "./store";
import { messages } from "./HugoConfig";
import {
  MessagesConfig,
  QueryData,
  RequestInstanceEvent,
  Store,
} from "./types/SearchStore.type";

export const resultsStore = StoreFactory.create<QueryData[]>([]);
export const queryStore = StoreFactory.create<string>("");

export const searchProvider = new LunrSearchProvider(resultsStore, queryStore);
export const queryParamController = new QueryParamController(queryStore);

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
