import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: {
    language: string;
    code: string;
  };
  colorMode?: "dark" | "light";
  onChange: (value: any) => void;
};

const FieldCodeEditor = ({
  value,
  colorMode,
  onChange
}: Props) => {
  const sdk = useSDK<FieldAppSDK>();
  const debounceInterval: any = useRef(false);

  const [code, setCode] = useState<string>(value.code);

  useEffect(() => {
    sdk.window.startAutoResizer();

    return sdk.window.stopAutoResizer;
  }, []);

  useEffect(() => {
    clearTimeout(debounceInterval.current);

    debounceInterval.current = window.setTimeout(() => {
      if (code !== value.code) {
        onChange({ ...value, code });
      }
    }, 500);

    return () => {
      clearTimeout(debounceInterval.current);
    };
  }, [code]);

  return (
    <CodeEditor
      value={code}
      language={value.language}
      placeholder="Please enter some code."
      onChange={(e) => setCode(e.target.value)}
      minHeight={200}
      data-color-mode={colorMode}
      style={{
        fontSize: 14,
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  );
};

export default FieldCodeEditor;
