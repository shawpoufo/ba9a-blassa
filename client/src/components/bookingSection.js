import React from 'react'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import Select from 'react-select'
const BookingSection = ({ trip }) => {
  // import './examples/custom-styling.css';
  const [open, setOpen] = React.useState(false)

  function getSeatOptions() {
    const options = []
    for (let i = 1; i < trip.seatCount; i++) {
      options.push({
        value: i,
        label: i,
        isdisabled: trip.Bookings.includes((b) => b.seatNumber === i),
      })
    }
    return options
  }

  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        Open modal
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="row row-cols-1">
                <div className="col">
                  <Select
                    isMulti
                    options={getSeatOptions()}
                    isOptionDisabled={(option) => option.isdisabled}
                  />
                </div>
                <div className="col height:500px">Facturation</div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default BookingSection
