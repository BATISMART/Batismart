import React, {Component} from 'react';



import { Card, Form, Input, Icon, Button, Segment, Divider, Grid,Menu,Dropdown, Header, Image, Modal} from 'semantic-ui-react'
import  { Redirect } from 'react-router-dom'
import firebase from "firebase/app";
import { db} from "../config";
import $ from "jquery";
import './ErrorChantier.css'
import Lock from "./lock.png";
class AcceuilChantier extends Component {
	EditingId = (props) => {
		
		this.props.EditingId(props);
		
	}
	EditingId2 = (props) => {
		
		this.props.EditingId2(props);
		
	}	

	SelectedAndDays = (props1,props2) => {
		
			this.props.SelectedAndDays(props1,props2);
		
	}	
	DisplayTeamSuivi = (props) => {
		
			this.props.DisplayTeamSuivi(props);
		
	}
	AddTeam = (props) => {
		this.props.AddTeam(props);
		
	}
	Next2 = (props) => {
		this.props.Next2(props);
	}
	AddTeamWeek = (props) => {
		this.props.AddTeamWeek(props);
		
	}
	AddItem = (props) => {
		this.props.AddItem(props);
		
	}
	AddMaterial = (props) => {
		this.props.AddMaterial(props);
		
	}
	SetDisplayVar = (props) => {
		
		this.props.SetDisplayVar(props);
		
	}
	NewEquipSuivi = (props) => {
		
		this.props.NewEquipSuivi(props);
		
	}
	AddItemSuivi = (props) => {
		
		this.props.AddItemSuivi(props);
		
	}
	AddMaterialSuivi = (props) => {
		
		this.props.AddMaterialSuivi(props);
		
	}
	SetSemaine = (props) => {
		
		this.props.SetSemaine(props);
		
	}
	NewMaterialSuivi = (props) => {
		
		this.props.NewMaterialSuivi(props);
		
	}
	ChooseChantier = (props) => {
		
		this.props.ChooseChantier(props);
		
	}
	SetDays = (props) => {
		
		this.props.SetDays(props);
		
	}
	EditingEquipSuivi = (props) => {
		
		this.props.EditingEquipSuivi(props);
		
	}
	EditingMaterialSuivi = (props) => {
		
		this.props.EditingMaterialSuivi(props);
		
	}		
	constructor(props){
		
		super(props);
		let suiviCheck = false;
		let indValue = 0;
		this.handleEnter = this.handleEnter.bind(this);
		this.handleSuivi = this.handleSuivi.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.handleSuppr = this.handleSuppr.bind(this);
		this.handleMateriaux = this.handleMateriaux.bind(this);
		this.addWeeks = this.addWeeks.bind(this);
		this.handleEquipement = this.handleEquipement.bind(this);
		this.handleTeam = this.handleTeam.bind(this);
		this.suiviChantier = this.suiviChantier.bind(this);
		this.handleModif = this.handleModif.bind(this);
		this.setOpen = this.setOpen.bind(this);
		this.displayNumb = this.displayNumb.bind(this);
		this.handleModifSuivi = this.handleModifSuivi.bind(this);
		let activeItem;
		this.state = { 	
						currUser: null,
						suiviCheck,
						activeItem: "Cliquer ici",
						indValue: 0,
						open: false,
						open1 : false,
						open2: false
						}
		
	}
	componentDidMount() {

		var user = firebase.auth().currentUser;
		this.setState({currUser: user})
		if(user !== null){
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
	
	
	
	
	
	}
  });
		}
		
		
}
	
	
	setOpen(etat){
		
		this.setState({open: etat});
		
		
		
	}
	handleModifSuivi(type, index){
		
		
		if(type == 1){
			$("#mainfield2").hide();
			console.log(this.props.currentId, "current id props suivi");
			this.EditingId2(index);
			this.EditingEquipSuivi(true);
			this.NewEquipSuivi(true);
		}else{
			this.EditingId2(index);
			this.EditingMaterialSuivi(true);
			this.NewMaterialSuivi(true)
			$("#mainfield2").hide();
		}
		
		
	}
	handleEnter(){
	let emptyList = [];
	let emptyList2 = [];
	let emptyList3 = [];
	let emptyList4 = [];
		this.AddMaterial(emptyList);
		// this.AddTeam(emptyList);
		
		this.SelectedAndDays(emptyList3,emptyList4);
		this.AddItem(emptyList2);
		this.SetDisplayVar(true);
		
		
	}
	handleEquipement(){
		
		this.NewEquipSuivi(true);
		$("#mainfield2").hide();
	}
	handleMateriaux(){
		
		this.NewMaterialSuivi(true);
		$("#mainfield2").hide();
		
	}
	handleTeam(){
		
		this.DisplayTeamSuivi(true);
		
		$("#mainfield2").hide();
		
	}
	handleDelete(type, index){
		
		if(type == 1 ){
			this.setState({open2:false})
			var user = firebase.auth().currentUser;
			let item = this.props.itemSuiviList
			var myname = user.displayName+this.props.chantierName+"Equipement"+this.props.semaine+"/";
			console.log(myname,"delete item");
			var account = "Equipement"+index;
					db.ref(myname).child(account).remove().then(() => {

	
		
			let allNotes = [];
			db.ref(myname).once("value", snapshot => {
				
				snapshot.forEach(snap => {
					allNotes.push(snap.val());
				});
			}).then(() => {
				
				console.log(allNotes, "after remove");
				this.AddItemSuivi(allNotes);
				let longueur = allNotes.length;
				for(let i = 0 ; i < allNotes.length ; i++){
					var faccount = "Equipement"+i;
					var idnumber = i;
					var intitule = allNotes[i].intitule;
					var fournisseur = allNotes[i].fournisseur;
					var prix_par_jour = allNotes[i].prix_par_jour;
					var jour = allNotes[i].jour;
					db.ref(myname).child(faccount).set({idnumber,intitule,fournisseur,prix_par_jour,jour});
					
				}
				
				var Laccount = "Equipement"+longueur
				db.ref(myname).child(Laccount).remove()
				
			});
		/*	let a = i+ 1;
			var account2 = "Equipement"+a;
			var newValue = "Equipement"+i;
			db.ref(myname2).child(account2).set(newValue);
			*/
		
		
		
	
  });
			
			
		}else{
			
			
			this.setState({open1:false})
			var user = firebase.auth().currentUser;
			let item = this.props.itemSuiviList
			var myname = user.displayName+this.props.chantierName+"Materiel"+this.props.semaine+"/";
			console.log(myname,"delete item");
			var account = "Materiel"+index;
					db.ref(myname).child(account).remove().then(() => {

	
		
			let allNotes = [];
			db.ref(myname).once("value", snapshot => {
				
				snapshot.forEach(snap => {
					allNotes.push(snap.val());
				});
			}).then(() => {
				
				console.log(allNotes, "after remove");
				this.AddMaterialSuivi(allNotes);
				let longueur = allNotes.length;
				for(let i = 0 ; i < allNotes.length ; i++){
					var faccount = "Materiel"+i;
					var idnumber = i;
					var intitule = allNotes[i].intitule;
					var fournisseur = allNotes[i].fournisseur;
					var montant_unite = allNotes[i].montant_unite
					var quantite = allNotes[i].quantite;
					db.ref(myname).child(faccount).set({idnumber,intitule,fournisseur,montant_unite,quantite});
					
				}
				
				var Laccount = "Materiel"+longueur
				db.ref(myname).child(Laccount).remove()
				
			});
		/*	let a = i+ 1;
			var account2 = "Equipement"+a;
			var newValue = "Equipement"+i;
			db.ref(myname2).child(account2).set(newValue);
			*/
		
		
		
	
  });
			
			
			
			
			
			
		}
			
			
			
			
			
			
			
		
		
		
	}
	suiviChantier(){
		let item = this.props.itemSuiviList;
		let matos = this.props.matlistSuivi;
		let teamWeek = this.props.teamWeek;
		
		return (
		
		<Segment textAlign = 'center' basic id="mainfield2">

			
				<div id="equipmentField">
				
					<Form.Field id = "0">
					
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
											onClick={this.handleEquipement}
											circular
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
							
							{item.map((data,index) => (
				
				<Card>
					<Card.Content>
						<Card.Header>Location {index + 1}</Card.Header>
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
											onClick={() => this.handleModifSuivi(1,index)}
											positive>
											Modifier
										</Button>
<Modal
											size = "mini"
											onClose={() => this.setState({open2:false})}
											onOpen={() => this.setState({open2:true})}
											open={this.state.open2}
										trigger={<Button
											negative>
											Supprimer
										</Button>}
										>
										<Modal.Content>
											<Modal.Description>
												<p>
													Voulez-vous vraiment supprimer cette location ?
												</p>
											</Modal.Description>
										</Modal.Content>
										<Modal.Actions>
											<Button color='black' onClick={() => this.setState({open2:false})}>
												Non
											</Button>
											<Button
												content="Oui"
												labelPosition='right'
												icon='checkmark'
												onClick={() => this.handleDelete(1,index)}
												positive
											/>
										</Modal.Actions>
										</Modal>

									
					</Card.Content>					
				</Card>
			))}
							
							
							
							
							
							
							
						</Card.Group>
						
						
					
					</Form.Field>
					
				</div>
				<Divider horizontal>Matériel</Divider>
				<div id ="materField">
				
					
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
						
						
						{matos.map((data,index) => (
				
				<Card>
					<Card.Content>
						<Card.Header>Materiel {index + 1}</Card.Header>
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
											onClick={() => this.handleModifSuivi(2,index)}
											positive>
											Modifier
										</Button>
<Modal
											size = "mini"
											onClose={() => this.setState({open1:false})}
											onOpen={() => this.setState({open1:true})}
											open={this.state.open1}
										trigger={<Button
											negative>
											Supprimer
										</Button>}
										>
										<Modal.Content>
											<Modal.Description>
												<p>
													Voulez-vous vraiment supprimer ce Matériel ?
												</p>
											</Modal.Description>
										</Modal.Content>
										<Modal.Actions>
											<Button color='black' onClick={() => this.setState({open1:false})}>
												Non
											</Button>
											<Button
												content="Oui"
												labelPosition='right'
												icon='checkmark'
												onClick={() => this.handleDelete(2,index)}
												positive
											/>
										</Modal.Actions>
										</Modal>										
										
									

									
					</Card.Content>	
				</Card>
			))}
								
							
							
							
							
						</Card.Group>
					
					
					
				</div>
				<Divider horizontal>Mes Equipes</Divider>
				<div id ="ekipField">
				
					<Form.Field id = "2">
					
						<Card.Group>
						
							<Card>
								<Card.Content>
									<Card.Description>
										Ajouter mes Equipes / Refaire mes Equipes
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div>
										<Button
											id="team"
											circular
											animated
											onClick={this.handleTeam}
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
						
						{teamWeek.map((data,index) => (
				
				<Card>
					<Card.Content>
						<Card.Header>Equipe {index + 1}</Card.Header>
						<Card.Description>
							<ul>
								<li key = {data.idnumber}>
									<p>Nombre de jours dans la semaine sur le chantier : {data.jour}</p>
									<p>Coût de l'équipe dans la semaine : {data.cout}</p>
									
								</li>
							</ul>
						</Card.Description>
					</Card.Content>
				</Card>
			))}
								
							
							
							
						
						</Card.Group>	
					</Form.Field>	
				
				</div>

						
				
			
			</Segment>
		
		
		
		
			);
		
		
		
		
		
	}
	handleSuivi(index){
		this.setState({indValue: index});
		this.setState({suiviCheck: true});
		this.ChooseChantier(this.props.team[index].intitule);
		
		
		
	}
	handleModif(index){
		let emptyList = [];
		let emptyList2 = [];
		let emptyList3 = [];
		let emptyList4 = [];
		this.AddMaterial(emptyList);
		// this.AddTeam(emptyList);
		
		// this.SelectedAndDays(emptyList3,emptyList4);
		this.AddItem(emptyList2);
		this.SetDisplayVar(true);
		this.ChooseChantier(this.props.team[index].intitule);
		let debut = this.props.team[index].dateDebut.split('-');
		let dateDebut = this.props.team[index].dateDebut;
		let dateFin = this.props.team[index].dateFin;
		let fin = this.props.team[index].dateFin.split('-');
		let subdate1 = debut[1]+"/"+debut[0]+"/"+debut[2];
		
		let subdate2 = fin[1]+"/"+fin[0]+"/"+fin[2];
		
		let date1 = new Date(subdate1);
		let date2 = new Date(subdate2);
		
		var time_diff = date2.getTime() - date1.getTime();
		
		var days_diff = time_diff / (1000 * 60 * 60 * 24);
		console.log("days diff : "+days_diff);
		days_diff = Math.ceil(days_diff);
		this.SetDays(days_diff);
		this.Next2(true);
		
		
	}
	handleSuppr(index){
		
		
		let debut = this.props.team[index].dateDebut.split('-');
		let dateDebut = this.props.team[index].dateDebut;
		let dateFin = this.props.team[index].dateFin;
		let fin = this.props.team[index].dateFin.split('-');
		let subdate1 = debut[1]+"/"+debut[0]+"/"+debut[2];
		let team = this.props.team;
		let subdate2 = fin[1]+"/"+fin[0]+"/"+fin[2];
		
		let date1 = new Date(subdate1);
		let date2 = new Date(subdate2);
		
		var time_diff = date2.getTime() - date1.getTime();
		
		var days_diff = time_diff / (1000 * 60 * 60 * 24);
		console.log("days diff : "+days_diff);
		days_diff = Math.ceil(days_diff);
		let nbrSem = Math.ceil(days_diff/7);
		
		
		var user = firebase.auth().currentUser;
		let myname1 = user.displayName + "Chantier/"+team[index].intitule;
		let myname2 = user.displayName + team[index].intitule + "Equipe/";
		let myname3 = user.displayName + team[index].intitule + "Equipement/";
		let myname4 = user.displayName + team[index].intitule + "Materiel/";
		
		
		for( let i = 0 ; i < nbrSem ; i++){
			let a = i + 1;
			let semaine = "Semaine"+a;
			
		let myname5 = user.displayName + team[index].intitule + "Equipe"+ semaine + "/";
		let myname6 = user.displayName + team[index].intitule + "Equipement"+ semaine + "/";
		let myname7 = user.displayName + team[index].intitule + "Materiel"+ semaine + "/";
			db.ref(myname5).remove();
			db.ref(myname6).remove();
			db.ref(myname7).remove();
			
		}
		db.ref(myname2).remove();
		db.ref(myname3).remove();
		db.ref(myname4).remove();
		db.ref(myname1).remove();
		if(this.props.team.length === 1 ){
			let vide = [];
			this.AddTeam(vide);
			
		}
		this.setOpen(false)
		console.log(this.props.team,"TEAM SUPPR");
		
		
	}
	handleValidate(){
		let empty = [];
		let empty2 = [];
		let empty3 = [];
		this.AddItemSuivi(empty);
		this.AddMaterialSuivi(empty2);
		this.AddTeamWeek(empty3);
		let name = "Cliquer ici";
		this.SetSemaine("Semaine0");
		this.setState({ activeItem: name })
		this.setState({suiviCheck: false});
		
	}
	handleItemClick = (e, { name }) => { this.setState({ activeItem: name });
										let trim = name.replace(/\s+/g, '');
										console.log(trim, "semaine suivi");
										 this.SetSemaine(trim);
										 
	}
	
	addWeeks(){
		let team = this.props.team;
		let indValue = this.state.indValue;
		let dateDebut = team[indValue].dateDebut;
		let dateFin = team[indValue].dateFin;
		let debut = dateDebut.split('-');
		let fin = dateFin.split('-');
		let subdate1 = debut[1]+"/"+debut[0]+"/"+debut[2];
		
		let subdate2 = fin[1]+"/"+fin[0]+"/"+fin[2];
		
		let date1 = new Date(subdate1);
		let date2 = new Date(subdate2);
		
		var time_diff = date2.getTime() - date1.getTime();
		
		var days_diff = time_diff / (1000 * 60 * 60 * 24);
		days_diff = Math.ceil(days_diff);
		let nbrSem = Math.ceil(days_diff/7);
		let tempTab = [];
		tempTab.push("Cliquer ici");
		for( let i = 0 ; i < nbrSem ; i++){
			let a = i + 1;
			let semaine = "Semaine "+a;
			tempTab.push(semaine);
			
		}
		   return (
      <Grid>
        <Grid.Column width={tempTab.length} >
		
          <Menu>
		  <Dropdown item text='Cliquer ici'>
			<Dropdown.Menu>
		  {tempTab.map((data) => ( 
            <Dropdown.Item
              name={data}
              active={this.state.activeItem === data}
              onClick={this.handleItemClick}
            >{data}</Dropdown.Item>
		  ))}
		  </Dropdown.Menu>
		</Dropdown>
		<Menu.Item>
				<Button 
					onClick={this.handleValidate}
					primary>RETOUR</Button>
		</Menu.Item>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
			
			
			{this.state.activeItem !== "Cliquer ici" && 
			
		
          <Segment>
		    <Divider horizontal>{this.state.activeItem}</Divider>	
		  {this.suiviChantier()}
			
          </Segment>
			}
        </Grid.Column>
      </Grid>
    )
	
		
		
		
	}
	
	
	
	
	displayNumb(number){
		
		
		console.log(number,"number");
		
		var num = number;
var n = num.toString();

const str = num.toString();

const words = str.split('.');
let words1 = words[0]
// expected output: "fox"
let a = 0;
let tab = []
for(let i = words1.length - 1 ; i > -1 ; i--){
  
  tab.push(words1[i])
  a++;
  if(a == 3){
    
   	tab.push(" ");
    a = 0;
  }
  
}
let str2 = "";
for(let i = tab.length - 1 ; i > -1 ; i--){
  
 	str2 += tab[i]
  
}
	if(words[1] !== undefined){
	str2 += "."+words[1]
	}
// expected output: "k"

// expected output: Array ["The quick brown fox jumps over the lazy dog."]

		
		
		
		
		return str2;
		
	}
	
	render() {
		
		let team = this.props.team;
		let currentTeam = this.props.currentTeam;
		console.log(team,"bubblegum");
		console.log(currentTeam,"teamz");
		if(this.state.currUser !== null){
			
			if(currentTeam.length > 0){
		return (
		<div>
		{this.state.suiviCheck === false ?
		(
			<Card.Group>
							<Card>
								<Card.Content>
									<Card.Description>
										Ajouter un Chantier
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div>
										<Button
											animated
											circular
											onClick={this.handleEnter}
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
									<Card.Header>Chantier {index + 1} : {data.intitule} </Card.Header>
									<Card.Description>
										<p>Date de début de chantier : {data.dateDebut}</p>
										<p>Date de fin de chantier : {data.dateFin}</p>
										<p>Coût total du chantier : {this.displayNumb(Math.round(data.total*100)/100)} € </p>
										<p> Prix de vente du chantier : {this.displayNumb(Math.round(data.pdv*100)/100)} € </p>
									</Card.Description>
								</Card.Content>
									<Card.Content extra>
									<Button.Group>
										<Button
											onClick={() => this.handleModif(index)}
											positive>
											Modifier le chantier
										</Button>
										<Button.Or />
										<Modal
											size = "mini"
											onClose={() => this.setOpen(false)}
											onOpen={() => this.setOpen(true)}
											open={this.state.open}
										trigger={<Button
											negative>
											Supprimer
										</Button>}
										>
										<Modal.Content>
											<Modal.Description>
												<p>
													Voulez-vous vraiment supprimer ce chantier ?
												</p>
											</Modal.Description>
										</Modal.Content>
										<Modal.Actions>
											<Button color='black' onClick={() => this.setOpen(false)}>
												Non
											</Button>
											<Button
												content="Oui"
												labelPosition='right'
												icon='checkmark'
												onClick={() => this.handleSuppr(index)}
												positive
											/>
										</Modal.Actions>
										</Modal>	
										
										
									</Button.Group>
									
									<br/>
										<Button
											onClick={() => this.handleSuivi(index)}
											>
											Faire le suivi
										</Button>
										<br/>

									
										
								</Card.Content>
							</Card>
							))}
										
								
							
							
							
							
							

      



	
						</Card.Group>
		
		) : this.addWeeks() }
		
		</div>
		
			);
			}else{
				
							return (
			<div> Veuillez ajouter une équipe pour pouvoir créer un chantier </div>
			
			);
				
			}
		}else{
			
			return (

			<div >
				<img class="imagelock" src={Lock} />
				<h2 class="errorm" >
					Erreur utilisateur vous n'êtes pas connecté  : Connectez-vous ou créez un compte pour accéder à nos fonctionnalités 
				</h2>
			</div>
			
			);
		
		
		}
		
		
		
		
		
	}
	
	
	
	
	
	
	
	
	
}
export default AcceuilChantier;