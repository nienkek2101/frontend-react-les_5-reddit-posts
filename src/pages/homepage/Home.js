import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    // const [ subredditName, setSubredditName ] = useState('');

    useEffect(() => {
        async function fetchPosts() {
            try {
                const result = await axios.get('https://www.reddit.com/hot.json?limit=15');
                console.log(result.data.data);
                console.log(result.data.data.children[0].data);
                setDataPosts(result.data.data.children)
                // setDataPosts(result.data.data.children);

            } catch(e) {
                console.error(e);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
            {dataPosts &&
            <>
                {dataPosts.map((post) => {
                    return (
                        <li key={post.data.title}>
                            <h5><a href={`http://reddit.com/${post.data.permalink}`} target='_blank'>{post.data.title}</a></h5>
                            <p><Link
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

