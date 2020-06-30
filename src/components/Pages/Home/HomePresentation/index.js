import React from 'react';
import { NavLink } from "react-router-dom";

import weebey from '../../../../static/placeholders/weebey.webp';
import Logo from '../../../Logo';
import screen1 from '../../../../static/screens/1.png';
import screen2 from '../../../../static/screens/2.png';
import screen3 from '../../../../static/screens/3.png';

function HomePresentation() {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="relative flex flex-col rounded-lg text-white w-full lg:w-2/3 pt-8 md:py-12 pb-64 xl:pb-16 mr-5 px-12 shadow-2xl bg-secondary-dark overflow-hidden">
                <h1 className="flex flex-col mb-6">
                    <Logo />
                    <span className="flex mt-8 text-xl font-bold">Your list of movies, series, books & even more all in one place...</span>
                </h1>
                <div className="flex flex-col xl:pr-48">
                    <ul className="ml-5 text-lg space-y-4 leading-relaxed list-disc">
                        <li>No more keeping track on your watch/read list on your notes...</li>
                        <li>Easy follow up and maintaining of your list</li>
                        <li>Install on your phone to get the app experience</li>
                        <li>Huge database using Tmdb & google books APIs</li>
                        <li>Features to come to make this place your everyday list...</li>
                    </ul>
                </div>
                <div className="mt-10 flex">
                    <NavLink exact to={"/Signup"} className="bg-primary text-black flex items-center justify-center py-2 px-6 rounded-full text-base font-bold hover:bg-primarydarken transition duration-200 h-12 mb-4 font-bold">Sign Up now</NavLink>
                </div>
                <img className={`absolute h-64 right-0 bottom-0 filter-shadow`} src={weebey} alt="" />
            </div>
            <div className="w-full lg:w-1/3 flex flex-col md:flex-row lg:flex-col lg:ml-5 mt-8 lg:mt-0">
                <div className="h-64 md:w-1/3 md:mr-4 lg:ml-0 lg:w-full shadow-2xl bg-secondary-dark rounded-lg overflow-hidden p-5 mb-8">
                    <img src={screen1} className="mx-auto object-cover rounded-lg filter-shadow" alt="" />
                </div>
                <div className="h-64 md:w-1/3 md:mr-4 md:ml-4 lg:ml-0 lg:mr-0 lg:w-full shadow-2xl bg-secondary-dark rounded-lg overflow-hidden p-5 mb-8">
                    <img src={screen2} className="mx-auto object-cover rounded-lg filter-shadow" alt="" />
                </div>
                <div className="h-64 md:w-1/3 md:ml-4 lg:ml-0 lg:w-full shadow-2xl bg-secondary-dark rounded-lg overflow-hidden p-5">
                    <img src={screen3} className="mx-auto object-cover rounded-lg filter-shadow" alt="" />
                </div>
            </div>
        </div>
    )
}

export default HomePresentation;
