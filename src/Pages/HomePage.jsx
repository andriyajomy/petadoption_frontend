// import React, { useEffect, useState } from 'react'
// // import banner from '../Components/Assets/new.jpg'
// import Header from '../Components/Header'
// import Banner from '../Components/Banner'
// import { homePetAPI } from '../Services/allAPIs'
// import Col from 'react-bootstrap/Col';
// import PetCard from '../Components/PetCard';
// import Row from 'react-bootstrap/Row';
// import Footer from '../Components/Footer';
// import home from '../Components/Assets/d2.png'
// import homie from '../Components/Assets/p.png'
// function HomePage() {

//   // api call to get home pet details
// const [homePet,setHomePet] = useState([])
// const getHomePet = async()=>{
// const result = await  homePetAPI()
// console.log(result);
// if(result.status===200){
//   setHomePet(result.data)
//   console.log(homePet);
// }
// else{
//   console.log("Api fetching pet details failed");
// }
// }
// useEffect(()=>{
// getHomePet()
// },[])


// // reviews

// const Reviews = () => {
//   const reviewsData = [
//     {
//       id: 1,
//       name: 'John Doe',
//       review: 'I adopted my best friend from this website, and I couldn\'t be happier. Thank you for bringing joy into our lives!',
//       image: 'https://example.com/john-doe.jpg',
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       review: 'The adoption process was smooth, and the staff was very helpful and caring. I highly recommend this platform to anyone looking to adopt a pet.',
//       image: 'https://example.com/jane-smith.jpg',
//     },
//     {
//       id: 3,
//       name: 'Michael Johnson',
//       review: 'I found my perfect match here. The website is user-friendly, and there are so many amazing pets waiting for loving homes.',
//       image: 'https://example.com/michael-johnson.jpg',
//     },
//   ];
//   return (
//     <div>



  

//       <Header/>
//       {/* <img src={banner} alt="" width={'100%'} height={'700px'}/> */}
//       {/* <Banner/> */}
// <div className="row">
//   <div className="col-6">
//     <img src={home} alt="" style={{width:'750px',height:'650px',marginLeft:'55px'}}/>
//   </div>
//   <div className="col-6 " style={{marginTop:'260px',fontSize:'x-large'}}>
//     <p id="txt" style={{color:'rgba(61,34,18)'}}><b><i>Every pet has a unique story and a special place in our hearts. Whether you're looking for a loyal canine companion, a playful feline friend, or a cuddly small animal, we're here to help you find the perfect match.</i></b></p>
//   </div>
// </div>


// <br /><br />
// {/* <div className="row" style={{backgroundColor:'rgb(251,186,35)',position:'absolute',height:'500px',width:"100%"}}>
//   <div className="col-6">

//   </div>
//   <div className="col-6" style={{position:'relative'}}>
//     <img src={homie} alt="" height={'400px'} style={{marginRight:'-200px'}} />
//   </div>
// </div> */}


// <div className="row" style={{backgroundColor:'rgb(251,186,35)'}}>
//   <div className="col-4 " style={{marginTop:'260px',fontSize:'x-large',fontWeight:'500'}}>
//     <h3 style={{marginLeft:'55px',color:'rgba(61,34,18)'}}>Join us in making a difference, one paw at a time. Start your adoption journey today and experience the joy of saving a life and gaining a loyal friend.</h3>
//   </div>
//   <div className="col-8">
//     <img src={homie} alt=""style={{width:'850px',height:'650px',marginLeft:'-85px'}} />
//   </div>
// </div>

// <br /><br /><br /><br /><br /><br /><br /><br />



//       <div className="row">
//         <div className="col">
//           <h2>PETS</h2>
// <Row>
//  {
//   homePet.length>0? homePet.map(item=>(
//     <Col>
//     <PetCard petinfo={item}/> 
    
//     </Col>
//   )):"Empty Array"
//  }
// </Row>
//         </div>
//       </div>
//       <br /><br /><br />
// <center>
// <button className='btn btn-dark btn-lg text-white rounded-pill shadow m-4 px-3' style={{backgroundColor:'#E9C46A'}}> VIEW MORE PETS</button>

// </center>
//       <br /><br />

//       <div className="reviews-container">
//       <h2>Customer Reviews</h2>
//       <div className="reviews-list">
//         {reviewsData.map((review) => (
//           <div key={review.id} className="review-item">
//             <img src={review.image} alt={review.name} className="review-image" />
//             <div className="review-content">
//               <h3>{review.name}</h3>
//               <p>{review.review}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>


      
//       <Footer/>
//     </div>
//   )
// }

// export default HomePage



