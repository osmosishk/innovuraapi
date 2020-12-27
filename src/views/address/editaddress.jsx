import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
    Card,
    CardBody,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    
    Button,
    Modal,
    ModalHeader,
    ModalBody

} from 'reactstrap';
import axios from "axios";
import config from '../config.json';
import SlaveCard from './card';
import Swal from 'sweetalert2';

class Editaddress extends Component {
    
        state = { 
            slaves :[],
            address:[],
            slaveaddress : { slave: '',start_registers_address:'',name:'',unit:'',type_of_value:'',number_of_decimals:''},
            currentaddress:{ slave: '',start_registers_address:'',name:'',unit:'',type_of_value:'',number_of_decimals:''},
            selectid :'',
            modal: false,
            fade: false ,
            deleteindex : '',
            editindex :'',
            loading : false
        }
      toggle = event => {
           this.setState({editindex :event.currentTarget.value} , function() { this.getOneSlavesAddress()})
      }

      async getOneSlavesAddress()
      {
        
        if(this.state.editindex)
        {
          await axios.get(config.slaveAddressApi+this.state.editindex+'/')
          .then((response) => {
          
          this.setState({currentaddress:response.data});
          });
    
        }
        this.setState({modal: !this.state.modal});
       
       
         
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
        const currentaddress ={...this.state.currentaddress};
        currentaddress[input.name] = input.value;
        this.setState({currentaddress})
       
    }

    handleAddressUpdate = event => {
        event.preventDefault();
        this.toggle.bind(null)
        const headers = {'Content-Type': 'application/json',}
        const updateaddress = JSON.stringify({...this.state.currentaddress})
       
        console.log(updateaddress)
       
        axios.put(config.slaveAddressApi+this.state.editindex+'/',updateaddress , {headers: headers})
          .then(res => {
            this.setState({modal: !this.state.modal});
            this.setState({...this.state.currentaddress});
            Swal.fire('Update Address Successful')
            
          })
          .catch((error) => {console.log(error);})  
  
          window.location.reload(false);    
      }
  
      

    handleDelete () {
      
        const headers = {'Content-Type': 'application/json',}
         
        axios.delete(config.slaveAddressApi+this.state.deleteindex+'/', {headers: headers})
       .then(res => {
            this.setState({...this.state.address});
          
          })
       .catch((error) => {console.log(error);})  
       window.location.reload(false);      
       
    }    

    confirmDelete = event => {
      
        this.setState({ deleteindex :event.currentTarget.value} , 
          function() { 
            Swal.fire({
              title: 'Are you sure?',
              text: 'Delete this Address?'+ this.state.deleteindex,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33', 
              confirmButtonText: 'Yes!'
            }).then((result) => {
              if(result.value){
                this.handleDelete();
              }
            })
          })
       
    }
    
      
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
        <div>
        <Modal isOpen={this.state.modal} fade={this.state.fade } toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Slave</ModalHeader>
        <ModalBody>
          <Form>
            <Input type="hidden" name="start_registers_address" id="start_registers_address"  />
            <FormGroup>
              <Label >Start Registers Address</Label>
              <Input
                type="number"
                name="start_registers_address"
                value = {this.state.currentaddress.start_registers_address}
                onChange={this.handleAddressChange} 
                
              />
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value= { this.state.currentaddress.name}
                onChange={this.handleAddressChange} 
               
              />
            </FormGroup>
            <FormGroup>
                <Label>Unit</Label>
                <Input type="text" name="unit"  value ={this.state.currentaddress.unit} onChange={this.handleAddressChange} />  
            </FormGroup>
            <FormGroup>
                <Label>Type of value</Label>
                    <Input type="select" name="type_of_value"  value ={this.state.currentaddress.type_of_value} onChange={this.handleAddressChange}>
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
            </FormGroup>
            <FormGroup>
                <Label>Number of decimals</Label>
                    <Input type="number" name="number_of_decimals" value ={this.state.currentaddress.number_of_decimals} onChange={this.handleAddressChange}/>
                </FormGroup>
        
            <FormGroup>
             
              <Button
                color="secondary"
                className="ml-1"
                onClick={this.handleAddressUpdate}
              >
                Save 
              </Button>
              <Button color="primary" type="submit">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        </Modal>
         
        
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
                </Form>
                </Card>



            </Col>         
            <CardBody>
                <ReactTable
                    columns={[
                    
                    {
                        Header: "ID",
                        accessor: "id",
                        width: 70
                       
                    },
                    {
                        Header: "Register Address ",
                        accessor: "start_registers_address",
                        width: 150
                    },
                    {
                        Header: "Name",
                        accessor: "name",
                        width: 250
                    },
                    {
                        Header: "Type of value",
                        accessor: "type_of_value",
                        width: 150
                    },
                    {
                        Header: "Number of decimals",
                        accessor: "number_of_decimals",
                        width: 100
                    },
 
                    {
                        Header: "Actions",
                        width: 100,
                        Cell: ({ original }) => (
                          
                            <div className="text-center">
                                <Button
                                    onClick={this.toggle}
                                    color="inverse"
                                    size="sm"
                                    round="true"
                                    icon="true"
                                    value ={original.id}
                                    
                                >
                                  <i className="fa fa-edit" />
                                 </Button>
                            </div>
                          ),
                        sortable: false,
                        filterable: false,
                    },
                    {
                      Header: "Delete",
                      width: 100,
                      Cell: ({ original }) => (
                          <div className="text-center">
                             <Button 
                              onClick={this.confirmDelete}
                              color="inverse"
                              size="sm"
                              round="true"
                              //icon="true"
                              value ={original.id}
                              
                              ><i className="fa fa-cut" /></Button>
                                
                          </div>
                        ),
                      sortable: false,
                      filterable: false,
                  },
                    ]}
                    defaultPageSize={10}
                    showPaginationBottom={true}
                    className="-striped -highlight"
                    data={filteritem}
                    loading = {this.state.loading}
                    //filterable
                />
            </CardBody>
        </Row>

        </div> 
    
     );
} 

       
    
  
}
 
export default Editaddress;