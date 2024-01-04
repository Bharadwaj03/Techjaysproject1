






import React, { useState, useEffect } from 'react';
import './Documentation.css';
import Sidebar from '../SideBar/SideBar';
import { FaEllipsisV, FaPaperclip } from 'react-icons/fa';
import CircleIcon from '../CircleIcon.js/CircleIcon';
import NewDocumentationForm from '../NewDocumentationForm/NewDocumentation';
import AttachmentModal from '../AttachmentModal/AttachmentModal'; // Import the new component

const name = localStorage.getItem('googleUserName');
console.log('name', name);
const image = localStorage.getItem('googleUserProfileUrl');
console.log(image);



function Documentation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);
  const [documentations, setDocumentations] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  console.log(selectedFiles)
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);
  console.log('Selected Files Array (Before Rendering):', selectedFiles);
  const handleFileChange = (e, index) => {
    const files = e.target.files;
  
    // Update the state with the selected files
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = files[0];
      return updatedFiles;
    });
  };
  
  useEffect(() => {
    // Log the selectedFiles array after it has been updated
    console.log('Selected Files Array:', selectedFiles);
  }, [selectedFiles]);
  
  

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/documentationfetch/');
      const data = await response.json();
      setDocumentations(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
    // Refresh data after the modal is closed
    fetchData();
  };

  const addNewRow = () => {
    console.log('+Add clicked');
  };


  const closeAttachmentModal = () => {
    setSelectedDocument(null);
  };
  const openAttachmentModal = (document) => {
    setSelectedDocument(document);
    const selectedFile = selectedFiles[document.index];
    console.log('Selected File for document:', selectedFile);
  
    if (selectedFile) {
      // Open the AttachmentModal
      setIsModalOpen(true);
    } else {
      // Handle the case when no file is selected
      console.error('No file selected for document:', document);
      // You might want to show a message to the user or perform other actions
    }
  };
  
  
  
  
  
  const downloadAttachment = async () => {
    try {
      if (!selectedDocument || !selectedDocument.attachment) {
        console.error('No attachment data available.');
        return;
      }
  
      // Construct the file path from the provided dataa
      const filePath = `/public${selectedDocument.attachment}`;
      console.log('File Path:', filePath);
  
      // Fetch the file as a Blob
      const response = await fetch(filePath);
      const blob = await response.blob();
  
      // Create a download link
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = "_blank"; // Open the link in a new tab
      link.download = selectedDocument.attachment_name || 'file';
  
      // Append the link to the body and trigger a click event
      document.body.appendChild(link);
      link.click();
  
      // Remove the link from the body
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading attachment:', error);
    }
  };

 
  
  
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <button
            className="btn btn-primary"
            onClick={openModal}
            style={{
              backgroundColor: '',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              margin: '10px 0',
              position: 'absolute',
              left: '1180px',
              top: '110px',
            }}
          >
            New documentation
          </button>
          <div
            style={{
              display: '',
              alignItems: 'center',
              marginLeft: '1150px',
              marginTop: '-53px',
              backgroundColor: '',
              width: '330px',
              position: 'absolute',
              top: '80px',
            }}
          >
            <div
              style={{
                marginRight: '10px',
                fontWeight: '500',
                fontSize: '16px',
                color: 'black',
                textAlign: 'start',
                fontFamily: 'Arial',
              }}
            >
              {name}
            </div>
            <h1
              style={{
                fontSize: '15px',
                color: 'lightgrey',
                fontWeight: '500',
                marginTop: '0px',
                marginRight: '100px',
                textAlign: 'start',
              }}
            >
              Techjays
            </h1>
            <img
              src={image}
              alt="Google User"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                marginTop: '-90px',
                marginLeft: '70px',
              }}
            />
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
            <div
              className="table-container table-responsive"
              style={{
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                overflowX: 'hidden',
                overflowY: 'hidden',
              }}
            >
              <table className="table table-striped custom-table">
                <thead>
                  <tr>
                    <th style={{ width: '420px', fontSize: '16px', paddingLeft: '33px' }}>Description</th>
                    <th style={{ width: '100px', paddingLeft: '16px', fontSize: '16px' }}>Template link</th>
                    <th style={{ width: '200px', paddingLeft: '99px', fontSize: '16px' }}>Attachment</th>
                  </tr>
                </thead>
                <tbody>
                  {documentations.map((data, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          color: 'black',
                          fontWeight: '500',
                          fontFamily: 'Arial',
                          fontSize: '17px',
                          position: 'relative',
                        }}
                      >
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
                      <td style={{ color: 'grey', width: '10px', paddingLeft: '40px' }}>{data.template_link}</td>
                      <td>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <CircleIcon number={index + 1} />

    {/* View Files span */}
    <span onClick={() => openAttachmentModal(data)} style={{ marginLeft: '10px', color: '#007bff', cursor: 'pointer',marginTop:'-12px' }}>
      View Files{' '}
      <FaPaperclip style={{ marginLeft: '20px', fontSize: '23px', marginTop: '14px', cursor: 'pointer' }} />
    </span>

    {/* Add Files span */}
    <span onClick={() => document.getElementById(`fileInput${index}`).click()} style={{ marginLeft: '10px', color: '#007bff', cursor: 'pointer' }}>
      Add Files{' '}
      <input
        type='file'
        id={`fileInput${index}`}
        style={{ display: 'none' }}
        onChange={(e) => handleFileChange(e, index)}
      />
    </span>
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
      {isModalOpen && selectedFiles && (
        <div className='modal-overlay'>
            
          <NewDocumentationForm closeModal={closeModal} />
        </div>
      )}
      <AttachmentModal
        selectedFile={selectedFiles}
        selectedDocument={selectedDocument}
        downloadAttachment={downloadAttachment}
        closeAttachmentModal={closeAttachmentModal}
      />
    </div>
  );
}

export default Documentation;



