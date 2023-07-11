import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Features/AuthSlice";
import { toast,ToastContainer } from "react-toastify";


const Header = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.auth);
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    dispatch(logout());
    navigate('/login')
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to={"/"}>Management</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="profile-dropdown">
                    {userInfo?userInfo.name:'Account'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{
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
                    }}>
                      <FaSignOutAlt />
                      Logout
                    </Dropdown.Item>
                    <Dropdown.Item onClick={()=>navigate('/profile')}>
                      <FaUser />
                      Profile
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to={"/login"}>
                  <FaSignInAlt />
                  LogIn
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer/>
    </>
  );
};

export default Header;
