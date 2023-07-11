import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../Features/AdminAuthaslice";
import { toast,ToastContainer } from "react-toastify";

const AdminHeader = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    dispatch(adminLogout());
    navigate("/admin/login");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/admin" style={{textDecoration:'none'}}>DASHBOARD</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Dropdown align="end">
                <Dropdown.Toggle  id="profile-dropdown">
                  Services
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>{navigate('/admin/view-users')}}>
                    <FaUser /> 
                    View Users
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate('/admin/add-users')}}>
                    <FaUser />
                    Add Users
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="profile-dropdown">
                  <FaUser />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>
                    toast.warning(
                      <div>
                        <p>Are you sure you want to logout?</p>
                        <div>
                          <button
                            onClick={() => handleLogout()}
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
                    )
                  }>
                    <FaSignOutAlt />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer/>
    </>
  );
};

export default AdminHeader;
