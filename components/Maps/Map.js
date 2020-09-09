import React, { useEffect, useState, useRef } from 'react'
import {connect} from 'react-redux'
import { isEmpty } from 'lodash'
import { render } from 'react-dom'
import PopupContent from './MapComponents/Popup'
import { Provider, useDispatch } from 'react-redux'
import { selectMarker, removeMarker } from '../../redux/actions'

const Map = ({ dispatch, locations, isAuthenticated, userID }) => {

  const [selectedMarker, setSelectedMarker] = useState(null)

  const clickRef = useRef(0)
  // target a point onClick
  const onMapClick = (e, Marker, Popup) => {
    const { lat, lng } = e.latlng

    //add to click counter
    clickRef.current = clickRef.current + 1;
    // timer needed to distinguish double click from single click
    setTimeout(function(){
       if(clickRef.current == 1){
         // check if temporary marker has been set
         if(!selectedMarker) {  // not set
           // clear any selected saved markers
           dispatch(removeMarker())
           setSelectedMarker(
             <Marker position={[lat,lng]}>
               <Popup>
                  <PopupContent/>
               </Popup>
             </Marker>
           )
           dispatch(selectMarker({locationObject: null, location: [lat,lng]}))
         } else { // marker already set
           setSelectedMarker(null)
           dispatch(removeMarker())
         }
          // reset click count after event complete
          clickRef.current = 0
       }
    }, 300);
  }

  // handle double
  const onMapDoubleClick = (e) => {
    clickRef.current = 0
  }

  useEffect(() => {
    const { Map, TileLayer, Marker, Popup } = require('react-leaflet')
    const { userLocations, friendLocations } = locations

    const map = (
        <Map
          onDblClick={onMapDoubleClick}
          onClick={(e) => onMapClick(e, Marker, Popup)}
          style={{height: '100vh'}}
          center={[43.70001, -79.4163]} // Toronto
          zoom={11}
        >
          <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {selectedMarker}
          {friendLocations.map(location => {
            const { latitude, longitude, id } = location
            const onClick = () => {
              setSelectedMarker(null)
              dispatch(removeMarker())
              dispatch(selectMarker({locationObject: location , location: [latitude, longitude]}))
            }
            const changeColor = (e) => e.target.getElement().style.filter = 'sepia(1)'
            return (
              <Marker
                key={id}
                onAdd={changeColor}
                position={[latitude,longitude]}
                onClick={onClick}
              >
                <Popup className="pop">
                   <PopupContent location={location} userID={userID}/>
                </Popup>
              </Marker>
            )
          })}
          {userLocations.map(location => {
            const { latitude, longitude, id } = location
            const onClick = () => {
              setSelectedMarker(null)
              dispatch(removeMarker())
              dispatch(selectMarker({locationObject: location , location: [latitude, longitude]}))
            }
            return (
              <Marker
                key={id}
                position={[latitude,longitude]}
                onClick={onClick}
              >
                <Popup>
                   <PopupContent location={location} userID={userID}/>
                </Popup>
              </Marker>
            )
          })}
        </Map>
    )
    render(map, document.getElementById('mapid'))

  }, [selectedMarker, locations.locationsLoading])

   return (
     <>
       <div id="mapid" />
       <style jsx>
         {`
           :global(.pop) {
             width: 200px;
           }
           #mapid {
             position:absolute;
             top: 0;
             right: 0;
             z-index: 0;
             height: 100vh;
             width: 100%;
             overflow: none;
           }
         `}
       </style>
     </>
   )
 }

export default connect(state => ({
  locations: state.locations,
  isAuthenticated: state.auth.isAuthenticated,
  userID: state.auth.user.id
}))(Map)
