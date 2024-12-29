import GObject from "../@types/Gjs/GObject-2.0.js";
import Gtk from "../@types/Gjs/Gtk-4.0.js";
import { MainWindow } from "./MainWindow.js";

class IActionButton extends Gtk.Button {
  win: MainWindow;
  constructor(config: Gtk.Button.ConstructorProperties = {}, win: MainWindow) {
    super(config);

    this.win = win;

    this.connect("clicked", this.handleOnClick.bind(this));
  }

  handleOnClick(btn: Gtk.Button) {
    console.debug(`${btn.label} : ${this.win.listView.selectedIndex}`);
    if (this.win.listView.selectedIndex >= 0) {
      const content = this.win.listView.getSelectedContent();

      console.debug(content);

      let transContent = "";
      switch (btn.label.toLowerCase()) {
        case "upper case":
          transContent = content.toUpperCase();
          break;
        case "lower case":
          transContent = content.toLowerCase();
          break;
        case "underscore":
          transContent = content.replaceAll(" ", "_");
          break;
        case "hypenate":
          transContent = content.replaceAll(" ", "-");
          break;
        case "enum":
          transContent = content.replaceAll(" ", "_").toUpperCase();
          break;

        default:
          break;
      }
      print(transContent);
    }
    this.win.close();
  }
}

export const ActionButton = GObject.registerClass(
  {
    GTypeName: "Button",
  },
  IActionButton
);
