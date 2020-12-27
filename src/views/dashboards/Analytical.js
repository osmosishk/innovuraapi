import React from 'react';
import { Card, CardBody, Row, Col , Button} from 'reactstrap';
import axios from "axios";

import config from '../config.json';

const start =() =>{


    axios.post(config.slaveControl+'start')
    .then(res => {
        console.log(res);
        })
     .catch((error) => {
        console.log(error);
          })  

}

const stop =() =>{


    axios.post(config.slaveControl+'stop')
    .then(res => {
        console.log(res);
        })
     .catch((error) => {
        console.log(error);
          })  

}

const status =() =>{


    axios.get(config.slaveControl+'status')
    .then(res => {
        console.log(res);
        })
     .catch((error) => {
        console.log(error);
          })  

}

const Analytical = () => {
    return (
        <div>
          
            <Row>
       
                <Col sm={12} lg={3}>
                   
                    <CardBody className="">
                        <div className="button-group">
                        <Button className="btn" color="primary" size="lg" onClick={start}>Start Datalogger</Button>
                        <Button className="btn" color="secondary" size="lg" onClick={stop}>Stop Datalogger</Button>
                        </div>
                        </CardBody>
                </Col>
            </Row>
         
            <Row>
              
                <Col md="8">
                    <Card>
                        <span className="lstick"></span>
                        <CardBody>
                            <div className="d-md-flex align-items-center">
                                <div>
                                    <h4 className="card-title">Website Visit</h4>
                                </div>
                                <div className="ml-auto d-flex align-items-center">
                                    <ul className="list-inline mb-0 ml-auto">
                                        <li className="list-inline-item mr-3">
                                            <h6 className="text-success"><i className="fa fa-circle font-10 mr-2 "></i>Site A view</h6> </li>
                                        <li className="list-inline-item">
                                            <h6 className="text-info"><i className="fa fa-circle font-10 mr-2"></i>Site B view</h6> </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-sm btn-outline-secondary shadow-sm">PAGEVIEWS</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary shadow-sm">REFERRALS</button>
                                </div>
                            </div>
                            <div className="campaign ct-charts mt-5">
                               
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
          
           
           
            
        </div>
    );
}

export default Analytical;
