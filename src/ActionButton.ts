import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { MainWindow } from "./MainWindow.js";

class IActionButton extends Gtk.Button {
  win: MainWindow;
  constructor(config: Partial<Gtk.Button.ConstructorProps>, win: MainWindow) {
    super(config);

    this.win = win;

    this.set_margin_top(5);
    this.set_margin_bottom(5);
  }

  setActionCallback(callback: typeof this.handleButtonAction) {
    this.connect("clicked", this.#handleOnClick.bind(this, callback));
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
