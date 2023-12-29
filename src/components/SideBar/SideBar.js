




import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks,  faComment,faTable,faFile } from '@fortawesome/free-solid-svg-icons';

import techjaysLogo from './sparrow.png';




const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');



  


  
  
 
 


  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  // Synchronize state on location change
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
      
    <div className="container-fluid">
  <div className="row">
    <div className="col-md-2">
      <div className="sidebar">
        <div className="sidebar-logo">
          <img className="techjays" src={techjaysLogo} alt="Techjays Logo" />
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className={`sidebar-link ${activeLink === '/dashboard' ? 'active-link' : ''}`}
                onClick={() => handleLinkClick('/dashbaord')}
              >
                <FontAwesomeIcon className="fonts" icon={faTasks} /> Your Projects
              </Link>
            </li>
            <li>
              <Link
                to="/statustable"
                className={`sidebar-link ${activeLink === '/statustable' ? 'active-link' : ''}`}
                onClick={() => handleLinkClick('/statustable')}
              >
                <FontAwesomeIcon className="fonts" icon={faTable} /> Status Table
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className={`sidebar-link ${activeLink === '/feedback' ? 'active-link' : ''}`}
                onClick={() => handleLinkClick('/feedback')}
              >
                <FontAwesomeIcon className="fonts" icon={faComment} /> Feedbacks
              </Link>
            </li>
            <li>
              <Link
                to="/documentation"
                className={`sidebar-link ${activeLink === '/documentation' ? 'active-link' : ''}`}
                onClick={() => handleLinkClick('/documentation')}
              >
                <FontAwesomeIcon className="fonts" icon={faFile} /> Documentation
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div className="col-md-10">

    </div>
  </div>
</div>

  );
};

export default Sidebar;













