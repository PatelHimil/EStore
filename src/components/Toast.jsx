import React, { useEffect } from "react";

const Toast = ({ message, onClose }) => {
    //auto-hide toast after delay
    useEffect(() => {
        const timer = setTimeout(onClose, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="custom-toast">
            {message}
        </div>
    );
};

export default Toast;
