import React from 'react';

import './design.css'
import {Button} from './ButtonElement'
import firebase from "firebase/app";
import { db} from "../config"
class MesChantier extends React.Component {

	AddTeam = (props) => {
		this.props.AddTeam(props);
		
	}

	NewTeam = (props) => {
		
			this.props.NewTeam(props);
		
	}
	constructor(props){
		super(props);
		this.state = {
			chantierName: ''
		};
		
	}
		componentDidUpdate(prevProps) {
			if (this.props.total !== prevProps.total) {
				var intitule = this.props.chantierName;
				var total = this.props.total;
				var pdv = this.props.pdv;
				var user = firebase.auth().currentUser;
				var myname = user.displayName+"Chantier";
				var account = ""+this.props.chantierName;
				
				db.ref(myname).child(account).update({intitule,total,pdv});
			
			}
		}
		componentDidMount() {

		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+"Chantier";
	db.ref(myname).on("value", snapshot => {
    let allNotes = [];
    snapshot.forEach(snap => {
      allNotes.push(snap.val());
    });
    // console.log("taille : "+allNotes.length);
	// this.setState({ this.notes: allNotes });
	if(allNotes.length > 0 ){
	this.AddTeam(allNotes);
	this.NewTeam(false);
	
	
	
	
	}
  });
		
		
}
	
	
	

	submitHandler = (event) => {
		event.preventDefault();
		var item = this.props.a;
		item.push({intitule : this.state.chantierName});
		this.AddTeam(item);
		this.NewTeam(false);
		var account = ""+this.state.chantierName; 
		
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+"Chantier/";
		var intitule = this.state.chantierName;
		var total = this.props.total;
		var pdv = this.props.pdv;
		db.ref(myname).child(account).set({intitule,total,pdv}); 	

		
	}
	
		changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;

		
		this.setState({[nam]: val});

	}
	
	
		render() {
		// console.log("value 1 : "+this.props.chantierval+"  value 2 : "+this.props.teamButton);
		if(this.props.chantierval === true && this.props.teamButton === false) {
		
		return (
		<div>
		<form onSubmit = {this.submitHandler}>
        <p>
            <input type="text"
                className='text-input1' 
                name='chantierName' 
                placeholder = 'Intitulé' 
                onChange={this.changeHandler}/> <br /> <br /> 

        </p>
        <Button variant="primary" onClick={this.submitHandler}>Valider</Button>
        </form>
		</div>
		);
		}else{
			
			return <div></div>
			
		}
		
		
		
	}
	
	
	
	
}
export default MesChantier;