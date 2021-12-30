import { useLoaderData, Link } from "remix";

export const loader = async () => {
    const data = await fetch(`http://localhost:1337/api/jokes/`)
        .then(res => res.json());
    const count = data.meta.pagination.total;
    const randomRowNumber = Math.floor(Math.random() * count);
    const randomJoke = data.data[randomRowNumber];
    return randomJoke;
}


export default function JokesIndexRoute() {
    const data = useLoaderData(loader);

    return (
        <div>
            <p>Here's a random joke:</p>
            <p>{data.attributes.Content}</p>
            <Link to={data.id.toString()}>
                "{data.attributes.Name}" Permalink
            </Link>
        </div>
    );
}
