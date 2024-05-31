import Hader from "../commonComponet/layout/hader/Hader";
import '../../styles/homepage-componet/UserLogin.css';
import { Field, Formik, useFormik, validateYupSchema } from 'formik';
import { useNavigate } from "react-router";
import { useState } from "react";

const UserLogin = () => {
  const [userNotFoundErre, setuserNotFoundErre] = useState(null)
  const navigate = useNavigate();

  const handelRegistration = () => {
    navigate('/UserRegistration')
  }
  return (
    <>
      <Hader />
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validate={(value) => {
          let errors = {}

          if (!value.email) {
            errors.email = "Email must be Required"
          } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value.email)) {
            errors.email = "Email is not valid use @gmail.com"
          }

          if (!value.password) {
            errors.password = "Password must be Required"
          }
          return errors
        }}

        onSubmit={(value, { setSubmitting }) => {
          const registraData = JSON.parse(localStorage.getItem("registerDataValue"))
          console.log('valu', registraData)
          if (!registraData) {
            setuserNotFoundErre("user not registered please registration must be complete");
          } else {
            const exitData = registraData.find((data) => data.email === value.email)
            if (!exitData) {
              setuserNotFoundErre("user not registered please registration must be complete");
            } else {
              localStorage.setItem('loginUserData', JSON.stringify(exitData));
              navigate('/')
            }
          }
          setSubmitting(false)
        }}
      >
        {(Formik) => (
          <form onSubmit={Formik.handleSubmit}>
            {console.log(Formik)}
            <div className="form-container">
              <div className='user-img'>
                <img src="https://t3.ftcdn.net/jpg/02/61/90/28/240_F_261902858_onbxqSHf193X4w7e8fdRH8vjjoT3vOVZ.jpg" alt="USer images" title='user image' />
              </div>
              <div className="inputField">
                <label>Email :</label>
                {Formik.errors.email && Formik.touched.email ? <span className="FieldError"> {Formik.errors.email}</span> : null}
                <Field name="email" type="email" onChange={Formik.handleChange}  ></Field>
              </div>
              <div className="inputField">
                <label >Password :</label>
                {Formik.errors.password && Formik.touched.password ? <span className="FieldError">{Formik.errors.password}</span> : null}
                <Field name="password" type="password" onChange={Formik.handleChange} ></Field>
                <span className="FieldError">{userNotFoundErre}</span>
              </div>
              <div className="formButton">
                <button onClick={handelRegistration}>registration</button>
                <button type="submit">Login</button>
              </div>
            </div>
          </form>)}
      </Formik >
    </>
  )


}

export default UserLogin;