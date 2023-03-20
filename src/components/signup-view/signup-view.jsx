import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            username,
            password,
            email,
            birthdate
        }

        fetch("https://myflixapi-11d1.onrender.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Card className="mt-2 mb-3" style={{ backgroundColor: "#333", border: "1px solid #AAA" }}>
            <Card.Body>
                <Card.Title className="text-light">Sign up</Card.Title>
                <Form onSubmit={handleSubmit} className="text-light">
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            minLength="5"
                            className="text-light"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            minLength="8"
                            className="text-light"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="text-light"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Birthdate:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthdate}
                            onChange={e => setBirthdate(e.target.value)}
                            required
                            className="text-light"
                        />
                    </Form.Group>
                    <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};