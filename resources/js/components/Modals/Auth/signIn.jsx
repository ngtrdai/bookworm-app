import { useState, useEffect } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';


function SignIn(props){
    const [isShow, setIsShow] = useState(false);
    const show = props.show || false;
    useEffect(() => {
        setIsShow(show);
    }, [show]);

    return (
        <>
            <span onClick={()=>setIsShow(true)}>{props.text}</span>
            <Modal show={isShow} onHide={() => setIsShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" />
                            </div>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignIn;