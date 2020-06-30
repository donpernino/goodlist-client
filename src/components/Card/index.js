import React, { useContext } from "react";
import dayjs from 'dayjs';
// import utf8 from 'utf8';
import { flag } from 'country-emoji';
import { useMutation } from "@apollo/react-hooks";
import { GET_MOVIES_WITH_GENRES, UPDATE_MOVIE_MUTATION_STATUS, DELETE_MOVIE_MUTATION } from '../../queries/movies';
import { GET_SERIES_WITH_GENRES, UPDATE_SERIE_MUTATION_STATUS, DELETE_SERIE_MUTATION } from '../../queries/series';
import { GET_BOOKS, UPDATE_BOOK_MUTATION_STATUS, DELETE_BOOK_MUTATION } from '../../queries/books';

import { AppContext } from '../../context/appContext';
import { AuthContext } from '../../context/authContext';

import EyeSvg from '../../static/icons/eye.svg';
import BinSvg from '../../static/icons/bin.svg';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

function Card({
    type,
    index,
    id,
    image,
    title,
    rating,
    date,
    genres,
    director,
    actor1,
    actor2,
    actor3,
    nationality,
    description,
    status,
    nbSeasons,
    nbEpisodes,
    prodCompany,
    nbPages,
    author
}) {
    const [state, setState] = useContext(AppContext);
    const { currentUser } = useContext(AuthContext);

    const cardDate = dayjs(date).format('DD/MM/YYYY');

    // Movie update mutation
    const [updateMovieStatus] = useMutation(UPDATE_MOVIE_MUTATION_STATUS, {
        variables: {
            ID: id,
            Status: status === 0 ? 1 : 0
        },
        refetchQueries: [{
            query: GET_MOVIES_WITH_GENRES,
            variables: {
                status: state.moviesStatus,
                genres: `${state.moviesGenres}`
            }
        }],
        awaitRefetchQueries: true
    });

    // Serie update mutation
    const [updateSerieStatus] = useMutation(UPDATE_SERIE_MUTATION_STATUS, {
        variables: {
            ID: id,
            Status: status === 0 ? 1 : 0
        },
        refetchQueries: [{
            query: GET_SERIES_WITH_GENRES,
            variables: {
                status: state.seriesStatus,
                genres: `${state.moviesGenres}`
            }
        }],
        awaitRefetchQueries: true
    });

    // Book update mutation
    const [updateBookStatus] = useMutation(UPDATE_BOOK_MUTATION_STATUS, {
        variables: {
            ID: id,
            Status: status === 0 ? 1 : 0
        },
        refetchQueries: [{
            query: GET_BOOKS,
            variables: {
                status: state.seriesStatus,
            }
        }],
        awaitRefetchQueries: true
    });

    // Movie delete mutation
    const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION, {
        variables: { ID: id },
        refetchQueries: [{
            query: GET_MOVIES_WITH_GENRES,
            variables: {
                status: state.moviesStatus,
                genres: `${state.moviesGenres}`,
                uid: currentUser.uid
            }
        }],
        awaitRefetchQueries: true
    });

    // Serie delete mutation
    const [deleteSerie] = useMutation(DELETE_SERIE_MUTATION, {
        variables: { ID: id },
        refetchQueries: [{
            query: GET_SERIES_WITH_GENRES,
            variables: {
                status: state.seriesStatus,
                genres: `${state.moviesGenres}`,
                uid: currentUser.uid
            }
        }],
        awaitRefetchQueries: true
    });

    // Book delete mutation
    const [deleteBook] = useMutation(DELETE_BOOK_MUTATION, {
        variables: { ID: id },
        refetchQueries: [{
            query: GET_BOOKS,
            variables: {
                status: state.seriesStatus,
                uid: currentUser.uid
            }
        }],
        awaitRefetchQueries: true
    });

    // Status change event
    const clickStatusChange = (event) => {
        event.stopPropagation();

        if (type === 'movie') {
            updateMovieStatus().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }

        if (type === 'tv') {
            updateSerieStatus().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }

        if (type === 'book') {
            updateBookStatus().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }
    }

    // Delete event
    const clickDelete = (event) => {
        event.stopPropagation();

        if (type === 'movie') {
            deleteMovie().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }

        if (type === 'tv') {
            deleteSerie().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }

        if (type === 'book') {
            deleteBook().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }
    }

    // Show modal click event
    const showModal = () => {
        if (type === 'movie') {
            setState(state => ({
                ...state,
                cardModal: true,
                cardModalInfos: {
                    id: id,
                    image: image,
                    title: title,
                    rating: rating,
                    date: cardDate,
                    director: director,
                    actor1: actor1,
                    actor2: actor2,
                    actor3: actor3,
                    nationality: nationality,
                    description: description,
                    status: status,
                    genres: genres
                }
            }));
        }

        if (type === 'tv') {
            setState(state => ({
                ...state,
                cardModal: true,
                cardModalInfos: {
                    id: id,
                    image: image,
                    title: title,
                    rating: rating,
                    date: cardDate,
                    director: director,
                    actor1: actor1,
                    actor2: actor2,
                    actor3: actor3,
                    nationality: nationality,
                    description: description,
                    status: status,
                    genres: genres,
                    nbSeasons: nbSeasons,
                    nbEpisodes: nbEpisodes,
                    prodCompany: prodCompany
                }
            }));
        }

        if (type === 'book') {
            setState(state => ({
                ...state,
                cardModal: true,
                cardModalInfos: {
                    id: id,
                    image: image,
                    title: title,
                    rating: rating,
                    date: cardDate,
                    author: author,
                    nationality: nationality,
                    description: description,
                    status: status,
                    genres: genres,
                    nbPages: nbPages
                }
            }));
        }
    };

    // Genres
    let genresList = genres.split(',');
    genresList = genresList.slice(0, 2).map((genre, index, arr) => 
        <li key={index}>
            {genre}
            {arr.length - 1 === index ? '' : <span className="text-white m-2">&bull;</span>}
        </li>
    );

    // Wording
    const seenWording = type === 'book' ? 'read' : 'seen';

    return (
        <li
            key={index}
            className="flex flex-col overflow-hidden bg-secondary-dark hover:bg-secondary-darklighten rounded-lg shadow-xl hover:shadow-xlhover transition duration-200 cursor-pointer"
            onClick={() => showModal()}
        >
            <div>
                <img
                    src={image}
                    alt={title}
                    className="h-64 w-full object-cover object-top rounded-lg shadow-lg"
                />
            </div>
            <div className="flex flex-col flex-1 px-4 lg:px-5 pt-4 pb-5 lg:pb-6">
                <div className={`relative flex items-center ${type === 'book' ? 'mb-1' : 'mb-2'}`}>
                    {nationality &&
                        <div className="mr-2">
                            {flag(nationality)}
                        </div>
                    }
                    <h2 className="text-xl font-semibold text-white pr-12">{title}</h2>
                    {rating !== 0 &&
                        <div className="flex items-center justify-center h-10 w-10 mt-2 rounded-full border border-white absolute right-0 bg-white text-secondary-blue font-bold text-xs tracking-wide">
                            <CircularProgressbarWithChildren value={rating}>
                                <div className="flex items-center">
                                    <span className="text-xs">{rating}</span>
                                    <span className="text-xxs">%</span>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    }
                </div>
                {author && 
                    <div className="flex text-secondary-gray font-normal leading-6 text-sm mb-1">
                        {author}
                    </div>
                }
                <div className="flex items-center leading-6 mb-2">
                    <time className="flex text-secondary-gray font-normal leading-6 text-sm">
                        {cardDate.substring(6, 10)}
                    </time>
                    {prodCompany &&
                        <div className="flex">
                            <span className="text-white mx-2">&bull;</span>
                            <p className="flex text-secondary-gray font-normal leading-6 text-sm">
                                {prodCompany}
                            </p>
                        </div>
                    }
                    {nbPages &&
                        <div className="flex">
                            <span className="text-white mx-2">&bull;</span>
                            <div className="flex text-secondary-gray font-normal leading-6 text-sm">{nbPages} pages</div>
                        </div>
                    }
                </div>
                <div className="flex">
                    <ul className="mb-2 flex text-secondary-gray font-normal leading-6 text-sm truncate">
                        {genresList}
                    </ul>
                    {nbSeasons &&
                        <div className="flex">
                            <span className="text-white mx-2">&bull;</span>
                            <p className="flex text-secondary-gray font-normal leading-6 text-sm">
                                {nbSeasons} seasons
                            </p>
                        </div>
                    }
                </div>
                <p className="mb-6 flex text-secondary-gray font-normal leading-6 text-sm line-clamp lc-3">
                    {description}
                </p>
                <div className="flex mt-auto">
                    <button className="bg-secondary-blue hover:bg-secondary-bluedarken text-white flex items-center py-2 px-3 mr-4 rounded-full text-sm font-semibold transition duration-200" onClick={clickDelete}>
                        <BinSvg className={`text-white stroke-current w-6 h-6 mr-1`} />
                        <span>Delete</span>
                    </button>
                    <button className="bg-primary text-black flex items-center py-2 px-3 rounded-full text-sm font-semibold hover:bg-primarydarken transition duration-200" onClick={clickStatusChange}>
                        <EyeSvg className={`text-black stroke-current w-6 h-6 mr-1`} />
                        <span className="capitalize">{status === 1 ? `Not ${seenWording}` : `${seenWording}`}</span>
                    </button>
                </div>
            </div>
        </li>
    );
};

export default Card;
