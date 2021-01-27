import { MessagesConfig } from "./types/SearchStore.type";
// Importing params from Hugo js build configuration,
// see: https://gohugo.io/hugo-pipes/js/#options
import * as params from "@params";

export const messages: MessagesConfig = {
  welcomeMsg: params.messages.welcome,
  emptyResultsMsg: params.messages.empty,
  successMsg: params.messages.success,
};

export const searchCollection: string = params.collection;

export const searchFields: string[] = params.fields;
