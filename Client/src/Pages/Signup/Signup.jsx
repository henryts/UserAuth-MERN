import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignupUser } from "../../apicalls/users";

const Signup = () => {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onsubmit = async (data) => {
    const response = await SignupUser(data);
    if (response.success) {
      navigate('/login')
    }
  }
    return (
      <>
        <Container>
          <Row className="justify-content-md-center mt-5">
            <Col xs={12} md={6} className="card p-5">
              <h1>REGISTER</h1>
              <Form onSubmit={handleSubmit(onsubmit)}>
                <Form.Group controlId="name" className="my-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a username"
                    {...register("name", { required: true })}
                  ></Form.Control>
                  {errors.name && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </Form.Group>
                <Form.Group controlId="email" className="my-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter a valid email"
                    {...register("email", { required: true })}
                  ></Form.Control>
                  {errors.email && (
                    <span style={{ color: "red" }}>Enter a valid email</span>
                  )}
                </Form.Group>
                <Form.Group controlId="phone" className="my-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your number"
                    {...register("mobile", {
                      required: true,
                      minLength: 10,
                      maxLength: 10,
                    })}
                  ></Form.Control>
                  {errors.mobile && (
                    <span style={{ color: "red" }}>
                      you must be type 10-digit number
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="password" className="my-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter a password"
                    {...register("password", { required: true, minLength: 8 })}
                  ></Form.Control>
                </Form.Group>
                {errors.password && (
                  <span style={{ color: "red" }}>
                    Enter at least 8 characters Password
                  </span>
                )}
                <Form.Group controlId="confirm-password" className="my-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your Password"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) => value === watch("password"),
                    })}
                  ></Form.Control>
                  {errors.confirmPassword && (
                    <span style={{ color: "red" }}>Passwords do not match</span>
                  )}
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                  Register
                </Button>
                <Row className="py-3">
                  <Col>
                    Already have an account? <Link to="/login">LogIn</Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  };


export default Signup;
