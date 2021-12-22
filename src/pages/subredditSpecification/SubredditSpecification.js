import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from "react-router-dom";
import backButton from '../../assets/back.svg';
import './SubredditSpecification.css';

function SubredditSpecification() {
    const [ dataSubreddit, setDataSubreddit ] = useState([]);
    const { subredditName } = useParams();
    const history = useHistory();
    const [ error, toggleError ] = useState(false);
    const [ loading, toggleLoading ] = useState(false);

    function backToHome() {
        history.push('/');
    }

    useEffect(() => {

        async function fetchData() {
            toggleError(false);
            toggleLoading(true);

            try {
                // const result = await axios.get('https://www.reddit.com/r/tumblr/about.json');
                const result = await axios.get(`https://www.reddit.com/r/${subredditName}/about.json`);
                console.log(result);
                setDataSubreddit(result.data.data);

            } catch(e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            {loading && <span>Loading...</span>}
            {error && <span>Er is iets misgegaan</span>}
            <h1>{dataSubreddit.display_name_prefixed}</h1>
            {/*<img src={dataSubreddit.mobile_banner_image} />*/}
            <p>Title: {dataSubreddit.title}</p>
            <p>Description: {dataSubreddit.public_description}</p>
            <p>Number of subscribers: {Object.keys(dataSubreddit).length > 0 && dataSubreddit.subscribers.toLocaleString()}</p>
            {/*<Link to={backToHome}>Terug naar home</Link>*/}
            <button type="button" onClick={backToHome}><img src={backButton} alt="back-button" /> Ga terug</button>

        </>
    );

}

export default SubredditSpecification;