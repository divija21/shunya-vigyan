import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ language, value: sourceCode }) => {
  const toast = useToast();
  const [output, setOutput] = useState([]);
  const [iframeContent, setIframeContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // const runCode = async () => {
  //   if (!sourceCode) return;
  //   setIsLoading(true);
  //   try {
  //     const result = await executeCode(language, sourceCode);
  //     console.log(result);
  //     if (typeof result === 'object' && result !== null && result.result !== undefined) {
  //       if (language === "html" ||language === "javascript" || language === "typescript" ) {
  //         // Directly use the result for iframe display for JavaScript or TypeScript
  //         setIframeContent(result.result);
  //         setOutput([]); // Clear the traditional output for these languages
  //       } else {
  //         // For other languages, process and display result as before
  //         //setOutput(Array.isArray(result.result) ? result.result : [result.result.toString()]);
  //         //setIframeContent(result.result); // Clear the iframe content for non-JS/TS languages
  //         setIframeContent(result.result);
  //         setOutput([]); // Clear the traditional output for these languages
  //       }
  //       setIsError(false);
  //     } else {
  //       console.log('Unexpected result structure:', result);
  //       setOutput(['Error: Unexpected result structure.']);
  //       setIsError(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       title: "An error occurred.",
  //       description: error.message || "Unable to run code",
  //       status: "error",
  //       duration: 6000,
  //     });
  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const runCode = async () => {
    if (!sourceCode) return;
    setIsLoading(true);
    try {
      const result = await executeCode(language, sourceCode);
      console.log(result);
      if (typeof result === 'object' && result !== null && result.result !== undefined) {
        if (language === "html" ||language === "javascript" || language === "typescript" ) {
          // Directly use the result for iframe display for JavaScript or TypeScript
          setIframeContent(result.result);
          setOutput([]); // Clear the traditional output for these languages
        } else {
          // For other languages, process and display result as before
          setOutput(Array.isArray(result.result) ? result.result : [result.result.toString()]);
          setIframeContent(result.result); // Clear the iframe content for non-JS/TS languages
        }
      } else {
        // Handle when result is not an object with a 'result' property
        setOutput([result.toString()]);
        setIframeContent(''); // Clear the iframe content
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
};

  return (
    <Box w={window.innerWidth < 480 ? "100%" : "50%"}>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        mt={5}
        isLoading={isLoading}
        onClick={runCode}
      >
        चल
      </Button>

      {iframeContent ? (
        <Box
          as="iframe"
          title="outputIframe"
          srcDoc={iframeContent}
          height="76vh"
          width="100%"
          border="1px solid"
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          borderColor="#333"
          backgroundColor="#f5f5f5"
        />
      ) : (
        <Box
          height="76vh"
          color={isError ? "red.400" : "black"}
          border="1px solid"
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          borderColor={isError ? "red.500" : "#333"}
          backgroundColor={"#f5f5f5"}
        >
          <Box className="bg-gray-200 p-2 w-full rounded-t-md flex items-center justify-center">
            <Text fontSize="lg">Output</Text>
          </Box>
          <Box paddingTop={2} paddingLeft={2}>
            {output.length > 0
              ? output.map((line, i) => <Text key={i}>{line}</Text>)
              : 'Click "Run Code" to see the output here'}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Output;
