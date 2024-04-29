import React, { useState, useEffect } from 'react';
// import { getTransliterateSuggestions } from "react-transliterate";
import { Box, Input, List, ListItem } from "@chakra-ui/react";

const EditorWithTransliteration = ({ setCode }) => {
  const [word, setWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');

  useEffect(() => {
    // Immediately attempt to fetch transliteration suggestions if a word is present
    if (word) {
      fetchTransliterationSuggestions(word);
    } else {
      // Clear suggestions if the word is emptied
      setSuggestions([]);
    }
  }, [word]);

  const fetchTransliterationSuggestions = async (inputWord) => {
    try {
      const suggestions = await getTransliterateSuggestions(inputWord, {
        numOptions: 5, // fetch a few suggestions
        showCurrentWordAsLastSuggestion: true, // include the original word as an option
        lang: "hi", // assuming Hindi transliteration
      });
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching transliteration suggestions:", error);
      setSuggestions([]); // Clear suggestions on error
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setCode(suggestion); // Update the parent component's code state
    setSuggestions([]); // Clear suggestions after selection
    setWord(''); // Optionally clear the word to reset the state
  };

  return (
    <Box>
      <Input
        placeholder="Type here in Hindi..."
        value={selectedSuggestion}
        onChange={(e) => {
          setWord(e.target.value);
          setSelectedSuggestion(e.target.value); // Update the input field as user types
        }}
        onFocus={() => {
          setWord('');
          setSelectedSuggestion(''); // Reset on focus for a new transliteration session
        }}
      />
      {suggestions.length > 0 && (
        <List spacing={2} mt={2}>
          {suggestions.map((suggestion, index) => (
            <ListItem key={index} cursor="pointer" _hover={{ bg: "gray.100" }} p={2} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default EditorWithTransliteration;
