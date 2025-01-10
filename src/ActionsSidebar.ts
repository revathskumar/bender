import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { MainWindow } from "./MainWindow.js";
import { ActionButton } from "./ActionButton.js";
import TextTransformer from "./TextTransformer.js";

export class IActions extends Gtk.Revealer {
  win: MainWindow;
  constructor(win: MainWindow, actions: ConfigAction[] = []) {
    super();
    this.win = win;

    this.set_halign(Gtk.Align.END);

    this.set_child(this.#buildActions(actions));

    this.set_transition_type(Gtk.RevealerTransitionType.SLIDE_RIGHT);
    this.set_transition_duration(500);
    this.set_reveal_child(false);

    this.connect("notify::child-revealed", this.onChildRevealed.bind(this));
  }

  #buildActions(actions: ConfigAction[] = []) {
    const actionsWrapper = new Gtk.Box({
      orientation: Gtk.Orientation.VERTICAL,
    });
    actionsWrapper.set_margin_bottom(15);
    actionsWrapper.set_margin_top(15);
    actionsWrapper.set_margin_end(15);
    actionsWrapper.set_margin_start(15);

    actions.forEach((configAction) => {
      const actbtn = new ActionButton({ label: configAction.label }, this.win);
      const transformer = new TextTransformer();

      actbtn.setActionCallback((content) => {
        const output = transformer.transform(content, configAction);
        console.debug("🚀 ~ file: ActionsSidebar.ts:45 ~ output:", output);
        console.debug("action callback : content : ", content);
        return output;
      });
      actionsWrapper.append(actbtn);
    });
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
  IActions,
);
