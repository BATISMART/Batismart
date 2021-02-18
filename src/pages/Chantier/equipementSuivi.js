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

		constructor(props){
		super(props);
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
	

	componentDidUpdate(prevProps){
		

		
		
		if(this.props.semaine !== prevProps.semaine){
			var user = firebase.auth().currentUser;
			var myname = user.displayName+this.props.team[0].intitule+"Equipement"+this.props.semaine+"/";
			db.ref(myname).on("value", snapshot => {
    let allNotes = [];
    snapshot.forEach(snap => {
      allNotes.push(snap.val());
    });
	
	this.AddItemSuivi(allNotes);
			
			
			
		})
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
		
		item.push( {
			id : idnumber,
			intitule: this.state.intitule,
			fournisseur: this.state.fournisseur,
			prix_par_jour: this.state.prix_par_jour,
			jour: this.state.jour
			
		});
		
		
		
		
		// console.log(item);
		this.AddItemSuivi(item);
		var intitule = this.state.intitule;
		var fournisseur = this.state.fournisseur;
		var prix_par_jour = this.state.prix_par_jour;
		var jour = this.state.jour;
		
		var account = "Equipement"+idnumber; 
		
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+this.props.team[0].intitule+"Equipement"+this.props.semaine+"/";
		console.log(myname,"suivi myname");
		
		db.ref(myname).child(account).set({idnumber,intitule,fournisseur,prix_par_jour,jour});
		
		this.NewEquipSuivi(false);
		$("#mainfield2").show();
		
		

	}
	
	render() {
		
		if(this.props.bool === true){
			
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
			
			return ( 
				<div></div>
				
				)
			
			
			
			
		}
		
		
		
		
		
		
	}
	
	
	
	
}
export default EquipementSuivi;