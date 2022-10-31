import React, { useState, useEffect } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { userApi } from '../../services'
import "./style.scss"

function SignInModal(props){
    const [isShow, setIsShow] = useState(false);
    const show = props.show || false;
    useEffect(() => {
        setIsShow(show);
    }, [show]);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        // Sign in sync await
        const signIn = async () => {
            try {
                const response = await userApi.signIn(data);
                if(response.status === 200){
                    localStorage.setItem('userLogin', JSON.stringify(response.user))
                    localStorage.setItem('token', response.access_token)
                    localStorage.setItem('isLogin', true)
                    setIsShow(false)
                    window.location.reload()
                }
            } catch (error) {
                console.log(error);
            }
        }
        signIn();
    }
    
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
                            <input {...register('email')} type="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input {...register('password')} type="password" className="form-control"/>
                        </div>
                        <input onClick={handleSubmit(onSubmit)} type="submit" className="bookworm__signin_button w-100" value="Sign In" />
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default SignInModal;