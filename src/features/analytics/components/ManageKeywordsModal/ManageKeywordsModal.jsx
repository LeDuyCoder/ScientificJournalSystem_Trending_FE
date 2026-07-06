import React, { useState, useEffect, useRef } from 'react';
import { analyticsService } from '../../services/analyticsService';
import styles from './ManageKeywordsModal.module.css';
import { KeywordChip } from '../KeywordChip/KeywordChip';

export const ManageKeywordsModal = ({ projectId, initialKeywords = [], onSave, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const debounceRef = useRef(null);

  // Local state for the modal
  const [localKeywords, setLocalKeywords] = useState([...initialKeywords]);
  const [pendingAdds, setPendingAdds] = useState([]); // list of strings
  const [pendingRemoves, setPendingRemoves] = useState([]); // list of original IDs

  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const res = await analyticsService.searchKeywords(inputValue);
        if (res?.data?.suggestions) {
          setSuggestions(res.data.suggestions);
        }
      } catch (err) {
        console.error('Error searching keywords:', err);
      } finally {
        setLoadingSearch(false);
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [inputValue]);

  const handleAddKeyword = (keywordName) => {
    const cleanName = keywordName.trim();
    if (!cleanName) return;
    
    // Check if already in local list
    if (localKeywords.some(k => k.label.toLowerCase() === cleanName.toLowerCase())) {
      setInputValue('');
      setSuggestions([]);
      return;
    }

    // Add to local list with temporary id
    const tempId = 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    setLocalKeywords(prev => [...prev, { id: tempId, label: cleanName }]);
    setPendingAdds(prev => [...prev, cleanName]);
    
    setInputValue('');
    setSuggestions([]);
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setLocalKeywords(prev => prev.filter(k => k.id !== keywordToRemove.id));
    
    if (typeof keywordToRemove.id === 'string' && keywordToRemove.id.startsWith('temp_')) {
      // It was just added, simply remove from pendingAdds
      setPendingAdds(prev => prev.filter(name => name.toLowerCase() !== keywordToRemove.label.toLowerCase()));
    } else {
      // It's a real keyword from DB, add to pendingRemoves
      if (!pendingRemoves.includes(keywordToRemove.id)) {
        setPendingRemoves(prev => [...prev, keywordToRemove.id]);
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const promises = [];
      
      // Perform removes
      for (const id of pendingRemoves) {
        promises.push(analyticsService.removeProjectKeyword(projectId, id));
      }
      
      // Perform adds
      for (const label of pendingAdds) {
        promises.push(analyticsService.addProjectKeyword(projectId, label));
      }
      
      await Promise.all(promises);
      onSave(); // This will close the modal and trigger refetch
    } catch (err) {
      console.error('Error saving keywords:', err);
      alert('Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Manage Tracked Keywords</h3>
          <button className={styles.closeBtn} onClick={onClose} disabled={isSaving}>&times;</button>
        </div>

        <div className={styles.inputContainer}>
          <input 
            type="text" 
            placeholder="Type keyword name to add..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddKeyword(inputValue);
              }
            }}
            className={styles.keywordInput}
            disabled={isSaving}
          />
          {loadingSearch && <div className={styles.loadingText}>Searching...</div>}
          
          {suggestions.length > 0 && (
            <div className={styles.suggestionsList}>
              {suggestions.map((s, idx) => (
                <div 
                  key={idx} 
                  className={styles.suggestionItem}
                  onClick={() => handleAddKeyword(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.currentKeywords}>
          <h4>Current Keywords ({localKeywords.length})</h4>
          <div className={styles.keywordChipsContainer}>
            {localKeywords.map(kw => (
              <div key={kw.id} className={styles.chipWrapper}>
                <KeywordChip label={kw.label} />
                <button 
                  className={styles.removeChipBtn} 
                  onClick={() => handleRemoveKeyword(kw)}
                  title="Remove"
                  disabled={isSaving}
                >
                  &times;
                </button>
              </div>
            ))}
            {localKeywords.length === 0 && <p className={styles.emptyText}>No keywords tracked.</p>}
          </div>
        </div>
        
        <div className={styles.actionButtons}>
          <button 
            className={styles.cancelBtn} 
            onClick={onClose}
            disabled={isSaving}
          >
            Hủy
          </button>
          <button 
            className={styles.saveBtn} 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Đang lưu...' : 'Xác nhận'}
          </button>
        </div>
      </div>
    </div>
  );
};
