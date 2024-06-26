import { Marked, type MarkedExtension, type Tokens } from "marked";
import { createHighlighter } from "shiki";
import assert from "assert";

type shikiOptions = {
  highlight: (code: string, language: string, info?: string) => string;
};

const isCodeToken = (token: any): token is Tokens.Code => token.type === "code";

const shikiHighlight = (options: shikiOptions): MarkedExtension => {
  return {
    async: false,
    walkTokens: (token) => {
      if (!isCodeToken(token)) return;

      const { text, lang } = token;
      const html = options.highlight(text, lang || "");

      Object.assign(token, {
        type: "html",
        text: html,
      });
    },
  };
};

const themes = ["nord", "github-dark-default"];
const langs = ["python", "bash"];

const createMarkedWithHighlighting = async () => {
  const highlighter = await createHighlighter({
    themes,
    langs,
  });

  return new Marked(
    shikiHighlight({
      highlight(code, lang, _info) {
        lang = lang.toLocaleLowerCase();
        assert(langs.includes(lang), "Language not included in constructor.");

        return highlighter.codeToHtml(code, {
          theme: "github-dark-default",
          lang,
        });
      },
    })
  );
};

export default createMarkedWithHighlighting;
export type { Marked as Parser };
