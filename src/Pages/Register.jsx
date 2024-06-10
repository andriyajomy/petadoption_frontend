import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../Services/allAPIs'
import './Reg.css'
import bg from '../Components/Assets/ff.png'
import logo from '../Components/Assets/logo1.png'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import Footer from '../Components/Footer'

function Register({register}) {

    const location = useNavigate()

    const isRegisterForm = register?true:false
    
    const [userData,setUserData] = useState({
      username:"",
      email:"",
      password:"",
      
    })
    
    const[userType,setUserType] = useState("");
const [secretKey,setSecretKey] = useState("")

 
    const registerData = async(e)=>{
      if(userType === "Admin" && secretKey !== "andrea"){
        e.preventDefault();
        alert("Invalid Admin");
      }
      else{
        const {username,email,password} = userData
        if(!username || !email || !password){
          alert("Please fil the form")
        }
        else{
          const result = await registerAPI({...userData,userType,secretKey});
          console.log(result);
      
            if(result.status===200){
              alert(result.data)//user registration successfull
              location('/login');
            }
            else{
              alert(result.response.data)//user already registered
            }
      
        }
      
      
      }
      }
 

      
const loginData = async()=>{
  const {email,password} = userData
  if(!email || !password){
    alert("Please fill the form")
  }
  else{

     const result = await loginAPI(userData)
     console.log(result);
     if(result.status===200){
      alert("Login successfull")//user login successful
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
      sessionStorage.setItem("token",result.data.token)
           //navigate to different pages based on user type
            if(userType === 'Admin'){
            location('/admin')
             }
          else{
           location('/user')
           }
     }
     else{
      alert("Invalid user data")
     }
     
  }
}

  return (
    
  <div>

 
<MDBNavbar sticky style={{ backgroundColor: '#EDE0D4', height: '80px' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
            <img style={{ height: '50px' }} src={logo} alt="" /><span style={{ color: 'rgba(69,34,18)' }}><b>FurEverFriends</b></span></MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    
        <div className='geeks  d-flex justify-content-center align-items-center'  >
          
          <img src={bg} alt="" width={'1000px'} style={{marginLeft:'30px'}} />
        <div className='container' >
        
       <div className="row ">
    
        <div className="col-12 form hover-shadow  align-items-center justify-content-center text-center text-dark shadow" style={{height:'530px',width:'500px',marginLeft:'220px',backgroundColor:'#EDE0D4',marginTop:'150px'}}>
          <h2 style={{marginTop:'10px' }}>FurEverFriends </h2>
          <img src={logo} alt=""  width={'70px'} height={'70px'}/>
          <h4 className='text-center text-dark ' style={{marginTop:'5px'}} >
            {
              isRegisterForm ?'Register here':'Login here'
            }
          </h4>
           
          

           <form className=' p-3   align-items-center ' style={{marginLeft:'50px'}} >
    
        <div style={{display:'flex'}}>
         {
          isRegisterForm &&
          <h5 className='me-2'>Register As :</h5>
         }

        {
          isRegisterForm &&
          <input type="radio" name='UserType' value={'User'} onChange={(e)=>setUserType(e.target.value)} />
         }
       {
        isRegisterForm &&
        <h5 className='me-2'>User</h5>
       }
       
       {
          isRegisterForm &&
          <input type="radio" name='UserType' value={'Admin'}  onChange={(e)=>setUserType(e.target.value)} />
         }
       {
        isRegisterForm &&
        <h5>Admin</h5>
       }
        </div>
              {userType === "Admin"?
                
                isRegisterForm &&
                  <input type="text" onChange={(e)=>setSecretKey(e.target.value)} placeholder='Secret Key' className='form-control mb-3' style={{width:'350px'}} />
                 :null
            }
       
     

            {
            
              isRegisterForm &&
              <input type="text" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} placeholder='Username' className='form-control mb-3   text-dark' style={{width:'350px'}} />
            }
            <input type="text" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} placeholder='Email' className='form-control mb-3 text-dark' style={{width:'350px'}} />
            <input type="text" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} placeholder='Password' className='form-control mb-3  text-dark' style={{width:'350px'}} />
          
           </form>
           
           {
            isRegisterForm ?
            <div className='text-center '>
              <button onClick={registerData} className='btn btn-warning text-light' >Register</button>
              
              <Link to={'/login'} style={{textDecoration:'none',color:'black'}}>
              <p className='mt-2' >Already Register? please login from here...</p>
              </Link>
            </div>
            :
            <div className='text-center'>
            <button onClick={loginData} className='btn btn-warning text-light my-4' >Login</button>
            <Link to={'/register'} style={{textDecoration:'none',color:'black'}}>
              <p className='mt-2' >New to here? Please Register...</p>
              </Link>
          </div>
           }
           

        </div>
       </div>

       <div className='text-center my-5'>
        <Link  to={'/'} >
        <button rounded-pill className='btn btn-warning' style={{marginBottom:'50px'}} >Go Back</button>
        </Link>
        
       </div>
      

        </div>
        
    </div>
    <br /><br />
    <Footer/>
    </div>
  )
}

export default Register