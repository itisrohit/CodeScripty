import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BodyContent from '../components/Demo/BodyContent';
import NavBar from '../components/Demo/NavBar';

const LanguageIDE = () => {
  const { language } = useParams();
  const location = useLocation();
  const version = location.state?.version;
  const boilerplate = location.state?.boilerplate;

  return (
    <div>
      <NavBar language={language} version={version}/>
      <BodyContent language={language} version={version} boilerplate={boilerplate} />
    </div>
  );
};

export default LanguageIDE;