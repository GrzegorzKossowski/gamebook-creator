import React from 'react';
import styled from 'styled-components';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

interface INotFoundProps {}

const NotFoundStyled = styled.div`
    // put some styles here
`;

const NotFound: React.FC<INotFoundProps> = ({ ...restProps }) => {
    return (
        <NotFoundStyled>
            <Result
                status='404'
                title='404'
                subTitle='Sorry, the page you visited does not exist.'
                extra={
                    <Link to={'/'}>
                        <Button type='primary'>Back Home</Button>
                    </Link>
                }
            />
        </NotFoundStyled>
    );
};

export default NotFound;
