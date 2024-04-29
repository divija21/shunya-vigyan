import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CODE_SNIPPETS } from "../constants";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
// Import TypingLanguageSelector at the top along with other imports
import TypingLanguageSelector from './TypingLanguageSelector';
import EnglishToHindiTextBox from "./EnglishToHindiTextBox";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  // const [isMobile, setIsMobile] = useState(false);
  // existing states and refs
  const [typingLanguage, setTypingLanguage] = useState('en'); // Default to English

  // useEffect(() => {
  //   setIsMobile(window.innerWidth < 768); // Assuming mobile breakpoint is 768px
  // }, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box h="100%">
      <Box
        spacing={4}
        // className="flex w-full"
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "flex",
          flexDirection: window.innerWidth > 480 ? "row" : "column",
        }}
      >
        <Box w={window.innerWidth < 480 ? "100%" : "50%"} marginRight={10}>
          <LanguageSelector language={language} onSelect={onSelect} />
          {/* Add the TypingLanguageSelector below the LanguageSelector */}
          <TypingLanguageSelector typingLanguage={typingLanguage} onSelect={setTypingLanguage} />
          <Box h="100%" className="editor-container rounded-md">
            {/* <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="70vh"
              theme="vs-white"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
            /> */}
            {typingLanguage === 'en' ?
              <textarea
              placeholder="Enter Code"
              style={{
                backgroundColor: "white",
                color: "black",
                paddingLeft: "10px",
                paddingTop: "10px",
                width: "100%",
                height: "72vh",
              }}
              value={value}
              defaultValue={CODE_SNIPPETS[language]}
              onChange={(e) => setValue(e.target.value)}
            /> :
            <EnglishToHindiTextBox />}
          </Box>
        </Box>
        <Output editorRef={editorRef} value={value} language={language} />
      </Box>
    </Box>
  );
};
export default CodeEditor;
