import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import { IListElem } from "./ListElem.js";
import { ISearchBar } from "./SearchBar.js";

export class ISearchFilter extends Gtk.Filter {
  searchBar: ISearchBar;
  constructor(
    config: Partial<Gtk.Filter.ConstructorProps> = {},
    searchBar: ISearchBar,
  ) {
    super(config);

    this.searchBar = searchBar;
  }

  vfunc_match(item?: IListElem | null | undefined): boolean {
    let searchText = this.searchBar.getSearchText();
    if (item) {
      return item?.name.normalize("NFKD").toLowerCase().includes(searchText);
    }
    return false;
  }
}

export const SearchFilter = GObject.registerClass(
  {
    GTypeName: "Filter",
  },
  ISearchFilter,
);
