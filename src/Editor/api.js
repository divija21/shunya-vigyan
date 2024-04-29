import axios from "axios";
import { LANGUAGE_FILE_EXTENSION } from "./constants";

const hindiToEnglishTags = {
    "<!दस्तावेज़ हटमल>": "<!DOCTYPE html>",
    "<हटमल>": "<html>",
    "</हटमल>": "</html>",
    "<माथा>": "<head>",
    "</माथा>": "</head>",
    "<शीर्षक>": "<title>",
    "</शीर्षक>": "</title>",
    "<शरीर>": "<body>",
    "</शरीर>": "</body>",
    "</शरीर>": "</body>",
    "<हेडर>": "<header>",
    "</हेडर>": "</header>",
    "<फुटर>": "<footer>",
    "</फुटर>": "</footer>",
    "<नव>": "<nav>",
    "</नव>": "</nav>",
    "<मेन>": "<main>",
    "</मेन>": "</main>",
    "<सेक्शन>": "<section>",
    "</सेक्शन>": "</section>",
    "<लेख>": "<article>",
    "</लेख>": "</article>",
    "<अलग>": "<aside>",
    "</अलग>": "</aside>",
    "<ह1>": "<h1>",
    "</ह1>": "</h1>",
    "<ह2>": "<h2>",
    "</ह2>": "</h2>",
    "<ह3>": "<h3>",
    "</ह3>": "</h3>",
    "<ह4>": "<h4>",
    "</ह4>": "</h4>",
    "<ह5>": "<h5>",
    "</ह5>": "</h5>",
    "<ह6>": "<h6>",
    "</ह6>": "</h6>",
    "<प>": "<p>",
    "</प>": "</p>",
    "<रुक>": "<br>",
    "<रेखा>": "<hr>",
    "<क.सूची>": "<ol>",
    "</क.सूची>": "</ol>",
    "<अक.सूची>": "<ul>",
    "</अक.सूची>": "</ul>",
    "<सूची आइटम>": "<li>",
    "</सूची आइटम>": "</li>",
    "<डाल>": "<div>",
    "</डाल>": "</div>",
    "<अवधि>": "<span>",
    "</अवधि>": "</span>",
    "<चित्र>": "<img>",
    "<अ>": "<a>",
    "</अ>": "</a>",
    "<फॉर्म>": "<form>",
    "</फॉर्म>": "</form>",
    "<इनपुट>": "<input>",
    "<टेक्स्टएरिया>": "<textarea>",
    "</टेक्स्टएरिया>": "</textarea>",
    "<बटन>": "<button>",
    "</बटन>": "</button>",
    "<चयन>": "<select>",
    "</चयन>": "</select>",
    "<विकल्प>": "<option>",
    "</विकल्प>": "</option>",
    "<लिंक>": "<link>",
    "<मेटा>": "<meta>",
    "<स्क्रिप्ट>": "<script>",
    "</स्क्रिप्ट>": "</script>",
    "<शैली>": "<style>",
    "</शैली>": "</style>",
    "<टेबल>": "<table>",
    "</टेबल>": "</table>",
    "<ट.माथा>": "<thead>",
    "</ट.माथा>": "</thead>",
    "<ट.शरीर>": "<tbody>",
    "</ट.शरीर>": "</tbody>",
    "<ट.फुट>": "<tfoot>",
    "</ट.फुट>": "</tfoot>",
    "<टर>": "<tr>",
    "</टर>": "</tr>",
    "<तड>": "<td>",
    "</तड>": "</td>",
    "<टच>": "<th>",
    "</टच>": "</th>"
};

function convertHindiHtmlToEnglish(hindiHtml) {
  let englishHtml = hindiHtml;

  // Iterate through the mapping and replace Hindi tags with English tags
  Object.entries(hindiToEnglishTags).forEach(([hindiTag, englishTag]) => {
      // Use a global regular expression to replace all instances of each tag
      const regex = new RegExp(hindiTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      englishHtml = englishHtml.replace(regex, englishTag);
  });

  return englishHtml;
}

export const executeCode = async (language, sourceCode) => {
  if (language === 'html' || language === 'javascript' || language === 'typescript') {
    // Directly use the convertHindiHtmlToEnglish function for JavaScript or TypeScript
    return Promise.resolve({ result: convertHindiHtmlToEnglish(sourceCode) });
  } else {
    const encoder = new TextEncoder();
    const encodedSourceCode = encoder.encode(sourceCode);
    const response = await axios.post(
      "https://xn--11by0j.com/api/v1/web_ide/",
      {
        code_file_name: `a.${LANGUAGE_FILE_EXTENSION[language]}`,
        code_language: language,
        code_input_b64: null,
        code_text_b64: btoa(String.fromCharCode(...encodedSourceCode)),
        input_flag: "ABSENT",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
};
