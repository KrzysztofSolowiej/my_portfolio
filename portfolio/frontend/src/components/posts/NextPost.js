import axios from 'axios';
import React from 'react';

export default class NextPost extends React.Component {
    state = { details: [], }

    componentDidMount() {
        let data;
        axios.get('http://localhost:8000/api/post/9')
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
                <div style={{ textAlign: 'justify' }}>
                    <p >{details.body}</p></div>
            </div>
        )
    }
}