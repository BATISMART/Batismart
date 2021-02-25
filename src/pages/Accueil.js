import React from 'react'
import Logo from "./ecran.jpg";
import Icone from "./intuitif.jpg";
import Icone2 from "./gain.jpg";
import Icone3 from "./Sablier.jpg";
import { Container} from "semantic-ui-react";
import { useMediaQuery } from 'react-responsive'
import MediaQuery from 'react-responsive'
import './Accueil.css'






const Accueil = () => {
    return (
	
	
	<div>
	
	<div className='video'>
	   
	   
	   <Container className='conteneur'>
	   
	   <p className='bati'>
	   Video explicative de Batismart 
	   </p>

            <iframe className="lien" src="https://www.youtube.com/embed/hSMIQbEOnZI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen"  oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>

        </Container>
		
		</div>
		
	<div className="home">
						<ul className="list-unstyled">
						<li className= 'phrase1'>Faciliter la gestion de vos chantiers</li>
						<li className='phrase2'>Maximiser vos bénéfices grâce à notre application </li>
						<li className='phrase3'>Réaliser des devis/simulations précis</li>
						</ul>
						
						
						<img src={Logo} alt="ok" width="400" className= 'test'/>
						
						</div>


	
       
	  
	   
	  
	   
		</div>
    )
	
	
}

export default Accueil




