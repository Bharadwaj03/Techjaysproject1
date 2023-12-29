import React, { useState } from 'react';
import Select from 'react-select';
import './FeedBackForm.css';
import { FaPaperclip } from 'react-icons/fa';

const FeedBackForm = ({ updateTable, closeModal: closeParentModal }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fileInput, setFileInput] = useState(null);
  console.log(modalOpen);

  const [formData, setFormData] = useState({
    description: '',
    templateLink: '',
    attachment: null,
    priority: null, // Add priority to your state
    location: '', // Add location to your state
  });

  const closeModalLocal = () => {
    console.log('leo');
    setModalOpen(false);
    closeParentModal(); // Call the provided closeModal function
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'priority' ? value : files ? files[0] : value,
    }));
  };

  const handlePriorityChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      priority: selectedOption,
    }));
  };

  const openFileInput = () => {
    // Create the file input dynamically
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.style.display = 'none';
    input.addEventListener('change', handleFileChange);

    // Append the input to the body
    document.body.appendChild(input);

    // Trigger the input click
    input.click();

    // Save the input to state
    setFileInput(input);
  };

  const handleFileChange = (e) => {
    try {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        attachment: file,
      }));

      // Remove the file input from the body
      if (fileInput && fileInput.parentNode) {
        fileInput.parentNode.removeChild(fileInput);
      } else {
        console.error('Error removing file input: Element or parent node not found');
      }
    } catch (error) {
      console.error('Error handling file change:', error);
    }
  };

  const submitForm = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('description', formData.description);
      formDataToSend.append('templateLink', formData.templateLink);
      formDataToSend.append('attachment', formData.attachment);
      formDataToSend.append('priority', formData.priority?.value); // Include priority in form data
      formDataToSend.append('location', formData.location); // Include location in form data
      console.log(formDataToSend);

      // Send the form data to the Django backend using fetch
      const response = await fetch('http://your-django-backend-url/api/documentation/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const responseData = await response.json();

        // Update the table with the new data
        updateTable(responseData);

        // Clear the form data after submission
        setFormData({
          description: '',
          templateLink: '',
          attachment: null,
          priority: null, // Clear priority after submission
          location: '', // Clear location after submission
        });
      } else {
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container" >
      <h2 style={{ color: 'black', marginRight: '359px', marginTop: '20px', fontWeight: '600', fontSize: '20px', fontFamily: 'Arial' }}>New Feedback </h2>

      <div className="form-group">
        <label htmlFor="priority" style={{ color: 'black', fontWeight: '600', fontSize: '17px', fontFamily: 'Arial', whiteSpace:'nowrap',marginBottom:'9px' }}>
          Priority Level 
        </label>
        <Select 
  value={formData.priority}
  onChange={handlePriorityChange}
  options={[
    { value: 'P3', label: 'Low (P3)' },
    { value: 'P2', label: 'Minor (P2)' },
    { value: 'P1', label: 'Major (P1)' },
    { value: 'P0', label: 'Critical (P0)' },
  ]}
  styles={{ 
    control: (provided) => ({ 
      ...provided, 
      width: '200px', 
      height: '45px',
      borderBottom: '1px solid #ccc', // Keep the border
      
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      border: 'none',
      position: 'absolute',
      top: '10%',
      right: '12px', 
       // Hide the vertical line
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none',
      }),
      placeholder: (provided) => ({
        ...provided,
        position: 'absolute',
        top: '15%',
        left: '12px', // Adjust the left position as needed
        
        color: '#999', // Adjust the color as needed
      }),
      singleValue: (provided) => ({
        ...provided,
        position: 'absolute',
        top: '35%',
        left: '12px',
        transform: 'translateY(-50%)',
        color: '#333', // Adjust the color as needed
      }),
  }}
  isSearchable={false}
  placeholder="Select Any"
/>



      </div>

      <div className="form-group" >
        <label htmlFor="location" style={{ color: 'black', fontWeight: '600', fontSize: '17px', marginBottom: '10px', fontFamily: 'Arial', marginLeft: '290px',position:'absolute',top:'15%',left:'6%' }}>Location</label>
        <input type="text" id="location" name="location" placeholder="Add location"style={{borderColor: formData.location ? '#007bff' : ''}} value={formData.location} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="description" style={{ color: 'black', fontWeight: '600', fontSize: '17px', marginBottom: '10px', fontFamily: 'Arial', marginTop: '10px',whiteSpace:'nowrap' }}>Description of the Feedback</label>
        <input type="text" id="description" name="description" placeholder="Type here" style={{verticalAlign:'text-top',paddingBottom:'50px',borderColor: formData.description ? '#007bff' : ''}} value={formData.description} onChange={handleInputChange} />
      </div>

      <div className="form-group" style={{ cursor: 'pointer' }} onClick={openFileInput}>
        <label
          htmlFor="attachment"
          style={{ color: 'black', fontWeight: '600', fontSize: '17px', marginBottom: '0px', display: 'flex', alignItems: 'center',marginTop:'-20px' }}
        >
          Attachments

        </label>
        <div style={{ marginTop: '13px', fontSize: '17px', color: '#007bff', cursor: 'pointer', marginRight: '260px' }}>AddFiles</div>
        <FaPaperclip style={{ color: '#007bff', fontSize: '23px', position: 'absolute', right: '530px', top: '395px' }} />
      </div>
      <div className='form-group'>
        <label htmlFor='impactedstatusitem' style={{color:'black',whiteSpace:'nowrap',fontSize:'17px',fontWeight:'600'}}>Impacted Status Items</label>
        <button style={{border:'1px solid #007bff',backgroundColor:'white',borderRadius:'10px',padding:'8px',color:'#007bff',marginRight:'300px',marginTop:'10px'}}>Link Items</button>

      </div>
     
      <div className="form-buttons">
        <button className="btn btn-primary" type="button" style={{ width: '250px',marginTop:'-4px' }} onClick={submitForm}>
          Submit
        </button>
      </div>

      <span className="closes" onClick={closeModalLocal}>&times;</span>
    </div>
  );
};

export default FeedBackForm;