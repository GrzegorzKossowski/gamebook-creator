import React from 'react';
import styled from 'styled-components';
import { Button, Typography, Row, Col, ColProps, Space } from 'antd';
import ModalNewGameBook from 'components/ModalNewGamebook';

interface HomePageProps {}
const { Text, Title } = Typography;

const HomePageStyled: React.FC<ColProps> = styled(Col)`
    // put some styles here
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const HomePage: React.FC<HomePageProps> = () => {
    const [isModalNewGameVisible, setIsModalNewGameVisible] =
        React.useState(false);
    const handleShowNewGameBookModal = () => {
        setIsModalNewGameVisible(true);
    };
    const year = new Date().getFullYear();

    return (
        <>
            <Row justify='center'>
                <HomePageStyled>
                    <Title level={1}>GameBook Creator</Title>
                    <Text style={{ marginBottom: '1rem' }}>
                        A gamebook is a work of printed fiction that allows the
                        reader to participate in the story by making choices.
                    </Text>
                    <Text style={{ marginBottom: '2rem' }}>
                        &copy; Grzegorz Kossowski 2022{' '}
                        {year > 2022 && `- ${year}`}
                    </Text>
                    <Row style={{ width: '100%' }} justify='center'>
                        <Col>
                            <Space direction='vertical' size='middle'>
                                <Button
                                    block
                                    onClick={handleShowNewGameBookModal}
                                >
                                    New
                                </Button>
                                <Button block disabled>
                                    Open
                                </Button>
                                <Button block disabled>
                                    Import (*.gbf)
                                </Button>
                                <Button block disabled>
                                    Docs
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </HomePageStyled>
            </Row>
            {/* Modals */}
            <ModalNewGameBook
                isVisible={isModalNewGameVisible}
                setIsVisible={setIsModalNewGameVisible}
            />
        </>
    );
};
