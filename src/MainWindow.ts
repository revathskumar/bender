import Adw from "@girs/adw-1";
import Gio from "gi://Gio";
import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";

import { ContentListView, ListView } from "./ContentListView.js";
import { ActionsSidebar, IActions } from "./ActionsSidebar.js";
import { ISearchBar, SearchBar } from "./SearchBar.js";
import { ISearchFilter, SearchFilter } from "./SearchFilter.js";
import { Footer, IFooter } from "./Footer.js";
import {
  DOWN_ARROW,
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
} from "./constants/keyval.js";
import Configuration from "./Configuration.js";

export class MainWindow extends Adw.ApplicationWindow {
  listView: ListView;
  actionsSidebar: IActions | undefined;
  wrapper: Gtk.Box;
  searchBar: ISearchBar;
  searchFilter: ISearchFilter;
  footer: IFooter;
  totalItemsCount: number = 0;

  constructor(config: Partial<Adw.ApplicationWindow.ConstructorProps>) {
    const title = config?.title || "";
    super(config);

    // Removes title bar
    this.set_decorated(false);

    const container = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    this.wrapper = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });

    this.searchBar = this.#buildSearchBar();
    container.append(this.searchBar);
    this.searchFilter = new SearchFilter({}, this.searchBar);

    const content = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
    content.set_margin_bottom(15);
    content.set_margin_top(15);
    content.set_margin_end(15);
    content.set_margin_start(15);

    const clipboardList = this.#getInput();
    this.totalItemsCount = clipboardList.length;

    this.listView = new ContentListView(clipboardList, this.searchFilter);
    this.listView.setItemsChangedCallback(this.#handleItemsChanged.bind(this));
    this.listView.setHandleKeyPress(this.#handleKeyPress.bind(this));

    const sw = new Gtk.ScrolledWindow();
    sw.set_hexpand(true);
    sw.set_vexpand(true);
    sw.set_child(this.listView);

    content.append(sw);

    this.wrapper.append(content);

    container.append(this.wrapper);
    this.footer = new Footer();
    container.append(this.footer);
    this.set_content(container);

    this.#getConfig();

    // Create a Key Event Controller for the window
    const key_controller = new Gtk.EventControllerKey();
    this.add_controller(key_controller);

    key_controller.connect(
      "key-pressed",
      (controller, keyval, keycode, state) => {
        console.debug(`window key pressed : ${keyval}, ${keycode}`);
        if (!this.actionsSidebar?.get_child_revealed()) {
          if (keyval === ESCAPE) {
            this.close(); // Close the window
            return true; // Indicate the event is handled
          }
          if (keyval === DOWN_ARROW) {
            // hack to bring focus to listview when window is presented
            this.listView.grab_focus();
            return true;
          }
        }

        if (keyval === RIGHT_ARROW) {
          this.actionsSidebar?.show();
          return true;
        }
        if (
          [LEFT_ARROW, ESCAPE].includes(keyval) &&
          this.actionsSidebar?.child_revealed
        ) {
          this.actionsSidebar?.hide();
          this.listView.set_sensitive(true);
          return true;
        }

        return false; // Let other handlers process the event if it's not Escape
      },
    );
  }

  #getConfig() {
    (async () => {
      try {
        const configuration = new Configuration();
        const config = await configuration.getContents();
        this.actionsSidebar = new ActionsSidebar(this, config.actions);
        this.wrapper.append(this.actionsSidebar);
      } catch (err) {
        console.debug("in catch");
        console.error(err);
      }
    })();
  }

  #getInput() {
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

  #buildSearchBar() {
    const searchBar = new SearchBar();
    searchBar.setCapture(this);
    searchBar.setCallbackForTextEntry(() => {
      this.searchFilter.changed(Gtk.FilterChange.DIFFERENT);
    });
    return searchBar;
  }

  #handleItemsChanged(count: number) {
    this.footer.updateSummaryLabel(count, this.totalItemsCount);
  }

  #handleKeyPress() {
    this.actionsSidebar?.show();
  }
}

export const Window = GObject.registerClass(
  {
    GTypeName: "Window",
  },
  MainWindow,
);
