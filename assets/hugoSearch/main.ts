import SearchResults from "./components/SearchResults";
import HugoSearchInput from "./components/InputField";
import MessageBar from "./components/MessageBar";

window.customElements.define("hs-input", HugoSearchInput);
window.customElements.define("hs-message", MessageBar);
window.customElements.define("hs-results", SearchResults);
