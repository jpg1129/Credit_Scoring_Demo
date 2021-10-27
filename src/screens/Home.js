import withRoot from '../withRoot';
import React from 'react';
import AppAppBar from '../modules/AppAppBar';
import ProductHero from '../modules/ProductHero';


function Home() {
    return (
       <React.Fragment>
        <AppAppBar />
        <ProductHero />
      </React.Fragment>
    )
}

export default withRoot(Home); 