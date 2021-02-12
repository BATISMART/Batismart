import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    padding-left: 1rem;
    align-items: center;
    /*padding: 20px;*/
    list-style: none;
    height: 50px;
    text-decoration: none;
    font-size: 20px;

    &:hover{
        background: #767F9B;
        border-left: 8px solid #473C38;
        cursor: pointer;
		text-decoration: none;
		color: #473C38 
    }

`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;


const DropdownLink = styled(Link)`
    background: #414757;
    height: 40px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    text-color: #473C38
    color: #473C38;
    font-size: 18px

    &:hover{
        background: #473C38;
        cursor: pointer;
    }

`;

const SubMenu = ({ item }) => {
const [subnav, setSubnav] = useState(false)

const showSubnav = () => setSubnav(!subnav)
    return (
        <>
            <SidebarLink to={item.path} onClick={item.subNav && showSubnav} >
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav 
                        ? item.iconOpened  
                        : item.subNav 
                        ? item.iconClosed 
                        : null}
                </div>
            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {
                return (
                    <DropdownLink to={item.path} key={index}>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                )
            })}
        </>
    );
};

export default SubMenu;
