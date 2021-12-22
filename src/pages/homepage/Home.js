import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

// function toDotThousand(number) {
//     if (number.length > 12) {
//
//     }
//     if (number.length > 9) {
//
//     }
//     if (number.length > 6) {
//
//     }
//     if (number.length > 3) {
//
//     }
// }


function Home() {
    const [ dataPosts, setDataPosts ] = useState([]);
    const [ error, toggleError ] = useState(false);
    const [ loading, toggleLoading ] = useState(false);
    // const [ subredditName, setSubredditName ] = useState('');

    useEffect(() => {
        async function fetchPosts() {
            toggleError(false);
            toggleLoading(true);
            try {
                const result = await axios.get('https://www.reddit.com/hot.json?limit=15');
                console.log(result.data.data);
                console.log(result.data.data.children[0].data);
                setDataPosts(result.data.data.children)
                // setDataPosts(result.data.data.children);

            } catch(e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        };

        fetchPosts();
    }, []);

    return (
        <>
            {loading && <span>Loading...</span>}
            {error && <span>Er is iets misgegaan</span>}
            {dataPosts &&
            <>
                <h1>Hottest Reddit posts</h1>
                {dataPosts.map((post) => {
                    return (
                        <li key={post.data.title} className="list-wrapper">
                            <h5 className="post-title"><a href={`http://reddit.com/${post.data.permalink}`} target='_blank'>{post.data.title}</a></h5>
                            <p className="subreddit"><Link
                                to={`/subreddit-specification/${post.data.subreddit}`}
                                // onClick={() => setSubredditName(post.data.subreddit.subreddit_name_prefixed)}
                            >{post.data.subreddit}</Link> | {post.data.num_comments.toLocaleString()} comments - {post.data.ups.toLocaleString()} ups
                            </p>
                        </li>
                    );
                })}
            </>
            }
        </>
    );

}

export default Home;

//data.children[0].data.title

