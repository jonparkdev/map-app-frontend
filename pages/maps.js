import { useEffect } from 'react'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MapContainer from '../components/Maps'
import Loading from '../components/common/Loading'
import Layout from '../components/common/FormLayout'
import { getUserLocations, getFriendsLocations } from '../redux/actions'

const MapsPage = ({
  isAuthenticated,
  dispatch,
  user,
  isLoading
}) => {
  const router = useRouter()

  useEffect(() => {
    if(!isAuthenticated) {
      router.push('/login')
    } else {
      const getLocations = async () => {
        await dispatch(getUserLocations(user.id))
        const friends = get(user, 'friends')
        await dispatch(getFriendsLocations({ friends }))
      }
      getLocations()
    }}, [isAuthenticated, isLoading])

  return (
    <>
      {isAuthenticated ? (
        <MapContainer />
      ) : (
        <Layout style={{alignItems: 'center'}}>
          <Loading />
        </Layout>
      )}
    </>
  )
}

MapsPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default connect(state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  user: state.auth.user
}))(MapsPage)
