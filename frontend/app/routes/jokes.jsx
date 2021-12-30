import { Link, Outlet, useLoaderData } from "remix";

import stylesUrl from "../styles/jokes.css";

export const loader = async () => {
    const qs = require('qs');

    const query = qs.stringify({
        pagination: {
            start: 0,
            limit: 5,
        },
        sort: ['createdAt:desc'],
    }, {
        encodeValuesOnly: true,
    });

    let data = await fetch(`http://localhost:1337/api/jokes?${query}`)
        .then(res => res.json());
    let jokes = data.data
    return jokes;
};

export function links() {
    return [
        {
            rel: "stylesheet",
            href: stylesUrl
        }
    ];
}

export default function JokesRoute() {
    const jokes = useLoaderData(loader);

    return (
        <div className="jokes-layout">
            <header className="jokes-header">
                <div className="container">
                    <h1 className="home-link">
                        <Link
                            to="/"
                            title="Remix Jokes"
                            aria-label="Remix Jokes"
                        >
                            <span className="logo">🤪</span>
                            <span className="logo-medium">J🤪KES</span>
                        </Link>
                    </h1>
                </div>
            </header>
            <main className="jokes-main">
                <div className="container">
                    <div className="jokes-list">
                        <Link to=".">Get a random joke</Link>
                        <p>Here are a few more jokes to check out:</p>
                        <ul>
                            {jokes.map(joke => (
                                <li key={joke.id}>
                                    <Link to={joke.id.toString()}>{joke.attributes.Name}</Link>
                                </li>
                            ))}
                        </ul>
                        <Link to="new" className="button">
                            Add your own
                        </Link>
                    </div>
                    <div className="jokes-outlet">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
