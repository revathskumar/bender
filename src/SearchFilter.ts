import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { IListElem } from "./ListElem.js";
import { MainWindow } from "./MainWindow.js";

export class ISearchFilter extends Gtk.Filter {
  win: MainWindow;
  constructor(config: Partial<Gtk.Filter.ConstructorProps>, win: MainWindow) {
    super(config);

    this.win = win;
  }

  vfunc_match(item?: IListElem | null | undefined): boolean {
    let searchText = this.win.searchBar.searchText.toLowerCase();
    if (item) {
      return item?.name.toLowerCase().includes(searchText);
    }
    return false;
  }
}

export const SearchFilter = GObject.registerClass(
  {
    GTypeName: "Filter",
  },
  ISearchFilter
);
