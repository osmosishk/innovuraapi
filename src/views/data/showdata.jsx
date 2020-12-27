import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Row,
    Table,
    CardTitle,
    FormGroup ,
    Col,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    UncontrolledDropdown,
    ButtonDropdown,
    Button,
    
    
} from 'reactstrap';
import Datetime from "react-datetime";
import axios from "axios";
import config from '../config.json';
import "./style.css";
import "react-datetime/css/react-datetime.css";

class Showdata extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            data :[],
            tranformeddata :[],
            formsubmited: false
        }
       
        this.getHeader = this.getHeader.bind(this);
       
    }
   

    componentDidMount() {
        
            this.getData();
          
          
    }

      async getData()
      {
         
          await axios.get(config.dataApi+'7/')
                  .then((response) => {
                   this.setState({data:response.data});
          });

         
          this.setState({tranformeddata:this.flatten(this.state.data)})
      } 

 
    
    objectIntoTableData(object) {
        return Object.values(object).map((data, index) => {
            if (index ===1)
            {
                
                return  <td key={index}>{data}</td>;
            }
            else
            {
                var number = parseFloat(data).toFixed(3)
                return  <td key={index}>{number}</td>;      
            }
            
         });
    }

    tableRows(data) {
        return data.map(value => {
          return <tr key={value.index}>{this.objectIntoTableData(value)}</tr>;
        });
       }

   
    
    getHeader()
    {
        
        const getPostKeys = this.state.tranformeddata[0];
        if(getPostKeys)
        {
            const keys=Object.keys(this.state.tranformeddata[0])
            if(keys)
            {
                return keys.map((key, index)=>{return <th key={key}>{key}</th>})
            }

        }
            
    
    }

    flatten(array) {
        var result = [];
        array.forEach(function iter(o) {
            var temp = {},
                keys = Object.keys(o);
             
            if (keys.length > 1) {
                keys.forEach(function (k) {
                  
                    if (k === 'data') {
                       temp=Object.assign(o,o[k])
                       delete o.data;
                    }
                });
                result.push(temp)
                
            }
        });
        
        return result;
    }
   
      

    
    render() { 
        const columns = this.getHeader();  
       

        return ( 
         
            <Row>
                <Card>
                <CardTitle className="bg-light border-bottom p-3 mb-0">
               <Row>

              
                <Col sm="3">
                    <i className="mdi mdi-border-none mr-2"> </i>
                    Data Selection
                    
                </Col>
                <Col sm="3">
                     <ButtonDropdown
                        className="ml-2"
                        
                                >
                                    <DropdownToggle caret size="sm">
                                        Slave
                    </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Slave</DropdownItem>
                                <DropdownItem>Slave</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    
                </Col>
                <Col sm="3">
                 <FormGroup>
                    <Datetime
                    locale="en-gb"
                    inputProps={{ placeholder: "Start From" }}
                    />
                    </FormGroup>

                </Col>
                <Col sm="3">
                <FormGroup>
                    <Datetime
                    locale="en-gb"
                    inputProps={{ placeholder: "End From" }}
                    />
                </FormGroup>
                </Col>
              </Row>
                </CardTitle>
              
                <CardBody className="">
                        
                        <Table responsive>
                            <thead>
                                <tr>
                                   
                                    {columns}
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {this.tableRows(this.state.tranformeddata)}
                             
                            </tbody>
                        </Table>
                       
                    </CardBody>
                </Card>
            </Row>

           
        
         );
    }
}
 
export default Showdata;