import {
  MessagesConfig,
  QueryData,
  RequestInstanceEvent,
  Store,
} from "./types/SearchStore.type";

export function requestMessagesConfig(this: any): MessagesConfig {
  const event = new RequestInstanceEvent<MessagesConfig>("MessagesConfig");
  this.dispatchEvent(event);
  return event.detail.instance;
}

export function requestQueryStore(this: any): Store<string> {
  const event = new RequestInstanceEvent<Store<string>>("Store<string>");
  this.dispatchEvent(event);
  return event.detail.instance;
}

export function requestResultsStore(this: any): Store<QueryData[]> {
  const event = new RequestInstanceEvent<Store<QueryData[]>>(
    "Store<QueryData[]>"
  );
  this.dispatchEvent(event);
  return event.detail.instance;
}
