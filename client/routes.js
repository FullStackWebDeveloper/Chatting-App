/* eslint-disable global-require */
import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import cookie from "react-cookie";
import App from "./modules/App/App";

// require.ensure polyfill for node
if (typeof require.ensure !== "function") {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== "production") {
  // Require async routes only in development for react-hot-reloader to work.
  require("./modules/Workspace/pages/WorkspaceListPage/WorkspaceListPage");
  require("./modules/Workspace/pages/WorkspaceDetailPage/WorkspaceDetailPage");
}

const requireLoggedIn = (nextState, replace, cb) => {
  const authCookie = cookie.load("mernAuth");
  if (!authCookie || !authCookie.t) {
    replace("/");
  }
  cb();
};
const requireNotLoggedIn = (nextState, replace, cb) => {
  const authCookie = cookie.load("mernAuth");
  if (authCookie && authCookie.t) {
    replace("/");
  }
  cb();
};

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/App/components/Home/Home').default);
        });
      }}
    />

    <Route
      path="/workspaces"
      onEnter={requireNotLoggedIn}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require("./modules/Workspace/pages/WorkspaceListPage/WorkspaceListPage")
              .default
          );
        });
      }}
    />
    <Route
      path="/workspaces/:display_name"
      onEnter={requireNotLoggedIn}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require("./modules/Workspace/pages/WorkspaceDetailPage/WorkspaceDetailPage")
              .default
          );
        });
      }}
    />
      <Route
        path="/workspaces/:display_name/login"
        onEnter={requireNotLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(
              null,
              require("./modules/User/pages/LoginPage/LoginPage").default
            );
          });
        }}
      />
      <Route
        path="/workspaces/:display_name/register"
        onEnter={requireNotLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(
              null,
              require("./modules/User/pages/RegisterPage/RegisterPage").default
            );
          });
        }}
      />
      {/* TODO refactor above to use !requireLoggedIn and get rid of requireNotLoggedIn???*/}
      <Route
        path="/workspaces/:display_name/profile"
        onEnter={requireLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(
              null,
              require("./modules/User/pages/ProfilePage/ProfilePage").default
            );
          });
        }}
      />
      <Route
        path="/workspaces/:display_name/chat"
        onEnter={requireLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require("./modules/Chat/pages/ChatPage/ChatPage").default);
          });
        }}
      />

  </Route>
);
