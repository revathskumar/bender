import GObject from "../@types/Gjs/GObject-2.0.js";
import Gtk from "../@types/Gjs/Gtk-4.0.js";
import { IListElem } from "./ListElem.js";
import { MainWindow } from "./MainWindow.js";

export class ISearchFilter extends Gtk.Filter {
  win: MainWindow;
  constructor(config: Gtk.Filter.ConstructorProperties = {}, win: MainWindow) {
    super(config);

    this.win = win;
  }

  vfunc_match(item: IListElem): boolean {
    let searchText = this.win.searchBar.searchText.toLowerCase();
    // console.debug("🚀 ~ file: ContentListView.ts:32 ~ searchText:", searchText);
    return item.name.toLowerCase().includes(searchText);
    // return true;
  }
}

export const SearchFilter = GObject.registerClass(
  {
    GTypeName: "Filter",
  },
  ISearchFilter
);
