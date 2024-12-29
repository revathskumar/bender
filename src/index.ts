import "../@types/Gjs/index.js";
import { System } from "../@types/Gjs/Gjs.js";
import Gtk from "../@types/Gjs/Gtk-4.0.js";
import GObject from "../@types/Gjs/GObject-2.0.js";
import Gio from "../@types/Gjs/Gio-2.0.js";

import { Window as MainWindow } from "./MainWindow.js";
import GLib from "../@types/Gjs/GLib-2.0.js";

class _Application extends Gtk.Application {
  constructor(
    constructProperties = {
      application_id: "com.revathskumar.bender",
      flags: Gio.ApplicationFlags.FLAGS_NONE,
    }
  ) {
    super(constructProperties);
  }

  override vfunc_activate() {
    super.vfunc_activate();
    let win = this.active_window;
    if (!win) {
      win = new MainWindow({
        title: "",
        default_width: 800,
        default_height: 800,
        application: this,
      });
    }

    win.present();
  }
}

/** Main Application class */
const Application = GObject.registerClass(
  {
    GTypeName: "Application",
  },
  _Application
);

/** Run the main application */
const main = () => {
  // The proper way to run a Gtk.Application or Gio.Application is take ARGV and
  // prepend the program name to it, and pass that to run()
  const app = new Application();
  app.run([System.programInvocationName, ...ARGV]);
};

main();
