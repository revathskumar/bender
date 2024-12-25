# Bender

> Bending Text

## Usage

```sh
greenclip print | gjs -m dist/index.js
```

or 

```sh
echo -e 'hello \n 123' | gjs -m dist/index.js
```

## Dev setup

### Install dependencies

* libgtk4
* gjs - 1.74.2

```sh
sudo apt install libgtk-4-1 libgtk-4-dev
```

```sh
npm i
npm run build:types
npm run build:app
```

## Credits

Based on [gjsify/example-gtk4](https://github.com/gjsify/example-gtk4) by Pascal Garber

## License

[MIT](/LICENSE)
