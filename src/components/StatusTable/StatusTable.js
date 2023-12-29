

import React, { useState } from 'react';
import './StatusTable.css';
import Sidebar from '../SideBar/SideBar';
import { FaEllipsisV, FaTrashAlt, FaChevronDown,FaShare } from 'react-icons/fa';


const dummyData = [
  { description: 'Document 1', templateLink: 'Add link', attachment: 'View Files ' },
  { description: 'Document 2', templateLink: 'Add link', attachment: 'View Files ' },
  { description: 'Document 3', templateLink: 'Add link', attachment: 'View Files ' },
  { description: 'Document 4', templateLink: 'Add link', attachment: 'View Files ' },
  { description: 'Document 5', templateLink: 'Add link', attachment: 'View Files ' },
  // Add more dummy data as needed
];
const name=localStorage.getItem('googleUserName')
console.log("name",name)
const image =localStorage.getItem('googleUserProfileUrl')
console.log(image)
const StatusTable = () => {
  const [showOptions, setShowOptions] = useState(null);
 

  
  
 
 



  const handleShareDocument = () => {
    console.log('Share Document clicked');
    setShowOptions(null);
  };

  const handleDeleteDocument = () => {
    console.log('Delete Document clicked');
    setShowOptions(null);
  };

  const addNewRow = () => {
    // Add logic to handle the addition of a new row
    console.log('+Add clicked');
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <button
              className="btn btn-primary"
              style={{  color: 'white', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', margin: '10px 0',position:'absolute',left:'1220px',top:'110px',backgroundColor:'' }}
            >
              New milestone
            </button>
            <button
              className="btn btn-primary"
              style={{  color: '#007bff', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', margin: '10px 0',position:'absolute',left:'1050px',top:'110px',border:'1px solid #007bff ',backgroundColor:'white' }}
            >
              Hide complete
            </button>
          <div style={{ display: '', alignItems: 'center', marginLeft: '1150px', marginTop: '-53px', backgroundColor: '', width: '330px',position:'absolute',top:'80px' }}>
  <div style={{ marginRight: '10px', fontWeight: '500', fontSize: '16px', color: 'black',textAlign:'start',fontFamily:'Arial' }}>{name}</div>
  <h1 style={{ fontSize: '15px', color: 'lightgrey', fontWeight: '500',marginTop:'0px' ,marginRight:'100px',textAlign:'start'}}>Techjays</h1>
  <img src={image} alt="Google User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginTop: '-90px', marginLeft: '70px' }} />
</div>

    <div style={{position:'absolute',top:'26%',left:'24%'}}>
   
               
                  <FaChevronDown className='chevron'/>
             
                
      
      
      
      <h1 style={{fontSize:'19px',fontWeight:'600'}}>Phase 1 Sprint 1</h1></div>
   
                
        

          <main role="main" className="col-md-9 col-lg-10 px-0">
        
            <div className="table-container table-responsive">
              <table className="table table-striped custom-table" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <thead>
                  <tr>
                    <th style={{ width: '1660px', fontSize: '16px', paddingLeft: '33px' }}>Name</th>
                    <th style={{ width: '690px', paddingLeft: '46px', fontSize: '16px' }}>Est.Hours</th>
                    <th style={{ width: '690px', paddingLeft: '49px', fontSize: '16px' }}>Priority</th>
                    <th style={{ width: '690px', paddingLeft: '49px', fontSize: '16px' }}>Status</th>
                    <th style={{ width: '690px', paddingLeft: '29px', fontSize: '16px' }}>Est.Deliv Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((data, index) => (
                    <tr key={index}>
                      <td style={{ color: 'rgba(000)', fontWeight: '500', fontFamily: 'Arial', fontSize: '17px',width:'2900px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div
                            className="three-dots-menu"
                            style={{ marginRight: '19px', cursor: 'pointer', color: 'gray', paddingLeft: '11px' }}
                           
                          >
                            <FaEllipsisV />
                          
                          </div>
                          {data.description}
                        </div>
                        {showOptions === index && (
                          <div className="options-box">
                            <div onClick={handleShareDocument}>
                              <FaShare /> Share Document
                            </div>
                            <div onClick={handleDeleteDocument} style={{ color: 'red' }}>
                              <FaTrashAlt /> Delete
                            </div>
                          </div>
                        )}
                      </td>
                      <td style={{ color: 'grey', width: '10px', paddingLeft: '40px' }}>{}</td>
                      <td style={{ color: 'grey', width: '10px', paddingLeft: '40px' }}>{}</td>
                      <td style={{ color: 'grey', width: '10px', paddingLeft: '40px' }}>{}</td>
                      <td>
                      
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', height:'10px' ,padding:'20px'}}>
                      <h1 onClick={addNewRow} style={{ color: 'black', fontSize: '15px', cursor: 'pointer', marginRight: '950px',marginBottom:'20px' }}>
                        +Add
                      </h1>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StatusTable;


