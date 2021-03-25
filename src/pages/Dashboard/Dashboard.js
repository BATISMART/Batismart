import React, {Component} from 'react';
import firebase from "firebase/app";
import { db} from "../config";
import { Card, Button, Container, Divider } from 'semantic-ui-react'
import { LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './ErrorDashboard.css'
import Lock from "./lock.png";
class Dashboard extends Component {
	
	
		constructor(props){
		super(props);
		this.handleSuivi = this.handleSuivi.bind(this);
		this.handleRetour = this.handleRetour.bind(this);
		this.addGraph = this.addGraph.bind(this);
		this.setupDB = this.setupDB.bind(this);
		let indValue = 0;
		let GraphCheck = false;
		let team = []
		let mesEquipesPrev = []
		let mesEquipesSuiv = []
		let mesEquipementPrev = []
		let mesEquipementSuiv = []
		let mesMateriauxSuiv = []
		let mesMateriauxPrev = []
	
		this.state = {currentUser:null, team,GraphCheck,indValue,mesEquipesPrev,mesEquipementPrev,mesMateriauxPrev, mesEquipesSuiv, mesEquipementSuiv, mesMateriauxSuiv }
						
		
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
	this.setState({team: allNotes});
	
	
	
	
	
	}
	});
	
		}
	
	
	
	
		
		
	}
	handleSuivi(index){
		
		this.setState({indValue: index});
		this.setState({GraphCheck: true});
		this.setupDB(index);
		// this.ChooseChantier(this.props.team[index].intitule);
		
		
	}
		handleRetour(){
		

		this.setState({GraphCheck: false});

		// this.ChooseChantier(this.props.team[index].intitule);
		
		
	}
	setupDB(indValue){
		
		let team = this.state.team;

		var user = firebase.auth().currentUser;
		var myname1 = user.displayName+team[indValue].intitule+"Equipe/";
		console.log(myname1,"myname1");
		var myname2 = user.displayName+team[indValue].intitule+"Equipement/";
		var myname3 = user.displayName+team[indValue].intitule+"Materiel/";
		db.ref(myname1).on("value", snapshot => {
			let allNotes = [];
			snapshot.forEach(snap => {
				allNotes.push(snap.val());
			});
			console.log(allNotes);
		this.setState({mesEquipesPrev: allNotes});
		})
		db.ref(myname2).on("value", snapshot => {
			let allNotes = [];
			snapshot.forEach(snap => {
				allNotes.push(snap.val());
			});
	
			this.setState({mesEquipementPrev: allNotes});
		})
		db.ref(myname3).on("value", snapshot => {
			let allNotes = [];
			snapshot.forEach(snap => {
				allNotes.push(snap.val());
			});
	
			this.setState({mesMateriauxPrev: allNotes});	
		})
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
		
		for(let i = 0 ; i < nbrSem+1 ; i++ ) {
			
			var suivi1 = user.displayName+team[indValue].intitule+"EquipeSemaine"+i+"/";
			var suivi2 = user.displayName+team[indValue].intitule+"EquipementSemaine"+i+"/";
			var suivi3 = user.displayName+team[indValue].intitule+"MaterielSemaine"+i+"/";
			
			
			
		db.ref(suivi1).on("value", snapshot => {
			let allNotes = this.state.mesEquipesSuiv;
			snapshot.forEach(snap => {
				allNotes.push({values: snap.val(),semaine: i});
			});
			console.log(allNotes);
			this.setState({mesEquipesSuiv: allNotes});
		})
		db.ref(suivi2).on("value", snapshot => {
			let allNotes = this.state.mesEquipementSuiv;
			snapshot.forEach(snap => {
				allNotes.push({values: snap.val(),semaine: i});
			});
	
			this.setState({mesEquipementSuiv: allNotes});
		})
		db.ref(suivi3).on("value", snapshot => {
			let allNotes = this.state.mesMateriauxSuiv;
			snapshot.forEach(snap => {
				allNotes.push({values: snap.val(),semaine: i});
			});
	
			this.setState({mesMateriauxSuiv: allNotes});	
		})
			
			
			
		}
		
		
		
		
	}
	addGraph(){
		let team = this.state.team;
		let indValue = this.state.indValue;
		let mesEquipesPrev = this.state.mesEquipesPrev;
		let mesEquipementPrev = this.state.mesEquipementPrev;
		let mesMateriauxPrev = this.state.mesMateriauxPrev;
		let EquipementTotal = 0;
		let EquipeTotal = 0;
		let MaterielTotal = 0;
		let suiviTotal = [];
		let suiviEquipement = [];
		let suiviEquipe = [];
		let suiviFull = [];
		let graphData = [];
		let cumuleData = [];
		let totalData = [];
		let pdvData = [];
		
		
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
		
		for(let i = 0 ; i < nbrSem ; i++){
			totalData.push(team[indValue].total);
			pdvData.push(team[indValue].pdv);
			cumuleData.push(0);
			suiviFull.push(0);
			suiviEquipe.push(0);
			suiviTotal.push(0);
			suiviEquipement.push(0);
			
		}
		
		
		
		
		
		for(let i = 0 ; i < mesEquipesPrev.length ; i++){
			
			EquipeTotal += Math.round(mesEquipesPrev[i].cout * 100)/100;
			
			
		}
		for(let i = 0 ; i < mesEquipementPrev.length ; i++){
			
			EquipementTotal += Math.round((mesEquipementPrev[i].jour * mesEquipementPrev[i].prix_par_jour) * 100) / 100;
			
		}
		for(let i = 0 ; i < mesMateriauxPrev.length ; i++){
			console.log(mesMateriauxPrev[i]);
			MaterielTotal += Math.round((mesMateriauxPrev[i].quantite * mesMateriauxPrev[i].montant_unite)*100)/100;
			
		}
		let mesMateriauxSuiv = this.state.mesMateriauxSuiv;
		let mesEquipementSuiv = this.state.mesEquipementSuiv;
		let mesEquipesSuiv = this.state.mesEquipesSuiv;
		
		
		if(mesMateriauxSuiv.length > 0){
			for(let i = 0 ; i < mesMateriauxSuiv.length ; i++){
				let currInd =  mesMateriauxSuiv[i].semaine;
				let values = mesMateriauxSuiv[i].values;
				suiviTotal[currInd-1] += Math.round((values.quantite * values.montant_unite)*100)/100;
			
			}
		}
		if(mesEquipementSuiv.length > 0){
			for(let i = 0 ; i < mesEquipementSuiv.length ; i++){
				let currInd =  mesEquipementSuiv[i].semaine;
				let values = mesEquipementSuiv[i].values;
				suiviEquipement[currInd-1] +=Math.round((values.jour * values.prix_par_jour)*100)/100;
			
			}
		}
		if(mesEquipesSuiv.length > 0){
			for(let i = 0 ; i < mesEquipesSuiv.length ; i++){
				let currInd =  mesEquipesSuiv[i].semaine;
				let values = mesEquipesSuiv[i].values;
				suiviEquipe[currInd-1] +=Math.round(values.cout * 100)/100;
			
			}
		}
		for(let i = 0 ; i < nbrSem ; i++){
			suiviFull[i] = suiviEquipe[i] + suiviEquipement[i] + suiviTotal[i];
			suiviFull[i] = Math.round(suiviFull[i] * 100)/100
				
		}
		let tmp = 0;
		for(let i = 0 ; i < nbrSem ; i++){
			tmp += suiviFull[i];
			cumuleData[i] = Math.round(tmp*100)/100;
				
		}
		for(let i = 0 ; i < nbrSem ; i++){
			let a = i+1;
			var currName = "Semaine "+a;
			graphData.push({name: currName, Coût: suiviFull[i], Cumule:Math.round(cumuleData[i]*100)/100,total: Math.round(totalData[i]*100)/100, pdv: Math.round(pdvData[i]*100)/100});	
		}
		
		let x1 = 0;
		let x2 = 0;
		let x3 = 0;
		for(let i = 0 ; i < suiviEquipement.length ; i++){
			
			x1 += suiviEquipement[i]
			
		}
		for(let i = 0 ; i < suiviEquipe.length ; i++){
			
			x2 += suiviEquipe[i]
			
		}
		for(let i = 0 ; i < suiviTotal.length ; i++){
			
			x3 += suiviTotal[i]
			
		}		
		
		
		
		
const data = [
  {
    name: 'Matériaux',
    Coût: MaterielTotal
  },
  {
    name: 'Matériaux suivis',
    Coût: x3
  },

]
const data2 = [
	{
		name: 'Equipes',
		Coût: EquipeTotal
	},
	{
		name:'Equipes suivies',
		Coût: x2
		
		
	},



]
const data3 = [
	{
		name: 'Equipement',
		Coût: EquipementTotal
	},
	{
		name:'Equpements suivis',
		Coût: x1
		
		
	},



]
	
	let prixTotalCum = Math.round(cumuleData[cumuleData.length - 1] * 100 ) / 100
	let pdvChantier = Math.round(pdvData[0] * 100)/100;
	let def = (prixTotalCum * 100) / pdvChantier
	
	def = Math.round(def);
	
	def = 100 - def;
	def = Math.abs(def)
	console.log(def,"wsh pourcentage");
	console.log(EquipementTotal,"graph equipement total");
	console.log(suiviEquipement,"graph equipement total suivi");
	
		
		    return (
      <Container style={{ margin: 20 }}>
	  <Divider horizontal>Mes dépenses prévues pour le chantier : {team[indValue].intitule} sans les Coûts indirects et autre(s)</Divider>
	  
	   <Divider horizontal>Comparaison de mes dépenses entre le coût des Matériaux en prévisionnels et en suivis</Divider>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name="Coût en €" dataKey="Coût" fill="#82ca9d" />
        </BarChart>
		 <Divider horizontal>Comparaison de mes dépenses entre le coût des équipes en prévisionnels et en suivis</Divider>
        <BarChart
          width={500}
          height={300}
          data={data2}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name="Coût en €" dataKey="Coût" fill="#82ca9d" />
        </BarChart>
		 <Divider horizontal>Comparaison de mes dépenses entre le coût des équipements en prévisionnels et en suivis</Divider>
        <BarChart
          width={500}
          height={300}
          data={data3}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name="Coût en €" dataKey="Coût" fill="#82ca9d" />
        </BarChart>
		<Divider horizontal>Mes dépenses en temps réel pour le chantier : {team[indValue].intitule}</Divider>

		        <LineChart
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          
		  <Line name="Coût en € cumulé " type="monotone" dataKey="Cumule" stroke="#82ca9d"  />
		  <Line name="Prix de vente du chantier € " type="monotone" dataKey="pdv" stroke="red"  />
		  
        </LineChart>
		 <Divider horizontal>Analyse sur mes dépenses</Divider>
		{cumuleData[cumuleData.length - 1] > totalData[0] ? 
		(
		<div>
		<p>Attention vous avez dépassé les dépenses prévues pour votre chantier ! </p>
		<p>Votre chantier côute actuellement {prixTotalCum} € alors que son prix de vente est de {pdvChantier} € </p>
		<p>Vous êtes en perte de {def} % </p>
		</div>
		):(
		<div>
		<p>Vous n'avez pas encore dépassé les dépenses prévues pour votre chantier !  </p>
		<p>Votre chantier côute actuellement {prixTotalCum} € et son prix de vente est de {pdvChantier} € </p>
		<p>Vous êtes en bénifice de {def} % </p>
		</div>
		
		)}
		<Button
			onClick={() => this.handleRetour()}
			positive>
			Retour
		</Button>
		
      </Container>
    )
		
		
		
	}
	render() {
		let team = this.state.team;
		console.log(team,"this team");
		if(this.state.currUser !== null){
    return (
	
		<Container style={{ margin: 20 }}>
		{this.state.GraphCheck === false ?
		(
        <Card.Group>
		{team.map((data,index) => (
							
							<Card>
								<Card.Content>
									<Card.Header>Chantier {index + 1} : {data.intitule} </Card.Header>
									<Card.Description>
										<p>Date de début de chantier : {data.dateDebut}</p>
										<p>Date de fin de chantier : {data.dateFin}</p>
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									
										<Button
											onClick={() => this.handleSuivi(index)}
											positive>
											Voir ma rentabilité
										</Button>
									
								</Card.Content>
							</Card>
							))}
										
								
							
							
							
							
							
							
		</Card.Group>
		): this.addGraph() }
		</Container>
						
		
    )
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
export default Dashboard;
