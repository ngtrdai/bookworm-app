import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation} from 'react-router-dom';
import { setItemActive } from '../../../reducers/header';
import SignIn from '../../Modals/SignIn';
import { useState } from 'react';

function Header() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    let itemActive = useSelector(state => state.headerReducer.itemActive);
    itemActive = itemActive ? itemActive : location.pathname.replace('/', '');
    const handleItemClick = (item) => {
        // Handle khi click vào item
        navigate(`/${item}`);
        dispatch(setItemActive(item));
    }
    
    const [isLogin, setIsLogin] = useState(false);
    const [fullname, setFullname] = useState('');

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#">BOOKWORM</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Nav.Link 
                                    onClick={() => handleItemClick('home')}
                                    className={itemActive === 'home' ? 'active' : ''}>Home</Nav.Link>
                            <Nav.Link 
                                    onClick={() => handleItemClick('shop')}
                                    className={itemActive === 'shop' ? 'active' : ''}>Shop</Nav.Link>
                            <Nav.Link 
                                    onClick={() => handleItemClick('about')}
                                    className={itemActive === 'about' ? 'active' : ''}>About</Nav.Link>
                            <Nav.Link 
                                    onClick={() => handleItemClick('cart')}
                                    className={itemActive === 'cart' ? 'active' : ''}>Cart</Nav.Link>
                            {
                                isLogin ?
                                <>
                                    <NavDropdown title={fullname} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                <Nav.Link><SignIn text={'SignIn'}/></Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
export default Header;