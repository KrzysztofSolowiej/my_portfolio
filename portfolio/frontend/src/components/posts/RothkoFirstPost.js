import axios from 'axios';
import React from 'react';

export default class RothkoFirstPost extends React.Component {
    state = { details: [], }

    componentDidMount() {
        let data;
        axios.get('http://127.0.0.1:8000/api/post/2')
            .then(res => {
                data = res.data;
                this.setState({
                    details: data
                });

            })
            .catch(err => { })
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