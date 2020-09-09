import {
  reduxForm,
  Field,
  formValueSelector,
  initialize,
  SubmissionError
} from 'redux-form'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { renderTextField } from '../../common/MaterialComponents'
import {
  addLocation,
  updateLocation,
  removeMarker,
  deleteLocation
} from '../../../redux/actions'
import Loading from '../../common/Loading'

const AddLocationForm = ({
  dispatch,
  selectedMarker,
  handleSubmit,
  location_name
}) => {
  // marker location information
  const location = get(selectedMarker, 'location', null)
  const locationID = get(selectedMarker, 'locationObject.id', null)

  // flag to tell react to repaint on new marker selection
  const locationRerender = get(location, [0], null)

  // loading flag for async functions
  const [loading, setLoading] = useState(false)
  // ref is used for css transitions rather than repaint the component
  const containerRef = useRef()

  useEffect(() => {
    const location_name = get(selectedMarker.locationObject, 'name', '')
    // on every new marker clicked reset form value
    dispatch(initialize('location-form', { location_name }))
  }, [locationRerender])

  // no location -> hide tray
  if(!location) {
    return null;
  }

  // did the user click on old or new location
  const newLocation = !selectedMarker.locationObject
  // get name of location marker
  const locationName = get(selectedMarker.locationObject, 'name', 'New Location')
  // get Coordinated of marker
  const coordinates = `${location[0].toFixed(5)}, ${location[1].toFixed(5)}`

  // toggle tray
  const toggle = () => {
    const tray = document.getElementById('tray')
    if(tray.classList.length < 2){
      tray.classList.add("open")
    } else {
      tray.classList.remove("open")
    }
  }

  // submit for POST and PATCH requests
  const submitForm = async (values) => {
    setLoading(true)
    if (!values.location_name) {
      setLoading(false);
      throw new SubmissionError({
        location_name: 'Field cannot be blank',
      });
    }

    if(newLocation) {  // adding new location
      const payload = {
        name: location_name,
        latitude: location[0],
        longitude: location[1]
      }

      await dispatch(addLocation(payload))
    } else { // updating location
      const payload = {
        name: location_name,
        locationID
      }
      await dispatch(updateLocation(payload))
    }

    setLoading(false);
    dispatch(removeMarker())
  }

  // callback to delete marker
  const deleteMarker = () => {
    setLoading(true)
    const payload = {
      locationID
    }
    dispatch(deleteLocation(payload))
    setLoading(false);
    dispatch(removeMarker())
  }

  return (
    <div id="tray">
      <div className="header-container">
        <div className="header">
          <div className="title"> {locationName} </div>
          <div className="location"> {coordinates} </div>
        </div>
        <button className='settings' onClick={() => toggle()} >
          <span className='material-icons'> settings </span>
        </button>
      </div>
      <div className="divider" />
      <form onSubmit={handleSubmit(submitForm)}>
        <Field
          name="location_name"
          label="Location Name"
          type="text"
          component={renderTextField}
          style={{width: '100%'}}
        />
        <div className='row'>
          {!newLocation ? (
            !loading ? (
              <div
                id="delete-button"
                onClick={() => deleteMarker()}
                style={{
                  backgroundColor: 'red',
                  marginLeft: 0,
                  minWidth: 0
                }}
              >
                Delete
              </div>
            ) : (
              <Loading style={{marginLeft:'auto', transform: 'scale(.5)'}}/>
            )
          ) : null}

          {loading ? (
            <Loading style={{marginLeft:'auto', transform: 'scale(.5)'}}/>
          ) : (
            <button type="submit" >
              {`${newLocation ? 'Add' : 'Edit'} Location`}
            </button>
          )}
        </div>
      </form>
      <style jsx>
        {`
          #tray {
            padding: 1rem 1.5rem;
            background-color: hsla(0, 0%, 100%, .8);
            position: absolute;
            width: 475px;
            bottom: -150px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 8px 8px 0 0;
            transition: bottom .5s;
          }

          #tray.open {
            bottom: 0;
          }

          .row {
            display: flex;
            justify-content: flex-start;
            margin-top: 1rem;
          }
          .header-container {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          button, #delete-button {
            cursor: pointer;
            margin-left: auto;
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

          .header {
            display: flex;
            flex-direction: column;
            font-size: 1.5rem;
          }

          .header .location {
            font-size: 1.2rem;
            color: hsl(0, 0%, 40%);
            margin-top: .25rem;
          }

          .divider {
            border-bottom: 1px solid hsl(0, 0%, 60%);
            margin: 1.25rem 4rem;
          }

          button.settings {
            display: flex;
            align-items: center;
            padding: 1rem;
            min-width: 0;
            border-radius: 50%;
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
  const selector = formValueSelector('location-form')
  return {
    location_name: selector(state, 'location_name'),
    selectedMarker: state.locations.selectedMarker,
  }
})(reduxForm({
  form: 'location-form',
})(AddLocationForm))
