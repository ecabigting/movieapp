import React from 'react';
import { Link } from 'react-router-dom';
// load svg files from image folder
import MovieAppLogo from '../../images/movieapp_logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';
// load the styled components
import { Wrapper, Content, AppLogoImg, TMDBLogoImg } from './Header.styles';

// build the component as an arrow function
const Header = () => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <AppLogoImg src={MovieAppLogo} alt='MovieAppLogo'/>
            </Link>
                <TMDBLogoImg src={TMDBLogo} alt='The Movie DB Logo'/>
        </Content>
    </Wrapper>
);

//export the component
export default Header;