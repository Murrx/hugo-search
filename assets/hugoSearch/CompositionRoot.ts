import { LunrSearchProvider } from "./LunrSearchProvider";
import { QueryParamController } from "./QueryParamController";
import { StoreFactory } from "./store";
import { QueryData } from "./types/SearchStore.type";

// todo: this should move elsewhere since the implementation details of the store are n
//       the concern of the compositionRoot
export const resultsStore = StoreFactory.create<QueryData[]>([]);
export const queryStore = StoreFactory.create<string>("");

export const searchProvider = new LunrSearchProvider(resultsStore, queryStore);
export const queryParamController = new QueryParamController(queryStore);
