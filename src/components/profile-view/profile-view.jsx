import { Card, Col } from "react-bootstrap";

export const ProfileView = ({ user }) => {
    const userdata = JSON.parse(user);
    return (
        <Col md={6}>           
            <Card className="mt-2 mb-3">
                <Card.Body>
                    <Card.Title >Your info</Card.Title>
                    <p>Username: {userdata.username}</p>
                    <p>Email: {userdata.email}</p>
                    <p>Birthdate: {userdata.birthdate.substr(0, 10)}</p>
                </Card.Body>
            </Card>
        </Col>
    );
}