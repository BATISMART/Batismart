import React from 'react';
import "./Footer.css";


const Footer = () => {
	return(
	
	


		<div className="main-footer">
			<div className="container">
				<div className="row">
				
					<div className="col">
					<h4> Batismart </h4>
					<ul className="list-unstyled">
					<a href=" /Accueil" style={{ color: '#FFF' }}>
					<li> Qui sommes-nous ?</li>
					</a>
					<li> 12 rue St Germain </li>
					<li> Paris, France </li>
					


					</ul>	
					</div>
					
					<div className="col">
						<h4>Acces Clients</h4>
						<ul className="list-unstyled">
						<a href=" /Connexion" style={{ color: '#FFF' }}>
						<li>Connexion</li>
						</a>
						<a href="/Inscription" style={{ color: '#FFF' }}>
						<li>Inscription</li>
						</a>
						<li></li>
						</ul>
						</div>

				
					<div className="col">
						<h4>Contactez nous</h4>
						<ul className="list-unstyled">
						<li>Tel : 0610893461</li>
						<li>Email : batismart@support.com </li>
						<li>Fax : fax.com </li>
						</ul>
						</div>

				</div>
				<hr />
				<div className="row">
				<p className="colonne-phra">
				&copy;{new Date().getFullYear()} Batismart | all right Reserved | Terms of Service | Privacy | Design by AchatsConsulting
				</p>

				</div>
			</div>
			</div>

	)

}

export default Footer;