import {
  MessagesConfig,
  QueryData,
  RequestInstanceEvent,
  Store,
} from "./types/SearchStore.type";

export function requestMessagesConfig(element: HTMLElement): MessagesConfig {
  const event = new RequestInstanceEvent<MessagesConfig>("MessagesConfig");
  element.dispatchEvent(event);
  return event.detail.instance;
}

export function requestQueryStore(element: HTMLElement): Store<string> {
  const event = new RequestInstanceEvent<Store<string>>("Store<string>");
  element.dispatchEvent(event);
  return event.detail.instance;
}

export function requestResultsStore(element: HTMLElement): Store<QueryData[]> {
  const event = new RequestInstanceEvent<Store<QueryData[]>>(
    "Store<QueryData[]>"
  );
  element.dispatchEvent(event);
  return event.detail.instance;
}
