import { useState, useEffect } from 'react'
import Map from './Map'
import Logout from './MapComponents/Logout'
import AddLocationForm from './MapComponents/AddLocationForm'
//import SearchBox from '../MapComponents/SeachBox'

const MapsContainer = () => {

  return (
    <>
      <div className="map-container">
        <Logout />
        <Map />
        <AddLocationForm />
      </div>
      <style jsx>
        {`
          .map-container {
            min-height: 100vh;
            position: relative;
            overflow:hidden;
          }
        `}
      </style>
    </>
  )
}

export default MapsContainer
