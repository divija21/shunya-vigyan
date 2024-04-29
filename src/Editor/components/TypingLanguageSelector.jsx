// TypingLanguageSelector.jsx
import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

const typingLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  // Add more typing languages as needed
];

const ACTIVE_COLOR = "blue.400"; // Define the active color

const TypingLanguageSelector = ({ typingLanguage, onSelect }) => {
  return (
    <HStack className="bg-gray-200 rounded-t-md text-black pl-2 pr-2 pt-2 pb-2 justify-start" alignItems="center">
      <Text fontSize="lg">Typing Language:</Text>
      <Menu isLazy>
        <MenuButton as={Button} bg={"#ffffff70"}>
          {typingLanguages.find(lang => lang.code === typingLanguage)?.name || 'Select Typing Language'}
        </MenuButton>
        <MenuList bg="#110c1b">
          {typingLanguages.map(lang => (
            <MenuItem
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              color={typingLanguage === lang.code ? ACTIVE_COLOR : "white"}
              bg={typingLanguage === lang.code ? "gray.900" : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: "gray.900",
              }}
            >
              {lang.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default TypingLanguageSelector;
