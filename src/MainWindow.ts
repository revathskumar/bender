import Gtk from "../@types/Gjs/Gtk-4.0.js";
import Gio from "../@types/Gjs/Gio-2.0.js";
import GObject from "../@types/Gjs/GObject-2.0.js";
import { ContentListView, ListView } from "./ContentListView.js";
import { ActionsSidebar, IActions } from "./ActionsSidebar.js";
import { ISearchBar, SearchBar } from "./SearchBar.js";
import { ISearchFilter, SearchFilter } from "./SearchFilter.js";
import { ActionButton } from "./ActionButton.js";

export class MainWindow extends Gtk.ApplicationWindow {
  listView: ListView;
  actionsSidebar: IActions;
  searchBar: ISearchBar;
  searchFilter: ISearchFilter;

  constructor(config: Gtk.ApplicationWindow.ConstructorProperties = {}) {
    const title = config?.title || "";
    super(config);

    // Removes title bar
    this.set_decorated(false);

    const container = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    const wrapper = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });

    this.searchFilter = new SearchFilter({}, this);

    this.searchBar = new SearchBar({}, this);
    container.append(this.searchBar);

    const right = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    right.set_margin_bottom(15);
    right.set_margin_top(15);
    right.set_margin_end(15);
    right.set_margin_start(15);

    right.append(new ActionButton({ label: "UPPER CASE" }, this));
    right.append(new ActionButton({ label: "lower case" }, this));
    right.append(new ActionButton({ label: "Underscore" }, this));
    right.append(new ActionButton({ label: "hypenate" }, this));
    right.append(new ActionButton({ label: "enum" }, this));

    this.actionsSidebar = new ActionsSidebar({}, this);
    this.actionsSidebar.set_child(right);

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
    wrapper.append(this.actionsSidebar);

    container.append(wrapper);
    this.set_child(container);

    // Create a Key Event Controller for the window
    const key_controller = new Gtk.EventControllerKey();
    this.add_controller(key_controller);

    key_controller.connect(
      "key-pressed",
      (controller, keyval, keycode, state) => {
        console.debug(`window key pressed : ${keyval}, ${keycode}`);
        // Check if the key pressed is Escape (keyval for Escape is 65307)
        if (keyval === 65307 && !this.actionsSidebar.get_child_revealed()) {
          this.close(); // Close the window
          return true; // Indicate the event is handled
        }
        if (keyval === 65363) {
          this.actionsSidebar.show();
          return true;
        }
        // left arrow
        if (keyval === 65361 && this.actionsSidebar.child_revealed) {
          this.actionsSidebar.hide();
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
    const bytes = content?.read_bytes(8192, null);
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
}

export const Window = GObject.registerClass(
  {
    GTypeName: "Window",
  },
  MainWindow
);
