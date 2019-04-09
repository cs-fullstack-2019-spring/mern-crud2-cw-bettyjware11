import React, { Component } from 'react';
import EditRSVP from "./EditRSVP";

//component for list of RSVPs
class RSVPList extends Component{
    constructor(props) {
        super(props);
        //setting up state
        this.state = {
            edit: false,
            editDataToSend: {},
        }
    }
    //binding this
    editRSVP=(e)=>{
        this.setState({edit:true});
        fetch('/edit/'+e.target.name)
            .then(data=>data.json())
            .then(response => this.setState({editDataToSend: response}));
    };
    //setting event handler
    getRidOfEdit = () =>{
        this.setState({edit: false});
    };
    //setting event handler
    deleteRSVP=(e)=>{
        console.log(e.target);
        fetch('/delete', {
            method: 'DELETE',
            headers: {
                'Accept': "application/json",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({rsvp_person:e.target.name}),
        })
            .then(()=>this.props.updateDatabaseData());
    };
    //designating where out of state the values are to come from
    render(){
        let collectionMap = this.props.collection.map(
            (eachRSVP)=>{
                return (<div key={eachRSVP.rsvp_person}>
                    <p>RSVP_Person: {eachRSVP.rsvp_person} is ${eachRSVP.rsvp_going}.

                        <button className="buttonLink" name={eachRSVP.rsvp_person} onClick={this.editRSVP}>Edit</button>
                        <button className="buttonLink" name={eachRSVP.rsvp_person} onClick={this.deleteRSVP}>Delete</button>
                    </p>
                </div>)
            }
        );

        let showEdit = "";
        if(this.state.edit)
            showEdit = <EditRSVP editDataToSend={this.state.editDataToSend} updateDatabaseData={this.props.updateDatabaseData} getRidOfEdit={this.getRidOfEdit}/>;
        else
            showEdit = "";

        return(
            <div>
                {showEdit}
                <h1>RSVP here</h1>
                {collectionMap}
            </div>
        );
    }
}

export default RSVPList;
