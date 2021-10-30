

import { Redirect } from 'react-router'
import ListContainer from '../containers/ListContainer'
import useToken from '../hooks/useTokean'


export default function Home(){
  const token = useToken()

  if(token === null){
    return <Redirect to='/mybook/signin' />
  }

  return <ListContainer />

}