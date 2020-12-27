import React, { Component } from 'react';
import {
    Card,
    CardBody,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardTitle, } from "reactstrap";


class Demoextends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            fade: false
        };
        this.toggle = this.toggle.bind(this);
    };
    toggle() {
        console.log("hello");
        this.setState({
            modal: !this.state.modal
        });
        console.log( 'after setState: ', this.state );
    }
    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>Launch</Button>
                <Modal isOpen={this.state.modal} fade={this.state.fade }  toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>                        
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle}>Do Something</Button>{' '}
                        <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
} 
export default Demoextends;