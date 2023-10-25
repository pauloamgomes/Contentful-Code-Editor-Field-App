import { ConfigAppSDK } from "@contentful/app-sdk";
import {
  Checkbox,
  Flex,
  Form,
  FormControl,
  Grid,
  Heading,
  Paragraph,
  Radio,
  Stack,
  Switch,
  TextInput,
} from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";
import { css } from "emotion";
import { useCallback, useEffect, useState } from "react";
import { ILanguages, languages as allLanguages } from "../utils/languages";

export interface AppInstallationParameters {
  languages: ILanguages;
  colorMode?: "dark" | "light";
}

const defaultParameters: AppInstallationParameters = {
  languages: allLanguages,
};

const ConfigScreen = () => {
  const [parameters, setParameters] =
    useState<AppInstallationParameters>(defaultParameters);
  const sdk = useSDK<ConfigAppSDK>();

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();

    return {
      // Parameters to be persisted as the app configuration.
      parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null =
        await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  const { languages = allLanguages, colorMode } = parameters;

  return (
    <Flex
      flexDirection="column"
      className={css({ margin: "80px", maxWidth: "800px" })}
    >
      <Form>
        <Heading>Code Editor Field Config</Heading>
        <Paragraph>Configure the Code Editor Field Application:</Paragraph>

        <FormControl as="fieldset">
          <FormControl.Label as="legend" marginBottom="none">
            Color Mode
          </FormControl.Label>
          <Paragraph>Set the color mode of the code editor</Paragraph>
          <Radio.Group
            name="colorMode"
            value={colorMode || "system"}
            onChange={(e) => {
              setParameters({
                ...parameters,
                colorMode: e.target.value === "system" ? undefined : e.target.value as "dark" | "light",
              });
            }}
          >
            <Radio value="system">System</Radio>
            <Radio value="dark">Dark</Radio>
            <Radio value="light">Light</Radio>
          </Radio.Group>
        </FormControl>        

        <FormControl as="fieldset">
          <FormControl.Label>Allowed Languages</FormControl.Label>
          <Paragraph>
            Select languages to display in the editor language field dropdown.
          </Paragraph>
          <Grid
            style={{ width: "100%" }}
            columns="repeat(5, 1fr)"
            rowGap="spacingS"
            columnGap="spacingM"
          >
            {Object.keys(languages).map((key) => (
              <Grid.Item key={key}>
                <Checkbox
                  value={key}
                  id={`option-${key}`}
                  isChecked={languages[key].enabled}
                  onChange={() => {
                    const changedLanguages = JSON.parse(JSON.stringify(languages))
                    changedLanguages[key].enabled = !languages[key].enabled
                    setParameters({
                      ...parameters,
                      languages: changedLanguages,
                    });
                  }}
                >
                  {languages[key].name}
                </Checkbox>
              </Grid.Item>
            ))}
          </Grid>
        </FormControl>
      </Form>
    </Flex>
  );
};

export default ConfigScreen;
