import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from 'lodash';
import { LabelIconWrapper } from "@strapi/helper-plugin";
import Editor from "../editorjs";

import cn from 'classnames';
import { Description, ErrorMessage, Label } from "@buffetjs/styles";
import { Error } from "@buffetjs/core";
import Wrapper from './wrapper';
import { useIntl } from 'react-intl';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';


// eslint-disable-next-line react/prefer-stateless-function
class WysiwygWithErrors extends React.Component {
  render() {
    const {
      autoFocus,
      className,
      deactivateErrorHighlight,
      disabled,
      error: inputError,
      inputClassName,
      inputDescription,
      inputStyle,
      label,
      description,
      intlLabel,
      labelIcon,
      required,
      name,
      onBlur: handleBlur,
      onChange,
      placeholder,
      resetProps,
      style,
      tabIndex,
      validations,
      value,
      ...rest
    } = this.props;

    return (
      <Error
        inputError={inputError}
        name={name}
        type="text"
        validations={validations}
      >
        {({ canCheck, onBlur, error, dispatch }) => {
          const hasError = Boolean(error);
          const { formatMessage } = useIntl();

          return (
            
              <Wrapper size={1} className={`${cn(!isEmpty(className) && className)} ${hasError ? 'bordered' : ''}`} style={style}>
              
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
                <Editor name={name} onChange={onChange} value={value} />
                {error && (
                  <Typography variant="pi" textColor="danger600">
                    {formatMessage({ id: error, defaultMessage: error })}
                  </Typography>
                )}
                {description && (
                  <Typography variant="pi">{formatMessage(description)}</Typography>
                )}
              
              </Wrapper>
          );
        }}
      </Error>
    );
  }
}

WysiwygWithErrors.defaultProps = {
  autoFocus: false,
  className: "",
  deactivateErrorHighlight: false,
  didCheckErrors: false,
  disabled: false,
  error: null,
  inputClassName: "",
  inputDescription: "",
  inputStyle: {},
  label: "",
  labelIcon: null,
  onBlur: false,
  placeholder: "",
  resetProps: false,
  style: {},
  tabIndex: "0",
  validations: {},
  value: null,
};

WysiwygWithErrors.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  deactivateErrorHighlight: PropTypes.bool,
  didCheckErrors: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  inputClassName: PropTypes.string,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  inputStyle: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  labelIcon: PropTypes.shape({
    icon: PropTypes.node.isRequired,
    title: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  resetProps: PropTypes.bool,
  style: PropTypes.object,
  tabIndex: PropTypes.string,
  validations: PropTypes.object,
  value: PropTypes.string,
};

export default WysiwygWithErrors;
