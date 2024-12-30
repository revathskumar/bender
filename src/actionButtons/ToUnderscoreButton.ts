import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { ActionButton } from "../ActionButton.js";
import { MainWindow } from "../MainWindow.js";

class IToUnderscoreButton extends ActionButton {
  constructor(config: Partial<Gtk.Button.ConstructorProps>, win: MainWindow) {
    super(config, win);

    this.set_label("underscore");
  }
  handleButtonAction(content: string): string {
    return content.replaceAll(" ", "_");
  }
}
export const ToUnderscoreButton = GObject.registerClass(
  {
    GTypeName: "ToUnderscoreButton",
  },
  IToUnderscoreButton
);
