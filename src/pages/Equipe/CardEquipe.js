import React, {Component} from 'react';
import { Button, Card, Icon, Form,Input } from 'semantic-ui-react'
import firebase from "firebase/app";
import $ from "jquery";
import { db} from "../config"
import './ErrorEquip.css'
import Lock from "./lock.png";
class CardEquipe extends Component {
	
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
		this.handleClick3 = this.handleClick3.bind(this);
		this.changeHandler2 = this.changeHandler2.bind(this);
		this.editTeam = this.editTeam.bind(this);
		this.supprTeam = this.supprTeam.bind(this);
		this.addUser = this.addUser.bind(this);
		let EquipeList = [];
		let memberListNom = [];
		let memberListPrenom = [];
		let size = 1;
		let id = 0;
		let etat = false;
		let modState = false;
		let modIndex = 0;
		this.state = {
			teammate : 0,
			tarif : 0,
			currUser: null,
			etat,
			id,
			size,
			EquipeList,
			teamValue: false,
			modIndex,
			modState,
			memberListNom,
			memberListPrenom
		};
		
	}
	
	
	componentDidMount() {
	console.log("has mounted");
	
	var user = firebase.auth().currentUser;
	this.setState({currUser: user})
	if(user !== null){
		
		
		
		
	let modo = 0;
	for(modo = 0 ; modo < 10 ; modo++){
	var myname = user.displayName+"Equipe"+modo;
	let limit;
	let limitcheck = 1;
	let allNotes = [];
	db.ref(myname).once("value", snapshot => {
	limit = snapshot.numChildren();
		// limit = 5;
	if(snapshot.val() !== null){
		
    
    snapshot.forEach(snap => {
      allNotes.push(snap.val());
    });
		
	}}).then( ()=>{
	console.log("limite check "+limitcheck);
	console.log("limite "+ limit);

	if(limit > 0 ){
	let nameArray = [];
	let surnameArray = [];
	for(let p = 0 ; p < allNotes.length ; p++){
	console.log("Nombre de personne dans equipe : "+allNotes.length);
	
				
				
					nameArray.push(allNotes[p].name);
				
					surnameArray.push(allNotes[p].surname);
					
				
				
			
	}
	console.log(allNotes[0].name);
	console.log(allNotes,"contenu full equipe");
	var FullData = this.state.EquipeList;
	console.log(FullData);
	console.log("fin contenu full data");
	let salaireNow = allNotes[0].salaire;
	let nombre = allNotes[0].nombre;
	var data = [];
	for(let k = 0 ; k < nameArray.length ; k++){
		if(nameArray[k] !== undefined){
		data.push({
			name : nameArray[k],
			surname: surnameArray[k]
		
		});
		}
		
		
	}
	console.log("contenu de data");
	console.log(data);
	console.log("fin contenu de data");
	FullData.push({values : data,
						   salaire: salaireNow,
							nombre: nombre
							});

	this.setState({EquipeList:FullData});
	let tmpId = FullData.length;
	this.setState({id:tmpId});
	}
	
	})
  
	
	
	}
	}
	}	
		
		
	
	
	handleClick(){
			
			this.setState({teamValue:true});
			this.setState({teammate: 0});
			this.setState({tarif: 0});
		
	}
		changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		console.log(nam,"sadist nam");
		console.log(val,"sadist val");
		
		this.setState({[nam]: val});

	}
	
	changeHandler2(event,index,stats){
		
		if(stats === 1){
			let ouais = this.state.memberListPrenom;
			ouais[index] = event.target.value;
			
			this.setState({memberListPrenom: ouais});
		}else{
			let ouais1 = this.state.memberListNom;
			ouais1[index] = event.target.value;
			
			this.setState({memberListNom: ouais1});			
			
			
		}
		
		

	}
	editTeam(index){
		
		console.log(this.state.EquipeList[index]);
		this.setState({teamValue:true});
		this.setState({modState: true});
		this.setState({modIndex: index})
		console.log(index,"bug 2");
		let actuelInd = this.state.modIndex;
		let team = this.state.EquipeList[index];
		let teamMember = team.values;
		let prenom = [];
		let nom = [];

	for(let i = 0 ; i < teamMember.length ; i++){
		

		prenom.push(teamMember[i].name);
		nom.push(teamMember[i].surname);

		
		
	}
	this.setState({memberListNom: nom});
	this.setState({memberListPrenom: prenom})
	console.log(nom,"bug memberListNom");
		var user = firebase.auth().currentUser;
		let myname = user.displayName + "Equipe" +  index + "/Personne0/";
		
			let nombre = 0;
			let salaire = 0;
			db.ref(myname).child("nombre").once("value", snapshot => {

				nombre = snapshot.val();
			
			
			}).then(() => {
				
				this.setState({teammate: nombre});
				
			});
			db.ref(myname).child("salaire").once("value", snapshot => {

				salaire = snapshot.val();
				console.log(snapshot.val(),"mind");
			
			}).then(() => {
				
				this.setState({tarif: salaire});
				
			});		
			
			
			
			

		
	}
	handleClick2(){
		let currentSize;
		if(this.state.modState === false){
		currentSize = this.state.size;
		}else{
				let actuelInd = this.state.modIndex;
				let team = this.state.EquipeList[actuelInd];
				let teamMember = team.values;
				console.log(teamMember.length, "drunk");
				currentSize = teamMember.length * 2 + 1
			
		}
		
		
		let strSize1 = currentSize + 1;
		console.log(strSize1,"taille ATM");
		let tform = $("<Form.Field id = " + strSize1+ "></Form.Field>");
		
		
		let strSize2 = currentSize + 2;
		
		
		let tform2 = $("<Form.Field id = " + strSize2 + "></Form.Field>"); 
		
		currentSize = currentSize + 2;
		this.setState({size:currentSize});
		tform.append("<label>First name</label>");
		tform.append("<Input placeholder='First name'/>");
		tform2.append("<label>Last Name</label>");
		tform2.append("<Input placeholder='Last name'/>");
		$("#namefield").append(tform);
		$("#namefield").append(tform2);
		
		
		
	}
	
	supprTeam(index){
		
		
			let tempTeam = [];
		let yay = this.state.EquipeList[index];
		console.log(yay.values.length, "supr");
			var user = firebase.auth().currentUser;
		for( let i = 0 ; i < this.state.EquipeList.length ; i++ ) {
			
			let myname5 = user.displayName + "Equipe" +  i + "/";
			db.ref(myname5).remove();
			
			if( i !== index){
				
				tempTeam.push(this.state.EquipeList[i]);
				
			}
			
			
		}
		
		
			
			
		for(let i = 0 ; i < tempTeam.length ; i++){
			var myname = user.displayName+"Equipe"+i;
			let yay = tempTeam[i];
			if(yay.values.length <= 1 ){
					var account1 = "Personne"+0;
					var salaire = yay.salaire;
					var nombre = yay.nombre;
					db.ref(myname).child(account1).set({salaire,nombre})
					
			}
			else{
			for(let j = 0 ; j < yay.values.length ; j++){
					var account = "Personne"+j;
					var name = yay.values[j].name;
					var surname = yay.values[j].surname;
					var salaire = yay.salaire;
					var nombre = yay.nombre;
					if(this.state.size > 1 ){
					db.ref(myname).child(account).set({name,surname,salaire,nombre})
					}
				
			}
			
			}
			
		}
		this.setState({EquipeList:tempTeam});
		var tmpId = this.state.id - 1;
		this.setState({id:tmpId});
		
		
		
		
	}
	addUser(){
	
	
		
		



	
	let actuelInd = this.state.modIndex;
	let team = this.state.EquipeList[actuelInd];
	console.log(actuelInd,"bug actuel");
	console.log(team,"bug 3");
	let teamMember = team.values;
	let prenom = [];
	let nom = [];
	let strArray1 = [];
	let strArray2 = [];
	let currentSize = this.state.size;
	for(let i = 0 ; i < teamMember.length ; i++){
		
		let current1 = currentSize + 1;

		
		let current2 = currentSize + 2;

		console.log(current1,"findingz");
		strArray1.push(current1);
		strArray2.push(current2);
		prenom.push(teamMember[i].name);
		nom.push(teamMember[i].surname);
		currentSize = currentSize + 2;
		
		
	}

	
	return (
		<div>
		{teamMember.map((data,index) => (
			<div>
			<Form.Field id = {strArray1[index]}>
				<label>Prénom</label>
				<Input 
				name="memberListPrenom"
				value={this.state.memberListPrenom[index]}
				onChange={(e) => this.changeHandler2(e,index,1)}
				placeholder='Prénom'/>
			</Form.Field>


			
			<Form.Field id = {strArray2[index]}>
				<label>Nom</label>
				<Input 
				name="memberListNom"
				value={this.state.memberListNom[index]}
				onChange={(e) => this.changeHandler2(e,index,2)}
				placeholder='Nom'/>
			</Form.Field>
		</div>

		
		
		))}
		</div>
	
	)

		
		
		
	console.log(teamMember,"home with u ");
		
	}
	handleClick3(){
			
			var user = firebase.auth().currentUser;
			
			if(this.state.modState === false ) {
		
			var myname = user.displayName+"Equipe"+this.state.id;
		
		
		
			var nameArray = [];
			var surnameArray = [];
			var data = [];
			var tmpId = this.state.id;
		
			var FullData = this.state.EquipeList;
			console.log(this.state.size,"LA LONGUEUR");
			if(this.state.size > 1 ){
			for(let i = 2 ; i < this.state.size ; i+=2){
				
				
				console.log($("#"+i).find("Input").val());
				let a = i+1;
				nameArray.push($("#"+i).find("Input").val());
				surnameArray.push($("#"+a).find("Input").val());
				
				data.push( {
			name : $("#"+i).find("Input").val(),
			surname: $("#"+a).find("Input").val()
			
		 
		
			
		});
				
				
			}
			
			}
			let salaire = $("#salaire").find("Input").val();
			let nombre = $("#numberz").find("Input").val();
			var account1 = "Personne"+0;
					if(this.state.size <= 1 ){
					db.ref(myname).child(account1).set({salaire,nombre})
					}
			for(let j = 0 ; j < nameArray.length ; j++){
					var account = "Personne"+j;
					var name = nameArray[j];
					var surname = surnameArray[j];
					if(this.state.size > 1 ){
					db.ref(myname).child(account).set({name,surname,salaire,nombre})
					}
				
			}
			
			
			FullData.push({values : data,
						   salaire: $("#salaire").find("Input").val(),	
						   nombre: $("#numberz").find("Input").val()
							});
							
			if(this.state.modState === false){				
			tmpId = tmpId + 1;
			}				
			this.setState({EquipeList:FullData});
			this.setState({id:tmpId});
			this.setState({teamValue:false});
			this.setState({size:1});
			this.setState({etat:false});
			
		}else{
			
			let memberListNom = this.state.memberListNom;
			let memberListPrenom = this.state.memberListPrenom;
			var myname = user.displayName+"Equipe"+this.state.modIndex;
		
		
		
			var nameArray = [];
			var surnameArray = [];
			var data = [];
			var tmpId = this.state.id;
		
			var FullData = this.state.EquipeList;
			console.log(this.state.size,"LA LONGUEUR");
			if(this.state.size > 1 ){
			for(let i = 2 ; i < this.state.size ; i+=2){
				
				
				console.log($("#"+i).find("Input").val());
				let a = i+1;
				nameArray.push($("#"+i).find("Input").val());
				surnameArray.push($("#"+a).find("Input").val());
				
		
				
				
			}
			
			for(let j = 0 ; j < nameArray.length ; j++){
				if(nameArray[j] !== undefined){
					
					memberListPrenom.push(nameArray[j]);
					memberListNom.push(surnameArray[j]);
					
					
				}
				
			}
			}
			let salaire = $("#salaire").find("Input").val();
			let nombre = $("#numberz").find("Input").val();
			var account1 = "Personne"+0;
					if(this.state.size <= 1 ){
					db.ref(myname).child(account1).set({salaire,nombre})
					}
			for(let j = 0 ; j < memberListNom.length ; j++){
					var account = "Personne"+j;
					var name = memberListNom[j];
					console.log(name,"bug");
					var surname = memberListPrenom[j];
					if(this.state.size > 1 ){
					db.ref(myname).child(account).set({name,surname,salaire,nombre})
					}
				
			}
			
		let tempTeam = [];
		
		
		
			for(let j = 0 ; j < memberListNom.length ; j++){
			
						data.push( {
			name : memberListPrenom[j],
			surname: memberListNom[j]
			
		 
		
			
		});
				
			}
		for( let i = 0 ; i < this.state.EquipeList.length ; i++ ) {
			
			
			if( i !== this.state.modIndex){
				
				tempTeam.push(this.state.EquipeList[i]);
				
			}else{
				tempTeam.push({values : data,
						   salaire: $("#salaire").find("Input").val(),	
						   nombre: $("#numberz").find("Input").val()
							});
				
			}
			
			
		}			

			if(this.state.modState === false){				
			tmpId = tmpId + 1;
			}
			this.setState({EquipeList:tempTeam});
			this.setState({id:tmpId});
			this.setState({teamValue:false});
			this.setState({size:1});
			this.setState({etat:false});
			this.setState({modState: false});
			
			
			
			
		}
		
		
	}
	
