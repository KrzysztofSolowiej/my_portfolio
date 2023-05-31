import axios from 'axios';
import React from 'react';

export default class RothkoSecondPost extends React.Component {
    state = { details: [], }

    componentDidMount() {
        let data;
        axios.get('http://localhost:8000/api/post/4')
            .then(res => {
                data = res.data;
                this.setState({
                    details: data
                });

            })
            .catch(error => console.error(error))
    }
    render() {
        const { details } = this.state;
        return (
            <div>
                <h4>{details.title}</h4>
                <p style={{ textAlign: 'justify' }}>{details.body}</p>
            </div>
        )
    }
}