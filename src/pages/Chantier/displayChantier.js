import React, {Component}  from 'react';
import {DateInput} from "semantic-ui-calendar-react"
import { Card, Form, Input, Icon, Button, Segment, Divider } from 'semantic-ui-react'
import $ from "jquery";
import firebase from "firebase/app";
import { db} from "../config"
class Display extends Component {
	AddMaterial = (props) => {
		this.props.AddMaterial(props);
		
	}
	NewMaterial = (props) => {
		
			this.props.NewMaterial(props);
		
	}

		EditingMat = (props) => {
		
		this.props.EditingMat(props);
		
	}
	AddItem = (props) => {
		this.props.AddItem(props);
		
	}	
	EditingId = (props) => {
		
		this.props.EditingId(props);
		
	}	
	SetDays = (props) => {
		
		this.props.SetDays(props);
		
	}
	SetDisplayVar = (props) => {
		
		this.props.SetDisplayVar(props);
		
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
	Next2 = (props) => {
		this.props.Next2(props);
	}	
	ChooseChantier = (props) => {
		
		this.props.ChooseChantier(props);
		
	}
	NewMaterial = (props) => {
		
			this.props.NewMaterial(props);
		
	}
	AddTeamSelected = (props) => {
		
			this.props.AddTeamSelected(props);
		
	}	
	EditingEquip = (props) => {
		
		this.props.EditingEquip(props);
		
	}
		CheckId = ( props) => {
		
		this.props.CheckId(props);
		
	}	
	constructor(props){
		super(props);
		this.handleChantier = this.handleChantier.bind(this);
		this.handleIndirect = this.handleIndirect.bind(this);
		this.addTeam = this.addTeam.bind(this);
		this.handleRetour = this.handleRetour.bind(this);
		this.handleEquipement = this.handleEquipement.bind(this);
		this.handleMateriaux = this.handleMateriaux.bind(this);
		this.addEquipement = this.addEquipement.bind(this);
		this.addMateriaux = this.addMateriaux.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleTeam = this.handleTeam.bind(this);
		this.handleTotal = this.handleTotal.bind(this);
		this.handleModif = this.handleModif.bind(this);
		 this.handleSuppr =  this.handleSuppr.bind(this);
		 this.dateModif = this.dateModif.bind(this);
		this.state = {
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
  
  
  
	handleRetour(){
		let vide = [];
		this.EditingId(99);
		this.ChooseChantier("NONE");
		this.AddTeamSelected(vide);
		this.SetDisplayVar(false);
		this.Next2(false);
		
	}
	handleTotal(){
		
	
	
		
		
		
		let team = this.props.teamSelected;
		let b = this.props.matlist;
		let days = this.props.daysList;
		let a = this.props.equipement;
		console.log(team,"Selected List");
		console.log(b,"materiaux List");
		console.log(days," Days List");
		console.log(a,"Equipement List");
		let total = 0;
		let i = 0;
		for( i = 0 ; i < a.length ; i++){
			
			total += a[i].jour * a[i].prix_par_jour;
			
			
		}
		for( i = 0 ; i < b.length ; i++){
			
			total += b[i].quantite * b[i].montant_unite;
			
			
		}
		 for(i = 0 ; i < team.length ; i++){
			
			
			total += team[i].cout
		 
		 
		 
		}
		let dateDebut = this.state.debut;
		let dateFin = this.state.Fin;
		let chantierName;
		if(this.props.modifChantier === false){
			chantierName = $("#chantierTest").val();
		}else{
			
			chantierName = this.props.chantierName;
		}
		var account = ""+chantierName;
		
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+"Chantier/";
		var intitule = chantierName;
		var pdv = this.props.pdv;
		
		var ct;
		
		var tmpIndirect = ( this.state.indirect * total ) / 100 ;
		
		ct = total + tmpIndirect;
		pdv = ct + (( this.state.alea * ct )/100);
		pdv = pdv + ((this.state.marge * pdv) /100);
		total = ct;
		
		
		console.log(total);

		
		
		
		
		
		db.ref(myname).child(account).set({intitule,total,pdv,dateDebut,dateFin}); 
		this.SetDisplayVar(false);
		
		
	}
	handleIndirect(){
		let matos = false;
		let teamcheck = false;
		if(this.props.matlist.length > 0 && this.props.equipement.length > 0){
			
			matos = true;
			
			
		}
		if(this.props.teamSelected.length > 0){
			
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
		let chantierName = $("#chantierTest").val();
		var user = firebase.auth().currentUser;
		
		var myname = user.displayName+"Chantier/";
		let myState = true ;
		
		for(let i = 0 ; i < this.props.currentTeamList.length ; i++){
			let dbName = this.props.currentTeamList[i].intitule;
			if(dbName.toUpperCase() === chantierName.toUpperCase()){
				
				myState = false;
				
			}
			
			
		}
		if(myState === true ){
		if(datecheck === true){
		 
		let subdate1 = debut[1]+"/"+debut[0]+"/"+debut[2];
		
		let subdate2 = fin[1]+"/"+fin[0]+"/"+fin[2];
		
		let date1 = new Date(subdate1);
		let date2 = new Date(subdate2);
		
		var time_diff = date2.getTime() - date1.getTime();
		
		var days_diff = time_diff / (1000 * 60 * 60 * 24);
		console.log("days diff : "+days_diff);
		days_diff = Math.ceil(days_diff);
		this.SetDays(days_diff);
		
		var item = this.props.a;
		item.push({intitule : chantierName});
		this.AddTeam(item);
		var account = ""+chantierName;
		
		
		
		var intitule = chantierName;
		
		var total = this.props.total;
		
		var pdv = this.props.pdv;
		$("#ekip").prop("disabled",false);
		$("#mat").prop("disabled",false);
		$("#team").prop("disabled",false);
		
		$("#validate").prop("disabled",true);
		
		this.ChooseChantier(intitule);
		db.ref(myname).child(account).set({intitule,total,pdv,dateDebut,dateFin}); 
		
		}else{
			
			alert("Votre date de fin est mal configurée");
			
		}
		}else{
			
			alert("Ce nom de chantier éxiste déjà");
			
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
	
	handleModif(type,index){
		this.CheckId(false);
		this.EditingId(index);
		if(type == 1){
		this.EditingEquip(true);
		this.NewEquip(true);
		}else{
			
		this.NewMaterial(true);
		this.EditingMat(true);
			
		}
		$("#mainfield").hide();
		
		
	}
	dateModif(){
		var user = firebase.auth().currentUser;
		var myname2 = user.displayName+"Chantier/"+this.props.chantierName+"/";
		let debut = this.state.debut.split('-');
		let dateDebut = this.state.debut;
		let dateFin = this.state.Fin;
		let fin = this.state.Fin.split('-');
		let datecheck = false;
		console.log("dictator");
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
		//days_diff = Math.ceil(days_diff);
		this.SetDays(days_diff);
		let total = 0;
		let pdv = 0;
		db.ref(myname2).child("total").on("value", snapshot => {
			
			
				
			console.log(snapshot.val(), "total monster");
				
			
			
			
		
		
		})
		
		}
		
	}
	handleSuppr(type,index){
		var user = firebase.auth().currentUser;
		var myname2 = user.displayName+this.props.chantierName+"Equipement";
		var myname3 = user.displayName+this.props.chantierName+"Materiel";
		var account = "Equipement"+index;
		var account2 = "Materiel"+index;
		let equipement = this.props.equipement;
		if(type === 1){
		db.ref(myname2).child(account).remove().then(() => {
    console.log('Write succeeded!');
	console.log(this.props.equipement,"monster2");
	
		
			let allNotes = [];
			db.ref(myname2).once("value", snapshot => {
				
				snapshot.forEach(snap => {
					allNotes.push(snap.val());
				});
			}).then(() => {
				
				console.log(allNotes, "after remove");
				this.AddItem(allNotes);
				let longueur = allNotes.length;
				for(let i = 0 ; i < allNotes.length ; i++){
					var faccount = "Equipement"+i;
					var idnumber = i;
					var intitule = allNotes[i].intitule;
					var fournisseur = allNotes[i].fournisseur;
					var prix_par_jour = allNotes[i].prix_par_jour;
					var jour = allNotes[i].jour;
					db.ref(myname2).child(faccount).set({idnumber,intitule,fournisseur,prix_par_jour,jour});
					
				}
				
				var Laccount = "Equipement"+longueur
				db.ref(myname2).child(Laccount).remove()
				
			});
		/*	let a = i+ 1;
			var account2 = "Equipement"+a;
			var newValue = "Equipement"+i;
			db.ref(myname2).child(account2).set(newValue);
			*/
		
		
		
	
  });
		}else{
		db.ref(myname3).child(account2).remove().then(() => {
 
	
		
			let allNotes = [];
			db.ref(myname3).once("value", snapshot => {
				
				snapshot.forEach(snap => {
					allNotes.push(snap.val());
				});
			}).then(() => {
				
				console.log(allNotes, "after remove");
				this.AddMaterial(allNotes);
				let longueur = allNotes.length;
				for(let i = 0 ; i < allNotes.length ; i++){
					var faccount = "Materiel"+i;
					var idnumber = i;
					var intitule = allNotes[i].intitule;
					var fournisseur = allNotes[i].fournisseur;
					var montant_unite = allNotes[i].montant_unite
					var quantite = allNotes[i].quantite;
					db.ref(myname3).child(faccount).set({idnumber,intitule,fournisseur,montant_unite,quantite});
					
				}
				
				var Laccount = "Materiel"+longueur
				db.ref(myname3).child(Laccount).remove()
				
			});
		/*	let a = i+ 1;
			var account2 = "Equipement"+a;
			var newValue = "Equipement"+i;
			db.ref(myname2).child(account2).set(newValue);
			*/
		
		
		
	
  });			
			
			
			
			
		}
		console.log(this.props.equipement,"monster");
		
		
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
										Ajouter une location
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
			
			
			
			
			
			
			{a.map((data,index) => (
				
				<Card>
					<Card.Content>
						<Card.Header>Location {data.idnumber + 1}</Card.Header>
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
					<Card.Content extra>
									
										<Button
											onClick={() => this.handleModif(1,index)}
											positive>
											Modifier
										</Button>
										<Button
											onClick={() => this.handleSuppr(1,index)}
											negative>
											Supprimer
										</Button>
									
								</Card.Content>
				</Card>
			))}
			
			
					
			
			</Card.Group>
				
		
		
		
			);
		
		
	}
	addTeam(){
	 let team = this.props.teamSelected;
	 console.log(team, "TEAM SELECTED 94ZOO");
	 
	 let days = this.props.daysList;
	 
	


	 
	 return (
	 
								<Card.Group>
<Card>
								<Card.Content>
									<Card.Description>
										Refaire mes equipes
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
						<Card.Header>Equipe {index + 1}</Card.Header>
						<Card.Description>
							<ul>
								<li key = {data.idnumber}>
									<p>Nombre de jours sur le chantier : {data.jour}</p>
									<p>Coût de l'équipe : {data.cout}  € </p>
									<p>Nombre de membre : {data.nombre} </p>
									
								</li>
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
			
			
			
			
			
			
			{a.map((data,index) => (
				
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
						<Card.Content extra>
									
										<Button
											onClick={() => this.handleModif(2,index)}
											positive>
											Modifier
										</Button>
										<Button
											onClick={() => this.handleSuppr(2,index)}
											negative>
											Supprimer
										</Button>

									
								</Card.Content>
				</Card>
			))}
			
			
					
			
			</Card.Group>
				
		
		
		
			);
		
		
		
		
		
	}
	
	

	
	render() {
		
		console.log(this.props.modifChantier,"OMG");
		if(this.props.modifChantier === false){
		return (
		
		<Segment textAlign = 'center' basic id="mainfield">
					<div>
		<Button
					onClick={this.handleRetour}
					primary>Retour</Button>
			
				
		</div>
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
						popupPosition="bottom center"
						/>
					
				
				</Form.Field>
				<Form.Field inline>
					  <label> Date de fin du chantier</label>
					  <DateInput
						name="Fin"
						value={this.state.Fin}
						onChange={this.handleChange}						
						placeholder="Date de fin du chantier"
						popupPosition="bottom center"
						/>
					
				
				</Form.Field>
				<Form.Field>
					<Button
						id="validate"
						onClick={this.handleChantier}
						positive>Valider</Button>
				</Form.Field>
				<Divider horizontal>Location</Divider>
				<div id="equipmentField">
				
					<Form.Field id = "0">
						
						{this.props.equipement.length > 0 ?  
								
								this.addEquipement()
								
							: ( 
						<Card.Group>
							<Card>
								<Card.Content>
									<Card.Description>
										Ajouter une location
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
					{this.props.teamSelected.length > 0 ?
				
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
						positive>Ajouter Coûts indirects et autre(s) </Button>
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
					onClick={this.handleTotal}
					positive>Terminer</Button>
			
				</div>
						
				
			</Form>
			</Segment>
		
		
		
		
			);
		
		
		
	}else{
		$("#ekip").prop("disabled",false);
		$("#mat").prop("disabled",false);
		$("#team").prop("disabled",false);
		
		$("#validate").prop("disabled",true);
		console.log(this.props.teamSelected, "TEAM SELECTED ZEER");
		console.log("lag");
		return (
		
		<Segment textAlign = 'center' basic id="mainfield">
		<div>
		<Button
					onClick={this.handleRetour}
					primary>Retour</Button>
			
				
		</div>
		<Form>
				<Divider horizontal>Propriétés du chantier</Divider>	

				<Form.Field inline>
					  <label>Date de début du chantier</label>
					  <DateInput
						name="debut"
						value={this.state.debut}
						onChange={this.handleChange}
						placeholder="Date de début du chantier"
						popupPosition="bottom center"
						/>
					
				
				</Form.Field>
				<Form.Field inline>
					  <label> Date de fin du chantier</label>
					  <DateInput
						name="Fin"
						value={this.state.Fin}
						onChange={this.handleChange}						
						placeholder="Date de fin du chantier"
						popupPosition="bottom center"
						/>
					
				
				</Form.Field>
				<Form.Field>
					<Button
						id="modifDate"
						onClick={this.dateModif}
						positive>Valider</Button>
				</Form.Field>
				<Divider horizontal>Location</Divider>
				<div id="equipmentField">
				
					<Form.Field id = "0">
						
						{this.props.equipement.length > 0 ?  
								
								this.addEquipement()
								
							: ( 
						<Card.Group>
							<Card>
								<Card.Content>
									<Card.Description>
										Ajouter une Location
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
					{this.props.teamSelected.length > 0 ?
				
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
						positive>Ajouter Coûts indirects et autre(s) </Button>
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
					onClick={this.handleTotal}
					positive>Terminer</Button>
			
				</div>
						
				
			</Form>
			</Segment>
		
		
		
		
		)
	}
		
		
		
		
		
		
		
	}
	
	}
	
	
	
	
	
	


export default Display;