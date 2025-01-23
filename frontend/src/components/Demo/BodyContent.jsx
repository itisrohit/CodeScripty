import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MonacoEditor from "../MonacoEditor";
import useCodeExecution from "../../hooks/useCodeExecution";

const BodyContent = () => {
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const selectedVersion = useSelector((state) => state.language.additionalData.version);
  const boilerplate = useSelector((state) => state.codeExecution.boilerplate) || '';
  const [stdin, setStdin] = useState("");
  const { output, status, error, executeCode } = useCodeExecution();
  const [isLanguageSelected, setIsLanguageSelected] = useState(!!selectedLanguage);

  useEffect(() => {
    setIsLanguageSelected(!!selectedLanguage);
  }, [selectedLanguage]);

  const handleRunCode = () => {
    executeCode(selectedLanguage, selectedVersion, boilerplate, stdin);
  };

  return (
    <div className="w-screen h-[calc(100vh-13vh)] flex justify-center px-4">
      <div className="relative w-full max-w-[80em] h-full">
        <div
          className={`w-full h-full flex flex-col md:flex-row ${
            !isLanguageSelected ? "blur-sm" : ""
          }`}
        >
          <div className="w-full md:w-[65%] flex flex-col h-full">
            <div className="h-[2.5em] flex justify-between border border-green-500">
              <div className="w-[14em] h-full flex justify-center items-center border border-white">
                <p>Untitled</p>
              </div>
              <div className="w-[15em] h-full flex justify-center items-center">
                <button
                  className="w-[5em] h-[1.8em] bg-navbar-button-bg rounded-[0.5em] active:bg-navbar-button-bg-active active:scale-95"
                  // onClick={handleRunCode}
                  onClick={handleRunCode}
                >
                  Run
                </button>
              </div>
            </div>
            <MonacoEditor />
          </div>
          <div className="w-full md:w-[35%] mt-4 md:mt-0">
            <div className="w-full h-[6em] flex flex-col justify-between">
              <p className="p-[0.5em]">Input:</p>
              <div className="h-[3.5em] flex justify-center">
                <input
                  className="w-[95%] h-full focus:outline-none"
                  type="text"
                  placeholder="Give an input"
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full h-[calc(100%-6em)] flex flex-col justify-between border border-lime-300">
              <div className="p-[0.5em] h-[3em] border border-gray-300">
                <p>Output:</p>
              </div>
              <div className="h-[calc(100%-3em)] border border-red-400 overflow-auto p-[0.5em]">
                {status === 'loading' && <p>Running...</p>}
                {status === 'succeeded' && <pre>{output}</pre>}
                {status === 'failed' && <p>Error: {error}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for "Please select a language" */}
        {!isLanguageSelected && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <p className="text-lg font-semibold text-gray-700">
                Please select a language to proceed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyContent;