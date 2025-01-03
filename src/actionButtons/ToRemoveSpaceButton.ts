import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { ActionButton } from "../ActionButton.js";
import { MainWindow } from "../MainWindow.js";

class IToRemoveSpaceButton extends ActionButton {
  constructor(win: MainWindow) {
    super(win);

    this.set_label("remove space");
  }
  handleButtonAction(content: string): string {
    return content.replaceAll(" ", "");
  }
}
export const ToRemoveSpaceButton = GObject.registerClass(
  {
    GTypeName: "ToRemoveSpaceButton",
  },
  IToRemoveSpaceButton,
);
