import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { goBack, push } from 'connected-react-router';

import Edit from '../components/Edit';

import { BookReqType, BookType, Params, RootState } from '../types';
import { logout as logoutSaga } from '../redux/modules/auth';
import {
  editBook as editBookSaga,
  getBooks as getBooksSaga,
} from '../redux/modules/books';

const EditContainer = () => {

  
  const { id } = useParams<Params>()
  
  const bookId = Number(id) || -1;
  const books = useSelector<RootState, BookType[] | null>(
    (state) => state.books.books,
  );

  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading,
  );
  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error,
  );
  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const edit = useCallback(
    (book:BookReqType) => {
      dispatch(editBookSaga({book,bookId}));
    },
    [dispatch,bookId],
  );

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  const goHome = useCallback(()=>{
    dispatch(push('/'))
  },[dispatch])

  return (
    <Edit
      book={
        books === null ? null : books.find((book) => book.bookId === bookId)
      }
      loading={loading}
      error={error}
      edit={edit}
      getBooks={getBooks}
      back={back}
      logout={logout}
      goHome={goHome}
    />
  );
};

export default EditContainer;
