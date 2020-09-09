import { connect } from 'react-redux'
import {
  reduxForm,
  Field,
  formValueSelector,
  initialize,
  SubmissionError,
  reset
} from 'redux-form'
import { useState, useEffect } from 'react'
import { renderTextField } from '../../common/MaterialComponents'
import { sendFriendRequest } from '../../../redux/actions'

const Share = ({
  dispatch,
  user_id,
  submitting,
  handleSubmit,
  email,
}) => {

  const submitForm = async (values) => {

    if (!values.email) {
      throw new SubmissionError({
        email: 'Field cannot be blank',
      });
    }
    const payload = {
      user_id,
      email
    }

    await dispatch(sendFriendRequest(payload))
    await dispatch(reset('share-form'))
  }

  return (
    <div
      className="share-container"
    >
      <div className='row'>
        <div className="material-icons"> share </div>
        <h2> Share Your Locations </h2>
      </div>
      <form className='input-container' onSubmit={handleSubmit(submitForm)}>
        <Field
          name="email"
          label="Email Address"
          type="email"
          component={renderTextField}
          style={{width: '100%'}}
        />
        <button type='submit' disabled={submitting} >
          Share
        </button>
      </form>
      <style jsx>
        {`
          .share-container {
            cursor: pointer;
            z-index: 1;
            position: absolute;
            bottom: 0;
            right: 4rem;
            padding: 1rem;
            background-color: hsla(0, 0%, 100%, .8);
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
            color: hsl(0, 0%, 20%);
            border-radius: 8px;
            transition: box-shadow .5s;
          }

          .input-container {
            margin-top: .5rem;
          }

          .share-container:hover {
            box-shadow: rgba(0, 0, 0, 0.10) 0px 5px 9px, rgba(0, 0, 0, 0.22) 0px 5px 9px;
          }

          button {
            cursor: pointer;
            margin-top: .25rem;
            width: 100%;
            color: white;
            background-color: hsl(180,100%,25.1%);
            border: none;
            box-shadow:
              0px 3px 1px -2px rgba(0,0,0,0.2),
              0px 2px 2px 0px rgba(0,0,0,0.14),
              0px 1px 5px 0px rgba(0,0,0,0.12);
            padding: 6px 20px;
            font-size: 1rem;
            min-width: 64px;
            transition:
              background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            font-weight: 500;
            line-height: 1.75;
            border-radius: 4px;
            letter-spacing: 0.02857em;
          }

          .row {
            display: flex;
            justify-content: center;
            align-items:center;
          }

          .material-icons {
            font-size: 3rem;
            margin-right: 1rem;
            color:hsl(180,100%,25.1%);
            text-shadow: 0px 4px 10px hsla(0, 0%, 54.9%,.8);
          }

          h2 {
            font-weight: normal;
            letter-spacing: .1rem;
            color: hsl(0, 0%, 23%);
            margin-top: 0;
            margin-bottom: 0;
          }

          /* target Material-UI global styles */
          :global(.MuiFormLabel-root.Mui-focused){
            color: hsl(180,100%,25.1%);
          }

          :global(.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline){
            border-color: hsl(180,100%,25.1%);
          }
        `}
      </style>
    </div>
  )
}

export default connect(state => {
  const selector = formValueSelector('share-form')
  return {
    email: selector(state, 'email'),
    user_id: state.auth.user.id
  }
})(reduxForm({
  form: 'share-form',
})(Share))
