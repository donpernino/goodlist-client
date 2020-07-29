import React, { useContext } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKS } from '../../../queries/books';

import { AppContext } from '../../../context/appContext';
import { AuthContext } from '../../../context/authContext';

import Select from "react-select";
import Card from "../../Card";
import CardModal from '../../Modal/CardModal';
import SearchModal from '../../Modal/SearchModal';
import FloatingButton from '../../FloatingButton';
import Placeholder from '../../Placeholder';
import Dog from '../../../static/placeholders/dog-placeholder.webp';

const metascraper = require('metascraper')([
    require('metascraper-author')(),
    require('metascraper-date')(),
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-logo')(),
    require('metascraper-clearbit')(),
    require('metascraper-publisher')(),
    require('metascraper-title')(),
    require('metascraper-url')()
  ])
  

function ExtrasList() {
    const [state, setState] = useContext(AppContext);
    const { currentUser } = useContext(AuthContext);

    const extras_data = "test";

    const got = require('got')
  
    const targetUrl = 'http://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance'
    
    ;(async () => {
        const { body: html, url } = await got(targetUrl)
        const metadata = await metascraper({ html, url })
        console.log(metadata)
    })()

    // Click add event
    const clickAdd = (event) => {
        setState(state => ({
            ...state,
            searchModalType: 'extras',
            searchModal: true,
        }))
    }

    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col sm:flex-row lg:items-start lg:mb-4">
                <h1 className="flex items-center text-3xl text-white font-semibold mb-4 lg:mb-0">
                    <span>Extras</span>
                </h1>
                <div className="flex flex-col md:flex-row mb-6 sm:ml-auto lg:mb-3">
                    {/* <Select
                        className={`${selectStyle} md:w-40`}
                        classNamePrefix="select-custom"
                        options={statusSelect}
                        value={{value: state.booksStatus, label: statusSelect[state.booksStatus].label}}
                        theme={theme => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: "#1e213a"
                            }
                        })}
                        hideSelectedOptions={true}
                        onChange={(event) => changeStatusSelect(event)}
                    /> */}
                </div>
            </div>
            {extras_data.length
                ?
                    <div>test</div>
                :
                <Placeholder title="You have no extras..." imgSrc={Dog} imgShadow={true}>
                    <div className="flex">
                        <button className="bg-primary text-black flex items-center py-2 px-3 rounded-full text-sm font-semibold hover:bg-primarydarken transition duration-200 mx-auto md:mx-0" onClick={clickAdd}>Add an extras</button>
                    </div>
                </Placeholder>
            }
            <SearchModal />
        </div>
    )
}

export default ExtrasList;
