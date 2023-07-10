'use strict';

const fs = require('fs');
const path = require('path');

const pluginId = require('../../admin/src/pluginId');

/**
 * editorjs.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = (
 {
  strapi
 }
) => {

    class ToolpackService {

        getToolpackPackageName() {
            /** @type {import("../../types/Config").Config} */
            const config = strapi.config.get(`plugin.${pluginId}`);
            return config.toolpack;
        }

        resolvePackage(packageName) {
            // start resolution from the Strapi root rather than the plugin
            // this should correctly resolve to whatever the entrypoint of the 
            // package is
            let packagePath;
            try {
                packagePath = require.resolve(packageName, {
                    paths: [process.cwd()]
                });
            } catch {
                throw new Error(`Could not find package ${packageName}`)
            }

            if (!fs.existsSync(packagePath)){
                throw new Error(`Failed to find entrypoint ${packagePath} for package '${packageName}'`)
            }
            return packagePath
        }

        packageIsValid(packageName) {
            try {
                this.resolvePackage(packageName);
                return {
                    valid: true,
                    reason: undefined
                }
            } catch(err) {
                return {
                    valid: false,
                    reason: err.message
                }
            }
        }

        tryLoadFromPackage(packageName) {
            try {
                return this.resolvePackage(packageName);;
            } catch (err) {
                console.error(`Failed to load Toolpack from package ${packageName}`);
                console.error(`Reason - ${err.message}`);
                return undefined;
            }
        }



    }



    return new ToolpackService();

};
