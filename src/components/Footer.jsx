//Developed by Vishva Patel (SID - 8987097)

import React from "react";

const Footer = () => {
    return (
        <footer className="enhanced-footer text-center text-light pt-4 pb-3 mt-5">
            <div className="container">
                {/*branding*/}
                <h5 className="text-cyan mb-3">EStore - Electronics Simplified</h5>

                <div className="row text-sm">
                    {/*developer names*/}
                    <div className="col-md-4 mb-2">
                        <strong>Developed By</strong>
                        <ul className="list-unstyled mt-2 small">
                            <li>Himil Patel</li>

                        </ul>
                    </div>

                    {/*used technologies*/}
                    <div className="col-md-4 mb-2">
                        <strong>Resources</strong>
                        <ul className="list-unstyled mt-2 small">
                            <li>React (SPA Architecture)</li>
                            <li>React Router DOM</li>
                            <li>Bootstrap 5 + Bootstrap Icons</li>
                            <li>Responsive Flex/Grid Layout</li>
                            <li>Custom CSS with Glassmorphism</li>
                            <li>Context API (Cart Management)</li>
                            <li>GitHub (Version Control)</li>
                        </ul>
                    </div>

                    {/*contact and copyright*/}
                    <div className="col-md-4 mb-2">
                        <strong>Contact</strong>
                        <p className="small mt-2">patelhimil555@gmail.com<br />© {new Date().getFullYear()} EStore All Right Reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
