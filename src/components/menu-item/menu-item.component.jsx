import React from 'react';
import { withRouter } from 'react-router-dom';
//import './menu-item.styles.scss';
import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle,
} from './menu-item.styles';

//const MenuItem = ({ title, imageUrl, size}) => (
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  //<div className={`${size} menu-item`}>
  /* <div
    className={`${size} menu-item`} */
  <MenuItemContainer
    size={size}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    {/* <div */}
    <BackgroundImageContainer
      className='background-image'
      //style={{ backgroundImage: `url(${imageUrl})` }}
      imageUrl={imageUrl}
    />
    {/*  <div className='content'> */}
    <ContentContainer className='content'>
      {/* <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div> */}
      <ContentTitle>{title.toUpperCase()}</ContentTitle>
      <ContentSubtitle>SHOP NOW</ContentSubtitle>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);
