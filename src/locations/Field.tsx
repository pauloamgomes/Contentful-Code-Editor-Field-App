import { FieldAppSDK } from "@contentful/app-sdk";
import {
  Autocomplete,
  Box,
  Text,
  IconButton,
  Stack,
} from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";
import { useEffect, useState } from "react";
import { CopyIcon } from "@contentful/f36-icons";

import FieldCodeEditor from "../components/FieldCodeEditor";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const { languages, colorMode } = sdk.parameters.installation;
  const value = sdk.field.getValue() || { language: "js", code: "" };

  const enabledLanguages = Object.keys(languages)
    .filter((key) => languages[key].enabled)
    .map((key) => ({ type: key, name: languages[key].name }));

  const [filteredLanguages, setFilteredLanguages] = useState(enabledLanguages);

  useEffect(() => {
    sdk.window.startAutoResizer();

    return sdk.window.stopAutoResizer;
  }, []);

  const handleLanguageChange = (value: any) => {
    const newFilteredItems = enabledLanguages.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.type.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredLanguages(newFilteredItems);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value.code);
    sdk.notifier.success("Code copied to clipboard");
  };

  return (
    <Stack flexDirection="column">
      <Stack justifyContent="space-between" fullWidth marginTop="spacingM">
        <Stack>
          <Text>Language:</Text>
          <Autocomplete
            defaultValue={value.language}
            items={filteredLanguages}
            noMatchesMessage="No language found."
            onInputValueChange={handleLanguageChange}
            onSelectItem={(item) => {
              sdk.field.setValue({ ...value, language: item.type });
            }}
            itemToString={(item) => item.name}
            renderItem={(item) => `${item.name} (${item.type})`}
          />
        </Stack>
        <IconButton
          variant="secondary"
          aria-label="Copy code to clipboard"
          size="small"
          icon={<CopyIcon />}
          onClick={handleCopyToClipboard}
        />
      </Stack>

      <Box style={{ width: "100%" }}>
        <FieldCodeEditor
          value={value}
          colorMode={colorMode}
          onChange={(newValue) => {
            sdk.field.setValue(newValue);
          }}
        />
      </Box>
    </Stack>
  );
};

export default Field;
