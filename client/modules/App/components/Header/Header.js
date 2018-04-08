import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );
  console.log(props);
  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <ul>
          <li><FormattedMessage id="switchLanguage" /></li>
          {languageNodes}
        </ul>
      </div>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
        </h1>
        {
          (props.user)
          ? <div>
              {
                context.router.isActive('/profile', true)
                ? null
                : <div>
                    <a className={styles['add-workspace-button']} href="#" onClick={props.logout}>
                      <FormattedMessage id="logout" />
                    </a>
                    <Link to={'/workspaces/' + props.user.user.workspace_title + "/profile"} className={styles['add-workspace-button']} ><FormattedMessage id="profileLink" /></Link>
                    <Link to={'/workspaces/' + props.user.user.workspace_title + "/chat"} className={styles['add-workspace-button']} ><FormattedMessage id="chatLink" /></Link>
                  </div>
              }
            </div>
          : <div>
              {
                !context.router.isActive('/', true) && !context.router.isActive('/workspaces', true)
                ?  <div>
                      <Link to={'/workspaces/' + props.params.display_name + "/register"} className={styles['add-workspace-button']} ><FormattedMessage id="registerLink" /></Link>
                      <Link to={'/workspaces/' + props.params.display_name + "/login"} className={styles['add-workspace-button']} ><FormattedMessage id="loginLink" /></Link>
                    </div>
                  : null
              }
            <Link to={"/workspaces"} className={styles['add-workspace-button']} ><FormattedMessage id="workspacesLink" /></Link>
            </div>
        }
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddWorkspace: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

export default Header;
