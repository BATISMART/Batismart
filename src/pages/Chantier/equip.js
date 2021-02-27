import React from 'react';
import firebase from "firebase/app";
import { db} from "../config"
import './design.css'
import {Button} from './ButtonElement'
import $ from "jquery";
class Equip extends React.Component {
	AddItem = (props) => {
		this.props.AddItem(props);
		
	}
	EditingEquip = (props) => {
		
		this.props.EditingEquip(props);
		
	}
	EditingId = (props) => {
		
		this.props.EditingId(props);
		
	}
	CalculateTotal = (props) => {
		this.props.CalculateTotal(props);
		
	}
	NewEquip = (props) => {
		
			this.props.NewEquip(props);
		
	}
		CheckId = ( props) => {
		
		this.props.CheckId(props);
		
	}

	constructor(props){
		super(props);
		this.editList = this.editList.bind(this);
		this.setSetting = this.setSetting.bind(this);
		this.state = {
			idModif : 0,
			notes: [],
			id: 0,
			intitule: '',
			fournisseur: '',
			prix_par_jour: '',
			jour: '',
			error: '',
			error2 : ''
		};
		
	}

	componentDidUpdate(prevProps) {
  // Utilisation classique (pensez bien à comparer les props) :
	if(this.props.currentId !== prevProps.currentId){
		
		
		
			  var item = this.props.a;
			  var barca = this.setSetting();
			  var varIntitule = "";
			  var varFournisseur = "";
			  var varPrixJour = "";
			  var varJour = "";
			 
			  item.map( data => {
			
			if(data.idnumber === barca){
					
					varIntitule = data.intitule;
					varFournisseur = data.fournisseur;
					varPrixJour = data.prix_par_jour;
					varJour = data.jour;
				
			}
			return 0;
			
		});
		
		
		
		this.setState({intitule: varIntitule,
					   fournisseur: varFournisseur,
					   prix_par_jour: varPrixJour,
					   jour: varJour
						})
		this.setState({idModif: this.props.currentId});
		this.CheckId(false);
		
	}
	if (this.props.chantierName !== prevProps.chantierName) {
				var user = firebase.auth().currentUser;
		
		var myname = user.displayName+this.props.chantierName+"Equipement";
	db.ref(myname).on("value", snapshot => {
    let allNotes = [];
    snapshot.forEach(snap => {
      allNotes.push(snap.val());
    });
    // console.log("NB Chantier : "+allNotes.length);
	// this.setState({ this.notes: allNotes });
	if(allNotes.length > 0 ){
		this.EditingId(0);
		var i = 0;
		let jourArray = [];
		let prixArray = [];
		let resetTotal = 0;
		for(i = 0 ; i < allNotes.length  ; i++){
			
			var myname2 = user.displayName+this.props.chantierName+"Equipement";
			var account = "Equipement"+i
			db.ref(myname2).child(account).on("value", snapshot => {
				
				snapshot.forEach(snap => {
				if(snap.key === "prix_par_jour"){
					prixArray.push(snap.val());
				}else if(snap.key === "jour"){
					jourArray.push(snap.val());
					
				}
			
				});
				
			});
			
			
			
			
		}
		var myname3 = user.displayName+this.props.chantierName+"Materiel";
		
		db.ref(myname3).on("value", snapshot => {
			let matNotes = []
			snapshot.forEach(snap => {
				  matNotes.push(snap.val());
			});
			// console.log("matNotes "+matNotes.length);
			if(matNotes.length > 0 ){
				
				
				
				var i = 0;
		let jourArray2 = [];
		let prixArray2 = [];
		let resetTotal2 = 0;
		for(i = 0 ; i < matNotes.length  ; i++){
			;
			var myname4 = user.displayName+this.props.chantierName+"Materiel";
			var account2 = "Materiel"+i
			db.ref(myname4).child(account2).on("value", snapshot => {
				
				snapshot.forEach(snap => {
				if(snap.key === "montant_unite"){
					prixArray.push(snap.val());
				}else if(snap.key === "quantite"){
					jourArray.push(snap.val());
					
				}
			
				});
				
			});
				
				
				
			}
			 resetTotal = 0;
			for( var k = 0 ; k < jourArray2.length ; k++){
			
			resetTotal2 += jourArray2[k] * prixArray2[k];
			
			
			}
			for( var j = 0 ; j < jourArray.length ; j++){
			
			resetTotal += jourArray[j] * prixArray[j];
			
			
			}
			this.CalculateTotal(resetTotal+resetTotal2);
		}else{
			
			for( j = 0 ; j < jourArray.length ; j++){
			
			resetTotal += jourArray[j] * prixArray[j];
			
			
			}
			this.CalculateTotal(resetTotal);
			
		}
		
		
		});
		
		
		
	this.AddItem(allNotes);
	this.NewEquip(false);
	this.EditingEquip(false);
	}
  });
	}
}
/*
	componentDidMount() {
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+this.props.chantierName+"Equipement";
	db.ref(myname).on("value", snapshot => {
    let allNotes = [];
    snapshot.forEach(snap => {
      allNotes.push(snap.val());
    });
    console.log("NB Chantier : "+allNotes.length);
	// this.setState({ this.notes: allNotes });
	if(allNotes.length > 0 ){
	this.AddItem(allNotes);
	this.NewEquip(false);
	this.EditingEquip(false);
	}
  });
  // console.log("all noto"+this.state.notes);
}

	*/
	
