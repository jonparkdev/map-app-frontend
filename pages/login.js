import { useState, useEffect } from "react"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm, formValueSelector } from "redux-form"
import FormStyles from "../css/Form.css"
import FormLayout from "../components/common/FormLayout"
import { renderTextField } from "../components/common/MaterialComponents"
import Button from "@material-ui/core/Button";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { loginUser } from '../redux/actions'
import Loading from '../components/common/Loading'
import { submit } from '../utils/reduxFormValidators'


const LoginPage = ({
   handleSubmit,
   submitting,
   isAuthenticated,
   isLoading,
   email,
   password,
   dispatch
}) => {
  const router = useRouter()

  const submitForm = async () => {
    const payload = {
      username: email,
      password
    }
    await dispatch(loginUser(payload))
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
            <h2> Sign in  </h2>
            <form onSubmit={handleSubmit(submitForm)}>
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
                <Link href='/register'>
                  <a> Create account </a>
                </Link>
                {isLoading ? (
                  <Loading style={{marginLeft:'auto', transform: 'scale(.75)'}}/>
                ) : (
                  <button type="submit" disabled={submitting}>
                    Log In
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </FormLayout>
      <style jsx>{FormStyles}</style>
    </>
  )
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => {
  const selector = formValueSelector('login-page')
  return {
    email: selector(state, 'email'),
    password: selector(state, 'password'),
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
  }
})(reduxForm({
  form: "login-page",
  validate: submit(["email", "password"])
})(LoginPage))
