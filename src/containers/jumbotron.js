import React from "react";
import jumboData from "../fixtures/jumbo.json";
import { Jumbotron } from "../components";

//JumbotronPane is used to wrap the contents and switching them using flex-direction
export function JumbotronContainer () {
  return (
    <Jumbotron.Container>
      {jumboData.map((item) => (
        <Jumbotron
          key={item.id}
          direction={item.direction}>
          <Jumbotron.Pane>
            <Jumbotron.Title>{item.title}</Jumbotron.Title>
            <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
          </Jumbotron.Pane>

          <Jumbotron.Pane>
            <Jumbotron.Image src={item.image} alt={item.alt}></Jumbotron.Image>
          </Jumbotron.Pane>
          
          <p>{item.alt}</p>
        </Jumbotron>
      ))}
    </Jumbotron.Container>
  );
}

export default JumbotronContainer;
