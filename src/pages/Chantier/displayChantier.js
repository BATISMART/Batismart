import React, {Component}  from 'react';
import {DateInput} from "semantic-ui-calendar-react"
import { Card, Form, Input, Icon, Button, Segment, Divider } from 'semantic-ui-react'
import $ from "jquery";
import firebase from "firebase/app";
import { db} from "../config"
class Display extends Component {
	
	
	SetDays = (props) => {
		
		this.props.SetDays(props);
		
	}
	
	DisplayTeam = (props) => {
		
			this.props.DisplayTeam(props);
		
	}
	AddTeam = (props) => {
		this.props.AddTeam(props);
		
	}
	NewEquip = (props) => {
		
			this.props.NewEquip(props);
		
	}
	
	ChooseChantier = (props) => {
		
		this.props.ChooseChantier(props);
		
	}
	NewMaterial = (props) => {
		
			this.props.NewMaterial(props);
		
	}
	

	
	constructor(props){
		super(props);
		this.handleChantier = this.handleChantier.bind(this);
		this.handleIndirect = this.handleIndirect.bind(this);
		this.addTeam = this.addTeam.bind(this);
		this.handleEquipement = this.handleEquipement.bind(this);
		this.handleMateriaux = this.handleMateriaux.bind(this);
		this.addEquipement = this.addEquipement.bind(this);
		this.addMateriaux = this.addMateriaux.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleTeam = this.handleTeam.bind(this);
		let FullData = [];
		this.state = {
			FullData,
			debut : "",
			Fin: "",
			indirect : 0,
			alea : 0,
			marge : 0
			
		};
		
	}
	
