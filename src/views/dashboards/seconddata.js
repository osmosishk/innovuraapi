import React, { Component } from 'react';
import axios from "axios";
import config from '../config.json';
import {
    Card,
    CardBody,
    Col,
    Row,
    Button
} from 'reactstrap';

import img3 from '../../assets/images/icons/assets.png'

class Seconddata extends Component {
    state = { 
        slaves:[]

     }
    
    componentDidMount()
    {

        this.getStatus()
    
    }
    
    getStatus()
    {
        axios.get(config.slaveApiEndpiont)
        .then(res => {
            this.setState({slaves:res.data} , function(){})
            })
        .catch((error) => {
            console.log(error);
            })  
  
    }

    slaveDisable(slaveid)
    {
        axios.post(config.slaveControl+'slavedisable/'+slaveid+'/')
        .then(res => {
            console.log(res.data);
            })
        .catch((error) => {
            console.log(error);
            })  
  
    }

    slaveEnable(slaveid)
    {
        axios.post(config.slaveControl+'slaveenable/'+slaveid+'/')
        .then(res => {
            console.log(res.data);
            })
        .catch((error) => {
            console.log(error);
            })  
  
    }
    
    
    
    render() { 
        let slaveCard = this.state.slaves.map(slave => { 
            if (slave.enable)
            {
                return (
                <Col sm={12} md={6} lg={3}>
                    <Card>
                        <span className="lstick widget-card bg-info"></span>
                        <CardBody>
                            <div className="d-flex">
                                <div className="mr-3 align-self-center"><img src={img3} alt="address" /></div>
                                <div className="align-self-center">
                                    <li className="list-inline-item mr-3">
                                    <h6 className="text-success"><i className="fa fa-circle font-10 mr-2 "></i>{slave.name}</h6> </li>
                                  
                                    <h6 className="text-muted mt-2 mb-0">{slave.enable.toString()}</h6>
                                    <Button className="btn" color="success" onClick={() => this.slaveDisable(slave.slave_address)} >Disable</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>)
            }
            else
            {
                return (
                    <Col sm={12} md={6} lg={3}>
                        <Card>
                            <span className="lstick widget-card bg-info"></span>
                            <CardBody>
                                <div className="d-flex">
                                    <div className="mr-3 align-self-center"><img src={img3} alt="address" /></div>
                                    <div className="align-self-center">
                                        <li className="list-inline-item">
                                        <h6 className="text-info"><i className="fa fa-circle font-10 mr-2"></i>{slave.name}</h6> </li>
                                        
                                        <h6 className="text-muted mt-2 mb-0">{slave.enable.toString()}</h6>
                                        <Button className="btn" color="danger"onClick={() => this.slaveEnable(slave.slave_address)}>Enable</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>)
            }

            
        })
        
        return (
            <Row>
              {slaveCard}
       
                
              
            </Row>
        );
    }
}
 


export default Seconddata;
