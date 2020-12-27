import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
  
    CustomInput
} from 'reactstrap';
import axios from "axios";
import config from '../config.json';


class AddSlave extends Component {
    state = { 
        slave : { name :'' , slave_address: '1' , enable:'true',mac :'74-DE-AA-38-30-12' , setting:{ baudrate :'19200',parity:'E',stopbits:'1',bytesize:'8',timeout:'0.5'}},
       
     }
    
    handleSlaveChange = ({currentTarget:input}) =>{
        const slave ={...this.state.slave};
        slave[input.name] = input.value;
        this.setState({slave})
       
        

    }
   
    handleSettingChange = ({currentTarget:input}) =>{
        const slave ={...this.state.slave};
        slave.setting[input.name] = input.value;
        this.setState({slave})
        

    }

    handleSubmit = event => {
        event.preventDefault();
        
        const slave = JSON.stringify({...this.state.slave})
        const headers = {
            'Content-Type': 'application/json',
            
          }

        console.log(slave);
        axios.post(config.slaveApiEndpiont, slave,{
            headers: headers})
         .then(res => {
            console.log(res);
            console.log(res.data);
            })
         .catch((error) => {
            console.log(error);
              })  
    
     };


    render() { 
        return ( <div>
    
            <Row>
                <Col md="12">
                    <Card>
                    <Form onSubmit={this.handleSubmit}> 
                        <CardTitle className="bg-light border-bottom p-3 mb-0 text-white">
                            <i className="mdi mdi-book mr-2"></i>Add Slave Device
                        </CardTitle>
                        <CardBody className="bg-light">
                            <CardTitle className="mb-0">Slave Info</CardTitle>
                        </CardBody>
                        <CardBody>
                            
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Slave Name</Label>
                                            <Input type="text"  value={this.state.slave.name} name="name" onChange={this.handleSlaveChange} />
                                            <FormText className="muted">This is inline help</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label>Slave Address</Label>
                                            <Input type="number" value={this.state.slave.address} name="slave_address" placeholder="1" onChange={this.handleSlaveChange} />
                                            <FormText className="muted">This field has error.</FormText>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                    <FormGroup >
                                            <Label>Enable</Label>
                                            
                                            <CustomInput type="radio" id="exampleCustomRadio3" name="enable" defaultChecked label="Enable" value="true" onChange={this.handleSlaveChange} />
                                            <CustomInput type="radio" id="exampleCustomRadio4" name="enable" label="Disable" value="false" onChange={this.handleSlaveChange}/>
                                            
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                    <FormGroup>
                                            <Label>Mac Address</Label>
                                            <Input type="text" name="mac" value={this.state.slave.mac} placeholder="74-DE-AA-38-30-12" onChange={this.handleSlaveChange} />
                                            <FormText className="muted">This field has error.</FormText>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                
                            
                        </CardBody>
                        <CardBody className="bg-light">
                            <CardTitle className="mb-0">Connect Setting</CardTitle>
                        </CardBody>
                        <CardBody>
                            <Row>
                                <Col md="6">
                                <FormGroup>
                                        <Label>Baudrate</Label>
                                        <Input type="select" name="baudrate" value={this.state.slave.setting.baudrate}  onChange={this.handleSettingChange}> 
                                            <option>9600</option>
                                            <option>19200</option>
                                            <option>38400</option>
                                            <option>115200</option>
                                            <option>4800</option>
                                            
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                <FormGroup>
                                        <Label>Parity</Label>
                                        <Input type="select" name="parity" value={this.state.slave.setting.parity}  onChange={this.handleSettingChange}>
                                            <option>Even</option>
                                            <option>Odd</option>
                                            <option>None</option>
                                            
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>Stopbits</Label>
                                        <Input type="number" name="stopbits" value={this.state.slave.setting.stopbits}  onChange={this.handleSettingChange} />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>Bytesize</Label>
                                        <Input type="number" name="bytesize" value={this.state.slave.setting.bytesize}  onChange={this.handleSettingChange} />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                <FormGroup>
                                        <Label>Timeout</Label>
                                        <Input type="number" name="timeout" value={this.state.slave.setting.timeout}  onChange={this.handleSettingChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        
                        <CardBody className="border-top">
                            <Button type="submit" className="btn btn-success"> <i className="fa fa-check"></i> Add</Button>
                            <Button type="button" className="btn btn-dark ml-2">Cancel</Button>
                        </CardBody>
                    </Form>       
                    </Card>
                </Col>
                
                
      
            </Row>
        
        </div> );
    }
}
 
export default AddSlave;