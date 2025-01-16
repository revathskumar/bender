import TextTransformer from "../src/TextTransformer";

describe("TextTransformer", () => {
  let transformer: TextTransformer;
  beforeEach(() => {
    transformer = new TextTransformer();
  });

  describe(".upperCase", () => {
    it("converted to upperCase", () => {
      expect(transformer.upperCase("abc")).toBe("ABC");
    });
  });

  describe(".lowerCase", () => {
    it("converted to lowerCase", () => {
      expect(transformer.lowerCase("ABC")).toBe("abc");
    });
  });

  describe(".onlyAlphanum", () => {
    it("return only alphanum chars", () => {
      expect(transformer.onlyAlphanum("Ab0!23\u00F6")).toBe("Ab023");
    });
  });

  describe(".toHex", () => {
    it("return hex", () => {
      expect(transformer.toHex("776")).toBe("308");
    });
  });

  describe(".removeDiacritics", () => {
    it("return without diacritics", () => {
      expect(transformer.removeDiacritics("Ab0!23\u00F6")).toBe("Ab0!23o");
      expect(transformer.removeDiacritics("Köln ﬀ")).toBe("Koln ﬀ");
    });
  });

  describe(".reverse", () => {
    it("return string reversed", () => {
      expect(transformer.reverse("Ab0!23\u00F6")).toBe("\u00F632!0bA");
    });
  });

  describe(".transform", () => {
    describe("on single action", () => {
      it("should be able to do replace", () => {
        expect(
          transformer.transform("a b c", {
            label: "remove space",
            action: 'replace " " ""',
          }),
        ).toBe("abc");
      });
    });

    describe("on multiple piped actions", () => {
      it("should be able to do replace and make it uppercase", () => {
        expect(
          transformer.transform("a b c", {
            label: "remove space",
            action: 'replace " " "" | uppercase',
          }),
        ).toBe("ABC");
      });

      it("should be able to do replace and make it to hex", () => {
        expect(
          transformer.transform("7 7 6", {
            label: "to hex",
            action: 'replace " " "" | toHex',
          }),
        ).toBe("308");
      });

      it("should be able to do get only alpha numeric chars and make it reverse", () => {
        expect(
          transformer.transform("Ab0!23\u00F6", {
            label: "onlyAlphanum",
            action: "onlyAlphanum | reverse",
          }),
        ).toBe("320bA");
      });
    });
  });
});
