import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FirstStats() {
    const [inputStats, setInputStats] = useState(null);
    const [outputStats, setOutputStats] = useState(null);

    useEffect(() => {
        // Fetch the initial stats
        fetchStats();

        // Refresh the stats
        const intervalId = setInterval(fetchStats, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    const fetchStats = () => {
        axios.get('/api/stats/')
            .then(response => {
                console.log('Response:', response.data);
                setInputStats(response.data.input_stats);
                setOutputStats(response.data.output_stats);
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            {inputStats && (
                <div>
                    <h4>Input Statistics:</h4>
                    <ul>
                        <li>Mean: {inputStats.mean.toFixed(2)}</li>
                        <li>Median: {inputStats.median.toFixed(2)}</li>
                        <li>Mode: {inputStats.mode.toFixed(2)}</li>
                    </ul>
                </div>
            )}
            {outputStats && (
                <div>
                    <h4>Output Statistics:</h4>
                    <ul>
                        <li>Mean: {outputStats.mean.toFixed(2)}</li>
                        <li>Median: {outputStats.median.toFixed(2)}</li>
                        <li>Mode: {outputStats.mode.toFixed(2)}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FirstStats;
