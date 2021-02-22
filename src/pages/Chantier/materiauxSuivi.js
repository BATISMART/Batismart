import React, {Component} from 'react';
import firebase from "firebase/app";
import { db} from "../config"
import './design.css'
import {Button} from './ButtonElement'
import $ from "jquery";

class MateriauxSuivi extends Component {
	
	
		NewMaterialSuivi = (props) => {
		
		this.props.NewMaterialSuivi(props);
		
		}
		AddMaterialSuivi = (props) => {
		this.props.AddMaterialSuivi(props);
		
		}
	
		constructor(props){
		super(props);
		this.state = {
			idModif: 0,
			id: 0,
			intitule: '',
			fournisseur: '',
			montant_unite: '',
			quantite: '',
			error: '',
			error2 : ''
		};
		
	}
	

		
		componentDidUpdate(prevProps){

		if(this.props.semaine !== prevProps.semaine){
			console.log(this.props.semaine,"Did update semaine atm");
			console.log(prevProps.semaine,"Did update old");
			var user = firebase.auth().currentUser;
			var myname = user.displayName+this.props.chantierName+"Materiel"+this.props.semaine+"/";
			console.log(myname,"Did update myname");
			db.ref(myname).on("value", snapshot => {
    let allNotes = [];
    snapshot.forEach(snap => {
      allNotes.push(snap.val());
    });
		
	this.AddMaterialSuivi(allNotes);
			console.log(allNotes,"Did update allNotes");
			
			
		})
		}
		
		
		
	}
			submitHandler = (event) => {
		event.preventDefault();
		var matos = this.props.matlistSuivi;
		let idnumber = matos.length;
		// console.log("id number is : " + idnumber);
		
		matos.push( {
			id : idnumber,
			intitule: this.state.intitule,
			fournisseur: this.state.fournisseur,
			montant_unite: this.state.montant_unite,
			quantite: this.state.quantite
			
		});
	
		
		// console.log(matos);
		this.AddMaterialSuivi(matos);
		
		var intitule = this.state.intitule;
		var fournisseur = this.state.fournisseur;
		var montant_unite = this.state.montant_unite;
		var quantite = this.state.quantite;
		
		var account = "Materiel"+idnumber; 
		
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+this.props.chantierName+"Materiel"+this.props.semaine+"/";
		
		db.ref(myname).child(account).set({idnumber,intitule,fournisseur,montant_unite,quantite});
		
		
		
		
		this.NewMaterialSuivi(false);
		
		$("#mainfield2").show();
	}
	
	
			changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		let err = '';
		let err2 = '';
		if(nam === "montant_unite"){
			if( val !== "" && !Number(val)){
				err = <strong>It must be a number </strong>
			}
			
		}
			if( nam === "quantite" ){
			if( val !== "" && !Number(val)){
				err2 = <strong>It must be a number </strong>
			}
			
		}
		this.setState({[nam]: val});
		this.setState({error: err});
		this.setState({error2: err2});
		
	}
	
	
	render() {
		// console.log("value of bool " + this.props.bool);
		if(this.props.bool === true) {
			
		return (
		<div>
<form onSubmit = {this.submitHandler}>
        <p>
            <input type="text"
                className='text-input1' 
                name='intitule' 
                placeholder = 'Intitulé' 
                onChange={this.changeHandler}/> <br /> <br /> 
            <input type="text" 
                className='text-input1' 
                name='fournisseur'
                placeholder = 'Fournisseur' 
                onChange={this.changeHandler}/> <br /> <br /> 
            <input type="text" 
                className='text-input1' 
                name='montant_unite' 
                placeholder = 'Montant/unité'
                onChange={this.changeHandler}/> <br /> {this.state.error}<br /> 
            <input type="text" 
                className='text-input1' 
                name='quantite' 
                placeholder = 'Quantité'
                onChange={this.changeHandler}/> {this.state.error2}
        </p>
        <Button variant="primary" onClick={this.submitHandler}>Valider</Button>
        </form>
		</div>
		)
		}else{
			
			return ( 
				<div></div>
				
				)
			
			
			
			
		}
			
	
		
		
		
	}





}
export default MateriauxSuivi;