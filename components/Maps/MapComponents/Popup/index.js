const Popup = ({ location, userID }) => {
  const { latitude, longitude , owner_name, name, owner } = location
  console.log()
  return (
    <div style={{display:'flex', flexDirection:'column'}} >
      <div className='title'> {name} </div>
      <div className='location'> {`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`} </div>
      <div className='owner'> {`${userID === owner ? 'My' : `${owner_name}'s`} Location`} </div>
      <style jsx>
      {`
        .title {
          font-size: 16px;
          font-weight:bold;
          color: hsl(180,100%,25.1%);
        }
        .owner {
          margin-top: 4px;
          font-weight: bold;
        }
      `}
      </style>
    </div>
  )
}

export default Popup
