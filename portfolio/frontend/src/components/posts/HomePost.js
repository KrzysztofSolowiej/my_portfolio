import axios from 'axios';
import React from 'react';
import ControlledCarousel from "../Carousel";
import NextPost from "./NextPost";
export default class HomePost extends React.Component {
    state = { details: [], }

    componentDidMount() {
        let data;
        axios.get('http://localhost:8000/api/post/3')
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
            <div style={{ marginTop: '2rem', marginLeft: '3rem', marginBottom: '1rem', marginRight: '3rem' }}>

                <h4>{details.title}</h4>
                <p>{details.body}</p>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '7rem', marginBottom: '5rem' }}>
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                        <ControlledCarousel />
                    </div>
                </div>
                <br></br>
                < NextPost />
            </div>
        )
    }
}

