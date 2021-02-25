import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from "react-icons/gi";
import { SidebarData } from './SidebarData'
import { SidebarDataCon } from './SidebarDataCon'
import SubMenu from './SubMenu'
import SubMenuCon from './SubMenuCon'
import { IconContext } from 'react-icons/lib'
import * as IconName  from "react-icons/io5";
import firebase from "firebase/app";
import * as BsIcons from "react-icons/bs";
import Icone4 from "./lolo_batismart.png";


const Nav = styled.div`
    background: #555B61;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;


const NavIcon = styled(Link)`
    margin-right:auto;
    padding: 20px;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;


const NavIconCon = styled(Link)`
    margin-left:auto;
    padding: 20px;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

/*SidebarMenu*/
const SidebarNav = styled.nav`
    background: #555B61;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
`;

const SidebarNavCon = styled.nav`
    background: #555B61;
    width: auto;
    height: auto;
    display: flex;
    justify-content: space-between;
    position: fixed;
    margin-right: 2px;
    margin-top: 2px;
    right: ${({ sidebar2 }) => (sidebar2 ? '0' : '-100%')};
    transition: 0ms;
    z-index: 10;
    border-radius: 30px;
`;



const SidebarWrap = styled.div`
    width: 100%;
`;

const Icon = styled(Link)`
    margin-left: 110px;
    margin-top: 10px;
    margin-bottom: 0px;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Barre = styled.div`
    height: 10px;
    margin-bottom: 25px;
    color: #656971;
    margin-top: 0px;
`;

const Identif = styled.div`
    height: 10px;
    margin-top: 0px;
    margin-bottom: 10px;
    align-items: center;
    text-align: center;
    color: white;
`;





class Sidebar extends React.Component  {
	
	
	constructor(props){
		super(props);
		this.showSidebar = this.showSidebar.bind(this);
		this.showSidebar2 = this.showSidebar2.bind(this);
		this.state = {
			sidebar: false,
			sidebar2: false
			
		};
		
	}

		submitHandler2 = (event) => {
		if(this.props.user !== null){	
		firebase.auth().signOut().then(() => {
			window.location.reload(false);
		}).catch((error) => {
  // An error happened.
		});
		}
		
		
	}
	
    showSidebar(){
		console.log("test");
		this.setState({sidebar: !this.state.sidebar});
		
	}
	showSidebar2(){
		this.setState({sidebar2: !this.state.sidebar2});
		
	}
	



	render() {

    return (
        <>
		
        <IconContext.Provider value={{ color: 'white'}}>
            <Nav>
				
                <NavIcon to="#">
                    <FaIcons.FaBars onClick={this.showSidebar} />
                </NavIcon>
				
                <a href="/Accueil" style={{ color: '#FFF', fontSize: '45px', textDecoration: 'none' }}>
						<img src={Icone4} alt="ok"  width="300" style={{position: "relative", left: 0, right:0, top: 0}}/>
				</a>
                
                <NavIconCon to="#">
                    <IconName.IoPersonCircleOutline onMouseEnter={this.showSidebar2} />
                </NavIconCon>



            </Nav>
            <SidebarNav sidebar={this.state.sidebar}>
                <SidebarWrap>
                <NavIcon to="#">
                    <AiIcons.AiOutlineClose onClick={this.showSidebar} 
                    />
                </NavIcon>
                {SidebarData.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                }) } 
                </SidebarWrap>
            </SidebarNav>

            <SidebarNavCon sidebar2={this.state.sidebar2}>
                <SidebarWrap>
                
                <Icon to="#">
                    <BsIcons.BsPersonSquare />
                </Icon>

                
                
				{console.log("listen : "+this.props.username)}
                <Identif to="#"> Bonjour {this.props.username} </Identif>

                <Barre>________________________________________</Barre>
                {SidebarDataCon.map((item, index) => {
                    return <SubMenuCon item={item} key={index} />;
                }) } 
                
                <Icon to="#">
                    <GiIcons.GiExitDoor onClick={this.submitHandler2}/>
                </Icon>
            
                

                </SidebarWrap>
            </SidebarNavCon>


            

            </IconContext.Provider>
        </>
    );
	}
};

export default Sidebar
