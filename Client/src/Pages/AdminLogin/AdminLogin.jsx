import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoginAdmin } from "../../apicalls/admin";
import { setAdminCredential } from "../../Features/AdminAuthaslice";
const AdminLogin = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = async (data) => {
    const response = await LoginAdmin(data);
    if (response.success) {
      toast.success(response.message);
      localStorage.setItem('adminToken',JSON.stringify(response.adminToken))
      localStorage.setItem('adminInfo', JSON.stringify(response.adminCredentials))
      dispatch(setAdminCredential(response.adminCredentials))
      navigate('/admin')
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('adminToken')){
      navigate('/admin')
    }
  })
  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} className="card p-5">
            <h1>ADMIN LOGIN</h1>
            <Form onSubmit={handleSubmit(onsubmit)}>
              <Form.Group controlId="email" className="my-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter email"
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
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLogin;
