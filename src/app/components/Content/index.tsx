import './index.css'

import * as MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import * as MdClearAll from 'react-icons/lib/md/clear-all'
import * as React from 'react'

import Link from '../Link'
import Store from '../../Store'
import { observer } from 'mobx-react'

export interface IProps {
  store: Store
}

@observer
class Content extends React.Component<IProps, {}> {
  private el: HTMLDivElement | null = null
  private atBottom: boolean = true

  public componentWillUpdate() {
    if (this.el) {
      this.atBottom = this.isAtBottom()
    }
  }

  public componentDidUpdate() {
    if (this.atBottom) {
      this.scrollToBottom()
    }
  }

  public isAtBottom() {
    if (this.el) {
      const { scrollHeight, scrollTop, clientHeight } = this.el
      return scrollHeight - scrollTop === clientHeight
    } else {
      return true
    }
  }

  public scrollToBottom() {
    if (this.el) {
      this.el.scrollTop = this.el.scrollHeight
    }
  }

  public onScroll() {
    this.atBottom = this.isAtBottom()
  }

  public render() {
    const { store } = this.props
    const monitor = store.monitors.get(store.selectedMonitorId)
    return (
      <div
        className='content'
        onScroll={() => this.onScroll()}
        ref={el => {
          this.el = el
        }}>
        <div className='content-bar'>
          <span>
            <Link id={store.selectedMonitorId} />
          </span>
          <span>
            <button
              title='Clear output'
              onClick={() => store.clearOutput(store.selectedMonitorId)}>
              <MdClearAll />
            </button>
            <button
              title='Scroll to bottom'
              onClick={() => this.scrollToBottom()}>
              <MdArrowDownward />
            </button>
          </span>
        </div>
        <pre>
          {monitor &&
            monitor.output.map(line => (
              <div
                key={line.id}
                dangerouslySetInnerHTML={{ __html: line.html }}
              />
            ))}
        </pre>
      </div>
    )
  }
}

export default Content
