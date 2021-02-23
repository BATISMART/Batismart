import React, {Component} from 'react';
import { Button, Card, Icon, Form,Input } from 'semantic-ui-react'
import firebase from "firebase/app";
import $ from "jquery";
import { db} from "../config"
class CardEquipe extends Component {
	
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
		this.handleClick3 = this.handleClick3.bind(this);
		let EquipeList = [];
		let size = 1;
		let id = 0;
		let etat = false;
		this.state = {
			currUser: null,
			etat,
			id,
			size,
			EquipeList,
			teamValue: false
		
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
	var data = [];
	for(let k = 0 ; k < nameArray.length ; k++){
		
		data.push({
			name : nameArray[k],
			surname: surnameArray[k]
		
		});
		
		
	}
	console.log("contenu de data");
	console.log(data);
	console.log("fin contenu de data");
	FullData.push({values : data,
						   salaire: salaireNow	
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
		
		
	}
	
	
	handleClick2(){
		let currentSize = this.state.size;
		
		
	
		let strSize1 = currentSize + 1;
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
	
	
	handleClick3(){
			
			var user = firebase.auth().currentUser;
		
			var myname = user.displayName+"Equipe"+this.state.id;
		
		
		
			var nameArray = [];
			var surnameArray = [];
			var data = [];
			var tmpId = this.state.id;
		
			var FullData = this.state.EquipeList;
			for(let i = 0 ; i < this.state.size ; i+=2){
				
				
				
				let a = i+1;
				nameArray.push($("#"+i).find("Input").val());
				surnameArray.push($("#"+a).find("Input").val());
				
				data.push( {
			name : $("#"+i).find("Input").val(),
			surname: $("#"+a).find("Input").val()
			
		 
		
			
		});
				
				
			}
			var name ;
			var surname ;
			let salaire = $("#salaire").find("Input").val();
			for(let j = 0 ; j < nameArray.length ; j++){
					var account = "Personne"+j; 
					name = nameArray[j];
					surname = surnameArray[j];
					db.ref(myname).child(account).set({name,surname,salaire})
				
			}
			
			
			FullData.push({values : data,
						   salaire: $("#salaire").find("Input").val()	
							});
							
			tmpId = tmpId + 1;				
			this.setState({EquipeList:FullData});
			this.setState({id:tmpId});
			this.setState({teamValue:false});
			this.setState({size:1});
			this.setState({etat:false});
		
		
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
  
  
		{team.map((data) => (
			
				<Card>
					
					 <Card.Content>
					 
					 <Card.Header>Equipe n°{currentIndex = currentIndex+1}</Card.Header>
						<Card.Description>
							{data.values.map((item) => (
							
							<ul>
									
									<p>Prénom: {item.name}</p>
									<p>Nom : {item.surname}</p>
										
									
									
								
							</ul>
							))}
							
							
								<ul>
									
									<p>Prix journalier : {data.salaire} €/jour</p>
									
										
									
									
								
								</ul>
							
						</Card.Description>
						
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
				<label>Prix journalier</label>
				<Input placeholder='Salaire' />
			</Form.Field>
			<div id="namefield">
			<Form.Field id = "0">
				<label>First name</label>
				<Input placeholder='First name'/>
			</Form.Field>
			<Form.Field id = "1">
				<label>Last Name</label>
				<Input placeholder='Last name'/>
			</Form.Field>
			</div>
			<Button.Group>
				<Button
				onClick={this.handleClick2}>
					Ajouter
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
			<div>Erreur utilisateur vous n'êtes pas connecté  : Connectez-vous ou Cliquer sur Accueil ensuite sur mes Equipes dans la sidebar de gauche si vous êtes déjà connecté </div>
			
			);
	
	
}
}
}

export default CardEquipe;