import React from 'react'
import Logo from "./ecran.jpg";
import Icone from "./intuitif.jpg";
import Icone2 from "./gain.jpg";
import Icone3 from "./Sablier.jpg";






const Accueil = () => {
    return (
        <div className='home'>
				<h1 style={{postion:"relative", marginLeft: 100, marginBottom: 300, fontSize: 26, fontWeight: "bold"}}> Faciliter la gestion de vos chantiers</h1>
       				<h1 style={{postion:"relative", marginLeft: -400, marginRight:-50, left:-60, marginBottom:100, fontSize: 15}}> Maximiser vos bénéfices grâce à notre application</h1>
					       				<h1 style={{position:"relative", marginLeft: -290, marginRight: -120, right:-20, marginBottom: 175, fontSize: 15}}> Réaliser des devis/simulations précis </h1>
					       				<h1 style={{position: "absolute", marginLeft: -800, marginBottom: -420, fontSize: 10, fontWeight: "bold"}}> Intuitif </h1>
					       				<h1 style={{position: "absolute", marginLeft: -530, marginBottom: -420, fontSize: 10, fontWeight: "bold"}}> Profits </h1>
					       				<h1 style={{position: "absolute", marginLeft: -250, marginBottom: -422, fontSize: 10, fontWeight: "bold"}}> Gains de temps </h1>

			 <img src={Logo} alt="ok" width="400" style={{position: "relative", left: 380, right: 0, top: -25,}}/>
			
			 <img src={Icone} alt="ok"  width="80" style={{position: "relative", left:-550, right:600, top:160}}/>
			 <img src={Icone2}  alt="ok"  width="80" style={{position: "relative", left:-476, right:500, top:160}}/>
			 			 <img src={Icone3} alt="ok"  width="60" style={{position: "relative", left: -400, right:400, top: 160}}/>



			
			<a href=" /Inscription" style={{ color: '#FFF' }}>

			<button style={{width: 200, fontSize: 13, justifyContent: 'flex-start', position: "relative", left: -650, top: 0 }}> Inscrivez vous maintenant !</button>
			
			</a>
			
	   </div>
		
    )
	
	
}

export default Accueil


