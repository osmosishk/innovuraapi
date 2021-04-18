import React, { Component } from 'react';
import { Card, CardBody, Row} from 'reactstrap';
import axios from "axios";

import config from '../config.json';
import StatusAlert from './status';
import Seconddata from './seconddata';


class Index extends Component {
    constructor(props){
        super(props);
        this.state = { 
           
        }
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        
              
    }

    
    start()
        {

            axios.post(config.slaveControl+'start')
            .then(res => {
                console.log(res);
                })
            .catch((error) => {
                console.log(error);
                })  

        }

    stop()
        {

            axios.post(config.slaveControl+'stop')
            .then(res => {
                console.log(res);
                })
            .catch((error) => {
                console.log(error);
                })  

        }

   


    render() { 
        return (
            <div>
            <Card>
                        <span className="lstick"></span>
                        <CardBody>
                            <div className="d-md-flex align-items-center">
                                <div>
                                    <h4 className="card-title">Slave Status v1.1</h4>
                                </div>
                                
                            </div>
                            <StatusAlert/>
                            <div className="text-left mt-4">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    
                                    <button type="button" className="btn btn-sm btn-outline-primary shadow-sm" onClick={this.start} >Start Datalogger</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary shadow-sm"onClick={this.stop} >Stop Datalogger</button>
                                </div>
                            </div>
                            
                        </CardBody>
                    </Card>
            
           
            <Seconddata />
            <Row>
                
                
            </Row>
         
           
           
           
           
            
        </div>
          );
    }
}
 
export default Index;