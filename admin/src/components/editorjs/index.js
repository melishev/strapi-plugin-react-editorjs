import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import EditorJs from 'react-editor-js';
import requiredTools from './requiredTools';
import customTools from '../../config/customTools';

import MediaLibAdapter from '../medialib/adapter'
import MediaLibComponent from '../medialib/component';
import { changeFunc, changeVideoFunc, getToggleFunc } from "../medialib/utils";
import VideoLibAdapter from "../medialib/videoAdapter";

const Editor = ({ onChange, name, value }) => {

  const [editorInstance, setEditorInstance] = useState();
  const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);
  const [isVideoLibOpen, setIsVideoLibOpen] = useState(false);

  const mediaLibToggleFunc = useCallback(getToggleFunc({
    openStateSetter: setIsMediaLibOpen,
    indexStateSetter: setMediaLibBlockIndex
  }), []);
  const videoLibToggleFunc = useCallback(getToggleFunc({
    openStateSetter: setIsVideoLibOpen,
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

  const handleVideoLibChange = useCallback((data) => {
    changeVideoFunc({
      indexStateSetter: setMediaLibBlockIndex,
      data,
      index: mediaLibBlockIndex,
      editor: editorInstance
    });
    videoLibToggleFunc();
  }, [mediaLibBlockIndex, editorInstance]);

  const customImageTool = {
    mediaLib: {
      class: MediaLibAdapter,
      config: {
        mediaLibToggleFunc
      }
    }
  }

  const customVideoTool = {
    videoLib: {
      class: VideoLibAdapter,
      config: {
        mediaLibToggleFunc: videoLibToggleFunc
      }
    }
  }

  return (
    <>
      <div style={{ border: `1px solid rgb(227, 233, 243)`, borderRadius: `2px`, marginTop: `4px` }}>
        <EditorJs
          // data={JSON.parse(value)}
          // enableReInitialize={true}
          onReady={(api) => {
            if(value && JSON.parse(value).blocks.length) {
              api.blocks.render(JSON.parse(value))
            }
            document.querySelector('[data-tool="image"]').remove()
            document.querySelector('[data-tool="video"]').remove() // Removes the video plugin from the toolbar.
          }}
          onChange={(api, newData) => {
            if (!newData.blocks.length) {
              newData = null;
              onChange({ target: { name, value: newData } });
            } else {
              onChange({ target: { name, value: JSON.stringify(newData) } });
            }
          }}
          tools={{...requiredTools, ...customTools, ...customImageTool, ...customVideoTool}}
          instanceRef={instance => setEditorInstance(instance)}
        />
      </div>
      <MediaLibComponent
        isOpen={isMediaLibOpen}
        onChange={handleMediaLibChange}
        onToggle={mediaLibToggleFunc}
      />
      <MediaLibComponent
        isOpen={isVideoLibOpen}
        onChange={handleVideoLibChange}
        onToggle={videoLibToggleFunc}
        allowedTypes={['videos']}
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
