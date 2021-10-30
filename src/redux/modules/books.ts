import { call, put, select, takeEvery, takeLatest } from "@redux-saga/core/effects"
import { push } from "connected-react-router"

import { Action, createActions, handleActions } from "redux-actions"
import BookService from "../../services/BookService"
import { BookReqType, BooksState, BookType } from "../../types"


const initialState: BooksState = {
  books:null,
  loading:false,
  error:null
}

const prefix = 'my-books/books'


export const {pending,success,fail} = createActions('PENDING','SUCCESS','FAIL',{prefix})


const reducer = handleActions<BooksState, BookType[]>({
  PENDING: (state) => ({...state,loading:true,error:null}),
  SUCCESS:(state,action) =>({
    
    books:action.payload,
    loading:false,
    error:null
  }),
  FAIL:(state,action:any) =>({
    ...state,
    loading:false,
    error:action.payload
  })
},initialState,{prefix})

export default reducer


// saga

export const {getBooks, addBook, deleteBook, editBook } = createActions('GET_BOOKS','ADD_BOOK','DELETE_BOOK','EDIT_BOOK',{prefix})

function* getBooksSaga(){
  try{
    yield put(pending())
    
    const token:string = yield select((state) =>{
      console.log(state)
      return state.auth.token
      })
    const books:BookType[] = yield call(BookService.getBooks,token)
    yield put(success(books))
  }catch(error){
    
    yield put(fail(error))
  }
}

function* addBookSaga(action:Action<BookReqType>){
  try{
    yield put(pending())
    const token:string = yield select((state) => state.auth.token)
    const book:BookType = yield call(BookService.addBook,token,action.payload)
    const books:BookType[] = yield select(state => state.books.books)

    yield put(success([...books,book]))
    yield put(push('/mybook/'))

  }catch(error){
    
    console.log('modules books addBookSaga ',error)
    yield put(fail(new Error('ERROR~~~')))
  }
}

function* deleteBookSaga(action:Action<number>){
  try{
    const bookId = action.payload
    yield put(pending())
    const token:string = yield select(state => state.auth.token)
    yield call(BookService.deleteBook, token, bookId)

    const books: BookType[] = yield select(state => state.books.books)
    yield put(success(books.filter(book => book.bookId !== bookId)))
  }catch(error){
    
    yield put(fail(new Error('DeleteBookSaga Err')))
  }
}

type Params = {
  bookId: string;
  book:BookReqType
};

function* editBookSaga(action:Action<Params>){
  try{ 
    const {bookId} = action.payload
    const {book}= action.payload
    
    yield put(pending())
    const token:string = yield select(state => state.auth.token)
    
    const newBook:BookType = 
      yield call(BookService.editBook,token,Number(bookId),book )
      
    const books:BookType[] = yield select(state => state.books.books)

    yield put(
      success(
        books.map((book) => (book.bookId === newBook.bookId ? newBook : book)),
      ),
    )

    console.log('book',newBook)
    yield put(push('/mybook/'))

  }catch(error){
    yield put(fail(new Error('editBookSaga Err')))
  }
}


export function* booksSaga(){
  yield takeLatest(`${prefix}/GET_BOOKS`,getBooksSaga)
  yield takeEvery(`${prefix}/ADD_BOOK`,addBookSaga)
  yield takeEvery(`${prefix}/DELETE_BOOK`,deleteBookSaga)
  yield takeEvery(`${prefix}/EDIT_BOOK`, editBookSaga);

}

