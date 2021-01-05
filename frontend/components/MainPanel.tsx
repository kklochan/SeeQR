// import { dialog } from 'electron';
import React from 'react';
import { Compare } from './leftPanel/Compare';
import History from './leftPanel/History';
import { Tabs } from './rightPanel/Tabs';
import LoadingModal from './LoadingModal';

// const { ipcRenderer } = window.require('electron');

type MainState = {
  queries: {
    queryString: string;
    queryData: {}[];
    queryStatistics: any;
    querySchema: string;
    queryLabel: string;
  }[];
  currentSchema: string;
  lists: any;
  loading: boolean;
  dbSize: string;
};

function MainPanel() {
  const state: MainState = {
    queries: [],
    // currentSchema will change depending on which Schema Tab user selects
    currentSchema: 'defaultDB',
    lists: {
      databaseList: ['defaultDB'],
      tableList: [],
    },
    loading: false,
    dbSize: '',
  };

  // componentDidMount() {
  // ipcRenderer.send('return-db-list');

  // Listening for returnedData from executing Query
  // Update state with new object (containing query data, query statistics, query schema
  // inside of state.queries array
  // ipcRenderer.on('return-execute-query', (event: any, returnedData: any) => {
  //   // destructure from returnedData from backend
  //   const {
  //     queryString,
  //     queryData,
  //     queryStatistics,
  //     queryCurrentSchema,
  //     queryLabel,
  //   } = returnedData;
  //   // create new query object with returnedData
  //   const newQuery = {
  //     queryString,
  //     queryData,
  //     queryStatistics,
  //     querySchema: queryCurrentSchema,
  //     queryLabel,
  //   };
  //   // create copy of current queries array
  //   let queries = this.state.queries.slice();
  //   // push new query object into copy of queries array
  //   queries.push(newQuery);
  //   this.setState({ queries });
  // });

  // ipcRenderer.on(
  //   'db-lists',
  //   (event: any, returnedLists: any, returnedDbSize: string) => {
  //     this.setState((prevState) => ({
  //       ...prevState,
  //       lists: {
  //         databaseList: returnedLists.databaseList,
  //         tableList: returnedLists.tableList,
  //       },
  //       dbSize: returnedDbSize,
  //     }));
  //   }
  // );

  // ipcRenderer.on('switch-to-new', (event: any) => {
  //   const newSchemaIndex = this.state.lists.databaseList.length - 1;
  //   this.setState({
  //     currentSchema: this.state.lists.databaseList[newSchemaIndex],
  //   });
  // });

  // Renders the loading modal during async functions.
  // ipcRenderer.on('async-started', (event: any) => {
  //   this.setState({ loading: true }); // ** James/Katie - changing to false for now to avoid loading modal until we can figure out later why the async complete listener isnt kicking in
  // });

  // ipcRenderer.on('async-complete', (event: any) => {
  //   this.setState({ loading: false });
  // });
  // }

  // onClickTabItem(tabName) {
  //   ipcRenderer.send('change-db', tabName);
  //   ipcRenderer.send('return-db-list', tabName);
  //   this.setState({ currentSchema: tabName });
  // }

  return (
    <div id="main-panel">
      <div>
        <LoadingModal show={state.loading} />
      </div>
      <div id="main-left">
        <History queries={state.queries} currentSchema={state.currentSchema} />
        <Compare queries={state.queries} currentSchema={state.currentSchema} />
      </div>
      <Tabs
        currentSchema={state.currentSchema}
        tabList={state.lists.databaseList}
        queries={state.queries}
        onClickTabItem={/*onClickTabItem*/ () => {}}
        tableList={state.lists.tableList}
        databaseSize={state.dbSize}
      />
    </div>
  );
}

export default MainPanel;
