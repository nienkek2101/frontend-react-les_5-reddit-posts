import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [ dataPosts, setDataPosts ] = useState([]);
    const [ subredditName, setSubredditName ] = useState('');

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
                            <h5>{post.data.title}</h5>
                            <p><Link
                                to={'/subreddit-specification'}
                                onClick={() => setSubredditName(post.data.subreddit.subreddit_name_prefixed)}>
                                {post.data.subreddit}
                            </Link>
                                 | {post.data.num_comments} - {post.data.ups}
                            </p>
                        </li>
                    );
                })}
                {console.log(subredditName)}
            </>
            }
        </>
    );

}

export default Home;

//data.children[0].data.title

