import Gtk from "../@types/Gjs/Gtk-4.0.js";
import Gio from "../@types/Gjs/Gio-2.0.js";
import GObject from "../@types/Gjs/GObject-2.0.js";

import { IListElem, ListElem } from "./ListElem.js";
import { MainWindow } from "./MainWindow.js";

export class ListView extends Gtk.ListView {
  store: Gio.ListStore<IListElem>;
  selectedIndex: number = 0;

  constructor(
    config: Gtk.ListView.ConstructorProperties = {},
    contentArray: string[] = [],
    win: MainWindow
  ) {
    super(config);

    this.factory = new Gtk.SignalListItemFactory();
    this.set_factory(this.factory);

    this.factory.connect("setup", this.factorySetup.bind(this));
    this.factory.connect("bind", this.factoryBind.bind(this));

    this.store = new Gio.ListStore({ item_type: ListElem.$gtype });

    this.model = new Gtk.SingleSelection({
      model: this.store,
    });

    this.model.connect("selection-changed", this.selectionChanged.bind(this));

    this.set_valign(Gtk.Align.FILL);
    this.set_halign(Gtk.Align.FILL);

    for (let index = 0; index < contentArray.length; index++) {
      const element = contentArray[index];
      this.add(new ListElem(element));
    }

    this.set_model(this.model);

    // Create a Key Event Controller for the window
    const key_controller = new Gtk.EventControllerKey();
    this.add_controller(key_controller);

    key_controller.connect(
      "key-pressed",
      (controller, keyval, keycode, state) => {
        // right arrow
        if (keyval === 65363) {
          win.revealer.set_reveal_child(true);
          return true;
        }
        return false;
      }
    );
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
    item.set_child(box);
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
    label?.set_text(data.name || "");

    item.set_child(box);
  }

  selectionChanged(widget: Gtk.SelectionModel) {
    const selection = widget.get_selection();
    // the the first value in the GtkBitset, that contain the index of the selection in the data model
    // as we use Gtk.SingleSelection, there can only be one ;-)
    const ndx = selection.get_nth(0);
    this.selectedIndex = ndx;
    console.debug(`Selection changed : ${ndx} : ${widget.is_selected(ndx)}`);
  }
}

export const ContentListView = GObject.registerClass(
  {
    GTypeName: "ListViewBase",
    Implements: [Gio.ListModel],
  },
  ListView
);
