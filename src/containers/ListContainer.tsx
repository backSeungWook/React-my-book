import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '../components/List'
import { BookType, RootState } from '../types'
import {getBooks as getBooksSagaStart , deleteBook as deleteBookSagaStart} from '../redux/modules/books'
import {logout as logoutSagaStart} from '../redux/modules/auth'
import { push } from 'connected-react-router'


export default function ListContainer(){

  const books = useSelector<RootState,BookType[]|null>(state =>state.books.books)
  const loading = useSelector<RootState,boolean> (state =>state.books.loading)
  const error = useSelector<RootState,Error|null> (state =>state.books.error)
  

  const dispatch = useDispatch()
  
  const logout = useCallback(()=>{
    dispatch(logoutSagaStart())
  },[dispatch])

  
  const getBooks = useCallback(()=>{
    dispatch(getBooksSagaStart())
  },[dispatch])

  //책 추가
  const goAdd = useCallback(()=>{
    dispatch(push('/add'))
  },[dispatch])

  //책삭제
  const deleteBook = useCallback((bookId:number)=>{
    dispatch(deleteBookSagaStart(bookId))
  },[dispatch])

  const goEdit = useCallback((bookId:number) =>{
    dispatch(push(`/edit/${bookId}`))
  },[dispatch])

  return (
    <List 
      books={books} 
      loading={loading} 
      getBooks={getBooks} 
      error={error} 
      logout={logout}
      goAdd={goAdd}
      deleteBook={deleteBook}
      goEdit={goEdit}
    />
  )
}