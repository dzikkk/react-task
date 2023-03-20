import './App.css';
import { Layout as PointSummaryPage } from './feature/pointsSummary/page/Layout';
import { ErrorsRegisterProvider } from './core/errorHandling/context/ErrorsRegister';
import { Errors } from './core/errorHandling/component/Errors';

function App() {
  return (
    <ErrorsRegisterProvider>
      <Errors />
      <div className="App">
        <PointSummaryPage />
      </div>
    </ErrorsRegisterProvider>
  );
}

export default App;
