import { Col, Row ,Input,Button, message} from "antd"
import { useEffect, useRef } from "react"
import { LoginReqType } from "../types"
import styles from './Signin.module.css'


interface SigninProps{
  login: (reqData: LoginReqType)=>void
  error: Error | null;
}

//Props 전달 하기 위해 React.FC
const Signin: React.FC<SigninProps>= ({login,error}) =>{
  
  const emailRef = useRef<Input>(null)
  const passwordRef = useRef<Input>(null)

  useEffect(() => {
    if (error === null) return;

    switch (error.message) {
      case 'USER_NOT_EXIST':
        message.error('User not exist');
        break;
      case 'PASSWORD_NOT_MATCH':
        message.error('Wrong password');
        break;
      default:
        message.error('Wrong password');
    }
  }, [error]);

  return(

    <Row align='middle' className={styles.signin_row}>
      <Col span={24}>
        <Row className={styles.signin_contents}>
          <Col span={12}> 
            <img src="/mybook/bg_signin.png" className={styles.signin_bg} alt="signin" />
          </Col>
          <Col span={12}> 
            <div className={styles.signin_title}>My Books</div>
            <div className={styles.signin_subtitle}>Please Note Your Opinion</div>
            <div className={styles.signin_underline} />
            <div className={styles.email_title}>
              Email 
              <span className={styles.required}>*</span>
            </div>
            <div className={styles.input_area}>
              <Input
                placeholder='Email'
                autoComplete='email'
                name='email'
                className={styles.input}
                ref={emailRef}
              />
            </div>

            <div className={styles.password_title}>
              Password 
              <span className={styles.required}>*</span>
            </div>
            <div className={styles.input_area}>
              <Input
                type='password'
                autoComplete='current-password'
                className={styles.input}
                ref={passwordRef}
              />
            </div>
            <div className={styles.button_area}>
              <Button size ='large' className={styles.button} onClick={click}>Sign In</Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )

  function click(){
    const email = emailRef.current!.state.value
    const password = passwordRef.current!.state.value

    if(email ==='' || email===undefined){
      message.error('User not exist');
    }else if(password ==='' || password===undefined){
      message.error('password not exist');
    }
    else{
      login({email,password})
    }
  }
}

export default Signin