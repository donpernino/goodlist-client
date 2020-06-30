import React, { useContext } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKS } from '../../../queries/books';

import { AppContext } from '../../../context/appContext';
import { AuthContext } from '../../../context/authContext';

import Select from "react-select";
import Card from "../../Card";
import CardModal from '../../Modal/CardModal';
import SearchModal from '../../Modal/SearchModal';
import FloatingButton from '../../FloatingButton';
import Placeholder from '../../Placeholder';
import Dog from '../../../static/placeholders/dog-placeholder.webp';

function BookList() {
    const [state, setState] = useContext(AppContext);
    const { currentUser } = useContext(AuthContext);

    const selectStyle = 'flex flex-1 lg:flex-auto select-custom';

    // Query
    const { data: books_data, books_error, loading: books_loading } = useQuery(GET_BOOKS, {
        variables: {
            status: state.booksStatus,
            uid: currentUser.uid
        }
    });

    if (books_loading) {
        return (<div>Loading books...</div>)
    };

    if (books_error) {
        return <div>Error! {books_error.message}</div>;
    }

    // Status select
    const statusSelect = [
        { value: 0, label: "Not read" },
        { value: 1, label: "Read" }
    ];

    const changeStatusSelect = (event) => {
        setState(state => ({
            ...state,
            booksStatus: event.value,
            booksGenres: state.booksGenres
        }));
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
        <div className="flex flex-col flex-1">
            <div className="flex flex-col sm:flex-row lg:items-start lg:mb-4">
                <h1 className="flex items-center text-3xl text-white font-semibold mb-4 lg:mb-0">
                    <span>Books</span>
                </h1>
                <div className="flex flex-col md:flex-row mb-6 sm:ml-auto lg:mb-3">
                    <Select
                        className={`${selectStyle} md:w-40`}
                        classNamePrefix="select-custom"
                        options={statusSelect}
                        value={{value: state.booksStatus, label: statusSelect[state.booksStatus].label}}
                        theme={theme => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: "#1e213a"
                            }
                        })}
                        hideSelectedOptions={true}
                        onChange={(event) => changeStatusSelect(event)}
                    />
                </div>
            </div>
            {books_data.books.length
                ?
                <ul className="font-sans grid md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6 lg:gap-10">
                    {books_data.books.map(book => (
                        <Card
                            key={book.ID}
                            type="book"
                            id={book.ID}
                            title={book.Name}
                            rating={book.Stars}
                            date={book.Year}
                            genres={book.Genre}
                            author={book.Author}
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
            <FloatingButton type="book" />
            <SearchModal />
        </div>
    )
}

export default BookList;
