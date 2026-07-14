import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const currentLang = lang || 'en';

  const handleGoHome = () => {
    navigate(`/${currentLang}/projects`);
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/${currentLang}/projects`);
    }
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-illustration">
          <div className="not-found-code">404</div>
          <div className="not-found-glow"></div>
        </div>
        <h1 className="not-found-title">{t('notFound.title', 'Page Not Found')}</h1>
        <p className="not-found-description">
          {t('notFound.description', 'The link you accessed does not exist or has been moved to another address. Please check the link or return to the dashboard.')}
        </p>
        <div className="not-found-actions">
          <button className="not-found-btn btn-secondary" onClick={handleGoBack} title={t('notFound.goBackTitle', 'Go back to the previous page')}>
            <FaArrowLeft className="btn-icon" /> {t('notFound.goBack', 'Go Back')}
          </button>
          <button className="not-found-btn btn-primary" onClick={handleGoHome} title={t('notFound.goHomeTitle', 'Return to the Dashboard')}>
            <FaHome className="btn-icon" /> {t('notFound.goHome', 'To Dashboard')}
          </button>
        </div>
      </div>
    </div>
  );
}