render(){
if(this.state.currUser !== null ){
	
	
if(this.state.teamValue === false){	

if(this.state.EquipeList.length > 0){
	var user = firebase.auth().currentUser;
	let team = this.state.EquipeList;
	let currentIndex = 0;
	return (
	
  
  <Card.Group>
  
  
		{team.map((data,index) => (
			
				<Card>
					
					 <Card.Content>
					 
					 <Card.Header>Equipe n°{currentIndex = currentIndex+1}</Card.Header>
						<Card.Description>
							{data.values.map((item,index) => (
							
							
							<ul>
									<p>Membre {index+1} </p>
									<p>Prénom: {item.name}</p>
									<p>Nom : {item.surname}</p>
										
									
									
								
							</ul>
							))}
							
							
								<ul>
									
									<p>Tarif journalier : {data.salaire} €/jour</p>
									<p>Nombre de personne dans l'équipe : {data.nombre} </p>
										
									
									
								
								</ul>
							
						</Card.Description>
						
					</Card.Content>
					      <Card.Content extra>
        <div>
          <Button
			onClick={() => this.editTeam(index)}
			>

			MODIFIER	
         </Button>
		 
		           <Button
				   negative
			onClick={() => this.supprTeam(index)}
			>

			SUPPRIMER	
         </Button>
        </div>
      </Card.Content>
				</Card>			
					 
							
			))}
    <Card>
      <Card.Content>

        
        <Card.Description>
          Bonjour {user.displayName} voulez-vous ajouter une nouvelle équipe  <strong> ? </strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Button 
			animated
			positive
			onClick={this.handleClick}>
			<Button.Content visible>Oui</Button.Content>
			<Button.Content hidden>
				<Icon name='plus circle' />
			</Button.Content>
         </Button>
        </div>
      </Card.Content>
    </Card>
 
  </Card.Group>
);
	
	
	
	
}else{
	user = firebase.auth().currentUser;
return (

  
  <Card.Group>
    <Card>
      <Card.Content>

        
        <Card.Description>
			Bonjour {user.displayName} voulez-vous ajouter une nouvelle équipe  <strong> ? </strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Button 
			animated
			positive
			onClick={this.handleClick}>
			<Button.Content visible>Oui</Button.Content>
			<Button.Content hidden>
				<Icon name='plus circle' />
			</Button.Content>
         </Button>
        </div>
      </Card.Content>
    </Card>
 
  </Card.Group>
);
}
}
else{

	return (	 

		<Form>
			<Form.Field inline id="salaire">
				<label>Tarif journalier</label>
				<Input 
				value={this.state.tarif}
				onChange={this.changeHandler}
				name="tarif"
				placeholder='Salaire' />
			</Form.Field>
			<Form.Field inline id="numberz">
				<label>Nombre de personne dans l’équipe </label>
				<Input 
				name="teammate"
				value={this.state.teammate}
				onChange={this.changeHandler}
				placeholder='Nombre de personne' />
			</Form.Field>
			<div id="namefield">
			<Form.Field id = "0">

			</Form.Field>
			<Form.Field id = "1">

			</Form.Field>
			{this.state.modState === true && 
			
				this.addUser()
				
				
			}
			
			
			</div>
									
			<Button.Group vertical>
				<Button
				onClick={this.handleClick2}>
					cliquer sur ici pour spécifier un membre de l’équipe
				</Button>
				<Button.Or />
					<Button positive
							onClick={this.handleClick3}
					>Terminer</Button>
			</Button.Group>
			
			
			
			
		</Form>
			
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

export default CardEquipe;