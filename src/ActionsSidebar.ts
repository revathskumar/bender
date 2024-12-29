import GObject from "../@types/Gjs/GObject-2.0.js";
import Gtk from "../@types/Gjs/Gtk-4.0.js";
import { ActionButton } from "./ActionButton.js";
import { MainWindow } from "./MainWindow.js";

export class IActions extends Gtk.Revealer {
  win: MainWindow;
  constructor(
    config: Gtk.Revealer.ConstructorProperties = {},
    win: MainWindow
  ) {
    super(config);
    this.win = win;

    this.set_halign(Gtk.Align.END);

    this.set_child(this.#buildActions());

    this.set_transition_type(Gtk.RevealerTransitionType.SLIDE_RIGHT);
    this.set_transition_duration(500);
    this.set_reveal_child(false);

    this.connect("notify::child-revealed", this.onChildRevealed.bind(this));
  }

  #buildActions() {
    const actionsWrapper = new Gtk.Box({
      orientation: Gtk.Orientation.VERTICAL,
    });
    actionsWrapper.set_margin_bottom(15);
    actionsWrapper.set_margin_top(15);
    actionsWrapper.set_margin_end(15);
    actionsWrapper.set_margin_start(15);

    actionsWrapper.append(new ActionButton({ label: "UPPER CASE" }, this.win));
    actionsWrapper.append(new ActionButton({ label: "lower case" }, this.win));
    actionsWrapper.append(new ActionButton({ label: "Underscore" }, this.win));
    actionsWrapper.append(new ActionButton({ label: "hypenate" }, this.win));
    actionsWrapper.append(new ActionButton({ label: "enum" }, this.win));
    actionsWrapper.append(
      new ActionButton({ label: "remove space" }, this.win)
    );
    return actionsWrapper;
  }

  onChildRevealed(widget: Gtk.Revealer) {
    console.debug(`child revealed : ${widget.child_revealed}`);
    if (widget.child_revealed) {
      console.debug("should disable and focus to Revealer");
      this.win.listView.set_sensitive(false);
      const box = widget.get_first_child();
      const btn = box?.get_first_child();
      if (btn) {
        console.debug(`first child : ${btn}`);
        btn.grab_focus();
      }
    } else {
      // this.listView.set_focusable(true);
      this.win.listView.set_sensitive(true);
      this.win.listView.grab_focus();
    }
  }

  show() {
    this.set_reveal_child(true);
  }

  hide() {
    this.set_reveal_child(false);
  }
}

export const ActionsSidebar = GObject.registerClass(
  {
    GTypeName: "Revealer",
  },
  IActions
);
