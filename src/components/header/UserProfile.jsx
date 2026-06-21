
import './Header.css';

/**
 * UserProfile component
 * Renders the user avatar with initials, user name, and role.
 */
const UserProfile = ({ 
  initials = "AT", 
  name = "Dr. Aris Thorne", 
  role = "Senior Researcher" 
}) => {
  return (
    <div className="header-user-profile">
      <div className="header-user-avatar" title={`${name} (${role})`}>
        {initials}
      </div>
      <div className="header-user-info">
        <span className="header-user-name">{name}</span>
        <span className="header-user-role">{role}</span>
      </div>
    </div>
  );
};

export default UserProfile;
