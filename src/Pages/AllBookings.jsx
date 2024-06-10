


import React, { useEffect, useState } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import { userBookingAPI } from '../Services/allAPIs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Components/Footer';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import logo from '../Components/Assets/logo1.png'
import { Link } from 'react-router-dom';


function AllBookings() {

  const [userBookings,setUserBookings] =useState([])

  const getAllUserBookings = async()=>{
    const result = await userBookingAPI()
    console.log(result);
    if(result.status===200){
      setUserBookings(result.data)
      console.log(userBookings);
    }
    else{
      console.log("API fetching Error");
    }
  };
  useEffect(()=>{
    getAllUserBookings()
  },[])
  return (
    <div style={{backgroundColor:'#EDE0D4'}}>

<MDBNavbar sticky style={{ backgroundColor: '#EDE0D4', height: '80px' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
            <img style={{ height: '50px' }} src={logo} alt="" /><span style={{ color: 'rgba(69,34,18)' }}><b>FurEverFriends</b></span></MDBNavbarBrand>
            <Link to ={'/admin'}>
            <button class="Btn" >
  
  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Back</div>
</button>
            </Link>


        </MDBContainer>
      </MDBNavbar>
       <div>
  <Row>
    {
      userBookings.length>0  ?(
        userBookings.map((item)=>(
<Col>
<MDBCard style={{backgroundColor:'rgba(61,34,18,0.9)',color:'whitesmoke',marginTop:'45px'}}>
      
      <MDBCardBody>
        <h5>Booking Id: {item._id}</h5>
        <hr/>
        <MDBCardTitle>Date of Collection : {item.date}</MDBCardTitle>
        <hr/>
        <h5>Total Cost : Rs. {item.totalPrice}</h5>
        <hr/>
        <h5>Total No of Pets : {item.totalPets}</h5>
        <hr/>
        {item.pets && item.pets.length >0 ?(
          item.pets.map((pets,index)=>(
            <li key ={index}>
               {pets.breed} -{pets.gender}
            </li>
          ))
        ):(<p> No pets</p>)}
       
      </MDBCardBody>
    </MDBCard>
</Col>
        ))
      ):<p>No Booking</p>
    }
  </Row>
</div>

<Footer/>

    </div>

    
  )
}

export default AllBookings







