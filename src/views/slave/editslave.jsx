import React, { Component } from 'react';
import ReactTable from "react-table";
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
   
} from "reactstrap";
import "react-table/react-table.css";
import axios from "axios";
import config from '../config.json';
import Swal from 'sweetalert2'


class displaytable extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            slaves :[],
            currentobj :{ name :'' , slave_address: '' , enable:'',mac :'' , setting:{ baudrate :'',parity:'',stopbits:'',bytesize:'',timeout:''}},
            
            modal: false,
            fade: false ,
            deleteindex : '',
            editindex :'',
            loading : false
         }
         this.toggle = this.toggle.bind(this);
         this.confirmDelete = this.confirmDelete.bind(this);
    }
    

    toggle = event => {
      this.setState({editindex :event.currentTarget.value} , function() { this.getOneSlavesData()})
    }

    

    confirmDelete = event => {
      
      this.setState({ deleteindex :event.currentTarget.value} , 
        function() { 
          Swal.fire({
            title: 'Are you sure?',
            text: 'Delete this Slave ?'+ this.state.deleteindex,
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

  async getOneSlavesData()
  {
    
    if(this.state.editindex)
    {
      await axios.get(config.slaveApiEndpiont+this.state.editindex+'/')
      .then((response) => {
      
      this.setState({currentobj:response.data});
      });

    }
    this.setState({modal: !this.state.modal});
   
   
     
  } 

   
  async getSlavesData()
    {
       
        await axios.get(config.slaveApiEndpiont)
                .then((response) => {
                //console.log(response.data);
                //console.log(response.status);
                //console.log(response.statusText);
                //console.log(response.headers);
                //console.log(response.config);
                this.setState({slaves:response.data});
        });
       
       
    } 
    componentDidMount() {
        
        this.getSlavesData();
      
    }
    
    handleSlaveChange = ({currentTarget:input}) =>{
      const currentobj ={...this.state.currentobj};
      currentobj[input.name] = input.value;
      this.setState({currentobj})
      
      
    }
    handleSlaveSettngChange = ({currentTarget:input}) =>{
      const currentsetting =this.state.currentobj;

      let setCopy = this.state.currentobj.setting;
      
      setCopy[input.name]=input.value;
      currentsetting.setting = setCopy;
      this.setState({currentsetting});
      
    }
    
    
    handleUpdate = event => {
      event.preventDefault();
      this.toggle.bind(null)
      const headers = {'Content-Type': 'application/json',}
      const updateslave = JSON.stringify({...this.state.currentobj})
     
     
      axios.put(config.slaveApiEndpiont+this.state.editindex+'/',updateslave , {headers: headers})
        .then(res => {
          this.setState({modal: !this.state.modal});
          this.setState({...this.state.slaves});
          
        })
        .catch((error) => {console.log(error);})  

          
    }

    handleDelete () {
      
      const headers = {'Content-Type': 'application/json',}
       
      axios.delete(config.slaveApiEndpiont+this.state.deleteindex+'/', {headers: headers})
     .then(res => {
          this.setState({...this.state.slaves});
        
        })
     .catch((error) => {console.log(error);})  

     
    }  

    render() { 
        return ( 
        <div>
          <Modal isOpen={this.state.modal} fade={this.state.fade } toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Slave</ModalHeader>
        <ModalBody>
          <Form>
            <Input type="hidden" name="id" id="id"  />
            <FormGroup>
              <Label for="name">Slave Name</Label>
              <Input
                type="text"
                name="name"
                value = {this.state.currentobj.name}
                onChange={this.handleSlaveChange} 
                
              />
            </FormGroup>
            <FormGroup>
              <Label for="designation">Slave Address</Label>
              <Input
                type="text"
                name="slave_address"
                value= { this.state.currentobj.slave_address}
                onChange={this.handleSlaveChange} 
               
              />
            </FormGroup>
            <FormGroup>
              <Label for="enable">Enable</Label>
              <Input type="select" name="enable"  value={ this.state.currentobj.enable}  onChange={this.handleSlaveChange} >
                  <option>true</option>
                  <option>false</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="baudrate">Baudrate</Label>
                <Input type="select" name="baudrate" value={this.state.currentobj.setting.baudrate} onChange={this.handleSlaveSettngChange}>
                  <option>9600</option>
                  <option>19200</option>
                  <option>38400</option>
                  <option>115200</option>
                  <option>4800</option>
                                            
               </Input>
            </FormGroup>
            <FormGroup>
              <Label for="parity">Parity</Label>
              <Input type="select" name="parity"  value={this.state.currentobj.setting.parity } onChange={this.handleSlaveSettngChange}>
                  <option>E</option>
                  <option>O</option>
                  <option>N</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="stopbits">Stopbits</Label>
              <Input type="text" name="stopbits"  value={this.state.currentobj.setting.stopbits } onChange={this.handleSlaveChange} />
            </FormGroup>
            <FormGroup>
              <Label for="bytesize">Bytesize</Label>
              <Input type="text" name="bytesize" value={this.state.currentobj.setting.bytesize } onChange={this.handleSlaveChange} />
            </FormGroup>
            <FormGroup>
              <Label for="timeout">Timeout</Label>
              <Input type="text" name="timeout"  value={this.state.currentobj.setting.timeout } onChange={this.handleSlaveChange} />
            </FormGroup>
            <FormGroup>
              <Label for="mac">MAC</Label>
              <Input type="text" name="mac" defaultValue={this.state.currentobj.mac } onChange={this.handleSlaveChange} />
            </FormGroup>
            <FormGroup>
             
              <Button
                color="secondary"
                className="ml-1"
                onClick={this.handleUpdate}
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
        <Card>
            <CardTitle className="mb-0 p-3 border-bottom bg-light">
                <i className="mdi mdi-border-right mr-2"></i>List of Slaves
            </CardTitle>
            <CardBody>
                <ReactTable
                    columns={[
                    
                    {
                        Header: "Slave Name",
                        accessor: "name",
                       
                    },
                    {
                        Header: "Address ",
                        accessor: "slave_address",
                        width: 50
                    },
                    {
                        id:  'enable',
                        Header: "Enable",
                        accessor: d => d.enable.toString(),
                        width: 70
                    },
                    {
                        Header: "Baudrate",
                        accessor: "setting.baudrate",
                        width: 100
                    },
                    {
                        Header: "Parity",
                        accessor: "setting.parity",
                        width: 70
                    },

                    {
                        Header: "Stopbits",
                        accessor: "setting.stopbits",
                        width: 70
                    },

                    {
                        Header: "Bytesize",
                        accessor: "setting.bytesize",
                        width: 70
                    },
                    {
                        Header: "Timeout",
                        accessor: "setting.timeout",
                        width: 70
                    },
                    {
                        Header: "MAC",
                        accessor: "mac",
                    },
                    {
                        Header: "Actions",
                        Cell: ({ original }) => (
                          
                            <div className="text-center">
                                <Button
                                    onClick={this.toggle}
                                    color="inverse"
                                    size="sm"
                                    round="true"
                                    icon="true"
                                    value ={original.job_id}
                                    
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
                      Cell: ({ original }) => (
                          <div className="text-center">
                             <Button 
                              onClick={this.confirmDelete}
                              color="inverse"
                              size="sm"
                              round="true"
                              //icon="true"
                              value ={original.job_id}
                              
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
                    data={this.state.slaves}
                    loading = {this.state.loading}
                    //filterable
                />
            </CardBody>
         </Card>
         </div>
         );
    }
}
 
export default displaytable;