import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.less';

const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <div className={clsString}>
      {
        links && (
          <div className={styles.links}>
            {links.map(link => (
              <a
                key={link.title}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}
              >
                {link.title}
              </a>
            ))}
          </div>
        )
      }
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </div>
  );
};

GlobalFooter.propTypes = {
  className: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string,
    blankTarget: PropTypes.bool,
  })).isRequired,
  copyright: PropTypes.element.isRequired,
};

GlobalFooter.defaultProps = {
  className: undefined,
};

export default GlobalFooter;
