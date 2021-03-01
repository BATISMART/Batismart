import React from 'react'
import Telephone from "./telephone.jpg";
import Email from "./email.jpg";
import Facebook from "./facebook.jpg"
import Linkedin from "./linkedin.jpg"
import Twitter from "./twitter.jpg"
import Insta from "./instagram.jpg"
import './contacter_style.css'
/*import Reseaux from "./reseaux.jpg";
import * as TiIcons from "react-icons/ti";
import { Link } from 'react-router-dom';
import styled from 'styled-components';*/








const Contacter = () => {

   


    
    return (

        
         

        <div className='contacter'>
            

            <meta name="viewport" 
                content="width=device-width, initial-scale=1.0, user-scalable=no"></meta>
        

            <h1 id="titre"> Comment nous contacter ? </h1>

            <h1 class="adaptn1"> 0610893461 </h1>
            <h1 class="adaptn2"> Batismart@gmail.com </h1>
            <h1 class="adaptn3"> Nos reseaux </h1>

            


            <img class="imagen1" src={Telephone} alt="vu"/>
            <img class="imagen2" src={Email} alt="vu"/>
            

          
           


               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img class="imagen3" src={Facebook} alt="vu"/>
                        </a>


               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img class="imagen4" src={Linkedin} alt="vu"/>
                        </a>


               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img class="imagen5" src={Twitter} alt="vu"/>
                        </a>


               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img class="imagen6" src={Insta} alt="vu"/>
                        </a>


           




        </div>

    )
}


export default Contacter;


 