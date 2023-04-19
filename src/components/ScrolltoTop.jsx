import React, { useState, useEffect } from "react";
import './ScrolltoTop.scss';

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
                <button
                    className="scroll--container__btn"
                    onClick={gotoTop}
                >
                    Вверх страницы
                </button>
            )}
        </div>
    );
};
export default ScrollToTop;
