import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import logo from './Assets/logo1.png'
import { MDBBtn } from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
import pic from './Assets/ab.png'


export default function App() {
  const [openNavRight, setOpenNavRight] = useState(false);

  return (
    <MDBNavbar expand='lg' light style={{backgroundColor:'#EDE0D4'}}>
      <MDBContainer fluid>
      <MDBNavbarBrand href='/'>
            <img
              src={logo}
              height='100px'
              alt=''
              loading='lazy'
            />
           <span className='fs-5' style={{color:'rgba(69,34,18)'}}> <b>FurEverFriends</b></span> 
          </MDBNavbarBrand>
        <div style={{marginLeft:'280px' ,marginBottom:'-39px'}}>
        <img src={pic} alt=""  height={'150px'} />

        </div>

          
        <MDBNavbarToggler
          type='button'
          data-target='#navbarRightAlignExample'
          aria-controls='navbarRightAlignExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavRight(!openNavRight)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openNavRight}>
          <MDBNavbarNav right fullWidth={false} className='mb-1 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#'>
                pets
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Reviews</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              {/* <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown> */}
            </MDBNavbarItem>
            <MDBNavbarItem>
              {/* <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                Disabled
              </MDBNavbarLink> */}

              <div className="d-grid gap-1 d-md-flex justify-content-md-end">
            <Link to='/login'> 
             < MDBBtn rounded style={{backgroundColor:'rgba(69,34,18)'}}>
        Sign In 
      </MDBBtn></Link>
      {/* <MDBBtn>Button</MDBBtn> */}
    </div>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}