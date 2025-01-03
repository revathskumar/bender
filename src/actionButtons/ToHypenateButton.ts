import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { ActionButton } from "../ActionButton.js";
import { MainWindow } from "../MainWindow.js";

class IToHypenateButton extends ActionButton {
  constructor(win: MainWindow) {
    super(win);

    this.set_label("hypenate/dash (-)");
  }
  handleButtonAction(content: string): string {
    return content.replaceAll(" ", "-");
  }
}
export const ToHypenateButton = GObject.registerClass(
  {
    GTypeName: "ToHypenateButton",
  },
  IToHypenateButton,
);
