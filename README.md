# Bender

> Bending Text

## Demo

![demo](/images/adwaita-demo.gif)

## Usage

```sh
greenclip print | gjs -m dist/index.js
```

or

```sh
echo -e 'hello \n 123' | gjs -m dist/index.js
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
* gjs - 1.74.2

```sh
sudo apt install libgtk-4-1 libgtk-4-dev
```

```sh
npm i
npm run build
echo -e "H e l l o\n A B C" | G_MESSAGES_DEBUG=all gjs -m dist/index.js
```

## Build & Install

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
