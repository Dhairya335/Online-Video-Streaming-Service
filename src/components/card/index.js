/* eslint-disable react/prop-types */
import React,{ useState, useContext, createContext } from 'react';
import { Container, Group, Title, SubTitle, Text, Feature, 
FeatureTitle, FeatureText, FeatureClose, Maturity, Content, 
Meta, Entities, Item, Image} from "./styles/card";

// we gonna need a context so when we clcik the card we get a dropdown  say context card itself
export const FeatureContext = createContext();

export default function Card({ children, ...restProps}) {
    // we want more information abt the feature so when we click it
    // Eg.whether the film or series is maturity content 15, 18, 13+
    const [showFeature, setShowFeature] = useState(false);
    const [itemFeature, setItemFeature] = useState({});

    return (
        //
        <FeatureContext.Provider value={{ showFeature, setShowFeature,
            itemFeature, setItemFeature}}> 
            <Container {...restProps}>{children}</Container>
        </FeatureContext.Provider>
    );
}

Card.Group = function CardGroup({children, ...restProps}) {
    return <Group {...restProps}>{children}</Group>
}

Card.Title = function CardTitle({children, ...restProps}) {
    return <Title {...restProps}>{children}</Title>
}

Card.SubTitle = function CardSubTitle({children, ...restProps}) {
    return <SubTitle {...restProps}>{children}</SubTitle>
}

Card.Text = function CardText({children, ...restProps}) {
    return <Text {...restProps}>{children}</Text>
}

Card.Entities = function CardEntities({children, ...restProps}) {
    return <Entities {...restProps}>{children}</Entities>
}

// for stiring the maturity content like description abt 18+,15+,13+ content
Card.Meta = function CardMeta({children, ...restProps}) {
    return <Meta {...restProps}>{children}</Meta>
}

Card.Feature = function CardFeature({children, category, ...restProps}) {
    const { showFeature, setShowFeature, itemFeature } = useContext(FeatureContext);
    
    return showFeature ? (
        <Feature {...restProps}
            src={`/images/${category}/${itemFeature.genre}/${itemFeature.slug}/large.jpg`}>
        
            <Content>
                <FeatureTitle>{itemFeature.title}</FeatureTitle>
                <FeatureText>{itemFeature.description}</FeatureText>
                <FeatureClose onClick={() => setShowFeature(false)}>
                    <img src="/images/icons/close.png" alt="Close" />
                </FeatureClose>

            <Group margin="30px 0" flexDirection="row" alignItems="center">
                <Maturity rating={itemFeature.maturity}>
                    {itemFeature.maturity < 12 ? 'PG' : itemFeature.maturity}
                </Maturity>
                <FeatureText fontWeight="bold">
                    {itemFeature.genre.charAt(0).toUpperCase() + itemFeature.genre.slice(1)}
                </FeatureText>
            </Group>
            {children}
            </Content>
        </Feature>
    ) : null;
}

//this is were we share state
Card.Item = function CardItem({item, children, ...restProps}) {
    const { setShowFeature, setItemFeature } = useContext(FeatureContext);
    return <Item 
    // we use OnClick. 'Item' will be object in firebase
    // for this item in that row, from 5 items if you click on no. 2
    // then you will have information in the form of obj that we pass in
    //then we provide a little dropdown with obj that stores all information.
    onClick={() => {
        setItemFeature(item);
        setShowFeature(true);
    }}
    {...restProps}>{children}</Item>
}

Card.Image = function CardImage({ ...restProps}) {
    return <Image {...restProps}></Image>
}