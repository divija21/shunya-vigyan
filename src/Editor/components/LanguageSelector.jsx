import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <HStack
      className="bg-gray-200 rounded-t-md text-black pl-2 pr-2 pt-2 pb-2"
      alignItems="center"
      justifyContent="flex-end" 
    >
      <Text fontSize="lg">Language:</Text>
      <Menu isLazy>
        <MenuButton
          color={"black"}
          fontWeight={500}
          fontSize={14}
          backgroundColor={"#ffffff70"}
          as={Button}
          boxSize={"max-content"}
        >
          {language}
        </MenuButton>
        <MenuList bg="#110c1b">
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : "white"}
              bg={lang === language ? "gray.900" : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: "gray.900",
              }}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
              <Text as="span" color="gray.600" fontSize="sm">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
};
export default LanguageSelector;
