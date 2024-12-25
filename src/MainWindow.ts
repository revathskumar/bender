import Gtk from "../@types/Gjs/Gtk-4.0.js";
import Gio from "../@types/Gjs/Gio-2.0.js";
import GObject from "../@types/Gjs/GObject-2.0.js";
import { ContentListView, ListView } from "./ContentListView.js";

class MainWindow extends Gtk.ApplicationWindow {
  listView: ListView;

  constructor(config: Gtk.ApplicationWindow.ConstructorProperties = {}) {
    const title = config?.title || "";
    super(config);

    this.set_decorated(false);
    // this.set_p(Gtk.PositionType.TOP);

    const content = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    content.set_margin_bottom(15);
    content.set_margin_top(15);
    content.set_margin_end(15);
    content.set_margin_start(15);

    const clipboardList = this.getInput();

    this.listView = new ContentListView({}, clipboardList);

    const sw = new Gtk.ScrolledWindow();
    sw.set_hexpand(true);
    sw.set_vexpand(true);
    sw.set_child(this.listView);

    content.append(sw);

    this.set_child(content);

    // Create a Key Event Controller for the window
    const key_controller = new Gtk.EventControllerKey();
    this.add_controller(key_controller);

    key_controller.connect(
      "key-pressed",
      (controller, keyval, keycode, state) => {
        log(`key pressed : ${keyval}, ${keycode}`);
        // Check if the key pressed is Escape (keyval for Escape is 65307)
        if (keyval === 65307) {
          this.close(); // Close the window
          return true; // Indicate the event is handled
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
    const data = bytes?.get_data();
    if (data) {
      str = new TextDecoder().decode(data);
    }

    const clipboardList = str.split("\n");
    log(`${clipboardList.length} items found`);
    return clipboardList;
  }
}

export const Window = GObject.registerClass(
  {
    GTypeName: "Window",
  },
  MainWindow
);
