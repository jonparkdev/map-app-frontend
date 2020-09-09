import { useState, useEffect } from 'react'
import Map from './Map'
import Logout from './MapComponents/Logout'
import AddLocationForm from './MapComponents/AddLocationForm'
import Share from './MapComponents/Share'
import Friends from './MapComponents/Friends'

const MapsContainer = () => {

  return (
    <>
      <div className="map-container">
        <Logout />
        <Map />
        <AddLocationForm />
        <Share />
        <Friends />
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
