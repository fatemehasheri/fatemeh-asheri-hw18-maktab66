import React,{useState ,useEffect} from 'react';
import { Form, Button, Row, Col ,Container} from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { Formik } from 'formik';
import axios from "axios";

function validator(values)  {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    if(!values.password){
        errors.password = "Required"
    }else if(values.password.length<6){
        errors.password = 'Password is Short'
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.locationEducation) {
        errors.locationEducation = 'Required';
    }
    if (!values.state) {
        errors.state = 'Required';
    }
    if (!values.city) {
        errors.city = 'Required';
    }
    
    return errors;
}

const Register= () => {
    
    const [dataState,setdataState] = useState([])
    useEffect(() => {
        axios.get("/iranstates.json").then((response) => {
            setdataState(response.data);
        });
    }, []);
    

    const [showPassword, setshowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
    };
    
    return(
    <div>
        <Formik
            initialValues={{ 
                firstName:"" ,
                lastName:"",
                email: "",
                password: "" ,
                education:"" ,
                locationEducation:"",
                state:"",
                city:"",
            }}
            validate={validator}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert("ثبت نام انجام شد");
                setSubmitting(false);
                }, 400);
                axios.post("http://localhost:3001/posts",values)
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h1 style={{color:"#fff"}}>رایگان ثبت نام کنید </h1>
                        </Col>
                    </Row>
                    <Form className='form mt-5' onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={6}>
                                <Form.Control 
                                    id="firstname"
                                    name="firstName"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                    className='name height'   
                                    placeholder="نام" 
                                />
                                <p className="error"> {errors.firstName && touched.firstName && errors.firstName}</p>
                            </Col>
                            <Col xs={6}>
                                <Form.Control 
                                    id="lastname"
                                    name="lastName"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                    className='name height'   
                                    placeholder="نام خانوادگی" 
                                />
                                <p className="error"> {errors.lastName && touched.lastName && errors.lastName}</p>
                            </Col>
                        </Row>
                    
                        <Form.Control 
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="height mt-5"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            placeholder="کلمه عبور"
                        />
                        <Button className='c-icon' onClick={handleClickShowPassword} >
                            {showPassword ? <AiFillEye /> : <AiTwotoneEyeInvisible  /> }
                        </Button>
                        <p className='valid error'>
                            {errors.password && touched.password && errors.password }
                        </p>
                    
                        <Form.Control 
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className="height" 
                            placeholder="پست الکترونیک"  
                        />
                        <p className="error"> {errors.email && touched.email && errors.email}</p>
                        
                        <Form.Select 
                         id="education"
                         name="education"
                         type="text"
                         onChange={handleChange}
                         onBlur={handleBlur}
                        className="mt-5" >
                            <option value={values.education} >تحصیلات</option>
                            <option value="1">دیپلم</option>
                            <option value="2">فوق دیپلم</option>
                            <option value="3">کارشناسی</option>
                            <option value="4"> کارشناسی ارشد</option>
                            <option value="5">دکتری</option>
                        </Form.Select>
                        {values.education ?(<Form.Group>
                            <Form.Control 
                            id="locationEducation"
                            name="locationEducation"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.locationEducation}
                            className="height mt-5"  
                            placeholder="محل تحصیل " 
                            />
                            <p className="error"> {errors.locationEducation && touched.locationEducation && errors.locationEducation}</p>
                            </Form.Group>): null
                        }

                        
                        <Row className="mt-5">
                            <Col xs={6}>
                                <Form.Select
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={values.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                >
                                    <option value="" >استان</option>
                                    {Object.keys(dataState).map((dataItem)=> <option  key={dataItem}>{dataItem}</option>)} 
                                </Form.Select>
                                <p className="error"> {errors.state && touched.state && errors.state}</p>
                            </Col>
                            <Col xs={6}>
                                <Form.Select value={values.city} id="city" name="city" onBlur={handleBlur} onChange={handleChange}>
                                    <option  value="" >شهر</option>
                                    {values.state != "" ?
                                    Object.values(dataState)[Object.keys(dataState).findIndex((key) => key === values.state)].map((item) => {
                                    return <option key={item}>{item}</option>;
                                    }): ""}
                                </Form.Select> 
                                <p className="error"> {errors.city && touched.city && errors.city}</p>
                            </Col>
                        </Row>
                        
                        <Button type="submit" className='button2 button1 mt-5' disabled={isSubmitting}>ثبت نام</Button>
                    </Form>
                </Container>
            )}
        </Formik>
        </div>)
    
}

export default Register;
