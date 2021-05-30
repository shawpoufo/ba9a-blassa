import React from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { WiTime4 } from 'react-icons/wi'
import { FaMapSigns } from 'react-icons/fa'
import moment from 'moment-timezone'

const TripInfo = ({ trip }) => {
  return (
    <div className={`card-body`}>
      <div className="row ">
        <div className="col-12 col-sm-4">{trip.Company.name}</div>
        {/* trip info */}
        <div className="col-5 col-sm-3 text-start">
          <div className="row ">{trip.Start.city}</div>
          <div className="row">{trip.Start.name}</div>
          <div className="row">
            {moment(trip.startDate).format('YYYY/MM/DD HH:mm')}
          </div>
        </div>
        <div className="col-2 col-sm-2 text-start">
          <div className="row-1">
            <IoLocationOutline size="1.5em" />
          </div>
          <div className="row-1">
            <FaMapSigns size="1.5em" />
          </div>
          <div className="row-1">
            <WiTime4 size="1.5em" />
          </div>
        </div>
        <div className="col-5 col-sm-3 text-end">
          <div className="row"> {trip.End.city}</div>
          <div className="row">{trip.End.name}</div>
          <div className="row">
            {moment(trip.endDate).format('YYYY/MM/DD HH:mm')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripInfo
