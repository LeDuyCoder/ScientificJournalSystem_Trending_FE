import './Header.css';

/**
 * UserProfile component
 * Renders the user avatar with initials, user name, and role.
 */
const UserProfile = ({ 
  initials = "AT", 
  name = "Dr. Aris Thorne", 
  role = "Senior Researcher",
  avatar = null
}) => {
  return (
    <div className="header-user-profile">
      <div className="header-user-avatar" title={`${name} (${role})`} style={{ padding: 0, overflow: 'hidden' }}>
        {avatar ? (
          <img 
            src={avatar} 
            alt={name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              // If image fails to load, fallback to initials
              e.target.style.display = 'none';
              e.target.parentNode.textContent = initials;
            }}
          />
        ) : (
          initials
        )}
      </div>
      <div className="header-user-info">
        <span className="header-user-name">{name}</span>
        <span className="header-user-role">{role}</span>
      </div>
    </div>
  );
};

export default UserProfile;
