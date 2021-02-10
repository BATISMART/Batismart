import React from 'react';
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/Card';
import './button.css';
import {Button} from './ButtonElement'
import * as BsIcons from 'react-icons/bs'

class Sentry extends React.Component {
	
	EditingEquip = (props) => {
		
		this.props.EditingEquip(props);
		
	}
	EditingMat = (props) => {
		
		this.props.EditingMat(props);
		
	}
	EditingId = (props) => {
		
		this.props.EditingId(props);
		
	}
	NewEquip = (props) => {
		
			this.props.NewEquip(props);
		
	}
	NewTeam = (props) => {
		
			this.props.NewTeam(props);
		
	}
	DidWePressNext = (props) => {
			
			this.props.DidWePressNext(props);
	
	}
	Next2 = (props) => {
			
			this.props.Next2(props);
	
	}
	NewMaterial = (props) => {
		
			this.props.NewMaterial(props);
		
	}
	
	indirectPress = ( props) => {
		
		this.props.indirectPress(props);
		
	}
	CheckId = ( props) => {
		
		this.props.CheckId(props);
		
	}
	CalculateTotal = (props) => {
		this.props.CalculateTotal(props);
		
	}
	ChooseChantier = (props) => {
		this.props.ChooseChantier(props);
		
	}
	
