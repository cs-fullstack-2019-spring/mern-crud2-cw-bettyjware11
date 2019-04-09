import React, { Component } from 'react';
import RSVPList from "./RSVPList";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AddRSVP from "./AddRSVP";
//component for all RSVPs
class RSVPHome extends Component{
    constructor(props) {
        super(props);
        //setting up state
        this.state={
            collection:[],
        };
        //binding this
        this.updateDatabaseData();
    }
    //implementing listeners
    updateDatabaseData=()=>{
        fetch('/list')
            .then(data=>data.json())
            .then(jsonData=>this.setState({collection:jsonData}));
    };
    //rendering...designating where out of state the value is to come from
    render(){
        return(
            <div>
                <Router>
                    <Link className="linkInGeneral" to="/">Home</Link>
                    <Link className="linkInGeneral" to="/addRSVP">Add RSVP</Link>

                    <Route path="/" exact
                           component={()=><RSVPList collection={this.state.collection} updateDatabaseData={this.updateDatabaseData}/>
                           }/>
                    <Route path="/addRSVP"
                           component={()=><AddRSVP updateDatabaseData={this.updateDatabaseData}/>
                           }/>



                </Router>
            </div>
        );
    }
}

export default RSVPHome;