import { ResultStatusType } from "antd/lib/result";
import { push } from "connected-react-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import NotFound from "../components/NotFound";


interface NotFoundProps{
  pageNumber:ResultStatusType
}
const NotFoundContainer:React.FC<NotFoundProps> = ({pageNumber}) =>{
  const dispatch = useDispatch()

  const goHome = useCallback(()=>{
    console.log('go Home')
    dispatch(push('/'))
  },[dispatch])

  return <NotFound goHome={goHome} pageNumber={pageNumber}/>
}

export default NotFoundContainer

