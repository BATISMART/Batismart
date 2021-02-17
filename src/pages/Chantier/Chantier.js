import React, {Component} from 'react';

// import './Chantier.css';
import Sentry from './Sentry';
import Equip from './equip';
import Materiaux from './materiaux';
import MesChantier from './mesChantier';
import Indirect from './indirect';
import Team from './team';
import 'bootstrap/dist/css/bootstrap.min.css';
import Display from './displayChantier';
import { Container} from "semantic-ui-react";
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
		this.DisplayTeam = this.DisplayTeam.bind(this);
		this.indirectPress = this.indirectPress.bind(this);
		this.Next2 = this.Next2.bind(this);
		this.CheckId = this.CheckId.bind(this);
		this.CalculateTotal = this.CalculateTotal.bind(this);
		this.SetDays = this.SetDays.bind(this);
		this.MountingTeam = this.MountingTeam.bind(this);
		this.SelectedAndDays = this.SelectedAndDays.bind(this);
		let itemList = [];
		let materialList = [];
		let SelectedList = [];
		let DaysList = [];
		let teamList = [];
		let newValue = false;
		let DisplayButton = false;
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
		let days = 0;
		let idcheck = false;
		let teamMounted = false;
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
						idcheck,
						DisplayButton,
						days,
						teamMounted,
						SelectedList,
						DaysList
						};

	}
	
	SelectedAndDays(props1,props2){
		this.setState({SelectedList: props1});
		this.setState({DaysList: props2});
		
		
	}
	MountingTeam(props){
		
		this.setState({teamMounted: props});
		
	}
	DisplayTeam(props){
		
		this.setState({DisplayButton: props});
		
	}
	
	SetDays(props){
		
		this.setState({days: props});		
		
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
							idcheck: this.state.idcheck,
							DisplayButton: this.state.DisplayButton,
							days: this.state.days,
							teamMounted: this.state.teamMounted,
							SelectedList: this.state.SelectedList,
							DaysList: this.state.DaysList
						
							
						})
		}, 1000)
	
		
		
	}
	
	componentWillUnmount() {
			clearInterval(this.interval);
	}
	
	render() {
		// console.log("test");
		console.log(this.state.SelectedList, "master the blaster");

		return (
			<Container style={{ margin: 20 }}>
				<Team SelectedAndDays={this.SelectedAndDays} MountingTeam={this.MountingTeam} teamMounted={this.state.teamMounted} days={this.state.days} DisplayTeam={this.DisplayTeam} DisplayButton={this.state.DisplayButton} />
				<Materiaux idcheck={this.state.idcheck} CheckId={this.CheckId} chantierName={this.state.chantierName} EditingId={this.EditingId} EditingMat={this.EditingMat} CalculateTotal={this.CalculateTotal} AddMaterial={this.AddMaterial} NewMaterial={this.NewMaterial} matlist={this.state.materialList} bool={this.state.matValue} next={this.state.nextButton} total={this.state.total} mod2={this.state.mod2}  currentId={this.state.currentId}/>
				<Equip idcheck={this.state.idcheck} CheckId={this.CheckId} chantierName={this.state.chantierName} EditingId={this.EditingId} EditingEquip={this.EditingEquip} CalculateTotal={this.CalculateTotal} AddItem={this.AddItem} NewEquip={this.NewEquip} a={this.state.itemList} bool={this.state.newValue} total={this.state.total}  mod={this.state.mod} currentId={this.state.currentId}/>
				<Display  selectedList={this.state.SelectedList} daysList={this.state.DaysList}  SetDays={this.SetDays} DisplayTeam={this.DisplayTeam} matlist={this.state.materialList} ChooseChantier={this.ChooseChantier} pdv={this.state.pdv}  AddTeam={this.AddTeam} a={this.state.teamList} equipement={this.state.itemList} total={this.state.total} NewEquip={this.NewEquip} NewMaterial={this.NewMaterial} />
				
					
				
			 </Container>
		);
		
	}
}
export default Chantier;
