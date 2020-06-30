import React from 'react'

function Placeholder({title, imgSrc, imgShadow, children, outerStyle, innerStyle, titleStyle}) {
    return (
        <div className={`flex rounded-lg text-white w-full pt-8 md:pt-12 pb-0 px-12 shadow-2xl bg-secondary-dark overflow-hidden ${outerStyle}`}>
            <div className={`flex flex-col md:flex-row ${innerStyle}`}>
                <div className="flex flex-col md:order-2 mb-8 md:mb-0 text-center md:text-left">
                    <h2 className={`text-xl font-semibold mb-6 ${titleStyle}`}>{title}</h2>
                    {children}
                </div>
                <div className="w-48 mx-auto md:mx-0 md:mr-4 md:order-1">
                    <img className={`w-full ${imgShadow ? 'filter-shadow' : ''}`} src={imgSrc} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Placeholder;