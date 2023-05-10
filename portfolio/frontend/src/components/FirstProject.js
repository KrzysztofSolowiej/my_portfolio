import React from 'react';
import FirstPost from "./posts/FirstPost";
import Predict from "./Predict";
import FirstStats from "./FirstStats";


function FirstProject() {
    return (
        <div className="App" style={{ marginTop: '2rem', marginLeft: '3rem', marginBottom: '1rem', marginRight: '3rem' }}>
            < FirstPost />
            < Predict />
            <div className="container w-50" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <img class="rounded mx-auto d-block" src="https://i.imgur.com/ff0TYsp.png" alt="reg_plot" className="img-fluid" />
            </div>
            <hr></hr>
            < FirstStats />
            <hr></hr>
            <p>You can check the previous iteration of this app made with Flask <a href="http://krsolowiej.pythonanywhere.com/" style={{ color: 'inherit' }}>here</a>.</p>
        </div>
    );
}
export default FirstProject;