import React, { useContext } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKS } from '../../../../queries/books';
import { NavLink } from "react-router-dom";

import { AppContext } from '../../../../context/appContext';
import { AuthContext } from '../../../../context/authContext';

import Card from "../../../Card";
import CardModal from '../../../Modal/CardModal';
import Placeholder from '../../../Placeholder';
import Dog from '../../../../static/placeholders/dog-placeholder.webp';

function HomeBooks() {
    const [state, setState] = useContext(AppContext);

    const { currentUser } = useContext(AuthContext);

    const { data: books_data, movies_error, loading: movies_loading } = useQuery(GET_BOOKS, {
        variables: {
            status: state.moviesStatus,
            uid: currentUser.uid
        }
    });

    if (movies_loading) {
        return (<div>Loading movies...</div>)
    };

    if (movies_error) {
        return <div>Error! {movies_error.message}</div>;
    }

    // Click add event
    const clickAdd = (event) => {
        setState(state => ({
            ...state,
            searchModalType: 'book',
            searchModal: true,
        }))
    }

    return (
        <section className="flex flex-col flex-1 mb-16">
            <NavLink
                exact
                to="/books"
            >
                <h1 className="flex items-center text-3xl text-white font-semibold mb-4 lg:mb-6">
                    <span>Books</span>
                </h1>
            </NavLink>
            {books_data.books.length
                ?
                <ul className="font-sans grid md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6 lg:gap-10">
                    {books_data.books.slice(0,4).map(book => (
                        <Card
                            key={book.ID}
                            type="book"
                            id={book.ID}
                            title={book.Name}
                            rating={book.Stars}
                            date={book.Year}
                            genres={book.Genre}
                            author={book.Author}
                            nationality={book.Nationality}
                            description={book.Pitch}
                            image={book.Image}
                            status={book.Status}
                            nbPages={book.Pages}
                        />
                    ))}
                </ul>
                :
                <Placeholder title="You have no books in your list yet..." imgSrc={Dog} imgShadow={true}>
                    <div className="flex">
                        <button className="bg-primary text-black flex items-center py-2 px-3 rounded-full text-sm font-semibold hover:bg-primarydarken transition duration-200 mx-auto md:mx-0" onClick={clickAdd}>Add a book</button>
                    </div>
                </Placeholder>
            }
            <CardModal type="book" />
        </section>
    )
}

export default HomeBooks;
