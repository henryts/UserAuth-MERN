import React from "react";
import Header from "../../Components/Header/Header";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const {userInfo} = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} className="text-center">
            <h2>Welcome {userInfo && userInfo.name}</h2>
            <Button as={Link} to="/profile" variant="primary" className="mt-3">
              View Your Profile
            </Button>
          </Col>
        </Row>
     
      </Container>
    </>
  );
};

export default Home;