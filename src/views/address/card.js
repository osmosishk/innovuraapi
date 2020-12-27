import React, { Component } from 'react';
import { Card, CardText, 
CardTitle,  Button } from 'reactstrap';

class SlaveCard extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let { job_id,slave_address,name,enable} = this.props.slave;
    if(enable)
    {
        return (
          <div>
              <Card body outline color="success" className="border">
                    <CardTitle>Slave Address : {slave_address}</CardTitle>
                    
                    <CardText>Slave Name :{name}</CardText>
                    <CardText>Status : {enable.toString()}</CardText>
                    <Button color="success" onClick={() => this.props.showSlaveAddress(job_id)}>Add</Button>
                </Card>
          </div>
        )
    }
    else
    {
      return (
        <div>
            <Card body outline color="danger" className="border">
                  <CardTitle>Slave Address : {slave_address}</CardTitle>
                  
                  <CardText>Slave Name :{name}</CardText>
                  <CardText>Status : {enable.toString()}</CardText>
                  <Button color="danger" onClick={() => this.props.showSlaveAddress(job_id)}>Add</Button>
              </Card>
        </div>
      )
    }
  }
}

export default SlaveCard;