import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function Predict() {
    const [inputValue, setInputValue] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/predict/', { input1: inputValue })
            .then(response => {
                console.log('Response:', response.data);
                setPrediction(response.data.prediction);
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formInput1">
                    <Form.Label>Enter average temperature in degrees Celsius:</Form.Label>
                    <Form.Control type="number" value={inputValue} style={{ width: '100px', marginTop: '0.5rem', marginBottom: '0.5rem' }} onChange={e => setInputValue(e.target.value)} />
                </Form.Group>
                <Button variant="secondary" type="submit">Predict</Button>
            </Form>
            {prediction && <p>The prediction is: {prediction}</p>}
        </div>
    );
}


export default Predict;
