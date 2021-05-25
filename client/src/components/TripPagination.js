import React, { useEffect, useState } from 'react'
import useTripStore from '../stores/TripStore'
import shallow from 'zustand/shallow'
const TripPagination = () => {
  const [count, offset, setSearchQuery, addParam, searchObject, fetchTrips] =
    useTripStore(
      (state) => [
        state.count,
        state.offset,
        state.setSearchQuery,
        state.addParam,
        state.searchObject,
        state.fetchTrips,
      ],
      shallow
    )
  const [pageNumber, setPageNumber] = useState(1)
  const [action, setAction] = useState('')
  useEffect(() => {
    addParam({ browse: action })
    setSearchQuery()
    fetchTrips()
  }, [pageNumber])
  useEffect(() => {
    if (offset === null) {
      setPageNumber(1)
      setAction('')
    }
  }, [offset])

  function browse(e) {
    const action = e.target.value
    const lastPageNumber = Math.ceil(count / 5)
    if (pageNumber <= lastPageNumber && pageNumber >= 1) {
      if (action === 'next' && pageNumber < lastPageNumber) {
        addParam({ offset: offset })
        setPageNumber((state) => state + 1)
        setAction('next')
      }
      if (action === 'back' && pageNumber - 1 >= 1) {
        addParam({ offset: offset })
        setPageNumber((state) => state - 1)
        setAction('back')
      }
    }
  }
  return (
    <div>
      <h3>offset : {offset || offset === 0 ? offset : 'no offset'}</h3>
      <h3>number of pages : {Math.ceil(count / 5)}</h3>
      <h4>page : {pageNumber}</h4>
      <button name="back" value="back" onClick={browse}>
        back
      </button>
      <button name="next" value="next" onClick={browse}>
        next
      </button>
    </div>
  )
}
export default TripPagination
