import { Store } from "./types/SearchStore.type";

export class StoreFactory {
  public static create<T>(value: T): Store<T> {
    return new AbstractStore<T>(value);
  }
}
class AbstractStore<T> implements Store<T> {
  private subscribers: Array<(val: T) => void>;
  private _value: T;
  public get value(): T {
    return this._value;
  }
  public set value(newValue: T) {
    this._value = newValue;
    this.emit(newValue);
  }

  constructor(value: T) {
    this.subscribers = [];
    this._value = value;
  }

  emit(newValue: T) {
    this.subscribers.forEach((callBack) => {
      callBack(newValue);
    });
  }

  subscribe(callback: (newValue: T) => void) {
    this.subscribers.push(callback);
    callback(this.value);
  }
}
