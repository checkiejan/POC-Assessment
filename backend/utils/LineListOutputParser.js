const {BaseOutputParser} = require("langchain/schema/output_parser")

class LineListOutputParser extends BaseOutputParser {
    static lc_name() {
      return "LineListOutputParser";
    }
  
    lc_namespace = ["langchain", "retrievers", "multiquery"];
  
    async parse(text) {
      const startKeyIndex = text.indexOf("<questions>");
      const endKeyIndex = text.indexOf("</questions>");
      const questionsStartIndex =
        startKeyIndex === -1 ? 0 : startKeyIndex + "<questions>".length;
      const questionsEndIndex = endKeyIndex === -1 ? text.length : endKeyIndex;
      const lines = text
        .slice(questionsStartIndex, questionsEndIndex)
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== "");
      return { lines };
    }
  
    getFormatInstructions() {
      throw new Error("Not implemented.");
    }
  }

module.exports = LineListOutputParser;