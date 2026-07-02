import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiFilter, FiTrendingUp, FiCheck, FiX, FiChevronDown } from 'react-icons/fi';
import { BiSortAlt2 } from 'react-icons/bi';
import '../styles/ProjectsPage.css';

const INITIAL_PROJECTS = [
  {
    id: 'neural-network-mapping',
    title: 'Neural Network Mapping',
    domain: 'ARTIFICIAL INTELLIGENCE',
    tags: ['DEEP LEARNING', 'CNN', 'RNN', 'TOPOLOGY'],
    creator: {
      name: 'Julian Vane',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    },
    modifiedAt: '2023-10-20',
  },
  {
    id: 'quantum-computing-algorithms',
    title: 'Quantum Computing Algorithms',
    domain: 'QUANTUM PHYSICS',
    tags: ['ALGORITHMS', 'SIMULATION', 'CRYPTOGRAPHY', 'QUBIT'],
    creator: {
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    },
    modifiedAt: '2023-11-12',
  },
  {
    id: 'biomedical-text-mining',
    title: 'Biomedical Text Mining',
    domain: 'BIOINFORMATICS',
    tags: ['NLP', 'PUBMED', 'GENOMICS', 'BERT'],
    creator: {
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    },
    modifiedAt: '2023-09-05',
  },
  {
    id: 'climate-change-trend-analysis',
    title: 'Climate Change Trend Analysis',
    domain: 'ENVIRONMENTAL SCIENCE',
    tags: ['METEOROLOGY', 'TIME-SERIES', 'GLOBAL-WARMING', 'TRENDS'],
    creator: {
      name: 'Emma Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    },
    modifiedAt: '2023-12-01',
  },
  {
    id: 'blockchain-consensus-protocols',
    title: 'Blockchain Consensus Protocols',
    domain: 'COMPUTER NETWORKS',
    tags: ['DISTRIBUTED-SYSTEMS', 'PROOF-OF-STAKE', 'SECURITY'],
    creator: {
      name: 'Alex Wright',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    },
    modifiedAt: '2023-08-18',
  }
];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [selectedDomain, setSelectedDomain] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('NEWEST'); // NEWEST, OLDEST, A-Z
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Modal State for New Project
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    domain: 'ARTIFICIAL INTELLIGENCE',
    tagsStr: '',
  });

  const domains = ['ALL', 'ARTIFICIAL INTELLIGENCE', 'QUANTUM PHYSICS', 'BIOINFORMATICS', 'ENVIRONMENTAL SCIENCE', 'COMPUTER NETWORKS'];

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}/dashboard`);
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const tags = newProject.tagsStr
      .split(',')
      .map(t => t.trim().toUpperCase())
      .filter(t => t.length > 0);

    const createdProject = {
      id: newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newProject.title,
      domain: newProject.domain,
      tags: tags.length > 0 ? tags : ['GENERAL'],
      creator: {
        name: 'Julian Vane',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      },
      modifiedAt: new Date().toISOString().split('T')[0],
    };

    setProjects([createdProject, ...projects]);
    setShowCreateModal(false);
    setNewProject({ title: '', domain: 'ARTIFICIAL INTELLIGENCE', tagsStr: '' });
  };

  // Filter & Sort logic
  const filteredProjects = projects.filter(project => {
    if (selectedDomain === 'ALL') return true;
    return project.domain === selectedDomain;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOrder === 'NEWEST') {
      return new Date(b.modifiedAt) - new Date(a.modifiedAt);
    }
    if (sortOrder === 'OLDEST') {
      return new Date(a.modifiedAt) - new Date(b.modifiedAt);
    }
    if (sortOrder === 'A-Z') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="projects-page-container">
      <div className="projects-header-section">
        <div className="projects-title-block">
          <h1 className="projects-page-title">Research Projects</h1>
          <p className="projects-page-subtitle">Manage and track your ongoing bibliometric research initiatives.</p>
        </div>

        <div className="projects-actions-block">
          {/* Filter Dropdown */}
          <div className="dropdown-wrapper">
            <button 
              className={`projects-action-btn ${selectedDomain !== 'ALL' ? 'active' : ''}`}
              onClick={() => {
                setShowFilterDropdown(!showFilterDropdown);
                setShowSortDropdown(false);
              }}
            >
              <FiFilter className="btn-icon" />
              <span>Lọc: {selectedDomain === 'ALL' ? 'Tất cả' : selectedDomain}</span>
              <FiChevronDown className="chevron-icon" />
            </button>
            {showFilterDropdown && (
              <div className="dropdown-menu">
                {domains.map(d => (
                  <button 
                    key={d} 
                    className={`dropdown-item ${selectedDomain === d ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedDomain(d);
                      setShowFilterDropdown(false);
                    }}
                  >
                    <span>{d === 'ALL' ? 'Tất cả lĩnh vực' : d}</span>
                    {selectedDomain === d && <FiCheck className="check-icon" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="dropdown-wrapper">
            <button 
              className="projects-action-btn"
              onClick={() => {
                setShowSortDropdown(!showSortDropdown);
                setShowFilterDropdown(false);
              }}
            >
              <BiSortAlt2 className="btn-icon" />
              <span>Sắp xếp: {sortOrder === 'NEWEST' ? 'Mới nhất' : sortOrder === 'OLDEST' ? 'Cũ nhất' : 'Tên A-Z'}</span>
              <FiChevronDown className="chevron-icon" />
            </button>
            {showSortDropdown && (
              <div className="dropdown-menu">
                <button 
                  className={`dropdown-item ${sortOrder === 'NEWEST' ? 'selected' : ''}`}
                  onClick={() => {
                    setSortOrder('NEWEST');
                    setShowSortDropdown(false);
                  }}
                >
                  <span>Mới sửa đổi</span>
                  {sortOrder === 'NEWEST' && <FiCheck className="check-icon" />}
                </button>
                <button 
                  className={`dropdown-item ${sortOrder === 'OLDEST' ? 'selected' : ''}`}
                  onClick={() => {
                    setSortOrder('OLDEST');
                    setShowSortDropdown(false);
                  }}
                >
                  <span>Cũ sửa đổi</span>
                  {sortOrder === 'OLDEST' && <FiCheck className="check-icon" />}
                </button>
                <button 
                  className={`dropdown-item ${sortOrder === 'A-Z' ? 'selected' : ''}`}
                  onClick={() => {
                    setSortOrder('A-Z');
                    setShowSortDropdown(false);
                  }}
                >
                  <span>Tên từ A-Z</span>
                  {sortOrder === 'A-Z' && <FiCheck className="check-icon" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {/* New Project Card */}
        <div className="project-card new-project-card" onClick={() => setShowCreateModal(true)}>
          <div className="new-project-icon-wrapper">
            <FiPlus className="plus-icon" />
          </div>
          <h3 className="new-project-title">New Project</h3>
          <p className="new-project-subtitle">Start fresh volume</p>
        </div>

        {/* Regular Project Cards */}
        {sortedProjects.map(project => (
          <div 
            key={project.id} 
            className="project-card real-project-card"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="project-card-header">
              <span className="project-domain-tag">{project.domain}</span>
            </div>
            
            <h3 className="project-title" title={project.title}>
              {project.title}
            </h3>

            <div className="project-tags-list">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="project-sub-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-card-footer">
              <div className="project-creator">
                <img 
                  src={project.creator.avatar} 
                  alt={project.creator.name} 
                  className="creator-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.creator.name)}&background=F97316&color=fff`;
                  }}
                />
                <span className="creator-name">{project.creator.name}</span>
              </div>
              <span className="project-date">
                {formatDate(project.modifiedAt)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Tạo Dự Án Mới</h2>
              <button className="modal-close-btn" onClick={() => setShowCreateModal(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="proj-title">Tên dự án *</label>
                <input 
                  id="proj-title"
                  type="text" 
                  className="form-input" 
                  value={newProject.title}
                  onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Nhập tên dự án nghiên cứu..."
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-domain">Lĩnh vực nghiên cứu</label>
                <select 
                  id="proj-domain"
                  className="form-select"
                  value={newProject.domain}
                  onChange={e => setNewProject({ ...newProject, domain: e.target.value })}
                >
                  {domains.filter(d => d !== 'ALL').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-tags">Từ khóa (phân cách bằng dấu phẩy)</label>
                <input 
                  id="proj-tags"
                  type="text" 
                  className="form-input" 
                  value={newProject.tagsStr}
                  onChange={e => setNewProject({ ...newProject, tagsStr: e.target.value })}
                  placeholder="Ví dụ: DEEP LEARNING, GNN, LSTM..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="modal-btn btn-cancel" onClick={() => setShowCreateModal(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className="modal-btn btn-submit">
                  Tạo dự án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
