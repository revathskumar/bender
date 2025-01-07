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
    });
  });
});
