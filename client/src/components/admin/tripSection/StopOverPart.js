import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import useStationStore from '../../../stores/StationStore'

//----private function
const today = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  return `${year}-${month < 10 ? `0${month}` : month}-${day}`
}

//------component
const StopOverPart = ({
  stations,
  selectedStopOvers,
  setSelectedStopOvers,
}) => {
  const [stopOver, setStopOver] = useState({
    id: null,
    name: '',
    city: '',
    stopDate: '',
  })
  useEffect(() => {
    setStopOver((s) => ({
      ...s,
      stopDate: today(),
    }))
  }, [])

  useEffect(() => {
    setStopOver((s) => {
      return { ...s, name: '', id: null }
    })
  }, [stopOver.city])

  function changeStopOver(e) {
    const searchedStation =
      e.target.name === 'name'
        ? stations.find(
            (s) => s.name.toLowerCase() === e.target.value.toLowerCase()
          )
        : null
    setStopOver((s) => {
      return {
        ...s,
        [e.target.name]: e.target.value,
        id: searchedStation ? searchedStation.id : s.id,
      }
    })
  }
  function addStopOver() {
    setSelectedStopOvers((list) => [...list, stopOver])
  }
  return (
    <div>
      <div>
        <label>ville :</label>
        <input
          value={stopOver.city}
          onChange={changeStopOver}
          name="city"
          list="citylist"
        />
        <datalist id="citylist">
          {stations.map((sta) => (
            <option key={sta.city} value={sta.city} />
          ))}
        </datalist>
        <label>station :</label>
        <input
          value={stopOver.name}
          onChange={changeStopOver}
          name="name"
          list="stationlist"
          disabled={stopOver.city ? false : true}
        />
        <datalist id="stationlist">
          {stations.map((sta) =>
            sta.city === stopOver.city ? (
              <option key={sta.name} value={sta.name} />
            ) : null
          )}
        </datalist>
        <label>Date de l'escale</label>
        <input
          type="date"
          value={stopOver.stopDate}
          onChange={changeStopOver}
          name="stopDate"
        />
        <button onClick={addStopOver}>Ajouter</button>
      </div>
      <div>
        {selectedStopOvers.map((sStopOver, index) => (
          <div key={index}>
            <label>{sStopOver.city}</label> ; <label>{sStopOver.name}</label> ;
            <label>{sStopOver.stopDate}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StopOverPart
