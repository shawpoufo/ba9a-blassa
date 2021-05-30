import moment from 'moment-timezone'
import React, { useState } from 'react'

const StopOverList = ({ stopOvers }) => {
  return (
    <div className={`card-body container `} aria-expanded={false}>
      <div className="row row-cols-1">
        {stopOvers.map((stopOver, index) => {
          return (
            <div key={stopOver.id} className="col ">
              <div className="row">
                <div className="col-1">
                  <span className="badge bg-dark text-light">{index + 1}</span>
                </div>
                <div className="col">
                  {' '}
                  <span className="badge bg-dark text-light">
                    {stopOver.city}{' '}
                  </span>
                </div>
                <div className="col">{stopOver.name}</div>
                <div className="col">
                  {moment(stopOver.stopDate).format('YYYY/MM/DD HH:mm')}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StopOverList
