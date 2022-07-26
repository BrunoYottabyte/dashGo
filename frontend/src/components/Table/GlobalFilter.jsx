import React from 'react'

const GlobalFilter = ({value, setValue}) => {
  return (
    <span>
        Search: {' '}
        <input value={value || ''} 
            onChange={e => setValue(e.target.value)}
        />
    </span>
  )
}

export default GlobalFilter