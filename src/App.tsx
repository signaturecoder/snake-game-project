import React from "react";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react"; 
import { Provider } from "react-redux";
import store from "./store";

// inject store at the top level of the provider component
function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Container maxW="container.lg" centerContent>
          <Heading as="h1" size="xl">SNAKE GAME</Heading>
            <div>Hello World</div>

        </Container>
      </ChakraProvider>
   </Provider>
  );
}

export default App;
