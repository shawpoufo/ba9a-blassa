import React, { useEffect } from 'react'
import shallow from 'zustand/shallow'

const CompanyPart = ({ companies, selectedCompany, setCompany }) => {
  function changeCompanyState(e) {
    const name = e.target.value
    const c = companies.find((x) => x.name === name)
    setCompany({ id: c?.id ? c?.id : null, name })
  }

  return (
    <div className="row row-cols-2 justify-content-start">
      <label className="col-1 col-form-label">Company </label>
      <div className="col-3">
        <input
          className="form-control form-control-sm"
          onInput={changeCompanyState}
          name="company"
          list="companies"
          value={selectedCompany.name}
        />
        <datalist id="companies">
          {companies.map((company) => {
            return <option key={company.id} value={company.name} />
          })}
        </datalist>
      </div>
    </div>
  )
}

export default CompanyPart
