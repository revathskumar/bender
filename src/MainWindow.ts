import Gtk from "../@types/Gjs/Gtk-4.0.js";
import Gio from "../@types/Gjs/Gio-2.0.js";
import GObject from "../@types/Gjs/GObject-2.0.js";
import { ContentListView, ListView } from "./ContentListView.js";

export class MainWindow extends Gtk.ApplicationWindow {
  listView: ListView;
  revealer: Gtk.Revealer;

  constructor(config: Gtk.ApplicationWindow.ConstructorProperties = {}) {
    const title = config?.title || "";
    super(config);

    // Removes title bar
    this.set_decorated(false);

    const wrapper = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });

    this.revealer = new Gtk.Revealer();
    this.revealer.set_halign(Gtk.Align.END);

    const right = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    right.set_margin_bottom(15);
    right.set_margin_top(15);
    right.set_margin_end(15);
    right.set_margin_start(15);

    right.append(this.createButton("Capitalize"));
    right.append(this.createButton("Underscore"));
    right.append(this.createButton("hypenate"));
    right.append(this.createButton("enum"));

    this.revealer.set_child(right);

    this.revealer.set_transition_type(Gtk.RevealerTransitionType.SLIDE_RIGHT);
    this.revealer.set_transition_duration(500);
    this.revealer.set_reveal_child(false);

    this.revealer.connect("notify::child-revealed", (widget: Gtk.Revealer) => {
      console.debug(`child revealed : ${widget.child_revealed}`);
      if (widget.child_revealed) {
        console.debug("should disable and focus to Revealer");
        this.listView.set_sensitive(false);
        const box = widget.get_first_child();
        const btn = box?.get_first_child();
        if (btn) {
          console.debug(`first child : ${btn}`);
          btn.grab_focus();
        }
      } else {
        // this.listView.set_focusable(true);
        this.listView.set_sensitive(true);
        this.listView.grab_focus();
      }
    });

    const content = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    content.set_margin_bottom(15);
    content.set_margin_top(15);
    content.set_margin_end(15);
    content.set_margin_start(15);

    const clipboardList = this.getInput();

    this.listView = new ContentListView({}, clipboardList, this);

    const sw = new Gtk.ScrolledWindow();
    sw.set_hexpand(true);
    sw.set_vexpand(true);
    sw.set_child(this.listView);

    content.append(sw);

    wrapper.append(content);
    wrapper.append(this.revealer);

    this.set_child(wrapper);

    // Create a Key Event Controller for the window
    const key_controller = new Gtk.EventControllerKey();
    this.add_controller(key_controller);

    key_controller.connect(
      "key-pressed",
      (controller, keyval, keycode, state) => {
        console.debug(`window key pressed : ${keyval}, ${keycode}`);
        // Check if the key pressed is Escape (keyval for Escape is 65307)
        if (keyval === 65307 && !this.revealer.get_child_revealed()) {
          this.close(); // Close the window
          return true; // Indicate the event is handled
        }
        if (keyval === 65363) {
          this.revealer.set_reveal_child(true);
          // win.revealer.child_revealed
          return true;
        }
        // left arrow
        if (keyval === 65361 && this.revealer.child_revealed) {
          this.revealer.set_reveal_child(false);
          this.listView.set_sensitive(true);
          return true;
        }
        return false; // Let other handlers process the event if it's not Escape
      }
    );
  }

  getInput() {
    const cli = new Gio.ApplicationCommandLine();
    const content = cli.get_stdin();

    let str = "";
    const bytes = content?.read_bytes(4096, null);
    content?.close(null);
    const data = bytes?.get_data();
    if (data) {
      str = new TextDecoder().decode(data);
    }

    let clipboardList = str.split("\n");
    clipboardList.splice(clipboardList.length - 1, 1);
    console.debug(`${clipboardList.length} items found`);
    return clipboardList;
  }

  createButton(label: string) {
    const button = new Gtk.Button({ label });

    button.connect("clicked", (btn) => {
      console.debug(`${btn.label} : ${this.listView.selectedIndex}`);
      if (this.listView.selectedIndex >= 0) {
        const content = this.listView.store?.get_item(
          this.listView.selectedIndex
        )?.name as string;

        console.debug(content);

        let transContent = "";
        switch (btn.label.toLowerCase()) {
          case "capitalize":
            transContent = content.toUpperCase();
            break;
          case "underscore":
            transContent = content.replaceAll(" ", "_");
            break;
          case "hypenate":
            transContent = content.replaceAll(" ", "-");
            break;
            break;
          case "enum":
            transContent = content.replaceAll(" ", "_").toUpperCase();
            break;

          default:
            break;
        }
        print(transContent);
      }
      this.close();
    });
    return button;
  }
}

export const Window = GObject.registerClass(
  {
    GTypeName: "Window",
  },
  MainWindow
);
