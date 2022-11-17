/* eslint-disable react/prop-types */
import React, { useState, useContext, createContext } from "react";
import { Container, Button, Overlay, Inner } from "./styles/player";
import ReactDOM from "react-dom";

export const PlayerContext = createContext();

export default function Player({ children, ...restProps}){
    const [showPlayer, setShowPlayer] = useState(false);

    return  <PlayerContext.Provider value={{showPlayer, setShowPlayer}}>
                <Container {...restProps}>{children}</Container>
            </PlayerContext.Provider>
}

Player.Video = function PlayeVideo({src, ...restProps}){
    const {showPlayer, setShowPlayer} = useContext(PlayerContext);

    return showPlayer ? ReactDOM.createPortal(
        <Overlay onClick={()=> setShowPlayer(false)}>
            <Inner {...restProps}>
                <video id="netflix-player" controls>
                    <source src={src} type="video/mp4"/>
                </video>
            </Inner>
        </Overlay>,
        //in create portal the last element you have to tell where u want it to go
        //so basically where to inject the data, here body
        document.body 
    ) : null;
}

Player.Button = function PlayerButton({...restProps}){
    const {showPlayer, setShowPlayer} = useContext(PlayerContext);

    return <Button onClick={() => setShowPlayer((showPlayer) => !showPlayer)} {...restProps}>
        Play
    </Button>
}