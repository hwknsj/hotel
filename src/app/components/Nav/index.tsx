import './index.css'

import * as React from 'react'
import * as classNames from 'classnames'

import Store, { RUNNING } from '../../Store'

import Link from '../Link'
import Switch from '../Switch'
import { observer } from 'mobx-react'

const examples = `~/app$ hostel add 'cmd'
~/app$ hostel add 'cmd -p $PORT'
~/app$ hostel add http://192.16.1.2:3000`

export interface IProps {
  store: Store
}

function Nav({ store }: IProps) {
  const { isLoading, selectedMonitorId, monitors, proxies } = store
  return (
    <div className='nav'>
      <header>hostel</header>
      <div className={classNames('menu', { hidden: isLoading })}>
        {monitors.size === 0 && proxies.size === 0 && (
          <div>
            <p>To add a server, use hostel add</p>
            <pre>
              <code>{examples}</code>
            </pre>
          </div>
        )}

        {monitors.size > 0 && (
          <div>
            <h2>monitors</h2>
            <ul>
              {Array.from(monitors).map(([id, monitor]) => {
                return (
                  <li
                    key={id}
                    className={classNames('monitor', {
                      running: monitor.status === RUNNING,
                      selected: id === selectedMonitorId
                    })}
                    onClick={() => store.selectMonitor(id)}>
                    <span>
                      <Link id={id} />
                    </span>
                    <span>
                      <Switch
                        onClick={() => store.toggleMonitor(id)}
                        checked={monitor.status === RUNNING}
                      />
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {proxies.size > 0 && (
          <div>
            <h2>proxies</h2>
            <ul>
              {Array.from(proxies).map(([id, proxy]) => {
                return (
                  <li key={id}>
                    <span>
                      <Link id={id} />
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      <footer>
        <a href='https://github.com/typicode/hostel' target='_blank'>
          README
        </a>
      </footer>
    </div>
  )
}

export default observer(Nav)
