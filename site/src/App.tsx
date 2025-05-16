import { BrowserRouter, Route, Routes } from 'react-router';
import { api, guide } from '../docs';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { ApiPath, GuidePath, Path } from './constants';
import Docs from './pages/docs';
import MdxContent from './pages/docs/MdxContent';
import Home from './pages/home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop>
        <Routes>
          <Route path={Path.Home} element={<Home />} />

          <Route element={<Docs />}>
            <Route path={GuidePath.Base}>
              <Route index element={<MdxContent mdxModule={guide.gettingStarted} />} />
              <Route path={GuidePath.GettingStarted} element={<MdxContent mdxModule={guide.gettingStarted} />} />
              <Route path={GuidePath.WhyLovit} element={<MdxContent mdxModule={guide.whyLovit} />} />
              <Route path={GuidePath.Concepts} element={<MdxContent mdxModule={guide.concepts} />} />
              <Route path={GuidePath.Usage} element={<MdxContent mdxModule={guide.usage} />} />
            </Route>

            <Route path={ApiPath.Base}>
              <Route index element={<MdxContent mdxModule={api.fetchLovit} />} />
              <Route path={ApiPath.FetchLovit} element={<MdxContent mdxModule={api.fetchLovit} />} />
              <Route path={ApiPath.CreateProfile} element={<MdxContent mdxModule={api.createProfile} />} />
              <Route path={ApiPath.ConfigureLovit} element={<MdxContent mdxModule={api.configureLovit} />} />
              <Route path={ApiPath.ThrowError} element={<MdxContent mdxModule={api.throwError} />} />
              <Route path={ApiPath.LovitError} element={<MdxContent mdxModule={api.lovitError} />} />
            </Route>
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
