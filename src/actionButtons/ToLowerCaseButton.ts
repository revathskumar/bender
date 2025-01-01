import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { ActionButton } from "../ActionButton.js";
import { MainWindow } from "../MainWindow.js";

class IToLowerCaseButton extends ActionButton {
  constructor(win: MainWindow) {
    super(win);

    this.set_label("lower case");
  }
  handleButtonAction(content: string): string {
    return content.toLowerCase();
  }
}
export const ToLowerCaseButton = GObject.registerClass(
  {
    GTypeName: "ToLowerCaseButton",
  },
  IToLowerCaseButton,
);
