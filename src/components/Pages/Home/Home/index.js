import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/authContext';

import HomeMovies from '../HomeMovies';
import HomeSeries from '../HomeSeries';
import HomeBooks from '../HomeBooks';
import HomePresentation from '../HomePresentation';
import SearchModal from '../../../Modal/SearchModal';

function Home() {
    const { currentUser } = useContext(AuthContext);

    return (
        <main>
            {currentUser
                ?
                    <div>
                        <HomeMovies />
                        <HomeSeries />
                        <HomeBooks />
                        <SearchModal />
                    </div>
                :
                    <HomePresentation />
            }
        </main>
    )
}

export default Home;
