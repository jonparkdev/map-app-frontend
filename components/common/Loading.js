import React from 'react';
import PropTypes from 'prop-types'

const Loading = ({ style }) => (
  <>
    <div className="loading-roller" style={{ ...style }}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <style jsx>
      {`
        .loading-roller {
          display: inline-block;
          position: relative;
          width: 64px;
          height: 64px;
        }
        .loading-roller div {
          animation: loading-roller 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          transform-origin: 32px 32px;
        }
        .loading-roller div:after {
          content: ' ';
          display: block;
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: hsl(213, 40%, 60%);
          margin: -3px 0 0 -3px;
        }

        .loading-roller div:nth-child(1) {
          animation-delay: -0.036s;
        }
        .loading-roller div:nth-child(1):after {
          top: 50px;
          left: 50px;
        }

        .loading-roller div:nth-child(2) {
          animation-delay: -0.072s;
        }
        .loading-roller div:nth-child(2):after {
          top: 54px;
          left: 45px;
        }

        .loading-roller div:nth-child(3) {
          animation-delay: -0.108s;
        }
        .loading-roller div:nth-child(3):after {
          top: 57px;
          left: 39px;
        }

        .loading-roller div:nth-child(4) {
          animation-delay: -0.144s;
        }
        .loading-roller div:nth-child(4):after {
          top: 58px;
          left: 32px;
        }

        .loading-roller div:nth-child(5) {
          animation-delay: -0.18s;
        }
        .loading-roller div:nth-child(5):after {
          top: 57px;
          left: 25px;
        }

        .loading-roller div:nth-child(6) {
          animation-delay: -0.216s;
        }
        .loading-roller div:nth-child(6):after {
          top: 54px;
          left: 19px;
        }

        .loading-roller div:nth-child(7) {
          animation-delay: -0.252s;
        }
        .loading-roller div:nth-child(7):after {
          top: 50px;
          left: 14px;
        }

        .loading-roller div:nth-child(8) {
          animation-delay: -0.288s;
        }
        .loading-roller div:nth-child(8):after {
          top: 45px;
          left: 10px;
        }

        @keyframes loading-roller {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
  </>
);

Loading.propTypes = {
  style: PropTypes.obj
}

export default Loading
