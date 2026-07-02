import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-illustration">
          <div className="not-found-code">404</div>
          <div className="not-found-glow"></div>
        </div>
        <h1 className="not-found-title">Không tìm thấy trang</h1>
        <p className="not-found-description">
          Đường dẫn bạn truy cập không tồn tại hoặc đã được di chuyển sang địa chỉ khác. 
          Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
        </p>
        <div className="not-found-actions">
          <button className="not-found-btn btn-secondary" onClick={handleGoBack} title="Quay lại trang trước">
            <FaArrowLeft className="btn-icon" /> Quay lại
          </button>
          <button className="not-found-btn btn-primary" onClick={handleGoHome} title="Về trang chủ Dashboard">
            <FaHome className="btn-icon" /> Về Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
