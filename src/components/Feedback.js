import React, { Component } from 'react';
import { Header, Image, Table, Icon, Divider, Button} from 'semantic-ui-react'
import FeedbackForm from './FeedbackForm';
import axios from 'axios';
class Feedback extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/feedbacks/all')
            .then(Response => Response.json())
            .then(res => {
                console.log(res);
                this.setState({
                    isLoaded: true,
                    items: res,
                });
            })
            .catch(error => {
                console.log(error)
            })
        // axios.get('http://localhost:8080/feedbacks/all')
        //     // .then(Response => Response.json())
        //     .then(res => {
        //         console.log(res);
        //         this.setState({
        //             isLoaded: true,
        //             items: res,
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    changeFormView=()=>{
        if(!this.state.showForm){
            this.setState({
                showForm:true
            })
        }else{
            this.setState({
                showForm:false
            })
        }
    }
    render() {
        var { isLoaded } = this.state;
        if (!isLoaded) {
            console.log(this.props);
            return (<div>Loading....
                <br />
            </div>
            )
        } else {
            return (
                <div>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='users' circular />
                        <Header.Content>Feedback</Header.Content>
                    </Header>
                    <Image centered size='large' src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
                    <br />
                    <Divider horizontal>The list of all the feedbacks</Divider>
                    <br />
                    <div className="ui one column stackable center aligned page grid">
                        <Table basic='very' celled collapsing>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Hotel Name</Table.HeaderCell>
                                    <Table.HeaderCell>Rating</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>{
                                this.state.items.map((dynamicData,key) => 
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' image>
                                            <Image src='https://react.semantic-ui.com/images/avatar/small/lena.png' rounded size='mini' />
                                            <Header.Content>
                                                {dynamicData.hotelName}
              <Header.Subheader>{dynamicData.hotelDescription.hotelDescription}</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{dynamicData.reviews[0].rating}</Table.Cell>
                                </Table.Row>
                                )
                            }
                            </Table.Body>
                        </Table>
                        
                    </div>
                    <br/>
                    <br/>
                    <Button color='teal' content='Give New Feedback' icon='add' onClick={this.changeFormView} labelPosition='left' />
                    <br/>
                    <br/>
                    {(this.state.showForm)? <FeedbackForm/>:null}
                </div>
            );
        }
    }
}

export default Feedback;