import React from 'react';

import './design.css'
import {Button} from './ButtonElement'

class Indirect extends React.Component {


	CalculateTotal = (props) => {
		this.props.CalculateTotal(props);
		
	}
	CalculatePdv = (props) => {
		
		this.props.CalculatePdv(props);
		
	}
	AllSet = (props) => {
		
		this.props.AllSet(props);
		
	}
		constructor(props){
		super(props);
		this.state = {
			indirect : 0,
			alea : 0,
			marge : 0
		};
		
	}
		
	
	

	submitHandler = (event) => {
		event.preventDefault();
		var ct;
		var pdv;
		var tmpIndirect = ( this.state.indirect * this.props.total ) / 100 ;
		
		ct = this.props.total + tmpIndirect;
		pdv = ct + (( this.state.alea * ct )/100);
		pdv = pdv + ((this.state.marge * pdv) /100);
		this.CalculateTotal(ct);
		this.CalculatePdv(pdv);
		this.AllSet(false);


		
	}
	
		changeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;

		
		this.setState({[nam]: val});

	}
	
	
		render() {
		if(this.props.indirectButton === true){	
		return (
		<div>
		<form onSubmit = {this.submitHandler}>
        <p>
            <input type="text"
                className='text-input1' 
                name='indirect' 
                placeholder = 'Coefficient Indirect' 
                onChange={this.changeHandler}/> <br /> <br /> 
			<input type="text"
                className='text-input1' 
                name='alea' 
                placeholder = 'Aléas' 
                onChange={this.changeHandler}/> <br /> <br />
			<input type="text"
                className='text-input1' 
                name='marge' 
                placeholder = 'marge' 
                onChange={this.changeHandler}/> <br /> <br /> 

        </p>
        <Button variant="primary" onClick={this.submitHandler}>Valider</Button>
        </form>
		</div>
		);
		
		}else{
			
			return <div></div>
			
		}
		
	}
	
	
	
	
}
export default Indirect;