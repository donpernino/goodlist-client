import React, { useState } from 'react';

const AppContext = React.createContext([{}, () => {}]);

const AppProvider = (props) => {
    const [state, setState] = useState({
        cardModal: false,
        cardModalInfos: {},
        searchModal: false,
        searchModalType: '',
        hasSearchResultsClicked: 0,
        updateList: false,
        clearList: false,
        moviesStatus: 0,
        seriesStatus: 0,
        booksStatus: 0,
        moviesGenres: 'Adventure,Fantasy,Animation,Drama,Horror,Action,Comedy,History,Western,Thriller,Crime,Documentary,Other,Science Fiction,Mystery,Music,Action & Adventure,Romance,Family,War,Kids,News,Reality,Sci-Fi & Fantasy,Soap,Talk,War & Politics,TV Movie',
        moviesToAdd: [],
        seriesToAdd: [],
        booksToAdd: [],
    });

    return (
        <AppContext.Provider value={[state, setState]}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };