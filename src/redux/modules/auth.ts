import { call, put, select, takeEvery } from "@redux-saga/core/effects"
import { push } from "connected-react-router"
import { Action,  createActions, handleActions } from "redux-actions"
import TokenService from "../../services/TokenService"
import UserService from "../../services/UserService"

import { AuthState, LoginReqType } from "../../types"



//초기값 셋팅
const initialState:AuthState={
  token: TokenService.get(),
  loading:false,
  error:null
}

const prefix = 'my-books/auth'

//액션 Type 정의 , 액션 생성 함수
export const {pending,success,fail} = createActions('PENDING','SUCCESS','FAIL',{prefix})

//리듀서
const reducer = handleActions<AuthState, string>({
  PENDING : (state)=>({
    ...state,
    loading: true,
    error: null
  }),
  SUCCESS : (state,action)=>({
    token: action.payload,
    loading: false,
    error: null
  }),
  FAIL : (state,action: any)=>({
    ...state,
    loading: false,
    error: action.payload
  })

},initialState,{prefix})

export default reducer

//saga 비동기 로직..

export const {login, logout } = createActions('LOGIN','LOGOUT',{prefix})

function* loginSaga(action:Action<LoginReqType>){
  try{
    yield put(pending())
    const token:string = yield call(UserService.login,action.payload)
    
    //localstorage
    TokenService.set(token)
    yield put(success(token))

    //push List Page
    yield put(push('/mybook/'))

    
  }catch(error){
    //error?.response?.data?.error ||
    
    
    yield put(fail(new Error()))
  }
}

function* logoutSaga(){
  try{
    yield put(pending())
    const token:string = yield select(state => state.auth.token)
    yield call(UserService.logout,token)
    //localstorage
    TokenService.set(token)
      
  }catch(error){
    
  } finally{
    TokenService.remove()
    yield put(success(null))
  }
}

export function* authSaga(){
  yield takeEvery(`${prefix}/LOGIN`,loginSaga)
  yield takeEvery(`${prefix}/LOGOUT`,logoutSaga)
}
