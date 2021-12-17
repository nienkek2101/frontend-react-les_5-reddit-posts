import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function SubredditSpecification() {
    const [ dataSubreddit, setDataSubreddit ] = useState([]);
    const { subredditName } = useParams();

    useEffect(() => {

        async function fetchData() {
            try {
                // const result = await axios.get('https://www.reddit.com/r/tumblr/about.json');
                const result = await axios.get(`https://www.reddit.com/r/${subredditName}/about.json`);
                console.log(result);
                setDataSubreddit(result.data.data);

            } catch(e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <h1>{dataSubreddit.display_name_prefixed}</h1>
            <p>Title: {dataSubreddit.public_description}</p>
            <p>Description: </p>
            <p>Number of subscribers: {dataSubreddit.subscribers}</p>
        </>
    );

}

export default SubredditSpecification;