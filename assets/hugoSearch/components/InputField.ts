import { requestQueryStore } from "../eventHelper";
import { InputController, Store } from "../types/SearchStore.type";

export default class HugoSearchInput
  extends HTMLElement
  implements InputController
{
  private inputElement: HTMLInputElement | null;
  private queryStore: Store<string>;

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

  onSlotChange = (event: Event) => {
    let targetSlot = event.target as HTMLSlotElement;
    if (targetSlot.name == "input") {
      this.onInputSlotChange(targetSlot);
    } else if (targetSlot.name == "reset") {
      this.onResetSlotChange(targetSlot);
    }
  };

  onInputSlotChange = (slot: HTMLSlotElement) => {
    let target = slot.assignedElements()[0] as HTMLInputElement;
    this.inputElement = target;
    target.focus();
    target.addEventListener(
      "keypress",
      function (event: { key: string }) {
        if (event.key === "Enter") {
          this.queryStore.value = this.value;
        }
      }.bind(this)
    );
  };

  onResetSlotChange = (slot: HTMLSlotElement) => {
    let target = slot.assignedElements()[0] as HTMLInputElement;

    target.addEventListener(
      "click",
      function () {
        this.queryStore.value = "";
      }.bind(this)
    );
  };

  connectedCallback() {
    this.queryStore = requestQueryStore(this);
    this.queryStore.subscribe(this.onQueryChange);
    this.shadowRoot.addEventListener("slotchange", this.onSlotChange);
  }
}
