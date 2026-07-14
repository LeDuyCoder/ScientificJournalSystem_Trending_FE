import React from 'react';
import { useTranslation } from 'react-i18next';
import './DashboardFooter.css';

export default function DashboardFooter() {
  const { t } = useTranslation();

  return (
    <footer className="dashboard-footer">
      <div className="dashboard-footer-left">
        <div className="dashboard-footer-copyright">
          {t('footer.copyright', '© 2026 Scientia Bibliometric Analytics. All rights reserved.')}
        </div>
      </div>
      <div className="dashboard-footer-right">
        <a href="#privacy" className="dashboard-footer-link">{t('footer.privacyPolicy', 'Privacy Policy')}</a>
        <a href="#terms" className="dashboard-footer-link">{t('footer.termsOfService', 'Terms of Service')}</a>
        <a href="#docs" className="dashboard-footer-link">{t('footer.documentation', 'Documentation')}</a>
        <a href="#support" className="dashboard-footer-link">{t('footer.contactSupport', 'Contact Support')}</a>
      </div>
    </footer>
  );
}
