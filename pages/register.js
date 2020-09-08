import { useState, useEffect } from "react"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm, formValueSelector } from "redux-form"
import { SubmissionError } from 'redux-form'
import FormStyles from "../css/Form.css"
import FormLayout from "../components/common/FormLayout"
import { renderTextField } from "../components/common/MaterialComponents"
import Button from "@material-ui/core/Button";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createUser } from '../redux/actions'
import Loading from '../components/common/Loading'
import { submit } from '../utils/reduxFormValidators'

const RegisterPage = ({
   handleSubmit,
   submitting,
   email,
   password,
   first_name,
   last_name,
   dispatch,
   isLoading,
   isAuthenticated
}) => {
  const router = useRouter()

  const submitForm = async () => {
    const payload = {
      username: email,
      email,
      password,
      first_name,
      last_name
    }
    await dispatch(createUser(payload))
  }

  if(isAuthenticated) {
    router.push('/maps')
    return (
      <FormLayout style={{alignItems: 'center'}}>
        <Loading />
      </FormLayout>
    )
  }


  return (
    <>
      <FormLayout>
        <div className="login-modal">
          <div className="input-container">
            <div className="header">
              <div className="material-icons"> location_on </div>
              <h1> MAPS </h1>
            </div>
            <h2> Create a Maps Account </h2>
            <p> Explore and share your adventures </p>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="input-field row">
                <Field
                  name="first_name"
                  label="First Name"
                  component={renderTextField}
                  style={{marginRight: '.75rem'}}
                />
                <Field
                  name="last_name"
                  label="Last Name"
                  component={renderTextField}
                />
              </div>
              <div className="input-field">
                <Field
                  name="email"
                  label="Email Address"
                  type="email"
                  component={renderTextField}
                  style={{width: '100%'}}
                />
              </div>
              <div className="input-field">
                <Field
                  name="password"
                  label="Password"
                  component={renderTextField}
                  style={{width: '100%'}}
                />
              </div>
              <div className="row button-container">
                <Link href='/login'>
                  <a> Have an account? </a>
                </Link>
                {isLoading ? (
                  <Loading style={{marginLeft:'auto', transform: 'scale(.75)'}}/>
                ) : (
                  <button type="submit" disabled={submitting}>
                    Create Account
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </FormLayout>
      <style jsx>{FormStyles}</style>
      <style jsx>
        {`
          p {
            margin-bottom: 0;
            margin-top: 8px;
            color: hsl(0, 0%, 50%);
          }
        `}
      </style>
    </>
  )
}

RegisterPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => {
  const selector = formValueSelector('register-page')
  return {
    email: selector(state, 'email'),
    password: selector(state, 'password'),
    first_name: selector(state, 'first_name'),
    last_name: selector(state, 'last_name'),
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
  }
})(reduxForm({
  form: "register-page",
  validate: submit(["first_name", "last_name", "email", "password"])
})(RegisterPage))
