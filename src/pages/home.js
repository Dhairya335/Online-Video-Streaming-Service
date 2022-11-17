import React from 'react';
import { FooterContainer } from "../containers/footer";
import { Feature, OptForm } from "../components";
import { FaqsContainer } from "../containers/faqs";
import { JumbotronContainer } from "../containers/jumbotron";
import { HeaderContainer } from "../containers/header"; 

export default function Home(){
    return(
        <>
            <HeaderContainer>
                <Feature>
                    <Feature.Title>
                        Unlimited films, TV programmes and more.
                    </Feature.Title>
                    <Feature.SubTitle>
                        Watch anywhere. Cancel at any time.
                    </Feature.SubTitle>

                    <OptForm>
                    <OptForm.Text>
                        Ready to watch? Enter your email to 
                        create or restart your membership
                    </OptForm.Text>
                    <OptForm.Input placeholder="Email address"></OptForm.Input>
                    <OptForm.Button>Get Started</OptForm.Button>
                </OptForm>
                </Feature>
            </HeaderContainer>
            <JumbotronContainer/>
            <FaqsContainer/>
            <FooterContainer/>
        </>
    )
}
