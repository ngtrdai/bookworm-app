import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

function AlertCustom({variant, message, timeShow=3000}){
    const [show, setShow] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            window.location.reload();
        }, timeShow);
        return () => clearTimeout(timer);
    }, []);

    if (!show) {
        
        return null;
    }

    return (
        <Alert variant={variant} key={variant}>
            {message}
        </Alert>
    );
}

export default AlertCustom;