import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class IdvPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: null,
            error: null,
            processedImg: null,
            processing: false,
            minScore: 0.5,
            numShapes: null,
            numDisplayedShapes: null,
            imagesToAnalyze: []
        };
    }

    componentDidMount() {
        axios.get(`/api/picture/${this.props.picture}`)
            .then(response => {
                this.setState({ picture: response.data });
            })
            .catch(error => {
                this.setState({ error: error });
            });
    }

    handleScoreChange = (event) => {
        this.setState({ minScore: event.target.value });
    }

    handleDetect = () => {
        this.setState({ processing: true });
        const data = {
            min_score: this.state.minScore
        };
        axios.post(`/api/detect/${this.props.picture}/`, data)
            .then(response => {
                const imgData = response.data.detected_image;
                const numShapes = response.data.num_shapes;
                const numDisplayedShapes = response.data.num_displayed_shapes;
                const analyzedImages = response.data.analyze_images;


                this.setState({
                    processedImg: imgData,
                    processing: false,
                    numShapes: numShapes,
                    numDisplayedShapes: numDisplayedShapes,
                    imagesToAnalyze: analyzedImages
                });

            })
            .catch(error => {
                console.log(error);
                this.setState({ error: error, processing: false });
            });
    }


    renderAnalyzedImages = () => {
        const { imagesToAnalyze } = this.state;

        if (imagesToAnalyze && imagesToAnalyze.length > 0) {
            return (
                <div className="image-grid">
                    {imagesToAnalyze.map((image, index) => {
                        console.log("img:", image);
                        const src = `${image}`;
                        return <img key={index} src={src} alt={`Analyzed Image ${index + 1}`} />;
                    })}
                </div>
            );
        } else {
            return <div>No shapes found</div>;
        }
    };


    render() {
        console.log(this.state.imagesToAnalyze);

        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.picture) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div style={{ marginTop: '2rem', marginLeft: '3rem', marginBottom: '1rem', marginRight: '3rem' }}>
                        <h3>{this.state.picture.picture}. {this.state.picture.name}</h3>
                        <p1>Year: {this.state.picture.year}</p1>
                        <br></br>
                        <p1>Dimensions (cm): {this.state.picture.height} x {this.state.picture.width}</p1>
                        <br></br>
                        <p1>Collection: {this.state.picture.collection}</p1>
                    </div>

                    <div style={{ marginTop: '0rem', marginLeft: '3rem', marginBottom: '1rem', marginRight: '3rem' }}>
                        <Button variant="secondary" size="lg" onClick={this.handleDetect} disabled={this.state.processing}>
                            {this.state.processing ? 'Processing...' : 'Detect'}
                        </Button>
                    </div>
                    <div style={{ marginTop: '0rem', marginLeft: '3rem', marginBottom: '0rem', marginRight: '3rem' }}>
                        <div className="form-group">
                            <label htmlFor="minScore">Minimum Score</label>
                            <br></br>
                            <input type="range" className="form-control-range" id="minScore" min="0" max="1" step="0.01" value={this.state.minScore} onChange={this.handleScoreChange} />
                            <span>{this.state.minScore}</span>
                        </div>
                    </div>
                    <div className="grid-container">
                        <div className="img-container">
                            <img src={this.state.picture.link} alt={this.state.picture.name} />
                        </div>
                        <div className="img-container-two">
                            <img src={this.state.processedImg} />
                        </div>
                    </div>
                    <div style={{ width: "500px", marginTop: '0rem', marginLeft: '3rem', marginBottom: '1rem', marginRight: '3rem' }}>
                        {this.state.numShapes !== null && (
                            <div>
                                <p>Number of detected shapes: {this.state.numShapes}</p>
                            </div>
                        )}
                        {this.state.numDisplayedShapes !== null && (
                            <div>
                                <p>Number of shapes with scores above set threshold: {this.state.numDisplayedShapes}</p>
                            </div>
                        )}
                        {this.state.imagesToAnalyze.length > 0 && (
                            <div className="App" style={{ width: "500px", marginTop: '2rem', marginLeft: '3rem', marginBottom: '1rem', marginRight: '3rem' }}>
                                {this.renderAnalyzedImages()}
                            </div>
                        )}

                    </div>
                </div>
            );
        }
    }

}

function IdvPictureWrapper() {
    const { picture } = useParams();
    return <IdvPicture picture={picture} />
}

export default IdvPictureWrapper;
