import React from 'react'
import { Redirect } from 'react-router-dom'
import EditContainer from '../containers/EditContainer'

import useToken from '../hooks/useTokean'

const Edit = () =>{
  const token = useToken()

  if (token === null){
    return <Redirect to='signin' />
  }
  return <EditContainer />
}

export default Edit