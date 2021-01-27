import { StoreFactory } from "./store";
import { Store } from "./types/SearchStore.type";

describe("Store", () => {
  let store: Store<any>;

  it("has the value that was passed during creatiion as its initial value", () => {
    store = StoreFactory.create("test");
    expect(store.value).toBe("test");
  });
  it("executes the callback after someone subrcribes to the store", () => {
    store = StoreFactory.create("test");

    let callBack = jest.fn();
    store.subscribe(callBack);

    expect(callBack).toBeCalled();
  });
  it("executes the callback after the value changes", () => {
    store = StoreFactory.create("test");

    let callBack = jest.fn();
    store.subscribe(callBack);
    store.value = "newValue";

    expect(callBack).toBeCalledWith("newValue");
  });
});
