import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { useAuthState } from "../contexts/AuthContext"
import dbService from "../services/db.service"


const FormContainer = styled.div`
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    box-sizing: border-box;
    transition: 0.3s;
    padding: 10px;
    border-radius: 8px; 


    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }

    label{
        display: block;
    }

    input[type=text], textarea {
        width:100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
    }
    textarea{
        height: 150px;
        resize: none;
    }
`

const Formfield = styled.div`
    display:block;
`

const Button = styled.input.attrs({
    type: 'submit',
    value: 'CREATE'
})`
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 8px; 
    border: none;
    transition-duration: 0.4s;
    text-font: 2.5em;
    
    &:hover{
        background-color: grey;
        color: white;
    }
`

const CreateForm = (props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const { user } = useAuthState()


    const createRoom = (e) => {

        e.preventDefault()
        const data = { name: name, description: description}
        console.log(data)
        dbService.createRoom(data)
            .then( (res) => {
                alert(res)
            })
            .catch( (e) => {
                alert(e)
            })
    }

    return (
        <FormContainer>
            <form onSubmit={createRoom}>
                <Formfield>
                    <label >
                        Name:
                    </label>
                    <input type="text" name="name" value={name} placeholder="New Room name.." onChange={ (e) => {setName(e.target.value)}}/>

                </Formfield>
                <Formfield>
                    <label>
                        Description:
                    </label>
                    <textarea type="text" name="description" value={description} placeholder="Write something about your new room.." rows="5" onChange={ (e) => {setDescription(e.target.value)}}></textarea>
                </Formfield>
                
                <Button></Button>
                
            </form>
        </FormContainer>
        
    )
}

export default CreateForm;