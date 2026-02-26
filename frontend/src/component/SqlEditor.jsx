import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

const SqlEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <Editor
      height="400px"
      defaultLanguage="sql"
      defaultValue={value || "-- Write your SQL here"}
      onChange={(val) => onChange && onChange(val)}
      theme="vs-dark"
      onMount={handleEditorDidMount}
      options={{
        automaticLayout: true, // auto resize
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
};

export default SqlEditor;