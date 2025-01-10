class TextTransformer {
  upperCase(text: string) {
    return text.toUpperCase();
  }
  lowerCase(text: string) {
    return text.toLowerCase();
  }
  replace(text: string, searchVal: string = "_", replaceVal: string = "") {
    return text.replaceAll(searchVal, replaceVal);
  }
  transform(text: string, configAction: ConfigAction) {
    const actArr = configAction.action.split("|");
    let output = text;
    console.debug("🚀 ~ file: ActionsSidebar.ts:45 ~ output:", output);
    actArr.forEach((actItem) => {
      console.debug("🚀 ~ file: ActionsSidebar.ts:46 ~ actItem:", actItem);
      switch (actItem.trim().toLowerCase()) {
        case "uppercase":
          output = this.upperCase(output);
          break;
        case "lowercase":
          output = this.lowerCase(output);
          break;

        default:
          if (actItem.trim().startsWith("replace")) {
            const match = actItem.match(
              /replace [\"\'](.+)[\"\'] [\"\'](.+|)[\"\']/,
            );

            const searchVal = match?.[1];
            const replaceVal = match?.[2];

            console.debug("🚀 ~ file: ActionsSidebar.ts:59 ~ match:", match);
            console.debug(
              "🚀 ~ file: ActionsSidebar.ts:59 ~ replaceVal:",
              replaceVal,
            );
            console.debug(
              "🚀 ~ file: ActionsSidebar.ts:59 ~ searchVal:",
              searchVal,
            );
            output = this.replace(output, searchVal, replaceVal);
          }
          break;
      }
    });
    return output;
  }
}

export default TextTransformer;
