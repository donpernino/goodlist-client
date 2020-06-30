import React, { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import PlusSvg from '../../static/icons/plus.svg';

function FloatingButton({type}) {
    // eslint-disable-next-line
    const [state, setState] = useContext(AppContext);

    const clickAdd = (event) => {
        setState(state => ({
            ...state,
            searchModal: true,
            searchModalType: type
        }))
    }

    return (
        <button className="group flex items-center fixed bottom-0 right-0 mb-20 mr-4 lg:mr-12" onClick={clickAdd}>
            <div className="flex items-center rounded-full w-12 h-12 bg-primary shadow-xl hover:bg-primarydarken hover:shadow-xlhover transition duration-200">
                <PlusSvg className="text-black stroke-current w-8 h-8 mx-auto"></PlusSvg>
                
            </div>
            {/* <div className="hidden lg:group-hover:flex ml-4 text-white font-semibold text-base">Add a movie</div> */}
        </button>
    )
}

export default FloatingButton;
