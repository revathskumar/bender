import _snakecase from "lodash.snakecase";

class TextTransformer {
  upperCase(text: string) {
    return text.toUpperCase();
  }
  lowerCase(text: string) {
    return text.toLowerCase();
  }
  extract(text: string, pattern: string) {
    const result = text.match(new RegExp(pattern));
    if (result?.[0]) {
      return result[0];
    }
    return "";
  }
  replace(text: string, searchVal: string = "_", replaceVal: string = "") {
    return text.replaceAll(searchVal, replaceVal);
  }
  onlyAlphanum(text: string) {
    return text.replace(/[^0-9a-zA-Z]/g, "");
  }
  toHex(text: string) {
    return new Number(text).toString(16);
  }
  removeDiacritics(text: string) {
    return text.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  }
  reverse(text: string) {
    return text.normalize("NFC").split("").toReversed().join("");
  }
  snakecase(text: string) {
    return _snakecase(text);
  }
  transform(text: string, configAction: ConfigAction) {
    const actArr = configAction.action.split("|");
    let output = text;
    actArr.forEach((actItem) => {
      switch (actItem.trim().toLowerCase()) {
        case "uppercase":
          output = this.upperCase(output);
          break;
        case "lowercase":
          output = this.lowerCase(output);
          break;
        case "onlyalphanum":
          output = this.onlyAlphanum(output);
          break;
        case "tohex":
          output = this.toHex(output);
          break;
        case "removediacritics":
          output = this.removeDiacritics(output);
          break;
        case "reverse":
          output = this.reverse(output);
          break;
        case "snakecase":
          output = this.snakecase(output);
          break;

        default:
          if (actItem.trim().startsWith("extract")) {
            const match = actItem.match(/extract [\"\'](.+)[\"\']/);

            let pattern = match?.[1];

            if (pattern) {
              pattern = pattern.replace(/^\//, "").replace(/\/$/, "");
              output = this.extract(output, pattern);
            }
          }
          if (actItem.trim().startsWith("replace")) {
            const match = actItem.match(
              /replace [\"\'](.+)[\"\'] [\"\'](.+|)[\"\']/,
            );

            const searchVal = match?.[1];
            const replaceVal = match?.[2];

            output = this.replace(output, searchVal, replaceVal);
          }
          break;
      }
    });
    return output;
  }
}

export default TextTransformer;
