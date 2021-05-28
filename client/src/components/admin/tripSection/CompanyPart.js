import React, { useEffect } from 'react'
import shallow from 'zustand/shallow'

const CompanyPart = ({ companies, selectedCompany, setCompany }) => {
  function changeCompanyState(e) {
    const name = e.target.value
    const c = companies.find((x) => x.name === name)
    setCompany({ id: c?.id ? c?.id : null, name })
  }

  return (
    <div>
      <div>
        <label>Company </label>
        <input
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
