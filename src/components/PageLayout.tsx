/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import { Nav } from 'react-bootstrap';

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props: any) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <Navbar bg="light" variant="light" className="navbarStyle">
                <Navbar.Brand href="/">
                    Microsoft Identity Platform
                </Navbar.Brand>
                {isAuthenticated ?
                    <Nav variant='light'>
                        API Version: 1.0
                    </Nav>
                    : <></>
                }
                <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
                <Nav>
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                </Nav>
            </Navbar>
            <h5>
                <center>Welcome to the Microsoft Authentication Library For Javascript - React Quickstart</center>
            </h5>
            <br />
            <br />
            {props.children}
        </>
    );
};