import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

function AlertCustom({variant, message, timeShow=3000, reload=false}){
    const [show, setShow] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            reload ? window.location.reload() : null;
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