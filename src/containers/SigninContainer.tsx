import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Signin from "../components/Signin";
import {login as loginSagaStart} from '../redux/modules/auth'
import { RootState } from "../types";

export default function SigninContainer(){
  
  const dispatch = useDispatch()
  const login = useCallback((reqDate)=>{
    dispatch(loginSagaStart(reqDate))
  },[dispatch])

  const error = useSelector<RootState, Error | null>(
    (state) => state.auth.error,
  );
  

  
  return <Signin login={login}  error={error} />;
}