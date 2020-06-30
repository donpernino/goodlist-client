import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Modal from '../Layout';
import { GET_MOVIES_WITH_GENRES, UPDATE_MOVIE_MUTATION_STATUS, DELETE_MOVIE_MUTATION } from '../../../queries/movies';
import { GET_SERIES_WITH_GENRES, UPDATE_SERIE_MUTATION_STATUS, DELETE_SERIE_MUTATION } from '../../../queries/series';
import { GET_BOOKS, UPDATE_BOOK_MUTATION_STATUS, DELETE_BOOK_MUTATION } from '../../../queries/books';

import { AppContext } from '../../../context/appContext';
import { AuthContext } from '../../../context/authContext';

import { flag } from 'country-emoji';
import CloseSvg from '../../../static/icons/close.svg';
import EyeSvg from '../../../static/icons/eye.svg';
import BinSvg from '../../../static/icons/bin.svg';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const CardModal = props => {
    const [state, setState] = useContext(AppContext);
    const { currentUser } = useContext(AuthContext);

    const cardInfos = state.cardModalInfos;

    // Update movie status
    const [updateMovieStatus] = useMutation(UPDATE_MOVIE_MUTATION_STATUS, {
        variables: {
            ID: cardInfos.id,
            Status: cardInfos.status === 0 ? 1 : 0
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
            ID: cardInfos.id,
            Status: cardInfos.status === 0 ? 1 : 0
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
            ID: cardInfos.id,
            Status: cardInfos.status === 0 ? 1 : 0
        },
        refetchQueries: [{
            query: GET_BOOKS,
            variables: {
                status: state.booksStatus,
            }
        }],
        awaitRefetchQueries: true
    });

    // Delete movie
    const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION, {
        variables: { ID: cardInfos.id },
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
        variables: { ID: cardInfos.id },
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
        variables: { ID: cardInfos.id },
        refetchQueries: [{
            query: GET_BOOKS,
            variables: {
                status: state.seriesStatus,
                uid: currentUser.uid
            }
        }],
        awaitRefetchQueries: true
    });

    // Genres
    let genresList = '';
    if (cardInfos.genres) {
        genresList = cardInfos.genres.split(',');
        genresList = genresList.slice(0, 2).map((genre, index, arr) => 
            <li key={index}>
                {genre}
                {arr.length - 1 === index ? '' : <span className="text-white m-2">&bull;</span>}
            </li>
        );
    }

    // Status change
    const clickStatusChange = (event) => {
        event.stopPropagation();

        if (props.type === 'movie') {
            updateMovieStatus().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }

        if (props.type === 'tv') {
            updateSerieStatus().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }

        if (props.type === 'book') {
            updateBookStatus().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }
    }

    const clickDelete = (event) => {
        event.stopPropagation();

        if (props.type === 'movie') {
            deleteMovie().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }

        if (props.type === 'tv') {
            deleteSerie().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }

        if (props.type === 'book') {
            deleteBook().then(
                setState(state => ({
                    ...state,
                    cardModal: false,
                    updateList: true
                }))
            );
        }
    }


    // Close modal
    const closeModal = () => {
        setState(state => ({
            ...state,
            cardModal: false
        }));
    };

    return (
        <Modal closeModal={closeModal} show={state.cardModal} additionnalClasses={'bg-secondary-dark'}>
            <button onClick={closeModal} className="absolute flex justify-center items-center top-0 right-0 mt-2 mr-4 md:-mt-4 md:-mr-4 h-8 w-8 rounded-full bg-secondary-light bold shadow-xl z-10">
                <CloseSvg className="h-6 w-6 text-white stroke-current stroke-2" />
            </button>
            <div className="flex flex-col h-screen md:h-full">
                <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-4/10 lg:w-1/3 md:rounded-tl-lg md:mb-16">
                        <img className="md:absolute inset-0 object-cover object-top h-64 md:h-full w-full" src={cardInfos.image} alt="" />
                    </div>
                    <div className="px-4 pt-4 md:pt-8 md:px-8 pb-20 md:pb-24 md:w-6/10 lg:w-2/3 md:rounded-tr-lg overflow-hidden">
                        <div className="flex items-center mb-2">
                            {cardInfos.nationality && 
                                <div className="mr-2">
                                    {flag(cardInfos.nationality)}
                                </div>
                            }
                            <h2 className="text-xl font-semibold text-white">{cardInfos.title}</h2>
                            {cardInfos.rating !== 0 &&
                                <div className="flex items-center justify-center h-10 w-10 mt-2 rounded-full border border-white absolute right-0 mr-4 md:mr-8 bg-white text-secondary-blue font-bold text-xs tracking-wide">
                                    <CircularProgressbarWithChildren value={cardInfos.rating}>
                                        <div className="flex items-center">
                                            <span className="text-xs">{cardInfos.rating}</span>
                                            <span className="text-xxs">%</span>
                                        </div>
                                    </CircularProgressbarWithChildren>
                                </div>
                            }
                        </div>
                        <div className="flex">
                            {cardInfos.author && 
                                <div className="flex text-secondary-gray font-normal leading-6 text-sm mb-1">
                                    {cardInfos.author}
                                    <span className="text-white mx-2">&bull;</span>
                                </div>
                            }
                            {cardInfos.date &&
                                <time className="text-secondary-gray font-normal leading-6 text-sm flex mb-2">{cardInfos.date.substring(6, 10)}</time>
                            }
                            {cardInfos.prodCompany &&
                                <div className="flex">
                                    <span className="text-white mx-2">&bull;</span>
                                    <p className="flex text-secondary-gray font-normal leading-6 text-sm">
                                        {cardInfos.prodCompany}
                                    </p>
                                </div>
                            }
                            {cardInfos.nbSeasons &&
                                <div className="flex">
                                    <span className="text-white mx-2">&bull;</span>
                                    <p className="flex text-secondary-gray font-normal leading-6 text-sm">
                                        {cardInfos.nbSeasons} seasons
                                    </p>
                                </div>
                            }
                        </div>
                        <div className="flex">
                            <ul className="mb-2 flex text-secondary-gray font-normal leading-6 text-sm truncate">
                                {genresList}
                            </ul>
                            {cardInfos.nbPages &&
                                <div className="flex">
                                    <span className="text-white mx-2">&bull;</span>
                                    <div className="flex text-secondary-gray font-normal leading-6 text-sm">{cardInfos.nbPages} pages</div>
                                </div>
                            }
                        </div>
                        <div className="text-secondary-gray font-normal leading-6 text-sm mb-2">{cardInfos.director}</div>
                        <div className="text-secondary-gray font-normal leading-6 text-sm mb-2">
                            {cardInfos.actor1 && cardInfos.actor1}
                            {cardInfos.actor2 && ', ' + cardInfos.actor2 + ','}
                            {cardInfos.actor3 && ' ' + cardInfos.actor3}
                        </div>
                        <p className="mb-6 flex text-secondary-gray font-normal leading-6 text-sm">{cardInfos.description}</p>
                        {props.type !== 'book' &&
                            <a className="flex mt-4 font-bold underline text-white text-sm" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(cardInfos.title)} trailer`} target="_blank" rel="noopener noreferrer">Watch trailer</a>
                        }
                        {props.type === 'book' &&
                            <a className="flex mt-4 font-bold underline text-white text-sm" href={`https://www.amazon.com/s?k=${encodeURIComponent(cardInfos.title)}&i=stripbooks-intl-ship&ref=nb_sb_noss_2`} target="_blank" rel="noopener noreferrer">Search on amazon</a>
                        }
                        
                    </div>
                </div>
                <div className="fixed md:absolute flex inset-x-0 bottom-0 h-16 bg-secondary-light px-2 lg:px-10 items-center lg:justify-center shadow-xlreverse transition duration-200 md:rounded-bl-lg md:rounded-br-lg">
                    <button className="rounded-full flex items-center justify-center py-1 px-2 mx-2 text-sm bg-secondary-blue hover:bg-secondary-bluedarken text-white font-semibold w-1/2 lg:w-1/3 h-10 transition duration-200" onClick={clickDelete}>
                        <BinSvg className={`text-white stroke-current w-6 h-6 mr-1`} />
                        <span>Delete</span>
                    </button>
                    <button className="rounded-full flex items-center justify-center py-1 px-2 mx-2 text-sm bg-primary hover:bg-primarydarken text-black font-bold w-1/2 lg:w-1/3 h-10 transition duration-200" onClick={clickStatusChange}>
                        <EyeSvg className={`text-black stroke-current w-6 h-6 mr-1`} />
                        <span>{cardInfos.status === 1 ? 'Not seen' : 'Seen'}</span>
                    </button>
                </div>
            </div>
        </Modal>
    )
};

export default CardModal;