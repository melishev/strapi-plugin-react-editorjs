import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import EditorJs from 'react-editor-js';
import EditorTools from './tools';

import MediaLibAdapter from '../mediaLib/adapter'
import MediaLibComponent from "../mediaLib/component";
import {changeFunc, getToggleFunc} from "../mediaLib/utils";

const Editor = ({ onChange, name, value }) => {

  const [editorInstance, setEditorInstance] = useState();
  const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);

  const mediaLibToggleFunc = useCallback(getToggleFunc({
    openStateSetter: setIsMediaLibOpen,
    indexStateSetter: setMediaLibBlockIndex
  }), []);

  const handleMediaLibChange = useCallback((data) => {
    console.dir(data);

    changeFunc({
        indexStateSetter: setMediaLibBlockIndex,
        data,
        index: mediaLibBlockIndex,
        editor: editorInstance
    });
  }, [mediaLibBlockIndex, editorInstance]);

  const customImageTool = {
    mediaLib: {
      class: MediaLibAdapter,
      config: {
        mediaLibToggleFunc
      }
    }
  }

  return (
    <>
      <EditorJs
        data={JSON.parse(value)}
        onReady={(api) => value ? api.blocks.render(JSON.parse(value)) : ''}
        onChange={(api, newData) => {
          onChange({ target: { name, value: JSON.stringify(newData) } })}
        }
        tools={{...EditorTools, ...customImageTool}}
        instanceRef={instance => setEditorInstance(instance)}
      />
      <MediaLibComponent
        toggle={mediaLibToggleFunc}
        isOpen={isMediaLibOpen}
        onChange={handleMediaLibChange}
      />
    </>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;