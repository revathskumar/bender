import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { ActionButton } from "../ActionButton.js";
import { MainWindow } from "../MainWindow.js";

class IToEnumButton extends ActionButton {
  constructor(win: MainWindow) {
    super(win);

    this.set_label("enum");
  }
  handleButtonAction(content: string): string {
    return content.replaceAll(" ", "_").toUpperCase();
  }
}
export const ToEnumButton = GObject.registerClass(
  {
    GTypeName: "ToEnumButton",
  },
  IToEnumButton,
);
