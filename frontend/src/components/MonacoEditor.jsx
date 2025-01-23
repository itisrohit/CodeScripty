import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@monaco-editor/react';
import { setBoilerplate } from '../redux/slices/codeExecutionSlice';

const MonacoEditor = () => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const selectedBoilerplate = useSelector((state) => state.language.additionalData.boilerplate);
  const boilerplate = useSelector((state) => state.codeExecution.boilerplate) || '';

  useEffect(() => {
    if (selectedBoilerplate) {
      dispatch(setBoilerplate(selectedBoilerplate));
    }
  }, [selectedBoilerplate, dispatch]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Convert 'c++' to 'cpp' for Monaco Editor
  const monacoLanguage = selectedLanguage === 'c++' ? 'cpp' : selectedLanguage === 'csharp' ? 'c#' : selectedLanguage;

  return (
    <div className="h-full">
      <Editor
        height="100%"
        theme="vs-light"
        language={monacoLanguage}
        defaultValue={boilerplate}
        onMount={onMount}
        value={boilerplate}
        onChange={(newValue) => dispatch(setBoilerplate(newValue))}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
          },
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          overviewRulerLanes: 0,
        }}
      />
    </div>
  );
};

export default MonacoEditor;