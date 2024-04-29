import { Box } from "@chakra-ui/react";
import React from "react";
import CodeEditor from "./components/CodeEditor";

function Container() {
  return (
    <Box minH="100vh" px={6} py={8}>
      <CodeEditor />
    </Box>
  );
}

export default Container;
