import './App.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import React ,{useState } from 'react';
import Login from './Login';
import Register from './Register';


function Form() {
  const [isShow, setIsShow] = useState(true);
  let [theme1, setTheme1] = useState("dimgray");
  let [theme2,setTheme2] =useState("mediumspringgreen")

  const mood = (theme1) => {
    if (theme1 === "dimgray") {
      setTheme1("mediumspringgreen");
      setTheme2("dimgray")
    }else {
      setTheme2("mediumspringgreen");
      setTheme1("dimgray");
    } 
  };

  const handelLogin = () => {
    mood(theme1)
    setIsShow(true);
  };
  const handelRegister = () => {
    mood(theme1)
    setIsShow(false);
  }

  return  (
    <div>
      <Container className='mt-5 styleForm'>
          <Row className="justify-content-md-center">
            <Col md="auto" className=' mt-5'>
              <Button className='button1' style={{ backgroundColor: theme1}}  onClick={handelRegister}> ثبت نام</Button>
              <Button className='button1' style={{ backgroundColor: theme2}} onClick={handelLogin}>ورود </Button>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto" className='mt-5 mb-5'>
            {isShow ? (
            <Login />
            ) : (
            <Register />
            )}
            </Col>
          </Row>
        </Container>
        
    </div>
  );
}

export default Form;
