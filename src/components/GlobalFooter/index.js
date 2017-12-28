import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.less';

const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = classNames('globalFooter', className);
  return (
    <div className={clsString}>
      {
        links && (
          <div className="links">
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
      {copyright && <div className="copyright">{copyright}</div>}
    </div>
  );
};

GlobalFooter.propTypes = {
  className: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  copyright: PropTypes.string.isRequired,
};

export default GlobalFooter;
