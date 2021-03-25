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

		EditingMaterialSuivi = (props) => {
		
			this.props.EditingMaterialSuivi(props);
		
		}
		
		EditingId2 = (props) => {
		
			this.props.EditingId2(props);
		
		}		
		constructor(props){
		super(props);
		this.editList = this.editList.bind(this);
		this.setSetting = this.setSetting.bind(this);
		
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


			if(this.props.currentId !== prevProps.currentId){
		
		
			  console.log("targeting materials");
			  var item = this.props.matlistSuivi
			  var barca = this.setSetting();
			  var varIntitule = "";
			  var varFournisseur = "";
			  var varMontant = "";
			  var varQuantite = "";
			 console.log(barca);
			  item.map( data => {
			
			if(data.idnumber === barca){
					
					varIntitule = data.intitule;
					varFournisseur = data.fournisseur;
					varMontant = data.montant_unite;
					varQuantite = data.quantite;
				
			}
			return 0;
		});
		console.log(varIntitule);
		
		
		this.setState({intitule: varIntitule,
					   fournisseur: varFournisseur,
					   montant_unite: varMontant,
					   quantite: varQuantite
						})
		this.setState({idModif: this.props.currentId});
		
		
	}	
		
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

		setSetting(){
		console.log(this.props.currentId);
		return this.props.currentId;
		
	}
	
		editList(list){
		return list.map( item => {
			var temp = Object.assign({}, item);
			if(temp.id === this.props.currentId){
				this.setState({idModif : temp.idnumber});
				temp.intitule = this.state.intitule;
				temp.fournisseur = this.state.fournisseur;
				temp.montant_unite = this.state.montant_unite;
				temp.quantite = this.state.quantite;
				
			}
			return temp;
		});
		
		
	}
	
			submitHandler = (event) => {
		event.preventDefault();
		var matos = this.props.matlistSuivi;
		let idnumber = matos.length;
		console.log("id number suivi is : " + idnumber);
		if(this.props.modMaterialSuivi === false){
		matos.push( {
			id : idnumber,
			intitule: this.state.intitule,
			fournisseur: this.state.fournisseur,
			montant_unite: this.state.montant_unite,
			quantite: this.state.quantite
			
		});
		}else{
			
			matos = this.editList(matos);
			
		}
		
		// console.log(matos);
		this.AddMaterialSuivi(matos);
		
		var intitule = this.state.intitule;
		var fournisseur = this.state.fournisseur;
		var montant_unite = this.state.montant_unite;
		var quantite = this.state.quantite;
		
		var account = "Materiel"+idnumber; 
		
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+this.props.chantierName+"Materiel"+this.props.semaine+"/";
		if(this.props.modMaterialSuivi === false){
		console.log("id number suivi is : " + idnumber);
		db.ref(myname).child(account).set({idnumber,intitule,fournisseur,montant_unite,quantite});
		}else{
			idnumber = this.state.idModif;
			console.log("id number suivi is : " + idnumber);
			account = "Materiel"+idnumber; 
			db.ref(myname).child(account).update({idnumber,intitule,fournisseur,montant_unite,quantite});			
			
			
		}
		
		
		
		this.NewMaterialSuivi(false);
		
		
			
		this.EditingId2(99);
		this.EditingMaterialSuivi(false);
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
			
			if(this.props.modMaterialSuivi === false){
			
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
                placeholder = 'Prix/unité'
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
		<div>
<form onSubmit = {this.submitHandler}>
        <p>
            <input type="text"
                className='text-input1' 
                name='intitule' 
                placeholder = 'Intitulé'
				value = {this.state.intitule}
                onChange={this.changeHandler}/> <br /> <br /> 
            <input type="text" 
                className='text-input1' 
                name='fournisseur'
                placeholder = 'Fournisseur'
				value = {this.state.fournisseur}
                onChange={this.changeHandler}/> <br /> <br /> 
            <input type="text" 
                className='text-input1' 
                name='montant_unite' 
                placeholder = 'Prix/unité'
				value = {this.state.montant_unite}
                onChange={this.changeHandler}/> <br /> {this.state.error}<br /> 
            <input type="text" 
                className='text-input1' 
                name='quantite' 
                placeholder = 'Quantité'
				value = {this.state.quantite}
                onChange={this.changeHandler}/> {this.state.error2}
        </p>
        <Button variant="primary" onClick={this.submitHandler}>Valider</Button>
        </form>
		</div>
		);				
				
				
				
				
				
				
			}
		}else{
			
			return ( 
				<div></div>
				
				)
			
			
			
			
		}
			
	
		
		
		
	}





}
export default MateriauxSuivi;