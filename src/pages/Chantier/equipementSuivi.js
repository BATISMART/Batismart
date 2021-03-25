import React, {Component} from 'react';
import firebase from "firebase/app";
import { db} from "../config"
import './design.css'
import {Button} from './ButtonElement'
import $ from "jquery";

class EquipementSuivi extends Component {
	AddItemSuivi = (props) => {
		this.props.AddItemSuivi(props);
		
	}
	NewEquipSuivi = (props) => {
		
		this.props.NewEquipSuivi(props);
		
	}

	EditingEquipSuivi = (props) => {
		
		this.props.EditingEquipSuivi(props);
		
	}
	EditingId = (props) => {
		
		this.props.EditingId(props);
		
	}
	EditingId2 = (props) => {
		
		this.props.EditingId2(props);
		
	}	
		constructor(props){
		super(props);
		this.setSetting = this.setSetting.bind(this);
		this.editList = this.editList.bind(this);
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
	
	setSetting(){
		
		return this.props.currentId;
		
	}


	
	componentDidUpdate(prevProps){
		

			if(this.props.currentId !== prevProps.currentId){
		var item = this.props.itemSuiviList;
			console.log(this.props.currentId,"fetish");
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
		
		}
		
		if(this.props.semaine !== prevProps.semaine){
			var user = firebase.auth().currentUser;
			var myname = user.displayName+this.props.chantierName+"Equipement"+this.props.semaine+"/";
			db.ref(myname).on("value", snapshot => {
    let allNotes = [];
    snapshot.forEach(snap => {
      allNotes.push(snap.val());
    });
	
	this.AddItemSuivi(allNotes);
	this.NewEquipSuivi(false);
	this.EditingEquipSuivi(false);
			
			
			
		})
	console.log(this.props.currentId,"current id suivi");
	console.log(prevProps.currentId, "prev id suivi");

		}
		
		
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
	
	
		submitHandler = (event) => {
		event.preventDefault();
		var item = this.props.itemSuiviList;
		let idnumber = item.length;
		console.log("id number is : " + idnumber);
		if(this.props.modEquipSuivi == false){
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
		
		
		
		// console.log(item);
		this.AddItemSuivi(item);
		var intitule = this.state.intitule;
		var fournisseur = this.state.fournisseur;
		var prix_par_jour = this.state.prix_par_jour;
		var jour = this.state.jour;
		
		var account = "Equipement"+idnumber; 
		
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+this.props.chantierName+"Equipement"+this.props.semaine+"/";
		console.log(myname,"suivi myname");
		if(this.props.modEquipSuivi === false ){
		db.ref(myname).child(account).set({idnumber,intitule,fournisseur,prix_par_jour,jour});
		}else{
			
			idnumber = this.state.idModif;
			account = "Equipement"+idnumber; 
			db.ref(myname).child(account).update({idnumber,intitule,fournisseur,prix_par_jour,jour});
			
		}
		this.NewEquipSuivi(false);
		this.EditingId2(99);
		this.EditingEquipSuivi(false);
		$("#mainfield2").show();
		
		

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
	render() {
		console.log(this.setSetting(),"equipement suivi full bug");
		if(this.props.bool === true){
			if(this.props.modEquipSuivi === false){
				console.log("modif suivi");
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
		)
			
			}else{
			  
			  console.log("modif suivi 2 ");
			  
			  
			
		
			  
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
			
			return ( 
				<div></div>
				
				)
			
			
			
			
		}
		
		
		
		
		
		
	}
	
	
	
	
}
export default EquipementSuivi;