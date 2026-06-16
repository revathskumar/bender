import Adw from "@girs/adw-1";
import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import pkg from "../package.json" with { type: "json" }; // requries ts module option set to esnext/nodenext

export class IFooter extends Gtk.Box {
  #summaryLabel: Gtk.Label;
  constructor(config: Partial<Gtk.Box.ConstructorProps> = {}) {
    super(config);

    this.set_orientation(Gtk.Orientation.HORIZONTAL);

    this.set_margin_bottom(15);
    this.set_margin_end(15);
    this.set_margin_start(15);
    this.set_halign(Gtk.Align.FILL);

    this.#summaryLabel = this.#renderSummary();
    this.append(this.#summaryLabel);
    this.#renderVersion();
  }

  updateSummaryLabel(count: number, totalCount: number) {
    const labelText = `Showing items ${count} of ${totalCount}`;
    console.debug(
      "🚀 ~ file: Footer.ts:24 ~ updateSummaryLabel ~ labelText:",
      labelText,
    );
    this.#summaryLabel.set_label(labelText);
  }

  #renderSummary() {
    const summaryLabel = new Gtk.Label({
      label: ``,
    });
    summaryLabel.set_hexpand(true);
    summaryLabel.set_halign(Gtk.Align.START);

    return summaryLabel;
  }

  #renderVersion() {
    const vBtn = new Gtk.LinkButton({
      label: pkg.version,
    });
    vBtn.set_halign(Gtk.Align.END);
    vBtn.connect("activate-link", () => {
      const aboutOptions: Partial<Adw.AboutDialog.ConstructorProps> = {
        applicationName: 'Bender',
        applicationIcon: 'com.revathskumar.bender',
        version: pkg.version,
        developers: ['Revath S Kumar https://blog.revathskumar.com'],
        website: 'https://codeberg.org/0x52534B/bender',
        licenseType: Gtk.License.GPL_3_0,
        copyright: '© 2024-present Revath S Kumar',
        developerName: 'Revath S Kumar',
        issueUrl: 'https://codeberg.org/0x52534B/bender/issues'
      }

      const aboutDialog = new Adw.AboutDialog(aboutOptions);
      aboutDialog.present(this.get_native());
      return true;
    })

    this.append(vBtn);
  }
}

export const Footer = GObject.registerClass(
  {
    GTypeName: "Box",
  },
  IFooter,
);
