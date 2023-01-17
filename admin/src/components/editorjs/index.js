import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import EditorJs from 'react-editor-js';
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from '@strapi/design-system/Flex';
import axios from 'axios';
import PluginId from '../../pluginId'
import requiredTools from './requiredTools';
import customTools from '../../config/customTools';

import MediaLibAdapter from '../medialib/adapter'
import MediaLibComponent from '../medialib/component';
import {changeFunc, getToggleFunc} from '../medialib/utils';

const Editor = ({ onChange, name, value }) => {
  const [editorInstance, setEditorInstance] = useState();
  const [config, setConfig] = useState();
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
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

  const customImageTool = useMemo(() => ({
    mediaLib: {
      class: MediaLibAdapter,
      config: {
        mediaLibToggleFunc
      }
    }
  }), [MediaLibAdapter, mediaLibToggleFunc]);

  const tools = useMemo(() => {
    let activeTools = {
      ...requiredTools,
      ...customTools,
      ...customImageTool
    };

    if (config && config.enabledTools) {
      activeTools = Object.fromEntries(
       Object.entries(activeTools)
        .filter(([key]) => config.enabledTools.includes(key))
        .sort(([keyA], [keyB]) => config.enabledTools.indexOf(keyA) - config.enabledTools.indexOf(keyB))
      )
    }

    return activeTools;
  }, [config, requiredTools, customImageTool, customTools]);

  useEffect(() => {
    axios.get(`/api/${PluginId}/config`)
      .then(({ data: config }) => config && setConfig(config))
      .finally(() => setIsLoadingConfig(false));
  }, [setConfig]);

  if (isLoadingConfig) {
    return (
      <Flex>
        <Loader />
      </Flex>
    );
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
          }}
          onChange={(api, newData) => {
            if (!newData.blocks.length) {
              newData = null;
              onChange({ target: { name, value: newData } });
            } else {
              onChange({ target: { name, value: JSON.stringify(newData) } });
            }
          }}
          tools={tools}
          instanceRef={instance => setEditorInstance(instance)}
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
