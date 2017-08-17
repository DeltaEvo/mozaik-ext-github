import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ResponsiveBar } from 'nivo'

const margin = { top: 10, right: 10, bottom: 54, left: 60 }
const format = d => moment(d).format('MM/DD')
const axisLeft = {
    legend: 'visitors',
    legendPosition: 'center',
    legendOffset: -40,
}
const axisBottom = {
    format,
    tickRotation: -60,
}

export default class RepoTrafficViewsHistogramChart extends Component {
    static propTypes = {
        views: PropTypes.array.isRequired,
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { views, theme } = this.props

        return (
            <ResponsiveBar
                margin={margin}
                data={views}
                theme={theme.charts}
                groupMode="stacked"
                indexBy="timestamp"
                keys={['uniques', 'others']}
                animate={false}
                xPadding={0.3}
                axisLeft={axisLeft}
                axisBottom={axisBottom}
                labelsTextColor="inherit:darker(1.2)"
                labelsLinkColor="inherit"
                colors={theme.charts.colors}
            />
        )
    }
}
