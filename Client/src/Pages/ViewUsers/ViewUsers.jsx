import { useEffect, useState } from "react";
import { Table, Button, Container, Row } from "react-bootstrap";
import { DeleteUser, GetAllUsers } from "../../apicalls/admin";
import { FaSearch } from "react-icons/fa";
import AdminHeader from "../../Components/adminHeader/adminHeader";
import UserEditModal from "../../Components/Modal/UserEditModal";
import UserAddModal from "../../Components/Modal/UserAddModal";
import { toast, ToastContainer } from "react-toastify";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [save, setSave] = useState(false);
  const [add, setAdd] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);


  const saved = () => {
    setSave(!save);
    toast.success("User Details Updated Successfully");
  };
  const added = () => {
    setAdd(!add);
    toast.success("User Added Successfully");
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await GetAllUsers();
        setUsers(users);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [save, added, isDeleted]);
  const deleteUser = async (data) => {
    console.log(data);
    const response = await DeleteUser(data._id);
    if (response.success) {
      setIsDeleted(true);
      toast.success(response.message);
    }
  };
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const handlAddUser = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };


  const filteredUsers = users.filter((user) => {
    if (searchValue === "") {
      return true;
    } else if (
      user?.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      user?.mobile?.toLowerCase().includes(searchValue.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return (
    <>
      <AdminHeader />
      <Container>
        <Row className="justify-content-md-center mt-5">
          <div className="productSearch">
            <div className="input">
              <input
                type="text"
                placeholder="Search Users..."
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>
            <div className="searchAction">
              <FaSearch color="#ffffff"></FaSearch>
            </div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.mobile}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEditUser(user)}
                        style={{ marginRight: "10px" }}
                      >
                        Edit User
                      </Button>

                      <Button
                        variant="primary"
                        onClick={() => {
                          toast.warning(
                            <div>
                              <p>Are you sure you want to delete this user?</p>
                              <div>
                                <button
                                  onClick={() => deleteUser(user)}
                                  style={{ marginRight: "1rem" }}
                                >
                                  Yes
                                </button>
                                <button onClick={toast.dismiss()}>No</button>
                              </div>
                            </div>,
                            {
                              autoClose: false,
                            }
                          );
                        }}
                      >
                        Delete User
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Row>
        <Button variant="primary" onClick={() => handlAddUser()}>
          Add User
        </Button>
      </Container>
      {showAddModal && (
        <UserAddModal handleAddCloseModal={handleCloseAddModal} added={added} />
      )}
      {showModal && (
        <UserEditModal
          user={selectedUser}
          handleCloseModal={handleCloseModal}
          saved={saved}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default ViewUsers;
