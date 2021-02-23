import React from 'react';
import './login_signup.css'

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
	<div>Bonjour {user.displayName}, vous êtes déjà connecté.</div>
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
                className='btnmdpoublie'
            >
                Mot de passe oublié
            </button>
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