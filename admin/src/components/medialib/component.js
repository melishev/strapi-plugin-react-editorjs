import React, {useEffect, useState} from 'react';
import {useLibrary} from '@strapi/helper-plugin';
import PropTypes from 'prop-types';

const MediaLibComponent = ({isOpen, onChange, toggle}) => {
 
  const { components } = useLibrary();
  const [data, setData] = useState(null);
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsDisplayed(true);
    }
  }, [isOpen]);

  const Component = components['media-library'];

  const handleInputChange = data => {
    if (data) {
      setData(data);
    }
  };

  const handleClosed = () => {
    if (data) {
      onChange(data);
    }

    setData(null);
    setIsDisplayed(false);
  };

  if (Component && isDisplayed) {
    return (
      <Component
        allowedTypes={['images']}
        isOpen={isOpen}
        multiple={true}
        onClosed={handleClosed}
        onInputMediaChange={handleInputChange}
        onToggle={toggle}
      />
    );
  }

  return null;
};

MediaLibComponent.defaultProps = {
  isOpen: false,
};

MediaLibComponent.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  toggle: PropTypes.func,
};

export default MediaLibComponent;
