import React, {Component} from 'react';

// import './Chantier.css';
//import Sentry from './Sentry';
import AcceuilChantier from './acceuilChantier';
import $ from "jquery";
import Equip from './equip';
import Materiaux from './materiaux';
import MesChantier from './mesChantier';
import Indirect from './indirect';
import Team from './team';
import Display from './displayChantier';
import EquipementSuivi from './equipementSuivi';
import MateriauxSuivi from './materiauxSuivi';
import TeamSuivi from './teamSuivi';
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
		this.AddMaterialSuivi = this.AddMaterialSuivi.bind(this);
		this.AddTeam = this.AddTeam.bind(this);
		this.NewTeam = this.NewTeam.bind(this);
		this.NewEquip = this.NewEquip.bind(this);
		this.NewMaterial = this.NewMaterial.bind(this);
		this.NewMaterialSuivi = this.NewMaterialSuivi.bind(this);
		this.SelectedAndDaysSuivi = this.SelectedAndDaysSuivi.bind(this);
		this.MountingTeamSuivi = this.MountingTeamSuivi.bind(this);
		this.DisplayTeamSuivi = this.DisplayTeamSuivi.bind(this);
		this.DidWePressNext = this.DidWePressNext.bind(this);
		this.DisplayTeam = this.DisplayTeam.bind(this);
		this.indirectPress = this.indirectPress.bind(this);
		this.Next2 = this.Next2.bind(this);
		this.CheckId = this.CheckId.bind(this);
		this.CalculateTotal = this.CalculateTotal.bind(this);
		this.SetDays = this.SetDays.bind(this);
		this.MountingTeam = this.MountingTeam.bind(this);
		this.SelectedAndDays = this.SelectedAndDays.bind(this);
		this.SetDisplayVar = this.SetDisplayVar.bind(this);
		this.NewEquipSuivi = this.NewEquipSuivi.bind(this);
		this.AddItemSuivi = this.AddItemSuivi.bind(this);
		this.SetSemaine = this.SetSemaine.bind(this);
		this.AddTeamWeek = this.AddTeamWeek.bind(this);
		this.AddTeamSelected = this.AddTeamSelected.bind(this);
		this.AddCurrentTeam = this.AddCurrentTeam.bind(this);
		this.EditingEquipSuivi = this.EditingEquipSuivi.bind(this);
		this.EditingMaterialSuivi = this.EditingMaterialSuivi.bind(this);
		this.EditingId2 = this.EditingId2.bind(this);
		let teamWeek = [];
		let currentTeam = [];
		let itemList = [];
		let materialList = [];
		let SelectedList = [];
		let SelectedListSuivi = [];
		let DaysListSuivi = [];
		let DaysList = [];
		let teamList = [];
		let itemSuiviList = [];
		let newValue = false;
		let newValueSuivi = false;
		let DisplayButton = false;
		let matValue = false;
		let nextButton = false;
		let chantierName = "";
		let teamButton = false;
		let chantierval = false;
		let indirectButton = false;
		let matValueSuivi = false;
		let materialListSuivi = [];
		let teamSelected = [];
		let mod = false;
		let mod2 = false;
		let bugId= 99;
		let modEquipSuivi = false;
		let modMaterialSuivi = false;
		let currentId = 99;
		let total = 0;
		let pdv = 0;
		let days = 0;
		let displayVar = false;
		let idcheck = false;
		let teamMounted = false;
		let teamMountedSuivi = false;
		let DisplayButtonSuivi = false;
		let semaine = "Semaine0"
		this.state = { itemList,
						bugId,
						teamSelected,
						displayVar,
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
						DaysList,
						itemSuiviList,
						newValueSuivi,
						semaine,
						materialListSuivi,
						matValueSuivi,
						teamMountedSuivi,
						DisplayButtonSuivi,
						SelectedListSuivi,
						DaysListSuivi,
						teamWeek,
						currentTeam,
						modEquipSuivi,
						modMaterialSuivi
						};

	}
	SetSemaine(props){
		
		this.setState({semaine: props});
		
	}
	AddCurrentTeam(props){
		
		this.setState({currentTeam: props});
	}
	SelectedAndDays(props1,props2){
		this.setState({SelectedList: props1});
		this.setState({DaysList: props2});
		
		
	}
	SetDisplayVar(props){
		
		this.setState({displayVar: props});
		
		
	}
	AddTeamWeek(props){
		
		this.setState({teamWeek: props});
		
		
	}
	
	MountingTeam(props){
		
		this.setState({teamMounted: props});
		
	}
	SelectedAndDaysSuivi(props1,props2){
		this.setState({SelectedListSuivi: props1});
		this.setState({DaysListSuivi: props2});
		
		
	}
	MountingTeamSuivi(props){
		
		this.setState({teamMountedSuivi: props});
		
	}
	DisplayTeamSuivi(props){
		
		this.setState({DisplayButtonSuivi: props});
		
	}
	DisplayTeam(props){
		
		this.setState({DisplayButton: props});
		
	}
	
	SetDays(props){
		
		this.setState({days: props});		
		
	}
	AddItemSuivi(props){
		
		
		this.setState({itemSuiviList: props});
		
		
	}
	AddItem(props){
		
		this.setState({itemList: props})		
		
		// console.log(this.state.itemList);
		
		
	}
	AddMaterialSuivi(props){
		
		this.setState({materialListSuivi: props});
		
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
	NewEquipSuivi(props){
		
		this.setState({newValueSuivi: props});
		
		
	}
	NewEquip(props){
		this.setState({newValue: props})
		
		// console.log(props);


	}
	
	NewMaterialSuivi(props){
		
		this.setState({matValueSuivi: props});
		
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
	AddTeamSelected(props){
		this.setState({teamSelected: props});
		
	}
	EditingEquip(props){
		
		this.setState({mod:props})
		
		
	}

	EditingEquipSuivi(props){
		
		this.setState({modEquipSuivi: props})
		
	}
	EditingMaterialSuivi(props){
		
		this.setState({modMaterialSuivi: props})
		
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
	EditingId2(props){
		this.setState({bugId:props})
		
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
							DaysList: this.state.DaysList,
							displayVar: this.state.displayVar,
							itemSuiviList: this.state.itemSuiviList,
							newValueSuivi: this.state.newValueSuivi,
							semaine: this.state.semaine,
							matValueSuivi: this.state.matValueSuivi,
							materialListSuivi: this.state.materialListSuivi,
							teamMountedSuivi: this.state.teamMountedSuivi,
							DisplayButtonSuivi: this.state.DisplayButtonSuivi,
							SelectedListSuivi: this.state.SelectedListSuivi,
							DaysListSuivi: this.state.DaysListSuivi,
							teamWeek: this.state.teamWeek,
							teamSelected: this.state.teamSelected,
							currentTeam: this.state.currentTeam,
							bugId: this.state.bugId,
							modEquipSuivi: this.state.modEquipSuivi,
							modMaterialSuivi: this.state.modMaterialSuivi
							
						
							
						})
		}, 1000)
	
		
		
	}
	
	componentWillUnmount() {
			clearInterval(this.interval);
	}
	
	render() {
		// console.log("test");
		console.log(this.state.modEquipSuivi, "master the blaster");
	
		return (
			<Container style={{ margin: 20 }}>
				<Team AddCurrentTeam={this.AddCurrentTeam} chantierName={this.state.chantierName} AddTeamSelected={this.AddTeamSelected} SelectedAndDays={this.SelectedAndDays} MountingTeam={this.MountingTeam} teamMounted={this.state.teamMounted} days={this.state.days} DisplayTeam={this.DisplayTeam} DisplayButton={this.state.DisplayButton} />
				<Materiaux idcheck={this.state.idcheck} CheckId={this.CheckId} chantierName={this.state.chantierName} EditingId={this.EditingId} EditingMat={this.EditingMat} CalculateTotal={this.CalculateTotal} AddMaterial={this.AddMaterial} NewMaterial={this.NewMaterial} matlist={this.state.materialList} bool={this.state.matValue} next={this.state.nextButton} total={this.state.total} mod2={this.state.mod2}  currentId={this.state.currentId}/>
				<Equip idcheck={this.state.idcheck} CheckId={this.CheckId} chantierName={this.state.chantierName} EditingId={this.EditingId} EditingEquip={this.EditingEquip} CalculateTotal={this.CalculateTotal} AddItem={this.AddItem} NewEquip={this.NewEquip} a={this.state.itemList} bool={this.state.newValue} total={this.state.total}  mod={this.state.mod} currentId={this.state.currentId}/>
				{this.state.displayVar === true ?
				(
				<Display currentTeamList={this.state.teamList} AddMaterial={this.AddMaterial} EditingMat={this.EditingMat} NewMaterial={this.NewMaterial} AddItem={this.AddItem} CheckId={this.CheckId} EditingId={this.EditingId} EditingEquip={this.EditingEquip} chantierName={this.state.chantierName} AddTeamSelected={this.AddTeamSelected} teamSelected={this.state.teamSelected} Next2={this.Next2} modifChantier={this.state.teamButton} ValueIndex={this.state.DaysList} AddMaterial={this.AddMaterial} AddItem={this.AddItem} SetDisplayVar={this.SetDisplayVar} selectedList={this.state.SelectedList} daysList={this.state.DaysList}  SetDays={this.SetDays} DisplayTeam={this.DisplayTeam} matlist={this.state.materialList} ChooseChantier={this.ChooseChantier} pdv={this.state.pdv}  AddTeam={this.AddTeam} a={this.state.teamList} equipement={this.state.itemList} total={this.state.total} NewEquip={this.NewEquip} NewMaterial={this.NewMaterial} />
				):(
					<div>
					<AcceuilChantier semaine={this.state.semaine} chantierName={this.state.chantierName} EditingMaterialSuivi={this.EditingMaterialSuivi} EditingId2={this.EditingId2} currentId={this.state.currentId} EditingId={this.EditingId} EditingEquipSuivi={this.EditingEquipSuivi} currentTeam={this.state.currentTeam} SetDays={this.SetDays} Next2={this.Next2} AddTeamWeek={this.AddTeamWeek} AddMaterialSuivi={this.AddMaterialSuivi} AddItemSuivi={this.AddItemSuivi} ChooseChantier={this.ChooseChantier} SelectedAndDays={this.SelectedAndDays} AddMaterial={this.AddMaterial} AddItem={this.AddItem} teamWeek={this.state.teamWeek} DisplayTeamSuivi={this.DisplayTeamSuivi} matlistSuivi={this.state.materialListSuivi} NewMaterialSuivi={this.NewMaterialSuivi} itemSuiviList={this.state.itemSuiviList} SetSemaine={this.SetSemaine} NewEquipSuivi={this.NewEquipSuivi} team={this.state.teamList} SetDisplayVar={this.SetDisplayVar} AddTeam={this.AddTeam}/>
					<MateriauxSuivi modMaterialSuivi={this.state.modMaterialSuivi} EditingMaterialSuivi={this.EditingMaterialSuivi} EditingId2={this.EditingId2} currentId={this.state.bugId} chantierName={this.state.chantierName} team={this.state.teamList} AddMaterialSuivi={this.AddMaterialSuivi} NewMaterialSuivi={this.NewMaterialSuivi} matlistSuivi={this.state.materialListSuivi} semaine={this.state.semaine} bool={this.state.matValueSuivi} />
					<TeamSuivi chantierName={this.state.chantierName} AddTeamWeek={this.AddTeamWeek} team={this.state.teamList} semaine={this.state.semaine} SelectedAndDaysSuivi={this.SelectedAndDaysSuivi} MountingTeamSuivi={this.MountingTeamSuivi} teamMounted={this.state.teamMountedSuivi} days={7} DisplayTeamSuivi={this.DisplayTeamSuivi} DisplayButton={this.state.DisplayButtonSuivi} />
				
					<EquipementSuivi  EditingId2={this.EditingId2} currentId={this.state.bugId} EditingId={this.EditingId} EditingEquipSuivi={this.EditingEquipSuivi} modEquipSuivi={this.state.modEquipSuivi} chantierName={this.state.chantierName} team={this.state.teamList} AddItemSuivi={this.AddItemSuivi} NewEquipSuivi={this.NewEquipSuivi} itemSuiviList={this.state.itemSuiviList} semaine={this.state.semaine} bool={this.state.newValueSuivi} />
					</div>
					
				)	
				
				}
					
				
			 </Container>
		);
		
	}
}
export default Chantier;
