import React from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            style={{ width: '1000px', display: 'block', margin: 'auto' }}
        >
            <Carousel.Item >
                <img
                    src="..\static\images\slide_1.png"
                    alt="First slide"
                    style={{ display: 'block', margin: 'auto' }}
                />
                <Carousel.Caption>
                    <h3 style={{ fontWeight: 'bold' }}><a href="/rothko" style={{ textDecoration: 'none', color: 'inherit' }}>Semantic segmentation with TensorFlow</a></h3>
                    <p style={{ fontWeight: 'bold' }}>Mask R-CNN algorithm aimed to detect and segment shapes in paintings of Mark Rothko</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <img
                    src="..\static\images\slide_2.png"
                    alt="Second slide"
                    style={{ display: 'block', margin: 'auto' }}
                />
                <Carousel.Caption>
                    <h3 style={{ color: 'black', fontWeight: 'bold' }}><a href="/first-project" style={{ textDecoration: 'none', color: 'inherit' }}>Linear regression with sklearn</a></h3>
                    <p style={{ color: 'black', fontWeight: 'bold' }}>Prediction of the number of fire department deployments based on average temperature</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <img
                    src="..\static\images\slide_3.jpg"
                    alt="Third slide"
                    style={{ display: 'block', margin: 'auto' }}
                />

                <Carousel.Caption>
                    <h3 style={{ color: '#444feb', fontWeight: 'bold' }}>Survival Analysis with R</h3>
                    <p style={{ color: '#444feb', fontWeight: 'bold' }}>Coming soon</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}


export default ControlledCarousel;
