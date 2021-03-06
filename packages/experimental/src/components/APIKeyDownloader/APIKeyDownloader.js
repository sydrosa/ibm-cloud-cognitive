import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { pkgPrefix } from '../../global/js/settings';

export const APIKeyDownloader = ({ apiKey, bodyText, fileName, linkText }) => {
  const [linkProps, setLinkProps] = useState('');

  useEffect(() => {
    const generateLinkProps = async () => {
      const data = { apiKey };
      const json = JSON.stringify(data);
      const blob = new Blob([json], { type: 'application/json' });
      const href = await URL.createObjectURL(blob);
      const download = `${fileName || 'apikey'}.json`;
      const props = {
        href,
        download,
      };
      setLinkProps(props);
    };

    generateLinkProps();
  }, [apiKey, fileName]);

  return (
    <p className={`${pkgPrefix}--apikey-modal-messaging-text`}>
      {bodyText} <a {...linkProps}>{linkText}</a>
    </p>
  );
};

APIKeyDownloader.propTypes = {
  /**
   * the api key the user recieves
   */
  apiKey: PropTypes.string,
  /**
   * main component text
   */
  bodyText: PropTypes.string,
  /**
   * optional name for the file being generated
   */
  fileName: PropTypes.string,
  /**
   * text for the anchor tag
   */
  linkText: PropTypes.string,
};

APIKeyDownloader.defaultProps = {
  apiKey: '',
  bodyText: '',
  fileName: '',
  linkText: '',
};
