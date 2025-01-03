import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { MainWindow } from "./MainWindow.js";

class IActionButton extends Gtk.Button {
  win: MainWindow;
  constructor(win: MainWindow) {
    super();

    this.win = win;

    this.set_margin_top(5);
    this.set_margin_bottom(5);

    this.connect(
      "clicked",
      this.#handleOnClick.bind(this, this.handleButtonAction),
    );
  }

  handleButtonAction(content: string): string {
    throw new Error("Not implemnted");
  }

  #handleOnClick(btnAction: typeof this.handleButtonAction) {
    const content = this.win.listView.getSelectedContent();
    if (content) {
      print(btnAction(content.trim()));
    }
    this.win.close();
  }
}

export const ActionButton = GObject.registerClass(
  {
    GTypeName: "ActionButton",
  },
  IActionButton,
);
