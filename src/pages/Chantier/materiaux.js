import React from 'react';
import firebase from "firebase/app";
import { db} from "../config"
import './design.css'
import {Button} from './ButtonElement'

class Materiaux extends React.Component {
	AddMaterial = (props) => {
		this.props.AddMaterial(props);
		
	}
	NewMaterial = (props) => {
		
			this.props.NewMaterial(props);
		
	}
	CalculateTotal = (props) => {
		this.props.CalculateTotal(props);
		
	}
		EditingMat = (props) => {
		
		this.props.EditingMat(props);
		
	}
	CheckId = ( props) => {
		
		this.props.CheckId(props);
		
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
	
		componentDidUpdate(prevProps) {
			
			
			if(this.props.mod2 !== prevProps.mod2){
		
		
			  console.log("targeting materials");
			  var item = this.props.matlist;
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
		this.CheckId(false);
		
	}	
			
			
		if (this.props.chantierName !== prevProps.chantierName) {		
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+this.props.chantierName+"Materiel";
	db.ref(myname).on("value", snapshot => {
    let allNotes = [];
    snapshot.forEach(snap => {
      allNotes.push(snap.val());
    });
    // console.log("taille : "+allNotes.length);
	// this.setState({ this.notes: allNotes });
	if(allNotes.length > 0 ){
	this.AddMaterial(allNotes);
	this.NewMaterial(false);
	this.EditingMat(false);
	}
  });
  
		}
  // console.log("all noto"+this.state.notes);
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
		var matos = this.props.matlist;
		let idnumber = matos.length;
		// console.log("id number is : " + idnumber);
		if(this.props.mod2 === false){
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
		let tempo = this.props.total; 
		tempo += this.state.montant_unite * this.state.quantite;
		this.CalculateTotal(tempo);
		// console.log(matos);
		this.AddMaterial(matos);
		
		var intitule = this.state.intitule;
		var fournisseur = this.state.fournisseur;
		var montant_unite = this.state.montant_unite;
		var quantite = this.state.quantite;
		
		var account = "Materiel"+idnumber; 
		
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+this.props.chantierName+"Materiel/";
		if(this.props.mod2 === false){	
		db.ref(myname).child(account).set({idnumber,intitule,fournisseur,montant_unite,quantite});
		}else{
			idnumber = this.state.idModif;
			account = "Materiel"+idnumber; 
			db.ref(myname).child(account).update({idnumber,intitule,fournisseur,montant_unite,quantite});
			
		}
		
		
		
		this.NewMaterial(false);
		this.EditingMat(false);
		
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
		if(this.props.bool === true && this.props.next === true) {
			if(this.props.mod2 === false){
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
		);
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
                placeholder = 'Montant/unité'
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
			
			return <div></div>
			
		}
		
		
		
	}
	
	
	
	
}
export default Materiaux;