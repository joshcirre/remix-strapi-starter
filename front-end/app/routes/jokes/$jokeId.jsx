import { Link, useLoaderData } from "remix";

export let loader = async ({ params }) => {
    let data = await fetch(`http://localhost:1337/api/jokes/${params.jokeId}`)
        .then(res => res.json());
    if (data.data == null) throw new Error("Joke not found");
    let jokes = data.data;
    return jokes;
};



export default function JokeRoute() {
    const data = useLoaderData(loader);
    return (
        <div>
            <p>Here's your hilarious joke:</p>
            <p>{data.attributes.Content}</p>
            <Link to=".">{data.attributes.Name} Permalink</Link>
        </div>
    );
}
