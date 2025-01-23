import { useDispatch, useSelector } from 'react-redux';
import { runCode } from '../redux/slices/codeExecutionSlice';

const useCodeExecution = () => {
  const dispatch = useDispatch();
  const output = useSelector((state) => state.codeExecution.output);
  const status = useSelector((state) => state.codeExecution.status);
  const error = useSelector((state) => state.codeExecution.error);

  const executeCode = (language, version, code, stdin = "") => {
    dispatch(runCode({ language, version, code, stdin }));
  };

  return { output, status, error, executeCode };
};

export default useCodeExecution;