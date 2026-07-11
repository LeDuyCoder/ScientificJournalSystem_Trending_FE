import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import { LANGUAGE } from '../../constants/storageKeys';
import { buildLocalizedPath } from '../../../app/routes/languageRouting';
import './LanguageSelector.css';

const LANGUAGE_LABELS = {
  vi: { label: 'Tiếng Việt', flag: '🇻🇳' },
  en: { label: 'English', flag: '🇺🇸' },
  ja: { label: '日本語', flag: '🇯🇵' },
  ko: { label: '한국어', flag: '🇰🇷' }
};

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem(LANGUAGE, newLang);
    setDropdownOpen(false);
    
    const targetPath = buildLocalizedPath(newLang, location.pathname);
    navigate(targetPath);
  };

  const currentLangCode = lang || i18n.language || 'en';
  const currentLang = LANGUAGE_LABELS[currentLangCode] || LANGUAGE_LABELS.en;

  return (
    <div className="lang-selector-wrapper" ref={dropdownRef}>
      <button 
        className="lang-selector-trigger" 
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        <FiGlobe className="globe-icon" />
        <span className="lang-label">{currentLang.flag} {currentLang.label}</span>
        <FiChevronDown className={`chevron-icon ${dropdownOpen ? 'rotated' : ''}`} />
      </button>

      {dropdownOpen && (
        <ul className="lang-dropdown-menu">
          {Object.entries(LANGUAGE_LABELS).map(([code, { label, flag }]) => (
            <li key={code}>
              <button
                className={`lang-dropdown-item ${currentLangCode === code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(code)}
              >
                <span className="item-flag">{flag}</span>
                <span className="item-label">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
