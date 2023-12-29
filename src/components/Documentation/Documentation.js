
import React, { useState } from 'react';
import './Documentation.css';
import Sidebar from '../SideBar/SideBar';
import { FaEllipsisV, FaPaperclip } from 'react-icons/fa';
import CircleIcon from '../CircleIcon.js/CircleIcon';
import NewDocumentationForm from '../NewDocumentationForm/NewDocumentation';

const name=localStorage.getItem('googleUserName')
console.log("name",name)
const image =localStorage.getItem('googleUserProfileUrl')
console.log(image)
const dummyData = [
  { description: 'Document 1', templateLink: 'Add link', attachment: 'View Files ' },
  { description: 'Document 2', templateLink: 'Add link', attachment: 'View Files ' },
  { description: 'Document 3', templateLink: 'Add link', attachment: 'View Files ' },
  { description: 'Document 4', templateLink: 'Add link', attachment: 'View Files ' },
  { description: 'Document 5', templateLink: 'Add link', attachment: 'View Files ' },
  
];

function Documentation() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);





  const openOption = (index) => {
    console.log('Clicked on index', index);
    setOpenedMenuIndex(index);
 
  
  };
  
  const closeMenu = () => {
    setOpenedMenuIndex(null);
  };
  const handleShare = (index) => {
    console.log(`Sharing document at index ${index}`);
    closeMenu();
  };

  const handleDelete = (index) => {
    console.log(`Deleting document at index ${index}`);
    closeMenu(); 
  };


  
 

  const openModal = () => {
    setIsModalOpen(true);
    
  };

  const closeModal = () => {
    setIsModalOpen(false);
   
  };


 

  const addNewRow = () => {
    console.log('+Add clicked');
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
        
        
            <button
              className="btn btn-primary" onClick={openModal} 
              style={{ backgroundColor: '', color: 'white', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', margin: '10px 0',position:'absolute',left:'1180px',top:'110px' }}
            >
              New documentation
            </button>
            <div style={{ display: '', alignItems: 'center', marginLeft: '1150px', marginTop: '-53px', backgroundColor: '', width: '330px',position:'absolute',top:'80px' }}>
  <div style={{ marginRight: '10px', fontWeight: '500', fontSize: '16px', color: 'black',textAlign:'start',fontFamily:'Arial' }}>{name}</div>
  <h1 style={{ fontSize: '15px', color: 'lightgrey', fontWeight: '500',marginTop:'0px' ,marginRight:'100px',textAlign:'start'}}>Techjays</h1>
  <img src={image} alt="Google User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginTop: '-90px', marginLeft: '70px' }} />
</div>

      

          <h1
            style={{
              marginRight: '1000px',
              fontSize: '20px',
              marginBottom: '26px',
              fontFamily: 'Arial',
              fontWeight: '600',
              color: 'black',
              position: 'absolute',
              top: '200px',
              left: '305px',
            }}
          >
            Documentations
          </h1>
        
          <main role="main" className="col-md-9 col-lg-10 px-0">
            <div className="table-container table-responsive">
              <table
                className="table table-striped custom-table"
                style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', overflowX: 'hidden', overflowY: 'hidden' }}
              >
                <thead>
                  <tr>
                    <th style={{ width: '420px', fontSize: '16px', paddingLeft: '33px' }}>Description</th>
                    <th style={{ width: '100px', paddingLeft: '16px', fontSize: '16px' }}>Template link</th>
                    <th style={{ width: '200px', paddingLeft: '99px', fontSize: '16px' }}>Attachment</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((data, index) => (
                    <tr key={index}>
                      <td style={{ color: 'black', fontWeight: '500', fontFamily: 'Arial', fontSize: '17px', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div
                            className="three-dots-menu"
                            style={{ marginRight: '19px', cursor: 'pointer', color: 'grey', paddingLeft: '6px' }}
                            onClick={(event) => openOption(index, event)}
                          >
                            <FaEllipsisV />
                            {openedMenuIndex === index && (
                              <div
                                className="options-menu"
                                style={{
                                  position: 'absolute',
                                  top: '20px',
                                  left: '30px',
                                  zIndex: '1',
                                  padding: '15px',
                                  width: '200px',
                                  borderRadius: '10px',
                                  backgroundColor: 'white',
                                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                  color: 'black',
                                }}
                              >
                                <div
                                  className="option-item"
                                  onClick={() => handleShare(index)}
                                  style={{ color: 'black', paddingBottom: '10px', cursor: 'pointer' }}
                                >
                                  Share Document
                                </div>
                                <div
                                  className="option-item"
                                  onClick={() => handleDelete(index)}
                                  style={{ color: 'black', paddingBottom: '10px', cursor: 'pointer' }}
                                >
                                  Delete
                                </div>
                                <div className="option-item" onClick={closeMenu} style={{ cursor: 'pointer' }}>
                                  Cancel
                                </div>
                              </div>
                            )}
                          </div>
                          {data.description}
                        </div>
                      </td>
                      <td style={{ color: 'grey', width: '10px', paddingLeft: '40px' }}>{data.templateLink}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <CircleIcon number={index + 1} />
                          <span style={{ marginLeft: '10px', color: '#007bff', marginBottom: '0px', cursor: 'pointer', marginTop: '-18px' }}>
                            {data.attachment} <FaPaperclip style={{ color: '#007bff', marginLeft: '20px', fontSize: '23px', marginTop: '14px', cursor: 'pointer' }} />
                          </span>
                          <span style={{ marginLeft: '10px', color: '#007bff', cursor: 'pointer' }}>Add Files</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                      <h1 onClick={addNewRow} style={{ color: 'black', fontSize: '18px', cursor: 'pointer', marginRight: '950px' }}>+Add</h1>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      {isModalOpen && (
          <div className='modal-overlay'>
            <NewDocumentationForm
              closeModal={closeModal}
              
              
            />
          </div>
        )}
    </div>
  );
}

export default Documentation;
