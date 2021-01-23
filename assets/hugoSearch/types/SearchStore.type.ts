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
