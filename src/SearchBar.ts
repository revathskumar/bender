import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gdk from "gi://Gdk";

export class ISearchBar extends Gtk.SearchBar {
  #entry: Gtk.SearchEntry;
  #searchText: string = "";

  constructor(config: Partial<Gtk.SearchBar.ConstructorProps> = {}) {
    super(config);

    const box = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
    box.set_spacing(10);

    // Add SearchEntry
    this.#entry = new Gtk.SearchEntry();
    this.#entry.set_hexpand(true);
    this.#entry.set_placeholder_text("Search / Filter...");
    box.append(this.#entry);

    this.set_child(box);

    // connect search entry to search bar
    this.connect_entry(this.#entry);

    // show close button in search bar
    this.set_show_close_button(false);

    // Set search mode to off by default
    this.set_search_mode(true);

    this.show();

    const keyController = new Gtk.EventControllerKey();
    keyController.connect("key-pressed", this.#handleKeyPress);

    this.#entry.add_controller(keyController);
  }

  #handleKeyPress = (_: Gtk.EventControllerKey, keyval: number) => {
    if (keyval === Gdk.KEY_Escape) {
      const text = this.#entry.get_text();

      if (text.length > 0) {
        this.#entry.set_text("");
        return true;
      }

      const toplevel = this.get_native();
      if (toplevel instanceof Gtk.Window) {
        toplevel.close();
      }
      return true;
    }
    return false;
  };

  setCapture(win: Gtk.Window) {
    this.set_key_capture_widget(win);
  }

  setCallbackForTextEntry(callback: () => void) {
    this.#entry?.connect(
      "notify::text",
      this.#handleTextEntry.bind(this, callback),
    );
  }

  getSearchText() {
    return this.#searchText.toLowerCase();
  }

  #handleTextEntry(callback: () => void, widget: Gtk.SearchEntry) {
    console.debug(`notify text for : ${widget.get_text()}`);
    this.#searchText = widget.get_text();
    if (typeof callback === "function") {
      callback();
    }
  }
}

export const SearchBar = GObject.registerClass(
  {
    GTypeName: "SearchBar",
  },
  ISearchBar,
);
