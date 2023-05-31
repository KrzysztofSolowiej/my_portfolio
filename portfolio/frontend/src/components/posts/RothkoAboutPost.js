import axios from 'axios';
import React from 'react';


export default class RothkoAboutPost extends React.Component {
    state = { details: [] };

    componentDidMount() {
        axios
            .get('http://localhost:8000/api/post/6')
            .then((res) => {
                const data = res.data;
                this.setState({
                    details: data,
                });
            })
            .catch(error => console.error(error));
    }

    render() {
        const { details } = this.state;

        return (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5rem' }}>
                <img src="https://i.imgur.com/juZGMHg.jpeg" alt="rothko" className="img-fluid" style={{ width: "300px", height: "auto", marginRight: '2rem' }} />
                <div style={{ flex: 1, flexDirection: 'row' }}>
                    <h4>{details.title}</h4>
                    <p style={{ marginTop: 0, marginBottom: 0, textAlign: 'justify' }}>{details.body}</p>
                </div>
            </div>


        );
    }
}
