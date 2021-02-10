import React from 'react';
import './login_signup.css'
import { config , db} from "./config"
import firebase from "firebase/app";
import {
  FirebaseAuthProvider
} from "@react-firebase/auth";

class Inscription extends React.Component {
	
	constructor(props){
		super(props);
		this.createUser = this.createUser.bind(this);
		this.signUp = this.signUp.bind(this);
		this.state = {
			test : null,
			email: '',
			password: '',
			siret: '',
			pseudo: '',
			societe: '',
			
		};
		
	}
	submitHandler = (event) => {
		console.log("submiting");
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then((user) => {
		
		this.createUser();
		
		})
		
	}
	changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});

		
	}
	createUser(){
		// const uid = 2;
		const pseudo = this.state.pseudo;
		const email = this.state.email;
		const password = this.state.password;
		const siret = this.state.siret;
		const societe = this.state.societe;
		const uid = 2;
		var user = firebase.auth().currentUser;
			user.updateProfile({
					displayName: this.state.pseudo
				}).then(function(){
					
					db.ref("Users/").child(pseudo).set({email,password,siret,societe,uid}).then(function onSuccess(res) {
			
							window.location.reload(false);
					});
					
				})
		
		
		
	}
	
	justAlert(){
		
		
		
	}
	componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {

      var theUser;

      if (user) {
        console.log("user is logged in!");

        theUser = user;

        this.setState({
          test: theUser
        });
        // User is signed in.
      } else {
        // No user is signed in.
        console.log("user is not logged in!")
        theUser = null;
      }
  })
}
	signUp(){
		
			if(this.state.test){
				
	
				
				var tmp = "tmp";
				var user = firebase.auth().currentUser;
				db.ref().child("tmp").set({tmp})
				return ( 
				<div>Bonjour {user.displayName}, vous êtes déjà inscrit.</div>
				)
				
				

				
				
				
			}else{
			return (
			<div>
				<h2>S'inscrire</h2>
				<input
						className='email-input'
						type='email'
						name='email'
						placeholder = 'E-mail'
						onChange={this.changeHandler}
					/>
						<input
						className='text-input'
						type='text'
						name='pseudo'
						placeholder = 'Pseudo'
						onChange={this.changeHandler}
					/>
				<input
						className='text-input'
						type='text'
						name='societe'
						placeholder = 'Nom de la société'
						onChange={this.changeHandler}
					/>
				<input
						className='text-input'
						type='text'
						name='siret'
						placeholder = 'N°Siret'
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
						S'inscrire
				</button>
			</div>
			)
			}
			
			
	
		
		
	}
	
	render() {
		return (
			<>
		
			
				<FirebaseAuthProvider {...config} firebase={firebase}>
				
				
					
					{this.signUp()}
				
				  
				 </FirebaseAuthProvider>
				
			</>
		);
	}
}
export default Inscription;