import React, { Component } from 'react';
//delete before pull request
import DummyDataPanel from './DummyDataPanel';

// const { ipcRenderer } = window.require('electron');
// const { dialog } = require('electron').remote;

// Codemirror configuration
import 'codemirror/lib/codemirror.css'; // Styline
import 'codemirror/mode/sql/sql'; // Language (Syntax Highlighting)
import 'codemirror/theme/lesser-dark.css'; // Theme
import CodeMirror from '@skidding/react-codemirror';
import { json } from 'express';

/************************************************************
 *********************** TYPESCRIPT: TYPES ***********************
 ************************************************************/

type QueryProps = {
  currentSchema: string;
  tableList: string[];
  dbSize: string;
  submit: Function;
};

type state = {
  queryString: string;
  queryLabel: string;
  show: boolean;
  //if true, will add query results to the bar chart
  trackQuery: boolean;
};

class Query extends Component<QueryProps, state> {
  constructor(props: QueryProps) {
    super(props);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.handleTrackQuery = this.handleTrackQuery.bind(this);
    // this.submitQuery = this.submitQuery.bind(this);
  }

  state: state = {
    queryString: '',
    queryLabel: '',
    show: false,
    trackQuery: false,
  };

  // componentDidMount() {
  //   ipcRenderer.on('query-error', (event: any, message: string) => {
  //     // dialog.showErrorBox('Error', message);
  //   });
  // }

  // Updates state.queryString as user inputs query label
  handleLabelEntry(event: any) {
    this.setState({ queryLabel: event.target.value });
  }

  // Updates state.trackQuery as user checks or unchecks box
  handleTrackQuery(event: any) {
    this.setState({ trackQuery: event.target.checked });
  }

  // Updates state.queryString as user inputs query string
  updateCode(newQueryString: string) {
    this.setState({
      queryString: newQueryString,
    });
  }

  // Submits query to backend on 'execute-query' channel
  handleQuerySubmit(event: any) {
    // event.preventDefault();
    // // if query string is empty, show error
    // if (!this.state.queryString) {
    //   dialog.showErrorBox('Please enter a Query.', '');
    // }
    // if (!this.state.trackQuery) {
    //   //functionality to send query but not return stats and track
    //   const queryAndSchema = {
    //     queryString: this.state.queryString,
    //     queryCurrentSchema: this.props.currentSchema,
    //     queryLabel: this.state.queryLabel,
    //   };
    //   ipcRenderer.send('execute-query-untracked', queryAndSchema);
    //   //reset frontend inputs to display as empty and unchecked
    //   this.setState({ queryLabel: '', trackQuery: false, queryString: '' });
    // }
    // if (this.state.trackQuery && !this.state.queryLabel) {
    //   dialog.showErrorBox('Please enter a label for the Query.', '');
    // } else if (this.state.trackQuery) {
    //   // send query and return stats from explain/analyze
    //   const queryAndSchema = {
    //     queryString: this.state.queryString,
    //     queryCurrentSchema: this.props.currentSchema,
    //     queryLabel: this.state.queryLabel,
    //   };
    //   ipcRenderer.send('execute-query-tracked', queryAndSchema);
    //   //reset frontend inputs to display as empty and unchecked
    //   this.setState({ queryLabel: '', trackQuery: false, queryString: '' });
    // }
  }

  render() {
    // Codemirror module configuration options
    var options = {
      lineNumbers: true,
      mode: 'sql',
      theme: 'lesser-dark',
    };

    return (
      <div id="query-panel">
        <div id="database-info">Database Size: {this.props.dbSize}</div>
        <div id="delete-me">
          <DummyDataPanel
            tableList={this.props.tableList}
            currentSchema={this.props.currentSchema}
          />
        </div>
        <h3>Query</h3>
        <form onSubmit={(e) => this.props.submit(e, this.state.queryString)}>
          <div className="query-label">
            <div id="chart-option">
              <span>track on chart:</span>
              <input
                id="track"
                type="checkbox"
                checked={this.state.trackQuery}
                onChange={this.handleTrackQuery}
              ></input>
            </div>
            <div id="label-option">
              <label>label: </label>
              <input
                className="label-field"
                type="text"
                placeholder="enter label to track"
                value={this.state.queryLabel}
                onChange={(e) => this.handleLabelEntry(e)}
              />
            </div>
          </div>
          <br />
          <label>Query:</label>
          {/* <input type="select" onClick={this.handleQueryPrevious}/> */}
          <div className="codemirror">
            <CodeMirror
              onChange={this.updateCode}
              options={options}
              value={this.state.queryString}
            />
          </div>
          <button>Submit</button>
          <br />
          <br />
        </form>
      </div>
    );
  }
}

export default Query;
