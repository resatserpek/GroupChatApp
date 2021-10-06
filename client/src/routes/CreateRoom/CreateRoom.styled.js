import styled from "styled-components";


export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-areas: 
        "nav nav nav"
        "main main side"
        "main main side"
        "main main side"
        "main main side"
        "main main side"
        "main main side"
        "main main side"
        "main main side"
        "main main side";
    padding: 0px
`

export const MainContainer = styled.div`
    grid-area: main;
    box-sizing: border-box;
    width: 100%;
    height:100%;
    overflow: hidden;
    padding: 20px;
    padding-bottom: 0px;
`

export const SideContainer = styled.div`
    box-sizing: border-box;
    grid-area: side;
    width: 100%;
    overflow: auto;
    padding: 20px;
    padding-bottom: 0px;
`



export const Nav = styled.div`
    background: linear-gradient(7deg, rgba(255,0,0,1) 0%, rgba(0,80,255,1) 100%);
    width: 100%;
    height: 100%;
    grid-area: nav;
    position:sticky;
`
export const NavContainer = styled.div`
    padding: 0 20px;
    height: 60%;
    display: flex;
    margin: 0;
    position: relative;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
`
export const NavItem = styled.div`
    color: #FDD4D6;
    display:inline-block;
    margin-left: 10px;
    margin-top: 6px;
    border: 2px solid transparent;

    &:hover{
        transition: 0.3s;
        border-bottom: 2px solid #FDD4D6;
    }
`
export const NavLogo = styled.div`
    margin-right: auto;
    margin-top: 6px;
    border: 2px solid transparent;
`