import { requestQueryStore } from "../eventHelper";
import { InputController, Store } from "../types/SearchStore.type";

export default class HugoSearchInput
  extends HTMLElement
  implements InputController
{
  private inputElement: HTMLInputElement | null;
  private queryStore: Store<string>;

  // todo: maybe provide a default for the slot?
  private _template = `<template>
    <slot name="input"> </slot>
    <slot name="reset"> </slot>
  </template>`;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let template = new DOMParser()
      .parseFromString(this._template, "text/html")
      .querySelector("template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get value() {
    return this.inputElement?.value;
  }
  set value(val: string) {
    if (this.inputElement) {
      this.inputElement.value = val;
    }
  }

  onQueryChange = (newValue: string) => {
    if (this.value !== newValue) {
      this.value = newValue;
    }
  };

  connectedCallback() {
    this.queryStore = requestQueryStore(this);
    this.queryStore.subscribe(this.onQueryChange);

    this.shadowRoot.addEventListener("slotchange", (event) => {
      let targetSlot = event.target as HTMLSlotElement;
      this.inputElement = targetSlot.assignedElements()[0] as HTMLInputElement;
      if (this.inputElement) {
        this.inputElement.focus();
        this.inputElement.addEventListener(
          "keypress",
          function (event: { key: string }) {
            if (event.key === "Enter") {
              this.queryStore.value = this.value;
            }
          }.bind(this)
        );
      }
    });
  }
}
