import { gql } from "apollo-boost";

// Books with genres query
const GET_BOOKS = gql`
    query getBooks($status: Int, $uid: String){
        books(Status: $status, uid: $uid) {
            ID,
            Name,
            Subtitle,
            Pitch,
            Image,
            Author,
            Year,
            Stars,
            Nationality,
            Pitch,
            Genre,
            Status,
            Pages,
            Prod_company
        }
    }
`;

// Add book
const ADD_BOOK_MUTATION = gql`
    mutation addBook(
        $G_id: String,
        $uid: String,
        $Name: String,
        $Subtitle: String,
        $Og_name: String,
        $Pitch: String,
        $Image: String,
        $Author: String,
        $Year: String,
        $Link: String,
        $Date: String,
        $Pages: Int,
        $Status: Int,
        $Stars: Int,
        $Nationality: String,
        $Prod_company: String
        $Genre: String,
    ) {
        addBook(input: { G_id: $G_id, uid: $uid, Name: $Name, Subtitle: $Subtitle, Og_name: $Og_name, Pitch: $Pitch, Image: $Image, Author: $Author, Year: $Year, Link: $Link, Date: $Date, Pages: $Pages, Status: $Status, Stars: $Stars, Nationality: $Nationality, Prod_company: $Prod_company, Genre: $Genre}) {
            G_id,
            uid,
            Name,
            Subtitle,
            Og_name,
            Pitch,
            Image,
            Author,
            Year,
            Link,
            Date,
            Pages,
            Status,
            Stars,
            Nationality,
            Prod_company,
            Genre
        }
    }
`;

// Update mutation
const UPDATE_BOOK_MUTATION_STATUS = gql`
    mutation updateBookStatus($ID: Int!, $Status: Int) {
        updateBookStatus(ID: $ID, Status: $Status) {
            ID
        }
    }
`;

// Delete mutation
const DELETE_BOOK_MUTATION = gql`
    mutation deleteBook($ID: Int!) {
        deleteBook(ID: $ID) {
            ID
        }
    }
`;

export {
    GET_BOOKS,
    ADD_BOOK_MUTATION,
    UPDATE_BOOK_MUTATION_STATUS,
    DELETE_BOOK_MUTATION
}