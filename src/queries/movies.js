import { gql } from "apollo-boost";

// Movies with genres query
const GET_MOVIES_WITH_GENRES = gql`
    query getMoviesWithGenres($status: Int, $genres: String, $uid: String){
        moviesGenres(Status: $status, GenresList: $genres, uid: $uid) {
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
            Status
        }
    }
`;

// Genres query
const GET_MOVIES_GENRES = gql`
    {
        genres {
            Genre_id,
            Genre
        }
    }
`;

// Add movie
const ADD_MOVIE_MUTATION = gql`
    mutation addMovie(
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
    ) {
        addMovie(input: { uid: $uid, Tmdb_id: $Tmdb_id, Name: $Name, Og_name: $Og_name, Pitch: $Pitch,Image: $Image,Director: $Director,Year: $Year,Date: $Date,Stars: $Stars,Status: $Status,Actor1: $Actor1,Actor2: $Actor2,Actor3: $Actor3,Nationality: $Nationality,Genre1: $Genre1,Genre2: $Genre2,Link: $Link,}) {
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
            Status
        }
    }
`;

// Update mutation
const UPDATE_MOVIE_MUTATION_STATUS = gql`
    mutation updateMovieStatus($ID: Int!, $Status: Int) {
        updateMovieStatus(ID: $ID, Status: $Status) {
            ID
        }
    }
`;

// Delete mutation
const DELETE_MOVIE_MUTATION = gql`
    mutation deleteMovie($ID: Int!) {
        deleteMovie(ID: $ID) {
            ID
        }
    }
`;

export {
    GET_MOVIES_GENRES,
    GET_MOVIES_WITH_GENRES,
    ADD_MOVIE_MUTATION,
    UPDATE_MOVIE_MUTATION_STATUS,
    DELETE_MOVIE_MUTATION
}