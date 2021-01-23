import { StoreFactory } from "./store";

import { defineFeature, loadFeature } from "jest-cucumber";
import { Store } from "./types/SearchStore.type";

const storeFeature = loadFeature(
  "./assets/js/hugoSearch/features/store.feature"
);

defineFeature(storeFeature, (test) => {
  let store: Store<any>;
  let callBack: jest.Mock;

  const aStoreThatIsCreatedWithTheValueX = (given: any) => {
    given(/^a store that is created with the value "(.*)"$/, (value: any) => {
      store = StoreFactory.create(value);
    });
  };

  const subscribedToThatStore = (when: any) => {
    when("subscribed to that store", () => {
      callBack = jest.fn();
      store.subscribe(callBack);
    });
  };

  test("Creating a new store", ({ given, then }) => {
    aStoreThatIsCreatedWithTheValueX(given);
    then(/^the created store should hold the value "(.*)"$/, (value) => {
      expect(store.value).toBe(value);
    });
  });
  test("Subscribing to a store", ({ given, when, then }) => {
    aStoreThatIsCreatedWithTheValueX(given);
    subscribedToThatStore(when);
    then("the callback method is called inmediatly", () => {
      expect(callBack).toBeCalled();
    });
  });
  test("Changing store value", ({ given, when, then, and }) => {
    aStoreThatIsCreatedWithTheValueX(given);
    subscribedToThatStore(and);
    when(/^the value of the store changes to "(.*)"$/, (newValue) => {
      store.value = newValue;
    });
    then(/^the callback method is called with "(.*)"$/, (value) => {
      expect(callBack).toBeCalledWith(value);
    });
  });
});
