import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

import { 
    ControlContainer, 
    VideoContainer, 
    Title, 
    GalleryContainer, 
    StyledVideo, 
    TitleContainer, 
    Container
} from './Room.styled'

import IconButton from "@material-ui/core/IconButton";

import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { Redirect } from "react-router";
import { useAuthState } from "../../contexts/AuthContext";


const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
        return function cleanup() {
            ref.current.srcObject.getTracks()
                .forEach((track) => track.stop());
        };
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;

    const { isAuthenticated } = useAuthState()

    const [mic, setMic] = useState(true)
    const [video, setVideo] = useState(true)


    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
        return function cleanup() {
            userVideo.current.srcObject.getTracks()
            .forEach((track) => track.stop());
        };
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        
        !isAuthenticated
        ?
        <Redirect to="/"></Redirect>
        :
        <Container>
           
            <TitleContainer>
                <Title>{roomID}</Title>
            </TitleContainer>
            <GalleryContainer>
                <VideoContainer>
                    <StyledVideo muted ref={userVideo} autoPlay playsInline />
                </VideoContainer>
                 
                {peers.map((peer, index) => {
                    return (
                        <VideoContainer>
                            <Video key={peer.id} peer={peer} />
                        </VideoContainer>
                    );
                })}
            </GalleryContainer>
            <ControlContainer>
                {
                    mic ? (
                    <IconButton onClick={ () => setMic(false)}>
                        <MicIcon></MicIcon>
                    </IconButton>) : (
                    <IconButton onClick={() => setMic(true)}>
                        <MicOffIcon></MicOffIcon>
                    </IconButton>
                    )
                }
                {
                    video ? (
                    <IconButton onClick={() => setVideo(false)}>
                        <VolumeUpIcon></VolumeUpIcon>
                    </IconButton>
                    ) : (
                    <IconButton onClick={ () => setVideo(true)}>
                        <VolumeOffIcon></VolumeOffIcon>
                    </IconButton>
                    )
                }
                
                
                
            </ControlContainer>
        </Container>
    );
};

export default Room;