	setSetting(){
		
		return this.props.currentId;
		
	}
	editList(list){
		return list.map( item => {
			var temp = Object.assign({}, item);
			if(temp.idnumber === this.props.currentId){
				console.log(this.props.currentId,"bubblegum");
				this.setState({idModif: temp.idnumber});
				temp.intitule = this.state.intitule;
				temp.fournisseur = this.state.fournisseur;
				temp.prix_par_jour = this.state.prix_par_jour;
				temp.jour = this.state.jour;
				
			}
			return temp;
		});
		
		
		
		
	}
	submitHandler = (event) => {
		event.preventDefault();
		var item = this.props.a;
		let idnumber = item.length;
		
		if(this.props.mod === false){
		item.push( {
			id : idnumber,
			intitule: this.state.intitule,
			fournisseur: this.state.fournisseur,
			prix_par_jour: this.state.prix_par_jour,
			jour: this.state.jour
			
		});
		
		}else{
			
			item = this.editList(item);
			console.log(item,"bubblegum");
			
			
		}
		
		let tempo = this.props.total;
		tempo += this.state.prix_par_jour * this.state.jour;
		this.CalculateTotal(tempo);
		// console.log(item);
		this.AddItem(item);
		var intitule = this.state.intitule;
		var fournisseur = this.state.fournisseur;
		var prix_par_jour = this.state.prix_par_jour;
		var jour = this.state.jour;
		
		var account = "Equipement"+idnumber; 
		
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+this.props.chantierName+"Equipement/";
		if(this.props.mod === false ){	
		db.ref(myname).child(account).set({idnumber,intitule,fournisseur,prix_par_jour,jour});
		}else{
			
			idnumber = this.state.idModif;
			account = "Equipement"+idnumber; 
			db.ref(myname).child(account).update({idnumber,intitule,fournisseur,prix_par_jour,jour});
	
		}
		this.NewEquip(false);
		this.EditingEquip(false);
		this.EditingId(99);
		$("#mainfield").show();
		
		
	}
	changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		let err = '';
		let err2 = '';
		if(nam === "prix_par_jour"){
			if( val !== "" && !Number(val)){
				err = <strong>It must be a number </strong>
			}
			
		}
			if( nam === "jour" ){
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
		  if(this.props.mod === false){ 	
			console.log("current ID: " + this.state.idModif);
		return (
		<div>
		
		<form onSubmit = {this.submitHandler}>
        <p>
            <input className='text-input1' 
                type="text" 
                name='intitule' 
                placeholder = 'Intitulé' 
                onChange={this.changeHandler}/> <br /> <br /> 
            <input className='text-input1' 
                type="text" 
                name='fournisseur' 
                placeholder = 'Fournisseur' 
                onChange={this.changeHandler}/> <br /> <br /> 
            <input className='text-input1' 
                type="text" 
                name='prix_par_jour' 
                placeholder = 'Prix/Jour' 
                onChange={this.changeHandler}/> <br /> {this.state.error}<br /> 
            <input className='text-input1' 
                type="text" 
                name='jour' 
                placeholder = 'Nombre de Jour' 
                onChange={this.changeHandler}/> {this.state.error2}
        </p>

        <Button variant="primary" onClick={this.submitHandler}>Valider</Button>
        </form>
		</div>
		);
		  }else{
			  
			  
			  
			
		
			 console.log(this.props.a,"bubblegum");
			  return (
		<div>
		
		<form onSubmit = {this.submitHandler}>
        <p>
			
            <input className='text-input1' 
                type="text" 
                name='intitule' 
                placeholder = 'Intitulé'
				value = {this.state.intitule}
                onChange={this.changeHandler}/> <br /> <br /> 
            <input className='text-input1' 
                type="text" 
                name='fournisseur' 
                placeholder = 'Fournisseur' 
				value = {this.state.fournisseur}
                onChange={this.changeHandler}/> <br /> <br /> 
            <input className='text-input1' 
                type="text" 
                name='prix_par_jour' 
                placeholder = 'Prix/Jour' 
				value = {this.state.prix_par_jour}
                onChange={this.changeHandler}/> <br /> {this.state.error}<br /> 
            <input className='text-input1' 
                type="text" 
                name='jour' 
                placeholder = 'Nombre de Jour' 
				value = {this.state.jour}
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

export default Equip;