	componentDidMount(){
		$("#ekip").prop("disabled",true);
		$("#mat").prop("disabled",true);
		$("#team").prop("disabled",true);
		$("#indirect").prop("disabled",true);
		$("#alea").prop("disabled",true);
		$("#marge").prop("disabled",true);
		$("#ButtonIndirect").prop("disabled",true);
		
		
	}
	handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
	handleIndirect(){
		let matos = false;
		let teamcheck = false;
		if(this.props.matlist.length > 0 && this.props.equipement.length > 0){
			
			matos = true;
			
			
		}
		if(this.props.selectedList.length > 0){
			
			teamcheck = true;
		}
		if(teamcheck === true && matos === true){
			
			$("#indirect").prop("disabled",false);
		$("#alea").prop("disabled",false);
		$("#marge").prop("disabled",false);
		$("#ButtonIndirect").prop("disabled",false);
			
		}
		
		
	}
	handleChantier(){
		let debut = this.state.debut.split('-');
		let dateDebut = this.state.debut;
		let dateFin = this.state.Fin;
		let fin = this.state.Fin.split('-');
		let datecheck = false;
		if(fin[2] > debut[2]){

			datecheck = true


		}else if(fin[1] > debut[1]){

			datecheck = true;

		}else if(fin[0] > debut[0]){
			
			
			datecheck = true;
			
		}
		if(datecheck === true){
		 
		let subdate1 = debut[1]+"/"+debut[0]+"/"+debut[2];
		
		let subdate2 = fin[1]+"/"+fin[0]+"/"+fin[2];
		
		let date1 = new Date(subdate1);
		let date2 = new Date(subdate2);
		
		var time_diff = date2.getTime() - date1.getTime();
		
		var days_diff = time_diff / (1000 * 60 * 60 * 24);
		console.log("days diff : "+days_diff);
	
		this.SetDays(days_diff);
		let chantierName = $("#chantierTest").val();
		var item = this.props.a;
		item.push({intitule : chantierName});
		this.AddTeam(item);
		var account = ""+chantierName;
		
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+"Chantier/";
		
		var intitule = chantierName;
		
		var total = this.props.total;
		
		var pdv = this.props.pdv;
		$("#ekip").prop("disabled",false);
		$("#mat").prop("disabled",false);
		$("#team").prop("disabled",false);
		
		$("#validate").prop("disabled",true);
		
		this.ChooseChantier(intitule);
		db.ref(myname).child(account).set({intitule,total,pdv,dateDebut,dateFin}); 
		
		}
		
	}
	changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;

		
		this.setState({[nam]: val});

	}
	handleEquipement(){
		this.NewEquip(true);
		$("#mainfield").hide();
	}
	handleMateriaux(){
		
		this.NewMaterial(true);
		$("#mainfield").hide();
		
		
		
	}
	handleTeam(){
		
		this.DisplayTeam(true);
		$("#mainfield").hide();
	}
	addEquipement(){
		
		let a = this.props.equipement;
		
		return (
			<Card.Group>
			
				<Card>
								<Card.Content>
									<Card.Description>
										Ajouter un équipement
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div>
										<Button
											id="ekip"
											animated
											circular
											onClick={this.handleEquipement}
											positive>
											<Button.Content visible>
												<Icon name='plus circle'/>
											</Button.Content>
											<Button.Content hidden>
												<Icon name='arrow circle right' />
											</Button.Content>
										</Button>
									</div>
								</Card.Content>
						</Card>
			
			
			
			
			
			
			{a.map((data) => (
				
				<Card>
					<Card.Content>
						<Card.Header>Equipement {data.idnumber + 1}</Card.Header>
						<Card.Description>
							<ul>
								<li key = {data.idnumber}>
									<p>Intitule : {data.intitule}</p>
									<p>Fournisseur : {data.fournisseur}</p>
									<p>Prix par jour : {data.prix_par_jour}</p>
									<p>Prix total : {data.jour *  data.prix_par_jour}</p>
								</li>
							</ul>
						</Card.Description>
					</Card.Content>
				</Card>
			))}
			
			
					
			
			</Card.Group>
				
		
		
		
			);
		
		
	}
	addTeam(){
	 let team = this.props.selectedList;
	 let days = this.props.daysList;
	 let fullTeam = []
	 let i = 0;
	 for(i = 0 ; i < team.length ; i++){
			
			fullTeam.push({values: team[i],
						   jour: days[i],
						   journalier: team[i].salaire,
			total: team[i].salaire * days[i]});
		 
		 
		 
	}
	this.setState({FullData: fullTeam});

	 
	 return (
	 
								<Card.Group>
							<Card>
								<Card.Content>
									<Card.Description>
										Ajouter mes Equipes
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div>
										<Button
											id="team"
											onClick={this.handleTeam}
											circular
											animated
											positive>
											<Button.Content visible>
												<Icon name='plus circle'/>
											</Button.Content>
											<Button.Content hidden>
												<Icon name='arrow circle right' />
											</Button.Content>
										</Button>
									</div>
								</Card.Content>
							</Card>
		{team.map((data,index) => (
			
				<Card>
					
					 <Card.Content>
					 
					 <Card.Header>Equipe n°{index + 1}</Card.Header>
						<Card.Description>
							{data.values.map((item) => (
							
							<ul>
									
									<p>Prenom: {item.name}</p>
									<p>Nom : {item.surname}</p>
										
									
									
								
							</ul>
							))}
							
							
								<ul>
									
									<p>Jours accordés sur le chantier : {days[index]} </p>
									<p>Prix journalier {team[index].salaire} €/Jour </p>
									<p> Coût total de l'Equipe sur le chantier {team[index].salaire * days[index]} € </p>
									
										
									
									
								
								</ul>
							
						</Card.Description>
						
					</Card.Content>
				</Card>			
					 
							
			))}
			
			
					
			
			</Card.Group>
								
							
							
							
							

			
	 
	 
	 
	 
	 );
		
		
		
		
	}
	addMateriaux(){
		
		
		let a = this.props.matlist;
		
		return (
			<Card.Group>
			
				<Card>
								<Card.Content>
									<Card.Description>
										Ajouter du Matériel
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div>
										<Button
											id="mat"
											animated
											circular
											onClick={this.handleMateriaux}
											positive>
											<Button.Content visible>
												<Icon name='plus circle'/>
											</Button.Content>
											<Button.Content hidden>
												<Icon name='arrow circle right' />
											</Button.Content>
										</Button>
									</div>
								</Card.Content>
						</Card>
			
			
			
			
			
			
			{a.map((data) => (
				
				<Card>
					<Card.Content>
						<Card.Header>Materiel {data.idnumber + 1}</Card.Header>
						<Card.Description>
							<ul>
								<li key = {data.idnumber}>
									<p>Intitule : {data.intitule}</p>
									<p>Fournisseur : {data.fournisseur}</p>
									<p>Prix par unité : {data.montant_unite}</p>
									<p>Prix total : {data.quantite *  data.montant_unite}</p>
								</li>
							</ul>
						</Card.Description>
					</Card.Content>
				</Card>
			))}
			
			
					
			
			</Card.Group>
				
		
		
		
			);
		
		
		
		
		
	}
	
	

	
	render() {
			
		return (
		
		<Segment textAlign = 'center' basic id="mainfield">

			<Form>
				<Divider horizontal>Propriétés du chantier</Divider>	
				<Form.Field inline id="chantierName">
				
					<label>Nom du chantier </label>
					<br/>
					<Input id="chantierTest" placeholder='Nom du chantier'/>
				</Form.Field>
				<Form.Field inline>
					  <label>Date de début du chantier</label>
					  <DateInput
						name="debut"
						value={this.state.debut}
						onChange={this.handleChange}
						placeholder="Date de début du chantier"
						iconPosition="left"
						/>
					
				
				</Form.Field>
				<Form.Field inline>
					  <label> Date de fin du chantier</label>
					  <DateInput
						name="Fin"
						value={this.state.Fin}
						onChange={this.handleChange}						
						placeholder="Date de fin du chantier"
						iconPosition="left"
						/>
					
				
				</Form.Field>
				<Form.Field>
					<Button
						id="validate"
						onClick={this.handleChantier}
						positive>Valider</Button>
				</Form.Field>
				<Divider horizontal>Equipement</Divider>
				<div id="equipmentField">
				
					<Form.Field id = "0">
						
						{this.props.equipement.length > 0 ?  
								
								this.addEquipement()
								
							: ( 
						<Card.Group>
							<Card>
								<Card.Content>
									<Card.Description>
										Ajouter un équipement
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div>
										<Button
											id="ekip"
											animated
											circular
											onClick={this.handleEquipement}
											positive>
											<Button.Content visible>
												<Icon name='plus circle'/>
											</Button.Content>
											<Button.Content hidden>
												<Icon name='arrow circle right' />
											</Button.Content>
										</Button>
									</div>
								</Card.Content>
							</Card>
							
							{console.log("equpment length "+this.props.equipement.length)}
							
							
							
							
							
						</Card.Group>
						)}
						
					
					</Form.Field>
					
				</div>
				<Divider horizontal>Matériel</Divider>
				<div id ="materField">
				
					<Form.Field id = "1">
					{this.props.matlist.length > 0 ? 
						
							this.addMateriaux()
						: (
						<Card.Group>
							<Card>
								<Card.Content>
									<Card.Description>
										Ajouter du matériel
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div>
										<Button
											id="mat"
											circular
											onClick={this.handleMateriaux}
											animated
											positive>
											<Button.Content visible>
												<Icon name='plus circle'/>
											</Button.Content>
											<Button.Content hidden>
												<Icon name='arrow circle right' />
											</Button.Content>
										</Button>
									</div>
								</Card.Content>
							</Card>
						
								
							
							
							
							
						</Card.Group>
					)}
					
					</Form.Field>
				</div>
				<Divider horizontal>Mes Equipes</Divider>
				<div id ="ekipField">
				
					<Form.Field id = "2">
					{this.props.selectedList.length > 0 ?
				
						this.addTeam()
				
					: (
						<Card.Group>
							<Card>
								<Card.Content>
									<Card.Description>
										Ajouter mes Equipes
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div>
										<Button
											id="team"
											onClick={this.handleTeam}
											circular
											animated
											positive>
											<Button.Content visible>
												<Icon name='plus circle'/>
											</Button.Content>
											<Button.Content hidden>
												<Icon name='arrow circle right' />
											</Button.Content>
										</Button>
									</div>
								</Card.Content>
							</Card>
						
								
							
							
							
							
						</Card.Group>	
					)}
					<Button
						onClick={this.handleIndirect}
						positive>Click Here</Button>
					</Form.Field>
				</div>
				<Divider horizontal>Coûts indirects et autre(s)</Divider>
				<div id ="coutField">
					<Form.Field inline id = "3">
					<label>Coefficient Indirect ( en % ) </label><br/>
					<Input type="text"
							id="indirect"
							className='text-input1' 
							name='indirect' 
							placeholder = 'Coefficient Indirect' 
							onChange={this.changeHandler}/>
					</Form.Field>
					<Form.Field inline id = "4">
					<label>Aléas ( en % )</label><br/>
			<Input type="text"
                className='text-input1' 
				id="alea"
                name='alea' 
                placeholder = 'Aléas' 
                onChange={this.changeHandler}/>
			</Form.Field>
			<Form.Field inline id = "5">
			<label>Marge ( en % )</label><br/>
			<Input type="text"
                className='text-input1' 
				id="marge"
                name='marge' 
                placeholder = 'marge' 
                onChange={this.changeHandler}/>
				</Form.Field>
				
				<Button
					id="ButtonIndirect"
					positive>Click Here</Button>
			
				</div>
						
				
			</Form>
			</Segment>
		
		
		
		
			);
		
		
		
	}
	
	
	
	
	
	
}

export default Display;