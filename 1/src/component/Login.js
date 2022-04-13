import React ,{useState ,useContext} from 'react';
import { Form, Button, Row, Col ,Container} from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { useFormik } from 'formik';
import axios from "axios";
import ContextUser from "./ContextUser";

function validator(values)  {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if(!values.password){
        errors.password = "Required"
    }else if(values.password.length<6){
        errors.password = 'Password is Short'
    }
    return errors;
}

function Login() {
    const {setLoggedInUsers ,setIsSignin} = useContext(ContextUser);
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validate:validator,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            axios.get("http://localhost:3001/posts",values).then((res) => {
                res.data.map((data) => {
                    if (data.email === values.email && data.password === values.password) {
                        console.log(data);
                        setLoggedInUsers((preveState) => [...preveState, data]);
                        setIsSignin(true);
                    }
                });
            });
        },
    });
    
    const [showPassword, setshowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };

    return (
        <div>
            <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1 style={{color:"#fff"}}> خوش آمدید </h1>
                </Col>
            </Row>
            <Form className='form mt-5' onSubmit={formik.handleSubmit}>
                <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    className="height"  
                    placeholder="پست الکترونیک" 
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <p className='error'>
                    {formik.errors.email && formik.touched.email && formik.errors.email}
                </p>
                
                <Form.Control
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    className="height mt-5" 
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="کلمه عبور"
                />
                <Button className='c-icon' onClick={handleClickShowPassword}>
                    {showPassword ? <AiFillEye /> : <AiTwotoneEyeInvisible  /> }
                </Button>
                <p className='valid error'>
                    {formik.errors.password && formik.touched.password && formik.errors.password }
                </p>
                <Row>
                    <Form.Text className="text-muted mb-4">فراموش کرده اید؟</Form.Text>
                </Row>
                <Button type="submit" className='button2 button1'>ورود</Button>
            </Form>
            </Container>
        </div>
    );
}

export default Login;
