import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';
import { languages, languageToPath, pathToLanguage, type LanguageCode } from '../i18n';

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLangCode = e.target.value as LanguageCode;
    const newPath = languageToPath[newLangCode];

    // Change i18n language
    i18n.changeLanguage(newLangCode);

    // Navigate to new language path
    navigate(`/${newPath}/`, { replace: true });
  };

  // Get current language code from URL
  const currentLangCode = lang ? pathToLanguage[lang] : 'ja';

  return (
    <div className="flex items-center space-x-2">
      <FaGlobe className="text-slate-500" />
      <select
        value={currentLangCode}
        onChange={handleLanguageChange}
        className="text-sm bg-transparent border border-slate-300 rounded-md px-2 py-1 text-slate-600 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label={t('language.label')}
      >
        {Object.entries(languages).map(([code, { name }]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
