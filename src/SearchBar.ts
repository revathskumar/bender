import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { MainWindow } from "./MainWindow.js";

export class ISearchBar extends Gtk.SearchBar {
  entry: Gtk.SearchEntry;
  searchText: string = "";
  win: MainWindow;
  constructor(
    config: Partial<Gtk.SearchBar.ConstructorProps>,
    win: MainWindow
  ) {
    super(config);
    this.win = win;

    const box = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
    box.set_spacing(10);

    // Add SearchEntry
    this.entry = new Gtk.SearchEntry();
    this.entry.set_hexpand(true);
    box.append(this.entry);

    this.set_child(box);

    // connect search entry to search bar
    this.connect_entry(this.entry);
    if (win) {
      // set key capture from main window, it will show searchbar, when you start typing
      this.set_key_capture_widget(win);
    }

    // show close button in search bar
    this.set_show_close_button(true);

    // Set search mode to off by default
    this.set_search_mode(false);

    this.entry?.connect("notify::text", this.#handleTextEntry.bind(this));
  }

  #handleTextEntry(widget: Gtk.SearchEntry) {
    console.debug(`notify text for : ${widget.get_text()}`);
    this.searchText = widget.get_text();
    this.win.searchFilter.changed(Gtk.FilterChange.DIFFERENT);
  }
}

export const SearchBar = GObject.registerClass(
  {
    GTypeName: "SearchBar",
  },
  ISearchBar
);
