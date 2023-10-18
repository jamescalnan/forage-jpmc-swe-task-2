import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

// 1. Modify the IState Interface
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    // 2. Initialize showGraph in the Constructor
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  // 3. Modify the renderGraph Method
  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>);
    }
    return null;
  }

  // 4. Update the getDataFromServer Method
  getDataFromServer() {
    let interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        if (!serverResponds.length) {
          clearInterval(interval);
        } else {
          this.setState({
            data: [...this.state.data, ...serverResponds],
            showGraph: true,
          });
        }
      });
    }, 100);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
