import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { acceptFriendRequest, getUser } from '../../../redux/actions'
import Loading from '../../common/Loading'

const Friends = ({ user, dispatch }) => {

  const [open, setOpen] = useState(false)
  const [number, setNumber] = useState(0)
  const [loading, setLoading] = useState(loading)
  const requests = get(user, 'friend_requests.requests')
  const userId = get(user, 'id')

  useEffect(() => {
    const number = get(user, 'friend_requests.request_number', 0)
    setNumber(number)
  }, [loading])

  const accept = async (friend_id, user_id) => {
    const payload = {
      friend_id,
      user_id
    }

    setLoading(true)
    await dispatch(acceptFriendRequest(payload))
    await dispatch(getUser())
    setLoading(false)
  }

  return (
    <>
      <div onClick={number === 0 ? null : ()=>setOpen(!open)} className='friends-container'>
        <div className="material-icons">
          person_add
        </div>

        <h2 style={{marginLeft: "1rem"}}> {`${number} Share Requests`} </h2>

        {open && (
          <div className= "menu">
            {requests.map(request => {
              const { name, id } = request
              return (
                <div className="card">
                  <h3> {name} </h3>
                  {loading ? (
                    <Loading style={{marginLeft:'auto', transform: 'scale(.3)'}}/>
                  ) : (
                    <div onClick={() => accept(id, userId)} className="button">
                      Accept Request
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <style jsx>
        {`
          .friends-container, .menu {
            display: flex;
            align-items: center;
            cursor: pointer;
            z-index: 1;
            position: absolute;
            top: 3rem;
            left: 3rem;
            padding: 1rem;
            background-color: hsla(0, 0%, 100%, .8);
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
            color: hsl(0, 0%, 20%);
            border-radius: 8px;
            transition: box-shadow .5s;
          }

          .menu {
            width: 100%;
            left: 0;
            padding: .5rem 1rem;
            top: 0;
            transform: translateX(100%);
            display: flex;
            flex-direction: column;
          }

          .menu .card {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            margin: .25rem 0;
          }

          .menu .card h3 {
            font-weight: normal;
            letter-spacing: .1rem;
            color: hsl(0, 0%, 23%);
            font-size: 1.5rem;
            margin-top: 0;
            margin-bottom: 0;
          }

          .menu .card .button {
            cursor: pointer;
            margin-top: .25rem;
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

          .friends-container .material-icons {
            font-size: 2rem;
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

        `}
      </style>
    </>
  )
}

export default connect(state => ({
  user: state.auth.user
}))(Friends)
