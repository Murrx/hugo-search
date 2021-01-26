import SearchResults from "./components/SearchResults";
import ResultCard from "./components/ResultCard";
import HugoSearchInput from "./components/InputField";
import MessageBar from "./components/MessageBar";

// todo: add hs-prefix
window.customElements.define("result-card", ResultCard);
window.customElements.define("hs-input", HugoSearchInput);
window.customElements.define("hs-message", MessageBar);
window.customElements.define("hs-results", SearchResults);
