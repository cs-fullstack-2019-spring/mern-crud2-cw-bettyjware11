import React, { Component } from 'react';
//component for adding RSVP
class AddRSVP extends Component{

    submitRSVPForm=(e)=>{
        e.preventDefault();
        fetch('/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                rsvp_person: e.target.rsvp_person.value,
                rsvp_going: e.target.rsvp_going.value,

            }),
        })
            .then(this.props.updateDatabaseData());
    };

    render(){
        return(
            <div>
                <h1>Add RSVP</h1>
                <form onSubmit={this.submitRSVPForm}>
                    <p>
                        <label htmlFor="rsvp_person">RSVP_Person:</label>
                        <input type="text" id="rsvp_person" name="rsvp_person"/>
                    </p>

                    <p>
                        <label htmlFor="rsvp_going">quantity:</label>
                        <input type="text" id="rsvp_going" name="rsvp_going"/>
                    </p>


                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default AddRSVP;
