


// import React, { useState, useEffect } from 'react';
// import getCsrfToken from '../CsrfToken/CsrfToken';
// import { Link } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';
// import './ProjectList.css';

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const accessToken = localStorage.getItem('accessToken');
//   const [csrfToken, setCsrfToken] = useState('');

//   // Fetch CSRF token on component mount
//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       const token = await getCsrfToken();
//       setCsrfToken(token);
//     };

//     fetchCsrfToken();
//   }, []);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/projects/', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'X-CSRFToken': csrfToken,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error fetching projects: ${response.status}`);
//         }

//         const data = await response.json();
//         setProjects(data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     fetchProjects();
//   }, [accessToken, csrfToken]);

//   // Format date in the desired format
//   const formatDate = (dateString) => {
//     const options = {
//       month: 'short',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     };

//     const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
//     return formattedDate.replace(/,/g, ''); 
//   };

//   // Filter projects based on the search query
//   const filteredProjects = projects.filter((project) =>
//     project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (

//      <div className='container-fluid'>
//       <h2 style={{ marginRight: '800px', fontWeight: '700', fontSize: '39px', marginTop: '29px', marginBottom: '30px',whiteSpace:'nowrap',textAlign:'left',paddingLeft:'69px' }}>Your projects</h2>
     
//        <div style={{ display: '', alignItems: '',backgroundColor:'red',width:'200px', }}>
      
//         <input
//           className='form-control input-with-placeholder'
//           style={{ width: '250px', marginLeft: '1120px', backgroundColor: 'white', border: '1px solid white', marginTop: '-65px', marginBottom: '0px', height: '49px',paddingLeft:'44px' }}
//           placeholder='  Search Projects'
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
        
//         />
//         <FaSearch style={{position:'absolute',right:'120px'}} />
         
        
    
 
       
//          </div>
      
//       {filteredProjects.map((project) => (
//         <Link
//           to={`/statustable/${project.id}`}
//           key={project.id}
//           className="project-box"
//           style={{ textDecoration: 'none' }}
//         >
//           <h3 style={{ marginRight: '1060px', marginTop: '15px', fontSize: '22px', fontFamily: '', fontWeight: '600', textAlign: 'start', paddingLeft: '15px' }}>{project.projectName}</h3>
//           <p style={{ marginLeft: '950px', marginTop: '-40px', textDecoration: 'none', color: 'grey', fontSize: '18px', fontWeight: '400' }}>Updated On: {formatDate(project.creationDate)}</p>
//           <div className="team-members">
//             {project.teamMembersDetails.map((member) => (
//               <div key={member.id} className="member-container">
//                 <img src={member.profile_picture_url} alt="Profile Pic" />
               
//               </div>
//             ))}
//           </div>
//         </Link>
//       ))}
//     </div>

//   );
// };

// export default ProjectList;






import React, { useState, useEffect } from 'react';
import getCsrfToken from '../CsrfToken/CsrfToken';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const [csrfToken, setCsrfToken] = useState('');

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };

    fetchCsrfToken();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/projects/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-CSRFToken': csrfToken,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching projects: ${response.status}`);
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProjects();
  }, [accessToken, csrfToken]);

  // Format date in the desired format
  const formatDate = (dateString) => {
    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate.replace(/,/g, ''); 
  };

  // Filter projects based on the search query
  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

     <div className='container-fluid'>
      <h2 style={{ marginRight: '800px', fontWeight: '700', fontSize: '39px', marginTop: '69px', marginBottom: '0px',whiteSpace:'nowrap',textAlign:'left',paddingLeft:'69px' }}>Your projects</h2>
     
       <div style={{ display: '', alignItems: '',backgroundColor:'',width:'200px',marginLeft:'1120px',marginTop:'20px' }}>
      
        <input
          className='form-control input-with-placeholder'
          style={{ width: '250px', backgroundColor: 'white', border: '1px solid white', marginTop: '-65px', marginBottom: '0px', height: '49px',paddingLeft:'44px' }}
          placeholder='  Search Projects'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        
        />
        <FaSearch style={{position:'relative',right:'69px',paddingRight:'0px',top:'-35px',color:'grey',fontSize:'22px'}} />
         
        
    
 
       
         </div>
      
      {filteredProjects.map((project) => (
        <Link
          to={`/statustable/${project.id}`}
          key={project.id}
          className="project-box"
          style={{ textDecoration: 'none' }}
        >
          <h3 style={{ marginRight: '1060px', marginTop: '15px', fontSize: '22px', fontFamily: '', fontWeight: '600', textAlign: 'start', paddingLeft: '15px' }}>{project.projectName}</h3>
          <p style={{ marginLeft: '950px', marginTop: '-40px', textDecoration: 'none', color: 'grey', fontSize: '18px', fontWeight: '400' }}>Updated On: {formatDate(project.creationDate)}</p>
          <div className="team-members">
            {project.teamMembersDetails.map((member) => (
              <div key={member.id} className="member-container">
                <img src={member.profile_picture_url} alt="Profile Pic" />
               
              </div>
            ))}
          </div>
        </Link>
      ))}
    </div>

  );
};

export default ProjectList;







