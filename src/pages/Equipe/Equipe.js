import React from "react";

import { Container, Header} from "semantic-ui-react";


import CardEquipe from "./CardEquipe";

const Equipe = ({ children }) => (
  <Container style={{ margin: 20 }}>
   


    <CardEquipe />
  </Container>
);


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


export default Equipe;