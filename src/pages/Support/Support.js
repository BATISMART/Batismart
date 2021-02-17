import React from 'react';
import './support_style.css'

import Icone from "./support.png";
import Icone2 from "./chat.png";

const Support = () => {
    return (
        <div className='support'>
		 <img src={Icone} alt="ok" width="100" style={{position: "absolute", left: 630, top: 100, alignItems: "center"}}/>
				<h1 id="title">Support</h1>
		
		<img src={Icone2} alt="ok" width="50" style={{position: "absolute", left: 120, top: 260, alignItems:"center"}}/>
				<h2 id="second_title"> Q&A</h2>
					<h3 class="classh3"> - Comment créer un chantier ? </h3>
						<p class="classP">
							Pour créer un chantier, vous devez au préalable avoir un compte Batismart. Si c’est bien le cas, ouvrez la sidebar en cliquant en haut à gauche de l’écran puis cliquez sur « mes chantiers ». Il vous sera ensuite proposé de créer un nouveau chantier en cliquant sur le « + ». Depuis cette page, vous avez également accès à tous vos chantiers crées.
						</p>
					<h3 class="classh3"> - Comment ajouter un équipement dans mes éléments de chantier ? </h3>
						<p class="classP">
							Pour ajouter un équipement, il suffit d’activer la sidebar en haut à gauche de l’écran, cliquer sur « mes chantier », sélectionner le chantier concerné (créer un chantier si ce n’est pas déjà fait), cliquer sur « ajouter un équipement », remplir les champs de renseignement sur l’équipement et enfin cliquer sur « valider ».
						</p>
					<h3 class="classh3"> - Comment modifier les informations d’un équipement ? </h3>
						<p class="classP">
							Pour modifier les informations d’un équipement, cliquez sur « modifier » en dessous de l’équipement à modifier dans l’onglet « équipements » de « mes chantiers », puis modifier les informations dans les champs de renseignements qui apparaissent à l’écran.
						</p>
					<h3 class="classh3"> - Où se trouve la page d’ajout des matériaux ? </h3>
						<p class="classP">
							La page « matériaux » se trouve dans « mes chantiers » (pour y accéder, cliquez sur la sidebar en haut à gauche de l’écran). Une fois le chantier concerné sélectionné, l’onglet « équipements » apparait. Il suffit ensuite de cliquer sur « next » en bas de l’écran pour accéder à la page d’ajout de matériaux.
						</p>
					<h3 class="classh3"> - Comment créer un compte ? </h3>
						<p class="classP">
							Pour créer un compte, il suffit de se rendre de faire apparaitre la sidebar en cliquant en haut à gauche de l’écran, et de cliquer sur l’onglet « inscription » tout en bas de celle-ci. La page d’inscription apparait alors, il ne vous reste plus qu’à saisir les informations nécessaires à votre inscription (à savoir que vous devrez posséder un numéro Siret pour procéder à votre inscription).
						</p>
					<h3 class="classh3"> - Comment puis-je avoir accès au coût direct du chantier ? </h3>
						<p class="classP">
							Pour accéder au coût direct du chantier, il faut faire apparaitre la sidebar en haut à gauche de l’écran, cliquer sur « mes chantiers », sélectionner le chantier souhaité (entrer des équipements/matériaux s’il n’y en a pas encore dans votre chantier), cliquer sur « next » puis sur « total ». Le coût direct de votre chantier apparaitra dans une case à votre écran.
						</p>
						
						
		</div>
    );
};

export default Support;
