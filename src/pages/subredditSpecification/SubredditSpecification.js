import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SubredditSpecification( { subredditName } ) {
    const [ dataSubreddit, setDataSubreddit ] = useState([]);

    useEffect(() => {

        async function fetchData() {
            try {
                const result = await axios.get('https://www.reddit.com/r/tumblr/about.json');
                // const result = await axios.get(`https://www.reddit.com/r/${subredditName}/about.json`);
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
            <p>Number of subscribers: {dataSubreddit.subscribers}</p>
        </>
    );

}

export default SubredditSpecification;