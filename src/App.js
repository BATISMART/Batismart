import './App.css';
import React from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Dashboard from './pages/Dashboard/Dashboard'
import Equipe from './pages/Equipe/Equipe'
import Chantier from './pages/Chantier/Chantier'
import Contacter from './pages/Contacter'
import Support from './pages/Support/Support'
import Connexion from './pages/Connexion'
import Inscription from './pages/Inscription';
import Footer from './components/Footer';
import firebase from "firebase/app";
class App extends React.Component{
	
		constructor(props){
		super(props);
	
		this.state = {
			test : null
			
		};
		
	}
	

	
	componentDidMount() {
	console.log("master");
    firebase.auth().onAuthStateChanged(user => {

      var theUser;

      if (user) {
        console.log("user is logged in!");

        theUser = user;

        this.setState({
          test: theUser
        });
        // User is signed in.
      } else {
        // No user is signed in.
        console.log("user is not logged in!")
        theUser = null;
      }
  })
}

  render() {
	  
  if(this.state.test){
		console.log("mynameis : "+	this.state.test.displayName);
  return (
  <div className="page-container">
  <div className="content-wrap">
	
    <Router>
		  
          <Sidebar username={this.state.test.displayName} user={this.state.test}/>
		 
          <Switch>
          <Route path='/accueil' exact component={Accueil}/>
          <Route path='/dashboard' exact component={Dashboard}/>
          <Route path='/equipe' exact component={Equipe}/>    
          <Route path='/chantier' exact component={Chantier}/> 
          <Route path='/contacter' exact component={Contacter}/> 
          <Route path='/support' exact component={Support}/>  
          <Route path='/connexion' exact component={Connexion}/>
          <Route path='/inscription' exact component={Inscription}/>
          </Switch>
		 
		
    </Router>
    </div>
		
     <Footer />
    </div>

    
  
  );
  }else{
	  
	    return (
  <div className="page-container">
  <div className="content-wrap">
	
    <Router>
		  
          <Sidebar username={""} user={null}/>
		 
          <Switch>
          <Route path='/accueil' exact component={Accueil}/>
          <Route path='/dashboard' exact component={Dashboard}/>
          <Route path='/equipe' exact component={Equipe}/>    
          <Route path='/chantier' exact component={Chantier}/> 
          <Route path='/contacter' exact component={Contacter}/> 
          <Route path='/support' exact component={Support}/>  
          <Route path='/connexion' exact component={Connexion}/>
          <Route path='/inscription' exact component={Inscription}/>
          </Switch>
		 
		
    </Router>
    </div>
     <Footer />
    </div>

    
  
  );
	  
  }
  }
}

export default App;
