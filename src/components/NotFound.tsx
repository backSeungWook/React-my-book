import { Result, Button } from 'antd';
import { ResultStatusType } from 'antd/lib/result';




interface NotFoundProps{
  goHome:()=>void
  pageNumber:ResultStatusType

}

const NotFound:React.FC<NotFoundProps> = ({goHome,pageNumber}) =>{

  return(
    <Result
      status={pageNumber}
      title={pageNumber}
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={goHome}>Back Home</Button>}
    />
  )
}

export default NotFound