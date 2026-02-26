import React, { useRef } from "react";
import Editor from "@monaco-editor/react";


const SqlEditor = ({ value, onChange, assignment = { id: "123", question: "What is SQL?" } }) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }



  return (
    <div className="sql-editor">
           
      <Editor
        height="400px"
        defaultLanguage="sql"
        defaultValue={value || "-- Write your SQL here"}
        onChange={(val) => onChange && onChange(val)}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />

    </div>
  );
};

export default SqlEditor;
