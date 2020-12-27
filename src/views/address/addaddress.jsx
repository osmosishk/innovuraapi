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
  
    Button,
    Table,
   
} from 'reactstrap';
import axios from "axios";
import config from '../config.json';
import SlaveCard from './card';

class Addaddress extends Component {
    
        state = { 
            slaves :[],
            address:[],
            slaveaddress : { slave: '',start_registers_address:'',name:'',unit:'',type_of_value:'',number_of_decimals:''},
            selectid :'',
            formsubmited: false
        }

      async getSlavesAddress()
      {
         
          await axios.get(config.slaveAddressApi)
                  .then((response) => {
                   this.setState({address:response.data});
          });
      } 

     async getSlavesData()
     {
        
         await axios.get(config.slaveApiEndpiont)
                 .then((response) => {
                 this.setState({slaves:response.data});
         });
        
        
     } 
     componentDidMount() {
         
         this.getSlavesData();
       
     } 
    
    showSlaveAddress(job_id) {
        this.getSlavesAddress()
        
        this.setState({selectid:job_id} , function() { console.log(this.state.selectid)} )
        
      }
      
    handleAddressChange = ({currentTarget:input}) =>{
        const slaveaddress ={...this.state.slaveaddress};
        slaveaddress[input.name] = input.value;
        slaveaddress['slave'] = this.state.selectid;
        this.setState({slaveaddress} )
        

    }

    handleSubmit = event => {
        event.preventDefault();
        
        const slaveaddress = JSON.stringify({...this.state.slaveaddress})
        const headers = {
            'Content-Type': 'application/json',
            
          }

        console.log(slaveaddress);
        axios.post(config.slaveAddressApi, slaveaddress,{
            headers: headers})
         .then(res => {
            console.log(res);
            this.getSlavesData()
            this.setState(this.state.address)
           
            })
         .catch((error) => {
            console.log(error);
              })  
        window.location.reload(false);      
     
     };
    

       
    
    render() { 
        
            let slaveCard = this.state.slaves.map(slave => {
            return (
               
                <Col sm="4">
                    <SlaveCard key={slave.job_id} showSlaveAddress={this.showSlaveAddress.bind(this)} slave={slave} />
                </Col>
                
            )}
            )

             const filteritem = this.state.address.filter(a => a.slave === this.state.selectid); 
        
           
        return ( 
            
             
            
            <Row>
                <Col md="12">
                    <Card>
                    <Form onSubmit={this.handleSubmit}> 
                       
                        <CardBody className="bg-light">
                            <i className="mdi mdi-book mr-2"></i> Slave Address
                        </CardBody>
                       
                            <Row>
                                 {slaveCard}                 
                            </Row>
                        
                        <CardBody className="bg-light">
                            <CardTitle className="mb-0">Address Setting for {this.state.selectid} </CardTitle>
                        </CardBody>
                        <CardBody>
                            <Row>

                                <Col md="6">
                                    <FormGroup>
                                    <Label>Name</Label>
                                    <Input type="text" name="name" value ={this.state.slaveaddress.name} onChange={this.handleAddressChange} />
                                     </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                    <Label>Slave Register Address</Label>
                                    <Input type="number" name="start_registers_address" value ={this.state.slaveaddress.start_registers_address} onChange={this.handleAddressChange} />
                                    </FormGroup>
                                </Col>
                                
                                <Col md="6">
                                    <FormGroup>
                                    <Label>Unit</Label>
                                    <Input type="text" name="unit"  value ={this.state.slaveaddress.unit} onChange={this.handleAddressChange} />  
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                     <Label>Type of value</Label>
                                        <Input type="select" name="type_of_value"  value ={this.state.slaveaddress.type_of_value} onChange={this.handleAddressChange}>
                                            <option>FLOAT32</option>
                                            <option>UNIXTIMEF32</option>
                                            <option>FLOAT64</option>
                                            <option>UNIXTIMEF64</option>
                                            <option>INT64</option>
                                            <option>UINT64</option>
                                            <option>UNIXTIMEI64</option>
                                            <option>UNIXTIMEI32</option>
                                            <option>INT32</option>
                                            <option>UINT32</option>
                                            <option>INT16</option>
                                            <option>UINT16</option>
                                            <option>BOOLEAN</option>
                                            <option>STRING</option>

                                            
                                    </Input>
                                </Col>
                                <Col md="6">
                                <FormGroup>
                                        <Label>Number of decimals</Label>
                                        <Input type="number" name="number_of_decimals" value ={this.state.slaveaddress.number_of_decimals} onChange={this.handleAddressChange}/>
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

                <CardBody className="border-top">
                        <h6><i className="mr-1 font-18 mdi mdi-numeric-1-box-multiple-outline"></i> Slave Address of </h6>
                        <Table responsive>
                            <thead>
                                <tr>
                                    
                                    <th>Register Address</th>
                                    <th>Name</th>
                                    <th>Unit</th>
                                    <th>Type</th>
                                    <th>Number of Dec.</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {filteritem.map(address => (
                                    <tr key={address.id}>
                                        <td>{address.start_registers_address}</td>
                                        <td>{address.name}</td>  
                                        <td>{address.unit}</td> 
                                        <td>{address.type_of_value}</td>
                                        <td>{address.number_of_decimals}</td>    

                                    </tr>))}
                               
                            </tbody>
                        </Table>
                       
                    </CardBody>
      
            </Row>

           
        
         );
    }
}
 
export default Addaddress;