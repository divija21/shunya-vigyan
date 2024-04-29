// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";


// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//    
//   </React.StrictMode>
// );

import React from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import Container from './Container.jsx';
const EditorCont = () => {
  return (
    <>
    <ChakraProvider theme={theme}>
      <Container/>
     </ChakraProvider> 
    </>  )
}

export default EditorCont