import { gql } from "apollo-boost";

// Series with genres query
const GET_SERIES_WITH_GENRES = gql`
    query getSeriesWithGenres($status: Int, $genres: String, $uid: String){
        seriesGenres(Status: $status, GenresList: $genres, uid: $uid) {
            ID
            Name
            Image
            Year
            Pitch
            Stars
            Director
            Actor1
            Actor2
            Actor3
            Nationality
            Pitch,
            Genres,
            Status,
            Nb_seasons,
            Nb_episodes,
            Prod_company
        }
    }
`;

// Add serie
const ADD_SERIE_MUTATION = gql`
    mutation addSerie(
        $uid: String,
        $Tmdb_id: Int,
        $Name: String,
        $Og_name: String,
        $Pitch: String,
        $Image: String,
        $Director: String,
        $Year: String,
        $Date: String,
        $Stars: Int,
        $Status: Int
        $Actor1: String,
        $Actor2: String,
        $Actor3: String,
        $Nationality: String,
        $Genre1: Int,
        $Genre2: Int,
        $Link: String,
        $Nb_seasons: Int
        $Nb_episodes: Int,
        $Prod_company: String
    ) {
        addSerie(input: { uid: $uid, Tmdb_id: $Tmdb_id, Name: $Name, Og_name: $Og_name, Pitch: $Pitch,Image: $Image,Director: $Director,Year: $Year,Date: $Date,Stars: $Stars,Status: $Status,Actor1: $Actor1,Actor2: $Actor2,Actor3: $Actor3,Nationality: $Nationality,Genre1: $Genre1,Genre2: $Genre2,Link: $Link, Nb_seasons: $Nb_seasons, Nb_episodes: $Nb_episodes, Prod_company: $Prod_company}) {
            uid,
            Tmdb_id,
            Name,
            Og_name,
            Pitch,
            Image,
            Director,
            Year,
            Date,
            Stars,
            Actor1,
            Actor2,
            Actor3,
            Nationality,
            Genre1,
            Genre2,
            Link,
            Status,
            Nb_seasons,
            Nb_episodes,
            Prod_company
        }
    }
`;

// Update mutation
const UPDATE_SERIE_MUTATION_STATUS = gql`
    mutation updateSerieStatus($ID: Int!, $Status: Int) {
        updateSerieStatus(ID: $ID, Status: $Status) {
            ID
        }
    }
`;

// Delete mutation
const DELETE_SERIE_MUTATION = gql`
    mutation deleteSerie($ID: Int!) {
        deleteSerie(ID: $ID) {
            ID
        }
    }
`;

export {
    GET_SERIES_WITH_GENRES,
    ADD_SERIE_MUTATION,
    UPDATE_SERIE_MUTATION_STATUS,
    DELETE_SERIE_MUTATION
}