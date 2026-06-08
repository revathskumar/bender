import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { MainWindow } from "./MainWindow.js";

import pkg from "../package.json" with { type: "json" }; // requries ts module option set to esnext/nodenext

class IAboutDialog extends Gtk.AboutDialog {
  constructor(config: Partial<Gtk.AboutDialog.ConstructorProps> = {}) {
    super(config);

    this.program_name = 'Bender';
    this.version = pkg.version;
    this.authors = ['Revath S Kumar https://blog.revathskumar.com'];
    this.website = 'https://codeberg.org/0x52534B/bender';
    this.websiteLabel = "codeberg";
    this.licenseType = Gtk.License.GPL_3_0;

    this.show();
  }
}

export const AboutDialog = GObject.registerClass(
  {
    GTypeName: "AboutDialog",
  },
  IAboutDialog,
);
