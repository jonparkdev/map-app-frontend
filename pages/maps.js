import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MapContainer from '../components/Maps'
import Loading from '../components/common/Loading'
import Layout from '../components/common/FormLayout'

const MapsPage = ({
  isAuthenticated
}) => {
  const router = useRouter()

  useEffect(() => {
    if(!isAuthenticated) { router.push('/login') }
  }, [isAuthenticated])

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
  isAuthenticated: state.auth.isAuthenticated
}))(MapsPage)
