import React, { useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

// This component tests config against a local API server:
// https://github.com/auth0-blog/auth0-express-sample
export const ExternalApi = () => {
  const [message, setMessage] = useState("");
  const apiUrl = "http://localhost:3001/api/plaid/"; //process.env.REACT_APP_API_URL;

  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/public-message`);

      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiUrl}/api/private-message`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container className="mb-5">
      <h1>External API</h1>
      <p>
        You use will use a button to call an external API using an access token,
        and the API will validate it using the API's audience value.{" "}
        <strong>This route should be private</strong>.
      </p>
      <ButtonGroup>
        <Button onClick={callApi} color="primary" className="mt-5">
          Get Public Message
        </Button>
        <Button onClick={callSecureApi} color="primary" className="mt-5">
          Get Private Message
        </Button>
      </ButtonGroup>

      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div>{JSON.stringify(message, null, 2)}</div>
        </div>
      )}
    </Container>
  );
};

export default ExternalApi;
