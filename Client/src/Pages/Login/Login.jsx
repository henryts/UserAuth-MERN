import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginUser } from "../../apicalls/users";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setCredential }from '../../Features/AuthSlice'
const Login = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = async (data) => {
    const response = await LoginUser(data);
    if (response.success) {
      toast.success(response.message);
      localStorage.setItem('token',JSON.stringify(response.accessToken))
      localStorage.setItem('userInfo', JSON.stringify(response.userInfo))
      dispatch(setCredential(response.userInfo))
      navigate('/')
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  })
  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} className="card p-5">
            <h1>LOGIN</h1>
            <Form onSubmit={handleSubmit(onsubmit)}>
              <Form.Group controlId="email" className="my-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                {errors.email && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Form.Group>
              <Form.Group controlId="password" className="my-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                {errors.password && (
                  <span style={{ color: "red" }}>
                    Please enter you password
                  </span>
                )}
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                Log In
              </Button>
              <Row className="py-3">
                <Col>
                  New user? <Link to="/signup">Register</Link>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer/>
    </>
  );
};

export default Login;
