import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UpdateProfile, UploadProfilePic } from "../../apicalls/users";
import { setCredential } from "../../Features/AuthSlice";
import Header from "../../Components/Header/Header";
import { ToastContainer, toast } from 'react-toastify';

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.mobile);
  const [profilePic, setProfilePic] = useState(userInfo.profilePic);
  const [selectedImage, setSelectedImage] = useState(null);


  console.log(profilePic, "llll");
  const [profile, setProfile] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
    console.log('perfetc');
    data.userId=userInfo._id
    const response =await UpdateProfile(data)
    if(response.success) {
        dispatch(setCredential(response.userInfo));
        localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
        toast.success(response.message)
    }

  };

  const imageUpload = async (data) => {
    const formdata = new FormData();
    formdata.append("image", data);
    formdata.append("userId", userInfo._id);
    const response = await UploadProfilePic(formdata);
    if (response.success) {
      dispatch(setCredential(response.userInfo));
      localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
      toast.success(response.message)
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} className="mt-5 d-flex">
            <Col xs={4}>
              <h2>Your Profile</h2>
              <div className="mt-3">
                {}
                <img
                  style={{ width: "150px" }}
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : profilePic
                      ? profilePic
                      : "https://cdn.icon-icons.com/icons2/2468/PNG/512/user_icon_149329.png"
                  }
                  alt="Profile Picture"
                  className="img-fluid"
                />
                <Form.Group controlId="profilePic">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="profilePic"
                    {...register("profilePic")}
                    onChange={(e) =>{ 
                      setProfile(e.target.files[0])
                      setSelectedImage(e.target.files[0])
                    }}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-3"
                  onClick={() => imageUpload(profile)}
                >
                  Change Profile
                </Button>
              </div>
            </Col>

            <Col xs={8}>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: "flex" }}
                className="m-5 "
              >
                <Row>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      {...register("name", { required: true })}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      {...register("email", { required: true })}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <span style={{ color: "red" }}>Enter a valid email</span>
                    )}
                  </Form.Group>
                  <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={phone}
                      {...register("mobile", {
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                      })}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.mobile && (
                      <span style={{ color: "red" }}>
                        You must enter a 10-digit number
                      </span>
                    )}
                  </Form.Group>
                  <Button type="submit" variant="primary" className="mt-3">
                    Save Changes
                  </Button>
                </Row>
              </Form>
            </Col>
          </Col>
        </Row>
      </Container>
      <ToastContainer/>
    </>
  );
};

export default ProfilePage;
