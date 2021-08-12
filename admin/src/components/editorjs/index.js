import React from 'react';
import PropTypes from 'prop-types';
import EditorJs from 'react-editor-js';
import EditorTools from './tools';

const Editor = ({ onChange, name, value }) => {

  return (
    <EditorJs
      data={value}
      onReady={(api) => value ? api.blocks.render(JSON.parse(value)) : ''}
      onChange={(api, newData) => {
        onChange({ target: { name, value: JSON.stringify(newData) } })}
      }
      tools={EditorTools}
    />
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;