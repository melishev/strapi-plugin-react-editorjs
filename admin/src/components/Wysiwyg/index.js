import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from 'lodash';
import Editor from "../editorjs";
import cn from 'classnames';
import Wrapper from './wrapper';
import { useIntl } from 'react-intl';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';

const Wysiwyg = ({
  name,
  className,
  error,
  description,
  intlLabel,
  required,
  onChange,
  style,
  value,
  disabled,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Wrapper size={1} className={`${cn(!isEmpty(className) && className)}`} style={style}>            
      <Box>
        <Typography variant="pi" fontWeight="bold">
          {formatMessage(intlLabel)}
        </Typography>
        {required && (
          <Typography variant="pi" fontWeight="bold" textColor="danger600">
            *
          </Typography>
        )}
      </Box>
      <Editor onChange={onChange} value={value} name={name} disabled={disabled} />
      {error && (
        <Typography variant="pi" textColor="danger600">
          {formatMessage({ id: error, defaultMessage: error })}
        </Typography>
      )}
      {description && (
        <Typography variant="pi">{formatMessage(description)}</Typography>
      )}
      
    </Wrapper>
  )
};

Wysiwyg.defaultProps = {
  className: "",
  style: {},
  tabIndex: "0",
  value: null,
  description: '',
  disabled: false,
  error: undefined,
  intlLabel: '',
  required: false,
  value: '',
};

Wysiwyg.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  tabIndex: PropTypes.string,
  description: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  required: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Wysiwyg;
