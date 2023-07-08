import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createReactEditorJS } from 'react-editor-js'
import requiredTools from './requiredTools';
import customTools from '../../config/customTools';

import MediaLibAdapter from '../medialib/adapter'
import MediaLibComponent from '../medialib/component';
import {changeFunc, getToggleFunc} from '../medialib/utils';

const EditorJs = createReactEditorJS();

const Editor = ({ onChange, name, value }) => {

  const [editorInstance, setEditorInstance] = useState();
  const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);

  const mediaLibToggleFunc = useCallback(getToggleFunc({
    openStateSetter: setIsMediaLibOpen,
    indexStateSetter: setMediaLibBlockIndex
  }), []);

  const handleMediaLibChange = useCallback((data) => {
    changeFunc({
        indexStateSetter: setMediaLibBlockIndex,
        data,
        index: mediaLibBlockIndex,
        editor: editorInstance
    });
    mediaLibToggleFunc();
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
      <div style={{ border: `1px solid rgb(227, 233, 243)`, borderRadius: `2px`, marginTop: `4px` }}>
        <EditorJs
          onChange={(api, ev) => {
            api.saver.save().then(newData => {
                if (!newData.blocks.length) {
                    onChange({ target: { name, value: null } });
                } else {
                    onChange({ target: { name, value: JSON.stringify(newData) } });
                }
            });
          }}
          tools={{...requiredTools, ...customTools, ...customImageTool}}
          onInitialize={editor => {
            const api = editor.dangerouslyLowLevelInstance;
            api.isReady.then(() => {
                setEditorInstance(api);
                if(value && JSON.parse(value).blocks.length) {
                    api.render(JSON.parse(value))
                }
            })
          }}
        />
      </div>
      <MediaLibComponent
        isOpen={isMediaLibOpen}
        onChange={handleMediaLibChange}
        onToggle={mediaLibToggleFunc}
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
