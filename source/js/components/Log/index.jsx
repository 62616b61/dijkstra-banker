import React from 'react'

import * as styles from './styles.css'

console.log(styles)

const Log = (props) => {
  return (
    <div>
      <h5>Event log</h5>
      {props.log.map((entry, i) => {
        return (
          <p key={i} className={styles.entry}>{entry}</p>
        )
      })}
    </div>
  )
}

export default Log
