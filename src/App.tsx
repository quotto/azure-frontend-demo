import React, { useState } from 'react';
import './styles/App.css';
import { PageLayout } from './components/PageLayout';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import Button from 'react-bootstrap/Button';
import { MSAL_CONFIG, loginRequest } from './AuthModule';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';
import { Col, Container, Row } from 'react-bootstrap';
import { SignInButton } from './components/SignInButton';
import { AttendanceTable } from './components/AttendanceTable';
import { DateHeader } from './components/DateHeader';
import { AuthorizedMainContent } from './components/AuthorizedMainContent';


/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response: any) => setGraphData(response));
            });
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <AuthorizedMainContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <Container>
                    <Row>
                        <Col style={{textAlign: "center"}}>
                            <SignInButton></SignInButton>
                        </Col>
                    </Row>
                </Container>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}