import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Layout from "components/Layout"
import { routes } from "const"

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => {
          return (
            <Route path={route.path} key={route.path}>
              <Layout>
                <route.component />
              </Layout>
            </Route>
          )
        })}
      </Switch>
    </Router>
  )
}

export default App
