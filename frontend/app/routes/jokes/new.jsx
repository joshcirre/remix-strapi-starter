import {
    redirect, Form,
    useTransition
} from "remix";;

export const action = async ({ request }) => {
    const form = await request.formData();
    const name = form.get("name");
    const content = form.get("content");

    let jokeData = {
        "data": {
            "Name": name,
            "Content": content
        }
    }

    let newJoke = await fetch(`http://localhost:1337/api/jokes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(jokeData)
    });
    let result = await newJoke.json();
    console.log(result);
    return redirect(`/jokes/${result.data.id}`);
}

export default function NewJokeRoute() {
    const transition = useTransition();

    return (
        <div>
            <p>Add your own hilarious joke</p>
            <Form method="post">
                <fieldset
                    disabled={transition.state === "submitting"}
                >
                    <div>
                        <label>
                            Name: <input type="text" name="name" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Content: <textarea name="content" />
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="button">
                            {transition.state === "submitting"
                                ? "Adding..."
                                : "Add Joke"}
                        </button>
                    </div>
                </fieldset>
            </Form>
        </div>
    );
}
