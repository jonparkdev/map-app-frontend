const Layout = ({ children, style }) => (
  <div className='full-height-container' {...{style}}>
    {children}
    <style jsx>
      {`
        .full-height-container {
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .full-height-container::before, .full-height-container::after {
          height: 24px;
          content: '';
          display: block;
          flex-grow: 1;
        }
      `}
    </style>
  </div>
)

export default Layout