	constructor(props){
		super(props);
		this.equipModif = this.equipModif.bind(this);
		this.materModif = this.materModif.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.nextClick = this.nextClick.bind(this);
		this.handleClick6 = this.handleClick6.bind(this);
		this.handleClick2 = this.handleClick2.bind(this);
		this.handleClick4 = this.handleClick4.bind(this);
		this.handleClick3 = this.handleClick3.bind(this);
		this.handleClick5 = this.handleClick5.bind(this);
		this.handleIndirect = this.handleIndirect.bind(this);
		this.state = {
			totval: false
		};
		
	}
	handleClick4(){
		this.setState({totval: true})
		
		
	}
	handleClick5(){
		this.NewTeam(true);
		
	}
	handleClick3(){
		this.setState({totval: false})
		this.DidWePressNext(false);	
		this.NewMaterial(false);
		this.NewEquip(false);
		
	}


		
	materModif(modif,price,day){
		let tempo = this.props.total;
		console.log("total before mod : " + tempo);
		tempo -= price * day;
		console.log("total after mod : " + tempo);
		this.CalculateTotal(tempo);
		this.CheckId(true);
		this.EditingMat(true);
		this.EditingId(modif);
		this.setState({totval: false})
		this.NewMaterial(true);
		
		
	}
	equipModif(modif,price,day){
			console.log(modif);
			let tempo = this.props.total;
			tempo -= price * day;
			this.CalculateTotal(tempo);
			this.EditingId(modif);
			
			this.CheckId(true);
			this.EditingEquip(true);
			
			
			this.setState({totval: false})
			this.NewEquip(true);
		
		
	}
	handleClick2(){
		this.setState({totval: false})
		this.NewMaterial(true);
		
	}
	handleClick(){
		this.setState({totval: false})
		this.NewEquip(true);
	}
	nextClick() {
		this.setState({totval: false})
		if( this.props.somProp.length > 0){
		this.DidWePressNext(true);
		}else{
		this.DidWePressNext(false);	
			
		}
	}
	handleClick6(currentName){
		alert("nexto");
		this.Next2(true);
		this.ChooseChantier(currentName);
		
	}
	handleIndirect(){
		
		this.indirectPress(true);
		
	}
	render() {
		// console.log("test de fou" +this.props.somProp);
		let a = this.props.somProp;
		let team = this.props.teamList;
		
		
		// console.log("hein " + this.props.nextButton);
		if(this.props.teamButton === false){
			
		if ( this.props.chantierval === false && team.length > 0 ){
				// console.log("currentNB : "+this.props.nextButton+" currentTB : "+this.props.teamButton);

				
				
				
				return (
			<div>
			<CardGroup style={{flexDirection: 'row', justifyContent: 'center' , padding: '40px', width: "72rem", left: '105px'}}>
			{team.map((data) => (
				<Card style={{width: '18em' , marginLeft: '10px'}} >
					 <Card.Header>Chantier {data.id + 1}</Card.Header>
					 <Card.Body>
						<Card.Text>
							<ul>
								 <li key = {data.id}>
									<p>Intitule : {data.intitule}</p>
									<p>Prix : {data.total}</p>
									<p>Prix de vente : {data.pdv} </p>
									<Button variant="primary"  onClick={() => this.handleClick6(data.intitule)}>Choisir</Button>
								</li>
							</ul>
						</Card.Text>
						
					</Card.Body>
				</Card>			
					 
							
			))}
			<Card style={{width: '18em' , marginLeft: '10px'}} >				
				<Card.Body class="text-center" style={{marginTop: '50px'}}>
				<Card.Title>Ajouter un Chantier </Card.Title>
				<Card.Text>
								
				</Card.Text>
					<BsIcons.BsPlusCircleFill size={40} onClick={this.handleClick5}/>
				</Card.Body>
			</Card>
			</CardGroup>
			
			 </div>
				
		)
	
		}else if ( this.props.chantierval === false ){
			// console.log("currentNB : "+this.props.nextButton+" currentTB : "+this.props.teamButton);
			return (
				<div>
				<CardGroup style={{flexDirection: 'row', justifyContent: 'center' , padding: '40px', width: "72rem", left: '105px'}}>
				<Card style={{ width: '18rem', padding: '40px'}}>				
				<Card.Body class="text-center" style={{marginTop: '0px'}}>
					<Card.Title>Ajouter un Chantier </Card.Title>
					<Card.Text>
								
					</Card.Text>
					<BsIcons.BsPlusCircleFill size={40} onClick={this.handleClick5}/>
				</Card.Body>
			</Card>
			
			</CardGroup>
			 <Button variant="success" onClick={this.handleClick6}>Next</Button>
			 </div>

				)
			
			
			
			
		}else if ( this.props.chantierval === true ){
			// console.log("currentNB : "+this.props.nextButton+" currentTB : "+this.props.teamButton);
			
			return (
			<div></div>
			
			
			)
			
			
		}
		
		
				
		
		}else{
		
		
		if(this.props.nextButton === false){
		
		
		if( a.length > 0 &&  this.props.bool === false  ){
	
		return (
			<div>
			<CardGroup style={{flexDirection: 'row', justifyContent: 'center' , padding: '40px', width: "72rem", left: '105px'}}>
			{a.map((data) => (
				<Card style={{width: '18em' , marginLeft: '10px'}} >
					 <Card.Header>Equipement {data.idnumber + 1}</Card.Header>
					 <Card.Body>
						<Card.Text>
							<ul>
								 <li key = {data.idnumber}>
									<p>Intitule : {data.intitule}</p>
									<p>key = {data.idnumber}</p>
									<p>Fournisseur : {data.fournisseur}</p>
									<p>Prix par jour : {data.prix_par_jour}</p>
									<p>Prix total : {data.jour *  data.prix_par_jour}</p>
									<Button variant="primary"  onClick={() => this.equipModif(data.idnumber,data.prix_par_jour,data.jour)}>Modifier</Button>
								</li>
							</ul>
						</Card.Text>
						
					</Card.Body>
				</Card>			
					 
							
			))}
			<Card style={{width: '18em' , marginLeft: '10px'}} >				
				<Card.Body class="text-center" style={{marginTop: '50px'}}>
				<Card.Title>Ajouter un Equipement </Card.Title>
				<Card.Text>
								
				</Card.Text>
					<BsIcons.BsPlusCircleFill size={40} onClick={this.handleClick}/>
				</Card.Body>
			</Card>
			</CardGroup>
			 <Button variant="success" onClick={this.nextClick}>Next</Button>
			 </div>
				
		)
	
		}else if ( this.props.bool === false ){
			
			return (
				<div>
				<CardGroup style={{flexDirection: 'row', justifyContent: 'center' , padding: '40px', width: "72rem", left: '105px'}}>
				<Card style={{ width: '18rem', padding: '40px'}}>				
				<Card.Body class="text-center" style={{marginTop: '0px'}}>
					<Card.Title>Ajouter un Equipement </Card.Title>
					<Card.Text>
								
					</Card.Text>
					<BsIcons.BsPlusCircleFill size={40} onClick={this.handleClick}/>
				</Card.Body>
			</Card>
			
			</CardGroup>
			 <Button variant="success" onClick={this.nextClick}>Next</Button>
			 </div>

				)
			
			
			
			
		}else if ( this.props.bool === true ){
			
			return <div>  </div>
			
		}
		
		}else if (this.props.nextButton === true && this.props.indirectButton === false) {
			
			
			let a = this.props.matList;
			
			const isTotVal = this.state.totval;
			if( this.props.matList.length > 0 &&  this.props.bool2 === false  ){
	
		return (
			<div>
			<CardGroup style={{flexDirection: 'row', justifyContent: 'center' , padding: '40px', width: "72rem", left: '105px'}}>
			{a.map((data) => (
				<Card style={{width: '18em' , marginLeft: '10px'}} >
					 <Card.Header>Materiel {data.id + 1}</Card.Header>
					 <Card.Body>
						<Card.Text>
							<ul>
								 <li key = {data.idnumber}>
									<p>Intitule : {data.intitule}</p>
									<p>Fournisseur : {data.fournisseur}</p>
									<p>Prix par unite : {data.montant_unite}</p>
									<p>Prix total : {data.quantite *  data.montant_unite}</p>
									<Button variant="primary" type="button" onClick={() => this.materModif(data.idnumber,data.montant_unite,data.quantite)}>Modifier</Button>
								</li>
							</ul>
						</Card.Text>
						
					</Card.Body>
				</Card>			
					 
							
			))}
			<Card style={{width: '18em' , marginLeft: '10px'}}>				
				<Card.Body class="text-center" style={{marginTop: '50px'}}>
					<Card.Title>Ajouter un materiel</Card.Title>
					<Card.Text>
								
					</Card.Text>
					<BsIcons.BsPlusCircleFill size={40} onClick={this.handleClick2}/>
				</Card.Body>
			</Card>
			
			{isTotVal ? (
				<Card style={{width: '18em' , marginLeft: '10px'}}>
				
				<Card.Body>
					<Card.Title>Coût direct du chantier</Card.Title>
					<Card.Text>
							{this.props.total} €
					</Card.Text>
					
				</Card.Body>
				</Card>	
				
			) : ( <div></div> )}
				
				
				
			
			
				
				
			
			
			
			</CardGroup>

				<Button variant="danger" onClick={this.handleClick3}>Previous</Button>
				<p></p>
				<Button variant="success" onClick={this.handleClick4} >Total</Button>
				<p></p>
				<Button variant="success"  onClick={this.handleIndirect} >Next</Button>
			

			 </div>
				
		)
	
		}else if ( this.props.bool2 === false ){
			
			return (
				<div>
				<CardGroup style={{flexDirection: 'row', justifyContent: 'center' , padding: '40px', width: "72rem", left: '105px'}}>
				<Card style={{ width: '18rem', padding: '40px' }}>				
				<Card.Body class="text-center" style={{marginTop: '0px'}}>
					<Card.Title>Ajouter un Materiel</Card.Title>
					<Card.Text>
								
					</Card.Text>
					<BsIcons.BsPlusCircleFill size={40} onClick={this.handleClick2}/>
				</Card.Body>
			</Card>
			
			
			</CardGroup>

				<Button variant="danger" onClick={this.handleClick3} >Previous</Button>
				<p></p>
				<Button variant="success" onClick={this.handleClick4} >Total</Button>
				<p></p>
				<Button variant="success"  onClick={this.handleIndirect} >Next</Button>
			

			 </div>

				)
			
			
			
			
		}else if ( this.props.bool2 === true ){
			
			return <div>  </div>
			
		}
			
			
			
		
		}else if (this.props.nextButton === true && this.props.indirectButton === true) {
			
			
			
			return <div></div>
			
			
			
			
		}
		
		
	}
		
		
	}
	
	
}

export default Sentry;