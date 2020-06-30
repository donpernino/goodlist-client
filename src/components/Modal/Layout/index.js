import React from "react";

function Modal({show, closeModal, additionnalClasses, children}) {
    const modalWrapperClasses = 'fixed w-full h-screen m:h-full top-0 left-0 flex items-center justify-center z-10'
    const modalOverlayClasses = 'absolute w-full h-full bg-black opacity-25';
    const modalClasses = 'relative md:w-10/12 lg:w-7/10 xxl:w-6/12 mx-auto md:rounded-lg shadow-lg overflow-y-auto md:overflow-y-visible z-10 overflow-hidden md:overflow-x-visible';

    const modal = (
        <div className={show ? `opacity-100 ${modalWrapperClasses}` : `opacity-0 ${modalWrapperClasses}`}>
            <div className={modalOverlayClasses} onClick={closeModal}></div>
            <div className={`${modalClasses} ${additionnalClasses}`}>
                {children}
            </div>
        </div>
    );

    return (show) ? modal : null;
}

export default Modal;