import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes } from '@/routes';
import DefaultLayout from '@/layouts';
import { Login } from '@/pages';
import { useToken } from '@/hooks';
import { getRoleUserByToken, isTokenExpired } from '@/function';
import { autoLogout } from './function';

function App() {
    const { token, setToken } = useToken();
    if (!token || isTokenExpired(token)) {
        return <Login setToken={setToken} />;
    } else {
        autoLogout(token);
        const role = getRoleUserByToken(token);
        const routes = privateRoutes.filter((item) => item.role.some((i) => i === role));
        return (
            <Router>
                <div className="App">
                    <Routes>
                        {routes.length > 0
                            ? routes.map((route, index) => {
                                  const Layout =
                                      route.layout === null
                                          ? Fragment
                                          : route.layout || DefaultLayout;
                                  const Page = route.component;

                                  return (
                                      <Route
                                          key={index}
                                          path={route.path}
                                          element={
                                              <Layout>
                                                  <Page />
                                              </Layout>
                                          }
                                      />
                                  );
                              })
                            : null}
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
