import Gio from "gi://Gio";
import GObject from "gi://GObject";

/** custom data element for a ListView model (Must be based on GObject) */
export class IListElem extends GObject.Object {
  name = "";
  label = "";

  constructor(name = "") {
    super();
    this.name = name;
    this.label = name.substring(0, 80);
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
  IListElem,
);
