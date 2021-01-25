export interface InputController {
  value: String;
}
export interface Subscribable<T> {
  subscribe(callback: (newValue: T) => void): void;
}

export interface QueryData {
  ref: number;
  name: string;
  uri: string;
  category: string;
  sub_category: string;
  tags: Array<string>;
}

export interface Store<T> extends Subscribable<T> {
  value: T;
}

export class RequestInstanceEvent<T> extends CustomEvent<{
  type: string;
  instance: T | undefined;
}> {
  constructor(type: string) {
    super(type, {
      bubbles: true,
      detail: { type, instance: undefined },
    });
  }
}

export type MessagesConfig = {
  welcomeMsg: string;
  emptyResultsMsg: string;
  successMsg: string;
};
