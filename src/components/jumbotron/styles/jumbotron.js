import styled from 'styled-components/macro';   
//macro is basically going to give us name of the components in dev tools

export const Item = styled.div`
    display: flex;
    border-bottom: 8px solid #222;
    padding: 50px 5%;
    color:white;
    overflow: hidden;
`;

export const Inner = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({ direction }) => direction};
    justify-content: space-between;
    max-width: 1100px;
    margin: auto;
    width: 100%;

    @media(max-width: 1000px){          
    flex-direction: column;
    } 
`;
//flex-direction: column will switch the images and text being displayed.
//so in netflix if some text is displayed in left and img on right then this will switch that display reverse
//props is passed for flex-direction will help in switching display directions

export const Container = styled.div``;

export const Pane = styled.div`
    width: 50%;

    @media(max-width: 1000px){
        width: 100%;
        padding: 0 45px;
        text-align: center;
    }
`;

export const Title = styled.h1`
    font-size: 50px;
    line-height:1.1;
    margin-bottom: 8px;

    @media(max-width: 600px){
        font-size: 35px;
    }
`;
export const SubTitle = styled.h2`
    font-size: 26px;
    font-weight: normal;
    line-height: normal;

    @media(max-width: 600px){
        font-size: 18px;
    }
`;

export const Image = styled.img`
    max-width: 100%;
    height: auto;
`;


