

import React, { useState } from 'react';
import Sidebar from '../SideBar/SideBar';
import './Feedback.css';
import FeedBackForm from './FeedBackForm';
const name=localStorage.getItem('googleUserName')
console.log("name",name)
const image =localStorage.getItem('googleUserProfileUrl')
console.log(image)

const Feedback = () => {


    const [selectedSortOption, setSelectedSortOption] = useState('Sort by age(Ascending)');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
      setIsModalOpen(true);
      
    };
    
  
    const closeModal = () => {
      setIsModalOpen(false);
     
    };
      
        const handleSortChange = (option) => {
          console.log('Selected sort option:', option);
          setSelectedSortOption(option);
        };
        

  return (
    <div className="feedback-container">
      <Sidebar />
      <button
              className="btn btn-primary" onClick={openModal} 
              style={{  color: 'white', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', margin: '10px 0',position:'absolute',left:'1220px',top:'110px',backgroundColor:'' }}
            >
              New feedback
            </button>
      <div style={{ display: '', alignItems: 'center', marginLeft: '1150px', marginTop: '-23px', backgroundColor: '', width: '330px',position:'absolute',top:'80px' }}>
  <div style={{ marginRight: '10px', fontWeight: '500', fontSize: '16px', color: 'black',textAlign:'start',fontFamily:'Arial' }}>{name}</div>
  <h1 style={{ fontSize: '15px', color: 'lightgrey', fontWeight: '500',marginTop:'0px' ,marginRight:'100px',textAlign:'start'}}>Techjays</h1>
  <img src={image} alt="Google User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginTop: '-90px', marginLeft: '70px' }} />
</div>
<div className='info'>
    <h1 style={{fontSize:'20px',fontWeight:'600',color:'black',cursor:'pointer'}}>Open       </h1>
    <h1 style={{fontSize:'20px',marginLeft:'200px',fontWeight:'600',color:'black',cursor:'pointer'}}>In progress</h1>
    <h1 style={{fontSize:'20px',marginLeft:'200px',fontWeight:'600',color:'black',cursor:'pointer'}}>Ready for view</h1>
    <h1 style={{fontSize:'20px',marginLeft:'200px',fontWeight:'600',color:'black',cursor:'pointer'}}>Closed</h1>
 

</div>
<div className="dropdown" style={{position:'absolute',top:'39%',left:'81%',width:'230px',border:'1px solid lightblack',color:'black',borderRadius:'18px'}}>
        <button className="dropdown-button">
          {selectedSortOption} <span className="arrow">&#9660;</span>
        </button>
        <div className="dropdown-content" >
          <div onClick={() => handleSortChange('Sort by date')}></div>
          <div onClick={() => handleSortChange('Sort by priority')}></div>
          
        </div>
      </div>

      <div className='feedback-details'>
        <hr style={{width:'1020px',height:'23px',color:'grey',marginTop:'-100px',fontWeight:'600',marginRight:'130px'}}></hr>
        
      </div>
      {isModalOpen && (
          <div className='modal-overlay'>
            <FeedBackForm
              closeModal={closeModal}
              
              
            />
          </div>
        )}

     
     
    </div>
  );
};



export default Feedback;
