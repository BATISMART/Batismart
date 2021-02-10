import React, {Component} from 'react';

// import './Chantier.css';
import Sentry from './Sentry';
import Equip from './equip';
import Materiaux from './materiaux';
import MesChantier from './mesChantier';
import Indirect from './indirect';
import 'bootstrap/dist/css/bootstrap.min.css';

class Chantier extends Component {
	constructor(props){
		super(props);
		this.EditingMat = this.EditingMat.bind(this);
		this.ChooseChantier = this.ChooseChantier.bind(this);
		this.EditingEquip = this.EditingEquip.bind(this);
		this.CalculatePdv = this.CalculatePdv.bind(this);
		this.EditingId = this.EditingId.bind(this);
		this.AddItem = this.AddItem.bind(this);
		this.AllSet = this.AllSet.bind(this);
		this.AddMaterial = this.AddMaterial.bind(this);
		this.AddTeam = this.AddTeam.bind(this);
		this.NewTeam = this.NewTeam.bind(this);
		this.NewEquip = this.NewEquip.bind(this);
		this.NewMaterial = this.NewMaterial.bind(this);
		this.DidWePressNext = this.DidWePressNext.bind(this);
		this.indirectPress = this.indirectPress.bind(this);
		this.Next2 = this.Next2.bind(this);
		this.CheckId = this.CheckId.bind(this);
		this.CalculateTotal = this.CalculateTotal.bind(this);
		let itemList = [];
		let materialList = [];
		let teamList = [];
		let newValue = false;
		let matValue = false;
		let nextButton = false;
		let chantierName = "";
		let teamButton = false;
		let chantierval = false;
		let indirectButton = false;
		let mod = false;
		let mod2 = false;
		let currentId = 0;
		let total = 0;
		let pdv = 0;
		let idcheck = false;
		this.state = { itemList,
						newValue,
						materialList,
						nextButton,
						matValue,
						total,
						mod,
						currentId,
						mod2,
						teamList,
						chantierval,
						teamButton,
						chantierName,
						indirectButton,
						pdv,
						idcheck
						};

	}		
	AddItem(props){
		
		this.setState({itemList: props})		
		
		// console.log(this.state.itemList);
		
		
	}
	AddMaterial(props){
		
		this.setState({materialList: props})
		

	}
	CheckId(props){
		
		this.setState({idcheck: props});
		
	}
	AddTeam(props){
		
		this.setState({teamList:props})
		
	}
	NewTeam(props){
		this.setState({chantierval: props})
		
	}
	NewEquip(props){
		this.setState({newValue: props})
		
		// console.log(props);


	}
	NewMaterial(props){
		this.setState({matValue: props})
		
		
	}
	CalculateTotal(props){
		this.setState({total: props})
		
		
	}
	CalculatePdv(props){
		
		this.setState({pdv: props})
		
	}
	DidWePressNext(props){
		
		this.setState({nextButton: props})
		// console.log("next : "+props);
		
	}
	Next2(props){
		
		this.setState({teamButton: props})
		
		
	}
	indirectPress(props){
		
		this.setState({indirectButton: props});
		
	}
	EditingEquip(props){
		
		this.setState({mod:props})
		
		
	}
	ChooseChantier(props){
		
		this.setState({chantierName:props});
		
	}
	EditingMat(props){
		
		this.setState({mod2:props});
		
	}
	EditingId(props){
		this.setState({currentId:props})
		
	}
	AllSet(props){

		this.setState({newValue : props,
						matValue : props,
						nextButton : props,
						teamButton : props,
						chantierval : props,
						indirectButton : props,
						mod : props,
						mod2 : props,
						})
		
	}
	
	componentDidMount(){
		this.interval = setInterval(() => {
			this.setState({itemList: this.state.itemList,
							newValue:this.state.newValue,
							materialList:this.state.materialList,
							nextButton:this.state.nextButton,
							matValue:this.state.matValue,
							total:this.state.total,
							mod:this.state.mod,
							currentId:this.state.currentId,
							mod2:this.state.mod2,
							teamList:this.state.teamList,
							chantierval:this.state.chantierval,
							teamButton:this.state.teamButton,
							chantierName:this.state.chantierName,
							indirectButton:this.state.indirectButton,
							pdv : this.state.pdv,
							idcheck: this.state.idcheck
						
							
						})
		}, 1000)
	
		
		
	}
	
	componentWillUnmount() {
			clearInterval(this.interval);
	}
	
	render() {
		// console.log("test");
		
		return (
			<div className="Chantier">
				<MesChantier pdv={this.state.pdv} teamButton={this.state.teamButton} NewTeam={this.NewTeam} AddTeam={this.AddTeam} a={this.state.teamList} chantierval={this.state.chantierval}  total={this.state.total} chantierName={this.state.chantierName} />
				<Equip idcheck={this.state.idcheck} CheckId={this.CheckId} chantierName={this.state.chantierName} EditingId={this.EditingId} EditingEquip={this.EditingEquip} CalculateTotal={this.CalculateTotal} AddItem={this.AddItem} NewEquip={this.NewEquip} a={this.state.itemList} bool={this.state.newValue} total={this.state.total}  mod={this.state.mod} currentId={this.state.currentId}/>
				<Materiaux idcheck={this.state.idcheck} CheckId={this.CheckId} chantierName={this.state.chantierName} EditingId={this.EditingId} EditingMat={this.EditingMat} CalculateTotal={this.CalculateTotal} AddMaterial={this.AddMaterial} NewMaterial={this.NewMaterial} matlist={this.state.materialList} bool={this.state.matValue} next={this.state.nextButton} total={this.state.total} mod2={this.state.mod2}  currentId={this.state.currentId}/>
                <Indirect AllSet={this.AllSet} indirectButton={this.state.indirectButton} CalculatePdv={this.CalculatePdv} CalculateTotal={this.CalculateTotal} total={this.state.total}/>
				<Sentry  CheckId={this.CheckId} indirectPress={this.indirectPress} indirectButton={this.state.indirectButton} ChooseChantier={this.ChooseChantier} teamButton={this.state.teamButton} Next2={this.Next2} NewTeam={this.NewTeam} teamList={this.state.teamList} chantierval={this.state.chantierval} CalculateTotal={this.CalculateTotal} EditingId={this.EditingId} EditingMat={this.EditingMat} EditingEquip={this.EditingEquip} DidWePressNext={this.DidWePressNext} total={this.state.total} NewEquip={this.NewEquip} NewMaterial={this.NewMaterial} matList={this.state.materialList} somProp={this.state.itemList} bool={this.state.newValue} bool2={this.state.matValue} nextButton={this.state.nextButton}/>
				
				
					
				
			</div>
		);
		
	}
}
export default Chantier;
