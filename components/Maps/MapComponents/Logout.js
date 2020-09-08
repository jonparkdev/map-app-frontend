import { connect } from 'react-redux'
import { logout } from '../../../redux/actions'
import { useState, useEffect } from 'react'

const Logout = ({ dispatch, user }) => {

  const [openModal, setOpenModal] = useState(false)

  useEffect(()=> {
    // can close modal onClick anywhere on page
    window.addEventListener('click', closeModal);
    return () => {
      window.removeEventListener('click', closeModal);
    }
  }, [])
  const closeModal = () => setOpenModal(false)

  const logoutUser = async () => {
    await dispatch(logout())
  }

  // try...catch for use case of blank name fields in db
  let name = "User's Map"
  try {
    name =
      `${user.first_name[0].toUpperCase()}${user.first_name.slice(1)}'s  Map`
  } catch(err) {
    console.log(err)
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setOpenModal(!openModal)
      }}
      className="logout-container"
    >
      <div className='row'>
        <div className='site-logo'>
          <div className="material-icons"> location_on </div>
          <h1> MAPS </h1>
        </div>
          <div className="divider" />
        <div className="user-info">
          <h2>{name}</h2>
          <div className="material-icons"> settings </div>
        </div>
      </div>
      {openModal && (
        <div onClick={() => logoutUser()} className="logout-button">
          Logout
        </div>
      )}
      <style jsx>
        {`
          .logout-button {
            font-size: 1.5rem;
            letter-spacing: .1rem;
            position: absolute;
            bottom: -4.25rem;
            border-radius: 8px;
            right: 0;
            padding: 1rem 2rem;
            background-color: hsla(0, 0%, 100%, .8);
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
            color: hsl(0, 0%, 30%);
            transition: box-shadow .5s;
          }

          .logout-button:hover {
              box-shadow: rgba(0, 0, 0, 0.10) 0px 5px 9px, rgba(0, 0, 0, 0.22) 0px 5px 9px;
          }

          .logout-container {
            cursor: pointer;
            z-index: 1;
            position: absolute;
            top: 3rem;
            right: 3rem;
            padding: 1rem;
            background-color: hsla(0, 0%, 100%, .8);
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
            color: hsl(0, 0%, 20%);
            border-radius: 8px;
            transition: box-shadow .5s;
          }

          .logout-container:hover {
            box-shadow: rgba(0, 0, 0, 0.10) 0px 5px 9px, rgba(0, 0, 0, 0.22) 0px 5px 9px;
          }

          .row {
            display: flex;
            justify-content: center;
          }

          .logout-container .divider {
            border: 1px solid hsl(0, 0%, 60%);
            margin: .5rem .75rem;
            margin-right: 1rem;
          }

          .site-logo {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .site-logo .material-icons {
            font-size: 3rem;
            margin-right: .5rem;
            color:hsl(180,100%,25.1%);
            text-shadow: 0px 4px 10px hsla(0, 0%, 54.9%,.8);
          }

          .site-logo h1, h2 {
            font-weight: normal;
            letter-spacing: .65rem;
            color: hsl(0, 0%, 23%);
            margin-top: 0;
            margin-bottom: 0;
          }

          .user-info  {
            display: flex;
            align-items: center;
          }

          .user-info .material-icons {
            color: hsl(0, 0%, 30%);
            margin-left:.25rem;
          }

          .user-info h2 {
            margin-right: .25rem;
            font-size: 1.6rem;
            letter-spacing: .1rem;
            color: hsl(0, 0%, 30%);
          }

        `}
      </style>
    </div>
  )
}



export default connect(state => {
  return {
    user: state.auth.user
  }
})(Logout)
