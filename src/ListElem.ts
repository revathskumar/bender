import GObject from "../@types/Gjs/GObject-2.0.js";
import Gio from "../@types/Gjs/Gio-2.0.js";

/** custom data element for a ListView model (Must be based on GObject) */
export class IListElem extends GObject.Object {
  name = "";

  constructor(name = "") {
    super();
    this.name = name;
  }

  _repr() {
    return `ListElem(name: ${this.name})`;
  }
}

export const ListElem = GObject.registerClass(
  {
    GTypeName: "ListElem",
    Implements: [Gio.ListModel],
  },
  IListElem
);
