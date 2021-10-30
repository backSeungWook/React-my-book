import { Redirect } from 'react-router'
import SigninContainer from '../containers/SigninContainer'
import useToken from '../hooks/useTokean'


export default function Signin(){
  const token = useToken()

  if(token !== null){
    return <Redirect to='/mybook/' />
  }

  return <SigninContainer />
}