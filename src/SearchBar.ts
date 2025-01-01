import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";

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
    box.append(this.#entry);

    this.set_child(box);

    // connect search entry to search bar
    this.connect_entry(this.#entry);

    // show close button in search bar
    this.set_show_close_button(true);

    // Set search mode to off by default
    this.set_search_mode(false);
  }

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
