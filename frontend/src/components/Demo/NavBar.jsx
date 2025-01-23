import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedLanguage,
  fetchLanguages,
} from "../../redux/slices/languageSlice";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const selectedVersion = useSelector(
    (state) => state.language.additionalData.version
  );
  const languages = useSelector((state) => state.language.languages);

  useEffect(() => {
    dispatch(fetchLanguages());
    const storedLanguage = localStorage.getItem('selectedLanguage');
    const storedVersion = localStorage.getItem('selectedVersion');
    const storedBoilerplate = localStorage.getItem('boilerplate');
    if (storedLanguage && storedVersion && storedBoilerplate) {
      dispatch(setSelectedLanguage({ language: storedLanguage, additionalData: { version: storedVersion, boilerplate: storedBoilerplate } }));
    } else {
      navigate('/demo');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const path = location.pathname;
    if (!path.startsWith("/demo/")) {
      dispatch(setSelectedLanguage({ language: null, additionalData: { version: null, boilerplate: null } }));
      localStorage.clear()

    }
  }, [location, dispatch]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (event) => {
    const selectedLang = JSON.parse(event.target.getAttribute("value"));
    if (selectedLang) {
      const data = {
        language: selectedLang.language,
        additionalData: {
          version: selectedLang.version,
          boilerplate: selectedLang.boilerplate,
        },
      };
      dispatch(setSelectedLanguage(data));
      navigate(`/demo/${selectedLang.language}&version=${selectedLang.version}`);
      setIsOpen(false); // Close dropdown after selection
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayLanguage = selectedLanguage === 'csharp' ? 'c#' : selectedLanguage;

  return (
    <div className="w-screen h-[12vh] flex justify-center items-center px-4">
      <div className="bg-navbar-background text-navbar-text w-full max-w-[80em] h-[3.5em] rounded-[0.5em] flex justify-between items-center">
        <Link
          to="/"
          className="w-[20em] h-full flex justify-center items-center"
        >
          <h1>CodeScripty</h1>
        </Link>
        <div className="text-navbar-button-text w-full max-w-[40em] h-full flex justify-evenly items-center space-x-4 md:space-x-6">
          <div className="bg-navbar-button-bg w-[9em] h-[2em] flex justify-center items-center rounded-[0.5em]">
            <p>Light</p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <div
              className="bg-navbar-button-bg w-[12em] h-[2em] flex justify-center items-center rounded-[0.5em] cursor-pointer"
              onClick={toggleDropdown}
            >
              <p>
                {selectedLanguage
                  ? `${displayLanguage} (${selectedVersion})`
                  : "Select Language"}
              </p>
            </div>
            {isOpen && (
              <div className="absolute mt-2 w-[12em] h-[10em] bg-white border border-gray-300 rounded shadow-lg overflow-y-auto z-50">
                <ul>
                  {languages.map((language) => {
                    const displayLanguage = language.language === 'csharp' ? 'c#' : language.language;
                    return (
                      <li
                        key={language.language}
                        value={JSON.stringify(language)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLanguageSelect}
                      >
                        {`${displayLanguage} (${language.version})`}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="bg-navbar-button-bg w-[5em] h-[2em] flex justify-center items-center rounded-[0.5em]">
            <p>Pro</p>
          </div>
          <div className="bg-navbar-button-bg w-[6em] h-[2em] flex justify-center items-center rounded-[0.5em]">
            <p>Sign In</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;