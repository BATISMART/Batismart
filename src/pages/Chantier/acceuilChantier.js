import React, {Component} from 'react';



import { Card, Form, Input, Icon, Button, Segment, Divider, Grid,Menu,Dropdown} from 'semantic-ui-react'
import  { Redirect } from 'react-router-dom'
import firebase from "firebase/app";
import { db} from "../config";
import $ from "jquery";
class AcceuilChantier extends Component {
	
	SelectedAndDays = (props1,props2) => {
		
			this.props.SelectedAndDays(props1,props2);
		
	}	
	DisplayTeamSuivi = (props) => {
		
			this.props.DisplayTeamSuivi(props);
		
	}
	AddTeam = (props) => {
		this.props.AddTeam(props);
		
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
	constructor(props){
		
		super(props);
		let suiviCheck = false;
		let indValue = 0;
		this.handleEnter = this.handleEnter.bind(this);
		this.handleSuivi = this.handleSuivi.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.handleMateriaux = this.handleMateriaux.bind(this);
		this.addWeeks = this.addWeeks.bind(this);
		this.handleEquipement = this.handleEquipement.bind(this);
		this.handleTeam = this.handleTeam.bind(this);
		this.suiviChantier = this.suiviChantier.bind(this);
		let activeItem;
		this.state = { 	
						currUser: null,
						suiviCheck,
						activeItem: "Cliquer ici",
						indValue: 0
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
	suiviChantier(){
		let item = this.props.itemSuiviList;
		let matos = this.props.matlistSuivi;
		let teamWeek = this.props.teamWeek;
		console.log(item,"wsh pk");
		return (
		
		<Segment textAlign = 'center' basic id="mainfield2">

			
				<div id="equipmentField">
				
					<Form.Field id = "0">
					
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
						<Card.Header>Equipement {index + 1}</Card.Header>
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
				</Card>
			))}
								
							
							
							
							
						</Card.Group>
					
					
					
				</div>
				<Divider horizontal>Mes Equipes</Divider>
				<div id ="ekipField">
				
					<Form.Field id = "2">
					
						<Card.Group>
						{teamWeek.length === 0 &&
						 (
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
						)}
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
					primary>Valider</Button>
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
	
	
	
	
	
	
	render() {

		let team = this.props.team;
		console.log(team,"teamz");
		if(this.state.currUser !== null){
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
										<p>Coût total du chantier : {data.total} € </p>
										<p> Prix de vente du chantier : {data.pdv} € </p>
									</Card.Description>
								</Card.Content>
									<Card.Content extra>
									
										<Button
											onClick={() => this.handleSuivi(index)}
											positive>
											Faire le suivi
										</Button>
									
								</Card.Content>
							</Card>
							))}
										
								
							
							
							
							
							
							
						</Card.Group>
		
		) : this.addWeeks() }
		
		</div>
		
			);
		}else{
			
			return (
			<div>Erreur utilisateur vous n'êtes pas connecté  : Connectez-vous ou Cliquer sur Accueil ensuite sur chantier dans la sidebar de gauche si vous êtes déjà connecté </div>
			
			);
		}
		
		
		
		
		
	}
	
	
	
	
	
	
	
	
	
}
export default AcceuilChantier;