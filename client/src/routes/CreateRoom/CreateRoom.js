
import React from "react";
import { v1 as uuid } from "uuid";
import { logout } from "../../firebase";
import DBService  from '../../services/db.service'


import { Container, MainContainer, SideContainer, Nav, NavContainer, NavItem, NavLogo } from "./CreateRoom.styled";
import Card from '../../components/Card';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuthState } from "../../contexts/AuthContext";
import { Redirect } from "react-router";
import CreateForm from "../../components/CreateForm";

const CreateRoom = (props) => {

    const { user, isAuthenticated } = useAuthState()

    const [rooms, setRooms] = React.useState([])
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    React.useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const res = await DBService.getRooms({signal: controller.signal})
                setRooms(await res.data.data)
            }catch (e) { 
                // Handle fetch error
                console.log(e)
            }
            
        })();
        return () => {
            controller.abort();
        }
    },[])

    return (
        !isAuthenticated
        ?
        <Redirect to="/"></Redirect>
        :
        <Container>
            
            <Nav>
                <NavContainer>
                    
                    <NavLogo>
                        Logo
                    </NavLogo>
                    
                    <NavItem>
                        <AccountCircleIcon/>
                        
                        
                    </NavItem>
                </NavContainer>
            </Nav>
            
            <MainContainer>
                
                {rooms && rooms.map( (room, index) => {
                    return <Card key={room._id} room={room}/>
                })}
                
            </MainContainer>

            <SideContainer>
                <CreateForm></CreateForm>
                {/* <button onClick={logout}>Log out</button> */}
            </SideContainer>   

        </Container>
            

    );
};

export default CreateRoom;