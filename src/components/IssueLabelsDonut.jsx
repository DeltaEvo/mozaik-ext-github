import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
const  { Pie }                         = Mozaik.Component;


class IssueLabelsDonut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total:  0,
            labels: []
        };
    }

    getApiRequest() {
        let { repository } = this.props;

        return {
            id:     `github.issues.${ repository }`,
            params: {
                repository: repository
            }
        };
    }

    onApiData(issues) {
        var labels = {};
        issues.forEach(issue => {
            issue.labels.forEach(label => {
                if (!labels[label.url]) {
                    labels[label.url] = label;
                    labels[label.url].count = 0;
                }
                labels[label.url].count++;
            });
        });

        this.setState({
            labels: labels,
            total:  issues.length
        });
    }

    render() {
        let { labels, total } = this.state;

        let flatLabels = _.values(labels);
        let data       = flatLabels.map(label => {
            label.color = `#${ label.color }`;
            label.id    = label.name;
            label.label = label.name;

            return label;
        });

        return (
            <div>
                <div className="widget__header">
                    Github issues types
                    <i className="fa fa-github" />
                </div>
                <div className="widget__body">
                    <Pie data={data} count={total} countLabel={total > 1 ? 'issues' : 'issue'} innerRadius={0.7}/>
                </div>
            </div>
        );
    }
}

IssueLabelsDonut.propTypes = {
    repository: PropTypes.string.isRequired
};

reactMixin(IssueLabelsDonut.prototype, ListenerMixin);
reactMixin(IssueLabelsDonut.prototype, Mozaik.Mixin.ApiConsumer);

export { IssueLabelsDonut as default };
