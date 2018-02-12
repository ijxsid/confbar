import React from 'react'
import { func, number, array, object } from 'prop-types'

class TabState extends React.Component {
  state = { currentTab: 0 }

  onUpdateTab = (tabIndex) => {
    this.setState(() => ({
      currentTab: tabIndex
    }))
  }

  render () {
    return this.props.render({
      currentTab: this.state.currentTab,
      onUpdate: this.onUpdateTab
    })
  }
}


TabState.propTypes = {
  render: func
}

const TabButtons = ({ currentTab, onUpdate, tabHeadings }) => (
  <div className="tabs">
    <ul>
      { tabHeadings.map((tabHeading, i) => (
        <li className={`${i === currentTab ? 'is-active' : ''}`} key={i} >
          <a onClick={() => { onUpdate(i) }}> {tabHeading} </a>
        </li>
      ))}

    </ul>
  </div>
)

TabButtons.propTypes = {
  currentTab: number,
  onUpdate: func,
  tabHeadings: array.isRequired
}

const TabDisplay = ({ currentTab, comps }) => comps[currentTab]

TabDisplay.propTypes = {
  currentTab: number,
  comps: array.isRequired
}

const Tabs = ({ comps }) => {
  const headings = Object.keys(comps)
  const components = headings.map(heading => comps[heading])
  return (
    <TabState
      render={
        ({ currentTab, onUpdate }) => (
          <div>
            <TabButtons
              currentTab={currentTab}
              onUpdate={onUpdate}
              tabHeadings={headings}
            />
            <TabDisplay
              currentTab={currentTab}
              comps={components}
            />
          </div>
        )
      }
    />
  )
}

Tabs.propTypes = {
  comps: object.isRequired
}


export default Tabs
