import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { ActionButton } from "../ActionButton.js";
import { MainWindow } from "../MainWindow.js";

class IToUpperCaseButton extends ActionButton {
  constructor(win: MainWindow) {
    super(win);

    this.set_label("UPPER CASE");
  }
  handleButtonAction(content: string): string {
    return content.toUpperCase();
  }
}
export const ToUpperCaseButton = GObject.registerClass(
  {
    GTypeName: "ToUpperCaseButton",
  },
  IToUpperCaseButton,
);
