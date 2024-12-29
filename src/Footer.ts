import GObject from "../@types/Gjs/GObject-2.0.js";
import Gtk from "../@types/Gjs/Gtk-4.0.js";
import { MainWindow } from "./MainWindow.js";
import pkg from "../package.json" with { type: "json" }; // requries ts module option set to esnext/nodenext

class IFooter extends Gtk.Box {
  win: MainWindow;
  summaryLabel: Gtk.Label;
  constructor(config: Gtk.Box.ConstructorProperties = {}, win: MainWindow) {
    super(config);
    this.win = win;

    this.set_margin_bottom(15);
    this.set_margin_end(15);
    this.set_margin_start(15);
    this.set_halign(Gtk.Align.FILL);

    this.summaryLabel = this.renderSummary();
    this.append(this.summaryLabel);
    this.renderVersion();

    this.win.listView.model.connect("items-changed", () => {
      const count = this.win.listView.model.get_n_items();

      this.summaryLabel.label = `Showing items ${count} of ${this.win.totalItemsCount}`;
    });
  }

  renderSummary() {
    const summaryLabel = new Gtk.Label({
      label: ``,
    });
    summaryLabel.set_hexpand(true);
    summaryLabel.set_halign(Gtk.Align.START);

    return summaryLabel;
  }

  renderVersion() {
    const vLabel = new Gtk.Label({
      label: `${pkg.version}`,
    });
    vLabel.set_halign(Gtk.Align.END);

    this.append(vLabel);
  }
}

export const Footer = GObject.registerClass(
  {
    GTypeName: "Box",
  },
  IFooter
);
