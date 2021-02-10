import styled from 'styled-components'
import { Link } from 'react-scroll';

export const Button = styled(Link)`
    border-radius: 50px;
    width: 150px;
    background: ${({ primary }) => (primary ? '#01BF71' :
    '#010606')};
    white-space:nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '8px 30px')};
    color: ${({ dark}) => (dark ?
    '#ffffff' : '#fff')};
    font-size: ${({ fontBig}) => (fontBig
    ? '20px' : '16px')};
    outline: none;
    border: solid black;
    cursor: pointer;
    display: flex;
    justify-content: center; 
    align_items: center;
    transition: all 0.2s ease-in-out;
    position: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;
	text-decoration: none;
    

    &:hover{
        transition: all 0.3s ease-out;
		background: white;
		color: black;
		transition: 250ms;
		cursor: pointer;
		text-decoration: none;

`;
