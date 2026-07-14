import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiChevronRight } from 'react-icons/fi';
import { coreApiClient } from '../../api/axios';
import './Sidebar.css';

const normalizeProjectsResponse = (response) => {
  const items = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

  return items
    .map((project) => {
      const id = project.project_id ?? project.id;
      const title = project.title || project.project_name || 'Untitled Project';
      const domain = project.subject_area || project.domain || 'General Research';

      return {
        id: id != null ? String(id) : '',
        title,
        domain: String(domain).toUpperCase(),
        articleCount: project.article_count ?? 0,
        journalCount: project.journal_count ?? 0,
      };
    })
    .filter((project) => project.id);
};

const fetchProjects = async () => {
  const response = await coreApiClient.get('/api/v1/projects');
  return normalizeProjectsResponse(response);
};

const getProjectInitials = (title) => {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'RP';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
};

// Renders the selected project summary at the top of the Sidebar.
const SidebarHeader = ({ collapsed }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { id, lang } = useParams();
  const currentLang = lang || 'en';
  const headerRef = useRef(null);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const hasProject = Boolean(id && id !== 'default-id');
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['sidebar-projects'],
    queryFn: fetchProjects,
    enabled: hasProject || projectMenuOpen,
    staleTime: 5 * 60 * 1000,
  });

  const selectedProject = hasProject
    ? projects.find((project) => project.id === String(id))
    : null;

  const project = selectedProject || {
    id: hasProject ? String(id) : '',
    title: hasProject ? `Project #${id}` : t('sidebar.projectWorkspace', 'Project Workspace'),
    domain: hasProject && isLoading ? t('sidebar.loadingProject', 'LOADING PROJECT') : t('sidebar.selectProject', 'SELECT A PROJECT'),
    articleCount: 0,
    journalCount: 0,
  };

  useEffect(() => {
    if (!projectMenuOpen) return;

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setProjectMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [projectMenuOpen]);

  const handleHeaderClick = () => {
    if (collapsed) {
      navigate(`/${currentLang}/projects`);
      return;
    }
    setProjectMenuOpen((open) => !open);
  };

  const handleProjectSelect = (projectId) => {
    const currentBase = hasProject ? `/project/${id}` : '';
    let currentSection = '/dashboard';
    
    // Extract current section to navigate to same view in the selected project
    if (currentBase && location.pathname.includes(currentBase)) {
      // Find index after `/project/:id`
      const index = location.pathname.indexOf(currentBase) + currentBase.length;
      currentSection = location.pathname.slice(index) || '/dashboard';
    }

    navigate(`/${currentLang}/project/${projectId}${currentSection}`);
    setProjectMenuOpen(false);
  };

  return (
    <div className="sidebar-header-shell" ref={headerRef}>
      <button
        type="button"
        className={`sidebar-header ${collapsed ? 'collapsed' : ''}`} 
        onClick={handleHeaderClick}
        title={collapsed ? project.title : undefined}
        aria-label="Open project switcher"
        aria-expanded={!collapsed && projectMenuOpen}
        aria-haspopup="menu"
      >
        {collapsed ? (
          <div className="sidebar-project-compact">
            <FiBriefcase />
          </div>
        ) : (
          <div className={`sidebar-project-card ${projectMenuOpen ? 'open' : ''}`}>
            <div className="sidebar-project-eyebrow">
              <span>{t('sidebar.currentProject', 'Current Project')}</span>
              <FiChevronRight className="sidebar-project-chevron" />
            </div>
            <div className="sidebar-project-main">
              <div className="sidebar-project-avatar">
                {getProjectInitials(project.title)}
              </div>
              <div className="sidebar-project-copy">
                <span className="sidebar-project-title">{project.title}</span>
                <span className="sidebar-project-domain">{project.domain}</span>
              </div>
            </div>
          </div>
        )}
      </button>

      {!collapsed && projectMenuOpen && (
        <div className="sidebar-project-menu" role="menu" aria-label="Project switcher">
          <div className="sidebar-project-menu-header">{t('sidebar.switchProject', 'Switch Project')}</div>
          <div className="sidebar-project-menu-list">
            {isLoading ? (
              <div className="sidebar-project-menu-state">{t('sidebar.loadingProjects', 'Loading projects...')}</div>
            ) : projects.length === 0 ? (
              <div className="sidebar-project-menu-state">{t('sidebar.noProjects', 'No projects found')}</div>
            ) : (
              projects.map((item) => {
                const selected = item.id === String(id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`sidebar-project-option ${selected ? 'selected' : ''}`}
                    onClick={() => handleProjectSelect(item.id)}
                    role="menuitem"
                  >
                    <span className="sidebar-project-option-avatar">
                      {getProjectInitials(item.title)}
                    </span>
                    <span className="sidebar-project-option-copy">
                      <span className="sidebar-project-option-title">{item.title}</span>
                      <span className="sidebar-project-option-domain">{item.domain}</span>
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
