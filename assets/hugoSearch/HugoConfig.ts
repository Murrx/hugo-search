import { MessagesConfig } from "./types/SearchStore.type";
// Importing params from Hugo js build configuration,
// see: https://gohugo.io/hugo-pipes/js/#options
import * as params from "@params";

export const messages: MessagesConfig = {
  welcomeMsg: params.messages.welcome,
  emptyResultsMsg: params.messages.noResults,
  successMsg: params.messages.success,
};
