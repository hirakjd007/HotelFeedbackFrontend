import React, { Component } from 'react';
import { Form, Segment, Grid, Rating } from 'semantic-ui-react'
import axios from 'axios';

const options = [
    { key: 'a', text: 'Vivanta By Taj', value: 'Vivanta By Taj' },
    { key: 'v', text: 'Taj Hotel', value: 'Taj Hotel' },
]
class FeedbackForm extends Component {
    constructor() {
        super();
        this.state = {
            rating: 0,
            name: '',
            comments: '',
            hotelName: ''
        };
    }


    sendReview = (e) => {
        console.log(this.state)
        e.preventDefault();
        const data1 = {
            hotelName: this.state.hotelName,
            hotelDescription: {
                hotelDescription: ''
            },
            reviews: [
                {
                    userName: this.state.name,
                    rating: this.state.rating,
                    comments: this.state.comments
                }
            ]
        };
          axios.post('http://localhost:8080/feedbacks/addfeedback', JSON.stringify(data1),
          {
              headers: {"content-type" : "application/json", "Access-Control-Allow-Origin" : "*"}})
          .then(response => {
              console.log("res:", response)
          })
          .catch(err =>{
              console.log(err)
          })
        }

    handleNameChange = e => this.setState({ name: e.target.value })
    handleCommentChange = e => this.setState({ comments: e.target.value })
    handleSelectChange = (e, { value }) => this.setState({ hotelName: value })
    handlePostChange = (e) => this.setState({ textArea1: e.target.value })
    handleChange = e => this.setState({ rating: e.target.value })
    render() {
        const { rating, value } = this.state
        return (
            <Grid columns='three'>
                <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column textAlign='center' >
                        <Segment >
                            <Form onSubmit={this.sendReview}>
                                <Form.Input fluid label='First name' placeholder='First name' value={this.state.name} onChange={this.handleNameChange} />
                                <Form.Select fluid label='Hotel List' options={options} placeholder='Hotel List' value={value} onChange={this.handleSelectChange} />
                                <div>Rating: {rating}</div>
                                <Form.Input type='range' min={0} max={10} value={rating} onChange={this.handleChange} />
                                <br />
                                <Rating rating={this.state.rating} icon='heart' size='tiny' maxRating={10} />
                                <Form.TextArea label='Comments' placeholder='Please let us know how you feel...' value={this.state.comments} onChange={this.handleCommentChange} />
                                <Form.Checkbox label='I agree to the Terms and Conditions' />
                                <Form.Button color='teal' type='submit'  >Submit</Form.Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
export default FeedbackForm;