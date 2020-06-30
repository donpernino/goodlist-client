import React, { useContext } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_SERIES_WITH_GENRES } from '../../../../queries/series';
import { NavLink } from "react-router-dom";

import { AppContext } from '../../../../context/appContext';
import { AuthContext } from '../../../../context/authContext';

import Card from "../../../Card";
import CardModal from '../../../Modal/CardModal';
import Placeholder from '../../../Placeholder';
import Meryl from '../../../../static/placeholders/meryl-placeholder.webp';

function HomeSeries() {
    const [state, setState] = useContext(AppContext);

    const { currentUser } = useContext(AuthContext);

    const { data: series_with_genres_data, series_with_genres_error, loading: series_with_genres_loading } = useQuery(GET_SERIES_WITH_GENRES, {
        variables: {
            status: state.moviesStatus,
            genres: `${state.moviesGenres}`,
            uid: currentUser.uid
        }
    });

    if (series_with_genres_loading) {
        return (<div>Loading movies...</div>)
    };

    if (series_with_genres_error) {
        return <div>Error! {series_with_genres_error.message}</div>;
    }

    // Click add event
    const clickAdd = (event) => {
        setState(state => ({
            ...state,
            searchModalType: 'tv',
            searchModal: true,
        }))
    }

    return (
        <section className="flex flex-col flex-1 mb-16">
            <NavLink
                exact
                to="/series"
            >
                <h1 className="flex items-center text-3xl text-white font-semibold mb-4 lg:mb-6">
                    <span>Series</span>
                </h1>
            </NavLink>
            {series_with_genres_data.seriesGenres.length
                ?
                <ul className="font-sans grid md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6 lg:gap-10">
                    {series_with_genres_data.seriesGenres.slice(0,4).map(serie => (
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
        </section>
    )
}

export default HomeSeries;
