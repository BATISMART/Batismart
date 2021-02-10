import React from 'react'
import Telephone from "./telephone.jpg";
import Email from "./email.jpg";
import Facebook from "./facebook.jpg"
import Linkedin from "./linkedin.jpg"
import Twitter from "./twitter.jpg"
import Insta from "./instagram.jpg"
/*import Reseaux from "./reseaux.jpg";
import * as TiIcons from "react-icons/ti";
import { Link } from 'react-router-dom';
import styled from 'styled-components';*/








const Contacter = () => {

    
    return (
        <div className='home'>

     
            <h1 style={{position: "absolute", marginLeft: -450, marginTop: -400, fontSize: 40, fontWeight: "bold"}}> Comment nous contacter ? </h1>

            <h1 style={{position: "absolute", marginLeft: -650, marginTop: 250, fontSize: 25, fontWeight: "bold"}}> 0610893461 </h1>
            <h1 style={{position: "absolute", marginLeft: 0, marginTop: 250, fontSize: 25, fontWeight: "bold"}}> Batismart@gmail.com </h1>
            <h1 style={{position: "absolute", marginLeft: 800, marginTop: 250, fontSize: 25, fontWeight: "bold"}}> Nos reseaux </h1>

            


            <img src={Telephone} alt="vu" width="100" style={{position: "relative", left: -150, right: 0, top: 0, alignItems: "center"}}/>
            <img src={Email} alt="vu" width="100" style={{position: "relative", left: 50, right: 0, top: 0, alignItems: "center"}}/>
            

          
           


               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={Facebook} alt="vu" width="60" style={{position: "relative", left: 250, right: 0, top: 0, alignItems: "center"}}/>
                        </a>


               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src={Linkedin} alt="vu" width="60" style={{position: "relative", left: 300, right: 0, top: 0, alignItems: "center"}}/>
                        </a>


               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={Twitter} alt="vu" width="60" style={{position: "relative", left: 350, right: 0, top: 0, alignItems: "center"}}/>
                        </a>


               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={Insta} alt="vu" width="60" style={{position: "relative", left: 400, right: 0, top: 0, alignItems: "center"}}/>
                        </a>
        </div>

    );
};

export default Contacter;


