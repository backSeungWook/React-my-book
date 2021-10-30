import { Redirect } from 'react-router'
import AddContainer from '../containers/AddContainer'
import useToken from '../hooks/useTokean'

export default function Add(){
  const token = useToken()
  if(token === null){
    return <Redirect to='/signin' />
  }
  return <AddContainer />
}