//Developed by Urvishkumar Jariwala (SID - 8962495)

import React, { useEffect } from "react";

const Toast = ({ message, onClose }) => {
    //auto-hide toast after delay
    useEffect(() => {
        const timer = setTimeout(onClose, 1500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="custom-toast">
            {message}
        </div>
    );
};

export default Toast;
