import React, { useContext, useState, useRef } from "react";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { GET_MOVIES_WITH_GENRES, GET_MOVIES_GENRES } from '../../../queries/movies';

import { AppContext } from '../../../context/appContext';
import { AuthContext } from '../../../context/authContext';

import Select, { components } from "react-select";
import Card from "../../Card";
import CardModal from '../../Modal/CardModal';
import SearchModal from '../../Modal/SearchModal';
import FloatingButton from '../../FloatingButton';
import Placeholder from '../../Placeholder';
import Travolta from '../../../static/placeholders/travolta-placeholder.webp';

function MovieList() {
    const [state, setState] = useContext(AppContext);
    const { currentUser } = useContext(AuthContext);

    const [localSelectGenres, setLocalSelectGenres] = useState(state.moviesGenres);
    const genresSelectEl = useRef(null);
    const defaultGenres = 'Adventure,Fantasy,Animation,Drama,Horror,Action,Comedy,History,Western,Thriller,Crime,Documentary,Science Fiction,Mystery,Music,Romance,Family,War,TV Movie';
    const selectStyle = 'flex flex-1 lg:flex-auto select-custom';

    // Queries (genres & movies (with status & genres))
    const { data: genres_data } = useQuery(GET_MOVIES_GENRES);
    const { data: movies_with_genres_data, movies_with_genres_error, loading: movies_with_genres_loading } = useQuery(GET_MOVIES_WITH_GENRES, {
        variables: {
            status: state.moviesStatus,
            genres: `${state.moviesGenres}`,
            uid: currentUser.uid
        }
    });

    if (movies_with_genres_loading) {
        return (<div>Loading movies...</div>)
    };

    if (movies_with_genres_error) {
        return <div>Error! {movies_with_genres_error.message}</div>;
    }

    // Status select
    const statusSelect = [
        { value: 0, label: "Not seen" },
        { value: 1, label: "Seen" }
    ];

    const changeStatusSelect = (event) => {
        setState(state => ({
            ...state,
            moviesStatus: event.value,
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
            moviesStatus: state.moviesStatus
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
            searchModalType: 'movie',
            searchModal: true,
        }))
    }

    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col sm:flex-row lg:items-start lg:mb-4">
                <h1 className="flex items-center text-3xl text-white font-semibold mb-4 lg:mb-0">
                    <span>Movies</span>
                </h1>
                <div className="flex flex-col md:flex-row mb-6 sm:ml-auto lg:mb-3">
                    <Select
                        className={`${selectStyle} md:w-40 md:mr-6`}
                        classNamePrefix="select-custom"
                        options={statusSelect}
                        value={{value: state.moviesStatus, label: statusSelect[state.moviesStatus].label}}
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
            {movies_with_genres_data.moviesGenres.length
                ?
                <ul className="font-sans grid md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6 lg:gap-10">
                    {movies_with_genres_data.moviesGenres.map(movie => (
                        <Card
                            key={movie.ID}
                            type="movie"
                            id={movie.ID}
                            title={movie.Name}
                            rating={movie.Stars}
                            date={movie.Year}
                            genres={movie.Genres}
                            director={movie.Director}
                            actor1={movie.Actor1}
                            actor2={movie.Actor2}
                            actor3={movie.Actor3}
                            nationality={movie.Nationality}
                            description={movie.Pitch}
                            image={movie.Image}
                            status={movie.Status}
                        />
                    ))}
                </ul>
                :
                <Placeholder title="You have no movies in your list yet..." imgSrc={Travolta} imgShadow={true}>
                    <div className="flex">
                        <button className="bg-primary text-black flex items-center py-2 px-3 rounded-full text-sm font-semibold hover:bg-primarydarken transition duration-200 mx-auto md:mx-0" onClick={clickAdd}>Add a movie</button>
                    </div>
                </Placeholder>
            }
            <CardModal type="movie" />
            <FloatingButton type="movie" />
            <SearchModal />
        </div>
    );
}

export default graphql(GET_MOVIES_WITH_GENRES, GET_MOVIES_GENRES)(MovieList);