import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import { homePetAPI } from '../Services/allAPIs';
import Col from 'react-bootstrap/Col';
import PetCard from '../Components/PetCard';
import Row from 'react-bootstrap/Row';
import Footer from '../Components/Footer';
import home from '../Components/Assets/d2.png';
import homie from '../Components/Assets/p.png';

function HomePage() {
  // State for home pets
  const [homePet, setHomePet] = useState([]);

  // Fetch home pets data
  const getHomePet = async () => {
    try {
      const result = await homePetAPI();
      console.log(result);
      if (result.status === 200) {
        setHomePet(result.data);
        console.log(homePet);
      } else {
        console.log("Api fetching pet details failed");
      }
    } catch (error) {
      console.error("Error fetching home pets:", error);
    }
  };

  useEffect(() => {
    getHomePet();
  }, []);

  // Reviews component
  const Reviews = () => {
    const reviewsData = [
      {
        id: 1,
        name: 'John Doe',
        review: 'I adopted my best friend from this website, and I couldn\'t be happier. Thank you for bringing joy into our lives!',
        image: 'https://i.pinimg.com/736x/cf/c0/96/cfc096f02e880efc9d3a7b7350453a25.jpg',
      },
      {
        id: 2,
        name: 'Jane Smith',
        review: 'The adoption process was smooth, and the staff was very helpful and caring. I highly recommend this platform to anyone looking to adopt a pet.',
        image: 'https://i.pinimg.com/originals/0e/de/f5/0edef5f83b09f428abe0f3c799e117ef.jpg',
      },
      {
        id: 3,
        name: 'Michael Johnson',
        review: 'I found my perfect match here. The website is user-friendly, and there are so many amazing pets waiting for loving homes.',
        image: 'https://tse4.mm.bing.net/th?id=OIP.v0vTEIWoUses1ToPfTatqgHaJQ&pid=Api&P=0&h=180',
      },
    ];
  
    return (
      <div className="reviews-container" >
        {/* style={{backgroundColor:'rgb(251,186,35)',height:'400px'}} */}
      <center><h2 className='p-3'>Customer Reviews</h2></center>
      <div className="row">
        {reviewsData.map((review) => (
          <div key={review.id} className="col-md-4 mb-4">
            <div className="card h-100 p-3" style={{backgroundColor:'#EDE0D4', borderBlockColor:'black',color:'rgba(61,34,18)'}}>
              <div className="card-body">
                {/* <img src={review.image} alt={review.name} className="review-image img-fluid rounded-circle mb-3" /> */}
                <h5 className="card-title">{review.name}</h5>
                <p className="card-text">{review.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  };

  return (
    <div>
      <Header />
      {/* <Banner /> */} {/* Uncomment this if needed */}
      <div className="row" style={{backgroundColor:'#EDE0D4'}}>
        <div className="col-6">
          <img src={home} alt="" style={{ width: '750px', height: '650px', marginLeft: '55px' }} />
        </div>
        <div className="col-6 " style={{ marginTop: '260px', fontSize: 'x-large' }}>
          <p id="txt" style={{ color: 'rgba(61,34,18)' }}><b><i>Every pet has a unique story and a special place in our hearts. Whether you're looking for a loyal canine companion, a playful feline friend, or a cuddly small animal, we're here to help you find the perfect match.</i></b></p>
        </div>
      </div>

      
      <div className="row" >
        <div className="col-4 " style={{ marginTop: '260px', fontSize: 'x-large', fontWeight: '500' }}>
          <h3 style={{ marginLeft: '55px', color: 'rgba(61,34,18)' }}>Join us in making a difference, one paw at a time. Start your adoption journey today and experience the joy of saving a life and gaining a loyal friend.</h3>
        </div>
        <div className="col-8">
          <img src={homie} alt="" style={{ width: '850px', height: '650px', marginLeft: '-85px' }} />
        </div>
      </div>

      {/* <br /><br /><br /><br /><br /> */}

      <div className="row" style={{backgroundColor:'#EDE0D4'}}>
        <div className="col">
          {/* <h2>PETS</h2> */}
          <Row className='p-5'>
            {homePet.length > 0 ? homePet.map(item => (
              <Col key={item.id}>
                <PetCard petinfo={item} />
              </Col>
            )) : "Empty Array"}
          </Row>
        </div>
      </div>
      <br /><br /><br />
      {/* <center>
        <button className='btn btn-dark btn-lg text-white rounded-pill shadow m-4 px-3' style={{ backgroundColor: '#E9C46A' }}> VIEW MORE PETS</button>
      </center> */}
      <br /><br />

      {/* Render the Reviews component */}
      <div>
        <Reviews />
      </div>
<br /><br /><br />
      <Footer />
    </div>
  );
}

export default HomePage;
