import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createReactEditorJS } from 'react-editor-js'
import MediaLibComponent from '../medialib/component';
import {changeFunc, getToggleFunc} from '../medialib/utils';

import { useFetchClient } from '@strapi/helper-plugin';
import { Loader } from '@strapi/design-system';
import { Typography as Typ } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';
import { EmptyStateLayout } from '@strapi/design-system';

const EditorJs = createReactEditorJS();

const Editor = ({ onChange, name, value }) => {

    const fetch = useFetchClient();

    const [editorInstance, setEditorInstance] = useState();
    const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1);
    const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);
    const [toolpack, setToolpack] = useState(null);
    const [tools, setTools] = useState(null);
    const [toolpackError, setToolpackError] = useState(null);

    const createEjsObject = () => {
        const ejs = {
            pluginEndpoint: `${strapi.backendURL}/editorjs`,
            mediaLib: {
                toggle: mediaLibToggleFunc
            }
        }
        return ejs;
    }

    useEffect(() => {
        // check if the toolpack on the server is valid
        
        fetch.get(
            `${strapi.backendURL}/editorjs/toolpackValid`, 
            // we want to check the response rather than just throw
            {validateStatus: () => true}
        )
            .then((resp) => {

                // if it's valid, load the toolpack
                if (resp.status === 200) {
                    return import(/*webpackIgnore: true*/`${strapi.backendURL}/editorjs/toolpack`);

                // if it's not valid, the reason is in the body
                } else if (resp.status === 400) {
                    throw new Error(resp.body)
                
                // for something unexpected, then throw an unexpected error
                } else {
                    throw new Error('Unexpected Error.');
                }
            })
            .then(module => {
                try {
                    const toolpackCreator = module.default;
                    const tp = toolpackCreator(createEjsObject());
                    setToolpack(tp);
                    setToolpackError(null);
                } catch(err) {
                    throw new Error(`Failed to hydrate toolpack - ${err.message}`)
                }
            })
            .catch((err) => {
                setToolpackError(err.message);
            })

    }, [])

    useEffect(() => {
        if (tools !== null) { return; }
        if (toolpack === null) { return; }
        setTools({...toolpack})
    }, [toolpack])


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

  const renderEditor = (actualEditor) => {

    if (toolpackError !== null) {
        return <>
            <EmptyStateLayout
                content="Failed to load Toolpack" 
                action={<Typ textAlign="center" variant="pi">{toolpackError}</Typ>}
            />

{/* 
            <Flex alignItems='center' justifyContent='center' direction='column' paddingTop={6} paddingBottom={6}>
                <Typ variant="epsilon">Error Loading Toolpack.</Typ>
                <Typ variant="pi">{toolpackError}</Typ>
            </Flex> */}
        </>
    } else if (tools === null) {
        return <>
            <Flex alignItems='center' justifyContent='center' direction='column' paddingTop={6} paddingBottom={6}>
                <Loader small/>
                <Typ variant="epsilon">Loading Toolpack...</Typ>
            </Flex>
        </>
    } else {
        return actualEditor();
    }
    
  }
  

  return (
    <>
      <div style={{ border: `1px solid rgb(227, 233, 243)`, borderRadius: `2px`, marginTop: `4px` }}>

        {renderEditor(() => <> 
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
                tools={tools}
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
        </>)}

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
