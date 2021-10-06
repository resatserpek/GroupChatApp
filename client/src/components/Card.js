import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 10px 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;

    h4{
        margin: 5px 0px;
    }
    &:hover{

        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }



`
const ImageContainer = styled.div`
    flex: 0.3;
    display: flex;
    justify-content: center;
`

const Image = styled.img`

  width: 60%;
  height: auto;
`;

const InfoContainer = styled.div`
    flex: 0.7;
`

function Card(props) {
    const { room } = props
    let history = useHistory();

    const goRoom = (id) => {
        history.push(`/room/${id}`)
    }
    return (
        <Container>
            <ImageContainer>
                <Image src={`https://avatars.dicebear.com/api/identicon/${uuidv4()}.svg`}/>
            </ImageContainer>
            <InfoContainer>
            <div onClick={() => goRoom(room._id)}>
                <h4>{room.name}</h4>
                <p>{room.description}</p>
                <small>{room.createdAt}</small>
            </div>
            </InfoContainer>
        </Container>
    )
}

export default Card

