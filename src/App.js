import {
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import './App.css';

import Home from "./pages/homepage/Home";
import SubredditSpecification from "./pages/subredditSpecification/SubredditSpecification";

function App() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName='active-link'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/subreddit-specification/:subredditName" exact activeClassName='active-link'>Subreddit</NavLink>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/subreddit-specification/:subredditName">
                    <SubredditSpecification/>
                </Route>
            </Switch>
        </>
    );
}

export default App;
