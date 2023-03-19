import logo from './logo.svg';
import './App.css';
// import { PointsSummeryPage } from './feature/pointsSummary/page/PointsSummeryPage';
import { ErrorsRegisterProvider } from './core/errorHandling/context/ErrorsRegister';
import { Errors } from './core/errorHandling/component/Errors';

function App() {
  return (
    <ErrorsRegisterProvider>
      <Errors />
      <div className="App">
        {/* <PointsSummeryPage /> */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ErrorsRegisterProvider>
  );
}

export default App;
