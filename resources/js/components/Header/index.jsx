import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation} from 'react-router-dom';
import { setItemActive } from '../../reducers/header';
import { SignInModal } from '../../components';
import { useEffect, useState } from 'react';
import { userApi } from '../../services';
import IMAGE from '../../../assets';
import "./style.scss"

function Header() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    let itemActive = useSelector(state => state.headerReducer.itemActive);
    itemActive = itemActive ? itemActive : location.pathname.replace('/', '');
    const handleItemClick = (item) => {
        navigate(`/${item}`);
        dispatch(setItemActive(item));
    }

    const noOfCart = useSelector(state => state.cartReducer.cart).length || 0;
    const [isLogin, setIsLogin] = useState(false);
    const [fullname, setFullname] = useState('');

    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem('userLogin'));
        if(userLogin){
            setIsLogin(true);
            setFullname(userLogin.first_name + ' ' + userLogin.last_name);
        }
    }, []);

    const handleLogout = () => {
        const signOut = async () => {
            try {
                const response = await userApi.signOut();
                if(response.status === 200){
                    localStorage.removeItem('userLogin');
                    localStorage.removeItem('token');
                    localStorage.removeItem('isLogin');
                    setIsLogin(false);
                    setFullname('');
                    navigate('/home');
                }
            } catch (error) {
                console.log(error);
            }
        }
        signOut();
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#" className='bookworm__logo'><img className='bookworm__logo__header' src={IMAGE['logo']} /> <span>BOOKWORM</span></Navbar.Brand>
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
                                    className={itemActive === 'cart' ? 'active' : ''}>Cart ({noOfCart})</Nav.Link>
                            {
                                isLogin ?
                                <>
                                    <NavDropdown title={fullname} id="collasible-nav-dropdown">
                                        <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                <Nav.Link><SignInModal text={'SignIn'}/></Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
export default Header;