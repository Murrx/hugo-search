import { LunrSearchProvider } from "./LunrSearchProvider";
import { QueryParamController } from "./QueryParamController";
import { StoreFactory } from "./store";
import {
  HugoSearchConfig,
  MessagesConfig,
  QueryData,
  RequestInstanceEvent,
  Store,
} from "./types/SearchStore.type";

export namespace CompositionRoot {
  export function init(config: HugoSearchConfig) {
    const resultsStore = StoreFactory.create<QueryData[]>([]);
    const queryStore = StoreFactory.create<string>("");

    const searchProvider = new LunrSearchProvider(
      resultsStore,
      queryStore,
      config.fields,
      config.sections
    );
    const queryParamController = new QueryParamController(queryStore);

    window.addEventListener("MessagesConfig", (e: Event) => {
      let messagesConfigEvent = e as RequestInstanceEvent<MessagesConfig>;
      messagesConfigEvent.detail.instance = config.messages;
    });

    window.addEventListener("Store<string>", (e: Event) => {
      let queryStoreEvent = e as RequestInstanceEvent<Store<string>>;
      queryStoreEvent.detail.instance = queryStore;
    });

    window.addEventListener("Store<QueryData[]>", (e: Event) => {
      let resultsStoreEvent = e as RequestInstanceEvent<Store<QueryData[]>>;
      resultsStoreEvent.detail.instance = resultsStore;
    });
  }
}
