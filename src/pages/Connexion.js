import React from 'react';
import './login_signup.css'
import Connect from "./connected.png";
import firebase from "firebase/app";

class Connexion extends React.Component {
	
		constructor(props){
		super(props);
		this.checkUser = this.checkUser.bind(this);
		this.state = {
			email: '',
			password: '',
			error: ''
			
		}


		
	}
	


	submitHandler2 = (event) => {
		firebase.auth().signOut().then(() => {
			window.location.reload(false);
		}).catch((error) => {
  // An error happened.
		});
		
		
	}
	submitHandler = (event) => {
		console.log("submiting");
		
		
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
		.then((user) => {
			window.location.reload(false);
    // Signed in 
    // ...
  })
  .catch((error) => {
	  let err = <strong>Erreur: Mot de passe ou nom de compte incorrect</strong>
	  this.setState({error: err});

  });
		
		
	}
	
	changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});

		
	}
	
	checkUser(){
		var user = firebase.auth().currentUser;

if (user) {
	return (
	<div>
	<img class="imageconnect" src={Connect} />
		<h2 class="cm">
			Bonjour {user.displayName} vous êtes connecté à Batismart: Vous pouvez accéder à toutes nos fonctionnalités
		</h2>
	</div>
	)
} else {
	return (
	<div>
    <h2>Se Connecter</h2>
            <input
              className='email-input'
              type='email'
              name='email'
              placeholder = 'E-mail'
			  onChange={this.changeHandler}
            />
            <input
              className='password-input'
              type='password'
              name='password'
              placeholder = 'Mot de passe'
			  onChange={this.changeHandler}
            />
            <button
                className='btnconnect'
				onClick = {this.submitHandler}
            >
                Connexion
            </button>
			{this.state.error}
	</div>
	)
}



  }	  
  		
  render() {	
  return (
  <>
  

  {this.checkUser()}
  </>
  );
  }
}

export default Connexion;