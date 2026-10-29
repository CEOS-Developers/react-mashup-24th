import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CaseDetailPage from './pages/CaseDetailPage/CaseDetailPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SearchResultPage from './pages/SearchResultPage/SearchResultPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchResultPage />} />
        <Route path="/judgments/:judgmentId" element={<CaseDetailPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
