import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import axios from "axios";
import config from '../config.json';
class StatusAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: false,
       
    };
    this.getStatus = this.getStatus.bind(this)
  }

  componentWillMount() {
        
    this.getStatus();
  
}
  
  getStatus()
  {
      axios.get(config.slaveControl+'status')
      .then(res => {
          this.setState({status:res.data} )
          })
      .catch((error) => {
          console.log(error);
          })  

  }
  render () {
        
        if (this.state.status.status )

        {
            return (
                <div>
                <Alert color="success">
                   Data Logger is Running !
                </Alert>
               
                </div>
              )
        }
        else{

            return (
                <div>
                
                <Alert color="danger">
                    Data Logger is stop
                </Alert>
                </div>
              )

        }
       
      
        
    }
   
  
}

export default StatusAlert;