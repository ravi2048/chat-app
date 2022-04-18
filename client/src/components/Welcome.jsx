import React from 'react';
import styled from "styled-components";
import Robot from "../assets/robot.gif"

const Welcome = ({currentUser}) => {
    return(
        <>
            <Container>
                <img src={Robot} alt="robot"/>
                <h1>Hey <span>{currentUser.username}</span></h1>
                <h3>Select a User to start Chatting</h3>
            </Container> 
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: white; 
    img {
        height: 20rem;
    }
`;
export default Welcome;