import React from "react";
import { Link } from 'react-router-dom';
// styles
import { Wrapper, Content } from './BreadCrumb.styles'

const BreadCrumb = ({ movieTitle }) => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <span>Home</span>
            </Link>
            <span> &gt; </span>
            <span> { movieTitle } </span>
        </Content>
    </Wrapper>
)

export default BreadCrumb