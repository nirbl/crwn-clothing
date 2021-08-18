import React from 'react';
import Directory from '../../components/directory/directory.component.jsx';
//import './homepage.styles.scss';

import { HomePageContainer } from './homepage.styles.jsx';

const HomePage = () => (
  //<div className='homepage'>
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
  //</div>
);

export default HomePage;
