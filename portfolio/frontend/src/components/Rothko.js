import React, { useState, useEffect } from 'react';
import RothkoFirstPost from "./posts/RothkoFirstPost";
import RothkoSecondPost from "./posts/RothkoSecondPost";
import RothkoAboutPost from "./posts/RothkoAboutPost";
import RothkoPersonal from "./posts/RothkoPersonal";
import RothkoRef from "./posts/RothkoRef";
import axios from 'axios';

function Rothko() {
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        axios.get('/api/picture/').then(response => {
            setPictures(response.data);
        });
    }, []);

    return (
        <div>
            <div className="App" style={{ width: "1500px", marginTop: '3rem', marginLeft: '3rem', marginBottom: '3rem', marginRight: '3rem' }}>
                <RothkoFirstPost />
            </div>

            <div className="list-container" style={{ height: "600px", width: "1350px", overflowY: "scroll", marginTop: '3rem', marginLeft: '5rem', marginBottom: '1rem' }}>
                {pictures.map(picture => (
                    <div key={picture.id} style={{ height: '40px', width: '1300px', overflow: 'auto' }}>
                        <dd>{picture.id}. Ref. {picture.picture}, Name: <a href={`/rothko/${picture.picture}`} className="image-link" data-id={picture.id}>{picture.name}</a>, Year: {picture.year}, Collection: {picture.collection}</dd>
                    </div>
                ))}
            </div>
            <div className="App" style={{ width: "1500px", marginTop: '3rem', marginLeft: '3rem', marginBottom: '3rem', marginRight: '3rem' }}>
                <RothkoSecondPost />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
                    <img src="..\static\images\annot.png" alt="annotation" className="img-fluid" style={{ width: "500px", height: "auto" }} />
                </div>
                <RothkoPersonal />
                <RothkoAboutPost />
                <br></br>
                <br></br>
                <br></br>
                < RothkoRef />
                <ul>
                    <li><a href="https://github.com/ahmedfgad/Mask-RCNN-TF2" style={{ color: 'inherit' }}>Mask R-CNN for object detection and instance segmentation on Keras and TensorFlow 2.0 by ahmedfgad</a></li>
                    <li><a href="https://github.com/bnsreenu/python_for_microscopists/tree/master/286-Object%20detection%20using%20mask%20RCNN%20-%20end%20to%20end" style={{ color: 'inherit' }}>286-Object detection using mask RCNN - end to end by bnsreenu</a></li>
                    <li>Anfam, David; Mark Rothko: The Works on Canvas Catalogue Raisonné; National Gallery of Art, Washington, and Yale University Press, New Haven, CT, 1998.</li>
                    <li><a href="https://www.markrothko.org/" style={{ color: 'inherit' }}>markrothko.org</a></li>
                    <li><a href="https://dailyrothko.tumblr.com/" style={{ color: 'inherit' }}>DAILY ROTHKO</a></li>
                    <li><a href="https://www.youtube.com/watch?v=vSiu8qzHV6c" style={{ color: 'inherit' }}>How to paint like Mark Rothko</a> - youtube video</li>
                    <li><a href="https://labelstud.io/" style={{ color: 'inherit' }}>Label Studio</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Rothko;
