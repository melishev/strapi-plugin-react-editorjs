import React, {useState} from 'react';
import {prefixFileUrlWithBackendUrl, useLibrary} from '@strapi/helper-plugin';
import PropTypes from 'prop-types';

const MediaLibComponent = ({isOpen, onChange, onToggle, allowedTypes}) => {

  const { components } = useLibrary();
  const [data, setData] = useState(null);

  const MediaLibraryDialog = components['media-library'];

  const handleInputChange = data => {
    if (data) {
      setData(data);
    }
  };

  const handleSelectAssets = files => {
    const formattedFiles = files.map(f => ({
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      width: f.width,
      height: f.height,
      size: f.size,
      mime: f.mime,
      formats: f.formats
    }));
    onChange(formattedFiles);
  };

  if(!isOpen) {
    return null;
  }

  return (
    <MediaLibraryDialog
      allowedTypes={allowedTypes}
      onClose={onToggle}
      onInputMediaChange={handleInputChange}
      onSelectAssets={handleSelectAssets}
    />
  );

};

MediaLibComponent.defaultProps = {
  isOpen: false,
  onChange: () => {},
  onToggle: () => {},
  allowedTypes: ['images'],
};

MediaLibComponent.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
};

export default MediaLibComponent;
