import React, { useContext } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_MOVIES_WITH_GENRES } from '../../../../queries/movies';
import { NavLink } from "react-router-dom";

import { AppContext } from '../../../../context/appContext';
import { AuthContext } from '../../../../context/authContext';

import Card from "../../../Card";
import CardModal from '../../../Modal/CardModal';
import Placeholder from '../../../Placeholder';
import Travolta from '../../../../static/placeholders/travolta-placeholder.webp';

function HomeMovies() {
    const [state, setState] = useContext(AppContext);
    const { currentUser } = useContext(AuthContext);

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

    // Click add event
    const clickAdd = (event) => {
        setState(state => ({
            ...state,
            searchModalType: 'movie',
            searchModal: true,
        }))
    }

    return (
        <section className="flex flex-col flex-1 mb-16">
            <NavLink
                exact
                to="/movies"
            >
                <h1 className="flex items-center text-3xl text-white font-semibold mb-4 lg:mb-6">
                    <span>Movies</span>
                </h1>
            </NavLink>
            {movies_with_genres_data.moviesGenres.length
                ?
                <ul className="font-sans grid md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6 lg:gap-10">
                    {movies_with_genres_data.moviesGenres.slice(0,4).map(movie => (
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
        </section>
    )
}

export default HomeMovies;
