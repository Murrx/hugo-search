// import { expect } from "chai";
// import { InputFieldController } from "./InputFieldController";
// import HugoSearchLunrService from "./LunrSearchProvider";
// import SearchStore from "./SearchStore";

// describe("HugoSearchController.instance", () => {
//   it("calling instance twice should return the same instance", () => {
//     let oneInstance = SearchStore;
//     let otherInstance = SearchStore;
//     expect(oneInstance).to.equal(otherInstance);
//   });
// });

// describe("HugoSearchController", () => {
//   let store;

//todo: go trough earch test and see if it makes sense
// beforeEach(() => {
//   // todo: use subscription based model in HugoSearchController so its not necesarry to setup dom
//   // so instead of refering to global.document and global.window I instead make something else
//   // responsible for managing the state of the search history?
//   const { JSDOM } = require("jsdom");
//   const { window } = new JSDOM(`...`);
//   global.document = window.document;
//   global.window = window;
// });

// afterEach(() => {
//   // todo: reimplement
//   // SearchStore.destroy();
// });

// it("should reflect the value of the query param to the subscribed input field", () => {
//   window.location.hash = "makeni";
//   let inputElement = document.createElement("input");
//   // todo: we probably want to mock the HugoSearchLunrService here
//   let controller = new InputFieldController(
//     HugoSearchLunrService,
//     SearchStore,
//     inputElement
//   );

//   expect(inputElement.value).to.equal("makeni");
// });

//   it.skip("should perform a search when the controller is instantiated while a query param set", () => {
//     // todo: this test is failing but is the functionality actually working? If so, how do we test it?
//     // window.location.hash = "metal";
//     // let controller = new HugoSearchInputController()
//     // expect(controller.searchUsed).to.equal(true);
//   });
//   it.skip("should NOT perform a search when instantiated with empty query param", () => {
//     // window.location.hash = "";
//     // store = HugoSearchStore.instance;
//     // expect(store.searchUsed).to.equal(false);
//   });
//   // todo: whats the purpose of this test?
//   it.skip("has a subscribeInput function that allows HtmlElements to register", () => {
//     // store = HugoSearchStore.instance;
//     // todo: extend this test
//   });

//   it.skip("throws a warning if searching when no search data is configured", () => {
//     // //todo: extend
//     // store = HugoSearchStore.instance;
//     // store.search();
//   });

//   it.skip("sets the value of the query param when a search is performed", () => {
//     // store = HugoSearchStore.instance;
//     // let inputElement = document.createElement("input");
//     // inputElement.value = "school";
//     // store.subscribeInput(inputElement);
//     // store.search();
//     // expect(window.location.hash).to.equal("#school");
//   });
// });
