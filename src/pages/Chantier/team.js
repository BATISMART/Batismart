import React, {Component} from 'react';
import { Button, Card, Icon, Form,Segment, Divider, Grid, Input } from 'semantic-ui-react'
import firebase from "firebase/app";
import $ from "jquery";
import { db} from "../config"


class Team extends React.Component {
	
	
	
	DisplayTeam = (props) => {
		
			this.props.DisplayTeam(props);
		
	}
	SelectedAndDays = (props1,props2) => {
		
			this.props.SelectedAndDays(props1,props2);
		
	}		
	MountingTeam = (props) => {
		
			this.props.MountingTeam(props);
		
	}
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleDeselected = this.handleDeselected.bind(this);
		this.resetValues = this.resetValues.bind(this);
		this.handleDays = this.handleDays.bind(this);
		this.handleChange = this.handleChange.bind(this);
		let EquipeList = [];
		let SelectList = [];
		let SelectIndex = [];
		let TabDays = [0];
		let ValueIndex = [];
		let CurrentDay = 0;
		this.state = {
			ValueIndex,
			TabDays,
			CurrentDay,
			SelectIndex,
			EquipeList,
			SelectList
		};
		
	}
	
		handleSelect(id){
			
			if(this.props.teamMounted === false){
			let currentDays = this.props.days;
			console.log("current days 1 : " + currentDays);
			
			this.setState({ CurrentDay: currentDays }, () => {
  console.log(this.state.CurrentDay, 'current days');
});
			}
			
			
			this.MountingTeam(true);
			let desact = "#ButtonTeam"+id;
			$(desact).prop("disabled",true);
			console.log(" id is : "+id);
			let selectList = this.state.SelectList;
			if(selectList.length === 0){
				
							let currentDays = this.props.days;
			console.log("current days 1 : " + currentDays);
			
			this.setState({ CurrentDay: currentDays }, () => {
  console.log(this.state.CurrentDay, 'current days');
});
				
				
				
			}
			let selectIndex = this.state.SelectIndex;
			selectIndex.push(id);
			selectList.push(this.state.EquipeList[id])
			console.log(selectList);
			this.setState({SelectList:selectList});
			this.setState({SelectIndex:selectIndex});
			let valueIndex = this.state.ValueIndex;
			valueIndex.push(0);
			this.setState({ValueIndex:valueIndex});
			console.log(this.state.TabDays, "selected tab days after");

		}
		
		resetValues(){
				let tabDays = this.state.TabDays;
				this.setState({ValueIndex:tabDays})
				
				
				
				
		
		}
		handleChange(event, index) {    
		
		console.log("on change "+index+"   "+event.target.value);
		let ouais = this.state.ValueIndex;
		ouais[index] = event.target.value;
		this.setState({ValueIndex: ouais});

		}
			
			
			
		
		handleDeselected(index, id){
			console.log("deselected : "+this.state.CurrentDay);
			let val = "#daysattribute"+id;
			let tmp = $(val).val();
			let valueIndex = this.state.ValueIndex;
			let selectList = this.state.SelectList;
			let selectIndex = this.state.SelectIndex;
			let tabDays = this.state.TabDays;
			selectList.splice(index,1);
			selectIndex.splice(index,1);
			valueIndex.splice(index,1);
			tabDays.splice(index, 1);
			console.log(tabDays, "majutab");
			if(selectList.length > 0){
				
				let currday = parseInt(this.state.CurrentDay) + parseInt(tmp);
			
				this.setState({CurrentDay:currday});
				
			}
			let desact = "#ButtonTeam"+id; 
			$(desact).prop("disabled",false);
			this.setState({ValueIndex:valueIndex});
			this.setState({TabDays:tabDays});
			console.log(tabDays,"selected tab days before");
			this.setState({SelectList:selectList});
			this.setState({SelectIndex:selectIndex});
			this.resetValues();
			
			
			
		}
		handleDays(index,ind){
			let id = "#daysattribute"+index;
			console.log("majudays : "+index);
			let checkid = "#Check"+index;
			let tabDays = this.state.TabDays;
			console.log(tabDays, "selected tab days");
			let j = 0;
			
			if(tabDays[ind] === undefined){
				for(j = 0 ; j <= ind ; j++){
				if(tabDays[j] === undefined){
				tabDays.push(0);
				}
				}
				
			}
		   let currentDays = this.state.CurrentDay + tabDays[ind] - $(id).val();
		   console.log("current days de fou "+currentDays);
		   console.log("all dayz : "+this.state.CurrentDay+" "+ tabDays[ind]+" "+$(id).val());
		   if(currentDays < 0 ){
			   $(id).val(0);
			   currentDays = this.state.CurrentDay + tabDays[ind] - $(id).val();
			   
		   }
		   console.log("check all up : "+this.state.CurrentDay+" "+tabDays[ind]+" "+$(id).val());
		   console.log("check days : "+currentDays);
						this.setState({ CurrentDay: currentDays }, () => {
  console.log(this.state.CurrentDay, 'current days');
});
			if(tabDays[ind] !== undefined){
			tabDays[ind] = parseInt($(id).val());
			
			
			}else{
				
				tabDays.push(parseInt($(id).val()));
			}
			this.setState({ TabDays: tabDays }, () => {
  console.log(this.state.TabDays, 'tab days');
});
			console.log(this.state.SelectList, 'select list');
			
		}
		componentDidMount() {
			
			
			
			
	console.log("has mounted");

	var user = firebase.auth().currentUser;

		
		
		
		
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


	if(limit > 0 ){
	let nameArray = [];
	let surnameArray = [];
	for(let p = 0 ; p < allNotes.length ; p++){
	console.log("Nombre de personne dans equipe : "+allNotes.length);
	
				
				
					nameArray.push(allNotes[p].name);
				
					surnameArray.push(allNotes[p].surname);
					
				
				
			
	}

	var FullData = this.state.EquipeList;
	
	
	var data = [];
	let salaireNow = allNotes[0].salaire;
	for(let k = 0 ; k < nameArray.length ; k++){
		
		data.push({
			name : nameArray[k],
			surname: surnameArray[k]
		
		});
		
	}

	FullData.push({values : data,
						   salaire: salaireNow,
							});
	
	

			
	
	
	
	
	
	this.setState({EquipeList:FullData});
	}
	
	})
  
	
	
	}
	
			
	
	
	
	}
	handleClick(){
		let selectIndex = this.state.SelectIndex;
		let selectList = this.state.SelectList;
		let checkEmpty = true;
		
		for(let i = 0 ; i <= selectList.length ; i++){
			
			let id = "#daysattribute"+selectIndex[i];
			if($(id).val() === "0"){
				
				checkEmpty = false;
				
			}
			
			
		}
		if(this.state.CurrentDay === 0 && checkEmpty === true){
			
			
		this.SelectedAndDays(this.state.SelectList,this.state.ValueIndex);
		let selectList = [];
		let selectIndex = [];
		let tabDays = [0];
		let valueIndex = [];
		this.setState({SelectList:selectList});
		this.setState({SelectIndex:selectIndex});
		this.setState({TabDays:tabDays});
		this.setState({ValueIndex:valueIndex});
		this.DisplayTeam(false);
		$("#mainfield").show();
		}
		
	}
	render(){
	let team = this.state.EquipeList;
	let selected = this.state.SelectList;
	let selectIndex = this.state.SelectIndex;

	console.log("selected");
	console.log(selected);
	let currentIndex = 0;
	
	 if(this.props.DisplayButton === true ){
	return (
	
		<Segment>
		
		<Grid columns={2} relaxed='very' stackable>
		<Grid.Column>
		  <Card.Group>
  
  
		{team.map((data, index) => (
			
				<Card>
					
					 <Card.Content>
					 
					 <Card.Header>Equipe n°{currentIndex = currentIndex+1}</Card.Header>
						<Card.Description>
							{data.values.map((item) => (
							
							<ul>
									
									<p>Prenom: {item.name}</p>
									<p>Nom : {item.surname}</p>
										
									
									
								
							</ul>
							))}
							
							
								<ul>
									
									<p>Prix Journalier : {data.salaire} €/Jour</p>
									
										
									
									
								
								</ul>
							
						</Card.Description>
						
					</Card.Content>

      <Card.Content extra>
          <Button
		  id={"ButtonTeam"+index}
		  onClick={() => this.handleSelect(index)}
		  basic color='green'>
            Selectionner
          </Button>
      </Card.Content>					
				</Card>			
					 
							
			))}
			
		</Card.Group>
		</Grid.Column>
		<Grid.Column verticalAlign='top'>
				{selected.length > 0 ?
				(	
					<div>Nombre de jours restant à attribuer {this.state.CurrentDay}</div>
					)
				:(
				<div>Nombre de jours restant à attribuer {this.props.days}</div>
				)}
				  <Card.Group>
  
  
		{selected.map((data, index) => (
			
				<Card>
					
					 <Card.Content>
					 <Card.Header>Equipe n°{selectIndex[index]+1}</Card.Header>
						<Card.Description>
							{data.values.map((item) => (
							
							<ul>
									
									<p>Prenom: {item.name}</p>
									<p>Nom : {item.surname}</p>
										
									
									
								
							</ul>
							))}
							
							
								<ul>
									
									<p>Prix Journalier : {data.salaire} €/Jour</p>
									
										
									
									
								
								</ul>
							
						</Card.Description>
						
					</Card.Content>
      <Card.Content extra>
		  <label>Nombre de jours attribués </label>
					<br/>
					<Input value={this.state.ValueIndex[index]}  onChange={(e) => this.handleChange(e,index)} id={"daysattribute"+selectIndex[index]} placeholder='Jours Attribués'/>
					<Button
						onClick={() => this.handleDays(selectIndex[index],index)}
						id={"Check"+selectIndex[index]}
						icon>
						<Icon name='check' />
					</Button>
          <Button
		  id={"ButtonSelect"+selectIndex[index]}
		  onClick={() => this.handleDeselected(index, selectIndex[index])}
		  basic color='red'>
            Deselectionner
          </Button>
      </Card.Content>						
				</Card>			
					 
							
			))}
			
		</Card.Group>
		
		
		
		
			
		</Grid.Column>
		</Grid>
		<Button
			onClick={this.handleClick}>
							DONE
						</Button>
		<Divider vertical>Selected</Divider>
	

	</Segment>
	
	
	
	
	
	);
		
	 }
		else{
			
			return <div></div>
			
		}
		
		
		
		
		
		
	}
	
	
	
	
	
	
	
}
export default Team;