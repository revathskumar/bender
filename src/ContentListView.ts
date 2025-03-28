import Gio from "gi://Gio";
import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";

import { IListElem, ListElem } from "./ListElem.js";
import { RIGHT_ARROW } from "./constants/keyval.js";
import { ISearchFilter } from "./SearchFilter.js";

export class ListView extends Gtk.ListView {
  store: Gio.ListStore<IListElem>;
  #selectedIndex: number = 0;
  #keyController: Gtk.EventControllerKey;

  constructor(
    config: Partial<Gtk.ListView.ConstructorProps> = {},
    searchFilter: ISearchFilter,
  ) {
    super(config);

    this.factory = new Gtk.SignalListItemFactory();
    this.set_factory(this.factory);

    this.factory.connect("setup", this.factorySetup.bind(this));
    this.factory.connect("bind", this.factoryBind.bind(this));

    this.store = new Gio.ListStore({ item_type: ListElem.$gtype });

    const filterModel = new Gtk.FilterListModel({
      model: this.store,
      filter: searchFilter,
      incremental: true,
    });

    this.model = new Gtk.SingleSelection({
      model: filterModel,
    });

    this.model.connect("selection-changed", this.selectionChanged.bind(this));

    this.set_valign(Gtk.Align.FILL);
    this.set_halign(Gtk.Align.FILL);

    this.set_model(this.model);

    // Create a Key Event Controller for the window
    this.#keyController = new Gtk.EventControllerKey();
    this.add_controller(this.#keyController);
  }

  addItems(contentArray: string[] = []) {
    for (let index = 0; index < contentArray.length; index++) {
      const element = contentArray[index];
      this.add(new ListElem(element));
    }
  }

  /**
   * add element to the data model
   * @param elem
   */
  add(elem: IListElem) {
    (this.store as Gio.ListStore)?.append(elem);
  }

  /**
   * Gtk.SignalListItemFactory::setup signal callback (overloaded from parent class)
   * Handles the creation widgets to put in the ListView
   */
  factorySetup(widget: Gtk.ListView, item: Gtk.ListItem) {
    const box = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });

    item.set_child(box);
    const label = new Gtk.Label();
    label.set_halign(Gtk.Align.START);
    label.set_hexpand(true);
    label.set_margin_start(10);
    const arrow = new Gtk.Label();
    arrow.set_halign(Gtk.Align.END);
    arrow.set_margin_end(10);
    arrow.set_text(" > ");
    box.append(label);
    box.append(arrow);
  }

  /**
   * Gtk.SignalListItemFactory::bind signal callback (overloaded from parent class)
   * Handles adding data for the model to the widgets created in setup
   * @param widget
   * @param item
   */
  factoryBind(widget: Gtk.ListView, item: Gtk.ListItem) {
    // get the Gtk.Box stored in the ListItem
    const box = item.get_child();
    // get the model item, connected to current ListItem
    const data = item.get_item() as IListElem;
    // get the Gtk.Label (first item in box)
    const label = box?.get_first_child() as Gtk.Label;
    // get the Gtk.Switch (next sibling to the Label)
    // const _switch = label?.get_next_sibling() as Gtk.Switch;
    // Update Gtk.Label with data from model item
    // log(`facrotyBind : ${data.name}`);
    label?.set_text(data.label || "");
    label?.set_tooltip_text(data.name || "");

    item.set_child(box);
  }

  selectionChanged(widget: Gtk.SelectionModel) {
    const selection = widget.get_selection();
    // the the first value in the GtkBitset, that contain the index of the selection in the data model
    // as we use Gtk.SingleSelection, there can only be one ;-)
    const ndx = selection.get_nth(0);
    this.#selectedIndex = ndx;
    console.debug(`Selection changed : ${ndx} : ${widget.is_selected(ndx)}`);
  }

  getSelectedContent() {
    if (this.#selectedIndex >= 0) {
      return (this.model?.get_item(this.#selectedIndex) as IListElem)?.name;
    }
    return "";
  }

  getContent(index: number) {
    return (this.model?.get_item(index) as IListElem)?.name || "";
  }

  setItemsChangedCallback(callback: (count: number) => void) {
    this.model.connect(
      "items-changed",
      this.#handleItemsChanged.bind(this, callback),
    );
  }

  setHandleKeyPress(callback: () => void) {
    this.#keyController.connect(
      "key-pressed",
      this.#handleKeyPress.bind(this, callback),
    );
  }

  #handleItemsChanged(callback: (count: number) => void) {
    const count = this.model.get_n_items();
    console.debug(
      "🚀 ~ file: ContentListView.ts:135 ~ handleItemsChanged ~ count:",
      count,
    );
    if (typeof callback === "function") {
      callback(count);
    }
  }

  #handleKeyPress(
    callback: () => void,
    controller: Gtk.EventControllerKey,
    keyval: number,
  ) {
    console.debug("🚀 ~ file: ContentListView.ts:58 ~ keyval:", keyval);
    if (keyval === RIGHT_ARROW && typeof callback === "function") {
      callback();
      return true;
    }
    return false;
  }
}

export const ContentListView = GObject.registerClass(
  {
    GTypeName: "ListViewBase",
    Implements: [Gio.ListModel],
  },
  ListView,
);
