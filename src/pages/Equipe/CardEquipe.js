import React, {Component} from 'react';
import { Button, Card, Image, Icon, Form,Input } from 'semantic-ui-react'
import ReactDOM from "react-dom";
import $ from "jquery";
class CardEquipe extends Component {
	
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
		this.handleClick3 = this.handleClick3.bind(this);
		let EquipeList = [];
		let size = 1;
		this.state = {
			size,
			EquipeList,
			teamValue: false
		
		};
		
	}
	
	handleClick(){
			
			this.setState({teamValue:true});
		
		
	}
	
	
	handleClick2(){
		let currentSize = this.state.size;
		
		
		let useradd =  "<Form.Group widths='equal'><Form.Input fluid label='First name' placeholder='First name'/><Form.Input fluid label='Last name' placeholder='Last name'/></Form.Group>";
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
			var data = [];
			var FullData = this.state.EquipeList;
			for(let i = 0 ; i < this.state.size ; i+=2){
				
				
				
				let a = i+1;
				data.push( {
			name : $("#"+i).find("Input").val(),
			surname: $("#"+a).find("Input").val()
		
		
			
		});
				
				
			}
			FullData.push({values : data,
						   salaire: $("#salaire").find("Input").val()	
							});
			this.setState({EquipeList:FullData});
			this.setState({teamValue:false});
			this.setState({size:1});
		
		
	}
	
render(){
if(this.state.teamValue === false){	
if(this.state.EquipeList.length > 0){
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
									
									<p>Prenom: {item.name}</p>
									<p>Nom : {item.surname}</p>
										
									
									
								
							</ul>
							))}
							
							
								<ul>
									
									<p>Salaire ( Pourcentage sur les couts du chantiers ) : {data.salaire} %</p>
									
										
									
									
								
								</ul>
							
						</Card.Description>
						
					</Card.Content>
				</Card>			
					 
							
			))}
    <Card>
      <Card.Content>

        
        <Card.Description>
          Voulez vous ajouter une nouvelle equipe  <strong> ? </strong>
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
return (

  
  <Card.Group>
    <Card>
      <Card.Content>

        
        <Card.Description>
          Voulez vous ajouter une nouvelle equipe  <strong> ? </strong>
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
				<label>Salaire ( Pourcentage sur les couts du chantiers )</label>
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
}
}

export default CardEquipe;