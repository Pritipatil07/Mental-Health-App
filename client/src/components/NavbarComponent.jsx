import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo2.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const NavbarComponent = () => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

    return (
        <div className="bg-customBg flex flex-col items-center py-2 px-3 relative">
            {isAuthenticated ? (
                <Navbar expand="lg" className="w-full">
                    <Container fluid className="flex items-center justify-between">
                        <img src={logo} alt="Logo" className="h-10 w-auto" />

                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                        <Navbar.Collapse id="responsive-navbar-nav" className="flex-grow">
                            <div className="flex justify-center w-full">
                                <Nav className="space-x-8 font-semibold">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/therapist">AI Therapist</Nav.Link>
                                    <Nav.Link as={Link} to="/quiz">Quiz</Nav.Link>
                                    <Nav.Link as={Link} to="/anonymous">Anonymous Sharing</Nav.Link>
                                </Nav>
                            </div>
                        </Navbar.Collapse>

                        <div className="ml-auto">
                            <button
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                className="bg-transparent text-gray-500 hover:text-gray-700 border-0 cursor-pointer focus:outline-none font-semibold"
                            >
                                Logout <FontAwesomeIcon icon={faRightFromBracket} />
                            </button>
                        </div>
                    </Container>
                </Navbar>
            ) : (
                <Navbar expand="lg" className="w-full">
                    <Container fluid className="flex items-center justify-between">
                        <img src={logo} alt="Logo" className="h-10 w-auto" />

                        <div className="ml-auto">
                            <button
                                onClick={() => loginWithRedirect()}
                                className="bg-transparent text-gray-500 hover:text-gray-700 border-0 cursor-pointer focus:outline-none font-semibold"
                            >
                                Login
                            </button>
                        </div>
                    </Container>
                </Navbar>
            )}
        </div>
    );
};


export default NavbarComponent;
