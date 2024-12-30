import GObject from "../../@types/Gjs/GObject-2.0.js";
import Gtk from "../../@types/Gjs/Gtk-4.0.js";
import { ActionButton } from "../ActionButton.js";
import { MainWindow } from "../MainWindow.js";

class IToLowerCaseButton extends ActionButton {
  constructor(config: Gtk.Button.ConstructorProperties = {}, win: MainWindow) {
    super(config, win);

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
  IToLowerCaseButton
);
