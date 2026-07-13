import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { analyticsService } from '../../services/analyticsService';
import styles from '../../styles/curatedArticles.module.css';

/**
 * ExportPanel Component
 * Displays export options as buttons.
 */
export const ExportPanel = ({ projectId, filters = {} }) => {
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);

  const fetchExportData = async () => {
    try {
      let allItems = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        const res = await analyticsService.fetchCuratedArticles({ 
          project_id: projectId, 
          page: currentPage, 
          limit: 100, 
          ...filters 
        });
        
        if (res?.data) {
          allItems = [...allItems, ...(res.data.items || [])];
          totalPages = res.data.totalPages || 1;
        } else {
          break;
        }
        currentPage++;
      } while (currentPage <= totalPages);
      
      return allItems.map(article => ({
        "Tên article": article.title || '',
        "Năm publish": article.publishedYear || '',
        "Open access": article.isOpenAccess ? 'True' : 'False',
        "Keyword": article.keywords || '',
        "Author": article.authors || '',
        "Abstract": article.description || ''
      }));
    } catch (err) {
      console.error('Failed to fetch data for export:', err);
      alert(t('analytics.failedToPrepareExport', 'Failed to prepare export data.'));
      return null;
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    const data = await fetchExportData();
    if (data && data.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
      // Adding BOM for UTF-8 Excel compatibility
      const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvOutput], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "curated_articles.csv");
    } else if (data && data.length === 0) {
      alert(t('analytics.noDataToExport', 'No data available to export.'));
    }
    setIsExporting(false);
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    const data = await fetchExportData();
    if (data && data.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Articles");
      
      const wscols = [
        {wch: 50}, // Tên article
        {wch: 15}, // Năm publish
        {wch: 15}, // Open access
        {wch: 40}, // Keyword
        {wch: 40}, // Author
        {wch: 100} // Abstract
      ];
      worksheet['!cols'] = wscols;

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
      saveAs(blob, "curated_articles.xlsx");
    } else if (data && data.length === 0) {
      alert(t('analytics.noDataToExport', 'No data available to export.'));
    }
    setIsExporting(false);
  };

  return (
    <div className={styles.panelCard}>
      <h3 className={styles.panelTitle}>{t('analytics.exportOptions', 'Export Options')}</h3>
      <div className={styles.exportButtons}>
        <button className={styles.exportBtn} onClick={handleExportCSV} disabled={isExporting}>
          <svg className={styles.exportIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span className={styles.exportText}>{isExporting ? t('analytics.exporting', 'Exporting...') : t('analytics.exportCsv', 'Export CSV')}</span>
          <svg className={styles.chevronIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <button className={styles.exportBtn} onClick={handleExportExcel} disabled={isExporting}>
          <svg className={styles.exportIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <span className={styles.exportText}>{isExporting ? t('analytics.exporting', 'Exporting...') : t('analytics.exportExcel', 'Export Excel')}</span>
          <svg className={styles.chevronIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};
