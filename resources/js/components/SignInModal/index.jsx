import React, { useState, useEffect } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function SignInModal(props){
    const [isShow, setIsShow] = useState(false);
    const show = props.show || false;
    useEffect(() => {
        setIsShow(show);
    }, [show]);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => console.log(data, e);
    const onError = (errors, e) => console.log(errors, e);
    
    return (
        <React.Fragment>
            <span onClick={()=>setIsShow(true)}>{props.text}</span>
            <Modal show={isShow} onHide={() => setIsShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={() => console.log("test")}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <input type="submit" className="btn btn-primary w-100 my-2" value="sign in"/>
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default SignInModal;