import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@monaco-editor/react'
const MonacoEditor = () => {
    const editorRef = useRef();
    const [value, setValue] = useState('');
    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus()
    };
  return (
    <div className="h-full">
        <Editor
            height="100%"
            theme='vs-dark'
            defaultLanguage="javascript"
            defaultValue="// some comment"
            onMount={onMount}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            options={{
              fontSize: 14,
              minimap: { enabled: false }, 
              scrollbar: {
                vertical: "auto", 
                horizontal: "auto", 
              },
              wordWrap: "on", 
              scrollBeyondLastLine: false, 
              overviewRulerLanes: 0, 
            }}
        />
    </div>
  )
}

export default MonacoEditor
