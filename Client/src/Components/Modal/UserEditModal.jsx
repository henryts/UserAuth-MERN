import { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import PropTypes from "prop-types";
import { SaveEdit } from "../../apicalls/admin";

const UserEditModal = ({ user, handleCloseModal,saved }) => {
  UserEditModal.propTypes = {
    user: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    saved:PropTypes.func.isRequired
  };
  const editModalShow = useRef();
  const handleOpenBtn = () => {
    editModalShow.current.click();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.id=user._id
      console.log(data);
    const response=await SaveEdit(data)
    if(response.success) {
        saved()
        handleCloseModal(false)
    }
  };
  useEffect(() => {
    handleOpenBtn();
  }, []);
  return (
    <>
      <button
        type="button"
        ref={editModalShow}
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      ></button>
      <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={user ? user.name : ""}
                {...register("name", { required: true })}

              />
              {errors.name && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue={user ? user.email : ""}
                {...register("email", { required: true })}

              />
              {errors.email && (
                <span style={{ color: "red" }}>Enter a valid email</span>
              )}
            </Form.Group>
            <Form.Group controlId="phone" >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                defaultValue={user ? user.mobile : ""}
                {...register("mobile", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}

              />
              {errors.mobile && (
                <span style={{ color: "red" }}>
                  You must enter a 10-digit number
                </span>
              )}
            </Form.Group>
            <Form.Group controlId="id" className="d-none">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="id"
                defaultValue={user ? user._id : ""}
              />

            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserEditModal;
