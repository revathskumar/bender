# Bender

> Bending Text

## Demo

![demo](/images/adwaita-demo.gif)

## Usage

```sh
greenclip print |  gjs -m "dist/main.js"
```

or

```sh
echo -e 'hello \n 123' |  gjs -m "dist/main.js"
```

## Configuration

Copy [config.yaml](/config.yaml) to `~/.config/bender/config.yaml` (`$XDG_CONFIG_HOME/bender/config.yaml`)

Available actions:

* replace "<search_val>" "<replace_val>"
* uppercase
* lowercase

Add new entry for `actions`

```yaml
  - label: remove space
    action: replace " " ""
```

use pipe(`|`) to use mulitple actions


```yaml
  - label: enum
    action: replace " " "_" | uppercase
```

## Key bindings

* `ESC` - close the window
* `ENTER` - Apply the focused action (print the output to stdout & close the window)
* `RIGHT ARROW` - Open the actions sidebar
* `LEFT ARROW` - Close the actions sidebar
* `any alphanumeric` - search & filter the list
* `UP/DOWN ARROWS` -
    * navigate through the list (when the actions sidebar is closed)
    * navigate through available actions (when actions sidebar is open with `RIGHT ARROW`)

## Dev setup

### Install dependencies

* libgtk4
* libadwaita
* gjs - 1.74.2
* meson - 1.0.1

```sh
sudo apt install libgtk-4-1 libgtk-4-dev libadwaita-1-dev
```

```sh
npm i
npm run build
echo -e "Hello\nBender" | G_MESSAGES_DEBUG=all ./bin/bender
```

## Build & Install

### Dev build

```sh
npm run build
meson setup --prefix=***/path/to/bender/run/ builddir/
meson compile -C builddir/
meson install -C builddir/
echo -e "Hello\nBender" | ./run/bin/com.revathskumar.bender
```

```sh
npm run build
meson setup builddir
meson compile -C builddir
sudo meson install -C builddir
```

and run it by `echo -e "Hello\nBender" | com.revathskumar.bender`

### Using flatpak

```sh
flatpak-builder --force-clean --user --install-deps-from=flathub --repo=repo --install builddir com.revathskumar.bender.yaml
echo -e "Hello\nBender" | flatpak run com.revathskumar.bender
```

## Credits

Based on [gjsify/example-gtk4](https://github.com/gjsify/example-gtk4) by Pascal Garber

## License

[MIT](/LICENSE)
