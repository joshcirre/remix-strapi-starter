import { useLoaderData } from 'remix';

export const loader = async () => {
    let stores = await fetch('http://localhost:1337/api/stores')
        .then(res => res.json())
    const data = stores.data;
    return data;
}

export default function Index() {
    const stores = useLoaderData(loader);

    return (
        <div>
            <h1>Hello World</h1>
            <ul>
                {stores.map(store => (
                    <li>
                        <h3>{store.attributes.name}</h3>
                        <p>{store.attributes.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
