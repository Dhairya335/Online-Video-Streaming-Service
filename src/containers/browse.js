/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from "react";
import { SelectProfileContainer } from "./profiles";
import { FooterContainer } from "./footer";
import { FirebaseContext } from "../context/firebase";
import { Loading, Header, Card, Player } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import { Navigate } from "react-router-dom";

export default function BrowseContainer({slides}){ 
    // we pass in empty object for profile because when we pass
    // user then we expect it to be an object
    const [category, setCategory] = useState('series');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [slideRows, setSlideRows] = useState([]);

    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};
    // console.log('hello');
    // console.log(user);
    useEffect(() => {
        console.log('profile displayName', profile.displayName);
        // console.log('count',count);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [profile]);

    useEffect(() => {
        setSlideRows(slides[category])
    },[slides, category]);
    
    // const signout = () => {
    //     firebase.auth().signOut();
    //     console.log("Signout successful");
    // }

    return (
        // we want to show the loading transition from the profile selection to the browse container
        profile.displayName ? (
            <>
                {loading ? <Loading src={user.photoURL}/>
                : <Loading.ReleaseBody/>}
                <Header src="joker1" dontShowOnSmallViewPort>
                    <Header.Frame>
                        <Header.Group>
                            <Header.Logo to={ROUTES.HOME} src={logo} alt='Netflix'/>
                            <Header.TextLink 
                                active={category === 'series'?
                                'true' : 'false'} 
                                onClick={()=>{setCategory('series')}}>
                                    Series
                            </Header.TextLink>
                            
                            <Header.TextLink 
                                active={category === 'films'?
                                'true' : 'false'} 
                                onClick={()=>{setCategory('films')}}>
                                    Films
                            </Header.TextLink>
                        </Header.Group>
                        <Header.Group>
                            <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Header.Search>
                            <Header.Profile>
                                <Header.Picture src={user.photoURL}></Header.Picture>
                                <Header.Dropdown>
                                    <Header.Group>
                                        <Header.Picture src={user.photoURL}></Header.Picture>
                                        <Header.TextLink>{user.displayName}</Header.TextLink>
                                    </Header.Group>
                                    <Header.TextLink onClick={() => {
                                        firebase.auth().signOut().then(() => {
                                        console.log("Signout successful");
                                        });
                                    }}>Sign Out
                                        {/* <Navigate to={ROUTES.SIGN_IN}>Sign Out</Navigate> */}
                                    </Header.TextLink>
                                </Header.Dropdown>
                            </Header.Profile>
                        </Header.Group>
                    </Header.Frame>
                    <Header.Feature>
                        <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
                        <Header.Text>
                            Forever alone is a crowd, failed comedian Arthur Fleck
                            seeks connection as he walks the street of Gotham Cuty.
                            Arthur wears two masks -- the one he paints for his day job
                            as a clown, and the guise he projects in a futile attempt
                            to feel like he is a part of the world around him.
                        </Header.Text>
                        <Header.PlayButton>Play</Header.PlayButton>
                    </Header.Feature>
                </Header>

                <Card>
                    <Card.Group>
                        {slideRows.map((slideItem) => (
                            <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
                                <Card.Title>{slideItem.title}</Card.Title>
                                <Card.Entities>
                                    {slideItem.data.map((item)=> (
                                        <Card.Item key={item.docId} item={item}>
                                            <Card.Image 
                                                src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}>
                                            </Card.Image>
                                            <Card.Meta>
                                                <Card.SubTitle>{item.title}</Card.SubTitle>
                                                <Card.Text>{item.description}</Card.Text>
                                            </Card.Meta>
                                        </Card.Item>
                                    ))}
                                </Card.Entities>
                                <Card.Feature category={category}>
                                    <Player>
                                        <Player.Button/>
                                        <Player.Video src="/videos/bunny.mp4"></Player.Video>
                                    </Player>
                                </Card.Feature>
                            </Card>
                        ))}
                    </Card.Group>
                </Card>
                <FooterContainer />
            </>
        )
            : (<SelectProfileContainer user={user} setProfile={setProfile}/>)
    );
} 