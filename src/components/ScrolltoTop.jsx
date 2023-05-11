import React, { useState, useEffect } from "react";
import './ScrolltoTop.scss';
import "bootstrap/dist/css/bootstrap.min.css";

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const gotoTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className="scroll--container">
            {showTopBtn && (
                <button className="btn btn-primary scroll--container__btn" onClick={gotoTop}>
                    Scroll Top
                </button>
            )}
        </div>
    );
};
export default ScrollToTop;
