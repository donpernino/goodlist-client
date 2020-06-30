import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from "@apollo/react-hooks";
import Modal from '../Layout';
import { GET_MOVIES_GENRES, GET_MOVIES_WITH_GENRES, ADD_MOVIE_MUTATION } from '../../../queries/movies';
import { GET_SERIES_WITH_GENRES, ADD_SERIE_MUTATION } from '../../../queries/series';
import { GET_BOOKS, ADD_BOOK_MUTATION } from '../../../queries/books';

import { AppContext } from '../../../context/appContext';
import { AuthContext } from '../../../context/authContext';

import SearchResult from '../../Search/SearchResult';
import Placeholder from '../../Placeholder';
import CloseSvg from '../../../static/icons/close.svg';
import SearchSvg from '../../../static/icons/search.svg';
// TODO create several Movie image placeholder and place logo icon for trademarks
import MovieImgPlaceholder from '../../../static/placeholders/movie-placeholder.jpg';
import BookImgPlaceholder from '../../../static/placeholders/book-placeholder.jpg';
import Yoda from '../../../static/placeholders/yoda.webp';
import dayjs from 'dayjs';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const SearchModal = props => {
    const [state, setState] = useContext(AppContext);
    const { currentUser } = useContext(AuthContext);

    const [searchResults, setSearchResults] = useState('');

    const tmdbImagePrefix = "https://image.tmdb.org/t/p/w342";

    // Get genres query
    const { data: genres_data } = useQuery(GET_MOVIES_GENRES);

    // Modal type (movie, serie or book)
    const modalType = state.searchModalType;

    // Add movie mutation
    const [addMovie] = useMutation(
        ADD_MOVIE_MUTATION,
        {
            refetchQueries: [{
                query: GET_MOVIES_WITH_GENRES,
                variables: {
                    status: state.moviesStatus,
                    genres: `${state.moviesGenres}`,
                    uid: currentUser.uid
                }
            }],
            awaitRefetchQueries: true
        }
    );
    // Add serie mutation
    const [addSerie] = useMutation(
        ADD_SERIE_MUTATION,
        {
            refetchQueries: [{
                query: GET_SERIES_WITH_GENRES,
                variables: {
                    status: state.moviesStatus,
                    genres: `${state.moviesGenres}`,
                    uid: currentUser.uid
                }
            }],
            awaitRefetchQueries: true
        }
    );
    // Add book mutation
    const [addBook] = useMutation(
        ADD_BOOK_MUTATION,
        {
            refetchQueries: [{
                query: GET_BOOKS,
                variables: {
                    status: state.moviesStatus,
                    uid: currentUser.uid
                }
            }],
            awaitRefetchQueries: true
        }
    );

    // Close modal
    const closeModal = () => {
        setState(state => ({
            ...state,
            searchModal: false
        }));

        setSearchResults('');
    }

    // On change search input
    const handleChange = (event) => {
        event.preventDefault();

        const apiUrl = modalType === 'book' ? `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(JSON.stringify(event.target.value))}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}` : `https://api.themoviedb.org/3/search/${modalType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${encodeURIComponent(JSON.stringify(event.target.value))}`

        fetch(apiUrl, {
            method: 'GET',
        })
        .then(response => response.json())
        .then((data) => {
            setSearchResults(data);

            setState(state => ({
                ...state,
                moviesToAdd: [],
                seriesToAdd: [],
                hasSearchResultsClicked: 0,
            }));
        })
        .catch((error) => console.log(error));
    }

    // Clear items
    const clearItems = () => {
        setState(state => ({
            ...state,
            moviesToAdd: [],
            seriesToAdd: [],
            hasSearchResultsClicked: 0,
            clearList: true
        }));
    }

    // Add item
    const addItem = () => {
        if (state.moviesToAdd) {
            state.moviesToAdd.map((movie) => {
                return addMovie({
                    variables: {
                        uid: currentUser.uid,
                        Tmdb_id: movie.Tmdb_id,
                        Name: movie.name,
                        Og_name: movie.og_name,
                        Pitch: movie.pitch,
                        Image: movie.pic,
                        Director: movie.director,
                        Year: movie.year,
                        Date: dayjs(),
                        Status: 0,
                        Stars: movie.note,
                        Actor1: movie.actor1,
                        Actor2: movie.actor2,
                        Actor3: movie.actor3,
                        Nationality: movie.nationality,
                        Genre1: movie.genre1,
                        Genre2: movie.genre2,
                        Link: ""
                    }
                }).then(
                    setState(state => ({
                        ...state,
                        searchModal: false,
                    }))
                ).then(
                    setState(state => ({
                        ...state,
                        searchModal: false,
                        updateList: true,
                        moviesToAdd: []
                    }))
                )
            });
        }

        if (state.seriesToAdd) {
            state.seriesToAdd.map((serie) => {
                return addSerie({
                    variables: {
                        uid: currentUser.uid,
                        Tmdb_id: serie.Tmdb_id,
                        Name: serie.name,
                        Og_name: serie.og_name,
                        Pitch: serie.pitch,
                        Image: serie.pic,
                        Director: serie.director,
                        Year: serie.year,
                        Date: dayjs(),
                        Status: 0,
                        Stars: serie.note,
                        Actor1: serie.actor1,
                        Actor2: serie.actor2,
                        Actor3: serie.actor3,
                        Nationality: serie.nationality,
                        Genre1: serie.genre1,
                        Genre2: serie.genre2,
                        Link: "",
                        Nb_seasons: serie.nbSeasons,
                        Nb_episodes: serie.nbEpisodes,
                        Prod_company: serie.prodCompany
                    }
                }).then(
                    setState(state => ({
                        ...state,
                        searchModal: false,
                    }))
                ).then(
                    setState(state => ({
                        ...state,
                        searchModal: false,
                        updateList: true,
                        seriesToAdd: []
                    }))
                )
            }); 
        }

        if (state.booksToAdd) {
            state.booksToAdd.map((book) => {
                return addBook({
                    variables: {
                        uid: currentUser.uid,
                        G_id: book.G_id,
                        Name: book.name,
                        Og_name: book.og_name,
                        Pitch: book.pitch,
                        Image: book.pic,
                        Author: book.author,
                        Year: book.year,
                        Date: dayjs(),
                        Status: 0,
                        Stars: book.note,
                        Genre: book.genre,
                        Pages: book.nbPages,
                        Link: "",
                    }
                }).then(
                    setState(state => ({
                        ...state,
                        searchModal: false,
                    }))
                ).then(
                    setState(state => ({
                        ...state,
                        searchModal: false,
                        updateList: true,
                        booksToAdd: []
                    }))
                )
            }); 
        }
    }

    let searchPlaceholder = '';

    if (modalType === 'movie') {
        searchPlaceholder = 'The godfather';
    } else if (modalType === 'tv') {
        searchPlaceholder = 'The wire';
    } else if (modalType === 'book') {
        searchPlaceholder = 'The alchemist';
    }    

    return (
        <Modal closeModal={closeModal} show={state.searchModal} additionnalClasses={'bg-dark w-full h-full pb-20 md:pb-0 md:h-8/10'}>
            <div className="px-6 md:px-8 pt-3 pb-6 sticky top-0 bg-dark z-10 shadow-xl md:rounded-tl-lg md:rounded-tr-lg md:h-17/100 flex flex-col justify-center">
                <button onClick={closeModal} className="absolute flex justify-center items-center top-0 right-0 mt-2 mr-4 md:-mt-4 md:-mr-4 h-8 w-8 rounded-full bg-secondary-light bold shadow-xl">
                    <CloseSvg className="h-6 w-6 text-white stroke-current stroke-2" />
                </button>
                <label className="flex text-white text-lg font-bold mb-2">
                    Search a {modalType === 'tv' ? 'serie' : modalType}
                </label>
                {/* TODO : Dynamic placeholder list of movies */}
                <div className="relative">
                    <input 
                        className="bg-secondary-dark font-semibold shadow-xl text-white focus:outline-none placeholder-gray rounded-full h-12 py-4 px-4 block w-full appearance-none leading-normal"
                        type="email"
                        placeholder={`Ex: ${searchPlaceholder}...`}
                        onChange={handleChange}
                    />
                    <div className="absolute flex items-center px-4 text-white right-0 top-0 bottom-0 border-l-2 border-dark">
                        <SearchSvg className="text-white stroke-current stroke-1 fill-current mr-1" />
                    </div>
                </div>
            </div>
            <SimpleBar className="md:h-83/100 md:overflow-auto md:pb-20">
                <ul className="list-none px-6 md:px-8">
                    {(searchResults && modalType !== 'book') &&
                        searchResults.results.map((item, index) => (
                            <SearchResult
                                key={index}
                                id={item.id}
                                index={index}
                                title={modalType === 'movie' ? item.title : item.name}
                                ogTitle={modalType === 'movie' ? item.original_title : item.original_name}
                                image={item.poster_path !== null ? `${tmdbImagePrefix}${item.poster_path}` : MovieImgPlaceholder}
                                rating={item.vote_average * 10}
                                releaseDate={modalType === 'movie' ? item.release_date : item.first_air_date}
                                description={item.overview}
                                country={item.original_language}
                                genresIds={item.genre_ids}
                                genresList={genres_data}
                                nbItemsClicked={state.hasSearchResultsClicked}
                            />
                        ))
                    }
                    {(searchResults.items && modalType === 'book') &&
                        searchResults.items.map((item, index) => (
                            <SearchResult
                                key={index}
                                id={item.id}
                                index={index}
                                type={modalType}
                                title={item.volumeInfo.title}
                                ogTitle={item.volumeInfo.title}
                                image={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : BookImgPlaceholder}
                                bookRating={item.volumeInfo.averageRating}
                                releaseDate={item.volumeInfo.publishedDate}
                                description={item.volumeInfo.description}
                                country={item.volumeInfo.language}
                                genresList={item.volumeInfo.categories ? item.volumeInfo.categories[0] : ''}
                                nbItemsClicked={state.hasSearchResultsClicked}
                                nbPages={item.volumeInfo.pageCount}
                                author={item.volumeInfo.authors ? item.volumeInfo.authors[0] : ''}
                            />
                        ))
                    }
                    {(!searchResults.results || !searchResults.items) && 
                        <Placeholder
                            title="No data there is... Free to search please feel. Hrmmm."
                            imgSrc={Yoda}
                            imgShadow={true}
                            outerStyle="mt-12"
                            innerStyle="md:flex-col mx-auto items-center"
                            titleStyle="mt-6 mb-8"
                        />
                    }
                </ul>
            </SimpleBar>
            <div className={state.hasSearchResultsClicked ? `opacity-1 fixed flex md:absolute inset-x-0 bottom-0 h-16 bg-secondary-light px-2 md:px-10 items-center md:justify-center shadow-xlreverse transition duration-200 md:rounded-bl-lg md:rounded-br-lg` : `opacity-0`}>
                <button
                    className="rounded-full flex items-center justify-center py-1 px-2 mx-2 md:mx-5 text-sm bg-secondary-blue text-white font-semibold w-1/2 md:w-1/3 h-10"
                    onClick={clearItems}
                >
                    Clear
                </button>
                <button
                    className="rounded-full flex items-center justify-center py-1 px-2 mx-2 md:mx-5 text-sm bg-primary text-black font-bold w-1/2 md:w-1/3 h-10"
                    onClick={addItem}
                >
                    Add
                </button>
            </div>
        </Modal>
    )
};

export default SearchModal;