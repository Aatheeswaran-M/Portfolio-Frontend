import React, { useEffect, useState } from "react";
//import Spline from "@splinetool/react-spline";
import "./profile.css";
import Type_Text from "./Animations/Type_Text"
import Falling_Text from "./Animations/Falling_Text"



function Profile() {
  const Url = 'https://portfolio-api-jie5.onrender.com/api/profile';
 const [Name, setName] = useState()
 const [Title, setTitle] = useState()
 const [Bio, setBio] = useState()


  useEffect(()=>{
    const fetchdata = async() =>{
      const result = await fetch(Url)
      result.json().then(json => {
        setName(json.name);
        setTitle(json.title);
        setBio(json.bio);
      });
    }
     fetchdata();
  },[])
 
  return (
    
     
    <div className="profile-container">
      
      {/* <Spline 
        
        
      /> */}
     <div className="name-overlay">
        <h4 className="Hello">Hello!</h4>
        <h1 className="name">{Name}</h1>
       <Type_Text  className="Title"
  text={["Software Developer"]}
  typingSpeed={50}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="../"
/>


  
<Falling_Text  className="Title"
  texts={['developer','Fronend']}
  mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
  staggerFrom={"first"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
  
/>

{/* <p className="Bio">{Bio}</p> */}
       
     </div>
      
    </div>
    
  );
}

export default Profile;