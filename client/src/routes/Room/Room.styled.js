import styled from 'styled-components'

export const Container = styled.div`
    padding: 0px;
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-template-rows: 0.5fr 5fr 0.5fr
`;

export const TitleContainer = styled.div`
    grid-row: 1 / span 1;
    background-color: GhostWhite;
    align-items: flex-start;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
`;

export const Title = styled.h4`
    margin-left: 20px;
`;

export const GalleryContainer = styled.div`
    grid-row: 2 / span 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row; 
    flex-wrap: wrap;
`
export const ControlContainer = styled.div`
    grid-row: 3 / span 1;
    border-style: groove;
    border-width: 1px 0 0 0;
    border-color: GhostWhite;
    background-color: GhostWhite;
    display:flex;
    justify-content: center;
    align-items: center;
`

export const VideoContainer = styled.div`
    flex: 0.5;
    min-width: 40vw;
    align-items: center;
    justify-content: center;
`

export const StyledVideo = styled.video`
    height: auto;
    width: 100%;
`;