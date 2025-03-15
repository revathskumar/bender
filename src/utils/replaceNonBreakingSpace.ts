// replace 0xA0 with new line
// https://github.com/erebe/greenclip/blob/b98bb1d3487cc192a5771579d21674ca9480a9b3/src/Main.hs#L220
function replaceNonBreakingSpace(text: string) {
  return text.replaceAll("\u00A0", "\u000A");
}

export default replaceNonBreakingSpace;
