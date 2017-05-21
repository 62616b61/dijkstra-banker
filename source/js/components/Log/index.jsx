import React from 'react'

import * as styles from './styles.css'

const Log = (props) => {
  return (
    <div>
      <h5>Event log</h5>
      {props.log.map((entry, i) => <p key={i} className={styles.entry}>{entry}</p>)}
    </div>
  )
}

export default Log
