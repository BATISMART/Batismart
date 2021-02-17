import React from 'react'
import Logo from "./ecran.jpg";
import Icone from "./intuitif.jpg";
import Icone2 from "./gain.jpg";
import Icone3 from "./Sablier.jpg";
import './Accueil.css'






const Accueil = () => {
    return (
        <div className='home'>
				<h1 style={{postion:"relative", marginLeft: 100, marginBottom: 300, fontSize: 26, fontWeight: "bold", color: "#555B61"}}> Faciliter la gestion de vos chantiers</h1>
       				<h1 style={{postion:"relative", marginLeft: -400, marginRight:-50, left:-60, marginBottom:100, fontSize: 15, color: "#555B61"}}> Maximiser vos bénéfices grâce à notre application</h1>
					       				<h1 style={{position:"relative", marginLeft: -290, marginRight: -120, right:-20, marginBottom: 175, fontSize: 15, color: "#555B61"}}> Réaliser des devis/simulations précis </h1>
					       				<h1 style={{position: "absolute", marginLeft: -950, marginBottom: -420, fontSize: 10, fontWeight: "bold", color: "#555B61"}}> Intuitif </h1>
					       				<h1 style={{position: "absolute", marginLeft: -670, marginBottom: -420, fontSize: 10, fontWeight: "bold", color: "#555B61"}}> Profits </h1>
					       				<h1 style={{position: "absolute", marginLeft: -375, marginBottom: -422, fontSize: 10, fontWeight: "bold", color: "#555B61"}}> Gains de temps </h1>

			 <img src={Logo} alt="ok" width="400" style={{position: "relative", left: 380, right: 0, top: -25,}}/>
			
			 <img src={Icone} alt="ok"  width="80" style={{position: "relative", left:-520, right:600, top:160}}/>
			 <img src={Icone2}  alt="ok"  width="80" style={{position: "relative", left:-445, right:500, top:160}}/>
			 			 <img src={Icone3} alt="ok"  width="60" style={{position: "relative", left: -370, right:400, top: 160}}/>




			
			<a href=" /Inscription" style={{ color: '#FFF', textDecoration: 'none' }}>

			<button style={{backgroundColor:"#555B61", color: "#FFF", width: 400, fontSize: 14, justifyContent: 'flex-start', position: "relative", left: -730, top: 0}}className= 'but'> Inscrivez-vous maintenant !</button>
			
			</a>
			
	   </div>
		
    )
	
	
}

export default Accueil


