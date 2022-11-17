import React from 'react';
import BrowseContainer from '../containers/browse';
import { UseContent } from '../hooks';
import SelectionFilter from '../utils/selection-filter';

export default function Browse(){

    // we get all the series and films
    // we pass in series and films as target to useContent
    const { series } = UseContent('series');
    // console.log(series);

    const { films } = UseContent('films');
    // console.log(films);

    // we pass series and films as an object so that we can directly get them
    // by key and easily destructure them

    // do not display slides as object
    const slides = SelectionFilter({ series, films });
    // console.log(slides);
    return( 
        <BrowseContainer slides={slides}/>
    );
}
