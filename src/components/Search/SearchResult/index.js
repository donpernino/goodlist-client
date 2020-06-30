import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../context/appContext';
import dayjs from 'dayjs';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

function SearchResult({
    index,
    id,
    type,
    title,
    ogTitle,
    image,
    rating,
    bookRating,
    releaseDate,
    description,
    country,
    genresIds,
    genresList,
    nbItemsClicked,
    nbPages,
    author
}) {
    // eslint-disable-next-line
    const [state, setState] = useContext(AppContext);
    // eslint-disable-next-line
    let [searchResultIsClicked, setSearchResultIsClicked] = useState(false);

    // Modal type (movie, serie or book)
    const modalType = state.searchModalType;

    let genresName = [];

    if (type !== 'book') {
        if (genresIds) {
            genresIds.map(genreId => {
                let genre = genresList.genres.find(genre => genre.Genre_id === genreId);
    
                return genresName.push(genre.Genre);
            })
        }
    }

    const Genres = () => {
        if (type !== 'book') {
            return (
                genresName.slice(0,2).map((genre, index) => {
                    if (index === 1) {
                        return [
                            <div key={index} className="flex">
                                <span className="flex text-white mx-2 items-center">&bull;</span>
                                <div className={`text-secondary-gray font-semibold text-sm`}>{genre}</div>
                            </div>
                        ]
                    }
                    return <div key={index} className={`text-secondary-gray font-semibold text-sm`}>{genre}</div>;
                })
            )
        } else {
            return <div key={index} className={`text-secondary-gray font-semibold text-sm`}>{genresList}</div>;
        }
    }
    
    useEffect(() => {
        setSearchResultIsClicked(nbItemsClicked === 0 ? false : searchResultIsClicked);
    }, [nbItemsClicked, searchResultIsClicked]);

    const clickSearchResult = () => {
        if (searchResultIsClicked) {
            // Unclick
            setSearchResultIsClicked(false);
            if (state.hasSearchResultsClicked > 0) {
                setState(state => ({
                    ...state,
                    hasSearchResultsClicked: state.hasSearchResultsClicked - 1
                }));
            }
        } else {
            // Click
            setSearchResultIsClicked(true);

            setState(state => ({
                ...state,
                hasSearchResultsClicked: state.hasSearchResultsClicked + 1
            }));
        } 

        fetch(`https://api.themoviedb.org/3/${modalType}/${id}?api_key=b037e2dee49e458849b8ae1d140582e7&append_to_response=credits`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then((data) => {
            let actor = [];
            let genre = [];
            let country = '';
            let director = '';

            if (modalType === 'movie') {
                director = data.credits.crew[0] ? data.credits.crew[0].name : null;
                country = data.production_countries[0].iso_3166_1 ? data.production_countries[0].iso_3166_1 : null;
            }
            if (modalType === 'tv') {
                director = data.created_by[0].name ? data.created_by[0].name : null;
                country = data.origin_country[0] ? data.origin_country[0] : null;
            }

            if (modalType !== 'book') {
                if (data.credits.cast[0]) {
                    for (let index = 0; index < 3; index++) {
                        actor[index] = data.credits.cast[index] ? data.credits.cast[index].name : null;
                    }
                }
    
                if (data.genres[0]) {
                    for (let index = 0; index < 2; index++) {
                        genre[index] = data.genres[index] ? data.genres[index].id : null;
                    }
                }
            }
            
            if (searchResultIsClicked) {
                if (modalType === 'movie') {
                    let moviesToAddUpdated = state.moviesToAdd.filter(function (obj) {
                        return obj.Tmdb_id !== id;
                    });
    
                    setState(state => ({
                        ...state,
                        moviesToAdd: moviesToAddUpdated
                    }));
                }

                if (modalType === 'tv') {
                    let seriesToAddUpdated = state.seriesToAdd.filter(function (obj) {
                        return obj.Tmdb_id !== id;
                    });
    
                    setState(state => ({
                        ...state,
                        seriesToAdd: seriesToAddUpdated
                    }));
                }

                if (modalType === 'book') {
                    let booksToAddUpdated = state.booksToAdd.filter(function (obj) {
                        return obj.Google_id !== id;
                    });
    
                    setState(state => ({
                        ...state,
                        booksToAdd: booksToAddUpdated
                    }));  
                }
            } else {
                if (modalType === 'movie') {
                    setState(state => ({
                        ...state,
                        moviesToAdd: [...state.moviesToAdd, {
                            name: title,
                            og_name: ogTitle,
                            pitch: description,
                            note: rating,
                            pic: image,
                            director: director,
                            actor1: actor[0] ? actor[0] : '',
                            actor2: actor[1] ? actor[1] : '',
                            actor3: actor[2] ? actor[2] : '',
                            genre1: genre[0] ? genre[0] : 100,
                            genre2: genre[1] ? genre[1] : 0,
                            nationality: country ? country : '',
                            Tmdb_id: id,
                            year: releaseDate
                        }]
                    }));
                }

                if (modalType === 'tv') {
                    setState(state => ({
                        ...state,
                        seriesToAdd: [...state.seriesToAdd, {
                            name: title,
                            og_name: ogTitle,
                            pitch: description,
                            note: rating,
                            pic: image,
                            director: director,
                            actor1: actor[0] ? actor[0] : '',
                            actor2: actor[1] ? actor[1] : '',
                            actor3: actor[2] ? actor[2] : '',
                            genre1: genre[0] ? genre[0] : 100,
                            genre2: genre[1] ? genre[1] : 0,
                            nationality: country ? country : '',
                            Tmdb_id: id,
                            year: releaseDate,
                            nbSeasons: data.number_of_seasons,
                            nbEpisodes: data.number_of_episodes,
                            prodCompany: data.networks[0].name ? data.networks[0].name : ''
                        }]
                    }));
                }

                if (modalType === 'book') {
                    setState(state => ({
                        ...state,
                        booksToAdd: [...state.booksToAdd, {
                            name: title,
                            og_name: title,
                            pitch: description,
                            note: rating ? rating : 0,
                            pic: image,
                            author: author,
                            nationality: '',
                            G_id: id,
                            year: releaseDate,
                            nbPages: nbPages,
                            genre: genresList
                        }]
                    }));
                }
            }
        })
        .catch((error) => console.log(error));
    }

    return(
        <li 
            className={
                `flex flex-col bg-secondary-dark trans py-3 px-3 rounded-lg mb-6 border-2 shadow-xl ${searchResultIsClicked && nbItemsClicked > 0 ? 'border-primary' : 'border-secondary-dark'} ${index === 0 ? 'mt-6' : ''}`
            }
            key={id}
            onClick={() => clickSearchResult()}
        >
            <div className="flex mb-2">
                <img className="mr-3 w-20 h-20 object-cover shadow-xl rounded-lg overflow-hidden flex-shrink-0" src={image} alt="" />
                <div className="flex flex-col flex-grow relative overflow-hidden">
                    <h2 className="text-lg text-white font-bold pr-12 truncate -mt-1 mb-1">{title}</h2>
                    <div className="flex">
                        {rating !== undefined &&
                            <div className="flex items-center justify-center h-10 w-10 rounded-full border border-white absolute top-0 right-0 bg-white text-secondary-blue font-bold text-xs tracking-wide">
                                <CircularProgressbarWithChildren value={rating}>
                                    <div className="flex items-center">
                                        <span className="text-xs">{rating}</span>
                                        <span className="text-xxs">%</span>
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                        }
                        {bookRating &&
                            <div className="flex items-center justify-center h-10 w-10 rounded-full border border-white absolute top-0 right-0 bg-white text-secondary-blue font-bold text-xs tracking-wide">
                                <div className="flex items-center">
                                    <span className="text-xs">{bookRating}</span>
                                </div>
                            </div>
                        }
                        <div className="flex flex-col">
                            <div className="flex">
                                {author &&
                                    <div className="flex">
                                        <div className={`text-secondary-gray font-semibold text-sm`}>{author}</div>
                                        <span className="flex text-white mx-2 items-center">&bull;</span>
                                    </div> 
                                }
                                {releaseDate &&
                                    <div className="text-secondary-gray font-semibold text-sm">
                                        {dayjs(releaseDate).year()}
                                    </div>
                                }
                            </div>
                            <div className="flex mt-1">
                                {nbPages &&
                                    <div className="flex">
                                        <div className={`text-secondary-gray font-semibold text-sm`}>{nbPages} pages</div>
                                        <span className="flex text-white mx-2 items-center">&bull;</span>
                                    </div> 
                                }
                                <Genres />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-white line-clamp lc-2 text-secondary-gray font-semibold text-sm">{description}</p>
        </li>
    )
};

export default SearchResult;