'use strict';
/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const extend = require('extend');
const requestFactory = require('../lib/requestwrapper');
const helper = require('../lib/helper');
const util = require('util');
const BaseService = require('../lib/base_service');
const DiscoveryV1 = /** @class */ (function() {
  /**
     * Construct a DiscoveryV1 object.
     *
     * @param {Object} options
     * @param {String} options.version_date - Release date of the API version in YYYY-MM-DD format.
     * @constructor
     */
  function DiscoveryV1(options) {
    BaseService.call(this, options);
    // check if 'version_date' was provided
    if (typeof this._options.version_date === 'undefined') {
      throw new Error('Argument error: version_date was not specified, use DiscoveryV1.VERSION_DATE_2017_09_01');
    }
    this._options.qs.version = options.version_date;
  }
  /**
     * Add an environment.
     *
     * Creates a new environment.  You can create only one environment per service instance. An attempt to create another environment results in an error.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.name - Name that identifies the environment.
     * @param {string} [params.description] - Description of the environment.
     * @param {number} [params.size] - **Deprecated**: Size of the environment.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.createEnvironment = function(params, callback) {
    const requiredParams = ['name'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = {
      name: params.name,
      description: params.description,
      size: params.size
    };
    const parameters = {
      options: {
        url: '/v1/environments',
        method: 'POST',
        json: true,
        body: body
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Delete environment.
     *
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.deleteEnvironment = function(params, callback) {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Get environment info.
     *
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.getEnvironment = function(params, callback) {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * List environments.
     *
     * List existing environments for the service instance.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {string} [params.name] - Show only the environment with the given name.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.listEnvironments = function(params, callback) {
    params = params || {};
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }
    const query = { name: params.name };
    const parameters = {
      options: {
        url: '/v1/environments',
        method: 'GET',
        qs: query
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * List fields in specified collecitons.
     *
     * Gets a list of the unique fields (and their types) stored in the indexes of the specified collecitons.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string[]} params.collection_ids - A comma-separated list of collection IDs to be queried against.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.listFields = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_ids'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = { collection_ids: params.collection_ids };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/fields',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Update an environment.
     *
     * Updates an environment. The environment's `name` and  `description` parameters can be changed. You must specify a `name` for the environment.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} [params.name] - Name that identifies the environment.
     * @param {string} [params.description] - Description of the environment.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.updateEnvironment = function(params, callback) {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { name: params.name, description: params.description };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Add configuration.
     *
     * Creates a new configuration.  If the input configuration contains the `configuration_id`, `created`, or `updated` properties, then they are ignored and overridden by the system, and an error is not returned so that the overridden fields do not need to be removed when copying a configuration.  The configuration can contain unrecognized JSON fields. Any such fields are ignored and do not generate an error. This makes it easier to use newer configuration files with older versions of the API and the service. It also makes it possible for the tooling to add additional metadata and information to the configuration.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.name - The name of the configuration.
     * @param {string} [params.description] - The description of the configuration, if available.
     * @param {Conversions} [params.conversions] - The document conversion settings for the configuration.
     * @param {Enrichment[]} [params.enrichments] - An array of document enrichment settings for the configuration.
     * @param {NormalizationOperation[]} [params.normalizations] - Defines operations that can be used to transform the final output JSON into a normalized form. Operations are executed in the order that they appear in the array.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.createConfiguration = function(params, callback) {
    const requiredParams = ['environment_id', 'name'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = {
      name: params.name,
      description: params.description,
      conversions: params.conversions,
      enrichments: params.enrichments,
      normalizations: params.normalizations
    };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Delete a configuration.
     *
     * The deletion is performed unconditionally. A configuration deletion request succeeds even if the configuration is referenced by a collection or document ingestion. However, documents that have already been submitted for processing continue to use the deleted configuration. Documents are always processed with a snapshot of the configuration as it existed at the time the document was submitted.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.configuration_id - The ID of the configuration.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.deleteConfiguration = function(params, callback) {
    const requiredParams = ['environment_id', 'configuration_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      configuration_id: params.configuration_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations/{configuration_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Get configuration details.
     *
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.configuration_id - The ID of the configuration.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.getConfiguration = function(params, callback) {
    const requiredParams = ['environment_id', 'configuration_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      configuration_id: params.configuration_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations/{configuration_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * List configurations.
     *
     * Lists existing configurations for the service instance.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} [params.name] - Find configurations with the given name.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.listConfigurations = function(params, callback) {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = { name: params.name };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Update a configuration.
     *
     * Replaces an existing configuration.   * Completely replaces the original configuration.   * The `configuration_id`, `updated`, and `created` fields are accepted in the request, but they are ignored, and an error is not generated. It is also acceptable for users to submit an updated configuration with none of the three properties.   * Documents are processed with a snapshot of the configuration as it was at the time the document was submitted to be ingested. This means that already submitted documents will not see any updates made to the configuration.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.configuration_id - The ID of the configuration.
     * @param {string} params.name - The name of the configuration.
     * @param {string} [params.description] - The description of the configuration, if available.
     * @param {Conversions} [params.conversions] - The document conversion settings for the configuration.
     * @param {Enrichment[]} [params.enrichments] - An array of document enrichment settings for the configuration.
     * @param {NormalizationOperation[]} [params.normalizations] - Defines operations that can be used to transform the final output JSON into a normalized form. Operations are executed in the order that they appear in the array.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.updateConfiguration = function(params, callback) {
    const requiredParams = ['environment_id', 'configuration_id', 'name'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = {
      name: params.name,
      description: params.description,
      conversions: params.conversions,
      enrichments: params.enrichments,
      normalizations: params.normalizations
    };
    const path = {
      environment_id: params.environment_id,
      configuration_id: params.configuration_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations/{configuration_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Test configuration.
     *
     * Runs a sample document through the default or your configuration and returns diagnostic information designed to help you understand how the document was processed. The document is not added to the index.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} [params.configuration] - The configuration to use to process the document. If this part is provided, then the provided configuration is used to process the document. If the `configuration_id` is also provided (both are present at the same time), then request is rejected. The maximum supported configuration size is 1 MB. Configuration parts larger than 1 MB are rejected. See the `GET /configurations/{configuration_id}` operation for an example configuration.
     * @param {string} [params.step] - Specify to only run the input document through the given step instead of running the input document through the entire ingestion workflow. Valid values are `convert`, `enrich`, and `normalize`.
     * @param {string} [params.configuration_id] - The ID of the configuration to use to process the document. If the `configuration` form part is also provided (both are present at the same time), then request will be rejected.
     * @param {ReadableStream|Object|Uint8Array} [params.file] - The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected.
     * @param {string} [params.metadata] - If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ```.
     * @param {string} [params.file_content_type] - The content type of file.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.testConfigurationInEnvironment = function(params, callback) {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const formData = {
      file: helper.buildRequestFileObject({
        data: params.file,
        contentType: params.file_content_type
      })
    };
    const query = {
      step: params.step,
      configuration_id: params.configuration_id
    };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/preview',
        method: 'POST',
        qs: query,
        path: path,
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Create a collection.
     *
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.name - The name of the collection to be created.
     * @param {string} [params.description] - A description of the collection.
     * @param {string} [params.configuration_id] - The ID of the configuration in which the collection is to be created.
     * @param {string} [params.language] - The language of the documents stored in the collection, in the form of an ISO 639-1 language code.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.createCollection = function(params, callback) {
    const requiredParams = ['environment_id', 'name'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = {
      name: params.name,
      description: params.description,
      configuration_id: params.configuration_id,
      language: params.language
    };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Delete a collection.
     *
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.deleteCollection = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Get collection details.
     *
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.getCollection = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * List unique fields.
     *
     * Gets a list of the unique fields (and their types) stored in the index.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.listCollectionFields = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/fields',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * List collections.
     *
     * Lists existing collections for the service instance.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} [params.name] - Find collections with the given name.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.listCollections = function(params, callback) {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = { name: params.name };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Update a collection.
     *
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} params.name - The name of the collection.
     * @param {string} [params.description] - A description of the collection.
     * @param {string} [params.configuration_id] - The ID of the configuration in which the collection is to be updated.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.updateCollection = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = {
      name: params.name,
      description: params.description,
      configuration_id: params.configuration_id
    };
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Add a document.
     *
     * Add a document to a collection with optional metadata.    * The `version` query parameter is still required.    * Returns immediately after the system has accepted the document for processing.    * The user must provide document content, metadata, or both. If the request is missing both document content and metadata, it is rejected.    * The user can set the `Content-Type` parameter on the `file` part to indicate the media type of the document. If the `Content-Type` parameter is missing or is one of the generic media types (for example, `application/octet-stream`), then the service attempts to automatically detect the document's media type.    * The following field names are reserved and will be filtered out if present after normalization: `id`, `score`, `highlight`, and any field with the prefix of: `_`, `+`, or `-`    * Fields with empty name values after normalization are filtered out before indexing.    * Fields containing the following characters after normalization are filtered out before indexing: `#` and `,`.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {ReadableStream|Object|Uint8Array} [params.file] - The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected.
     * @param {string} [params.metadata] - If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ```.
     * @param {string} [params.file_content_type] - The content type of file.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.addDocument = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const formData = {
      file: helper.buildRequestFileObject({
        data: params.file,
        contentType: params.file_content_type
      })
    };
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/documents',
        method: 'POST',
        path: path,
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Delete a document.
     *
     * If the given document ID is invalid, or if the document is not found, then the a success response is returned (HTTP status code `200`) with the status set to 'deleted'.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} params.document_id - The ID of the document.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.deleteDocument = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id', 'document_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id,
      document_id: params.document_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Get document details.
     *
     * Fetch status details about a submitted document. **Note:** this operation does not return the document itself. Instead, it returns only the document's processing status and any notices (warnings or errors) that were generated when the document was ingested. Use the query API to retrieve the actual document content.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} params.document_id - The ID of the document.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.getDocumentStatus = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id', 'document_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id,
      document_id: params.document_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Update a document.
     *
     * Replace an existing document. Starts ingesting a document with optional metadata.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} params.document_id - The ID of the document.
     * @param {ReadableStream|Object|Uint8Array} [params.file] - The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected.
     * @param {string} [params.metadata] - If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ```.
     * @param {string} [params.file_content_type] - The content type of file.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.updateDocument = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id', 'document_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const formData = {
      file: helper.buildRequestFileObject({
        data: params.file,
        contentType: params.file_content_type
      })
    };
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id,
      document_id: params.document_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        method: 'POST',
        path: path,
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Query documents in multiple collections.
     *
     * See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string[]} params.collection_ids - A comma-separated list of collection IDs to be queried against.
     * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
     * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
     * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
     * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
     * @param {number} [params.count] - Number of documents to return.
     * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return.
     * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
     * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
     * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
     * @param {boolean} [params.deduplicate] - When `true` and used with a Watson Discovery News collection, duplicate results (based on the contents of the `title` field) are removed. Duplicate comparison is limited to the current query only, `offset` is not considered. Defaults to `false`. This parameter is currently Beta functionality.
     * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.federatedQuery = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_ids'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = {
      collection_ids: params.collection_ids,
      filter: params.filter,
      query: params.query,
      natural_language_query: params.natural_language_query,
      aggregation: params.aggregation,
      count: params.count,
      return_fields: params.return_fields,
      offset: params.offset,
      sort: params.sort,
      highlight: params.highlight,
      deduplicate: params.deduplicate,
      deduplicate_field: params.deduplicate_field
    };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/query',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Query multiple collection system notices.
     *
     * Queries for notices (errors or warnings) that might have been generated by the system. Notices are generated when ingesting documents and performing relevance training. See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details on the query language.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string[]} params.collection_ids - A comma-separated list of collection IDs to be queried against.
     * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
     * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
     * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
     * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
     * @param {number} [params.count] - Number of documents to return.
     * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return.
     * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
     * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
     * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
     * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.federatedQueryNotices = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_ids'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = {
      collection_ids: params.collection_ids,
      filter: params.filter,
      query: params.query,
      natural_language_query: params.natural_language_query,
      aggregation: params.aggregation,
      count: params.count,
      return_fields: params.return_fields,
      offset: params.offset,
      sort: params.sort,
      highlight: params.highlight,
      deduplicate: params.deduplicate_field
    };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/notices',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Query documents.
     *
     * See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
     * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
     * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
     * @param {boolean} [params.passages] - A passages query that returns the most relevant passages from the results.
     * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
     * @param {number} [params.count] - Number of documents to return.
     * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return_fields.
     * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
     * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
     * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
     * @param {string[]} [params.passages_fields] - A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all top-level fields are included.
     * @param {number} [params.passages_count] - The maximum number of passages to return. The search returns fewer passages if the requested total is not found. The default is `10`. The maximum is `100`.
     * @param {number} [params.passages_characters] - The approximate number of characters that any one passage will have. The default is `400`. The minimum is `50`. The maximum is `2000`.
     * @param {boolean} [params.deduplicate] - When `true` and used with a Watson Discovery News collection, duplicate results (based on the contents of the `title` field) are removed. Duplicate comparison is limited to the current query only, `offset` is not considered. Defaults to `false`. This parameter is currently Beta functionality.
     * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.query = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = {
      filter: params.filter,
      query: params.query,
      natural_language_query: params.natural_language_query,
      passages: params.passages,
      aggregation: params.aggregation,
      count: params.count,
      return: params.return_fields,
      offset: params.offset,
      sort: params.sort,
      highlight: params.highlight,
      passages_fields: params.passages_fields,
      passages_count: params.passages_count,
      passages_characters: params.passages_characters,
      deduplicate: params.deduplicate,
      deduplicate_field: params.deduplicate_field
    };
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/query',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     * Query system notices.
     *
     * Queries for notices (errors or warnings) that might have been generated by the system. Notices are generated when ingesting documents and performing relevance training. See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details on the query language.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
     * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
     * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
     * @param {boolean} [params.passages] - A passages query that returns the most relevant passages from the results.
     * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
     * @param {number} [params.count] - Number of documents to return.
     * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return.
     * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
     * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
     * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
     * @param {string[]} [params.passages_fields] - A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all top-level fields are included.
     * @param {number} [params.passages_count] - The maximum number of passages to return. The search returns fewer passages if the requested total is not found. The default is `10`. The maximum is `100`.
     * @param {number} [params.passages_characters] - The approximate number of characters that any one passage will have. The default is `400`. The minimum is `50`. The maximum is `2000`.
     * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.queryNotices = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = {
      filter: params.filter,
      query: params.query,
      natural_language_query: params.natural_language_query,
      passages: params.passages,
      aggregation: params.aggregation,
      count: params.count,
      return_fields: params.return_fields,
      offset: params.offset,
      sort: params.sort,
      highlight: params.highlight,
      passages_fields: params.passages_fields,
      passages_count: params.passages_count,
      passages_characters: params.passages_characters,
      deduplicate_field: params.deduplicate_field
    };
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/notices',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     *
     *
     * Adds a query to the training data for this collection. The query can contain a filter and natural language query.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} [params.natural_language_query] -
     * @param {string} [params.filter] -
     * @param {TrainingExample[]} [params.examples] -
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.addTrainingData = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = {
      natural_language_query: params.natural_language_query,
      filter: params.filter,
      examples: params.examples
    };
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     *
     *
     * Adds a new example to this training data query.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} params.query_id - The ID of the query used for training.
     * @param {string} [params.document_id] -
     * @param {string} [params.cross_reference] -
     * @param {number} [params.relevance] -
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.createTrainingExample = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id', 'query_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = {
      document_id: params.document_id,
      cross_reference: params.cross_reference,
      relevance: params.relevance
    };
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id,
      query_id: params.query_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     *
     *
     * Clears all training data for this collection.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.deleteAllTrainingData = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     *
     *
     * Removes the training data and all associated examples from the training data set.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} params.query_id - The ID of the query used for training.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.deleteTrainingData = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id', 'query_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id,
      query_id: params.query_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     *
     *
     * Removes the example with the given ID for the training data query.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} params.query_id - The ID of the query used for training.
     * @param {string} params.example_id - The ID of the document as it is indexed.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.deleteTrainingExample = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id,
      query_id: params.query_id,
      example_id: params.example_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     *
     *
     * Shows details for a specific training data query, including the query string and all examples.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} params.query_id - The ID of the query used for training.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.getTrainingData = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id', 'query_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id,
      query_id: params.query_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     *
     *
     * Gets the details for this training example.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} params.query_id - The ID of the query used for training.
     * @param {string} params.example_id - The ID of the document as it is indexed.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.getTrainingExample = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id,
      query_id: params.query_id,
      example_id: params.example_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     *
     *
     * Lists the training data for this collection.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.listTrainingData = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  /**
     *
     *
     * Changes the label or cross reference query for this training example.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.environment_id - The ID of the environment.
     * @param {string} params.collection_id - The ID of the collection.
     * @param {string} params.query_id - The ID of the query used for training.
     * @param {string} params.example_id - The ID of the document as it is indexed.
     * @param {string} [params.cross_reference] -
     * @param {number} [params.relevance] -
     * @param {Function} [callback] - The callback that handles the response.
     */
  DiscoveryV1.prototype.updateTrainingExample = function(params, callback) {
    const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = {
      cross_reference: params.cross_reference,
      relevance: params.relevance
    };
    const path = {
      environment_id: params.environment_id,
      collection_id: params.collection_id,
      query_id: params.query_id,
      example_id: params.example_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };
  DiscoveryV1.VERSION_DATE_2017_09_01 = '2017-09-01';
  DiscoveryV1.VERSION_DATE_2017_08_01 = '2017-08-01';
  DiscoveryV1.VERSION_DATE_2017_07_19 = '2017-07-19';
  DiscoveryV1.VERSION_DATE_2017_06_25 = '2017-06-25';
  DiscoveryV1.VERSION_DATE_2016_12_01 = '2016-12-01';
  DiscoveryV1.VERSION_DATE_2017_04_27 = '2017-04-27';
  DiscoveryV1.VERSION_DATE_2016_12_15 = '2016-12-15';
  DiscoveryV1.URL = 'https://gateway.watsonplatform.net/discovery/api';
  return DiscoveryV1;
})();
util.inherits(DiscoveryV1, BaseService);
DiscoveryV1.prototype.name = 'discovery';
DiscoveryV1.prototype.version = 'v1';
// /*************************
//  * interfaces
//  ************************/
// (function(DiscoveryV1) {
//   const CreateEnvironmentConstants;
//   (function(CreateEnvironmentConstants) {
//     const Size;
//     (function(Size) {
//       Size[(Size['ONE'] = 1)] = 'ONE';
//       Size[(Size['TWO'] = 2)] = 'TWO';
//       Size[(Size['THREE'] = 3)] = 'THREE';
//     })(
//       (Size =
//         CreateEnvironmentConstants.Size ||
//         (CreateEnvironmentConstants.Size = {}))
//     );
//   })(
//     (CreateEnvironmentConstants =
//       DiscoveryV1.CreateEnvironmentConstants ||
//       (DiscoveryV1.CreateEnvironmentConstants = {}))
//   );
//   const TestConfigurationInEnvironmentConstants;
//   (function(TestConfigurationInEnvironmentConstants) {
//     const Step;
//     (function(Step) {
//       Step['HTML_INPUT'] = 'html_input';
//       Step['HTML_OUTPUT'] = 'html_output';
//       Step['JSON_OUTPUT'] = 'json_output';
//       Step['JSON_NORMALIZATIONS_OUTPUT'] = 'json_normalizations_output';
//       Step['ENRICHMENTS_OUTPUT'] = 'enrichments_output';
//       Step['NORMALIZATIONS_OUTPUT'] = 'normalizations_output';
//     })(
//       (Step =
//         TestConfigurationInEnvironmentConstants.Step ||
//         (TestConfigurationInEnvironmentConstants.Step = {}))
//     );
//     const FileContentType;
//     (function(FileContentType) {
//       FileContentType['APPLICATION_JSON'] = 'application/json';
//       FileContentType['APPLICATION_MSWORD'] = 'application/msword';
//       FileContentType[
//         'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT'
//       ] =
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//       FileContentType['APPLICATION_PDF'] = 'application/pdf';
//       FileContentType['TEXT_HTML'] = 'text/html';
//       FileContentType['APPLICATION_XHTML_XML'] = 'application/xhtml+xml';
//     })(
//       (FileContentType =
//         TestConfigurationInEnvironmentConstants.FileContentType ||
//         (TestConfigurationInEnvironmentConstants.FileContentType = {}))
//     );
//   })(
//     (TestConfigurationInEnvironmentConstants =
//       DiscoveryV1.TestConfigurationInEnvironmentConstants ||
//       (DiscoveryV1.TestConfigurationInEnvironmentConstants = {}))
//   );
//   const CreateCollectionConstants;
//   (function(CreateCollectionConstants) {
//     const Language;
//     (function(Language) {
//       Language['EN'] = 'en';
//       Language['ES'] = 'es';
//       Language['DE'] = 'de';
//       Language['AR'] = 'ar';
//       Language['FR'] = 'fr';
//       Language['IT'] = 'it';
//       Language['JA'] = 'ja';
//       Language['KO'] = 'ko';
//       Language['PT_BR'] = 'pt-br';
//     })(
//       (Language =
//         CreateCollectionConstants.Language ||
//         (CreateCollectionConstants.Language = {}))
//     );
//   })(
//     (CreateCollectionConstants =
//       DiscoveryV1.CreateCollectionConstants ||
//       (DiscoveryV1.CreateCollectionConstants = {}))
//   );
//   const AddDocumentConstants;
//   (function(AddDocumentConstants) {
//     const FileContentType;
//     (function(FileContentType) {
//       FileContentType['APPLICATION_JSON'] = 'application/json';
//       FileContentType['APPLICATION_MSWORD'] = 'application/msword';
//       FileContentType[
//         'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT'
//       ] =
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//       FileContentType['APPLICATION_PDF'] = 'application/pdf';
//       FileContentType['TEXT_HTML'] = 'text/html';
//       FileContentType['APPLICATION_XHTML_XML'] = 'application/xhtml+xml';
//     })(
//       (FileContentType =
//         AddDocumentConstants.FileContentType ||
//         (AddDocumentConstants.FileContentType = {}))
//     );
//   })(
//     (AddDocumentConstants =
//       DiscoveryV1.AddDocumentConstants ||
//       (DiscoveryV1.AddDocumentConstants = {}))
//   );
//   const UpdateDocumentConstants;
//   (function(UpdateDocumentConstants) {
//     const FileContentType;
//     (function(FileContentType) {
//       FileContentType['APPLICATION_JSON'] = 'application/json';
//       FileContentType['APPLICATION_MSWORD'] = 'application/msword';
//       FileContentType[
//         'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT'
//       ] =
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//       FileContentType['APPLICATION_PDF'] = 'application/pdf';
//       FileContentType['TEXT_HTML'] = 'text/html';
//       FileContentType['APPLICATION_XHTML_XML'] = 'application/xhtml+xml';
//     })(
//       (FileContentType =
//         UpdateDocumentConstants.FileContentType ||
//         (UpdateDocumentConstants.FileContentType = {}))
//     );
//   })(
//     (UpdateDocumentConstants =
//       DiscoveryV1.UpdateDocumentConstants ||
//       (DiscoveryV1.UpdateDocumentConstants = {}))
//   );
// })(DiscoveryV1 || (DiscoveryV1 = {}));
module.exports = DiscoveryV1;
