import React, { useContext, useState, useRef } from "react";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { GET_MOVIES_GENRES } from '../../../queries/movies';
import { GET_SERIES_WITH_GENRES } from '../../../queries/series';

import { AppContext } from '../../../context/appContext';
import { AuthContext } from '../../../context/authContext';

import Select, { components } from "react-select";
import Card from "../../Card";
import CardModal from '../../Modal/CardModal';
import SearchModal from '../../Modal/SearchModal';
import FloatingButton from '../../FloatingButton';
import Placeholder from '../../Placeholder';
import Meryl from '../../../static/placeholders/meryl-placeholder.webp';

function SerieList() {
    const [state, setState] = useContext(AppContext);
    const { currentUser } = useContext(AuthContext);

    const [localSelectGenres, setLocalSelectGenres] = useState(state.moviesGenres);
    const genresSelectEl = useRef(null);
    const defaultGenres = 'Adventure,Fantasy,Animation,Drama,Horror,Action,Comedy,History,Western,Thriller,Crime,Documentary,Other,Science Fiction,Mystery,Music,Action & Adventure,Romance,Family,War,Kids,News,Reality,Sci-Fi & Fantasy,Soap,Talk,War & Politics,TV Movie';
    const selectStyle = 'flex flex-1 lg:flex-auto select-custom';

    // Queries (genres & series (with status & genres))
    const { data: genres_data } = useQuery(GET_MOVIES_GENRES);
    const { data: series_with_genres_data, series_with_genres_error, loading: series_with_genres_loading } = useQuery(GET_SERIES_WITH_GENRES, {
        variables: {
            status: state.seriesStatus,
            genres: `${state.moviesGenres}`,
            uid: currentUser.uid
        }
    });

    if (series_with_genres_loading) {
        return (<div>Loading series...</div>)
    };

    if (series_with_genres_error) {
        return <div>Error! {series_with_genres_error.message}</div>;
    }

    // Status select
    const statusSelect = [
        { value: 0, label: "Not seen" },
        { value: 1, label: "Seen" }
    ];

    const changeStatusSelect = (event) => {
        setState(state => ({
            ...state,
            seriesStatus: event.value,
            moviesGenres: state.moviesGenres
        }));
    }

    // Genres select
    // Populate genres select with available genres
    let genresSelect = '';
    if (genres_data) {
        genresSelect = genres_data.genres.map(item => {
            return {
                value: item.Genre_id,
                label: item.Genre
            }
        });
        
        genresSelect.sort(function(a,b) {
            if ( a.label < b.label ){
                return -1;
            }
            if ( a.label > b.label ){
                return 1;
            }
            return 0;
        });
    }

    const changeGenresSelect = (event) => {
        let moviesGenresString = event.map(item =>  {
            return item.label;
        })

        moviesGenresString = moviesGenresString.toString();

        setState(state => ({
            ...state,
            moviesGenres: event.length > 0 ? moviesGenresString : defaultGenres,
            seriesStatus: state.seriesStatus
        })); 

        setLocalSelectGenres(event);
    }

    const ValueContainer = ({ children, getValue, ...props }) => {
        const optionsLength = props.selectProps.options.length;
        const valuesLength = getValue().length;

        return (
            <components.ValueContainer {...props}>
                {!props.selectProps.menuIsOpen &&
                    ((optionsLength === valuesLength) || (valuesLength === 0))  ? `All genres` : `${valuesLength} Genre${valuesLength > 1 ? "s" : ""} selected`}
                {React.cloneElement(children[1])}
            </components.ValueContainer>
        );
    };

    // Click add event
    const clickAdd = (event) => {
        setState(state => ({
            ...state,
            searchModalType: 'tv',
            searchModal: true,
        }))
    }

    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col sm:flex-row lg:items-start lg:mb-4">
                <h1 className="flex items-center text-3xl text-white font-semibold mb-4 lg:mb-0">
                    <span>Series</span>
                </h1>
                <div className="flex flex-col md:flex-row mb-6 sm:ml-auto lg:mb-3">
                    <Select
                        className={`${selectStyle} md:w-40 md:mr-6`}
                        classNamePrefix="select-custom"
                        options={statusSelect}
                        value={{value: state.seriesStatus, label: statusSelect[state.seriesStatus].label}}
                        theme={theme => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: "#1e213a"
                            }
                        })}
                        hideSelectedOptions={true}
                        onChange={(event) => changeStatusSelect(event)}
                    />
                    <Select
                        ref={genresSelectEl}
                        className={`${selectStyle} md:w-64`}
                        classNamePrefix="select-custom"
                        options={genresSelect}
                        value={localSelectGenres}
                        theme={theme => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: "#5a67d8"
                            }
                        })}
                        isMulti
                        hideSelectedOptions={false}
                        components={{ ValueContainer }}
                        onChange={(event) => changeGenresSelect(event)}
                    />
                </div>
            </div>
            {series_with_genres_data.seriesGenres.length
                ?
                <ul className="font-sans grid md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6 lg:gap-10">
                    {series_with_genres_data.seriesGenres.map(serie => (
                        <Card
                            key={serie.ID}
                            type="tv"
                            id={serie.ID}
                            title={serie.Name}
                            rating={serie.Stars}
                            date={serie.Year}
                            genres={serie.Genres}
                            director={serie.Director}
                            actor1={serie.Actor1}
                            actor2={serie.Actor2}
                            actor3={serie.Actor3}
                            nationality={serie.Nationality}
                            description={serie.Pitch}
                            image={serie.Image}
                            status={serie.Status}
                            nbSeasons={serie.Nb_seasons}
                            nbEpisodes={serie.Nb_episodes}
                            prodCompany={serie.Prod_company}
                        />
                    ))}
                </ul>
                :
                <Placeholder title="You have no series in your list yet..." imgSrc={Meryl} imgShadow={true}>
                    <div className="flex">
                        <button className="bg-primary text-black flex items-center py-2 px-3 rounded-full text-sm font-semibold hover:bg-primarydarken transition duration-200 mx-auto md:mx-0" onClick={clickAdd}>Add a serie</button>
                    </div>
                </Placeholder>
            }
            <CardModal type="tv" />
            <FloatingButton type="tv" />
            <SearchModal />
        </div>
    );
}

export default graphql(GET_SERIES_WITH_GENRES, GET_MOVIES_GENRES)(SerieList);
