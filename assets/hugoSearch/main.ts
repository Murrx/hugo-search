import SearchResults from "./components/SearchResults";
import HugoSearchInput from "./components/InputField";
import MessageBar from "./components/MessageBar";
import { CompositionRoot } from "./CompositionRoot";
import { HugoSearchConfig } from "./types/SearchStore.type";

window["HugoSearch"] = {
  init(config: HugoSearchConfig) {
    CompositionRoot.init(config);
    window.customElements.define("hs-input", HugoSearchInput);
    window.customElements.define("hs-message", MessageBar);
    window.customElements.define("hs-results", SearchResults);
  },
};
