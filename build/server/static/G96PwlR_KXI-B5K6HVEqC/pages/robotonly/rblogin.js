module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/0p4":
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "/EaH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__("jle/");
const hasFlag = __webpack_require__("8v4u");

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}
if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ "0R3l":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Queue(options) {
  if (!(this instanceof Queue)) {
    return new Queue(options);
  }

  options = options || {};
  this.concurrency = options.concurrency || Infinity;
  this.pending = 0;
  this.jobs = [];
  this.cbs = [];
  this._done = done.bind(this);
}

var arrayAddMethods = [
  'push',
  'unshift',
  'splice'
];

arrayAddMethods.forEach(function(method) {
  Queue.prototype[method] = function() {
    var methodResult = Array.prototype[method].apply(this.jobs, arguments);
    this._run();
    return methodResult;
  };
});

Object.defineProperty(Queue.prototype, 'length', {
  get: function() {
    return this.pending + this.jobs.length;
  }
});

Queue.prototype._run = function() {
  if (this.pending === this.concurrency) {
    return;
  }
  if (this.jobs.length) {
    var job = this.jobs.shift();
    this.pending++;
    job(this._done);
    this._run();
  }

  if (this.pending === 0) {
    while (this.cbs.length !== 0) {
      var cb = this.cbs.pop();
      process.nextTick(cb);
    }
  }
};

Queue.prototype.onDone = function(cb) {
  if (typeof cb === 'function') {
    this.cbs.push(cb);
    this._run();
  }
};

function done() {
  this.pending--;
  this._run();
}

module.exports = Queue;


/***/ }),

/***/ "0Xh6":
/***/ (function(module, exports) {


/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on (obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function () {
      obj.removeListener(ev, fn);
    }
  };
}


/***/ }),

/***/ "0fJA":
/***/ (function(module, exports) {

let Global = {
  userDet: {},
  io: {},
  app: {},
  url: 'https://sg24-1573916290047.appspot.com'
};
module.exports = Global;

/***/ }),

/***/ "0ulh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Limiter = __webpack_require__("0R3l");
const zlib = __webpack_require__("FMKJ");

const bufferUtil = __webpack_require__("fL2z");
const { kStatusCode, NOOP } = __webpack_require__("QwQc");

const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const EMPTY_BLOCK = Buffer.from([0x00]);

const kPerMessageDeflate = Symbol('permessage-deflate');
const kTotalLength = Symbol('total-length');
const kCallback = Symbol('callback');
const kBuffers = Symbol('buffers');
const kError = Symbol('error');

//
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//
let zlibLimiter;

/**
 * permessage-deflate implementation.
 */
class PerMessageDeflate {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} options Configuration options
   * @param {Boolean} options.serverNoContextTakeover Request/accept disabling
   *     of server context takeover
   * @param {Boolean} options.clientNoContextTakeover Advertise/acknowledge
   *     disabling of client context takeover
   * @param {(Boolean|Number)} options.serverMaxWindowBits Request/confirm the
   *     use of a custom server window size
   * @param {(Boolean|Number)} options.clientMaxWindowBits Advertise support
   *     for, or request, a custom client window size
   * @param {Object} options.zlibDeflateOptions Options to pass to zlib on deflate
   * @param {Object} options.zlibInflateOptions Options to pass to zlib on inflate
   * @param {Number} options.threshold Size (in bytes) below which messages
   *     should not be compressed
   * @param {Number} options.concurrencyLimit The number of concurrent calls to
   *     zlib
   * @param {Boolean} isServer Create the instance in either server or client
   *     mode
   * @param {Number} maxPayload The maximum allowed message length
   */
  constructor(options, isServer, maxPayload) {
    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold =
      this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;

    this.params = null;

    if (!zlibLimiter) {
      const concurrency =
        this._options.concurrencyLimit !== undefined
          ? this._options.concurrencyLimit
          : 10;
      zlibLimiter = new Limiter({ concurrency });
    }
  }

  /**
   * @type {String}
   */
  static get extensionName() {
    return 'permessage-deflate';
  }

  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }
    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }

  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(configurations) {
    configurations = this.normalizeParams(configurations);

    this.params = this._isServer
      ? this.acceptAsServer(configurations)
      : this.acceptAsClient(configurations);

    return this.params;
  }

  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate) {
      this._inflate.close();
      this._inflate = null;
    }

    if (this._deflate) {
      this._deflate.close();
      this._deflate = null;
    }
  }

  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(offers) {
    const opts = this._options;
    const accepted = offers.find((params) => {
      if (
        (opts.serverNoContextTakeover === false &&
          params.server_no_context_takeover) ||
        (params.server_max_window_bits &&
          (opts.serverMaxWindowBits === false ||
            (typeof opts.serverMaxWindowBits === 'number' &&
              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
        (typeof opts.clientMaxWindowBits === 'number' &&
          !params.client_max_window_bits)
      ) {
        return false;
      }

      return true;
    });

    if (!accepted) {
      throw new Error('None of the extension offers can be accepted');
    }

    if (opts.serverNoContextTakeover) {
      accepted.server_no_context_takeover = true;
    }
    if (opts.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }
    if (typeof opts.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = opts.serverMaxWindowBits;
    }
    if (typeof opts.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = opts.clientMaxWindowBits;
    } else if (
      accepted.client_max_window_bits === true ||
      opts.clientMaxWindowBits === false
    ) {
      delete accepted.client_max_window_bits;
    }

    return accepted;
  }

  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(response) {
    const params = response[0];

    if (
      this._options.clientNoContextTakeover === false &&
      params.client_no_context_takeover
    ) {
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    }

    if (!params.client_max_window_bits) {
      if (typeof this._options.clientMaxWindowBits === 'number') {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      }
    } else if (
      this._options.clientMaxWindowBits === false ||
      (typeof this._options.clientMaxWindowBits === 'number' &&
        params.client_max_window_bits > this._options.clientMaxWindowBits)
    ) {
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    }

    return params;
  }

  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(configurations) {
    configurations.forEach((params) => {
      Object.keys(params).forEach((key) => {
        var value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];

        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          } else if (!this._isServer) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else if (key === 'server_max_window_bits') {
          const num = +value;
          if (!Number.isInteger(num) || num < 8 || num > 15) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
          value = num;
        } else if (
          key === 'client_no_context_takeover' ||
          key === 'server_no_context_takeover'
        ) {
          if (value !== true) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else {
          throw new Error(`Unknown parameter "${key}"`);
        }

        params[key] = value;
      });
    });

    return configurations;
  }

  /**
   * Decompress data. Concurrency limited by async-limiter.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(data, fin, callback) {
    zlibLimiter.push((done) => {
      this._decompress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Compress data. Concurrency limited by async-limiter.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(data, fin, callback) {
    zlibLimiter.push((done) => {
      this._compress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(data, fin, callback) {
    const endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._inflate = zlib.createInflateRaw(
        Object.assign({}, this._options.zlibInflateOptions, { windowBits })
      );
      this._inflate[kPerMessageDeflate] = this;
      this._inflate[kTotalLength] = 0;
      this._inflate[kBuffers] = [];
      this._inflate.on('error', inflateOnError);
      this._inflate.on('data', inflateOnData);
    }

    this._inflate[kCallback] = callback;

    this._inflate.write(data);
    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(() => {
      const err = this._inflate[kError];

      if (err) {
        this._inflate.close();
        this._inflate = null;
        callback(err);
        return;
      }

      const data = bufferUtil.concat(
        this._inflate[kBuffers],
        this._inflate[kTotalLength]
      );

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._inflate.close();
        this._inflate = null;
      } else {
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];
      }

      callback(null, data);
    });
  }

  /**
   * Compress data.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(data, fin, callback) {
    if (!data || data.length === 0) {
      process.nextTick(callback, null, EMPTY_BLOCK);
      return;
    }

    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._deflate = zlib.createDeflateRaw(
        Object.assign({}, this._options.zlibDeflateOptions, { windowBits })
      );

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      //
      // An `'error'` event is emitted, only on Node.js < 10.0.0, if the
      // `zlib.DeflateRaw` instance is closed while data is being processed.
      // This can happen if `PerMessageDeflate#cleanup()` is called at the wrong
      // time due to an abnormal WebSocket closure.
      //
      this._deflate.on('error', NOOP);
      this._deflate.on('data', deflateOnData);
    }

    this._deflate.write(data);
    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
      if (!this._deflate) {
        //
        // This `if` statement is only needed for Node.js < 10.0.0 because as of
        // commit https://github.com/nodejs/node/commit/5e3f5164, the flush
        // callback is no longer called if the deflate stream is closed while
        // data is being processed.
        //
        return;
      }

      var data = bufferUtil.concat(
        this._deflate[kBuffers],
        this._deflate[kTotalLength]
      );

      if (fin) data = data.slice(0, data.length - 4);

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._deflate.close();
        this._deflate = null;
      } else {
        this._deflate[kTotalLength] = 0;
        this._deflate[kBuffers] = [];
      }

      callback(null, data);
    });
  }
}

module.exports = PerMessageDeflate;

/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}

/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (
    this[kPerMessageDeflate]._maxPayload < 1 ||
    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
  ) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError] = new RangeError('Max payload size exceeded');
  this[kError][kStatusCode] = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}

/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */
function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode] = 1007;
  this[kCallback](err);
}


/***/ }),

/***/ "1fKG":
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "32kp":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__("TeaE");
var parseqs = __webpack_require__("IbF0");
var parser = __webpack_require__("6KXk");
var inherit = __webpack_require__("d8vz");
var yeast = __webpack_require__("m1TI");
var debug = __webpack_require__("jxZM")('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function () {
  var XMLHttpRequest = __webpack_require__("dVXH");
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause () {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function (packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close () {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function () {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
     ('http' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};


/***/ }),

/***/ "3pWb":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__("LMGn")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("DKX1");


/***/ }),

/***/ "4t+r":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module requirements.
 */

var Polling = __webpack_require__("32kp");
var inherit = __webpack_require__("d8vz");

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty () { }

/**
 * Until https://github.com/tc39/proposal-global is shipped.
 */
function glob () {
  return typeof self !== 'undefined' ? self
      : typeof window !== 'undefined' ? window
      : typeof global !== 'undefined' ? global : {};
}

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    var global = glob();
    callbacks = global.___eio = (global.___eio || []);
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (typeof addEventListener === 'function') {
    addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};


/***/ }),

/***/ "5U8D":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return updateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return transformNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return transformString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeFav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return engStrings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return changeMode; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const updateObject = (oldObject, updatedProperties) => {
  return _objectSpread({}, oldObject, {}, updatedProperties);
};
const transformNumber = favNumber => {
  const favNumArray = String(favNumber).split("");

  if (favNumArray.length === 4) {
    return `${favNumArray[0]}K`;
  }

  if (favNumArray.length === 5) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}K`;
  }

  if (favNumArray.length === 6) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}K`;
  }

  if (favNumArray.length === 7) {
    const favNum = favNumArray[0];
    return `${favNum}M`;
  }

  if (favNumArray.length === 8) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}M`;
  }

  if (favNumArray.length === 9) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}M`;
  }

  if (favNumArray.length === 10) {
    const favNum = favNumArray[0];
    return `${favNum}B`;
  }

  if (favNumArray.length === 11) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}B`;
  }

  return favNumber;
};
const transformString = val => {
  const curVal = String(val).substr(0, 115);
  return curVal;
};
function changeFav(id, liked, favAdd, changedFav) {
  let changedFavorites = [...changedFav];
  let favDets = changedFavorites.filter(fav => fav.id === id);

  for (let favDet of favDets) {
    return updateFavs(favDet);
  }

  let newChangedFav = {
    id,
    liked,
    favAdd
  };
  return updateFavs(newChangedFav);

  function updateFavs(favDet) {
    favDet = updateObject(favDet, {
      liked: !favDet.liked
    });

    if (favDet.liked) {
      favDet = updateObject(favDet, {
        favAdd: favDet.favAdd + 1
      });
    } else {
      favDet = updateObject(favDet, {
        favAdd: favDet.favAdd - 1
      });
    }

    let updateChangeFav = changedFavorites.filter(fav => fav.id !== id);
    updateChangeFav.push(favDet);
    return {
      favDet,
      updateChangeFav
    };
  }
}
;
const engStrings = {
  suffixAgo: 'ago',
  seconds: 'sec',
  minute: '%d min',
  minutes: '%d min',
  hour: '%d hr',
  hours: '%d hrs',
  day: '%d day',
  days: '%d days',
  month: '%d month',
  months: '%d months',
  year: '%d yr',
  years: '%d yrs'
};
function changeMode(oldCnts, changeCntStart, field, isUpdate) {
  let cnts = [...oldCnts];
  let curIndex;
  let user = cnts.filter((userFnd, index) => {
    if (userFnd.id === changeCntStart.id) {
      curIndex = index;
      return true;
    }

    return false;
  });

  if (user.length > 0) {
    let updateUser = _objectSpread({}, user[0]);

    updateUser['pending'] = false;
    updateUser['request'] = false;
    updateUser['accept'] = false;
    updateUser[field] = isUpdate;
    cnts[curIndex] = updateUser;
    return cnts;
  }

  return oldCnts;
}

/***/ }),

/***/ "6K3k":
/***/ (function(module, exports) {

module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}


/***/ }),

/***/ "6KXk":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var utf8 = __webpack_require__("pJ3R");
var hasBinary = __webpack_require__("hJV7");
var after = __webpack_require__("OKa5");
var keys = __webpack_require__("er14");

/**
 * Current protocol version.
 */
exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

const EMPTY_BUFFER = Buffer.concat([]);

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  if (Buffer.isBuffer(packet.data)) {
    return encodeBuffer(packet, supportsBinary, callback);
  } else if (packet.data && (packet.data.buffer || packet.data) instanceof ArrayBuffer) {
    return encodeBuffer({ type: packet.type, data: arrayBufferToBuffer(packet.data) }, supportsBinary, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);
};

/**
 * Encode Buffer data
 */

function encodeBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var typeBuffer = Buffer.allocUnsafe(1);
  typeBuffer[0] = packets[packet.type];
  return callback(Buffer.concat([typeBuffer, data]));
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback){
  var data = Buffer.isBuffer(packet.data) ? packet.data : arrayBufferToBuffer(packet.data);
  var message = 'b' + packets[packet.type];
  message += data.toString('base64');
  return callback(message);
};

/**
 * Decodes a packet. Data also available as an ArrayBuffer if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }

  var type;

  // String data
  if (typeof data === 'string') {

    type = data.charAt(0);

    if (type === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  // Binary data
  if (binaryType === 'arraybuffer') {
    // wrap Buffer/ArrayBuffer data into an Uint8Array
    var intArray = new Uint8Array(data);
    type = intArray[0];
    return { type: packetslist[type], data: intArray.buffer.slice(1) };
  }

  if (data instanceof ArrayBuffer) {
    data = arrayBufferToBuffer(data);
  }
  type = data[0];
  return { type: packetslist[type], data: data.slice(1) };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string.
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  var data = Buffer.from(msg.substr(1), 'base64');
  if (binaryType === 'arraybuffer') {
    var abv = new Uint8Array(data.length);
    for (var i = 0; i < abv.length; i++){
      abv[i] = data[i];
    }
    data = abv.buffer;
  }
  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  if (supportsBinary && hasBinary(packets)) {
    return exports.encodePayloadAsBinary(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, supportsBinary, false, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

function setLengthHeader(message) {
  return message.length + ':' + message;
}

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  for (var i = 0; i < ary.length; i++) {
    each(ary[i], function(error, msg) {
      result[i] = msg;
      next(error, result);
    });
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '', n, msg, packet;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || (length != (n = Number(length)))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var more = callback(packet, i + n, l);
      if (false === more) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 *
 * Converts a buffer to a utf8.js encoded string
 *
 * @api private
 */

function bufferToString(buffer) {
  var str = '';
  for (var i = 0, l = buffer.length; i < l; i++) {
    str += String.fromCharCode(buffer[i]);
  }
  return str;
}

/**
 *
 * Converts a utf8.js encoded string to a buffer
 *
 * @api private
 */

function stringToBuffer(string) {
  var buf = Buffer.allocUnsafe(string.length);
  for (var i = 0, l = string.length; i < l; i++) {
    buf.writeUInt8(string.charCodeAt(i), i);
  }
  return buf;
}

/**
 *
 * Converts an ArrayBuffer to a Buffer
 *
 * @api private
 */

function arrayBufferToBuffer(data) {
  // data is either an ArrayBuffer or ArrayBufferView.
  var length = data.byteLength || data.length;
  var offset = data.byteOffset || 0;

  return Buffer.from(data.buffer || data, offset, length);
}

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {Buffer} encoded payload
 * @api private
 */

exports.encodePayloadAsBinary = function (packets, callback) {
  if (!packets.length) {
    return callback(EMPTY_BUFFER);
  }

  map(packets, encodeOneBinaryPacket, function(err, results) {
    return callback(Buffer.concat(results));
  });
};

function encodeOneBinaryPacket(p, doneCallback) {

  function onBinaryPacketEncode(packet) {

    var encodingLength = '' + packet.length;
    var sizeBuffer;

    if (typeof packet === 'string') {
      sizeBuffer = Buffer.allocUnsafe(encodingLength.length + 2);
      sizeBuffer[0] = 0; // is a string (not true binary = 0)
      for (var i = 0; i < encodingLength.length; i++) {
        sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
      }
      sizeBuffer[sizeBuffer.length - 1] = 255;
      return doneCallback(null, Buffer.concat([sizeBuffer, stringToBuffer(packet)]));
    }

    sizeBuffer = Buffer.allocUnsafe(encodingLength.length + 2);
    sizeBuffer[0] = 1; // is binary (true binary = 1)
    for (var i = 0; i < encodingLength.length; i++) {
      sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
    }
    sizeBuffer[sizeBuffer.length - 1] = 255;

    doneCallback(null, Buffer.concat([sizeBuffer, packet]));
  }

  exports.encodePacket(p, true, true, onBinaryPacketEncode);

}


/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary

 * @param {Buffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];
  var i;

  while (bufferTail.length > 0) {
    var strLen = '';
    var isString = bufferTail[0] === 0;
    for (i = 1; ; i++) {
      if (bufferTail[i] === 255)  break;
      // 310 = char length of Number.MAX_VALUE
      if (strLen.length > 310) {
        return callback(err, 0, 1);
      }
      strLen += '' + bufferTail[i];
    }
    bufferTail = bufferTail.slice(strLen.length + 1);

    var msgLength = parseInt(strLen, 10);

    var msg = bufferTail.slice(1, msgLength + 1);
    if (isString) msg = bufferToString(msg);
    buffers.push(msg);
    bufferTail = bufferTail.slice(msgLength + 1);
  }

  var total = buffers.length;
  for (i = 0; i < total; i++) {
    var buffer = buffers[i];
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  }
};


/***/ }),

/***/ "6nQX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


try {
  const isValidUTF8 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'utf-8-validate'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  exports.isValidUTF8 =
    typeof isValidUTF8 === 'object'
      ? isValidUTF8.Validation.isValidUTF8 // utf-8-validate@<3.0.0
      : isValidUTF8;
} catch (e) /* istanbul ignore next */ {
  exports.isValidUTF8 = () => true;
}

/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */
exports.isValidStatusCode = (code) => {
  return (
    (code >= 1000 &&
      code <= 1013 &&
      code !== 1004 &&
      code !== 1005 &&
      code !== 1006) ||
    (code >= 3000 && code <= 4999)
  );
};


/***/ }),

/***/ "7WL4":
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "8D6M":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var eio = __webpack_require__("Dc9M");
var Socket = __webpack_require__("aX6P");
var Emitter = __webpack_require__("tFq7");
var parser = __webpack_require__("y8Xw");
var on = __webpack_require__("0Xh6");
var bind = __webpack_require__("JoOU");
var debug = __webpack_require__("S6K+")('socket.io-client:manager');
var indexOf = __webpack_require__("w9Yd");
var Backoff = __webpack_require__("xumg");

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager (uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' === typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting () {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};


/***/ }),

/***/ "8sp5":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parseuri = __webpack_require__("BI/a");
var debug = __webpack_require__("S6K+")('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url (uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || (typeof location !== 'undefined' && location);
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

  return obj;
}


/***/ }),

/***/ "8v4u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ "BI/a":
/***/ (function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};


/***/ }),

/***/ "BoKl":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var transports = __webpack_require__("vRIi");
var Emitter = __webpack_require__("tFq7");
var debug = __webpack_require__("jxZM")('engine.io-client:socket');
var index = __webpack_require__("w9Yd");
var parser = __webpack_require__("6KXk");
var parseuri = __webpack_require__("BI/a");
var parseqs = __webpack_require__("IbF0");

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket (uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure
    : (typeof location !== 'undefined' && 'https:' === location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (typeof location !== 'undefined' ? location.hostname : 'localhost');
  this.port = opts.port || (typeof location !== 'undefined' && location.port
      ? location.port
      : (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.withCredentials = false !== opts.withCredentials;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // detect ReactNative environment
  this.isReactNative = (typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative');

  // other options for Node.js or ReactNative client
  if (typeof self === 'undefined' || this.isReactNative) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = __webpack_require__("TeaE");
Socket.transports = __webpack_require__("vRIi");
Socket.parser = __webpack_require__("6KXk");

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    withCredentials: options.withCredentials || this.withCredentials,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void (0),
    isReactNative: this.isReactNative
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function () {
    self.onDrain();
  })
  .on('packet', function (packet) {
    self.onPacket(packet);
  })
  .on('error', function (e) {
    self.onError(e);
  })
  .on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen () {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport () {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror (err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose () {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose () {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade (to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup () {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState ||
      'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close () {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose () {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade () {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};


/***/ }),

/***/ "CBQ+":
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__("kRLM");
var bytesToUuid = __webpack_require__("Nr7C");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "DKX1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./react/login/store/actions/index.js + 1 modules
var actions = __webpack_require__("G9cm");

// EXTERNAL MODULE: external "@fortawesome/fontawesome-svg-core"
var fontawesome_svg_core_ = __webpack_require__("sLJp");

// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__("No/t");

// EXTERNAL MODULE: external "@fortawesome/free-regular-svg-icons"
var free_regular_svg_icons_ = __webpack_require__("s7eq");

// EXTERNAL MODULE: external "@fortawesome/free-brands-svg-icons"
var free_brands_svg_icons_ = __webpack_require__("JVe5");

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__("xnum");
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// CONCATENATED MODULE: ./react/login/hoc/Auxs/Auxs.js
const aux = props => props.children;

/* harmony default export */ var Auxs = (aux);
// CONCATENATED MODULE: ./react/login/hoc/Layout/Layout.js
var __jsx = external_react_default.a.createElement;



const layout = props => __jsx(Auxs, null, props.children);

/* harmony default export */ var Layout = (layout);
// CONCATENATED MODULE: ./react/login/containers/SiteMain/Logo.svg
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M127.695 13.724s-45.5 33.5-37 53 9.5 21.5 13 26.5 10 10 10 10l-13.5-9.5-14.5-13s-30-19.5 7-44.5 35-22.5 35-22.5zM44.488 3.724s.707 6.836 2.707 14.64c2.807 10.956 8.052 22.294 17.689 22.36 16.701.114 35.452-11.692 52.24-31.278l1.559-1.819S82.195 28.056 70.695 28.14c-11.5.084-19-7.416-20.5-11.416s-5.707-13-5.707-13zM15.273 48.088s4.458.569 9.726.459c7.395-.154 15.397-1.803 16.876-7.93C44.437 30 39.715 16.3 29.747 2.689l-.926-1.264s7.568 26.279 5.907 33.615c-1.661 7.335-7.555 10.993-10.326 11.351-2.771.36-9.129 1.697-9.129 1.697zM24.284 97.812s4.192-1.62 8.773-4.223c6.431-3.654 12.685-8.911 11.071-15.004-2.798-10.558-13.469-20.362-28.712-27.591L14 50.323S33.16 69.837 35.188 77.08c2.028 7.242-1.416 13.263-3.682 14.897-2.266 1.633-7.222 5.835-7.222 5.835zM31.695 106.224s24-24.5 56-6l20.5 10.5 3 3-7.5-10.5s-24-29.5-49-21c0 0-9 3-14.5 9.5l-4.5 6.5-4 8z"
});

var _ref2 =
/*#__PURE__*/
external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M29.695 77.224c0 3.866-3.134 7-7 7s-8-3.134-8-7 4.134-7 8-7 7 3.134 7 7z"
});

var _ref3 =
/*#__PURE__*/
external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M11.537 63.044l3.583 14.373-4.862 14.281-4.576-15.084 5.855-13.57"
});

var _ref4 =
/*#__PURE__*/
external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M21.42 77.329c.168 5.184-1.751 8.483-1.751 8.483l-6.888-.057s3.11-6.997 3.025-8.319-1.976-8.672-2.859-8.681l6.888.057c-.001.001 1.395 2.64 1.585 8.517M11.574 90.264c1.06.077 2.117.048 3.179.042.574-.003 1.151.023 1.719.109.187.029.372.064.556.105.507.185.408-.023-.298-.624l.151-1.156c.407-.344.365-.393-.126-.148-1.549.533-1.364 2.988.399 2.946 1.431-.034 2.968-.437 3.338-2.007.409-1.735-1.76-2.495-2.742-1.156-.321.438-.546.741-.749 1.267l2.507-.662c-.524-.595-1.397-.602-2.032-1.004-1.426-.903-3.122 1.24-1.818 2.356 1.109.949 2.199.758 3.408.088 1.692-.938.179-3.529-1.514-2.59-.623.345-.26-.036.228.381l-1.818 2.356c.267.169.578.27.872.385.133.052.776.402.553.15.814.925 2.134.307 2.507-.662.065-.169.325-.385.446-.55l-2.742-1.156c.107-.453.145-.209-.446-.195l.399 2.946c.835-.287 1.808-.637 2.07-1.589.226-.823-.25-1.609-.971-1.978-2.08-1.064-4.844-.492-7.079-.653-1.928-.14-1.915 2.861.003 2.999zM29.374 35.662a7 7 0 01-9.899.109c-2.764-2.703-3.527-7.835-.824-10.598s7.85-2.113 10.614.59a7 7 0 01.109 9.899z"
});

var _ref5 =
/*#__PURE__*/
external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M26.31 12.827l-7.49 12.78-13.462 6.81 7.277-13.983 13.675-5.607"
});

var _ref6 =
/*#__PURE__*/
external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M23.385 29.95c-3.506 3.823-7.184 4.84-7.184 4.84l-4.883-4.857s7.116-2.827 7.979-3.831 4.651-7.581 4.026-8.205l4.883 4.857c.001 0-.847 2.862-4.821 7.196M7.29 32.3c.832.952 1.787 1.78 2.669 2.684.371.38.698.792 1 1.227.078.114.15.232.217.353-.559-.959 2.113-1.282 1.031-1.806-1.469-.711-3.123 1.127-1.818 2.356 1.021.961 2.468 1.81 3.804.91 1.436-.968.525-3.071-1.156-2.742-.343.067-.954.155-1.421.383l2.257 1.295c.098-.745-.645-1.647-.751-2.157-.35-1.685-2.954-1.265-2.946.399.007 1.448 1.089 2.102 2.341 2.454 1.866.524 2.657-2.371.798-2.893l-.297-.082c-.555-.15.156-.134.159.521l-2.946.399c.069.331.245.647.387.953.124.27.193.899.258.407-.161 1.231 1.365 1.73 2.257 1.295-.026.013.514-.043.704-.08l-1.156-2.742c.336-.226.137-.153-.168-.441l-1.818 2.356c.801.387 1.756.836 2.617.332.9-.527.96-1.618.536-2.47-1.005-2.022-2.98-3.366-4.434-5.031-1.277-1.461-3.39.67-2.124 2.12z"
});

var _ref7 =
/*#__PURE__*/
external_react_default.a.createElement("g", null, external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M70.09 24.02c-3.864.128-7.1-2.901-7.227-6.765s2.868-8.099 6.732-8.227c3.864-.128 7.133 3.9 7.26 7.764a7 7 0 01-6.765 7.228z"
}), external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M83.662 5.403L69.415 9.459 54.981 5.072 69.906 0l13.756 5.403"
}), external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M69.711 15.753c-5.176.339-8.537-1.47-8.537-1.47l-.17-6.886s7.096 2.877 8.414 2.749c1.318-.129 8.602-2.262 8.581-3.145l.17 6.886c.001 0-2.59 1.482-8.458 1.866M56.457 6.291c-.041 1.062.022 2.118.063 3.179.021.532.002 1.06-.03 1.591-.018.233-.05.463-.094.692-.171.511.045.416.649-.284l1.156.151c.343.412.381.376.114-.107-.565-1.483-3.049-1.407-2.946.399.079 1.402.493 2.99 2.069 3.307a1.507 1.507 0 001.156-2.742c-.45-.308-.756-.534-1.286-.719l.662 2.507c.544-.512.722-1.675.946-2.057.843-1.433-1.27-3.175-2.356-1.818-.91 1.137-.757 2.196-.035 3.402.992 1.658 3.586.15 2.59-1.514-.41-.685.026-.341-.434.233l-2.356-1.818c-.16.272-.263.582-.368.879-.1.282-.559.994-.109.57-.87.818-.358 2.153.662 2.507.201.07.388.292.57.416l1.156-2.742.228.234a1.827 1.827 0 01-.095-.648l-2.946.399c.315.827.67 1.789 1.623 2.052.813.224 1.625-.249 1.969-.98 1.001-2.129.356-4.833.444-7.09.074-1.935-2.927-1.927-3.002.001z"
}));

var _ref8 =
/*#__PURE__*/
external_react_default.a.createElement("g", null, external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M63.358 98.018a7 7 0 017.337 6.646c.191 3.861-2.736 8.145-6.597 8.335s-7.195-3.784-7.386-7.645a7 7 0 016.646-7.336z"
}), external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M50.091 116.854l14.179-4.287 14.503 4.151-14.84 5.314-13.842-5.178"
}), external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M63.871 106.278c5.17-.423 8.559 1.33 8.559 1.33l.282 6.882s-7.141-2.762-8.458-2.611c-1.316.15-8.564 2.402-8.529 3.284l-.282-6.882c.001.001 2.567-1.523 8.428-2.003M77.278 115.548c.024-1.063-.057-2.117-.115-3.177a16.236 16.236 0 01.004-1.591 7.67 7.67 0 01.077-.694c.165-.513-.056-.421-.662.278l-1.156-.151c-.343-.415-.375-.382-.098.098.58 1.449 3.08 1.426 2.946-.399-.101-1.388-.519-3-2.099-3.291-1.666-.307-2.617 1.778-1.156 2.742.455.3.763.528 1.295.703l-.662-2.507c-.543.528-.696 1.676-.918 2.068-.813 1.435 1.286 3.2 2.356 1.818.89-1.151.757-2.195.01-3.399-1.017-1.64-3.613-.135-2.59 1.514.413.665-.007.366.459-.237l2.356 1.818c.156-.276.259-.582.36-.882.091-.273.542-1.019.089-.578.843-.819.383-2.163-.662-2.507-.212-.07-.39-.276-.579-.401l-1.156 2.742-.215-.247c.073.209.11.425.112.646l2.946-.399c-.329-.823-.686-1.78-1.639-2.042-.808-.222-1.632.249-1.964.985-.97 2.152-.289 4.826-.341 7.093-.042 1.933 2.958 1.928 3.002-.003z"
}));

var _ref9 =
/*#__PURE__*/
external_react_default.a.createElement("g", null, external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M97.23 62.864a7 7 0 016.793-7.201c3.864-.113 8.088 2.9 8.201 6.764.113 3.864-3.928 7.117-7.793 7.23a7 7 0 01-7.201-6.793z"
}), external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M115.794 76.508l-4-14.262 4.443-14.417 5.014 14.945-5.457 13.734"
}), external_react_default.a.createElement("path", {
  fill: "#05578B",
  d: "M105.499 62.518c-.319-5.177 1.503-8.531 1.503-8.531l6.886-.143s-2.905 7.084-2.781 8.403 2.228 8.611 3.111 8.594l-6.886.143s-1.472-2.597-1.833-8.466M115.007 49.3c-1.062-.046-2.118.014-3.179.051a16.56 16.56 0 01-1.591-.036 6.682 6.682 0 01-.691-.099c-.511-.173-.415.042.286.646l-.151 1.156c-.412.343-.375.382.11.118 1.49-.562 1.402-3.041-.399-2.946-1.405.074-2.988.487-3.311 2.062-.348 1.696 1.769 2.567 2.742 1.156.31-.449.536-.754.722-1.284l-2.507.662c.508.544 1.675.728 2.054.953 1.433.85 3.168-1.266 1.818-2.356-1.133-.914-2.197-.757-3.403-.042-1.662.985-.154 3.579 1.514 2.59.69-.409.335.03-.232-.428l1.818-2.356c-.271-.161-.582-.264-.878-.37-.284-.102-.988-.563-.568-.114-.818-.877-2.151-.352-2.507.662-.07.198-.296.388-.42.567l2.742 1.156-.23.231c.211-.068.427-.099.649-.091l-.399-2.946c-.828.312-1.792.666-2.054 1.619-.224.814.249 1.623.979 1.97 2.123 1.009 4.834.372 7.089.468 1.932.084 1.924-2.916-.003-2.999z"
}));

function SvgLogo(props) {
  return external_react_default.a.createElement("svg", _extends({
    width: 127.714,
    height: 122.032
  }, props), _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9);
}

/* harmony default export */ var Logo = ("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIg0KCSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zWGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zYT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyINCgkgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxMjcuNzE0cHgiIGhlaWdodD0iMTIyLjAzMnB4IiB2aWV3Qm94PSIwIDAgMTI3LjcxNCAxMjIuMDMyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjcuNzE0IDEyMi4wMzIiDQoJIHhtbFNwYWNlPSJwcmVzZXJ2ZSI+DQo8ZGVmcz4NCjwvZGVmcz4NCjxnPg0KCTxwYXRoIGZpbGw9IiMwNTU3OEIiIGQ9Ik0xMjcuNjk1LDEzLjcyNGMwLDAtNDUuNSwzMy41LTM3LDUzczkuNSwyMS41LDEzLDI2LjVzMTAsMTAsMTAsMTBsLTEzLjUtOS41bC0xNC41LTEzYzAsMC0zMC0xOS41LDctNDQuNQ0KCQlTMTI3LjY5NSwxMy43MjQsMTI3LjY5NSwxMy43MjR6Ii8+DQo8L2c+DQo8cGF0aCBmaWxsPSIjMDU1NzhCIiBkPSJNNDQuNDg4LDMuNzI0YzAsMCwwLjcwNyw2LjgzNiwyLjcwNywxNC42NGMyLjgwNywxMC45NTYsOC4wNTIsMjIuMjk0LDE3LjY4OSwyMi4zNg0KCWMxNi43MDEsMC4xMTQsMzUuNDUyLTExLjY5Miw1Mi4yNC0zMS4yNzhjMS41NTktMS44MTksMS41NTktMS44MTksMS41NTktMS44MTlTODIuMTk1LDI4LjA1Niw3MC42OTUsMjguMTQNCgljLTExLjUsMC4wODQtMTktNy40MTYtMjAuNS0xMS40MTZTNDQuNDg4LDMuNzI0LDQ0LjQ4OCwzLjcyNHoiLz4NCjxwYXRoIGZpbGw9IiMwNTU3OEIiIGQ9Ik0xNS4yNzMsNDguMDg4YzAsMCw0LjQ1OCwwLjU2OSw5LjcyNiwwLjQ1OWM3LjM5NS0wLjE1NCwxNS4zOTctMS44MDMsMTYuODc2LTcuOTMNCglDNDQuNDM3LDMwLDM5LjcxNSwxNi4zLDI5Ljc0NywyLjY4OWMtMC45MjYtMS4yNjQtMC45MjYtMS4yNjQtMC45MjYtMS4yNjRzNy41NjgsMjYuMjc5LDUuOTA3LDMzLjYxNQ0KCWMtMS42NjEsNy4zMzUtNy41NTUsMTAuOTkzLTEwLjMyNiwxMS4zNTFDMjEuNjMxLDQ2Ljc1MSwxNS4yNzMsNDguMDg4LDE1LjI3Myw0OC4wODh6Ii8+DQo8cGF0aCBmaWxsPSIjMDU1NzhCIiBkPSJNMjQuMjg0LDk3LjgxMmMwLDAsNC4xOTItMS42Miw4Ljc3My00LjIyM2M2LjQzMS0zLjY1NCwxMi42ODUtOC45MTEsMTEuMDcxLTE1LjAwNA0KCUM0MS4zMyw2OC4wMjcsMzAuNjU5LDU4LjIyMywxNS40MTYsNTAuOTk0QzE0LDUwLjMyMywxNCw1MC4zMjMsMTQsNTAuMzIzczE5LjE2LDE5LjUxNCwyMS4xODgsMjYuNzU3DQoJYzIuMDI4LDcuMjQyLTEuNDE2LDEzLjI2My0zLjY4MiwxNC44OTdDMjkuMjQsOTMuNjEsMjQuMjg0LDk3LjgxMiwyNC4yODQsOTcuODEyeiIvPg0KPHBhdGggZmlsbD0iIzA1NTc4QiIgZD0iTTMxLjY5NSwxMDYuMjI0YzAsMCwyNC0yNC41LDU2LTZsMjAuNSwxMC41bDMsM2wtNy41LTEwLjVjMCwwLTI0LTI5LjUtNDktMjFjMCwwLTksMy0xNC41LDkuNWwtNC41LDYuNQ0KCUwzMS42OTUsMTA2LjIyNHoiLz4NCjxnPg0KCTxwYXRoIGZpbGw9IiMwNTU3OEIiIGQ9Ik0yOS42OTUsNzcuMjI0YzAsMy44NjYtMy4xMzQsNy03LDdzLTgtMy4xMzQtOC03YzAtMy44NjYsNC4xMzQtNyw4LTdTMjkuNjk1LDczLjM1OCwyOS42OTUsNzcuMjI0eiIvPg0KCTxnPg0KCQk8cG9seWxpbmUgZmlsbD0iIzA1NTc4QiIgcG9pbnRzPSIxMS41MzcsNjMuMDQ0IDE1LjEyLDc3LjQxNyAxMC4yNTgsOTEuNjk4IDUuNjgyLDc2LjYxNCAxMS41MzcsNjMuMDQ0IAkJIi8+DQoJCTxwYXRoIGZpbGw9IiMwNTU3OEIiIGQ9Ik0yMS40Miw3Ny4zMjljMC4xNjgsNS4xODQtMS43NTEsOC40ODMtMS43NTEsOC40ODNsLTYuODg4LTAuMDU3YzAsMCwzLjExLTYuOTk3LDMuMDI1LTguMzE5DQoJCQlzLTEuOTc2LTguNjcyLTIuODU5LTguNjgxbDYuODg4LDAuMDU3QzE5LjgzNCw2OC44MTMsMjEuMjMsNzEuNDUyLDIxLjQyLDc3LjMyOSIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMEZGIiBkPSJNMTAuMjc1LDkxLjE0MyIvPg0KCQk8Zz4NCgkJCTxnPg0KCQkJCTxwYXRoIGZpbGw9IiMwNTU3OEIiIGQ9Ik0xMS41NzQsOTAuMjY0YzEuMDYsMC4wNzcsMi4xMTcsMC4wNDgsMy4xNzksMC4wNDJjMC41NzQtMC4wMDMsMS4xNTEsMC4wMjMsMS43MTksMC4xMDkNCgkJCQkJYzAuMTg3LDAuMDI5LDAuMzcyLDAuMDY0LDAuNTU2LDAuMTA1YzAuNTA3LDAuMTg1LDAuNDA4LTAuMDIzLTAuMjk4LTAuNjI0YzAuMDUtMC4zODUsMC4xMDEtMC43NzEsMC4xNTEtMS4xNTYNCgkJCQkJYzAuNDA3LTAuMzQ0LDAuMzY1LTAuMzkzLTAuMTI2LTAuMTQ4Yy0xLjU0OSwwLjUzMy0xLjM2NCwyLjk4OCwwLjM5OSwyLjk0NmMxLjQzMS0wLjAzNCwyLjk2OC0wLjQzNywzLjMzOC0yLjAwNw0KCQkJCQljMC40MDktMS43MzUtMS43Ni0yLjQ5NS0yLjc0Mi0xLjE1NmMtMC4zMjEsMC40MzgtMC41NDYsMC43NDEtMC43NDksMS4yNjdjMC44MzYtMC4yMjEsMS42NzEtMC40NDEsMi41MDctMC42NjINCgkJCQkJYy0wLjUyNC0wLjU5NS0xLjM5Ny0wLjYwMi0yLjAzMi0xLjAwNGMtMS40MjYtMC45MDMtMy4xMjIsMS4yNC0xLjgxOCwyLjM1NmMxLjEwOSwwLjk0OSwyLjE5OSwwLjc1OCwzLjQwOCwwLjA4OA0KCQkJCQljMS42OTItMC45MzgsMC4xNzktMy41MjktMS41MTQtMi41OWMtMC42MjMsMC4zNDUtMC4yNi0wLjAzNiwwLjIyOCwwLjM4MWMtMC42MDYsMC43ODUtMS4yMTIsMS41NzEtMS44MTgsMi4zNTYNCgkJCQkJYzAuMjY3LDAuMTY5LDAuNTc4LDAuMjcsMC44NzIsMC4zODVjMC4xMzMsMC4wNTIsMC43NzYsMC40MDIsMC41NTMsMC4xNWMwLjgxNCwwLjkyNSwyLjEzNCwwLjMwNywyLjUwNy0wLjY2Mg0KCQkJCQljMC4wNjUtMC4xNjksMC4zMjUtMC4zODUsMC40NDYtMC41NWMtMC45MTQtMC4zODUtMS44MjgtMC43NzEtMi43NDItMS4xNTZjMC4xMDctMC40NTMsMC4xNDUtMC4yMDktMC40NDYtMC4xOTUNCgkJCQkJYzAuMTMzLDAuOTgyLDAuMjY2LDEuOTY0LDAuMzk5LDIuOTQ2YzAuODM1LTAuMjg3LDEuODA4LTAuNjM3LDIuMDctMS41ODljMC4yMjYtMC44MjMtMC4yNS0xLjYwOS0wLjk3MS0xLjk3OA0KCQkJCQljLTIuMDgtMS4wNjQtNC44NDQtMC40OTItNy4wNzktMC42NTNDOS42NDMsODcuMTI1LDkuNjU2LDkwLjEyNiwxMS41NzQsOTAuMjY0TDExLjU3NCw5MC4yNjR6Ii8+DQoJCQk8L2c+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8cGF0aCBmaWxsPSIjMDU1NzhCIiBkPSJNMjkuMzc0LDM1LjY2MmMtMi43MDMsMi43NjQtNy4xMzUsMi44MTItOS44OTksMC4xMDlzLTMuNTI3LTcuODM1LTAuODI0LTEwLjU5OHM3Ljg1LTIuMTEzLDEwLjYxNCwwLjU5DQoJCVMzMi4wNzgsMzIuODk4LDI5LjM3NCwzNS42NjJ6Ii8+DQoJPGc+DQoJCTxwb2x5bGluZSBmaWxsPSIjMDU1NzhCIiBwb2ludHM9IjI2LjMxLDEyLjgyNyAxOC44MiwyNS42MDcgNS4zNTgsMzIuNDE3IDEyLjYzNSwxOC40MzQgMjYuMzEsMTIuODI3IAkJIi8+DQoJCTxwYXRoIGZpbGw9IiMwNTU3OEIiIGQ9Ik0yMy4zODUsMjkuOTVjLTMuNTA2LDMuODIzLTcuMTg0LDQuODQtNy4xODQsNC44NGwtNC44ODMtNC44NTdjMCwwLDcuMTE2LTIuODI3LDcuOTc5LTMuODMxDQoJCQlzNC42NTEtNy41ODEsNC4wMjYtOC4yMDVsNC44ODMsNC44NTdDMjguMjA3LDIyLjc1NCwyNy4zNTksMjUuNjE2LDIzLjM4NSwyOS45NSIvPg0KCQk8cGF0aCBmaWxsPSIjMDAwMEZGIiBkPSJNNS43NTksMzIuMDMyIi8+DQoJCTxnPg0KCQkJPGc+DQoJCQkJPHBhdGggZmlsbD0iIzA1NTc4QiIgZD0iTTcuMjksMzIuM2MwLjgzMiwwLjk1MiwxLjc4NywxLjc4LDIuNjY5LDIuNjg0YzAuMzcxLDAuMzgsMC42OTgsMC43OTIsMSwxLjIyNw0KCQkJCQljMC4wNzgsMC4xMTQsMC4xNSwwLjIzMiwwLjIxNywwLjM1M2MtMC41NTktMC45NTksMi4xMTMtMS4yODIsMS4wMzEtMS44MDZjLTEuNDY5LTAuNzExLTMuMTIzLDEuMTI3LTEuODE4LDIuMzU2DQoJCQkJCWMxLjAyMSwwLjk2MSwyLjQ2OCwxLjgxLDMuODA0LDAuOTFjMS40MzYtMC45NjgsMC41MjUtMy4wNzEtMS4xNTYtMi43NDJjLTAuMzQzLDAuMDY3LTAuOTU0LDAuMTU1LTEuNDIxLDAuMzgzDQoJCQkJCWMwLjc1MiwwLjQzMiwxLjUwNSwwLjg2MywyLjI1NywxLjI5NWMwLjA5OC0wLjc0NS0wLjY0NS0xLjY0Ny0wLjc1MS0yLjE1N2MtMC4zNS0xLjY4NS0yLjk1NC0xLjI2NS0yLjk0NiwwLjM5OQ0KCQkJCQljMC4wMDcsMS40NDgsMS4wODksMi4xMDIsMi4zNDEsMi40NTRjMS44NjYsMC41MjQsMi42NTctMi4zNzEsMC43OTgtMi44OTNjLTAuMDk5LTAuMDI4LTAuMTk4LTAuMDU1LTAuMjk3LTAuMDgyDQoJCQkJCWMtMC41NTUtMC4xNSwwLjE1Ni0wLjEzNCwwLjE1OSwwLjUyMWMtMC45ODIsMC4xMzMtMS45NjQsMC4yNjYtMi45NDYsMC4zOTljMC4wNjksMC4zMzEsMC4yNDUsMC42NDcsMC4zODcsMC45NTMNCgkJCQkJYzAuMTI0LDAuMjcsMC4xOTMsMC44OTksMC4yNTgsMC40MDdjLTAuMTYxLDEuMjMxLDEuMzY1LDEuNzMsMi4yNTcsMS4yOTVjLTAuMDI2LDAuMDEzLDAuNTE0LTAuMDQzLDAuNzA0LTAuMDgNCgkJCQkJYy0wLjM4NS0wLjkxNC0wLjc3MS0xLjgyOC0xLjE1Ni0yLjc0MmMwLjMzNi0wLjIyNiwwLjEzNy0wLjE1My0wLjE2OC0wLjQ0MWMtMC42MDYsMC43ODUtMS4yMTIsMS41NzEtMS44MTgsMi4zNTYNCgkJCQkJYzAuODAxLDAuMzg3LDEuNzU2LDAuODM2LDIuNjE3LDAuMzMyYzAuOS0wLjUyNywwLjk2LTEuNjE4LDAuNTM2LTIuNDdjLTEuMDA1LTIuMDIyLTIuOTgtMy4zNjYtNC40MzQtNS4wMzENCgkJCQkJQzguMTM3LDI4LjcxOSw2LjAyNCwzMC44NSw3LjI5LDMyLjNMNy4yOSwzMi4zeiIvPg0KCQkJPC9nPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPHBhdGggZmlsbD0iIzA1NTc4QiIgZD0iTTcwLjA5LDI0LjAyYy0zLjg2NCwwLjEyOC03LjEtMi45MDEtNy4yMjctNi43NjVzMi44NjgtOC4wOTksNi43MzItOC4yMjcNCgkJYzMuODY0LTAuMTI4LDcuMTMzLDMuOSw3LjI2LDcuNzY0Qzc2Ljk4MiwyMC42NTcsNzMuOTU0LDIzLjg5Myw3MC4wOSwyNC4wMnoiLz4NCgk8Zz4NCgkJPHBvbHlsaW5lIGZpbGw9IiMwNTU3OEIiIHBvaW50cz0iODMuNjYyLDUuNDAzIDY5LjQxNSw5LjQ1OSA1NC45ODEsNS4wNzIgNjkuOTA2LDAgODMuNjYyLDUuNDAzIAkJIi8+DQoJCTxwYXRoIGZpbGw9IiMwNTU3OEIiIGQ9Ik02OS43MTEsMTUuNzUzYy01LjE3NiwwLjMzOS04LjUzNy0xLjQ3LTguNTM3LTEuNDdsLTAuMTctNi44ODZjMCwwLDcuMDk2LDIuODc3LDguNDE0LDIuNzQ5DQoJCQljMS4zMTgtMC4xMjksOC42MDItMi4yNjIsOC41ODEtMy4xNDVsMC4xNyw2Ljg4NkM3OC4xNywxMy44ODcsNzUuNTc5LDE1LjM2OSw2OS43MTEsMTUuNzUzIi8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwRkYiIGQ9Ik01NS41MzcsNS4wNzEiLz4NCgkJPGc+DQoJCQk8Zz4NCgkJCQk8cGF0aCBmaWxsPSIjMDU1NzhCIiBkPSJNNTYuNDU3LDYuMjkxYy0wLjA0MSwxLjA2MiwwLjAyMiwyLjExOCwwLjA2MywzLjE3OWMwLjAyMSwwLjUzMiwwLjAwMiwxLjA2LTAuMDMsMS41OTENCgkJCQkJYy0wLjAxOCwwLjIzMy0wLjA1LDAuNDYzLTAuMDk0LDAuNjkyYy0wLjE3MSwwLjUxMSwwLjA0NSwwLjQxNiwwLjY0OS0wLjI4NGMwLjM4NSwwLjA1LDAuNzcxLDAuMTAxLDEuMTU2LDAuMTUxDQoJCQkJCWMwLjM0MywwLjQxMiwwLjM4MSwwLjM3NiwwLjExNC0wLjEwN2MtMC41NjUtMS40ODMtMy4wNDktMS40MDctMi45NDYsMC4zOTljMC4wNzksMS40MDIsMC40OTMsMi45OSwyLjA2OSwzLjMwNw0KCQkJCQljMS42OSwwLjM0LDIuNTc3LTEuNzcxLDEuMTU2LTIuNzQyYy0wLjQ1LTAuMzA4LTAuNzU2LTAuNTM0LTEuMjg2LTAuNzE5YzAuMjIxLDAuODM2LDAuNDQxLDEuNjcxLDAuNjYyLDIuNTA3DQoJCQkJCWMwLjU0NC0wLjUxMiwwLjcyMi0xLjY3NSwwLjk0Ni0yLjA1N2MwLjg0My0xLjQzMy0xLjI3LTMuMTc1LTIuMzU2LTEuODE4Yy0wLjkxLDEuMTM3LTAuNzU3LDIuMTk2LTAuMDM1LDMuNDAyDQoJCQkJCWMwLjk5MiwxLjY1OCwzLjU4NiwwLjE1LDIuNTktMS41MTRjLTAuNDEtMC42ODUsMC4wMjYtMC4zNDEtMC40MzQsMC4yMzNjLTAuNzg1LTAuNjA2LTEuNTcxLTEuMjEyLTIuMzU2LTEuODE4DQoJCQkJCWMtMC4xNiwwLjI3Mi0wLjI2MywwLjU4Mi0wLjM2OCwwLjg3OWMtMC4xLDAuMjgyLTAuNTU5LDAuOTk0LTAuMTA5LDAuNTdjLTAuODcsMC44MTgtMC4zNTgsMi4xNTMsMC42NjIsMi41MDcNCgkJCQkJYzAuMjAxLDAuMDcsMC4zODgsMC4yOTIsMC41NywwLjQxNmMwLjM4NS0wLjkxNCwwLjc3MS0xLjgyOCwxLjE1Ni0yLjc0MmMwLjA3NiwwLjA3OCwwLjE1MiwwLjE1NiwwLjIyOCwwLjIzNA0KCQkJCQljLTAuMDcxLTAuMjEtMC4xMDItMC40MjYtMC4wOTUtMC42NDhjLTAuOTgyLDAuMTMzLTEuOTY0LDAuMjY2LTIuOTQ2LDAuMzk5YzAuMzE1LDAuODI3LDAuNjcsMS43ODksMS42MjMsMi4wNTINCgkJCQkJYzAuODEzLDAuMjI0LDEuNjI1LTAuMjQ5LDEuOTY5LTAuOThjMS4wMDEtMi4xMjksMC4zNTYtNC44MzMsMC40NDQtNy4wOUM1OS41MzMsNC4zNTUsNTYuNTMyLDQuMzYzLDU2LjQ1Nyw2LjI5MUw1Ni40NTcsNi4yOTF6DQoJCQkJCSIvPg0KCQkJPC9nPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPHBhdGggZmlsbD0iIzA1NTc4QiIgZD0iTTYzLjM1OCw5OC4wMThjMy44NjEtMC4xOTEsNy4xNDYsMi43ODUsNy4zMzcsNi42NDZjMC4xOTEsMy44NjEtMi43MzYsOC4xNDUtNi41OTcsOC4zMzUNCgkJcy03LjE5NS0zLjc4NC03LjM4Ni03LjY0NVM1OS40OTcsOTguMjA5LDYzLjM1OCw5OC4wMTh6Ii8+DQoJPGc+DQoJCTxwb2x5bGluZSBmaWxsPSIjMDU1NzhCIiBwb2ludHM9IjUwLjA5MSwxMTYuODU0IDY0LjI3LDExMi41NjcgNzguNzczLDExNi43MTggNjMuOTMzLDEyMi4wMzIgNTAuMDkxLDExNi44NTQgCQkiLz4NCgkJPHBhdGggZmlsbD0iIzA1NTc4QiIgZD0iTTYzLjg3MSwxMDYuMjc4YzUuMTctMC40MjMsOC41NTksMS4zMyw4LjU1OSwxLjMzbDAuMjgyLDYuODgyYzAsMC03LjE0MS0yLjc2Mi04LjQ1OC0yLjYxMQ0KCQkJYy0xLjMxNiwwLjE1LTguNTY0LDIuNDAyLTguNTI5LDMuMjg0bC0wLjI4Mi02Ljg4MkM1NS40NDQsMTA4LjI4Miw1OC4wMSwxMDYuNzU4LDYzLjg3MSwxMDYuMjc4Ii8+DQoJCTxwYXRoIGZpbGw9IiMwMDAwRkYiIGQ9Ik03OC4yMTgsMTE2LjcyOCIvPg0KCQk8Zz4NCgkJCTxnPg0KCQkJCTxwYXRoIGZpbGw9IiMwNTU3OEIiIGQ9Ik03Ny4yNzgsMTE1LjU0OGMwLjAyNC0xLjA2My0wLjA1Ny0yLjExNy0wLjExNS0zLjE3N2MtMC4wMjktMC41MzItMC4wMTktMS4wNTksMC4wMDQtMS41OTENCgkJCQkJYzAuMDE1LTAuMjMzLDAuMDQxLTAuNDY0LDAuMDc3LTAuNjk0YzAuMTY1LTAuNTEzLTAuMDU2LTAuNDIxLTAuNjYyLDAuMjc4Yy0wLjM4NS0wLjA1LTAuNzcxLTAuMTAxLTEuMTU2LTAuMTUxDQoJCQkJCWMtMC4zNDMtMC40MTUtMC4zNzUtMC4zODItMC4wOTgsMC4wOThjMC41OCwxLjQ0OSwzLjA4LDEuNDI2LDIuOTQ2LTAuMzk5Yy0wLjEwMS0xLjM4OC0wLjUxOS0zLTIuMDk5LTMuMjkxDQoJCQkJCWMtMS42NjYtMC4zMDctMi42MTcsMS43NzgtMS4xNTYsMi43NDJjMC40NTUsMC4zLDAuNzYzLDAuNTI4LDEuMjk1LDAuNzAzYy0wLjIyMS0wLjgzNi0wLjQ0MS0xLjY3MS0wLjY2Mi0yLjUwNw0KCQkJCQljLTAuNTQzLDAuNTI4LTAuNjk2LDEuNjc2LTAuOTE4LDIuMDY4Yy0wLjgxMywxLjQzNSwxLjI4NiwzLjIsMi4zNTYsMS44MThjMC44OS0xLjE1MSwwLjc1Ny0yLjE5NSwwLjAxLTMuMzk5DQoJCQkJCWMtMS4wMTctMS42NC0zLjYxMy0wLjEzNS0yLjU5LDEuNTE0YzAuNDEzLDAuNjY1LTAuMDA3LDAuMzY2LDAuNDU5LTAuMjM3YzAuNzg1LDAuNjA2LDEuNTcxLDEuMjEyLDIuMzU2LDEuODE4DQoJCQkJCWMwLjE1Ni0wLjI3NiwwLjI1OS0wLjU4MiwwLjM2LTAuODgyYzAuMDkxLTAuMjczLDAuNTQyLTEuMDE5LDAuMDg5LTAuNTc4YzAuODQzLTAuODE5LDAuMzgzLTIuMTYzLTAuNjYyLTIuNTA3DQoJCQkJCWMtMC4yMTItMC4wNy0wLjM5LTAuMjc2LTAuNTc5LTAuNDAxYy0wLjM4NSwwLjkxNC0wLjc3MSwxLjgyOC0xLjE1NiwyLjc0MmMtMC4wNzItMC4wODItMC4xNDMtMC4xNjUtMC4yMTUtMC4yNDcNCgkJCQkJYzAuMDczLDAuMjA5LDAuMTEsMC40MjUsMC4xMTIsMC42NDZjMC45ODItMC4xMzMsMS45NjQtMC4yNjYsMi45NDYtMC4zOTljLTAuMzI5LTAuODIzLTAuNjg2LTEuNzgtMS42MzktMi4wNDINCgkJCQkJYy0wLjgwOC0wLjIyMi0xLjYzMiwwLjI0OS0xLjk2NCwwLjk4NWMtMC45NywyLjE1Mi0wLjI4OSw0LjgyNi0wLjM0MSw3LjA5M0M3NC4yMzQsMTE3LjQ4NCw3Ny4yMzQsMTE3LjQ3OSw3Ny4yNzgsMTE1LjU0OA0KCQkJCQlMNzcuMjc4LDExNS41NDh6Ii8+DQoJCQk8L2c+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8cGF0aCBmaWxsPSIjMDU1NzhCIiBkPSJNOTcuMjMsNjIuODY0Yy0wLjExMy0zLjg2NCwyLjkyOS03LjA4OCw2Ljc5My03LjIwMWMzLjg2NC0wLjExMyw4LjA4OCwyLjksOC4yMDEsNi43NjQNCgkJYzAuMTEzLDMuODY0LTMuOTI4LDcuMTE3LTcuNzkzLDcuMjNDMTAwLjU2Niw2OS43NjksOTcuMzQyLDY2LjcyOCw5Ny4yMyw2Mi44NjR6Ii8+DQoJPGc+DQoJCTxwb2x5bGluZSBmaWxsPSIjMDU1NzhCIiBwb2ludHM9IjExNS43OTQsNzYuNTA4IDExMS43OTQsNjIuMjQ2IDExNi4yMzcsNDcuODI5IDEyMS4yNTEsNjIuNzc0IDExNS43OTQsNzYuNTA4IAkJIi8+DQoJCTxwYXRoIGZpbGw9IiMwNTU3OEIiIGQ9Ik0xMDUuNDk5LDYyLjUxOGMtMC4zMTktNS4xNzcsMS41MDMtOC41MzEsMS41MDMtOC41MzFsNi44ODYtMC4xNDNjMCwwLTIuOTA1LDcuMDg0LTIuNzgxLDguNDAzDQoJCQlzMi4yMjgsOC42MTEsMy4xMTEsOC41OTRsLTYuODg2LDAuMTQzQzEwNy4zMzIsNzAuOTg0LDEwNS44Niw2OC4zODcsMTA1LjQ5OSw2Mi41MTgiLz4NCgkJPHBhdGggZmlsbD0iIzAwMDBGRiIgZD0iTTExNi4yMzYsNDguMzg1Ii8+DQoJCTxnPg0KCQkJPGc+DQoJCQkJPHBhdGggZmlsbD0iIzA1NTc4QiIgZD0iTTExNS4wMDcsNDkuM2MtMS4wNjItMC4wNDYtMi4xMTgsMC4wMTQtMy4xNzksMC4wNTFjLTAuNTMyLDAuMDE4LTEuMDYtMC4wMDMtMS41OTEtMC4wMzYNCgkJCQkJYy0wLjIzMi0wLjAyMS0wLjQ2My0wLjA1NC0wLjY5MS0wLjA5OWMtMC41MTEtMC4xNzMtMC40MTUsMC4wNDIsMC4yODYsMC42NDZjLTAuMDUsMC4zODUtMC4xMDEsMC43NzEtMC4xNTEsMS4xNTYNCgkJCQkJYy0wLjQxMiwwLjM0My0wLjM3NSwwLjM4MiwwLjExLDAuMTE4YzEuNDktMC41NjIsMS40MDItMy4wNDEtMC4zOTktMi45NDZjLTEuNDA1LDAuMDc0LTIuOTg4LDAuNDg3LTMuMzExLDIuMDYyDQoJCQkJCWMtMC4zNDgsMS42OTYsMS43NjksMi41NjcsMi43NDIsMS4xNTZjMC4zMS0wLjQ0OSwwLjUzNi0wLjc1NCwwLjcyMi0xLjI4NGMtMC44MzYsMC4yMjEtMS42NzEsMC40NDEtMi41MDcsMC42NjINCgkJCQkJYzAuNTA4LDAuNTQ0LDEuNjc1LDAuNzI4LDIuMDU0LDAuOTUzYzEuNDMzLDAuODUsMy4xNjgtMS4yNjYsMS44MTgtMi4zNTZjLTEuMTMzLTAuOTE0LTIuMTk3LTAuNzU3LTMuNDAzLTAuMDQyDQoJCQkJCWMtMS42NjIsMC45ODUtMC4xNTQsMy41NzksMS41MTQsMi41OWMwLjY5LTAuNDA5LDAuMzM1LDAuMDMtMC4yMzItMC40MjhjMC42MDYtMC43ODUsMS4yMTItMS41NzEsMS44MTgtMi4zNTYNCgkJCQkJYy0wLjI3MS0wLjE2MS0wLjU4Mi0wLjI2NC0wLjg3OC0wLjM3Yy0wLjI4NC0wLjEwMi0wLjk4OC0wLjU2My0wLjU2OC0wLjExNGMtMC44MTgtMC44NzctMi4xNTEtMC4zNTItMi41MDcsMC42NjINCgkJCQkJYy0wLjA3LDAuMTk4LTAuMjk2LDAuMzg4LTAuNDIsMC41NjdjMC45MTQsMC4zODUsMS44MjgsMC43NzEsMi43NDIsMS4xNTZjLTAuMDc3LDAuMDc3LTAuMTU0LDAuMTU0LTAuMjMsMC4yMzENCgkJCQkJYzAuMjExLTAuMDY4LDAuNDI3LTAuMDk5LDAuNjQ5LTAuMDkxYy0wLjEzMy0wLjk4Mi0wLjI2Ni0xLjk2NC0wLjM5OS0yLjk0NmMtMC44MjgsMC4zMTItMS43OTIsMC42NjYtMi4wNTQsMS42MTkNCgkJCQkJYy0wLjIyNCwwLjgxNCwwLjI0OSwxLjYyMywwLjk3OSwxLjk3YzIuMTIzLDEuMDA5LDQuODM0LDAuMzcyLDcuMDg5LDAuNDY4QzExNi45NDIsNTIuMzgzLDExNi45MzQsNDkuMzgzLDExNS4wMDcsNDkuMw0KCQkJCQlMMTE1LjAwNyw0OS4zeiIvPg0KCQkJPC9nPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAsNTMuODQzIi8+DQo8L3N2Zz4NCg==");

// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__("uhWA");

// CONCATENATED MODULE: ./react/login/components/UI/Logo/logo.svg
function logo_extends() { logo_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return logo_extends.apply(this, arguments); }



var logo_ref =
/*#__PURE__*/
external_react_default.a.createElement("path", {
  fill: "#FF1600",
  d: "M93.414 11.649L128.272.703l31.56 10.946-33.209 10.946z"
});

var logo_ref2 =
/*#__PURE__*/
external_react_default.a.createElement("path", {
  fill: "#FF1600",
  d: "M106.644 31.01V17.363s16.585 7.051 19.647 6.823c3.062-.227 18.353-4.776 20.353-6.823V31.01s-6.383 3.294-20 3.867c-12.012.505-20-3.867-20-3.867zM98.744 14.634c-.192 2.978.003 5.952-.04 8.932-.02 1.391-.207 2.774-.467 4.139a8.41 8.41 0 01-.276 1.036c1.561.2 1.862-.314.904-1.542-.538-1.531-3.014-1.376-2.946.399.093 2.437 1.2 3.461 3.62 3.547 1.612.057 1.884-1.986.757-2.795-.886-.636-1.423-1.122-2.478-1.516l.358 2.742c.856-.434 1.43-1.249 2.07-1.94 1.325-1.431-.669-3.384-2.121-2.121-.506.44-.849.721-.974 1.388-.128.681.079 1.318.689 1.694.215.13.428.265.638.404 1.374 1.364 3.496-.757 2.121-2.121-.394-.391-.781-.588-1.245-.873l.689 1.694.202-.064-2.121-2.121c-.444.48-.868 1.17-1.463 1.471-1.261.639-.757 2.325.358 2.742.554.207 1.244.842 1.761 1.213l.757-2.795c-.792.202-.998.02-.62-.547l-2.946.399c.4 1.139.873 2.997 2.238 3.373 1.159.319 2.046-.414 2.476-1.435 1.969-4.67.742-10.395 1.058-15.301.126-1.935-2.875-1.923-2.999-.002z"
});

var logo_ref3 =
/*#__PURE__*/
external_react_default.a.createElement("path", {
  fill: "#05578b",
  d: "M17.644 2s-19.5 6.5-17.5 27.5 10 23 13.5 24 50 0 50 0 2.641 12.336 9 21.5 15.435 15.155 19 15.5c15.5 1.5 55 .5 55 .5V36l-39.5.5-12.5 17.5 31 1 .5 13-30.5 1s-5.741-1.158-8.5-5.5c-2.431-3.825-1.753-8.689-2.638-13.436-.951-5.099-11.184-12.397-26.602-12.13l-36.76-1.684s-4.5-10.25.5-10.25h40s13-19.5 16.5-24-60.5 0-60.5 0z"
});

var logo_ref4 =
/*#__PURE__*/
external_react_default.a.createElement("path", {
  fill: "#05578b",
  d: "M.106 91.422L13.457 70h58.174s10.198 13.751 12.483 15.788c2.285 2.036-6.557 4.345-9.651 5.634"
});

function logo_SvgLogo(props) {
  return external_react_default.a.createElement("svg", logo_extends({
    width: 50,
    height: 32,
    viewBox: "0 0 159.832 91.422"
  }, props), logo_ref, logo_ref2, logo_ref3, logo_ref4);
}

/* harmony default export */ var logo = ("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluICAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuc1hsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuc2E9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVTVkdWaWV3ZXJFeHRlbnNpb25zLzMuMC8iCgkgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9IjAgMCAxNTkuODMyIDkxLjQyMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTU5LjgzMiA5MS40MjIiCgkgeG1sU3BhY2U9InByZXNlcnZlIj4KPGRlZnM+CjwvZGVmcz4KPGc+Cgk8cG9seWdvbiBmaWxsPSIjRkYxNjAwIiBwb2ludHM9IjkzLjQxNCwxMS42NDkgMTI4LjI3MiwwLjcwMyAxNTkuODMyLDExLjY0OSAxMjYuNjIzLDIyLjU5NSAJIi8+Cgk8cGF0aCBmaWxsPSIjRkYxNjAwIiBkPSJNMTA2LjY0NCwzMS4wMVYxNy4zNjNjMCwwLDE2LjU4NSw3LjA1MSwxOS42NDcsNi44MjNjMy4wNjItMC4yMjcsMTguMzUzLTQuNzc2LDIwLjM1My02LjgyM1YzMS4wMQoJCWMwLDAtNi4zODMsMy4yOTQtMjAsMy44NjdDMTE0LjYzMiwzNS4zODIsMTA2LjY0NCwzMS4wMSwxMDYuNjQ0LDMxLjAxeiIvPgoJPHBhdGggZmlsbD0iI0ZGMTYwMCIgZD0iTTk0LjcwMiwxMS42NzciLz4KCTxwYXRoIGZpbGw9IiNGRjE2MDAiIGQ9Ik05NC4zNjMsNDEuOTI3Ii8+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZmlsbD0iI0ZGMTYwMCIgZD0iTTk4Ljc0NCwxNC42MzRjLTAuMTkyLDIuOTc4LDAuMDAzLDUuOTUyLTAuMDQsOC45MzJjLTAuMDIsMS4zOTEtMC4yMDcsMi43NzQtMC40NjcsNC4xMzkKCQkJCWMtMC4wNywwLjM1MS0wLjE2MiwwLjY5Ny0wLjI3NiwxLjAzNmMxLjU2MSwwLjIsMS44NjItMC4zMTQsMC45MDQtMS41NDJjLTAuNTM4LTEuNTMxLTMuMDE0LTEuMzc2LTIuOTQ2LDAuMzk5CgkJCQljMC4wOTMsMi40MzcsMS4yLDMuNDYxLDMuNjIsMy41NDdjMS42MTIsMC4wNTcsMS44ODQtMS45ODYsMC43NTctMi43OTVjLTAuODg2LTAuNjM2LTEuNDIzLTEuMTIyLTIuNDc4LTEuNTE2CgkJCQljMC4xMTksMC45MTQsMC4yMzksMS44MjgsMC4zNTgsMi43NDJjMC44NTYtMC40MzQsMS40My0xLjI0OSwyLjA3LTEuOTRjMS4zMjUtMS40MzEtMC42NjktMy4zODQtMi4xMjEtMi4xMjEKCQkJCWMtMC41MDYsMC40NC0wLjg0OSwwLjcyMS0wLjk3NCwxLjM4OGMtMC4xMjgsMC42ODEsMC4wNzksMS4zMTgsMC42ODksMS42OTRjMC4yMTUsMC4xMywwLjQyOCwwLjI2NSwwLjYzOCwwLjQwNAoJCQkJYzEuMzc0LDEuMzY0LDMuNDk2LTAuNzU3LDIuMTIxLTIuMTIxYy0wLjM5NC0wLjM5MS0wLjc4MS0wLjU4OC0xLjI0NS0wLjg3M2MwLjIzLDAuNTY1LDAuNDYsMS4xMjksMC42ODksMS42OTQKCQkJCWMwLjA2Ny0wLjAyMSwwLjEzNS0wLjA0MywwLjIwMi0wLjA2NGMtMC43MDctMC43MDctMS40MTQtMS40MTQtMi4xMjEtMi4xMjFjLTAuNDQ0LDAuNDgtMC44NjgsMS4xNy0xLjQ2MywxLjQ3MQoJCQkJYy0xLjI2MSwwLjYzOS0wLjc1NywyLjMyNSwwLjM1OCwyLjc0MmMwLjU1NCwwLjIwNywxLjI0NCwwLjg0MiwxLjc2MSwxLjIxM2MwLjI1Mi0wLjkzMiwwLjUwNS0xLjg2MywwLjc1Ny0yLjc5NQoJCQkJYy0wLjc5MiwwLjIwMi0wLjk5OCwwLjAyLTAuNjItMC41NDdjLTAuOTgyLDAuMTMzLTEuOTY0LDAuMjY2LTIuOTQ2LDAuMzk5YzAuNCwxLjEzOSwwLjg3MywyLjk5NywyLjIzOCwzLjM3MwoJCQkJYzEuMTU5LDAuMzE5LDIuMDQ2LTAuNDE0LDIuNDc2LTEuNDM1YzEuOTY5LTQuNjcsMC43NDItMTAuMzk1LDEuMDU4LTE1LjMwMUMxMDEuODY5LDEyLjcwMSw5OC44NjgsMTIuNzEzLDk4Ljc0NCwxNC42MzQKCQkJCUw5OC43NDQsMTQuNjM0eiIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8cGF0aCBmaWxsPSIjMDU1NzhiIiBkPSJNMTcuNjQ0LDJjMCwwLTE5LjUsNi41LTE3LjUsMjcuNXMxMCwyMywxMy41LDI0czUwLDAsNTAsMHMyLjY0MSwxMi4zMzYsOSwyMS41CgljNi4zNTksOS4xNjQsMTUuNDM1LDE1LjE1NSwxOSwxNS41YzE1LjUsMS41LDU1LDAuNSw1NSwwLjVWMzZsLTM5LjUsMC41TDk0LjY0NCw1NGwzMSwxbDAuNSwxM2wtMzAuNSwxYzAsMC01Ljc0MS0xLjE1OC04LjUtNS41CgljLTIuNDMxLTMuODI1LTEuNzUzLTguNjg5LTIuNjM4LTEzLjQzNmMtMC45NTEtNS4wOTktMTEuMTg0LTEyLjM5Ny0yNi42MDItMTIuMTNsLTM2Ljc2LTEuNjg0YzAsMC00LjUtMTAuMjUsMC41LTEwLjI1czQwLDAsNDAsMAoJczEzLTE5LjUsMTYuNS0yNFMxNy42NDQsMiwxNy42NDQsMnoiLz4KPHBhdGggZmlsbD0iIzA1NTc4YiIgZD0iTTEwLjA1LDY5LjkwNCIvPgo8cGF0aCBmaWxsPSIjMDU1NzhiIiBkPSJNMC4xMDYsOTEuNDIyTDEzLjQ1Nyw3MGg1OC4xNzRjMCwwLDEwLjE5OCwxMy43NTEsMTIuNDgzLDE1Ljc4OGMyLjI4NSwyLjAzNi02LjU1Nyw0LjM0NS05LjY1MSw1LjYzNCIvPgo8L3N2Zz4K");

// CONCATENATED MODULE: ./react/login/components/UI/Logo/Logo.js
var Logo_jsx = external_react_default.a.createElement;



const Logo_logo = props => Logo_jsx("div", {
  className: "site-main__logo"
}, Logo_jsx(logo_SvgLogo, null));

/* harmony default export */ var Logo_Logo = (Logo_logo);
// EXTERNAL MODULE: ./react/login/components/UI/Loader/Loader.css
var Loader = __webpack_require__("LMAZ");

// CONCATENATED MODULE: ./react/login/components/UI/Loader/Loader.js
var Loader_jsx = external_react_default.a.createElement;



const loader = () => Loader_jsx("section", {
  className: "global"
}, Loader_jsx("div", {
  className: "top mask"
}, Loader_jsx("div", {
  className: "plane"
})), Loader_jsx("div", {
  className: "middle mask"
}, Loader_jsx("div", {
  className: "plane"
})), Loader_jsx("div", {
  className: "bottom mask"
}, Loader_jsx("div", {
  className: "plane"
})));

/* harmony default export */ var Loader_Loader = (loader);
// EXTERNAL MODULE: ./react/login/shared/utility.js
var utility = __webpack_require__("mjtn");

// CONCATENATED MODULE: ./react/login/containers/SiteMain/MainContent/Form/Form.js
var Form_jsx = external_react_default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class Form_Form extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      formElement: {
        username: {
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        },
        password: {
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        }
      },
      field: {
        type: 'password',
        isChange: false
      },
      formIsValid: false
    });

    _defineProperty(this, "changeFieldHandler", () => {
      if (this.state.field.isChange) {
        this.setState({
          field: Object(utility["b" /* updateObject */])(this.state.field, {
            type: 'password',
            isChange: false
          })
        });
        return;
      }

      this.setState({
        field: Object(utility["b" /* updateObject */])(this.state.field, {
          type: 'text',
          isChange: true
        })
      });
    });

    _defineProperty(this, "inputChangedHandler", (event, inputType) => {
      let updateFormType = Object(utility["b" /* updateObject */])(this.state.formElement[inputType], {
        value: event.target.value,
        valid: Object(utility["a" /* checkValidity */])(event.target.value, this.state.formElement[inputType].validation),
        touched: true
      });
      let formIsValid = true;
      let updateFormElement = Object(utility["b" /* updateObject */])(this.state.formElement, {
        [inputType]: updateFormType
      });

      for (let inputType in updateFormElement) {
        formIsValid = updateFormElement[inputType].valid && formIsValid;
      }

      this.setState({
        formElement: updateFormElement,
        formIsValid
      });
    });

    _defineProperty(this, "submitHandler", event => {
      event.preventDefault();

      if (this.state.formIsValid) {
        let newCnt = {
          username: this.state.formElement.username.value,
          password: this.state.formElement.password.value
        };
        this.props.onSubmitForm(newCnt);
        return;
      }
    });
  }

  componentDidUpdate() {
    if (this.props.submitted) {
      window.location.replace('/index/post');
    }
  }

  render() {
    let cnt = Form_jsx(Auxs, null, Form_jsx(Logo_Logo, null), Form_jsx("div", {
      className: "reuse-form__cnt"
    }, Form_jsx("div", {
      className: "reuse-form__cnt--header"
    }, Form_jsx("h4", null, "Welcome to Slodge24"), Form_jsx("p", null, "Knowledge sharing platform | Connecting scholars")), Form_jsx("div", {
      className: "reuse-form__cnt--main-wrapper"
    }, Form_jsx("h4", null, "Login with"), Form_jsx("ul", null, Form_jsx("li", null, Form_jsx("a", {
      href: "/auth/google"
    }, Form_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fab', 'google']
    }))), Form_jsx("li", null, Form_jsx("a", {
      href: "/auth/facebook"
    }, Form_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fab', 'facebook-f']
    }))))), Form_jsx("div", {
      className: "reuse-form__cnt--alt"
    }, "OR"), this.props.submitError ? Form_jsx("div", {
      className: "reuse-form__err"
    }, this.props.submitError.message) : null, Form_jsx("div", {
      className: "reuse-form__cnt--main-wrapper"
    }, Form_jsx("div", {
      className: "reuse-form__cnt--wrapper"
    }, Form_jsx("label", {
      className: "reuse-form__cnt--title"
    }, "Email"), Form_jsx("div", {
      className: "reuse-form__cnt--det"
    }, Form_jsx("input", {
      type: "email",
      className: "reuse-form__cnt--det__input",
      required: true,
      minLength: "6",
      value: this.state.formElement.username.value,
      onChange: event => this.inputChangedHandler(event, 'username')
    })), !this.state.formElement.username.valid && this.state.formElement.username.touched ? Form_jsx("div", {
      className: "reuse-form__err"
    }, "Email must be longer than 6 characters") : null), Form_jsx("div", {
      className: "reuse-form__cnt--wrapper"
    }, Form_jsx("label", {
      className: "reuse-form__cnt--title"
    }, "Password"), Form_jsx("div", {
      className: "reuse-form__cnt--det"
    }, Form_jsx("input", {
      type: this.state.field.type,
      className: "reuse-form__cnt--det__input reuse-form__cnt--det__input--pwd",
      required: true,
      minLength: "6",
      value: this.state.formElement.password.value,
      onChange: event => this.inputChangedHandler(event, 'password')
    }), Form_jsx("div", {
      className: "reuse-form__cnt--det__pwd",
      onClick: this.changeFieldHandler
    }, Form_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'eye'],
      className: "icon icon__reuse-form--view"
    }))), !this.state.formElement.password.valid && this.state.formElement.password.touched ? Form_jsx("div", {
      className: "reuse-form__err"
    }, "Password must be longer than 5 characters") : null), Form_jsx("div", {
      className: "reuse-form__cnt--footer reuse-form__btn"
    }, Form_jsx("button", {
      type: "submit",
      className: "reuse-form__btn--log",
      disabled: !this.state.formIsValid
    }, "Login", !this.props.start ? Form_jsx(Loader_Loader, null) : null))), Form_jsx("p", null, "Forgot password ", Form_jsx("a", {
      href: "/forget/password"
    }, "Retrive")), Form_jsx("p", null, "Create New Account ", Form_jsx("a", {
      href: "/signup"
    }, "Sign up"))), Form_jsx("ul", {
      className: "reuse-form__footer"
    }, Form_jsx("li", null, Form_jsx("a", {
      href: "/privacy"
    }, "Privacy policy")), Form_jsx("li", {
      className: "reuse-form__footer--copy"
    }, "\xA9 Slodge24 , 2020"), Form_jsx("li", null, Form_jsx("a", {
      href: "/term"
    }, "Terms of service"))));

    return Form_jsx("form", {
      className: "reuse-form",
      onSubmit: this.submitHandler
    }, Form_jsx("div", {
      className: "reuse-form__wrapper"
    }, cnt));
  }

}

const mapStateToProps = state => {
  return {
    userID: state.auth.userID,
    submitError: state.form.submitError,
    submitted: state.form.submitted,
    start: state.form.start
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitForm: formData => dispatch(actions["c" /* submitFormInit */](formData))
  };
};

/* harmony default export */ var MainContent_Form_Form = (Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(Form_Form));
// CONCATENATED MODULE: ./react/login/containers/SiteMain/MainContent/MainContent.js
var MainContent_jsx = external_react_default.a.createElement;



class MainContent_MainContent extends external_react_["Component"] {
  render() {
    return MainContent_jsx(MainContent_Form_Form, null);
  }

}

;
/* harmony default export */ var SiteMain_MainContent_MainContent = (MainContent_MainContent);
// CONCATENATED MODULE: ./react/login/containers/SiteMain/SiteMain.js
var SiteMain_jsx = external_react_default.a.createElement;
 // import './Form.css';




class SiteMain_SiteMain extends external_react_["Component"] {
  render() {
    return SiteMain_jsx("div", {
      className: "site-main",
      style: {
        backgroundImage: `url('${Logo}')`,
        backgroundRepeat: 'repeat'
      }
    }, SiteMain_jsx("div", {
      className: "wrapper"
    }, SiteMain_jsx("div", {
      className: "wrapper__exmain"
    }, SiteMain_jsx(SiteMain_MainContent_MainContent, null))));
  }

}

;
/* harmony default export */ var containers_SiteMain_SiteMain = (SiteMain_SiteMain);
// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-svg-core/styles.css
var styles = __webpack_require__("VAPu");

// CONCATENATED MODULE: ./react/login/App.js
var App_jsx = external_react_default.a.createElement;







const serviceWorker = false ? undefined : null;

 // import './index.css';

fontawesome_svg_core_["library"].add(free_solid_svg_icons_["fas"], free_regular_svg_icons_["far"], free_brands_svg_icons_["fab"]);

class App_App extends external_react_["Component"] {
  render() {
    return App_jsx(Layout, null, App_jsx(head_default.a, null, App_jsx("link", {
      rel: "stylesheet",
      type: "text/css",
      href: "/static/login/Form.css"
    })), App_jsx(containers_SiteMain_SiteMain, null));
  }

}

/* harmony default export */ var login_App = (App_App);

if (false) {}
// EXTERNAL MODULE: ./react/hoc/withStore/withStore.js + 207 modules
var withStore = __webpack_require__("tM3w");

// CONCATENATED MODULE: ./pages/robotonly/rblogin.js
var rblogin_jsx = external_react_default.a.createElement;






class rblogin_Login extends external_react_["Component"] {
  render() {
    return rblogin_jsx(external_react_redux_["Provider"], {
      store: this.props.store
    }, rblogin_jsx(login_App, null));
  }

}

/* harmony default export */ var rblogin = __webpack_exports__["default"] = (Object(withStore["b" /* loginStore */])(rblogin_Login));

/***/ }),

/***/ "Dc9M":
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__("BoKl");

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = __webpack_require__("6KXk");


/***/ }),

/***/ "DhbN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./react/index/store/actions/actionTypes.js
var actionTypes = __webpack_require__("E+sZ");

// CONCATENATED MODULE: ./react/index/store/actions/auth.js

const checkAuthInit = () => {
  return {
    type: actionTypes["s" /* CHECK_AUTH_INIT */]
  };
};
const checkAuth = status => {
  return {
    type: actionTypes["r" /* CHECK_AUTH */],
    status
  };
};
const checkUserImg = img => {
  return {
    type: actionTypes["t" /* CHECK_USERIMG */],
    img
  };
};
const checkUserName = name => {
  return {
    type: actionTypes["u" /* CHECK_USERNAME */],
    name
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/header.js

const headerFormExpand = () => {
  return {
    type: actionTypes["Pb" /* HEADER_FORM_EXPAND */]
  };
};
const headerFormSm = () => {
  return {
    type: actionTypes["Qb" /* HEADER_FORM_SM */]
  };
};
const headerNavDefault = () => {
  return {
    type: actionTypes["Rb" /* HEADER_NAV_DEFAULT */]
  };
};
const headerAddNew = () => {
  return {
    type: actionTypes["Jb" /* HEADER_ADD_NEW */]
  };
};
const fetchNotifyInit = () => {
  return {
    type: actionTypes["Y" /* FETCH_NOTIFY_INIT */]
  };
};
const fetchNotifyStart = () => {
  return {
    type: actionTypes["Z" /* FETCH_NOTIFY_START */]
  };
};
const fetchNotifySuccess = () => {
  return {
    type: actionTypes["ab" /* FETCH_NOTIFY_SUCCESS */]
  };
};
const fetchNotifyFail = err => {
  return {
    type: actionTypes["X" /* FETCH_NOTIFY_FAIL */],
    err
  };
};
const fetchNotify = notify => {
  return {
    type: actionTypes["U" /* FETCH_NOTIFY */],
    notify
  };
};
const changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: actionTypes["k" /* CHANGE_FAVORITE_NOTIFY_INIT */],
    notify,
    notifyID
  };
};
const changeFavNotifyStart = notify => {
  return {
    type: actionTypes["l" /* CHANGE_FAVORITE_NOTIFY_START */],
    notify
  };
};
const changeFavNotifyFail = notify => {
  return {
    type: actionTypes["j" /* CHANGE_FAVORITE_NOTIFY_FAIL */],
    notify
  };
};
const changeFavNotify = notify => {
  return {
    type: actionTypes["i" /* CHANGE_FAVORITE_NOTIFY */],
    notify
  };
};
const showNavList = () => {
  return {
    type: actionTypes["ec" /* SHOW_NAV_LIST */]
  };
};
const fetchNavlistInit = category => {
  return {
    type: actionTypes["S" /* FETCH_NAVLIST_INIT */],
    category
  };
};
const fetchNavlistStart = () => {
  return {
    type: actionTypes["T" /* FETCH_NAVLIST_START */]
  };
};
const fetchNavlist = (category, navList) => {
  return {
    type: actionTypes["R" /* FETCH_NAVLIST */],
    category,
    navList
  };
};
const showUserOption = () => {
  return {
    type: actionTypes["fc" /* SHOW_USER_OPTION */]
  };
};
const fetchNotifyactiveInit = userID => {
  return {
    type: actionTypes["W" /* FETCH_NOTIFY_ACTIVE_INIT */],
    userID
  };
};
const fetchNotifyActive = notifyActive => {
  return {
    type: actionTypes["V" /* FETCH_NOTIFY_ACTIVE */],
    notifyActive
  };
};
const defaultNotifyactiveInit = () => {
  return {
    type: actionTypes["w" /* DEFAULT_NOTIFYACTIVE_INIT */]
  };
};
const defaultNotifyActive = () => {
  return {
    type: actionTypes["v" /* DEFAULT_NOTIFYACTIVE */]
  };
};
const changeMainFavoriteStart = isLiked => {
  return {
    type: actionTypes["p" /* CHANGE_MAINFAVORITE_START */],
    isLiked
  };
};
const changeMainFavoriteReset = () => {
  return {
    type: actionTypes["o" /* CHANGE_MAINFAVORITE_RESET */]
  };
};
const headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: actionTypes["Nb" /* HEADER_FILTER_INIT */],
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: actionTypes["Ob" /* HEADER_FILTER_START */],
    filterPos,
    filterLastPos
  };
};
const headerFilterFail = searchCntErr => {
  return {
    type: actionTypes["Mb" /* HEADER_FILTER_FAIL */],
    searchCntErr
  };
};
const headerFilter = searchCnt => {
  return {
    type: actionTypes["Kb" /* HEADER_FILTER */],
    searchCnt
  };
};
const headerFilterClose = () => {
  return {
    type: actionTypes["Lb" /* HEADER_FILTER_CLOSE */]
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/model.js

const fetchCntInit = (userID, fetchType, fetchLimit, skipCnt, cntTotal) => {
  return {
    type: actionTypes["J" /* FETCH_CNT_INIT */],
    userID,
    fetchType,
    fetchLimit,
    skipCnt,
    cntTotal
  };
};
const fetchCntStart = () => {
  return {
    type: actionTypes["L" /* FETCH_CNT_START */]
  };
};
const fetchCntReset = () => {
  return {
    type: actionTypes["K" /* FETCH_CNT_RESET */]
  };
};
const fetchCntFail = err => {
  return {
    type: actionTypes["I" /* FETCH_CNT_FAIL */],
    err
  };
};
const fetchCnt = (cnt, skipCnt, cntTotal) => {
  return {
    type: actionTypes["C" /* FETCH_CNT */],
    cnt,
    skipCnt,
    cntTotal
  };
};
const changeCntInit = (id, title, det, confirm, modelType) => {
  return {
    type: actionTypes["d" /* CHANGE_CNT_INIT */],
    id,
    title,
    det,
    confirm,
    modelType
  };
};
const changeCntStart = (title, id, det, modelType) => {
  return {
    type: actionTypes["f" /* CHANGE_CNT_START */],
    title,
    id,
    det,
    modelType
  };
};
const changeCntCancel = () => {
  return {
    type: actionTypes["b" /* CHANGE_CNT_CANCEL */]
  };
};
const changeCntReset = changed => {
  return {
    type: actionTypes["e" /* CHANGE_CNT_RESET */],
    changed
  };
};
const changeCntFail = err => {
  return {
    type: actionTypes["c" /* CHANGE_CNT_FAIL */],
    err
  };
};
const changeCnt = () => {
  return {
    type: actionTypes["a" /* CHANGE_CNT */]
  };
};
const fetchVideo = (id, url) => {
  return {
    type: actionTypes["zb" /* FETCH_VIDEO */],
    id,
    url
  };
};
const changeFavInit = (id, liked, favAdd, changedFav, userID, cntGrp) => {
  return {
    type: actionTypes["h" /* CHANGE_FAVORITE_INIT */],
    id,
    liked,
    favAdd,
    changedFav,
    userID,
    cntGrp
  };
};
const changeFavPtStart = (id, isLiked) => {
  return {
    type: actionTypes["n" /* CHANGE_FAVORITE_PT_START */],
    id,
    isLiked
  };
};
const changeFavPtFail = () => {
  return {
    type: actionTypes["m" /* CHANGE_FAVORITE_PT_FAIL */]
  };
};
const changeFav = changedFav => {
  return {
    type: actionTypes["g" /* CHANGE_FAVORITE */],
    changedFav
  };
};
const resetModel = () => {
  return {
    type: actionTypes["Xb" /* RESET_MODEL */]
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/filter.js

const fetchCntCategInit = categ => {
  return {
    type: actionTypes["E" /* FETCH_CNTCATEG_INIT */],
    categ
  };
};
const fetchCntCategStart = () => {
  return {
    type: actionTypes["F" /* FETCH_CNTCATEG_START */]
  };
};
const fetchCntCateg = categ => {
  return {
    type: actionTypes["D" /* FETCH_CNTCATEG */],
    categ
  };
};
const filterContentInit = content => {
  return {
    type: actionTypes["Cb" /* FILTER_CONTENT_INIT */],
    content
  };
};
const filterContentStart = () => {
  return {
    type: actionTypes["Db" /* FILTER_CONTENT_START */]
  };
};
const filterContentFail = err => {
  return {
    type: actionTypes["Bb" /* FILTER_CONTENT_FAIL */],
    err
  };
};
const filter_filterContent = totalFound => {
  return {
    type: actionTypes["Ab" /* FILTER_CONTENT */],
    totalFound
  };
};
const resetFilter = totalFound => {
  return {
    type: actionTypes["Wb" /* RESET_FILTER */]
  };
};
const filterPost = filterDet => {
  return {
    type: actionTypes["Eb" /* FILTER_POST */],
    filterDet
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/share.js

const fetchUsersInit = () => {
  return {
    type: actionTypes["xb" /* FETCH_USERS_INIT */]
  };
};
const fetchUsersStart = () => {
  return {
    type: actionTypes["yb" /* FETCH_USERS_SUCCESS */]
  };
};
const fetchUsersFail = () => {
  return {
    type: actionTypes["wb" /* FETCH_USERS_FAIL */]
  };
};
const fetchUsers = users => {
  return {
    type: actionTypes["vb" /* FETCH_USERS */],
    users
  };
};
const share_userSelect = userSelect => {
  return {
    type: actionTypes["gc" /* USER_SELECT */],
    userSelect
  };
};
const viewUsers = () => {
  return {
    type: actionTypes["hc" /* VIEW_USERS */]
  };
};
const removeUser = users => {
  return {
    type: actionTypes["Tb" /* REMOVE_USER */],
    users
  };
};
const filterUserInit = (users, filterContent) => {
  return {
    type: actionTypes["Gb" /* FILTER_USER_INIT */],
    users,
    filterContent
  };
};
const filterUser = users => {
  return {
    type: actionTypes["Fb" /* FILTER_USER */],
    users
  };
};
const filterUserSelectInit = (filterContent, userSelect) => {
  return {
    type: actionTypes["Ib" /* FILTER_USER_SELECT_INIT */],
    filterContent,
    userSelect
  };
};
const filterUserSelect = userSelect => {
  return {
    type: actionTypes["Hb" /* FILTER_USER_SELECT */],
    userSelect
  };
};
const share_shareID = (shareID, cntType) => {
  return {
    type: actionTypes["Yb" /* SHARE_ID */],
    shareID,
    cntType
  };
};
const shareUserInit = (userSelect, shareID, cntType) => {
  return {
    type: actionTypes["bc" /* SHARE_USER_INIT */],
    userSelect,
    shareID,
    cntType
  };
};
const shareUserStart = () => {
  return {
    type: actionTypes["cc" /* SHARE_USER_START */]
  };
};
const shareUserfail = err => {
  return {
    type: actionTypes["ac" /* SHARE_USER_FAIL */],
    err
  };
};
const shareUser = () => {
  return {
    type: actionTypes["Zb" /* SHARE_USER */]
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/tags.js

const changeTagsPath = path => {
  return {
    type: actionTypes["q" /* CHANGE_TAGS_PATH */],
    path
  };
};
const fetchTagsInit = () => {
  return {
    type: actionTypes["nb" /* FETCH_TAGS_INIT */]
  };
};
const fetchTagsStart = () => {
  return {
    type: actionTypes["ob" /* FETCH_TAGS_START */]
  };
};
const fetchTagsSuccess = () => {
  return {
    type: actionTypes["pb" /* FETCH_TAGS_SUCCESS */]
  };
};
const fetchTagsFail = () => {
  return {
    type: actionTypes["mb" /* FETCH_TAGS_FAIL */]
  };
};
const fetchTags = tags => {
  return {
    type: actionTypes["lb" /* FETCH_TAGS */],
    tags
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/trend.js

const fetchTrdInit = userID => {
  return {
    type: actionTypes["sb" /* FETCH_TRD_INIT */],
    userID
  };
};
const fetchTrdStart = () => {
  return {
    type: actionTypes["tb" /* FETCH_TRD_START */]
  };
};
const fetchTrdSuccess = () => {
  return {
    type: actionTypes["ub" /* FETCH_TRD_SUCCESS */]
  };
};
const fetchTrdFail = () => {
  return {
    type: actionTypes["rb" /* FETCH_TRD_FAIL */]
  };
};
const fetchTrd = trd => {
  return {
    type: actionTypes["qb" /* FETCH_TRD */],
    trd
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/setQue.js

const fetchCategInit = () => {
  return {
    type: actionTypes["z" /* FETCH_CATEG_INIT */]
  };
};
const fetchCategStart = () => {
  return {
    type: actionTypes["A" /* FETCH_CATEG_START */]
  };
};
const fetchCategSuccess = () => {
  return {
    type: actionTypes["B" /* FETCH_CATEG_SUCCESS */]
  };
};
const fetchCategFail = () => {
  return {
    type: actionTypes["y" /* FETCH_CATEG_FAIL */]
  };
};
const fetchCateg = categ => {
  return {
    type: actionTypes["x" /* FETCH_CATEG */],
    categ
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/conv.js

const fetchConvInit = () => {
  return {
    type: actionTypes["O" /* FETCH_CONV_INIT */]
  };
};
const fetchConvStart = () => {
  return {
    type: actionTypes["P" /* FETCH_CONV_START */]
  };
};
const fetchConvSuccess = () => {
  return {
    type: actionTypes["Q" /* FETCH_CONV_SUCCESS */]
  };
};
const fetchConvFail = () => {
  return {
    type: actionTypes["N" /* FETCH_CONV_FAIL */]
  };
};
const fetchConv = conv => {
  return {
    type: actionTypes["M" /* FETCH_CONV */],
    conv
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/main.js

const fetchPtActiveInit = userID => {
  return {
    type: actionTypes["cb" /* FETCH_PT_ACTIVE_INIT */],
    userID
  };
};
const fetchPtActive = ptActive => {
  return {
    type: actionTypes["bb" /* FETCH_PT_ACTIVE */],
    ptActive
  };
};
const fetchQueActiveInit = queActive => {
  return {
    type: actionTypes["eb" /* FETCH_QUE_ACTIVE_INIT */],
    queActive
  };
};
const fetchQueActive = queActive => {
  return {
    type: actionTypes["db" /* FETCH_QUE_ACTIVE */],
    queActive
  };
};
const fetchCntActiveInit = userID => {
  return {
    type: actionTypes["H" /* FETCH_CNT_ACTIVE_INIT */],
    userID
  };
};
const fetchCntActive = cntActive => {
  return {
    type: actionTypes["G" /* FETCH_CNT_ACTIVE */],
    cntActive
  };
};
const fetchShareactiveInit = userID => {
  return {
    type: actionTypes["kb" /* FETCH_SHARE_ACTIVE_INIT */],
    userID
  };
};
const fetchShareActive = shareActive => {
  return {
    type: actionTypes["jb" /* FETCH_SHARE_ACTIVE */],
    shareActive
  };
};
const fetchReqActiveInit = () => {
  return {
    type: actionTypes["gb" /* FETCH_REQ_ACTIVE_INIT */]
  };
};
const fetchReqActive = reqActive => {
  return {
    type: actionTypes["fb" /* FETCH_REQ_ACTIVE */],
    reqActive
  };
};
const fetchShareCntactiveInit = userID => {
  return {
    type: actionTypes["ib" /* FETCH_SHARECNT_ACTIVE_INIT */],
    userID
  };
};
const fetchShareCntActive = shareCntActive => {
  return {
    type: actionTypes["hb" /* FETCH_SHARECNT_ACTIVE */],
    shareCntActive
  };
};
const resetActiveInit = (userID, curTab) => {
  return {
    type: actionTypes["Vb" /* RESET_ACTIVE_INIT */],
    userID,
    curTab
  };
};
const resetActive = curTab => {
  return {
    type: actionTypes["Ub" /* RESET_ACTIVE */],
    curTab
  };
};
const showMainBackdrop = () => {
  return {
    type: actionTypes["dc" /* SHOW_MAIN_BACKDROP */]
  };
};
const hideMainBackdrop = () => {
  return {
    type: actionTypes["Sb" /* HIDE_MAIN_BACKDROP */]
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/index.js
/* concated harmony reexport checkAuthInit */__webpack_require__.d(__webpack_exports__, "r", function() { return checkAuthInit; });
/* concated harmony reexport checkAuth */__webpack_require__.d(__webpack_exports__, "q", function() { return checkAuth; });
/* concated harmony reexport checkUserImg */__webpack_require__.d(__webpack_exports__, "s", function() { return checkUserImg; });
/* concated harmony reexport checkUserName */__webpack_require__.d(__webpack_exports__, "t", function() { return checkUserName; });
/* concated harmony reexport headerFormExpand */__webpack_require__.d(__webpack_exports__, "sb", function() { return headerFormExpand; });
/* concated harmony reexport headerFormSm */__webpack_require__.d(__webpack_exports__, "tb", function() { return headerFormSm; });
/* concated harmony reexport headerNavDefault */__webpack_require__.d(__webpack_exports__, "ub", function() { return headerNavDefault; });
/* concated harmony reexport headerAddNew */__webpack_require__.d(__webpack_exports__, "mb", function() { return headerAddNew; });
/* concated harmony reexport changeMainFavoriteStart */__webpack_require__.d(__webpack_exports__, "o", function() { return changeMainFavoriteStart; });
/* concated harmony reexport changeMainFavoriteReset */__webpack_require__.d(__webpack_exports__, "n", function() { return changeMainFavoriteReset; });
/* concated harmony reexport fetchNotifyInit */__webpack_require__.d(__webpack_exports__, "N", function() { return fetchNotifyInit; });
/* concated harmony reexport fetchNotifyStart */__webpack_require__.d(__webpack_exports__, "O", function() { return fetchNotifyStart; });
/* concated harmony reexport fetchNotifyFail */__webpack_require__.d(__webpack_exports__, "M", function() { return fetchNotifyFail; });
/* concated harmony reexport fetchNotify */__webpack_require__.d(__webpack_exports__, "K", function() { return fetchNotify; });
/* concated harmony reexport changeFavNotifyInit */__webpack_require__.d(__webpack_exports__, "j", function() { return changeFavNotifyInit; });
/* concated harmony reexport changeFavNotifyStart */__webpack_require__.d(__webpack_exports__, "k", function() { return changeFavNotifyStart; });
/* unused concated harmony import changeFavNotifyFail */
/* concated harmony reexport changeFavNotify */__webpack_require__.d(__webpack_exports__, "i", function() { return changeFavNotify; });
/* concated harmony reexport showNavList */__webpack_require__.d(__webpack_exports__, "Cb", function() { return showNavList; });
/* concated harmony reexport fetchNavlistInit */__webpack_require__.d(__webpack_exports__, "I", function() { return fetchNavlistInit; });
/* concated harmony reexport fetchNavlistStart */__webpack_require__.d(__webpack_exports__, "J", function() { return fetchNavlistStart; });
/* concated harmony reexport fetchNavlist */__webpack_require__.d(__webpack_exports__, "H", function() { return fetchNavlist; });
/* concated harmony reexport showUserOption */__webpack_require__.d(__webpack_exports__, "Db", function() { return showUserOption; });
/* concated harmony reexport fetchNotifyactiveInit */__webpack_require__.d(__webpack_exports__, "P", function() { return fetchNotifyactiveInit; });
/* concated harmony reexport fetchNotifyActive */__webpack_require__.d(__webpack_exports__, "L", function() { return fetchNotifyActive; });
/* concated harmony reexport defaultNotifyactiveInit */__webpack_require__.d(__webpack_exports__, "v", function() { return defaultNotifyactiveInit; });
/* concated harmony reexport defaultNotifyActive */__webpack_require__.d(__webpack_exports__, "u", function() { return defaultNotifyActive; });
/* concated harmony reexport headerFilterInit */__webpack_require__.d(__webpack_exports__, "qb", function() { return headerFilterInit; });
/* concated harmony reexport headerFilterStart */__webpack_require__.d(__webpack_exports__, "rb", function() { return headerFilterStart; });
/* concated harmony reexport headerFilterFail */__webpack_require__.d(__webpack_exports__, "pb", function() { return headerFilterFail; });
/* concated harmony reexport headerFilter */__webpack_require__.d(__webpack_exports__, "nb", function() { return headerFilter; });
/* concated harmony reexport headerFilterClose */__webpack_require__.d(__webpack_exports__, "ob", function() { return headerFilterClose; });
/* concated harmony reexport fetchCntInit */__webpack_require__.d(__webpack_exports__, "C", function() { return fetchCntInit; });
/* concated harmony reexport fetchCntFail */__webpack_require__.d(__webpack_exports__, "B", function() { return fetchCntFail; });
/* concated harmony reexport fetchCntStart */__webpack_require__.d(__webpack_exports__, "E", function() { return fetchCntStart; });
/* concated harmony reexport fetchCntReset */__webpack_require__.d(__webpack_exports__, "D", function() { return fetchCntReset; });
/* concated harmony reexport fetchCnt */__webpack_require__.d(__webpack_exports__, "x", function() { return fetchCnt; });
/* concated harmony reexport changeCntInit */__webpack_require__.d(__webpack_exports__, "d", function() { return changeCntInit; });
/* concated harmony reexport changeCntStart */__webpack_require__.d(__webpack_exports__, "f", function() { return changeCntStart; });
/* concated harmony reexport changeCntFail */__webpack_require__.d(__webpack_exports__, "c", function() { return changeCntFail; });
/* concated harmony reexport changeCntCancel */__webpack_require__.d(__webpack_exports__, "b", function() { return changeCntCancel; });
/* concated harmony reexport changeCntReset */__webpack_require__.d(__webpack_exports__, "e", function() { return changeCntReset; });
/* concated harmony reexport changeCnt */__webpack_require__.d(__webpack_exports__, "a", function() { return changeCnt; });
/* concated harmony reexport fetchVideo */__webpack_require__.d(__webpack_exports__, "fb", function() { return fetchVideo; });
/* concated harmony reexport changeFavInit */__webpack_require__.d(__webpack_exports__, "h", function() { return changeFavInit; });
/* concated harmony reexport changeFavPtStart */__webpack_require__.d(__webpack_exports__, "m", function() { return changeFavPtStart; });
/* concated harmony reexport changeFavPtFail */__webpack_require__.d(__webpack_exports__, "l", function() { return changeFavPtFail; });
/* concated harmony reexport changeFav */__webpack_require__.d(__webpack_exports__, "g", function() { return changeFav; });
/* concated harmony reexport resetModel */__webpack_require__.d(__webpack_exports__, "xb", function() { return resetModel; });
/* unused concated harmony import fetchCntCategInit */
/* unused concated harmony import fetchCntCategStart */
/* concated harmony reexport fetchCntCateg */__webpack_require__.d(__webpack_exports__, "A", function() { return fetchCntCateg; });
/* unused concated harmony import filterContentInit */
/* concated harmony reexport filterContentStart */__webpack_require__.d(__webpack_exports__, "ib", function() { return filterContentStart; });
/* concated harmony reexport filterContentFail */__webpack_require__.d(__webpack_exports__, "hb", function() { return filterContentFail; });
/* concated harmony reexport filterContent */__webpack_require__.d(__webpack_exports__, "gb", function() { return filter_filterContent; });
/* unused concated harmony import resetFilter */
/* concated harmony reexport filterPost */__webpack_require__.d(__webpack_exports__, "jb", function() { return filterPost; });
/* unused concated harmony import fetchUsersInit */
/* concated harmony reexport fetchUsersFail */__webpack_require__.d(__webpack_exports__, "eb", function() { return fetchUsersFail; });
/* concated harmony reexport fetchUsers */__webpack_require__.d(__webpack_exports__, "db", function() { return fetchUsers; });
/* unused concated harmony import userSelect */
/* unused concated harmony import viewUsers */
/* unused concated harmony import removeUser */
/* unused concated harmony import filterUserInit */
/* unused concated harmony import filterUserSelectInit */
/* concated harmony reexport filterUser */__webpack_require__.d(__webpack_exports__, "kb", function() { return filterUser; });
/* concated harmony reexport filterUserSelect */__webpack_require__.d(__webpack_exports__, "lb", function() { return filterUserSelect; });
/* concated harmony reexport shareID */__webpack_require__.d(__webpack_exports__, "yb", function() { return share_shareID; });
/* unused concated harmony import shareUserInit */
/* concated harmony reexport shareUserStart */__webpack_require__.d(__webpack_exports__, "Ab", function() { return shareUserStart; });
/* concated harmony reexport shareUserfail */__webpack_require__.d(__webpack_exports__, "Bb", function() { return shareUserfail; });
/* concated harmony reexport shareUser */__webpack_require__.d(__webpack_exports__, "zb", function() { return shareUser; });
/* concated harmony reexport changeTagsPath */__webpack_require__.d(__webpack_exports__, "p", function() { return changeTagsPath; });
/* unused concated harmony import fetchTagsInit */
/* unused concated harmony import fetchTagsStart */
/* unused concated harmony import fetchTagsFail */
/* concated harmony reexport fetchTags */__webpack_require__.d(__webpack_exports__, "ab", function() { return fetchTags; });
/* unused concated harmony import fetchTagsSuccess */
/* concated harmony reexport fetchTrdInit */__webpack_require__.d(__webpack_exports__, "cb", function() { return fetchTrdInit; });
/* concated harmony reexport fetchTrd */__webpack_require__.d(__webpack_exports__, "bb", function() { return fetchTrd; });
/* unused concated harmony import fetchCategInit */
/* concated harmony reexport fetchCateg */__webpack_require__.d(__webpack_exports__, "w", function() { return fetchCateg; });
/* concated harmony reexport fetchConvInit */__webpack_require__.d(__webpack_exports__, "G", function() { return fetchConvInit; });
/* concated harmony reexport fetchConv */__webpack_require__.d(__webpack_exports__, "F", function() { return fetchConv; });
/* concated harmony reexport fetchPtActiveInit */__webpack_require__.d(__webpack_exports__, "R", function() { return fetchPtActiveInit; });
/* concated harmony reexport fetchPtActive */__webpack_require__.d(__webpack_exports__, "Q", function() { return fetchPtActive; });
/* concated harmony reexport fetchQueActiveInit */__webpack_require__.d(__webpack_exports__, "T", function() { return fetchQueActiveInit; });
/* concated harmony reexport fetchQueActive */__webpack_require__.d(__webpack_exports__, "S", function() { return fetchQueActive; });
/* concated harmony reexport fetchCntActiveInit */__webpack_require__.d(__webpack_exports__, "z", function() { return fetchCntActiveInit; });
/* concated harmony reexport fetchCntActive */__webpack_require__.d(__webpack_exports__, "y", function() { return fetchCntActive; });
/* concated harmony reexport fetchShareCntactiveInit */__webpack_require__.d(__webpack_exports__, "Y", function() { return fetchShareCntactiveInit; });
/* concated harmony reexport fetchShareCntActive */__webpack_require__.d(__webpack_exports__, "X", function() { return fetchShareCntActive; });
/* concated harmony reexport fetchShareactiveInit */__webpack_require__.d(__webpack_exports__, "Z", function() { return fetchShareactiveInit; });
/* concated harmony reexport fetchShareActive */__webpack_require__.d(__webpack_exports__, "W", function() { return fetchShareActive; });
/* concated harmony reexport fetchReqActiveInit */__webpack_require__.d(__webpack_exports__, "V", function() { return fetchReqActiveInit; });
/* concated harmony reexport fetchReqActive */__webpack_require__.d(__webpack_exports__, "U", function() { return fetchReqActive; });
/* concated harmony reexport resetActiveInit */__webpack_require__.d(__webpack_exports__, "wb", function() { return resetActiveInit; });
/* concated harmony reexport resetActive */__webpack_require__.d(__webpack_exports__, "vb", function() { return resetActive; });
/* unused concated harmony import showMainBackdrop */
/* unused concated harmony import hideMainBackdrop */











/***/ }),

/***/ "E+sZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return CHECK_AUTH_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return CHECK_AUTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return CHECK_USERIMG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return CHECK_USERNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pb", function() { return HEADER_FORM_EXPAND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Qb", function() { return HEADER_FORM_SM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rb", function() { return HEADER_NAV_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nb", function() { return HEADER_FILTER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ob", function() { return HEADER_FILTER_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mb", function() { return HEADER_FILTER_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Kb", function() { return HEADER_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lb", function() { return HEADER_FILTER_CLOSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Jb", function() { return HEADER_ADD_NEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return FETCH_CNT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return FETCH_CNT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return FETCH_CNT_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return FETCH_CNT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return FETCH_CNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CHANGE_CNT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CHANGE_CNT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CHANGE_CNT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CHANGE_CNT_CANCEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CHANGE_CNT_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHANGE_CNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Eb", function() { return FILTER_POST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return FETCH_CNTCATEG_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return FETCH_CNTCATEG_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return FETCH_CNTCATEG; });
/* unused harmony export FETCH_VIDEO_INIT */
/* unused harmony export FETCH_VIDEO_START */
/* unused harmony export FETCH_VIDEO_FAIL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zb", function() { return FETCH_VIDEO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CHANGE_FAVORITE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return CHANGE_FAVORITE_PT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return CHANGE_FAVORITE_PT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CHANGE_FAVORITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xb", function() { return FETCH_USERS_INIT; });
/* unused harmony export FETCH_USERS_START */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yb", function() { return FETCH_USERS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wb", function() { return FETCH_USERS_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vb", function() { return FETCH_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gc", function() { return USER_SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hc", function() { return VIEW_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tb", function() { return REMOVE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gb", function() { return FILTER_USER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fb", function() { return FILTER_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ib", function() { return FILTER_USER_SELECT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hb", function() { return FILTER_USER_SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Yb", function() { return SHARE_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bc", function() { return SHARE_USER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cc", function() { return SHARE_USER_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ac", function() { return SHARE_USER_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Zb", function() { return SHARE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return CHANGE_TAGS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nb", function() { return FETCH_TAGS_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ob", function() { return FETCH_TAGS_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pb", function() { return FETCH_TAGS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mb", function() { return FETCH_TAGS_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lb", function() { return FETCH_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sb", function() { return FETCH_TRD_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tb", function() { return FETCH_TRD_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ub", function() { return FETCH_TRD_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rb", function() { return FETCH_TRD_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "qb", function() { return FETCH_TRD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return FETCH_CATEG_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return FETCH_CATEG_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return FETCH_CATEG_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return FETCH_CATEG_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return FETCH_CATEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return FETCH_CONV_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return FETCH_CONV_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return FETCH_CONV_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return FETCH_CONV_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return FETCH_CONV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return FETCH_NOTIFY_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return FETCH_NOTIFY_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ab", function() { return FETCH_NOTIFY_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return FETCH_NOTIFY_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return FETCH_NOTIFY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return CHANGE_MAINFAVORITE_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return CHANGE_MAINFAVORITE_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return CHANGE_FAVORITE_NOTIFY_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return CHANGE_FAVORITE_NOTIFY_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return CHANGE_FAVORITE_NOTIFY_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CHANGE_FAVORITE_NOTIFY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ec", function() { return SHOW_NAV_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return FETCH_NAVLIST_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return FETCH_NAVLIST_START; });
/* unused harmony export FETCH_NAVLIST_SUCCESS */
/* unused harmony export FETCH_NAVLIST_FAIL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return FETCH_NAVLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fc", function() { return SHOW_USER_OPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cb", function() { return FETCH_PT_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bb", function() { return FETCH_PT_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eb", function() { return FETCH_QUE_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "db", function() { return FETCH_QUE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return FETCH_CNT_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return FETCH_CNT_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gb", function() { return FETCH_REQ_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fb", function() { return FETCH_REQ_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kb", function() { return FETCH_SHARE_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jb", function() { return FETCH_SHARE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ib", function() { return FETCH_SHARECNT_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hb", function() { return FETCH_SHARECNT_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vb", function() { return RESET_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ub", function() { return RESET_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dc", function() { return SHOW_MAIN_BACKDROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sb", function() { return HIDE_MAIN_BACKDROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return FETCH_NOTIFY_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return FETCH_NOTIFY_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return DEFAULT_NOTIFYACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return DEFAULT_NOTIFYACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cb", function() { return FILTER_CONTENT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Db", function() { return FILTER_CONTENT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bb", function() { return FILTER_CONTENT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ab", function() { return FILTER_CONTENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wb", function() { return RESET_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xb", function() { return RESET_MODEL; });
const CHECK_AUTH_INIT = 'CHECK_AUTH_INIT';
const CHECK_AUTH = 'CHECK_AUTH';
const CHECK_USERIMG = 'CHECK_USERIMG';
const CHECK_USERNAME = 'CHECK_USERNAME';
const HEADER_FORM_EXPAND = 'HEADER_FORM_EXPAND';
const HEADER_FORM_SM = 'HEADER_FORM_SM';
const HEADER_NAV_DEFAULT = 'HEADER_NAV_DEFAULT';
const HEADER_FILTER_INIT = 'HEADER_FILTER_INIT';
const HEADER_FILTER_START = 'HEADER_FILTER_START';
const HEADER_FILTER_FAIL = 'HEADER_FILTER_FAIL';
const HEADER_FILTER = 'HEADER_FILTER';
const HEADER_FILTER_CLOSE = 'HEADER_FILTER_CLOSE';
const HEADER_ADD_NEW = 'HEADER_ADD_NEW';
const FETCH_CNT_INIT = 'FETCH_CNT_INIT';
const FETCH_CNT_START = 'FETCH_CNT_START';
const FETCH_CNT_RESET = 'FETCH_CNT_RESET';
const FETCH_CNT_FAIL = 'FETCH_CNT_FAIL';
const FETCH_CNT = 'FETCH_CNT';
const CHANGE_CNT_INIT = 'CHANGE_CNT_INIT';
const CHANGE_CNT_FAIL = 'CHANGE_CNT_FAIL';
const CHANGE_CNT_START = 'CHANGE_CNT_START';
const CHANGE_CNT_CANCEL = 'CHANGE_CNT_CANCEL';
const CHANGE_CNT_RESET = 'CHANGE_CNT_RESET';
const CHANGE_CNT = 'CHANGE_CNT';
const FILTER_POST = 'FILTER_POST';
const FETCH_CNTCATEG_INIT = 'FETCH_CNTCATEG_INIT';
const FETCH_CNTCATEG_START = 'FETCH_CNTCATEG_START';
const FETCH_CNTCATEG = 'FETCH_CNTCATEG';
const FETCH_VIDEO_INIT = 'FETCH_VIDEO_INIT';
const FETCH_VIDEO_START = 'FETCH_VIDEO_START';
const FETCH_VIDEO_FAIL = 'FETCH_VIDEO_FAIL';
const FETCH_VIDEO = 'FETCH_VIDEO';
const CHANGE_FAVORITE_INIT = 'CHANGE_FAVORITE_INIT';
const CHANGE_FAVORITE_PT_START = 'CHANGE_FAVORITE_PT_START';
const CHANGE_FAVORITE_PT_FAIL = 'CHANGE_FAVORITE_PT_FAIL';
const CHANGE_FAVORITE = 'CHANGE_FAVORITE';
const FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const FETCH_USERS_START = 'FETCH_USERS_START';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const FETCH_USERS = 'FETCH_USERS';
const USER_SELECT = 'USER_SELECT';
const VIEW_USERS = 'VIEW_USERS';
const REMOVE_USER = 'REMOVE_USER';
const FILTER_USER_INIT = 'FILTER_USER_INIT';
const FILTER_USER = 'FILTER_USER';
const FILTER_USER_SELECT_INIT = 'FILTER_USER_SELECT_INIT';
const FILTER_USER_SELECT = 'FILTER_USER_SELECT';
const SHARE_ID = 'SHARE_ID';
const SHARE_USER_INIT = 'SHARE_USER_INIT';
const SHARE_USER_START = 'SHARE_USER_START';
const SHARE_USER_FAIL = 'SHARE_USER_FAIL';
const SHARE_USER = 'SHARE_USER';
const CHANGE_TAGS_PATH = 'CHANGE_TAGS_PATH';
const FETCH_TAGS_INIT = 'FETCH_TAGS_INIT';
const FETCH_TAGS_START = 'FETCH_TAGS_START';
const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
const FETCH_TAGS_FAIL = 'FETCH_TAGS_FAIL';
const FETCH_TAGS = 'FETCH_TAGS';
const FETCH_TRD_INIT = 'FETCH_TRD_INIT';
const FETCH_TRD_START = 'FETCH_TRD_START';
const FETCH_TRD_SUCCESS = 'FETCH_TRD_SUCCESS';
const FETCH_TRD_FAIL = 'FETCH_TRD_FAIL';
const FETCH_TRD = 'FETCH_TRD';
const FETCH_CATEG_INIT = 'FETCH_CATEG_INIT';
const FETCH_CATEG_START = 'FETCH_CATEG_START';
const FETCH_CATEG_SUCCESS = 'FETCH_CATEG_SUCCESS';
const FETCH_CATEG_FAIL = 'FETCH_CATEG_FAIL';
const FETCH_CATEG = 'FETCH_CATEG';
const FETCH_CONV_INIT = 'FETCH_CONV_INIT';
const FETCH_CONV_START = 'FETCH_CONV_START';
const FETCH_CONV_SUCCESS = 'FETCH_CONV_SUCCESS';
const FETCH_CONV_FAIL = 'FETCH_CONV_FAIL';
const FETCH_CONV = 'FETCH_CONV';
const FETCH_NOTIFY_INIT = 'FETCH_NOTIFY_INIT';
const FETCH_NOTIFY_START = 'FETCH_NOTIFY_START';
const FETCH_NOTIFY_SUCCESS = 'FETCH_NOTIFY_SUCCESS';
const FETCH_NOTIFY_FAIL = 'FETCH_NOTIFY_FAIL';
const FETCH_NOTIFY = 'FETCH_NOTIFY';
const CHANGE_MAINFAVORITE_START = 'CHANGE_MAINFAVORITE_START';
const CHANGE_MAINFAVORITE_RESET = 'CHANGE_MAINFAVORITE_RESET';
const CHANGE_FAVORITE_NOTIFY_INIT = 'CHANGE_FAVORITE_NOTIFY_INIT';
const CHANGE_FAVORITE_NOTIFY_START = 'CHANGE_FAVORITE_NOTIFY_START';
const CHANGE_FAVORITE_NOTIFY_FAIL = 'CHANGE_FAVORITE_NOTIFY_FAIL';
const CHANGE_FAVORITE_NOTIFY = 'CHANGE_FAVORITE_NOTIFY';
const SHOW_NAV_LIST = 'SHOW_NAV_LIST';
const FETCH_NAVLIST_INIT = 'FETCH_NAVLIST_INIT';
const FETCH_NAVLIST_START = 'FETCH_NAVLIST_START';
const FETCH_NAVLIST_SUCCESS = 'FETCH_NAVLIST_SUCCESS';
const FETCH_NAVLIST_FAIL = 'FETCH_NAVLIST_FAIL';
const FETCH_NAVLIST = 'FETCH_NAVLIST';
const SHOW_USER_OPTION = 'SHOW_USER_OPTION';
const FETCH_PT_ACTIVE_INIT = 'FETCH_PT_ACTIVE_INIT';
const FETCH_PT_ACTIVE = 'FETCH_PT_ACTIVE';
const FETCH_QUE_ACTIVE_INIT = 'FETCH_QUE_ACTIVE_INIT';
const FETCH_QUE_ACTIVE = 'FETCH_QUE_ACTIVE';
const FETCH_CNT_ACTIVE_INIT = 'FETCH_CNT_ACTIVE_INIT';
const FETCH_CNT_ACTIVE = 'FETCH_CNT_ACTIVE';
const FETCH_REQ_ACTIVE_INIT = 'FETCH_REQ_ACTIVE_INIT';
const FETCH_REQ_ACTIVE = 'FETCH_REQ_ACTIVE';
const FETCH_SHARE_ACTIVE_INIT = 'FETCH_SHARE_ACTIVE_INIT';
const FETCH_SHARE_ACTIVE = 'FETCH_SHARE_ACTIVE';
const FETCH_SHARECNT_ACTIVE_INIT = 'FETCH_SHARECNT_ACTIVE_INIT';
const FETCH_SHARECNT_ACTIVE = 'FETCH_SHARECNT_ACTIVE';
const RESET_ACTIVE_INIT = 'RESET_ACTIVE_INIT';
const RESET_ACTIVE = 'RESET_ACTIVE';
const SHOW_MAIN_BACKDROP = 'SHOW_MAIN_BACKDROP';
const HIDE_MAIN_BACKDROP = 'HIDE_MAIN_BACKDROP';
const FETCH_NOTIFY_ACTIVE_INIT = 'FETCH_NOTIFY_ACTIVE_INIT';
const FETCH_NOTIFY_ACTIVE = 'FETCH_NOTIFY_ACTIVE';
const DEFAULT_NOTIFYACTIVE_INIT = 'DEFAULT_NOTIFYACTIVE_INIT';
const DEFAULT_NOTIFYACTIVE = 'DEFAULT_NOTIFYACTIVE';
const FILTER_CONTENT_INIT = 'FILTER_CONTENT_INIT';
const FILTER_CONTENT_START = 'FILTER_CONTENT_START';
const FILTER_CONTENT_FAIL = 'FILTER_CONTENT_FAIL';
const FILTER_CONTENT = 'FILTER_CONTENT';
const RESET_FILTER = 'RESET_FILTER';
const RESET_MODEL = 'RESET_MODEL';

/***/ }),

/***/ "E9J3":
/***/ (function(module, exports, __webpack_require__) {

/* global attachEvent */

/**
 * Module requirements.
 */

var XMLHttpRequest = __webpack_require__("dVXH");
var Polling = __webpack_require__("32kp");
var Emitter = __webpack_require__("tFq7");
var inherit = __webpack_require__("d8vz");
var debug = __webpack_require__("jxZM")('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty () {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR (opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (typeof location !== 'undefined') {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = (typeof location !== 'undefined' && opts.hostname !== location.hostname) ||
      port !== opts.port;
    this.xs = opts.secure !== isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;
  opts.withCredentials = this.withCredentials;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request (opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.withCredentials = opts.withCredentials;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = this.withCredentials;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (self.supportsBinary && contentType === 'application/octet-stream' || contentType === 'application/octet-stream; charset=UTF-8') {
              xhr.responseType = 'arraybuffer';
            }
          } catch (e) {}
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(typeof xhr.status === 'number' ? xhr.status : 0);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (typeof document !== 'undefined') {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (typeof document !== 'undefined') {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type');
    } catch (e) {}
    if (contentType === 'application/octet-stream' || contentType === 'application/octet-stream; charset=UTF-8') {
      data = this.xhr.response || this.xhr.responseText;
    } else {
      data = this.xhr.responseText;
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return typeof XDomainRequest !== 'undefined' && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (typeof document !== 'undefined') {
  if (typeof attachEvent === 'function') {
    attachEvent('onunload', unloadHandler);
  } else if (typeof addEventListener === 'function') {
    var terminationEvent = 'onpagehide' in self ? 'pagehide' : 'unload';
    addEventListener(terminationEvent, unloadHandler, false);
  }
}

function unloadHandler () {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}


/***/ }),

/***/ "F5Z+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return updateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return transformNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return transformString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeFav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return engStrings; });
/* unused harmony export changeMode */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return socket; });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("frh2");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const updateObject = (oldObject, updatedProperties) => {
  return _objectSpread({}, oldObject, {}, updatedProperties);
};
const transformNumber = favNumber => {
  const favNumArray = String(favNumber).split("");

  if (favNumArray.length === 4) {
    return `${favNumArray[0]}K`;
  }

  if (favNumArray.length === 5) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}K`;
  }

  if (favNumArray.length === 6) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}K`;
  }

  if (favNumArray.length === 7) {
    const favNum = favNumArray[0];
    return `${favNum}M`;
  }

  if (favNumArray.length === 8) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}M`;
  }

  if (favNumArray.length === 9) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}M`;
  }

  if (favNumArray.length === 10) {
    const favNum = favNumArray[0];
    return `${favNum}B`;
  }

  if (favNumArray.length === 11) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}B`;
  }

  return favNumber;
};
const transformString = val => {
  const curVal = String(val).substr(0, 115);
  return curVal;
};
function changeFav(id, liked, favAdd, changedFav) {
  let changedFavorites = [...changedFav];
  let favDets = changedFavorites.filter(fav => fav.id === id);

  for (let favDet of favDets) {
    return updateFavs(favDet);
  }

  let newChangedFav = {
    id,
    liked,
    favAdd
  };
  return updateFavs(newChangedFav);

  function updateFavs(favDet) {
    favDet = updateObject(favDet, {
      liked: !favDet.liked
    });

    if (favDet.liked) {
      favDet = updateObject(favDet, {
        favAdd: favDet.favAdd + 1
      });
    } else {
      favDet = updateObject(favDet, {
        favAdd: favDet.favAdd - 1
      });
    }

    let updateChangeFav = changedFavorites.filter(fav => fav.id !== id);
    updateChangeFav.push(favDet);
    return {
      favDet,
      updateChangeFav
    };
  }
}
;
const engStrings = {
  suffixAgo: 'ago',
  seconds: 'sec',
  minute: '%d min',
  minutes: '%d min',
  hour: '%d hr',
  hours: '%d hrs',
  day: '%d day',
  days: '%d days',
  month: '%d month',
  months: '%d months',
  year: '%d yr',
  years: '%d yrs'
};
function changeMode(oldCnts, changeCntStart, field, isUpdate) {
  let cnts = [...oldCnts];
  let curIndex;
  let user = cnts.filter((userFnd, index) => {
    curIndex = index;
    return userFnd.id === changeCntStart.id;
  });

  if (user.length > 0) {
    user[0].pending = false;
    user[0].request = false;
    user[0].accept = false;
    user[0][field] = isUpdate;
    cnts[curIndex] = user[0];
    return cnts;
  }

  return oldCnts;
}
const socket = socket_io_client__WEBPACK_IMPORTED_MODULE_0___default()('/');

/***/ }),

/***/ "FMKJ":
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),

/***/ "G9cm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./react/login/store/actions/actionTypes.js
var actionTypes = __webpack_require__("YaDP");

// CONCATENATED MODULE: ./react/login/store/actions/form.js

const submitFormInit = formData => {
  return {
    type: actionTypes["c" /* SUBMIT_FORM_INIT */],
    formData
  };
};
const submitFormFail = err => {
  return {
    type: actionTypes["b" /* SUBMIT_FORM_FAIL */],
    err
  };
};
const submitFormStart = () => {
  return {
    type: actionTypes["d" /* SUBMIT_FORM_START */]
  };
};
const formSubmitted = () => {
  return {
    type: actionTypes["a" /* FORM_SUBMITTED */]
  };
};
// CONCATENATED MODULE: ./react/login/store/actions/index.js
/* concated harmony reexport submitFormInit */__webpack_require__.d(__webpack_exports__, "c", function() { return submitFormInit; });
/* concated harmony reexport submitFormFail */__webpack_require__.d(__webpack_exports__, "b", function() { return submitFormFail; });
/* concated harmony reexport submitFormStart */__webpack_require__.d(__webpack_exports__, "d", function() { return submitFormStart; });
/* concated harmony reexport formSubmitted */__webpack_require__.d(__webpack_exports__, "a", function() { return formSubmitted; });


/***/ }),

/***/ "GM5T":
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("J8VP");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "HNiH":
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__("KTtj");

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "IbF0":
/***/ (function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),

/***/ "IgL6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const stream = __webpack_require__("msIP");

const PerMessageDeflate = __webpack_require__("0ulh");
const bufferUtil = __webpack_require__("fL2z");
const validation = __webpack_require__("6nQX");
const constants = __webpack_require__("QwQc");

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
 * HyBi Receiver implementation.
 *
 * @extends stream.Writable
 */
class Receiver extends stream.Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {String} binaryType The type for binary data
   * @param {Object} extensions An object containing the negotiated extensions
   * @param {Number} maxPayload The maximum allowed message length
   */
  constructor(binaryType, extensions, maxPayload) {
    super();

    this._binaryType = binaryType || constants.BINARY_TYPES[0];
    this[constants.kWebSocket] = undefined;
    this._extensions = extensions || {};
    this._maxPayload = maxPayload | 0;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._state = GET_INFO;
    this._loop = false;
  }

  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   */
  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

    this._bufferedBytes += chunk.length;
    this._buffers.push(chunk);
    this.startLoop(cb);
  }

  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(n) {
    this._bufferedBytes -= n;

    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = buf.slice(n);
      return buf.slice(0, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];

      if (n >= buf.length) {
        this._buffers.shift().copy(dst, dst.length - n);
      } else {
        buf.copy(dst, dst.length - n, 0, n);
        this._buffers[0] = buf.slice(n);
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }

  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(cb) {
    var err;
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          err = this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          err = this.getData(cb);
          break;
        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(RangeError, 'RSV2 and RSV3 must be clear', true, 1002);
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
      this._loop = false;
      return error(RangeError, 'RSV1 must be clear', true, 1002);
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(RangeError, 'invalid opcode 0', true, 1002);
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(RangeError, 'FIN must be set', true, 1002);
      }

      if (compressed) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      if (this._payloadLength > 0x7d) {
        this._loop = false;
        return error(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          true,
          1002
        );
      }
    } else {
      this._loop = false;
      return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
    else return this.haveLength();
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009
      );
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(RangeError, 'Max payload size exceeded', false, 1009);
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  getData(cb) {
    var data = constants.EMPTY_BUFFER;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);
      if (this._masked) bufferUtil.unmask(data, this._mask);
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its lenght is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;
      this._fragments.push(data);
    }

    return this.dataMessage();
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(data, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;
        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(
            error(RangeError, 'Max payload size exceeded', false, 1009)
          );
        }

        this._fragments.push(buf);
      }

      const er = this.dataMessage();
      if (er) return cb(er);

      this.startLoop(cb);
    });
  }

  /**
   * Handles a data message.
   *
   * @return {(Error|undefined)} A possible error
   * @private
   */
  dataMessage() {
    if (this._fin) {
      const messageLength = this._messageLength;
      const fragments = this._fragments;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        var data;

        if (this._binaryType === 'nodebuffer') {
          data = toBuffer(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(toBuffer(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.emit('message', data);
      } else {
        const buf = toBuffer(fragments, messageLength);

        if (!validation.isValidUTF8(buf)) {
          this._loop = false;
          return error(Error, 'invalid UTF-8 sequence', true, 1007);
        }

        this.emit('message', buf.toString());
      }
    }

    this._state = GET_INFO;
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(data) {
    if (this._opcode === 0x08) {
      this._loop = false;

      if (data.length === 0) {
        this.emit('conclude', 1005, '');
        this.end();
      } else if (data.length === 1) {
        return error(RangeError, 'invalid payload length 1', true, 1002);
      } else {
        const code = data.readUInt16BE(0);

        if (!validation.isValidStatusCode(code)) {
          return error(RangeError, `invalid status code ${code}`, true, 1002);
        }

        const buf = data.slice(2);

        if (!validation.isValidUTF8(buf)) {
          return error(Error, 'invalid UTF-8 sequence', true, 1007);
        }

        this.emit('conclude', code, buf.toString());
        this.end();
      }
    } else if (this._opcode === 0x09) {
      this.emit('ping', data);
    } else {
      this.emit('pong', data);
    }

    this._state = GET_INFO;
  }
}

module.exports = Receiver;

/**
 * Builds an error object.
 *
 * @param {(Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @return {(Error|RangeError)} The error
 * @private
 */
function error(ErrorCtor, message, prefix, statusCode) {
  const err = new ErrorCtor(
    prefix ? `Invalid WebSocket frame: ${message}` : message
  );

  Error.captureStackTrace(err, error);
  err[constants.kStatusCode] = statusCode;
  return err;
}

/**
 * Makes a buffer from a list of fragments.
 *
 * @param {Buffer[]} fragments The list of fragments composing the message
 * @param {Number} messageLength The length of the message
 * @return {Buffer}
 * @private
 */
function toBuffer(fragments, messageLength) {
  if (fragments.length === 1) return fragments[0];
  if (fragments.length > 1) return bufferUtil.concat(fragments, messageLength);
  return constants.EMPTY_BUFFER;
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 */
function toArrayBuffer(buf) {
  if (buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}


/***/ }),

/***/ "J8VP":
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__("QdrD");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "JMOJ":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "JVe5":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-brands-svg-icons");

/***/ }),

/***/ "JoOU":
/***/ (function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};


/***/ }),

/***/ "Jtlf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const crypto = __webpack_require__("PJMN");

const PerMessageDeflate = __webpack_require__("0ulh");
const bufferUtil = __webpack_require__("fL2z");
const validation = __webpack_require__("6nQX");
const constants = __webpack_require__("QwQc");

/**
 * HyBi Sender implementation.
 */
class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {net.Socket} socket The connection socket
   * @param {Object} extensions An object containing the negotiated extensions
   */
  constructor(socket, extensions) {
    this._extensions = extensions || {};
    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {Buffer} data The data to frame
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @return {Buffer[]} The framed data as a list of `Buffer` instances
   * @public
   */
  static frame(data, options) {
    const merge = data.length < 1024 || (options.mask && options.readOnly);
    var offset = options.mask ? 6 : 2;
    var payloadLength = data.length;

    if (data.length >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (data.length > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    if (payloadLength === 126) {
      target.writeUInt16BE(data.length, 2);
    } else if (payloadLength === 127) {
      target.writeUInt32BE(0, 2);
      target.writeUInt32BE(data.length, 6);
    }

    if (!options.mask) {
      target[1] = payloadLength;
      if (merge) {
        data.copy(target, offset);
        return [target];
      }

      return [target, data];
    }

    const mask = crypto.randomBytes(4);

    target[1] = payloadLength | 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (merge) {
      bufferUtil.mask(data, mask, target, offset, data.length);
      return [target];
    }

    bufferUtil.mask(data, mask, data, 0, data.length);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {(Number|undefined)} code The status code component of the body
   * @param {String} data The message component of the body
   * @param {Boolean} mask Specifies whether or not to mask the message
   * @param {Function} cb Callback
   * @public
   */
  close(code, data, mask, cb) {
    var buf;

    if (code === undefined) {
      buf = constants.EMPTY_BUFFER;
    } else if (
      typeof code !== 'number' ||
      !validation.isValidStatusCode(code)
    ) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || data === '') {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      buf = Buffer.allocUnsafe(2 + Buffer.byteLength(data));
      buf.writeUInt16BE(code, 0);
      buf.write(data, 2);
    }

    if (this._deflating) {
      this.enqueue([this.doClose, buf, mask, cb]);
    } else {
      this.doClose(buf, mask, cb);
    }
  }

  /**
   * Frames and sends a close message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @private
   */
  doClose(data, mask, cb) {
    this.sendFrame(
      Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x08,
        mask,
        readOnly: false
      }),
      cb
    );
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */
  ping(data, mask, cb) {
    var readOnly = true;

    if (!Buffer.isBuffer(data)) {
      if (data instanceof ArrayBuffer) {
        data = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        data = viewToBuffer(data);
      } else {
        data = Buffer.from(data);
        readOnly = false;
      }
    }

    if (this._deflating) {
      this.enqueue([this.doPing, data, mask, readOnly, cb]);
    } else {
      this.doPing(data, mask, readOnly, cb);
    }
  }

  /**
   * Frames and sends a ping message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Boolean} readOnly Specifies whether `data` can be modified
   * @param {Function} cb Callback
   * @private
   */
  doPing(data, mask, readOnly, cb) {
    this.sendFrame(
      Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x09,
        mask,
        readOnly
      }),
      cb
    );
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */
  pong(data, mask, cb) {
    var readOnly = true;

    if (!Buffer.isBuffer(data)) {
      if (data instanceof ArrayBuffer) {
        data = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        data = viewToBuffer(data);
      } else {
        data = Buffer.from(data);
        readOnly = false;
      }
    }

    if (this._deflating) {
      this.enqueue([this.doPong, data, mask, readOnly, cb]);
    } else {
      this.doPong(data, mask, readOnly, cb);
    }
  }

  /**
   * Frames and sends a pong message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Boolean} readOnly Specifies whether `data` can be modified
   * @param {Function} cb Callback
   * @private
   */
  doPong(data, mask, readOnly, cb) {
    this.sendFrame(
      Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x0a,
        mask,
        readOnly
      }),
      cb
    );
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} options.compress Specifies whether or not to compress `data`
   * @param {Boolean} options.binary Specifies whether `data` is binary or text
   * @param {Boolean} options.fin Specifies whether the fragment is the last one
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */
  send(data, options, cb) {
    var opcode = options.binary ? 2 : 1;
    var rsv1 = options.compress;
    var readOnly = true;

    if (!Buffer.isBuffer(data)) {
      if (data instanceof ArrayBuffer) {
        data = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        data = viewToBuffer(data);
      } else {
        data = Buffer.from(data);
        readOnly = false;
      }
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    if (this._firstFragment) {
      this._firstFragment = false;
      if (rsv1 && perMessageDeflate) {
        rsv1 = data.length >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        fin: options.fin,
        rsv1,
        opcode,
        mask: options.mask,
        readOnly
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, data, this._compress, opts, cb]);
      } else {
        this.dispatch(data, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(
        Sender.frame(data, {
          fin: options.fin,
          rsv1: false,
          opcode,
          mask: options.mask,
          readOnly
        }),
        cb
      );
    }
  }

  /**
   * Dispatches a data message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} compress Specifies whether or not to compress `data`
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @param {Function} cb Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[1].length;
      params[0].apply(this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(params) {
    this._bufferedBytes += params[1].length;
    this._queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} cb Callback
   * @private
   */
  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
    } else {
      this._socket.write(list[0], cb);
    }
  }
}

module.exports = Sender;

/**
 * Converts an `ArrayBuffer` view into a buffer.
 *
 * @param {(DataView|TypedArray)} view The view to convert
 * @return {Buffer} Converted view
 * @private
 */
function viewToBuffer(view) {
  const buf = Buffer.from(view.buffer);

  if (view.byteLength !== view.buffer.byteLength) {
    return buf.slice(view.byteOffset, view.byteOffset + view.byteLength);
  }

  return buf;
}


/***/ }),

/***/ "K8iy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./react/view/store/actions/actionTypes.js
var actionTypes = __webpack_require__("eVAK");

// CONCATENATED MODULE: ./react/view/store/actions/auth.js

const checkAuthInit = () => {
  return {
    type: actionTypes["y" /* CHECK_AUTH_INIT */]
  };
};
const checkAuth = status => {
  return {
    type: actionTypes["x" /* CHECK_AUTH */],
    status
  };
};
const checkUserImg = img => {
  return {
    type: actionTypes["z" /* CHECK_USERIMG */],
    img
  };
};
const checkUserName = name => {
  return {
    type: actionTypes["A" /* CHECK_USERNAME */],
    name
  };
};
// CONCATENATED MODULE: ./react/view/store/actions/header.js

const headerFormExpand = () => {
  return {
    type: actionTypes["Fb" /* HEADER_FORM_EXPAND */]
  };
};
const headerFormSm = () => {
  return {
    type: actionTypes["Gb" /* HEADER_FORM_SM */]
  };
};
const headerNavDefault = () => {
  return {
    type: actionTypes["Hb" /* HEADER_NAV_DEFAULT */]
  };
};
const headerAddNew = () => {
  return {
    type: actionTypes["zb" /* HEADER_ADD_NEW */]
  };
};
const fetchNotifyInit = () => {
  return {
    type: actionTypes["ab" /* FETCH_NOTIFY_INIT */]
  };
};
const fetchNotifyStart = () => {
  return {
    type: actionTypes["bb" /* FETCH_NOTIFY_START */]
  };
};
const fetchNotifySuccess = () => {
  return {
    type: actionTypes["cb" /* FETCH_NOTIFY_SUCCESS */]
  };
};
const fetchNotifyFail = err => {
  return {
    type: actionTypes["Z" /* FETCH_NOTIFY_FAIL */],
    err
  };
};
const fetchNotify = notify => {
  return {
    type: actionTypes["W" /* FETCH_NOTIFY */],
    notify
  };
};
const changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: actionTypes["q" /* CHANGE_FAVORITE_NOTIFY_INIT */],
    notify,
    notifyID
  };
};
const changeFavNotifyStart = notify => {
  return {
    type: actionTypes["r" /* CHANGE_FAVORITE_NOTIFY_START */],
    notify
  };
};
const changeFavNotifyFail = notify => {
  return {
    type: actionTypes["p" /* CHANGE_FAVORITE_NOTIFY_FAIL */],
    notify
  };
};
const changeFavNotify = notify => {
  return {
    type: actionTypes["o" /* CHANGE_FAVORITE_NOTIFY */],
    notify
  };
};
const showNavList = () => {
  return {
    type: actionTypes["Vb" /* SHOW_NAV_LIST */]
  };
};
const fetchNavlistInit = category => {
  return {
    type: actionTypes["U" /* FETCH_NAVLIST_INIT */],
    category
  };
};
const fetchNavlistStart = () => {
  return {
    type: actionTypes["V" /* FETCH_NAVLIST_START */]
  };
};
const fetchNavlist = (category, navList) => {
  return {
    type: actionTypes["T" /* FETCH_NAVLIST */],
    category,
    navList
  };
};
const showUserOption = () => {
  return {
    type: actionTypes["Xb" /* SHOW_USER_OPTION */]
  };
};
const fetchNotifyactiveInit = userID => {
  return {
    type: actionTypes["Y" /* FETCH_NOTIFY_ACTIVE_INIT */],
    userID
  };
};
const fetchNotifyActive = notifyActive => {
  return {
    type: actionTypes["X" /* FETCH_NOTIFY_ACTIVE */],
    notifyActive
  };
};
const defaultNotifyactiveInit = () => {
  return {
    type: actionTypes["C" /* DEFAULT_NOTIFYACTIVE_INIT */]
  };
};
const defaultNotifyActive = () => {
  return {
    type: actionTypes["B" /* DEFAULT_NOTIFYACTIVE */]
  };
};
const changeMainFavoriteStart = isLiked => {
  return {
    type: actionTypes["v" /* CHANGE_MAINFAVORITE_START */],
    isLiked
  };
};
const changeMainFavoriteReset = () => {
  return {
    type: actionTypes["u" /* CHANGE_MAINFAVORITE_RESET */]
  };
};
const headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: actionTypes["Db" /* HEADER_FILTER_INIT */],
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: actionTypes["Eb" /* HEADER_FILTER_START */],
    filterPos,
    filterLastPos
  };
};
const headerFilterFail = searchCntErr => {
  return {
    type: actionTypes["Cb" /* HEADER_FILTER_FAIL */],
    searchCntErr
  };
};
const headerFilter = searchCnt => {
  return {
    type: actionTypes["Ab" /* HEADER_FILTER */],
    searchCnt
  };
};
const headerFilterClose = () => {
  return {
    type: actionTypes["Bb" /* HEADER_FILTER_CLOSE */]
  };
};
// CONCATENATED MODULE: ./react/view/store/actions/model.js

const fetchCntInit = (categ, id) => {
  return {
    type: actionTypes["L" /* FETCH_CNT_INIT */],
    categ,
    id
  };
};
const fetchCntStart = () => {
  return {
    type: actionTypes["N" /* FETCH_CNT_START */]
  };
};
const fetchCntReset = () => {
  return {
    type: actionTypes["M" /* FETCH_CNT_RESET */]
  };
};
const fetchCntFail = err => {
  return {
    type: actionTypes["K" /* FETCH_CNT_FAIL */],
    err
  };
};
const fetchCnt = cnt => {
  return {
    type: actionTypes["J" /* FETCH_CNT */],
    cnt
  };
};
const submitCommentStart = () => {
  return {
    type: actionTypes["ac" /* SUBMIT_COMMENT_START */]
  };
};
const submitCommentFail = err => {
  return {
    type: actionTypes["Zb" /* SUBMIT_COMMENT_FAIL */],
    err
  };
};
const submitComment = (id, categ, cnt) => {
  return {
    type: actionTypes["Yb" /* SUBMIT_COMMENT */],
    id,
    categ,
    cnt
  };
};
const resetInput = () => {
  return {
    type: actionTypes["Mb" /* RESET_INPUT */]
  };
};
const resetModel = () => {
  return {
    type: actionTypes["Nb" /* RESET_MODEL */]
  };
};
const ansCorrectInit = (commentID, categ, replyID) => {
  return {
    type: actionTypes["c" /* ANS_CORRECT_INIT */],
    commentID,
    categ,
    replyID
  };
};
const ansCorrectFail = err => {
  return {
    type: actionTypes["b" /* ANS_CORRECT_FAIL */],
    err
  };
};
const ansCorrect = (commentID, categ, replyID) => {
  return {
    type: actionTypes["a" /* ANS_CORRECT */],
    commentID,
    categ,
    replyID
  };
};
const ansWrongInit = (commentID, categ, replyID) => {
  return {
    type: actionTypes["f" /* ANS_WRONG_INIT */],
    commentID,
    categ,
    replyID
  };
};
const ansWrongFail = err => {
  return {
    type: actionTypes["e" /* ANS_WRONG_FAIL */],
    err
  };
};
const ansWrong = (commentID, categ, replyID) => {
  return {
    type: actionTypes["d" /* ANS_WRONG */],
    commentID,
    categ,
    replyID
  };
};
const changeCntInit = (id, title, det, confirm, modelType) => {
  return {
    type: actionTypes["j" /* CHANGE_CNT_INIT */],
    id,
    title,
    det,
    confirm,
    modelType
  };
};
const changeCntStart = (title, id, det, modelType) => {
  return {
    type: actionTypes["l" /* CHANGE_CNT_START */],
    title,
    id,
    det,
    modelType
  };
};
const changeCntCancel = () => {
  return {
    type: actionTypes["h" /* CHANGE_CNT_CANCEL */]
  };
};
const changeCntReset = changed => {
  return {
    type: actionTypes["k" /* CHANGE_CNT_RESET */],
    changed
  };
};
const changeCntFail = err => {
  return {
    type: actionTypes["i" /* CHANGE_CNT_FAIL */],
    err
  };
};
const changeCnt = () => {
  return {
    type: actionTypes["g" /* CHANGE_CNT */]
  };
};
const fetchVideo = (id, url) => {
  return {
    type: actionTypes["tb" /* FETCH_VIDEO */],
    id,
    url
  };
};
const changeFavInit = (id, liked, favAdd, changedFav, userID, cntGrp) => {
  return {
    type: actionTypes["n" /* CHANGE_FAVORITE_INIT */],
    id,
    liked,
    favAdd,
    changedFav,
    userID,
    cntGrp
  };
};
const changeFavPtStart = (id, isLiked) => {
  return {
    type: actionTypes["t" /* CHANGE_FAVORITE_PT_START */],
    id,
    isLiked
  };
};
const changeFavPtFail = () => {
  return {
    type: actionTypes["s" /* CHANGE_FAVORITE_PT_FAIL */]
  };
};
const changeFav = changedFav => {
  return {
    type: actionTypes["m" /* CHANGE_FAVORITE */],
    changedFav
  };
};
const setCommentID = (commentID, categ) => {
  return {
    type: actionTypes["Ob" /* SET_COMMENTID */],
    commentID,
    categ
  };
};
// CONCATENATED MODULE: ./react/view/store/actions/share.js

const fetchUsersInit = () => {
  return {
    type: actionTypes["rb" /* FETCH_USERS_INIT */]
  };
};
const fetchUsersStart = () => {
  return {
    type: actionTypes["sb" /* FETCH_USERS_SUCCESS */]
  };
};
const fetchUsersFail = () => {
  return {
    type: actionTypes["qb" /* FETCH_USERS_FAIL */]
  };
};
const fetchUsers = users => {
  return {
    type: actionTypes["pb" /* FETCH_USERS */],
    users
  };
};
const share_userSelect = userSelect => {
  return {
    type: actionTypes["bc" /* USER_SELECT */],
    userSelect
  };
};
const viewUsers = () => {
  return {
    type: actionTypes["cc" /* VIEW_USERS */]
  };
};
const removeUser = users => {
  return {
    type: actionTypes["Jb" /* REMOVE_USER */],
    users
  };
};
const filterUserInit = (users, filterContent) => {
  return {
    type: actionTypes["wb" /* FILTER_USER_INIT */],
    users,
    filterContent
  };
};
const filterUser = users => {
  return {
    type: actionTypes["vb" /* FILTER_USER */],
    users
  };
};
const filterUserSelectInit = (filterContent, userSelect) => {
  return {
    type: actionTypes["yb" /* FILTER_USER_SELECT_INIT */],
    filterContent,
    userSelect
  };
};
const filterUserSelect = userSelect => {
  return {
    type: actionTypes["xb" /* FILTER_USER_SELECT */],
    userSelect
  };
};
const share_shareID = (shareID, cntType) => {
  return {
    type: actionTypes["Pb" /* SHARE_ID */],
    shareID,
    cntType
  };
};
const shareUserInit = (userSelect, shareID, cntType) => {
  return {
    type: actionTypes["Sb" /* SHARE_USER_INIT */],
    userSelect,
    shareID,
    cntType
  };
};
const shareUserStart = () => {
  return {
    type: actionTypes["Tb" /* SHARE_USER_START */]
  };
};
const shareUserfail = err => {
  return {
    type: actionTypes["Rb" /* SHARE_USER_FAIL */],
    err
  };
};
const shareUser = () => {
  return {
    type: actionTypes["Qb" /* SHARE_USER */]
  };
};
// CONCATENATED MODULE: ./react/view/store/actions/tags.js

const changeTagsPath = path => {
  return {
    type: actionTypes["w" /* CHANGE_TAGS_PATH */],
    path
  };
};
const fetchTagsInit = () => {
  return {
    type: actionTypes["hb" /* FETCH_TAGS_INIT */]
  };
};
const fetchTagsStart = () => {
  return {
    type: actionTypes["ib" /* FETCH_TAGS_START */]
  };
};
const fetchTagsSuccess = () => {
  return {
    type: actionTypes["jb" /* FETCH_TAGS_SUCCESS */]
  };
};
const fetchTagsFail = () => {
  return {
    type: actionTypes["gb" /* FETCH_TAGS_FAIL */]
  };
};
const fetchTags = tags => {
  return {
    type: actionTypes["fb" /* FETCH_TAGS */],
    tags
  };
};
// CONCATENATED MODULE: ./react/view/store/actions/trend.js

const fetchTrdInit = (cntGrp, id) => {
  return {
    type: actionTypes["mb" /* FETCH_TRD_INIT */],
    cntGrp,
    id
  };
};
const fetchTrdStart = () => {
  return {
    type: actionTypes["nb" /* FETCH_TRD_START */]
  };
};
const fetchTrdSuccess = () => {
  return {
    type: actionTypes["ob" /* FETCH_TRD_SUCCESS */]
  };
};
const fetchTrdFail = () => {
  return {
    type: actionTypes["lb" /* FETCH_TRD_FAIL */]
  };
};
const fetchTrd = trd => {
  return {
    type: actionTypes["kb" /* FETCH_TRD */],
    trd
  };
};
const showTrd = () => {
  return {
    type: actionTypes["Wb" /* SHOW_TRD */]
  };
};
const defaultTrd = () => {
  return {
    type: actionTypes["D" /* DEFAULT_TRD */]
  };
};
// CONCATENATED MODULE: ./react/view/store/actions/setQue.js

const fetchCategInit = () => {
  return {
    type: actionTypes["G" /* FETCH_CATEG_INIT */]
  };
};
const fetchCategStart = () => {
  return {
    type: actionTypes["H" /* FETCH_CATEG_START */]
  };
};
const fetchCategSuccess = () => {
  return {
    type: actionTypes["I" /* FETCH_CATEG_SUCCESS */]
  };
};
const fetchCategFail = () => {
  return {
    type: actionTypes["F" /* FETCH_CATEG_FAIL */]
  };
};
const fetchCateg = categ => {
  return {
    type: actionTypes["E" /* FETCH_CATEG */],
    categ
  };
};
// CONCATENATED MODULE: ./react/view/store/actions/conv.js

const fetchConvInit = () => {
  return {
    type: actionTypes["Q" /* FETCH_CONV_INIT */]
  };
};
const fetchConvStart = () => {
  return {
    type: actionTypes["R" /* FETCH_CONV_START */]
  };
};
const fetchConvSuccess = () => {
  return {
    type: actionTypes["S" /* FETCH_CONV_SUCCESS */]
  };
};
const fetchConvFail = () => {
  return {
    type: actionTypes["P" /* FETCH_CONV_FAIL */]
  };
};
const fetchConv = conv => {
  return {
    type: actionTypes["O" /* FETCH_CONV */],
    conv
  };
};
// CONCATENATED MODULE: ./react/view/store/actions/main.js

const fetchShareactiveInit = userID => {
  return {
    type: actionTypes["eb" /* FETCH_SHARE_ACTIVE_INIT */],
    userID
  };
};
const fetchShareActive = shareActive => {
  return {
    type: actionTypes["db" /* FETCH_SHARE_ACTIVE */],
    shareActive
  };
};
const resetActiveInit = (userID, curTab) => {
  return {
    type: actionTypes["Lb" /* RESET_ACTIVE_INIT */],
    userID,
    curTab
  };
};
const resetActive = curTab => {
  return {
    type: actionTypes["Kb" /* RESET_ACTIVE */],
    curTab
  };
};
const showMainBackdrop = () => {
  return {
    type: actionTypes["Ub" /* SHOW_MAIN_BACKDROP */]
  };
};
const hideMainBackdrop = () => {
  return {
    type: actionTypes["Ib" /* HIDE_MAIN_BACKDROP */]
  };
};
// EXTERNAL MODULE: ./react/view/node_modules/uuid/index.js
var uuid = __webpack_require__("hWXO");
var uuid_default = /*#__PURE__*/__webpack_require__.n(uuid);

// EXTERNAL MODULE: ./react/view/shared/utility.js
var utility = __webpack_require__("F5Z+");

// CONCATENATED MODULE: ./react/view/store/thunk/submit.js



const submitCommentInit = (id, cntGrp, cnt, modelType) => {
  return dispatch => {
    dispatch(submitCommentStart());

    if (modelType === 'reply') {
      utility["c" /* socket */].emit('createReplyComment', {
        id,
        cnt,
        cntGrp,
        commentID: uuid_default()()
      }, function (err) {
        dispatch(submitCommentFail(err));
      });
    } else {
      utility["c" /* socket */].emit('createComment', {
        id,
        cntGrp,
        cnt
      }, function (err) {
        dispatch(submitCommentFail(err));
      });
    }
  };
};
// CONCATENATED MODULE: ./react/view/store/actions/index.js
/* concated harmony reexport checkAuthInit */__webpack_require__.d(__webpack_exports__, "v", function() { return checkAuthInit; });
/* concated harmony reexport checkAuth */__webpack_require__.d(__webpack_exports__, "u", function() { return checkAuth; });
/* concated harmony reexport checkUserImg */__webpack_require__.d(__webpack_exports__, "w", function() { return checkUserImg; });
/* concated harmony reexport checkUserName */__webpack_require__.d(__webpack_exports__, "x", function() { return checkUserName; });
/* concated harmony reexport headerFormExpand */__webpack_require__.d(__webpack_exports__, "hb", function() { return headerFormExpand; });
/* concated harmony reexport headerFormSm */__webpack_require__.d(__webpack_exports__, "ib", function() { return headerFormSm; });
/* concated harmony reexport headerNavDefault */__webpack_require__.d(__webpack_exports__, "jb", function() { return headerNavDefault; });
/* concated harmony reexport headerAddNew */__webpack_require__.d(__webpack_exports__, "bb", function() { return headerAddNew; });
/* concated harmony reexport changeMainFavoriteStart */__webpack_require__.d(__webpack_exports__, "s", function() { return changeMainFavoriteStart; });
/* concated harmony reexport changeMainFavoriteReset */__webpack_require__.d(__webpack_exports__, "r", function() { return changeMainFavoriteReset; });
/* concated harmony reexport fetchNotifyInit */__webpack_require__.d(__webpack_exports__, "O", function() { return fetchNotifyInit; });
/* concated harmony reexport fetchNotifyStart */__webpack_require__.d(__webpack_exports__, "P", function() { return fetchNotifyStart; });
/* concated harmony reexport fetchNotifyFail */__webpack_require__.d(__webpack_exports__, "N", function() { return fetchNotifyFail; });
/* concated harmony reexport fetchNotify */__webpack_require__.d(__webpack_exports__, "L", function() { return fetchNotify; });
/* concated harmony reexport changeFavNotifyInit */__webpack_require__.d(__webpack_exports__, "n", function() { return changeFavNotifyInit; });
/* concated harmony reexport changeFavNotifyStart */__webpack_require__.d(__webpack_exports__, "o", function() { return changeFavNotifyStart; });
/* unused concated harmony import changeFavNotifyFail */
/* concated harmony reexport changeFavNotify */__webpack_require__.d(__webpack_exports__, "m", function() { return changeFavNotify; });
/* concated harmony reexport showNavList */__webpack_require__.d(__webpack_exports__, "sb", function() { return showNavList; });
/* concated harmony reexport fetchNavlistInit */__webpack_require__.d(__webpack_exports__, "J", function() { return fetchNavlistInit; });
/* concated harmony reexport fetchNavlistStart */__webpack_require__.d(__webpack_exports__, "K", function() { return fetchNavlistStart; });
/* concated harmony reexport fetchNavlist */__webpack_require__.d(__webpack_exports__, "I", function() { return fetchNavlist; });
/* concated harmony reexport showUserOption */__webpack_require__.d(__webpack_exports__, "ub", function() { return showUserOption; });
/* concated harmony reexport fetchNotifyactiveInit */__webpack_require__.d(__webpack_exports__, "Q", function() { return fetchNotifyactiveInit; });
/* concated harmony reexport fetchNotifyActive */__webpack_require__.d(__webpack_exports__, "M", function() { return fetchNotifyActive; });
/* concated harmony reexport defaultNotifyactiveInit */__webpack_require__.d(__webpack_exports__, "z", function() { return defaultNotifyactiveInit; });
/* concated harmony reexport defaultNotifyActive */__webpack_require__.d(__webpack_exports__, "y", function() { return defaultNotifyActive; });
/* concated harmony reexport headerFilterInit */__webpack_require__.d(__webpack_exports__, "fb", function() { return headerFilterInit; });
/* concated harmony reexport headerFilterStart */__webpack_require__.d(__webpack_exports__, "gb", function() { return headerFilterStart; });
/* concated harmony reexport headerFilterFail */__webpack_require__.d(__webpack_exports__, "eb", function() { return headerFilterFail; });
/* concated harmony reexport headerFilter */__webpack_require__.d(__webpack_exports__, "cb", function() { return headerFilter; });
/* concated harmony reexport headerFilterClose */__webpack_require__.d(__webpack_exports__, "db", function() { return headerFilterClose; });
/* concated harmony reexport fetchCntInit */__webpack_require__.d(__webpack_exports__, "E", function() { return fetchCntInit; });
/* concated harmony reexport fetchCntFail */__webpack_require__.d(__webpack_exports__, "D", function() { return fetchCntFail; });
/* unused concated harmony import fetchCntStart */
/* concated harmony reexport fetchCntReset */__webpack_require__.d(__webpack_exports__, "F", function() { return fetchCntReset; });
/* concated harmony reexport fetchCnt */__webpack_require__.d(__webpack_exports__, "C", function() { return fetchCnt; });
/* concated harmony reexport submitCommentFail */__webpack_require__.d(__webpack_exports__, "wb", function() { return submitCommentFail; });
/* concated harmony reexport submitCommentStart */__webpack_require__.d(__webpack_exports__, "yb", function() { return submitCommentStart; });
/* concated harmony reexport submitComment */__webpack_require__.d(__webpack_exports__, "vb", function() { return submitComment; });
/* concated harmony reexport resetInput */__webpack_require__.d(__webpack_exports__, "lb", function() { return resetInput; });
/* concated harmony reexport resetModel */__webpack_require__.d(__webpack_exports__, "mb", function() { return resetModel; });
/* concated harmony reexport ansCorrectInit */__webpack_require__.d(__webpack_exports__, "b", function() { return ansCorrectInit; });
/* unused concated harmony import ansCorrectFail */
/* concated harmony reexport ansCorrect */__webpack_require__.d(__webpack_exports__, "a", function() { return ansCorrect; });
/* concated harmony reexport ansWrongInit */__webpack_require__.d(__webpack_exports__, "d", function() { return ansWrongInit; });
/* unused concated harmony import ansWrongFail */
/* concated harmony reexport ansWrong */__webpack_require__.d(__webpack_exports__, "c", function() { return ansWrong; });
/* concated harmony reexport changeCntInit */__webpack_require__.d(__webpack_exports__, "h", function() { return changeCntInit; });
/* concated harmony reexport changeCntStart */__webpack_require__.d(__webpack_exports__, "j", function() { return changeCntStart; });
/* concated harmony reexport changeCntFail */__webpack_require__.d(__webpack_exports__, "g", function() { return changeCntFail; });
/* concated harmony reexport changeCntCancel */__webpack_require__.d(__webpack_exports__, "f", function() { return changeCntCancel; });
/* concated harmony reexport changeCntReset */__webpack_require__.d(__webpack_exports__, "i", function() { return changeCntReset; });
/* concated harmony reexport changeCnt */__webpack_require__.d(__webpack_exports__, "e", function() { return changeCnt; });
/* concated harmony reexport fetchVideo */__webpack_require__.d(__webpack_exports__, "Y", function() { return fetchVideo; });
/* concated harmony reexport changeFavInit */__webpack_require__.d(__webpack_exports__, "l", function() { return changeFavInit; });
/* concated harmony reexport changeFavPtStart */__webpack_require__.d(__webpack_exports__, "q", function() { return changeFavPtStart; });
/* concated harmony reexport changeFavPtFail */__webpack_require__.d(__webpack_exports__, "p", function() { return changeFavPtFail; });
/* concated harmony reexport changeFav */__webpack_require__.d(__webpack_exports__, "k", function() { return changeFav; });
/* concated harmony reexport setCommentID */__webpack_require__.d(__webpack_exports__, "nb", function() { return setCommentID; });
/* unused concated harmony import fetchUsersInit */
/* concated harmony reexport fetchUsersFail */__webpack_require__.d(__webpack_exports__, "X", function() { return fetchUsersFail; });
/* concated harmony reexport fetchUsers */__webpack_require__.d(__webpack_exports__, "W", function() { return fetchUsers; });
/* unused concated harmony import userSelect */
/* unused concated harmony import viewUsers */
/* unused concated harmony import removeUser */
/* unused concated harmony import filterUserInit */
/* unused concated harmony import filterUserSelectInit */
/* concated harmony reexport filterUser */__webpack_require__.d(__webpack_exports__, "Z", function() { return filterUser; });
/* concated harmony reexport filterUserSelect */__webpack_require__.d(__webpack_exports__, "ab", function() { return filterUserSelect; });
/* concated harmony reexport shareID */__webpack_require__.d(__webpack_exports__, "ob", function() { return share_shareID; });
/* unused concated harmony import shareUserInit */
/* concated harmony reexport shareUserStart */__webpack_require__.d(__webpack_exports__, "qb", function() { return shareUserStart; });
/* concated harmony reexport shareUserfail */__webpack_require__.d(__webpack_exports__, "rb", function() { return shareUserfail; });
/* concated harmony reexport shareUser */__webpack_require__.d(__webpack_exports__, "pb", function() { return shareUser; });
/* concated harmony reexport changeTagsPath */__webpack_require__.d(__webpack_exports__, "t", function() { return changeTagsPath; });
/* unused concated harmony import fetchTagsInit */
/* unused concated harmony import fetchTagsStart */
/* unused concated harmony import fetchTagsFail */
/* concated harmony reexport fetchTags */__webpack_require__.d(__webpack_exports__, "T", function() { return fetchTags; });
/* unused concated harmony import fetchTagsSuccess */
/* concated harmony reexport fetchTrdInit */__webpack_require__.d(__webpack_exports__, "V", function() { return fetchTrdInit; });
/* concated harmony reexport fetchTrd */__webpack_require__.d(__webpack_exports__, "U", function() { return fetchTrd; });
/* concated harmony reexport showTrd */__webpack_require__.d(__webpack_exports__, "tb", function() { return showTrd; });
/* concated harmony reexport defaultTrd */__webpack_require__.d(__webpack_exports__, "A", function() { return defaultTrd; });
/* unused concated harmony import fetchCategInit */
/* concated harmony reexport fetchCateg */__webpack_require__.d(__webpack_exports__, "B", function() { return fetchCateg; });
/* concated harmony reexport fetchConvInit */__webpack_require__.d(__webpack_exports__, "H", function() { return fetchConvInit; });
/* concated harmony reexport fetchConv */__webpack_require__.d(__webpack_exports__, "G", function() { return fetchConv; });
/* concated harmony reexport fetchShareactiveInit */__webpack_require__.d(__webpack_exports__, "S", function() { return fetchShareactiveInit; });
/* concated harmony reexport fetchShareActive */__webpack_require__.d(__webpack_exports__, "R", function() { return fetchShareActive; });
/* unused concated harmony import resetActiveInit */
/* concated harmony reexport resetActive */__webpack_require__.d(__webpack_exports__, "kb", function() { return resetActive; });
/* unused concated harmony import showMainBackdrop */
/* unused concated harmony import hideMainBackdrop */
/* concated harmony reexport submitCommentInit */__webpack_require__.d(__webpack_exports__, "xb", function() { return submitCommentInit; });











/***/ }),

/***/ "KEll":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "KTtj":
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "LMAZ":
/***/ (function(module, exports) {



/***/ }),

/***/ "LMGn":
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__("vQuC");

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "MEIi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0fJA");
/* harmony import */ var _global_global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_global_global__WEBPACK_IMPORTED_MODULE_1__);


const instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: _global_global__WEBPACK_IMPORTED_MODULE_1___default.a.url
});
instance.defaults.headers.common['authorization'] = 'authorization';
/* harmony default export */ __webpack_exports__["a"] = (instance);

/***/ }),

/***/ "N2q1":
/***/ (function(module, exports, __webpack_require__) {

/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = __webpack_require__("lGS7");
var isBuf = __webpack_require__("hZIX");
var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' || (typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]');
var withNativeFile = typeof File === 'function' || (typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]');

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
    }
    return newData;
  }
  return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};


/***/ }),

/***/ "No/t":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ "Nr7C":
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "OKa5":
/***/ (function(module, exports) {

module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}


/***/ }),

/***/ "P5CO":
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__("kRLM");
var bytesToUuid = __webpack_require__("Nr7C");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "PDZw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return updateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkValidity; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const updateObject = (oldObject, updatedProperties) => {
  return _objectSpread({}, oldObject, {}, updatedProperties);
};
const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};

/***/ }),

/***/ "PJMN":
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "PKT5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore
const tokenChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];

/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */
function push(dest, name, elem) {
  if (Object.prototype.hasOwnProperty.call(dest, name)) dest[name].push(elem);
  else dest[name] = [elem];
}

/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */
function parse(header) {
  const offers = {};

  if (header === undefined || header === '') return offers;

  var params = {};
  var mustUnescape = false;
  var isEscaping = false;
  var inQuotes = false;
  var extensionName;
  var paramName;
  var start = -1;
  var end = -1;

  for (var i = 0; i < header.length; i++) {
    const code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 /* ' ' */ || code === 0x09 /* '\t' */) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        const name = header.slice(start, end);
        if (code === 0x2c) {
          push(offers, name, params);
          params = {};
        } else {
          extensionName = name;
        }

        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = {};
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1) start = i;
        else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        var value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = {};
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }

  if (start === -1 || inQuotes) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  const token = header.slice(start, end);
  if (extensionName === undefined) {
    push(offers, token, {});
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }

  return offers;
}

/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */
function format(extensions) {
  return Object.keys(extensions)
    .map((extension) => {
      var configurations = extensions[extension];
      if (!Array.isArray(configurations)) configurations = [configurations];
      return configurations
        .map((params) => {
          return [extension]
            .concat(
              Object.keys(params).map((k) => {
                var values = params[k];
                if (!Array.isArray(values)) values = [values];
                return values
                  .map((v) => (v === true ? k : `${k}=${v}`))
                  .join('; ');
              })
            )
            .join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

module.exports = { format, parse };


/***/ }),

/***/ "QdrD":
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "QduZ":
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "Qs2e":
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),

/***/ "QwQc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  EMPTY_BUFFER: Buffer.alloc(0),
  NOOP: () => {}
};


/***/ }),

/***/ "RmXt":
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "S6K+":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || false === true || process.__nwjs) {
	module.exports = __webpack_require__("3pWb");
} else {
	module.exports = __webpack_require__("btsh");
}


/***/ }),

/***/ "TeaE":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var parser = __webpack_require__("6KXk");
var Emitter = __webpack_require__("tFq7");

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;
  this.withCredentials = opts.withCredentials;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // results of ReactNative environment detection
  this.isReactNative = opts.isReactNative;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};


/***/ }),

/***/ "TfYW":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "UNVE":
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "VAPu":
/***/ (function(module, exports) {



/***/ }),

/***/ "W72j":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const EventEmitter = __webpack_require__("/0p4");
const crypto = __webpack_require__("PJMN");
const http = __webpack_require__("KEll");

const PerMessageDeflate = __webpack_require__("0ulh");
const extension = __webpack_require__("PKT5");
const constants = __webpack_require__("QwQc");
const WebSocket = __webpack_require__("iLvO");

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {String} options.host The hostname where to bind the server
   * @param {Number} options.port The port where to bind the server
   * @param {http.Server} options.server A pre-created HTTP/S server to use
   * @param {Function} options.verifyClient An hook to reject connections
   * @param {Function} options.handleProtocols An hook to handle protocols
   * @param {String} options.path Accept only connections matching this path
   * @param {Boolean} options.noServer Enable no server mode
   * @param {Boolean} options.clientTracking Specifies whether or not to track clients
   * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
   * @param {Number} options.maxPayload The maximum allowed message size
   * @param {Function} callback A listener for the `listening` event
   */
  constructor(options, callback) {
    super();

    options = Object.assign(
      {
        maxPayload: 100 * 1024 * 1024,
        perMessageDeflate: false,
        handleProtocols: null,
        clientTracking: true,
        verifyClient: null,
        noServer: false,
        backlog: null, // use default (511 as implemented in net.js)
        server: null,
        host: null,
        path: null,
        port: null
      },
      options
    );

    if (options.port == null && !options.server && !options.noServer) {
      throw new TypeError(
        'One of the "port", "server", or "noServer" options must be specified'
      );
    }

    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.listen(
        options.port,
        options.host,
        options.backlog,
        callback
      );
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, (ws) => {
            this.emit('connection', ws, req);
          });
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) this.clients = new Set();
    this.options = options;
  }

  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }

    if (!this._server) return null;
    return this._server.address();
  }

  /**
   * Close the server.
   *
   * @param {Function} cb Callback
   * @public
   */
  close(cb) {
    if (cb) this.once('close', cb);

    //
    // Terminate all associated clients.
    //
    if (this.clients) {
      for (const client of this.clients) client.terminate();
    }

    const server = this._server;

    if (server) {
      this._removeListeners();
      this._removeListeners = this._server = null;

      //
      // Close the http server if it was internally created.
      //
      if (this.options.port != null) {
        server.close(() => this.emit('close'));
        return;
      }
    }

    process.nextTick(emitClose, this);
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      if (pathname !== this.options.path) return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);

    const version = +req.headers['sec-websocket-version'];
    const extensions = {};

    if (
      req.method !== 'GET' ||
      req.headers.upgrade.toLowerCase() !== 'websocket' ||
      !req.headers['sec-websocket-key'] ||
      (version !== 8 && version !== 13) ||
      !this.shouldHandle(req)
    ) {
      return abortHandshake(socket, 400);
    }

    if (this.options.perMessageDeflate) {
      const perMessageDeflate = new PerMessageDeflate(
        this.options.perMessageDeflate,
        true,
        this.options.maxPayload
      );

      try {
        const offers = extension.parse(req.headers['sec-websocket-extensions']);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        return abortHandshake(socket, 400);
      }
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      const info = {
        origin:
          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.connection.authorized || req.connection.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(extensions, req, socket, head, cb);
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(extensions, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {Object} extensions The accepted extensions
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @private
   */
  completeUpgrade(extensions, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    const key = crypto
      .createHash('sha1')
      .update(req.headers['sec-websocket-key'] + constants.GUID, 'binary')
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${key}`
    ];

    const ws = new WebSocket(null);
    var protocol = req.headers['sec-websocket-protocol'];

    if (protocol) {
      protocol = protocol.trim().split(/ *, */);

      //
      // Optionally call external protocol selection handler.
      //
      if (this.options.handleProtocols) {
        protocol = this.options.handleProtocols(protocol, req);
      } else {
        protocol = protocol[0];
      }

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws.protocol = protocol;
      }
    }

    if (extensions[PerMessageDeflate.extensionName]) {
      const params = extensions[PerMessageDeflate.extensionName].params;
      const value = extension.format({
        [PerMessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);

    ws.setSocket(socket, head, this.options.maxPayload);

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => this.clients.delete(ws));
    }

    cb(ws);
  }
}

module.exports = WebSocketServer;

/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when called
 * @private
 */
function addListeners(server, map) {
  for (const event of Object.keys(map)) server.on(event, map[event]);

  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}

/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */
function emitClose(server) {
  server.emit('close');
}

/**
 * Handle premature socket errors.
 *
 * @private
 */
function socketOnError() {
  this.destroy();
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {net.Socket} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */
function abortHandshake(socket, code, message, headers) {
  if (socket.writable) {
    message = message || http.STATUS_CODES[code];
    headers = Object.assign(
      {
        Connection: 'close',
        'Content-type': 'text/html',
        'Content-Length': Buffer.byteLength(message)
      },
      headers
    );

    socket.write(
      `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
        Object.keys(headers)
          .map((h) => `${h}: ${headers[h]}`)
          .join('\r\n') +
        '\r\n\r\n' +
        message
    );
  }

  socket.removeListener('error', socketOnError);
  socket.destroy();
}


/***/ }),

/***/ "YaDP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SUBMIT_FORM_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SUBMIT_FORM_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SUBMIT_FORM_FAIL; });
/* unused harmony export SUBMIT_FORM */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FORM_SUBMITTED; });
const SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const SUBMIT_FORM = 'SUBMIT_FORM';
const FORM_SUBMITTED = 'FORM_SUBMITTED';

/***/ }),

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "aX6P":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parser = __webpack_require__("y8Xw");
var Emitter = __webpack_require__("tFq7");
var toArray = __webpack_require__("6K3k");
var on = __webpack_require__("0Xh6");
var bind = __webpack_require__("JoOU");
var debug = __webpack_require__("S6K+")('socket.io-client:socket');
var parseqs = __webpack_require__("IbF0");
var hasBin = __webpack_require__("hJV7");

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket (io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  this.flags = {};
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = {
    type: (this.flags.binary !== undefined ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
    data: args
  };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  this.flags = {};

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({type: parser.CONNECT, query: query});
    } else {
      this.packet({type: parser.CONNECT});
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  var sameNamespace = packet.nsp === this.nsp;
  var rootNamespaceError = packet.type === parser.ERROR && packet.nsp === '/';

  if (!sameNamespace && !rootNamespaceError) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: hasBin(args) ? parser.BINARY_ACK : parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags.compress = compress;
  return this;
};

/**
 * Sets the binary flag
 *
 * @param {Boolean} whether the emitted data contains binary
 * @return {Socket} self
 * @api public
 */

Socket.prototype.binary = function (binary) {
  this.flags.binary = binary;
  return this;
};


/***/ }),

/***/ "btsh":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

const tty = __webpack_require__("UNVE");
const util = __webpack_require__("jK02");

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__("/EaH");

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__("LMGn")(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ "bzos":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "ctTn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const WebSocket = __webpack_require__("iLvO");

WebSocket.Server = __webpack_require__("W72j");
WebSocket.Receiver = __webpack_require__("IgL6");
WebSocket.Sender = __webpack_require__("Jtlf");

module.exports = WebSocket;


/***/ }),

/***/ "d8vz":
/***/ (function(module, exports) {


module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};

/***/ }),

/***/ "dVXH":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
 *
 * This can be used with JS designed for browsers to improve reuse of code and
 * allow the use of existing libraries.
 *
 * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
 *
 * @author Dan DeFelippi <dan@driverdan.com>
 * @contributor David Ellis <d.f.ellis@ieee.org>
 * @license MIT
 */

var fs = __webpack_require__("mw/K");
var Url = __webpack_require__("bzos");
var spawn = __webpack_require__("QduZ").spawn;

/**
 * Module exports.
 */

module.exports = XMLHttpRequest;

// backwards-compat
XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;

/**
 * `XMLHttpRequest` constructor.
 *
 * Supported options for the `opts` object are:
 *
 *  - `agent`: An http.Agent instance; http.globalAgent may be used; if 'undefined', agent usage is disabled
 *
 * @param {Object} opts optional "options" object
 */

function XMLHttpRequest(opts) {
  "use strict";

  opts = opts || {};

  /**
   * Private variables
   */
  var self = this;
  var http = __webpack_require__("KEll");
  var https = __webpack_require__("7WL4");

  // Holds http.js objects
  var request;
  var response;

  // Request settings
  var settings = {};

  // Disable header blacklist.
  // Not part of XHR specs.
  var disableHeaderCheck = false;

  // Set some default headers
  var defaultHeaders = {
    "User-Agent": "node-XMLHttpRequest",
    "Accept": "*/*"
  };

  var headers = Object.assign({}, defaultHeaders);

  // These headers are not user setable.
  // The following are allowed but banned in the spec:
  // * user-agent
  var forbiddenRequestHeaders = [
    "accept-charset",
    "accept-encoding",
    "access-control-request-headers",
    "access-control-request-method",
    "connection",
    "content-length",
    "content-transfer-encoding",
    "cookie",
    "cookie2",
    "date",
    "expect",
    "host",
    "keep-alive",
    "origin",
    "referer",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    "via"
  ];

  // These request methods are not allowed
  var forbiddenRequestMethods = [
    "TRACE",
    "TRACK",
    "CONNECT"
  ];

  // Send flag
  var sendFlag = false;
  // Error flag, used when errors occur or abort is called
  var errorFlag = false;

  // Event listeners
  var listeners = {};

  /**
   * Constants
   */

  this.UNSENT = 0;
  this.OPENED = 1;
  this.HEADERS_RECEIVED = 2;
  this.LOADING = 3;
  this.DONE = 4;

  /**
   * Public vars
   */

  // Current state
  this.readyState = this.UNSENT;

  // default ready state change handler in case one is not set or is set late
  this.onreadystatechange = null;

  // Result & response
  this.responseText = "";
  this.responseXML = "";
  this.status = null;
  this.statusText = null;

  /**
   * Private methods
   */

  /**
   * Check if the specified header is allowed.
   *
   * @param string header Header to validate
   * @return boolean False if not allowed, otherwise true
   */
  var isAllowedHttpHeader = function(header) {
    return disableHeaderCheck || (header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1);
  };

  /**
   * Check if the specified method is allowed.
   *
   * @param string method Request method to validate
   * @return boolean False if not allowed, otherwise true
   */
  var isAllowedHttpMethod = function(method) {
    return (method && forbiddenRequestMethods.indexOf(method) === -1);
  };

  /**
   * Public methods
   */

  /**
   * Open the connection. Currently supports local server requests.
   *
   * @param string method Connection method (eg GET, POST)
   * @param string url URL for the connection.
   * @param boolean async Asynchronous connection. Default is true.
   * @param string user Username for basic authentication (optional)
   * @param string password Password for basic authentication (optional)
   */
  this.open = function(method, url, async, user, password) {
    this.abort();
    errorFlag = false;

    // Check for valid request method
    if (!isAllowedHttpMethod(method)) {
      throw "SecurityError: Request method not allowed";
    }

    settings = {
      "method": method,
      "url": url.toString(),
      "async": (typeof async !== "boolean" ? true : async),
      "user": user || null,
      "password": password || null
    };

    setState(this.OPENED);
  };

  /**
   * Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
   * This does not conform to the W3C spec.
   *
   * @param boolean state Enable or disable header checking.
   */
  this.setDisableHeaderCheck = function(state) {
    disableHeaderCheck = state;
  };

  /**
   * Sets a header for the request.
   *
   * @param string header Header name
   * @param string value Header value
   * @return boolean Header added
   */
  this.setRequestHeader = function(header, value) {
    if (this.readyState != this.OPENED) {
      throw "INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN";
      return false;
    }
    if (!isAllowedHttpHeader(header)) {
      console.warn('Refused to set unsafe header "' + header + '"');
      return false;
    }
    if (sendFlag) {
      throw "INVALID_STATE_ERR: send flag is true";
      return false;
    }
    headers[header] = value;
    return true;
  };

  /**
   * Gets a header from the server response.
   *
   * @param string header Name of header to get.
   * @return string Text of the header or null if it doesn't exist.
   */
  this.getResponseHeader = function(header) {
    if (typeof header === "string"
      && this.readyState > this.OPENED
      && response.headers[header.toLowerCase()]
      && !errorFlag
    ) {
      return response.headers[header.toLowerCase()];
    }

    return null;
  };

  /**
   * Gets all the response headers.
   *
   * @return string A string with all response headers separated by CR+LF
   */
  this.getAllResponseHeaders = function() {
    if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
      return "";
    }
    var result = "";

    for (var i in response.headers) {
      // Cookie headers are excluded
      if (i !== "set-cookie" && i !== "set-cookie2") {
        result += i + ": " + response.headers[i] + "\r\n";
      }
    }
    return result.substr(0, result.length - 2);
  };

  /**
   * Gets a request header
   *
   * @param string name Name of header to get
   * @return string Returns the request header or empty string if not set
   */
  this.getRequestHeader = function(name) {
    // @TODO Make this case insensitive
    if (typeof name === "string" && headers[name]) {
      return headers[name];
    }

    return "";
  };

  /**
   * Sends the request to the server.
   *
   * @param string data Optional data to send as request body.
   */
  this.send = function(data) {
    if (this.readyState != this.OPENED) {
      throw "INVALID_STATE_ERR: connection must be opened before send() is called";
    }

    if (sendFlag) {
      throw "INVALID_STATE_ERR: send has already been called";
    }

    var ssl = false, local = false;
    var url = Url.parse(settings.url);
    var host;
    // Determine the server
    switch (url.protocol) {
      case 'https:':
        ssl = true;
        // SSL & non-SSL both need host, no break here.
      case 'http:':
        host = url.hostname;
        break;

      case 'file:':
        local = true;
        break;

      case undefined:
      case '':
        host = "localhost";
        break;

      default:
        throw "Protocol not supported.";
    }

    // Load files off the local filesystem (file://)
    if (local) {
      if (settings.method !== "GET") {
        throw "XMLHttpRequest: Only GET method is supported";
      }

      if (settings.async) {
        fs.readFile(url.pathname, 'utf8', function(error, data) {
          if (error) {
            self.handleError(error);
          } else {
            self.status = 200;
            self.responseText = data;
            setState(self.DONE);
          }
        });
      } else {
        try {
          this.responseText = fs.readFileSync(url.pathname, 'utf8');
          this.status = 200;
          setState(self.DONE);
        } catch(e) {
          this.handleError(e);
        }
      }

      return;
    }

    // Default to port 80. If accessing localhost on another port be sure
    // to use http://localhost:port/path
    var port = url.port || (ssl ? 443 : 80);
    // Add query string if one is used
    var uri = url.pathname + (url.search ? url.search : '');

    // Set the Host header or the server may reject the request
    headers["Host"] = host;
    if (!((ssl && port === 443) || port === 80)) {
      headers["Host"] += ':' + url.port;
    }

    // Set Basic Auth if necessary
    if (settings.user) {
      if (typeof settings.password == "undefined") {
        settings.password = "";
      }
      var authBuf = new Buffer(settings.user + ":" + settings.password);
      headers["Authorization"] = "Basic " + authBuf.toString("base64");
    }

    // Set content length header
    if (settings.method === "GET" || settings.method === "HEAD") {
      data = null;
    } else if (data) {
      headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);

      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "text/plain;charset=UTF-8";
      }
    } else if (settings.method === "POST") {
      // For a post with no data set Content-Length: 0.
      // This is required by buggy servers that don't meet the specs.
      headers["Content-Length"] = 0;
    }

    var agent = opts.agent || false;
    var options = {
      host: host,
      port: port,
      path: uri,
      method: settings.method,
      headers: headers,
      agent: agent
    };

    if (ssl) {
      options.pfx = opts.pfx;
      options.key = opts.key;
      options.passphrase = opts.passphrase;
      options.cert = opts.cert;
      options.ca = opts.ca;
      options.ciphers = opts.ciphers;
      options.rejectUnauthorized = opts.rejectUnauthorized;
    }

    // Reset error flag
    errorFlag = false;

    // Handle async requests
    if (settings.async) {
      // Use the proper protocol
      var doRequest = ssl ? https.request : http.request;

      // Request is being sent, set send flag
      sendFlag = true;

      // As per spec, this is called here for historical reasons.
      self.dispatchEvent("readystatechange");

      // Handler for the response
      var responseHandler = function(resp) {
        // Set response var to the response we got back
        // This is so it remains accessable outside this scope
        response = resp;
        // Check for redirect
        // @TODO Prevent looped redirects
        if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
          // Change URL to the redirect location
          settings.url = response.headers.location;
          var url = Url.parse(settings.url);
          // Set host var in case it's used later
          host = url.hostname;
          // Options for the new request
          var newOptions = {
            hostname: url.hostname,
            port: url.port,
            path: url.path,
            method: response.statusCode === 303 ? 'GET' : settings.method,
            headers: headers
          };

          if (ssl) {
            newOptions.pfx = opts.pfx;
            newOptions.key = opts.key;
            newOptions.passphrase = opts.passphrase;
            newOptions.cert = opts.cert;
            newOptions.ca = opts.ca;
            newOptions.ciphers = opts.ciphers;
            newOptions.rejectUnauthorized = opts.rejectUnauthorized;
          }

          // Issue the new request
          request = doRequest(newOptions, responseHandler).on('error', errorHandler);
          request.end();
          // @TODO Check if an XHR event needs to be fired here
          return;
        }

        if (response && response.setEncoding) {
          response.setEncoding("utf8");
        }

        setState(self.HEADERS_RECEIVED);
        self.status = response.statusCode;

        response.on('data', function(chunk) {
          // Make sure there's some data
          if (chunk) {
            self.responseText += chunk;
          }
          // Don't emit state changes if the connection has been aborted.
          if (sendFlag) {
            setState(self.LOADING);
          }
        });

        response.on('end', function() {
          if (sendFlag) {
            // The sendFlag needs to be set before setState is called.  Otherwise if we are chaining callbacks
            // there can be a timing issue (the callback is called and a new call is made before the flag is reset).
            sendFlag = false;
            // Discard the 'end' event if the connection has been aborted
            setState(self.DONE);
          }
        });

        response.on('error', function(error) {
          self.handleError(error);
        });
      }

      // Error handler for the request
      var errorHandler = function(error) {
        self.handleError(error);
      }

      // Create the request
      request = doRequest(options, responseHandler).on('error', errorHandler);

      // Node 0.4 and later won't accept empty data. Make sure it's needed.
      if (data) {
        request.write(data);
      }

      request.end();

      self.dispatchEvent("loadstart");
    } else { // Synchronous
      // Create a temporary file for communication with the other Node process
      var contentFile = ".node-xmlhttprequest-content-" + process.pid;
      var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
      fs.writeFileSync(syncFile, "", "utf8");
      // The async request the other Node process executes
      var execString = "var http = require('http'), https = require('https'), fs = require('fs');"
        + "var doRequest = http" + (ssl ? "s" : "") + ".request;"
        + "var options = " + JSON.stringify(options) + ";"
        + "var responseText = '';"
        + "var req = doRequest(options, function(response) {"
        + "response.setEncoding('utf8');"
        + "response.on('data', function(chunk) {"
        + "  responseText += chunk;"
        + "});"
        + "response.on('end', function() {"
        + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-STATUS:' + response.statusCode + ',' + responseText, 'utf8');"
        + "fs.unlinkSync('" + syncFile + "');"
        + "});"
        + "response.on('error', function(error) {"
        + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');"
        + "fs.unlinkSync('" + syncFile + "');"
        + "});"
        + "}).on('error', function(error) {"
        + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');"
        + "fs.unlinkSync('" + syncFile + "');"
        + "});"
        + (data ? "req.write('" + data.replace(/'/g, "\\'") + "');":"")
        + "req.end();";
      // Start the other Node Process, executing this string
      var syncProc = spawn(process.argv[0], ["-e", execString]);
      var statusText;
      while(fs.existsSync(syncFile)) {
        // Wait while the sync file is empty
      }
      self.responseText = fs.readFileSync(contentFile, 'utf8');
      // Kill the child process once the file has data
      syncProc.stdin.end();
      // Remove the temporary file
      fs.unlinkSync(contentFile);
      if (self.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)) {
        // If the file returned an error, handle it
        var errorObj = self.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/, "");
        self.handleError(errorObj);
      } else {
        // If the file returned okay, parse its data and move to the DONE state
        self.status = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/, "$1");
        self.responseText = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/, "$1");
        setState(self.DONE);
      }
    }
  };

  /**
   * Called when an error is encountered to deal with it.
   */
  this.handleError = function(error) {
    this.status = 503;
    this.statusText = error;
    this.responseText = error.stack;
    errorFlag = true;
    setState(this.DONE);
  };

  /**
   * Aborts a request.
   */
  this.abort = function() {
    if (request) {
      request.abort();
      request = null;
    }

    headers = Object.assign({}, defaultHeaders);
    this.responseText = "";
    this.responseXML = "";

    errorFlag = true;

    if (this.readyState !== this.UNSENT
        && (this.readyState !== this.OPENED || sendFlag)
        && this.readyState !== this.DONE) {
      sendFlag = false;
      setState(this.DONE);
    }
    this.readyState = this.UNSENT;
  };

  /**
   * Adds an event listener. Preferred method of binding to events.
   */
  this.addEventListener = function(event, callback) {
    if (!(event in listeners)) {
      listeners[event] = [];
    }
    // Currently allows duplicate callbacks. Should it?
    listeners[event].push(callback);
  };

  /**
   * Remove an event callback that has already been bound.
   * Only works on the matching funciton, cannot be a copy.
   */
  this.removeEventListener = function(event, callback) {
    if (event in listeners) {
      // Filter will return a new array with the callback removed
      listeners[event] = listeners[event].filter(function(ev) {
        return ev !== callback;
      });
    }
  };

  /**
   * Dispatch any events, including both "on" methods and events attached using addEventListener.
   */
  this.dispatchEvent = function(event) {
    if (typeof self["on" + event] === "function") {
      self["on" + event]();
    }
    if (event in listeners) {
      for (var i = 0, len = listeners[event].length; i < len; i++) {
        listeners[event][i].call(self);
      }
    }
  };

  /**
   * Changes readyState and calls onreadystatechange.
   *
   * @param int state New state
   */
  var setState = function(state) {
    if (self.readyState !== state) {
      self.readyState = state;

      if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
        self.dispatchEvent("readystatechange");
      }

      if (self.readyState === self.DONE && !errorFlag) {
        self.dispatchEvent("load");
        // @TODO figure out InspectorInstrumentation::didLoadXHR(cookie)
        self.dispatchEvent("loadend");
      }
    }
  };
};


/***/ }),

/***/ "eURV":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__("TeaE");
var parser = __webpack_require__("6KXk");
var parseqs = __webpack_require__("IbF0");
var inherit = __webpack_require__("d8vz");
var yeast = __webpack_require__("m1TI");
var debug = __webpack_require__("jxZM")('engine.io-client:websocket');

var BrowserWebSocket, NodeWebSocket;

if (typeof WebSocket !== 'undefined') {
  BrowserWebSocket = WebSocket;
} else if (typeof self !== 'undefined') {
  BrowserWebSocket = self.WebSocket || self.MozWebSocket;
}

if (typeof window === 'undefined') {
  try {
    NodeWebSocket = __webpack_require__("ctTn");
  } catch (e) { }
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocketImpl = BrowserWebSocket || NodeWebSocket;

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  this.protocols = opts.protocols;
  if (!this.usingBrowserWebSocket) {
    WebSocketImpl = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = this.protocols;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws =
      this.usingBrowserWebSocket && !this.isReactNative
        ? protocols
          ? new WebSocketImpl(uri, protocols)
          : new WebSocketImpl(uri)
        : new WebSocketImpl(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done () {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
    ('ws' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocketImpl && !('__initialize' in WebSocketImpl && this.name === WS.prototype.name);
};


/***/ }),

/***/ "eVAK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return CHECK_AUTH_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return CHECK_AUTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return CHECK_USERIMG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return CHECK_USERNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fb", function() { return HEADER_FORM_EXPAND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gb", function() { return HEADER_FORM_SM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hb", function() { return HEADER_NAV_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Db", function() { return HEADER_FILTER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Eb", function() { return HEADER_FILTER_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cb", function() { return HEADER_FILTER_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ab", function() { return HEADER_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bb", function() { return HEADER_FILTER_CLOSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zb", function() { return HEADER_ADD_NEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return FETCH_CNT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return FETCH_CNT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return FETCH_CNT_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return FETCH_CNT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return FETCH_CNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return CHANGE_CNT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CHANGE_CNT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return CHANGE_CNT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CHANGE_CNT_CANCEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return CHANGE_CNT_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CHANGE_CNT; });
/* unused harmony export SUBMIT_COMMENT_INIT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ac", function() { return SUBMIT_COMMENT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Zb", function() { return SUBMIT_COMMENT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Yb", function() { return SUBMIT_COMMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mb", function() { return RESET_INPUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nb", function() { return RESET_MODEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ANS_CORRECT_INIT; });
/* unused harmony export ANS_CORRECT_START */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ANS_CORRECT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ANS_CORRECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ANS_WRONG_INIT; });
/* unused harmony export ANS_WRONG_START */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ANS_WRONG_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ANS_WRONG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ub", function() { return FILTER_POST; });
/* unused harmony export FETCH_CNTCATEG_INIT */
/* unused harmony export FETCH_CNTCATEG_START */
/* unused harmony export FETCH_CNTCATEG */
/* unused harmony export FETCH_VIDEO_INIT */
/* unused harmony export FETCH_VIDEO_START */
/* unused harmony export FETCH_VIDEO_FAIL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tb", function() { return FETCH_VIDEO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return CHANGE_FAVORITE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return CHANGE_FAVORITE_PT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return CHANGE_FAVORITE_PT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return CHANGE_FAVORITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rb", function() { return FETCH_USERS_INIT; });
/* unused harmony export FETCH_USERS_START */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sb", function() { return FETCH_USERS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "qb", function() { return FETCH_USERS_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pb", function() { return FETCH_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bc", function() { return USER_SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cc", function() { return VIEW_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Jb", function() { return REMOVE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wb", function() { return FILTER_USER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vb", function() { return FILTER_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yb", function() { return FILTER_USER_SELECT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xb", function() { return FILTER_USER_SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pb", function() { return SHARE_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sb", function() { return SHARE_USER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tb", function() { return SHARE_USER_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rb", function() { return SHARE_USER_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Qb", function() { return SHARE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return CHANGE_TAGS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hb", function() { return FETCH_TAGS_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ib", function() { return FETCH_TAGS_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jb", function() { return FETCH_TAGS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gb", function() { return FETCH_TAGS_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fb", function() { return FETCH_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mb", function() { return FETCH_TRD_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nb", function() { return FETCH_TRD_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ob", function() { return FETCH_TRD_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lb", function() { return FETCH_TRD_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kb", function() { return FETCH_TRD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wb", function() { return SHOW_TRD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return DEFAULT_TRD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return FETCH_CATEG_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return FETCH_CATEG_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return FETCH_CATEG_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return FETCH_CATEG_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return FETCH_CATEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return FETCH_CONV_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return FETCH_CONV_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return FETCH_CONV_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return FETCH_CONV_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return FETCH_CONV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ab", function() { return FETCH_NOTIFY_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bb", function() { return FETCH_NOTIFY_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cb", function() { return FETCH_NOTIFY_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return FETCH_NOTIFY_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return FETCH_NOTIFY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return CHANGE_MAINFAVORITE_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return CHANGE_MAINFAVORITE_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return CHANGE_FAVORITE_NOTIFY_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return CHANGE_FAVORITE_NOTIFY_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return CHANGE_FAVORITE_NOTIFY_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return CHANGE_FAVORITE_NOTIFY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vb", function() { return SHOW_NAV_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return FETCH_NAVLIST_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return FETCH_NAVLIST_START; });
/* unused harmony export FETCH_NAVLIST_SUCCESS */
/* unused harmony export FETCH_NAVLIST_FAIL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return FETCH_NAVLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xb", function() { return SHOW_USER_OPTION; });
/* unused harmony export FETCH_CNT_ACTIVE_INIT */
/* unused harmony export FETCH_CNT_ACTIVE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eb", function() { return FETCH_SHARE_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "db", function() { return FETCH_SHARE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lb", function() { return RESET_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Kb", function() { return RESET_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ub", function() { return SHOW_MAIN_BACKDROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ib", function() { return HIDE_MAIN_BACKDROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return FETCH_NOTIFY_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return FETCH_NOTIFY_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return DEFAULT_NOTIFYACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return DEFAULT_NOTIFYACTIVE; });
/* unused harmony export FILTER_CONTENT_INIT */
/* unused harmony export FILTER_CONTENT_START */
/* unused harmony export FILTER_CONTENT_FAIL */
/* unused harmony export FILTER_CONTENT */
/* unused harmony export RESET_FILTER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ob", function() { return SET_COMMENTID; });
const CHECK_AUTH_INIT = 'CHECK_AUTH_INIT';
const CHECK_AUTH = 'CHECK_AUTH';
const CHECK_USERIMG = 'CHECK_USERIMG';
const CHECK_USERNAME = 'CHECK_USERNAME';
const HEADER_FORM_EXPAND = 'HEADER_FORM_EXPAND';
const HEADER_FORM_SM = 'HEADER_FORM_SM';
const HEADER_NAV_DEFAULT = 'HEADER_NAV_DEFAULT';
const HEADER_FILTER_INIT = 'HEADER_FILTER_INIT';
const HEADER_FILTER_START = 'HEADER_FILTER_START';
const HEADER_FILTER_FAIL = 'HEADER_FILTER_FAIL';
const HEADER_FILTER = 'HEADER_FILTER';
const HEADER_FILTER_CLOSE = 'HEADER_FILTER_CLOSE';
const HEADER_ADD_NEW = 'HEADER_ADD_NEW';
const FETCH_CNT_INIT = 'FETCH_CNT_INIT';
const FETCH_CNT_START = 'FETCH_CNT_START';
const FETCH_CNT_RESET = 'FETCH_CNT_RESET';
const FETCH_CNT_FAIL = 'FETCH_CNT_FAIL';
const FETCH_CNT = 'FETCH_CNT';
const CHANGE_CNT_INIT = 'CHANGE_CNT_INIT';
const CHANGE_CNT_FAIL = 'CHANGE_CNT_FAIL';
const CHANGE_CNT_START = 'CHANGE_CNT_START';
const CHANGE_CNT_CANCEL = 'CHANGE_CNT_CANCEL';
const CHANGE_CNT_RESET = 'CHANGE_CNT_RESET';
const CHANGE_CNT = 'CHANGE_CNT';
const SUBMIT_COMMENT_INIT = 'SUBMIT_COMMENT_INIT';
const SUBMIT_COMMENT_START = 'SUBMIT_COMMENT_START';
const SUBMIT_COMMENT_FAIL = 'SUBMIT_COMMENT_FAIL';
const SUBMIT_COMMENT = 'SUBMIT_COMMENT';
const RESET_INPUT = 'RESET_INPUT';
const RESET_MODEL = 'RESET_MODEL';
const ANS_CORRECT_INIT = 'ANS_CORRECT_INIT';
const ANS_CORRECT_START = 'ANS_CORRECT_START';
const ANS_CORRECT_FAIL = 'ANS_CORRECT_FAIL';
const ANS_CORRECT = 'ANS_CORRECT';
const ANS_WRONG_INIT = 'ANS_WRONG_INIT';
const ANS_WRONG_START = 'ANS_WRONG_START';
const ANS_WRONG_FAIL = 'ANS_WRONG_FAIL';
const ANS_WRONG = 'ANS_WRONG';
const FILTER_POST = 'FILTER_POST';
const FETCH_CNTCATEG_INIT = 'FETCH_CNTCATEG_INIT';
const FETCH_CNTCATEG_START = 'FETCH_CNTCATEG_START';
const FETCH_CNTCATEG = 'FETCH_CNTCATEG';
const FETCH_VIDEO_INIT = 'FETCH_VIDEO_INIT';
const FETCH_VIDEO_START = 'FETCH_VIDEO_START';
const FETCH_VIDEO_FAIL = 'FETCH_VIDEO_FAIL';
const FETCH_VIDEO = 'FETCH_VIDEO';
const CHANGE_FAVORITE_INIT = 'CHANGE_FAVORITE_INIT';
const CHANGE_FAVORITE_PT_START = 'CHANGE_FAVORITE_PT_START';
const CHANGE_FAVORITE_PT_FAIL = 'CHANGE_FAVORITE_PT_FAIL';
const CHANGE_FAVORITE = 'CHANGE_FAVORITE';
const FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const FETCH_USERS_START = 'FETCH_USERS_START';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const FETCH_USERS = 'FETCH_USERS';
const USER_SELECT = 'USER_SELECT';
const VIEW_USERS = 'VIEW_USERS';
const REMOVE_USER = 'REMOVE_USER';
const FILTER_USER_INIT = 'FILTER_USER_INIT';
const FILTER_USER = 'FILTER_USER';
const FILTER_USER_SELECT_INIT = 'FILTER_USER_SELECT_INIT';
const FILTER_USER_SELECT = 'FILTER_USER_SELECT';
const SHARE_ID = 'SHARE_ID';
const SHARE_USER_INIT = 'SHARE_USER_INIT';
const SHARE_USER_START = 'SHARE_USER_START';
const SHARE_USER_FAIL = 'SHARE_USER_FAIL';
const SHARE_USER = 'SHARE_USER';
const CHANGE_TAGS_PATH = 'CHANGE_TAGS_PATH';
const FETCH_TAGS_INIT = 'FETCH_TAGS_INIT';
const FETCH_TAGS_START = 'FETCH_TAGS_START';
const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
const FETCH_TAGS_FAIL = 'FETCH_TAGS_FAIL';
const FETCH_TAGS = 'FETCH_TAGS';
const FETCH_TRD_INIT = 'FETCH_TRD_INIT';
const FETCH_TRD_START = 'FETCH_TRD_START';
const FETCH_TRD_SUCCESS = 'FETCH_TRD_SUCCESS';
const FETCH_TRD_FAIL = 'FETCH_TRD_FAIL';
const FETCH_TRD = 'FETCH_TRD';
const SHOW_TRD = 'SHOW_TRD';
const DEFAULT_TRD = 'DEFAULT_TRD';
const FETCH_CATEG_INIT = 'FETCH_CATEG_INIT';
const FETCH_CATEG_START = 'FETCH_CATEG_START';
const FETCH_CATEG_SUCCESS = 'FETCH_CATEG_SUCCESS';
const FETCH_CATEG_FAIL = 'FETCH_CATEG_FAIL';
const FETCH_CATEG = 'FETCH_CATEG';
const FETCH_CONV_INIT = 'FETCH_CONV_INIT';
const FETCH_CONV_START = 'FETCH_CONV_START';
const FETCH_CONV_SUCCESS = 'FETCH_CONV_SUCCESS';
const FETCH_CONV_FAIL = 'FETCH_CONV_FAIL';
const FETCH_CONV = 'FETCH_CONV';
const FETCH_NOTIFY_INIT = 'FETCH_NOTIFY_INIT';
const FETCH_NOTIFY_START = 'FETCH_NOTIFY_START';
const FETCH_NOTIFY_SUCCESS = 'FETCH_NOTIFY_SUCCESS';
const FETCH_NOTIFY_FAIL = 'FETCH_NOTIFY_FAIL';
const FETCH_NOTIFY = 'FETCH_NOTIFY';
const CHANGE_MAINFAVORITE_START = 'CHANGE_MAINFAVORITE_START';
const CHANGE_MAINFAVORITE_RESET = 'CHANGE_MAINFAVORITE_RESET';
const CHANGE_FAVORITE_NOTIFY_INIT = 'CHANGE_FAVORITE_NOTIFY_INIT';
const CHANGE_FAVORITE_NOTIFY_START = 'CHANGE_FAVORITE_NOTIFY_START';
const CHANGE_FAVORITE_NOTIFY_FAIL = 'CHANGE_FAVORITE_NOTIFY_FAIL';
const CHANGE_FAVORITE_NOTIFY = 'CHANGE_FAVORITE_NOTIFY';
const SHOW_NAV_LIST = 'SHOW_NAV_LIST';
const FETCH_NAVLIST_INIT = 'FETCH_NAVLIST_INIT';
const FETCH_NAVLIST_START = 'FETCH_NAVLIST_START';
const FETCH_NAVLIST_SUCCESS = 'FETCH_NAVLIST_SUCCESS';
const FETCH_NAVLIST_FAIL = 'FETCH_NAVLIST_FAIL';
const FETCH_NAVLIST = 'FETCH_NAVLIST';
const SHOW_USER_OPTION = 'SHOW_USER_OPTION';
const FETCH_CNT_ACTIVE_INIT = 'FETCH_CNT_ACTIVE_INIT';
const FETCH_CNT_ACTIVE = 'FETCH_CNT_ACTIVE';
const FETCH_SHARE_ACTIVE_INIT = 'FETCH_SHARE_ACTIVE_INIT';
const FETCH_SHARE_ACTIVE = 'FETCH_SHARE_ACTIVE';
const RESET_ACTIVE_INIT = 'RESET_ACTIVE_INIT';
const RESET_ACTIVE = 'RESET_ACTIVE';
const SHOW_MAIN_BACKDROP = 'SHOW_MAIN_BACKDROP';
const HIDE_MAIN_BACKDROP = 'HIDE_MAIN_BACKDROP';
const FETCH_NOTIFY_ACTIVE_INIT = 'FETCH_NOTIFY_ACTIVE_INIT';
const FETCH_NOTIFY_ACTIVE = 'FETCH_NOTIFY_ACTIVE';
const DEFAULT_NOTIFYACTIVE_INIT = 'DEFAULT_NOTIFYACTIVE_INIT';
const DEFAULT_NOTIFYACTIVE = 'DEFAULT_NOTIFYACTIVE';
const FILTER_CONTENT_INIT = 'FILTER_CONTENT_INIT';
const FILTER_CONTENT_START = 'FILTER_CONTENT_START';
const FILTER_CONTENT_FAIL = 'FILTER_CONTENT_FAIL';
const FILTER_CONTENT = 'FILTER_CONTENT';
const RESET_FILTER = 'RESET_FILTER';
const SET_COMMENTID = 'SET_COMMENTID';

/***/ }),

/***/ "edkJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SUBMIT_FORM_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SUBMIT_FORM_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SUBMIT_FORM_FAIL; });
/* unused harmony export SUBMIT_FORM */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FORM_SUBMITTED; });
const SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const SUBMIT_FORM = 'SUBMIT_FORM';
const FORM_SUBMITTED = 'FORM_SUBMITTED';

/***/ }),

/***/ "er14":
/***/ (function(module, exports) {


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};


/***/ }),

/***/ "fL2z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
function concat(list, totalLength) {
  const target = Buffer.allocUnsafe(totalLength);
  var offset = 0;

  for (var i = 0; i < list.length; i++) {
    const buf = list[i];
    buf.copy(target, offset);
    offset += buf.length;
  }

  return target;
}

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
function _mask(source, mask, output, offset, length) {
  for (var i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
function _unmask(buffer, mask) {
  // Required until https://github.com/nodejs/node/issues/9006 is resolved.
  const length = buffer.length;
  for (var i = 0; i < length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}

try {
  const bufferUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'bufferutil'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  const bu = bufferUtil.BufferUtil || bufferUtil;

  module.exports = {
    mask(source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);
      else bu.mask(source, mask, output, offset, length);
    },
    unmask(buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);
      else bu.unmask(buffer, mask);
    },
    concat
  };
} catch (e) /* istanbul ignore next */ {
  module.exports = { concat, mask: _mask, unmask: _unmask };
}


/***/ }),

/***/ "frh2":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var url = __webpack_require__("8sp5");
var parser = __webpack_require__("y8Xw");
var Manager = __webpack_require__("8D6M");
var debug = __webpack_require__("S6K+")('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup (uri, opts) {
  if (typeof uri === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = __webpack_require__("8D6M");
exports.Socket = __webpack_require__("aX6P");


/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "hJV7":
/***/ (function(module, exports, __webpack_require__) {

/* global Blob File */

/*
 * Module requirements.
 */

var isArray = __webpack_require__("TfYW");

var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' ||
                        typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]';
var withNativeFile = typeof File === 'function' ||
                        typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary (obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj)) ||
    (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
    (withNativeBlob && obj instanceof Blob) ||
    (withNativeFile && obj instanceof File)
  ) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}


/***/ }),

/***/ "hWXO":
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__("P5CO");
var v4 = __webpack_require__("CBQ+");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "hZIX":
/***/ (function(module, exports) {


module.exports = isBuf;

var withNativeBuffer = typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function';
var withNativeArrayBuffer = typeof ArrayBuffer === 'function';

var isView = function (obj) {
  return typeof ArrayBuffer.isView === 'function' ? ArrayBuffer.isView(obj) : (obj.buffer instanceof ArrayBuffer);
};

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (withNativeBuffer && Buffer.isBuffer(obj)) ||
          (withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)));
}


/***/ }),

/***/ "iLvO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const EventEmitter = __webpack_require__("/0p4");
const crypto = __webpack_require__("PJMN");
const https = __webpack_require__("7WL4");
const http = __webpack_require__("KEll");
const net = __webpack_require__("Qs2e");
const tls = __webpack_require__("ugmf");
const url = __webpack_require__("bzos");

const PerMessageDeflate = __webpack_require__("0ulh");
const EventTarget = __webpack_require__("wQ0x");
const extension = __webpack_require__("PKT5");
const constants = __webpack_require__("QwQc");
const Receiver = __webpack_require__("IgL6");
const Sender = __webpack_require__("Jtlf");

const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const kWebSocket = constants.kWebSocket;
const protocolVersions = [8, 13];
const closeTimeout = 30 * 1000; // Allow 30 seconds to terminate the connection cleanly.

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|url.Url|url.URL)} address The URL to which to connect
   * @param {(String|String[])} protocols The subprotocols
   * @param {Object} options Connection options
   */
  constructor(address, protocols, options) {
    super();

    this.readyState = WebSocket.CONNECTING;
    this.protocol = '';

    this._binaryType = constants.BINARY_TYPES[0];
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = '';
    this._closeTimer = null;
    this._closeCode = 1006;
    this._extensions = {};
    this._isServer = true;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      if (Array.isArray(protocols)) {
        protocols = protocols.join(', ');
      } else if (typeof protocols === 'object' && protocols !== null) {
        options = protocols;
        protocols = undefined;
      }

      initAsClient.call(this, address, protocols, options);
    }
  }

  get CONNECTING() {
    return WebSocket.CONNECTING;
  }
  get CLOSING() {
    return WebSocket.CLOSING;
  }
  get CLOSED() {
    return WebSocket.CLOSED;
  }
  get OPEN() {
    return WebSocket.OPEN;
  }

  /**
   * This deviates from the WHATWG interface since ws doesn't support the required
   * default "blob" type (instead we define a custom "nodebuffer" type).
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!constants.BINARY_TYPES.includes(type)) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver._binaryType = type;
  }

  /**
   * @type {Number}
   */
  get bufferedAmount() {
    if (!this._socket) return 0;

    //
    // `socket.bufferSize` is `undefined` if the socket is closed.
    //
    return (this._socket.bufferSize || 0) + this._sender._bufferedBytes;
  }

  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Number} maxPayload The maximum allowed message size
   * @private
   */
  setSocket(socket, head, maxPayload) {
    const receiver = new Receiver(
      this._binaryType,
      this._extensions,
      maxPayload
    );

    this._sender = new Sender(socket, this._extensions);
    this._receiver = receiver;
    this._socket = socket;

    receiver[kWebSocket] = this;
    socket[kWebSocket] = this;

    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);

    socket.setTimeout(0);
    socket.setNoDelay();

    if (head.length > 0) socket.unshift(head);

    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError);

    this.readyState = WebSocket.OPEN;
    this.emit('open');
  }

  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    this.readyState = WebSocket.CLOSED;

    if (!this._socket) {
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate.extensionName]) {
      this._extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();
    this.emit('close', this._closeCode, this._closeMessage);
  }

  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} code Status code explaining why the connection is closing
   * @param {String} data A string explaining why the connection is closing
   * @public
   */
  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (this._closeFrameSent && this._closeFrameReceived) this._socket.end();
      return;
    }

    this.readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      this._closeFrameSent = true;

      if (this._socket.writable) {
        if (this._closeFrameReceived) this._socket.end();

        //
        // Ensure that the connection is closed even if the closing handshake
        // fails.
        //
        this._closeTimer = setTimeout(
          this._socket.destroy.bind(this._socket),
          closeTimeout
        );
      }
    });
  }

  /**
   * Send a ping.
   *
   * @param {*} data The data to send
   * @param {Boolean} mask Indicates whether or not to mask `data`
   * @param {Function} cb Callback which is executed when the ping is sent
   * @public
   */
  ping(data, mask, cb) {
    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (this.readyState !== WebSocket.OPEN) {
      const err = new Error(
        `WebSocket is not open: readyState ${this.readyState} ` +
          `(${readyStates[this.readyState]})`
      );

      if (cb) return cb(err);
      throw err;
    }

    if (typeof data === 'number') data = data.toString();
    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || constants.EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a pong.
   *
   * @param {*} data The data to send
   * @param {Boolean} mask Indicates whether or not to mask `data`
   * @param {Function} cb Callback which is executed when the pong is sent
   * @public
   */
  pong(data, mask, cb) {
    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (this.readyState !== WebSocket.OPEN) {
      const err = new Error(
        `WebSocket is not open: readyState ${this.readyState} ` +
          `(${readyStates[this.readyState]})`
      );

      if (cb) return cb(err);
      throw err;
    }

    if (typeof data === 'number') data = data.toString();
    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || constants.EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} options.compress Specifies whether or not to compress `data`
   * @param {Boolean} options.binary Specifies whether `data` is binary or text
   * @param {Boolean} options.fin Specifies whether the fragment is the last one
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback which is executed when data is written out
   * @public
   */
  send(data, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (this.readyState !== WebSocket.OPEN) {
      const err = new Error(
        `WebSocket is not open: readyState ${this.readyState} ` +
          `(${readyStates[this.readyState]})`
      );

      if (cb) return cb(err);
      throw err;
    }

    if (typeof data === 'number') data = data.toString();

    const opts = Object.assign(
      {
        binary: typeof data !== 'string',
        mask: !this._isServer,
        compress: true,
        fin: true
      },
      options
    );

    if (!this._extensions[PerMessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || constants.EMPTY_BUFFER, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this._socket) {
      this.readyState = WebSocket.CLOSING;
      this._socket.destroy();
    }
  }
}

readyStates.forEach((readyState, i) => {
  WebSocket[readyState] = i;
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    /**
     * Return the listener of the event.
     *
     * @return {(Function|undefined)} The event listener or `undefined`
     * @public
     */
    get() {
      const listeners = this.listeners(method);
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i]._listener) return listeners[i]._listener;
      }

      return undefined;
    },
    /**
     * Add a listener for the event.
     *
     * @param {Function} listener The listener to add
     * @public
     */
    set(listener) {
      const listeners = this.listeners(method);
      for (var i = 0; i < listeners.length; i++) {
        //
        // Remove only the listeners added via `addEventListener`.
        //
        if (listeners[i]._listener) this.removeListener(method, listeners[i]);
      }
      this.addEventListener(method, listener);
    }
  });
});

WebSocket.prototype.addEventListener = EventTarget.addEventListener;
WebSocket.prototype.removeEventListener = EventTarget.removeEventListener;

module.exports = WebSocket;

/**
 * Initialize a WebSocket client.
 *
 * @param {(String|url.Url|url.URL)} address The URL to which to connect
 * @param {String} protocols The subprotocols
 * @param {Object} options Connection options
 * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
 * @param {Number} options.handshakeTimeout Timeout in milliseconds for the handshake request
 * @param {Number} options.protocolVersion Value of the `Sec-WebSocket-Version` header
 * @param {String} options.origin Value of the `Origin` or `Sec-WebSocket-Origin` header
 * @param {Number} options.maxPayload The maximum allowed message size
 * @private
 */
function initAsClient(address, protocols, options) {
  options = Object.assign(
    {
      protocolVersion: protocolVersions[1],
      perMessageDeflate: true,
      maxPayload: 100 * 1024 * 1024
    },
    options,
    {
      createConnection: undefined,
      socketPath: undefined,
      hostname: undefined,
      protocol: undefined,
      timeout: undefined,
      method: undefined,
      auth: undefined,
      host: undefined,
      path: undefined,
      port: undefined
    }
  );

  if (!protocolVersions.includes(options.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${options.protocolVersion} ` +
        `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  this._isServer = false;

  var parsedUrl;

  if (typeof address === 'object' && address.href !== undefined) {
    parsedUrl = address;
    this.url = address.href;
  } else {
    //
    // The WHATWG URL constructor is not available on Node.js < 6.13.0
    //
    parsedUrl = url.URL ? new url.URL(address) : url.parse(address);
    this.url = address;
  }

  const isUnixSocket = parsedUrl.protocol === 'ws+unix:';

  if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
    throw new Error(`Invalid URL: ${this.url}`);
  }

  const isSecure =
    parsedUrl.protocol === 'wss:' || parsedUrl.protocol === 'https:';
  const defaultPort = isSecure ? 443 : 80;
  const key = crypto.randomBytes(16).toString('base64');
  const httpObj = isSecure ? https : http;
  const path = parsedUrl.search
    ? `${parsedUrl.pathname || '/'}${parsedUrl.search}`
    : parsedUrl.pathname || '/';
  var perMessageDeflate;

  options.createConnection = isSecure ? tlsConnect : netConnect;
  options.defaultPort = options.defaultPort || defaultPort;
  options.port = parsedUrl.port || defaultPort;
  options.host = parsedUrl.hostname.startsWith('[')
    ? parsedUrl.hostname.slice(1, -1)
    : parsedUrl.hostname;
  options.headers = Object.assign(
    {
      'Sec-WebSocket-Version': options.protocolVersion,
      'Sec-WebSocket-Key': key,
      Connection: 'Upgrade',
      Upgrade: 'websocket'
    },
    options.headers
  );
  options.path = path;
  options.timeout = options.handshakeTimeout;

  if (options.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(
      options.perMessageDeflate !== true ? options.perMessageDeflate : {},
      false,
      options.maxPayload
    );
    options.headers['Sec-WebSocket-Extensions'] = extension.format({
      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols) {
    options.headers['Sec-WebSocket-Protocol'] = protocols;
  }
  if (options.origin) {
    if (options.protocolVersion < 13) {
      options.headers['Sec-WebSocket-Origin'] = options.origin;
    } else {
      options.headers.Origin = options.origin;
    }
  }
  if (parsedUrl.auth) {
    options.auth = parsedUrl.auth;
  } else if (parsedUrl.username || parsedUrl.password) {
    options.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isUnixSocket) {
    const parts = path.split(':');

    options.socketPath = parts[0];
    options.path = parts[1];
  }

  var req = (this._req = httpObj.get(options));

  if (options.handshakeTimeout) {
    req.on('timeout', () => {
      abortHandshake(this, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', (err) => {
    if (this._req.aborted) return;

    req = this._req = null;
    this.readyState = WebSocket.CLOSING;
    this.emit('error', err);
    this.emitClose();
  });

  req.on('response', (res) => {
    if (this.emit('unexpected-response', req, res)) return;

    abortHandshake(this, req, `Unexpected server response: ${res.statusCode}`);
  });

  req.on('upgrade', (res, socket, head) => {
    this.emit('upgrade', res);

    //
    // The user may have closed the connection from a listener of the `upgrade`
    // event.
    //
    if (this.readyState !== WebSocket.CONNECTING) return;

    req = this._req = null;

    const digest = crypto
      .createHash('sha1')
      .update(key + constants.GUID, 'binary')
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake(this, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    const protList = (protocols || '').split(/, */);
    var protError;

    if (!protocols && serverProt) {
      protError = 'Server sent a subprotocol but none was requested';
    } else if (protocols && !serverProt) {
      protError = 'Server sent no subprotocol';
    } else if (serverProt && !protList.includes(serverProt)) {
      protError = 'Server sent an invalid subprotocol';
    }

    if (protError) {
      abortHandshake(this, socket, protError);
      return;
    }

    if (serverProt) this.protocol = serverProt;

    if (perMessageDeflate) {
      try {
        const extensions = extension.parse(
          res.headers['sec-websocket-extensions']
        );

        if (extensions[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          this._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        abortHandshake(this, socket, 'Invalid Sec-WebSocket-Extensions header');
        return;
      }
    }

    this.setSocket(socket, head, options.maxPayload);
  });
}

/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */
function netConnect(options) {
  //
  // Override `options.path` only if `options` is a copy of the original options
  // object. This is always true on Node.js >= 8 but not on Node.js 6 where
  // `options.socketPath` might be `undefined` even if the `socketPath` option
  // was originally set.
  //
  if (options.protocolVersion) options.path = options.socketPath;
  return net.connect(options);
}

/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */
function tlsConnect(options) {
  options.path = undefined;
  options.servername = options.servername || options.host;
  return tls.connect(options);
}

/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket)} stream The request to abort or the
 *     socket to destroy
 * @param {String} message The error message
 * @private
 */
function abortHandshake(websocket, stream, message) {
  websocket.readyState = WebSocket.CLOSING;

  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake);

  if (stream.setHeader) {
    stream.abort();
    stream.once('abort', websocket.emitClose.bind(websocket));
    websocket.emit('error', err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}

/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {String} reason The reason for closing
 * @private
 */
function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket];

  websocket._socket.removeListener('data', socketOnData);
  websocket._socket.resume();

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;

  if (code === 1005) websocket.close();
  else websocket.close(code, reason);
}

/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */
function receiverOnDrain() {
  this[kWebSocket]._socket.resume();
}

/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */
function receiverOnError(err) {
  const websocket = this[kWebSocket];

  websocket._socket.removeListener('data', socketOnData);

  websocket.readyState = WebSocket.CLOSING;
  websocket._closeCode = err[constants.kStatusCode];
  websocket.emit('error', err);
  websocket._socket.destroy();
}

/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */
function receiverOnFinish() {
  this[kWebSocket].emitClose();
}

/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The message
 * @private
 */
function receiverOnMessage(data) {
  this[kWebSocket].emit('message', data);
}

/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */
function receiverOnPing(data) {
  const websocket = this[kWebSocket];

  websocket.pong(data, !websocket._isServer, constants.NOOP);
  websocket.emit('ping', data);
}

/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */
function receiverOnPong(data) {
  this[kWebSocket].emit('pong', data);
}

/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */
function socketOnClose() {
  const websocket = this[kWebSocket];

  this.removeListener('close', socketOnClose);
  this.removeListener('end', socketOnEnd);

  websocket.readyState = WebSocket.CLOSING;

  //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk and emitted synchronously in a single
  // `'data'` event.
  //
  websocket._socket.read();
  websocket._receiver.end();

  this.removeListener('data', socketOnData);
  this[kWebSocket] = undefined;

  clearTimeout(websocket._closeTimer);

  if (
    websocket._receiver._writableState.finished ||
    websocket._receiver._writableState.errorEmitted
  ) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);
    websocket._receiver.on('finish', receiverOnFinish);
  }
}

/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function socketOnData(chunk) {
  if (!this[kWebSocket]._receiver.write(chunk)) {
    this.pause();
  }
}

/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */
function socketOnEnd() {
  const websocket = this[kWebSocket];

  websocket.readyState = WebSocket.CLOSING;
  websocket._receiver.end();
  this.end();
}

/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */
function socketOnError() {
  const websocket = this[kWebSocket];

  this.removeListener('error', socketOnError);
  this.on('error', constants.NOOP);

  if (websocket) {
    websocket.readyState = WebSocket.CLOSING;
    this.destroy();
  }
}


/***/ }),

/***/ "jK02":
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "jle/":
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "jxZM":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || false === true || process.__nwjs) {
	module.exports = __webpack_require__("x1MC");
} else {
	module.exports = __webpack_require__("rn9l");
}


/***/ }),

/***/ "kRLM":
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var crypto = __webpack_require__("PJMN");

module.exports = function nodeRNG() {
  return crypto.randomBytes(16);
};


/***/ }),

/***/ "lGS7":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "lgmX":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__("UNVE");
var util = __webpack_require__("jK02");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("J8VP");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [ 6, 2, 3, 4, 5, 1 ];

try {
  var supportsColor = __webpack_require__("/EaH");
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 214, 215, 220, 221
    ];
  }
} catch (err) {
  // swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),

/***/ "m1TI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),

/***/ "mjtn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return updateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkValidity; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const updateObject = (oldObject, updatedProperties) => {
  return _objectSpread({}, oldObject, {}, updatedProperties);
};
const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};

/***/ }),

/***/ "mrZd":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__("GM5T");
} else {
  module.exports = __webpack_require__("lgmX");
}


/***/ }),

/***/ "msIP":
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "mw/K":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "pEZS":
/***/ (function(module, exports) {

module.exports = require("next-redux-saga");

/***/ }),

/***/ "pJ3R":
/***/ (function(module, exports) {

/*! https://mths.be/utf8js v2.1.2 by @mathias */

var stringFromCharCode = String.fromCharCode;

// Taken from https://mths.be/punycode
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	var value;
	var extra;
	while (counter < length) {
		value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// high surrogate, and there is a next character
			extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) { // low surrogate
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// unmatched surrogate; only append this code unit, in case the next
				// code unit is the high surrogate of a surrogate pair
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

// Taken from https://mths.be/punycode
function ucs2encode(array) {
	var length = array.length;
	var index = -1;
	var value;
	var output = '';
	while (++index < length) {
		value = array[index];
		if (value > 0xFFFF) {
			value -= 0x10000;
			output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
			value = 0xDC00 | value & 0x3FF;
		}
		output += stringFromCharCode(value);
	}
	return output;
}

function checkScalarValue(codePoint, strict) {
	if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
		if (strict) {
			throw Error(
				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
				' is not a scalar value'
			);
		}
		return false;
	}
	return true;
}
/*--------------------------------------------------------------------------*/

function createByte(codePoint, shift) {
	return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
}

function encodeCodePoint(codePoint, strict) {
	if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
		return stringFromCharCode(codePoint);
	}
	var symbol = '';
	if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
		symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
	}
	else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
		if (!checkScalarValue(codePoint, strict)) {
			codePoint = 0xFFFD;
		}
		symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
		symbol += createByte(codePoint, 6);
	}
	else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
		symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
		symbol += createByte(codePoint, 12);
		symbol += createByte(codePoint, 6);
	}
	symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
	return symbol;
}

function utf8encode(string, opts) {
	opts = opts || {};
	var strict = false !== opts.strict;

	var codePoints = ucs2decode(string);
	var length = codePoints.length;
	var index = -1;
	var codePoint;
	var byteString = '';
	while (++index < length) {
		codePoint = codePoints[index];
		byteString += encodeCodePoint(codePoint, strict);
	}
	return byteString;
}

/*--------------------------------------------------------------------------*/

function readContinuationByte() {
	if (byteIndex >= byteCount) {
		throw Error('Invalid byte index');
	}

	var continuationByte = byteArray[byteIndex] & 0xFF;
	byteIndex++;

	if ((continuationByte & 0xC0) == 0x80) {
		return continuationByte & 0x3F;
	}

	// If we end up here, it’s not a continuation byte
	throw Error('Invalid continuation byte');
}

function decodeSymbol(strict) {
	var byte1;
	var byte2;
	var byte3;
	var byte4;
	var codePoint;

	if (byteIndex > byteCount) {
		throw Error('Invalid byte index');
	}

	if (byteIndex == byteCount) {
		return false;
	}

	// Read first byte
	byte1 = byteArray[byteIndex] & 0xFF;
	byteIndex++;

	// 1-byte sequence (no continuation bytes)
	if ((byte1 & 0x80) == 0) {
		return byte1;
	}

	// 2-byte sequence
	if ((byte1 & 0xE0) == 0xC0) {
		byte2 = readContinuationByte();
		codePoint = ((byte1 & 0x1F) << 6) | byte2;
		if (codePoint >= 0x80) {
			return codePoint;
		} else {
			throw Error('Invalid continuation byte');
		}
	}

	// 3-byte sequence (may include unpaired surrogates)
	if ((byte1 & 0xF0) == 0xE0) {
		byte2 = readContinuationByte();
		byte3 = readContinuationByte();
		codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
		if (codePoint >= 0x0800) {
			return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
		} else {
			throw Error('Invalid continuation byte');
		}
	}

	// 4-byte sequence
	if ((byte1 & 0xF8) == 0xF0) {
		byte2 = readContinuationByte();
		byte3 = readContinuationByte();
		byte4 = readContinuationByte();
		codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
			(byte3 << 0x06) | byte4;
		if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
			return codePoint;
		}
	}

	throw Error('Invalid UTF-8 detected');
}

var byteArray;
var byteCount;
var byteIndex;
function utf8decode(byteString, opts) {
	opts = opts || {};
	var strict = false !== opts.strict;

	byteArray = ucs2decode(byteString);
	byteCount = byteArray.length;
	byteIndex = 0;
	var codePoints = [];
	var tmp;
	while ((tmp = decodeSymbol(strict)) !== false) {
		codePoints.push(tmp);
	}
	return ucs2encode(codePoints);
}

module.exports = {
	version: '2.1.2',
	encode: utf8encode,
	decode: utf8decode
};


/***/ }),

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "rn9l":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

const tty = __webpack_require__("UNVE");
const util = __webpack_require__("jK02");

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__("/EaH");

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__("HNiH")(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ "s7eq":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-regular-svg-icons");

/***/ }),

/***/ "sLJp":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-svg-core");

/***/ }),

/***/ "tFq7":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "tM3w":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "next-redux-wrapper"
var external_next_redux_wrapper_ = __webpack_require__("JMOJ");
var external_next_redux_wrapper_default = /*#__PURE__*/__webpack_require__.n(external_next_redux_wrapper_);

// EXTERNAL MODULE: external "next-redux-saga"
var external_next_redux_saga_ = __webpack_require__("pEZS");
var external_next_redux_saga_default = /*#__PURE__*/__webpack_require__.n(external_next_redux_saga_);

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "redux-saga"
var external_redux_saga_ = __webpack_require__("1fKG");
var external_redux_saga_default = /*#__PURE__*/__webpack_require__.n(external_redux_saga_);

// EXTERNAL MODULE: ./react/index/store/actions/actionTypes.js
var actionTypes = __webpack_require__("E+sZ");

// EXTERNAL MODULE: ./react/index/shared/utility.js
var utility = __webpack_require__("5U8D");

// CONCATENATED MODULE: ./react/index/store/reducers/auth.js


const auth_initialState = {
  status: false,
  img: null,
  username: null
};

const checkAuth = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    status: action.status
  });
};

const checkUserImg = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    img: action.img
  });
};

const checkUserName = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    username: action.name
  });
};

const reducer = (state = auth_initialState, action) => {
  switch (action.type) {
    case actionTypes["r" /* CHECK_AUTH */]:
      return checkAuth(state, action);

    case actionTypes["t" /* CHECK_USERIMG */]:
      return checkUserImg(state, action);

    case actionTypes["u" /* CHECK_USERNAME */]:
      return checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var auth = (reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/model.js


const model_initialState = {
  cnts: null,
  cntErr: null,
  skipCnt: null,
  cntTotal: null,
  showLoader: false,
  changedFav: [],
  favChange: null,
  postVideo: {
    id: null
  },
  videoErr: null,
  filterDet: null,
  modelType: null,
  changeCnt: false,
  changeCntErr: null,
  changeCntStart: null
};

const fetchCnt = (state, action) => {
  let cnts = !state.cnts ? action.cnt : state.cnts.concat(...action.cnt);
  return Object(utility["f" /* updateObject */])(state, {
    cnts,
    skipCnt: action.skipCnt,
    cntTotal: action.cntTotal,
    showLoader: false
  });
};

const fetchCntReset = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    cnts: null,
    skipCnt: null,
    cntTotal: null,
    curTab: null,
    showLoader: false
  });
};

const fetchCntStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    showLoader: true
  });
};

const fetchPostFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    cntErr: action.err,
    showLoader: false
  });
};

const changeCntStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    changeCntStart: {
      title: action.title,
      id: action.id,
      det: action.det,
      modelType: action.modelType
    },
    changeCntErr: null
  });
};

const changeCntCancel = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const changeCntReset = (state, action) => {
  let cnts = [...state.cnts];

  if (action.changed) {
    if (state.changeCntStart.det === 'addUser') {
      let updateCnts = Object(utility["b" /* changeMode */])(cnts, state.changeCntStart, 'pending', true);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'acceptUser') {
      let updateCnts = Object(utility["b" /* changeMode */])(cnts, state.changeCntStart, 'accept', true);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'rejUser') {
      let updateCnts = Object(utility["b" /* changeMode */])(cnts, state.changeCntStart, 'request', false);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'cancelReq') {
      let updateCnts = Object(utility["b" /* changeMode */])(cnts, state.changeCntStart, 'pending', false);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'unfriend') {
      let updateCnts = Object(utility["b" /* changeMode */])(cnts, state.changeCntStart, 'accept', false);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'blockUser') {
      let updateCnt = cnts.filter(cnt => cnt.id !== state.changeCntStart.id);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnt,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    let updateCnt = cnts.filter(cnt => cnt._id !== state.changeCntStart.id);
    return Object(utility["f" /* updateObject */])(state, {
      cnts: updateCnt,
      changeCntStart: null,
      changeCntErr: null,
      changeCnt: false
    });
  }

  return Object(utility["f" /* updateObject */])(state, {
    cnts,
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const changeCntFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    changeCntErr: action.err
  });
};

const changeCnt = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    changeCnt: true
  });
};

const fetchVideo = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    postVideo: {
      id: action.id,
      url: action.url
    }
  });
};

const changeFavPtStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    favChange: {
      id: action.id,
      isLiked: action.isLiked
    }
  });
};

const changeFavPtFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    favChange: null
  });
};

const changeFav = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    changedFav: action.changedFav,
    favChange: null
  });
};

const filterPost = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    filterDet: action.filterDet
  });
};

const resetModel = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    cntErr: null,
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const model_reducer = (state = model_initialState, action) => {
  switch (action.type) {
    case actionTypes["C" /* FETCH_CNT */]:
      return fetchCnt(state, action);

    case actionTypes["L" /* FETCH_CNT_START */]:
      return fetchCntStart(state, action);

    case actionTypes["K" /* FETCH_CNT_RESET */]:
      return fetchCntReset(state, action);

    case actionTypes["I" /* FETCH_CNT_FAIL */]:
      return fetchPostFail(state, action);

    case actionTypes["f" /* CHANGE_CNT_START */]:
      return changeCntStart(state, action);

    case actionTypes["b" /* CHANGE_CNT_CANCEL */]:
      return changeCntCancel(state, action);

    case actionTypes["e" /* CHANGE_CNT_RESET */]:
      return changeCntReset(state, action);

    case actionTypes["c" /* CHANGE_CNT_FAIL */]:
      return changeCntFail(state, action);

    case actionTypes["a" /* CHANGE_CNT */]:
      return changeCnt(state, action);

    case actionTypes["zb" /* FETCH_VIDEO */]:
      return fetchVideo(state, action);

    case actionTypes["g" /* CHANGE_FAVORITE */]:
      return changeFav(state, action);

    case actionTypes["n" /* CHANGE_FAVORITE_PT_START */]:
      return changeFavPtStart(state, action);

    case actionTypes["m" /* CHANGE_FAVORITE_PT_FAIL */]:
      return changeFavPtFail(state, action);

    case actionTypes["Eb" /* FILTER_POST */]:
      return filterPost(state, action);

    case actionTypes["Xb" /* RESET_MODEL */]:
      return resetModel(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var reducers_model = (model_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/filter.js


const filter_initialState = {
  cntCateg: null,
  filterStart: false,
  totalFound: null,
  filterErr: null
};

const fetchCntCateg = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    cntCateg: action.categ
  });
};

const filterContentStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    filterStart: true,
    filterErr: null
  });
};

const filterContentFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    filterErr: action.err
  });
};

const filter_filterContent = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    totalFound: action.totalFound
  });
};

const resetFilter = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    totalFound: null,
    filterErr: null
  });
};

const filter_reducer = (state = filter_initialState, action) => {
  switch (action.type) {
    case actionTypes["D" /* FETCH_CNTCATEG */]:
      return fetchCntCateg(state, action);

    case actionTypes["Db" /* FILTER_CONTENT_START */]:
      return filterContentStart(state, action);

    case actionTypes["Bb" /* FILTER_CONTENT_FAIL */]:
      return filterContentFail(state, action);

    case actionTypes["Ab" /* FILTER_CONTENT */]:
      return filter_filterContent(state, action);

    case actionTypes["Wb" /* RESET_FILTER */]:
      return resetFilter(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var filter = (filter_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/share.js


const share_initialState = {
  users: null,
  userSelect: null,
  filterUser: null,
  filterUserSelect: null,
  viewAllUsers: true,
  shareID: null,
  cntType: null,
  start: false,
  shareErr: null
};

const fetchUsers = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    users: action.users,
    filterUser: null
  });
};

const userSelect = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    userSelect: action.userSelect
  });
};

const viewUsers = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    viewAllUsers: !state.viewAllUsers
  });
};

const removeUser = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    userSelect: action.users,
    viewAllUsers: action.users && !action.users.length > 0
  });
};

const share_filterUser = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    filterUser: action.users
  });
};

const filterUserSelect = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    filterUserSelect: action.userSelect
  });
};

const shareID = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    shareID: String(action.shareID),
    cntType: action.cntType
  });
};

const shareUserStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    start: true
  });
};

const shareUserFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    shareErr: action.err
  });
};

const share_shareUser = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    users: null,
    userSelect: null,
    filterUser: null,
    filterUserSelect: null,
    viewAllUsers: true,
    shareID: null,
    share: false,
    start: false
  });
};

const share_reducer = (state = share_initialState, action) => {
  switch (action.type) {
    case actionTypes["vb" /* FETCH_USERS */]:
      return fetchUsers(state, action);

    case actionTypes["gc" /* USER_SELECT */]:
      return userSelect(state, action);

    case actionTypes["hc" /* VIEW_USERS */]:
      return viewUsers(state, action);

    case actionTypes["Tb" /* REMOVE_USER */]:
      return removeUser(state, action);

    case actionTypes["Fb" /* FILTER_USER */]:
      return share_filterUser(state, action);

    case actionTypes["Hb" /* FILTER_USER_SELECT */]:
      return filterUserSelect(state, action);

    case actionTypes["Yb" /* SHARE_ID */]:
      return shareID(state, action);

    case actionTypes["cc" /* SHARE_USER_START */]:
      return shareUserStart(state, action);

    case actionTypes["ac" /* SHARE_USER_FAIL */]:
      return shareUserFail(state, action);

    case actionTypes["Zb" /* SHARE_USER */]:
      return share_shareUser(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var share = (share_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/tags.js


const tags_initialState = {
  path: null,
  tags: null
};

const fetchTags = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    tags: action.tags
  });
};

const changeTagsPath = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    path: action.path
  });
};

const tags_reducer = (state = tags_initialState, action) => {
  switch (action.type) {
    case actionTypes["q" /* CHANGE_TAGS_PATH */]:
      return changeTagsPath(state, action);

    case actionTypes["lb" /* FETCH_TAGS */]:
      return fetchTags(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var tags = (tags_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/trend.js


const trend_initialState = {
  trends: null
};

const fetchTrds = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    trends: action.trd
  });
};

const trend_reducer = (state = trend_initialState, action) => {
  switch (action.type) {
    case actionTypes["qb" /* FETCH_TRD */]:
      return fetchTrds(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var trend = (trend_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/setQue.js


const setQue_initialState = {
  categ: null
};

const fetchCateg = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    categ: action.categ
  });
};

const setQue_reducer = (state = setQue_initialState, action) => {
  switch (action.type) {
    case actionTypes["x" /* FETCH_CATEG */]:
      return fetchCateg(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var setQue = (setQue_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/conv.js


const conv_initialState = {
  conv: null
};

const fetchConv = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    conv: action.conv
  });
};

const conv_reducer = (state = conv_initialState, action) => {
  switch (action.type) {
    case actionTypes["M" /* FETCH_CONV */]:
      return fetchConv(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var conv = (conv_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/header.js


const header_initialState = {
  expand: false,
  hideFormSm: false,
  addNew: false,
  favChange: null,
  notify: null,
  hidNotify: false,
  navList: null,
  navListCateg: null,
  hidNavList: false,
  hidUserOption: false,
  notifyActive: null,
  default: false,
  searchCnt: null,
  filterPos: 0,
  filterLastPos: 0,
  searchCntErr: null,
  filterStart: false
};

const formExpand = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const formSm = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    hideFormSm: false,
    default: false
  });
};

const navDefault = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    expand: false,
    hideFormSm: true,
    addNew: false,
    hidNotify: true,
    hidNavList: true,
    hidUserOption: true,
    default: true
  });
};

const addNew = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    addNew: !state.addNew,
    default: false
  });
};

const changeMainFavStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    favChange: action.isLiked
  });
};

const changeMainFavReset = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    favChange: null
  });
};

const fetchNotify = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const fetchNotifyStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const changeFavNotifyStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notify: action.notify
  });
};

const changeFavNotify = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notify: action.notify
  });
};

const showNavList = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const fetchNavListStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    navList: null,
    navListCateg: null
  });
};

const fetchNavList = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const showUserOption = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const fetchNotifyActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notifyActive: action.notifyActive
  });
};

const defaultNotifyActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notifyActive: null
  });
};

const headerFilterStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const headerFilterFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    searchCntErr: action.searchCntErr
  });
};

const headerFilter = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    searchCnt: action.searchCnt
  });
};

const headerFilterClose = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    searchCnt: null,
    filterStart: false
  });
};

const header_reducer = (state = header_initialState, action) => {
  switch (action.type) {
    case actionTypes["Pb" /* HEADER_FORM_EXPAND */]:
      return formExpand(state, action);

    case actionTypes["Qb" /* HEADER_FORM_SM */]:
      return formSm(state, action);

    case actionTypes["Rb" /* HEADER_NAV_DEFAULT */]:
      return navDefault(state, action);

    case actionTypes["Jb" /* HEADER_ADD_NEW */]:
      return addNew(state, action);

    case actionTypes["p" /* CHANGE_MAINFAVORITE_START */]:
      return changeMainFavStart(state, action);

    case actionTypes["o" /* CHANGE_MAINFAVORITE_RESET */]:
      return changeMainFavReset(state, action);

    case actionTypes["Z" /* FETCH_NOTIFY_START */]:
      return fetchNotifyStart(state, action);

    case actionTypes["U" /* FETCH_NOTIFY */]:
      return fetchNotify(state, action);

    case actionTypes["l" /* CHANGE_FAVORITE_NOTIFY_START */]:
      return changeFavNotifyStart(state, action);

    case actionTypes["i" /* CHANGE_FAVORITE_NOTIFY */]:
      return changeFavNotify(state, action);

    case actionTypes["ec" /* SHOW_NAV_LIST */]:
      return showNavList(state, action);

    case actionTypes["T" /* FETCH_NAVLIST_START */]:
      return fetchNavListStart(state, action);

    case actionTypes["R" /* FETCH_NAVLIST */]:
      return fetchNavList(state, action);

    case actionTypes["fc" /* SHOW_USER_OPTION */]:
      return showUserOption(state, action);

    case actionTypes["V" /* FETCH_NOTIFY_ACTIVE */]:
      return fetchNotifyActive(state, action);

    case actionTypes["v" /* DEFAULT_NOTIFYACTIVE */]:
      return defaultNotifyActive(state, action);

    case actionTypes["Ob" /* HEADER_FILTER_START */]:
      return headerFilterStart(state, action);

    case actionTypes["Mb" /* HEADER_FILTER_FAIL */]:
      return headerFilterFail(state, action);

    case actionTypes["Lb" /* HEADER_FILTER_CLOSE */]:
      return headerFilterClose(state, action);

    case actionTypes["Kb" /* HEADER_FILTER */]:
      return headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var header = (header_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/main.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const main_initialState = {
  showBackdrop: false,
  cntActive: null,
  ptActive: null,
  queActive: null,
  reqActive: null,
  shareActive: null,
  shareCntActive: null
};

const fetchPtActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    ptActive: action.ptActive
  });
};

const fetchQueActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    queActive: action.queActive
  });
};

const fetchCntActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    cntActive: action.cntActive
  });
};

const fetchReqActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    reqActive: action.reqActive
  });
};

const fetchShareActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    shareActive: action.shareActive
  });
};

const fetchShareCntActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    shareCntActive: action.shareCntActive
  });
};

const resetActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, _objectSpread({}, state));
};

const showMainBackdrop = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    showBackdrop: true
  });
};

const hideMainBackdrop = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    showBackdrop: false
  });
};

const main_reducer = (state = main_initialState, action) => {
  switch (action.type) {
    case actionTypes["bb" /* FETCH_PT_ACTIVE */]:
      return fetchPtActive(state, action);

    case actionTypes["db" /* FETCH_QUE_ACTIVE */]:
      return fetchQueActive(state, action);

    case actionTypes["G" /* FETCH_CNT_ACTIVE */]:
      return fetchCntActive(state, action);

    case actionTypes["hb" /* FETCH_SHARECNT_ACTIVE */]:
      return fetchShareCntActive(state, action);

    case actionTypes["jb" /* FETCH_SHARE_ACTIVE */]:
      return fetchShareActive(state, action);

    case actionTypes["fb" /* FETCH_REQ_ACTIVE */]:
      return fetchReqActive(state, action);

    case actionTypes["Ub" /* RESET_ACTIVE */]:
      return resetActive(state, action);

    case actionTypes["dc" /* SHOW_MAIN_BACKDROP */]:
      return showMainBackdrop(state, action);

    case actionTypes["Sb" /* HIDE_MAIN_BACKDROP */]:
      return hideMainBackdrop(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var main = (main_reducer);
// EXTERNAL MODULE: external "redux-saga/effects"
var effects_ = __webpack_require__("RmXt");

// EXTERNAL MODULE: ./react/index/store/actions/index.js + 10 modules
var actions = __webpack_require__("DhbN");

// EXTERNAL MODULE: ./react/index/axios.js
var axios = __webpack_require__("MEIi");

// CONCATENATED MODULE: ./react/index/store/sagas/auth.js



function* checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(effects_["put"])(actions["q" /* checkAuth */](true));

    try {
      let response = yield axios["a" /* default */].post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(effects_["put"])(actions["s" /* checkUserImg */](response.data.url));
      } else {
        yield Object(effects_["put"])(actions["t" /* checkUserName */](response.data.name));
      }
    } catch (err) {}
  }
}
// CONCATENATED MODULE: ./react/index/store/sagas/model.js




function* fetchCntInitSaga(action) {
  let model = action.fetchType === 'post' ? '/post' : action.fetchType === 'question' || action.fetchType === 'shared' ? '/question' : '/' + action.fetchType;
  let categ = action.fetchType === 'shared' ? `shared-${action.userID}` : action.fetchType;

  if (action.cntTotal > action.skipCnt) {
    yield Object(effects_["put"])(actions["E" /* fetchCntStart */]());
  }

  try {
    if (action.cntTotal === 0 || action.cntTotal > action.skipCnt) {
      let response = yield axios["a" /* default */].post(model, null, {
        headers: {
          'data-categ': categ,
          'limit': action.fetchLimit,
          'skip': action.skipCnt
        }
      });
      yield Object(effects_["put"])(actions["x" /* fetchCnt */](response.data.cnt, action.skipCnt, response.data.cntTotal));
    }
  } catch (err) {
    yield Object(effects_["put"])(actions["B" /* fetchCntFail */](err));
  }
}
function* changeFavSaga(action) {
  let updateFav = Object(utility["a" /* changeFav */])(action.id, action.liked, action.favAdd, action.changedFav);
  yield Object(effects_["put"])(actions["o" /* changeMainFavoriteStart */](updateFav.favDet.liked));
  yield Object(effects_["put"])(actions["m" /* changeFavPtStart */](updateFav.favDet.id, updateFav.favDet.liked));

  try {
    let field = action.cntGrp === 'post' ? 'postID' : action.cntGrp === 'question' ? 'queID' : 'pwtID';
    yield axios["a" /* default */].patch('/header', {
      id: updateFav.favDet.id,
      model: action.cntGrp,
      field
    }, {
      headers: {
        'data-categ': 'changefavorite'
      }
    });
    yield Object(effects_["delay"])(500);
    yield Object(effects_["put"])(actions["n" /* changeMainFavoriteReset */]());
    yield Object(effects_["put"])(actions["g" /* changeFav */](updateFav.updateChangeFav));
  } catch (err) {
    yield Object(effects_["delay"])(500);
    yield Object(effects_["put"])(actions["n" /* changeMainFavoriteReset */]());
    yield Object(effects_["put"])(actions["l" /* changeFavPtFail */]());
  }
}
function* changeCntInitSaga(action) {
  let field = action.modelType === 'post' ? 'postID' : action.modelType === 'question' ? 'queID' : 'pwtID';

  if (!action.confirm) {
    yield Object(effects_["put"])(actions["f" /* changeCntStart */](action.title, action.id, action.det, action.modelType));
    return;
  }

  if (action.det === 'addUser') {
    yield Object(effects_["put"])(actions["f" /* changeCntStart */](action.title, action.id, action.det, action.modelType));
  }

  try {
    if (action.det === 'delete') {
      let payload = JSON.stringify({
        id: action.id,
        model: action.modelType,
        field
      });
      yield axios["a" /* default */].delete('/header', {
        headers: {
          'data-categ': `deletecnt-${payload}`
        }
      });
    } else if (action.modelType === 'user') {
      yield axios["a" /* default */].patch('/users', {
        id: action.id
      }, {
        headers: {
          'data-categ': action.det
        }
      });
    } else {
      yield axios["a" /* default */].patch('/header', {
        id: action.id,
        model: action.modelType,
        field
      }, {
        headers: {
          'data-categ': 'draftmode'
        }
      });
    }

    yield Object(effects_["put"])(actions["a" /* changeCnt */]());
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(actions["e" /* changeCntReset */](true));
  } catch (err) {
    yield Object(effects_["put"])(actions["c" /* changeCntFail */](err));
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(actions["e" /* changeCntReset */](false));
  }
}
// CONCATENATED MODULE: ./react/index/store/sagas/filter.js




function* fetchCntCategInitSaga(action) {
  try {
    if (action.categ && action.categ.length > 0) {
      yield Object(effects_["put"])(actions["A" /* fetchCntCateg */]([...action.categ]));
    } else {
      let response = yield axios["a" /* default */].post('/header', {
        categ: 'question'
      }, {
        headers: {
          'data-categ': 'category'
        }
      });
      yield Object(effects_["put"])(actions["A" /* fetchCntCateg */](response.data));
    }
  } catch (e) {}
}
function* filterContentInitSaga(action) {
  let categs = [];

  for (let categ of action.content.category) {
    categs.push(categ.category);
  }

  let filterDet = Object(utility["f" /* updateObject */])(action.content, {
    category: categs
  });
  let filterCnt = JSON.stringify(filterDet);

  if (!action.content.apply) {
    try {
      yield Object(effects_["put"])(actions["ib" /* filterContentStart */]());
      let response = yield axios["a" /* default */].post('/header', {
        filterCnt,
        model: 'question'
      }, {
        headers: {
          'data-categ': 'cntSearch'
        }
      });
      yield Object(effects_["put"])(actions["gb" /* filterContent */](response.data));
    } catch (err) {
      yield Object(effects_["put"])(actions["hb" /* filterContentFail */](err));
    }

    return;
  }

  yield Object(effects_["put"])(actions["jb" /* filterPost */](filterCnt));
}
// CONCATENATED MODULE: ./react/index/store/sagas/share.js



function* fetchUsersInitSaga() {
  try {
    let response = yield axios["a" /* default */].post('/users', null, {
      headers: {
        'data-categ': `allteacher-notab`
      }
    });
    yield Object(effects_["put"])(actions["db" /* fetchUsers */](response.data));
  } catch (err) {
    yield Object(effects_["put"])(actions["eb" /* fetchUsersFail */](err));
  }
}
function* filterUserInitSaga(action) {
  let filterUser = null;

  if (!action.filterContent) {
    filterUser = action.users;
  } else {
    filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
  }

  yield Object(effects_["put"])(actions["kb" /* filterUser */](filterUser));
}
function* filterUserSelectInitSaga(action) {
  let filterUser = null;

  if (!action.filterContent) {
    filterUser = action.userSelect;
  } else {
    filterUser = action.userSelect.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
  }

  yield Object(effects_["put"])(actions["lb" /* filterUserSelect */](filterUser));
}
function* shareUserInitSaga(action) {
  let shareUser = [];

  for (let user of [...action.userSelect]) {
    shareUser.push(user.id);
  }

  try {
    yield Object(effects_["put"])(actions["Ab" /* shareUserStart */]());
    let field = action.cntType === 'post' ? 'postID' : action.cntType === 'question' ? 'queID' : 'pwtID';
    yield axios["a" /* default */].patch('/header', {
      users: JSON.stringify(shareUser),
      id: action.shareID,
      model: action.cntType,
      field
    }, {
      headers: {
        'data-categ': 'shareuser'
      }
    });
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(actions["zb" /* shareUser */]());
  } catch (err) {
    yield Object(effects_["put"])(actions["Bb" /* shareUserfail */](err));
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(actions["zb" /* shareUser */]());
  }
}
// CONCATENATED MODULE: ./react/index/store/sagas/tags.js



function* fetchTagsInitSaga() {
  try {
    let response = yield axios["a" /* default */].post('/post', null, {
      headers: {
        'data-categ': 'postCateg'
      }
    });
    yield Object(effects_["put"])(actions["ab" /* fetchTags */](response.data));
  } catch (e) {}
}
// CONCATENATED MODULE: ./react/index/store/sagas/trend.js



function* fetchTrdInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'trend'
      }
    });
    yield Object(effects_["put"])(actions["bb" /* fetchTrd */](response.data));
  } catch (e) {}
}
// CONCATENATED MODULE: ./react/index/store/sagas/setQue.js


const CATEG = ['post', 'question', 'social', 'writers', 'poet', 'poeters', 'poem', 'post', 'question', 'social', 'writers', 'poet', 'poeters', 'poem'];
function* fetchCategInitSaga() {
  yield Object(effects_["put"])(actions["w" /* fetchCateg */](CATEG));
}
// CONCATENATED MODULE: ./react/index/store/sagas/conv.js


function* fetchConvInitSaga(action) {
  const data = [{
    id: '63763637737',
    type: 'grpChat',
    groupImage: '/',
    title: 'The real community for programmers The real community for programmers The real community for programmers',
    lastMsg: 'Pls do you know the reson while Pls do you know the reson while Pls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson while',
    online: '5353535',
    offline: '63636363'
  }, {
    id: '7575848839939',
    type: 'pvtChat',
    userImage: '/',
    status: true,
    user: 'user user',
    convCreated: '2m ago',
    lastMsg: 'Pls do you know the reson while Pls do you know the reson while Pls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson while'
  }];
  yield Object(effects_["put"])(actions["F" /* fetchConv */]([...data]));
}
// CONCATENATED MODULE: ./react/index/store/sagas/header.js




function* fetchNotifyInitSaga(action) {
  try {
    yield Object(effects_["put"])(actions["O" /* fetchNotifyStart */]());
    let response = yield axios["a" /* default */].post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(actions["K" /* fetchNotify */](response.data.coll));
    } else {
      yield Object(effects_["put"])(actions["K" /* fetchNotify */]([]));
    }
  } catch (err) {
    yield Object(effects_["put"])(actions["M" /* fetchNotifyFail */](err));
  }
}
function* changeFavNotifySaga(action) {
  let notify = Object(utility["a" /* changeFav */])(action.notify, action.notifyID);
  yield Object(effects_["put"])(actions["k" /* changeFavNotifyStart */](notify.updateStartArray));
  yield Object(effects_["put"])(actions["i" /* changeFavNotify */](notify.updateDataArray));
}
function* fetchNavlistInitSaga(action) {
  try {
    yield Object(effects_["put"])(actions["J" /* fetchNavlistStart */]());
    let response = yield axios["a" /* default */].post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(effects_["put"])(actions["H" /* fetchNavlist */](action.category, response.data));
  } catch (e) {}
}
function* fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });
    yield Object(effects_["put"])(actions["L" /* fetchNotifyActive */](response.data.collTotal));
  } catch (err) {}
}
function* defaultNotifyActiveInitSaga(action) {
  try {
    yield axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(effects_["put"])(actions["u" /* defaultNotifyActive */]());
  } catch (err) {}
}
function* headerFilterInitSaga(action) {
  try {
    yield Object(effects_["put"])(actions["rb" /* headerFilterStart */](action.filterPos, action.filterLastPos));
    let response = yield axios["a" /* default */].post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(effects_["put"])(actions["nb" /* headerFilter */](response.data));
  } catch (err) {
    yield Object(effects_["put"])(actions["pb" /* headerFilterFail */](err));
  }
}
// CONCATENATED MODULE: ./react/index/store/sagas/main.js



function* fetchPtActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {
      model: 'post'
    }, {
      headers: {
        'data-categ': ' modelNotify'
      }
    });
    yield Object(effects_["put"])(actions["Q" /* fetchPtActive */](response.data));
    return;
  } catch (err) {}
}
function* fetchQueActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {
      model: 'question'
    }, {
      headers: {
        'data-categ': ' modelNotify'
      }
    });
    yield Object(effects_["put"])(actions["S" /* fetchQueActive */](response.data));
    return;
  } catch (err) {}
}
function* fetchCntActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {
      model: 'poet'
    }, {
      headers: {
        'data-categ': ' modelNotify'
      }
    });
    yield Object(effects_["put"])(actions["y" /* fetchCntActive */](response.data));
  } catch (err) {}
}
function* fetchShareCntActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {
      model: 'question'
    }, {
      headers: {
        'data-categ': 'share'
      }
    });
    yield Object(effects_["put"])(actions["X" /* fetchShareCntActive */](response.data));
  } catch (err) {}
}
function* fetchReqActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/users', null, {
      headers: {
        'data-categ': 'request-activeOnly'
      }
    });
    yield Object(effects_["put"])(actions["U" /* fetchReqActive */](response.data));
  } catch (err) {}
}
function* fetchShareActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });
    yield Object(effects_["put"])(actions["W" /* fetchShareActive */](response.data));
  } catch (err) {}
}
function* resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'helpme') {
      yield axios["a" /* default */].patch('/header', {
        model: 'question'
      }, {
        headers: {
          'data-categ': 'share'
        }
      });
    } else {
      yield axios["a" /* default */].patch('/header', {
        model: action.curTab
      }, {
        headers: {
          'data-categ': 'modelNotify'
        }
      });
    }

    yield Object(effects_["put"])(actions["vb" /* resetActive */](action.curTab));
  } catch (err) {}
}
// CONCATENATED MODULE: ./react/index/store/sagas/index.js












function* watchAuth() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["s" /* CHECK_AUTH_INIT */], checkAuthInitSaga)]);
}
function* watchCnt() {
  yield Object(effects_["all"])([Object(effects_["takeLatest"])(actionTypes["J" /* FETCH_CNT_INIT */], fetchCntInitSaga), Object(effects_["takeEvery"])(actionTypes["h" /* CHANGE_FAVORITE_INIT */], changeFavSaga), Object(effects_["takeLatest"])(actionTypes["d" /* CHANGE_CNT_INIT */], changeCntInitSaga)]);
}
function* watchFilter() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["E" /* FETCH_CNTCATEG_INIT */], fetchCntCategInitSaga), Object(effects_["takeEvery"])(actionTypes["Cb" /* FILTER_CONTENT_INIT */], filterContentInitSaga)]);
}
function* watchShare() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["xb" /* FETCH_USERS_INIT */], fetchUsersInitSaga), Object(effects_["takeEvery"])(actionTypes["Gb" /* FILTER_USER_INIT */], filterUserInitSaga), Object(effects_["takeEvery"])(actionTypes["Ib" /* FILTER_USER_SELECT_INIT */], filterUserSelectInitSaga), Object(effects_["takeEvery"])(actionTypes["bc" /* SHARE_USER_INIT */], shareUserInitSaga)]);
}
function* watchTags() {
  yield Object(effects_["takeEvery"])(actionTypes["nb" /* FETCH_TAGS_INIT */], fetchTagsInitSaga);
}
function* watchTrd() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["sb" /* FETCH_TRD_INIT */], fetchTrdInitSaga)]);
}
function* watchSetQue() {
  yield Object(effects_["takeEvery"])(actionTypes["z" /* FETCH_CATEG_INIT */], fetchCategInitSaga);
}
function* watchConv() {
  yield Object(effects_["takeEvery"])(actionTypes["O" /* FETCH_CONV_INIT */], fetchConvInitSaga);
}
function* watchHeader() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["Y" /* FETCH_NOTIFY_INIT */], fetchNotifyInitSaga), Object(effects_["takeEvery"])(actionTypes["k" /* CHANGE_FAVORITE_NOTIFY_INIT */], changeFavNotifySaga), Object(effects_["takeEvery"])(actionTypes["S" /* FETCH_NAVLIST_INIT */], fetchNavlistInitSaga), Object(effects_["takeEvery"])(actionTypes["W" /* FETCH_NOTIFY_ACTIVE_INIT */], fetchNotifyActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["w" /* DEFAULT_NOTIFYACTIVE_INIT */], defaultNotifyActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["kb" /* FETCH_SHARE_ACTIVE_INIT */], fetchShareActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["Nb" /* HEADER_FILTER_INIT */], headerFilterInitSaga)]);
}
function* watchMain() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["cb" /* FETCH_PT_ACTIVE_INIT */], fetchPtActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["eb" /* FETCH_QUE_ACTIVE_INIT */], fetchQueActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["H" /* FETCH_CNT_ACTIVE_INIT */], fetchCntActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["kb" /* FETCH_SHARE_ACTIVE_INIT */], fetchShareActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["ib" /* FETCH_SHARECNT_ACTIVE_INIT */], fetchShareCntActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["gb" /* FETCH_REQ_ACTIVE_INIT */], fetchReqActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["Vb" /* RESET_ACTIVE_INIT */], resetActiveInitSaga)]);
}
function* rootSaga() {
  yield Object(effects_["all"])([watchAuth(), watchCnt(), watchFilter(), watchShare(), watchTags(), watchTrd(), watchSetQue(), watchHeader(), watchConv(), watchMain()]);
}
// CONCATENATED MODULE: ./react/index/store.js














const bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: auth,
    cnt: reducers_model,
    filter: filter,
    share: share,
    tags: tags,
    trd: trend,
    setQue: setQue,
    conv: conv,
    header: header,
    main: main
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

/* harmony default export */ var index_store = (configureStore);
// CONCATENATED MODULE: ./react/signup/store/reducers/auth.js
const reducers_auth_initialState = {
  userID: 'user_id'
};

const auth_reducer = (state = reducers_auth_initialState, action) => {
  return state;
};

/* harmony default export */ var reducers_auth = (auth_reducer);
// EXTERNAL MODULE: ./react/signup/store/actions/actionTypes.js
var actions_actionTypes = __webpack_require__("edkJ");

// EXTERNAL MODULE: ./react/signup/shared/utility.js
var shared_utility = __webpack_require__("PDZw");

// CONCATENATED MODULE: ./react/signup/store/reducers/form.js


const form_initialState = {
  submitError: null,
  submitted: false,
  start: true
};

const submitFormStart = (state, action) => {
  return Object(shared_utility["b" /* updateObject */])(state, {
    submitError: null,
    start: false
  });
};

const submitFormFail = (state, action) => {
  return Object(shared_utility["b" /* updateObject */])(state, {
    submitError: {
      message: action.err
    },
    start: true
  });
};

const formSubmitted = (state, action) => {
  return Object(shared_utility["b" /* updateObject */])(state, {
    submitted: true,
    start: true
  });
};

const form_reducer = (state = form_initialState, action) => {
  switch (action.type) {
    case actions_actionTypes["d" /* SUBMIT_FORM_START */]:
      return submitFormStart(state, action);

    case actions_actionTypes["b" /* SUBMIT_FORM_FAIL */]:
      return submitFormFail(state, action);

    case actions_actionTypes["a" /* FORM_SUBMITTED */]:
      return formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var reducers_form = (form_reducer);
// EXTERNAL MODULE: ./react/signup/store/actions/index.js + 1 modules
var store_actions = __webpack_require__("w7x8");

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__("zr5I");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// EXTERNAL MODULE: ./global/global.js
var global = __webpack_require__("0fJA");
var global_default = /*#__PURE__*/__webpack_require__.n(global);

// CONCATENATED MODULE: ./react/signup/axios.js


const instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
instance.defaults.headers.common['authorization'] = 'authorization';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var signup_axios = (instance);
// CONCATENATED MODULE: ./react/signup/store/sagas/form.js



function* submitFormInitSaga(action) {
  yield Object(effects_["put"])(store_actions["d" /* submitFormStart */]());

  try {
    yield signup_axios.post('/signup', action.formData);
    yield Object(effects_["put"])(store_actions["a" /* formSubmitted */]());
  } catch (err) {
    let error = null;

    if (err.response) {
      if (err.response.data && err.response.data.keyValue) {
        for (let key in err.response.data.keyValue) {
          if (key === 'email') {
            error = `${key}  already taken`;
          } else if (key === 'username') {
            error = `${key} already taken`;
          } else {
            error = err.message;
          }
        }
      } else {
        error = typeof err.response.data !== 'object' ? err.response.data : 'Connection Error';
      }
    } else {
      error = err.message;
    }

    yield Object(effects_["put"])(store_actions["b" /* submitFormFail */](error));
  }
}
// CONCATENATED MODULE: ./react/signup/store/sagas/index.js



function* watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actions_actionTypes["c" /* SUBMIT_FORM_INIT */], submitFormInitSaga)]);
}
// CONCATENATED MODULE: ./react/signup/store.js






const store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: reducers_auth,
    form: reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, store_bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(watchForm);
  return store;
}

/* harmony default export */ var signup_store = (store_configureStore);
// CONCATENATED MODULE: ./react/login/store/reducers/auth.js
const store_reducers_auth_initialState = {
  userID: 'user_id'
};

const reducers_auth_reducer = (state = store_reducers_auth_initialState, action) => {
  return state;
};

/* harmony default export */ var store_reducers_auth = (reducers_auth_reducer);
// EXTERNAL MODULE: ./react/login/store/actions/actionTypes.js
var store_actions_actionTypes = __webpack_require__("YaDP");

// EXTERNAL MODULE: ./react/login/shared/utility.js
var login_shared_utility = __webpack_require__("mjtn");

// CONCATENATED MODULE: ./react/login/store/reducers/form.js


const reducers_form_initialState = {
  submitError: null,
  submitted: false,
  start: true
};

const form_submitFormStart = (state, action) => {
  return Object(login_shared_utility["b" /* updateObject */])(state, {
    submitError: null,
    start: false
  });
};

const form_submitFormFail = (state, action) => {
  return Object(login_shared_utility["b" /* updateObject */])(state, {
    submitError: {
      message: action.err
    },
    start: true
  });
};

const form_formSubmitted = (state, action) => {
  return Object(login_shared_utility["b" /* updateObject */])(state, {
    submitted: true,
    start: true
  });
};

const reducers_form_reducer = (state = reducers_form_initialState, action) => {
  switch (action.type) {
    case store_actions_actionTypes["d" /* SUBMIT_FORM_START */]:
      return form_submitFormStart(state, action);

    case store_actions_actionTypes["b" /* SUBMIT_FORM_FAIL */]:
      return form_submitFormFail(state, action);

    case store_actions_actionTypes["a" /* FORM_SUBMITTED */]:
      return form_formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var store_reducers_form = (reducers_form_reducer);
// EXTERNAL MODULE: ./react/login/store/actions/index.js + 1 modules
var login_store_actions = __webpack_require__("G9cm");

// CONCATENATED MODULE: ./react/login/axios.js


const axios_instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
axios_instance.defaults.headers.common['authorization'] = 'authorization';
axios_instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var login_axios = (axios_instance);
// CONCATENATED MODULE: ./react/login/store/sagas/form.js



function* form_submitFormInitSaga(action) {
  yield Object(effects_["put"])(login_store_actions["d" /* submitFormStart */]());

  try {
    yield login_axios.post('/login', action.formData);
    yield Object(effects_["put"])(login_store_actions["a" /* formSubmitted */]());
  } catch (err) {
    let error = err.response ? err.response.data : err.message;
    yield Object(effects_["put"])(login_store_actions["b" /* submitFormFail */](error));
  }
}
// CONCATENATED MODULE: ./react/login/store/sagas/index.js



function* sagas_watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(store_actions_actionTypes["c" /* SUBMIT_FORM_INIT */], form_submitFormInitSaga)]);
}
// CONCATENATED MODULE: ./react/login/store.js






const login_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function login_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: store_reducers_auth,
    form: store_reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, login_store_bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(sagas_watchForm);
  return store;
}

/* harmony default export */ var login_store = (login_store_configureStore);
// CONCATENATED MODULE: ./react/resetpass/store/reducers/auth.js
const resetpass_store_reducers_auth_initialState = {
  userID: 'user_id'
};

const store_reducers_auth_reducer = (state = resetpass_store_reducers_auth_initialState, action) => {
  return state;
};

/* harmony default export */ var resetpass_store_reducers_auth = (store_reducers_auth_reducer);
// CONCATENATED MODULE: ./react/resetpass/store/actions/actionTypes.js
const SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const SUBMIT_TOKEN_EXPIRE = 'SUBMIT__TOKEN_EXPIRE';
const SUBMIT_FORM = 'SUBMIT_FORM';
const FORM_SUBMITTED = 'FORM_SUBMITTED';
// CONCATENATED MODULE: ./react/resetpass/shared/utility.js
function utility_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function utility_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { utility_ownKeys(Object(source), true).forEach(function (key) { utility_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { utility_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function utility_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const updateObject = (oldObject, updatedProperties) => {
  return utility_objectSpread({}, oldObject, {}, updatedProperties);
};
const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};
// CONCATENATED MODULE: ./react/resetpass/store/reducers/form.js


const store_reducers_form_initialState = {
  submitError: null,
  submitted: false,
  start: true,
  tokenExpire: false
};

const reducers_form_submitFormStart = (state, action) => {
  return updateObject(state, {
    submitError: null,
    start: false
  });
};

const reducers_form_submitFormFail = (state, action) => {
  return updateObject(state, {
    submitError: {
      message: action.err
    },
    start: true
  });
};

const submitTokenExpire = (state, action) => {
  return updateObject(state, {
    tokenExpire: true
  });
};

const reducers_form_formSubmitted = (state, action) => {
  return updateObject(state, {
    submitted: true,
    start: true
  });
};

const store_reducers_form_reducer = (state = store_reducers_form_initialState, action) => {
  switch (action.type) {
    case SUBMIT_FORM_START:
      return reducers_form_submitFormStart(state, action);

    case SUBMIT_FORM_FAIL:
      return reducers_form_submitFormFail(state, action);

    case SUBMIT_TOKEN_EXPIRE:
      return submitTokenExpire(state, action);

    case FORM_SUBMITTED:
      return reducers_form_formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var resetpass_store_reducers_form = (store_reducers_form_reducer);
// CONCATENATED MODULE: ./react/resetpass/store/actions/form.js

const submitFormInit = formData => {
  return {
    type: SUBMIT_FORM_INIT,
    formData
  };
};
const actions_form_submitFormFail = err => {
  return {
    type: SUBMIT_FORM_FAIL,
    err
  };
};
const actions_form_submitFormStart = () => {
  return {
    type: SUBMIT_FORM_START
  };
};
const form_submitTokenExpire = () => {
  return {
    type: SUBMIT_TOKEN_EXPIRE
  };
};
const actions_form_formSubmitted = () => {
  return {
    type: FORM_SUBMITTED
  };
};
// CONCATENATED MODULE: ./react/resetpass/store/actions/index.js

// CONCATENATED MODULE: ./react/resetpass/axios.js


const resetpass_axios_instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
resetpass_axios_instance.defaults.headers.common['authorization'] = 'authorization';
resetpass_axios_instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var resetpass_axios = (resetpass_axios_instance);
// CONCATENATED MODULE: ./react/resetpass/store/sagas/form.js



function* sagas_form_submitFormInitSaga(action) {
  yield Object(effects_["put"])(actions_form_submitFormStart());

  try {
    yield resetpass_axios.post('/forget/reset', action.formData);
    yield Object(effects_["put"])(actions_form_formSubmitted());
  } catch (err) {
    yield Object(effects_["put"])(actions_form_submitFormFail(err.response.data.msg));

    if (err.response.data.expire) {
      Object(effects_["delay"])(1000);
      yield Object(effects_["put"])(form_submitTokenExpire());
    }
  }
}
// CONCATENATED MODULE: ./react/resetpass/store/sagas/index.js



function* store_sagas_watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(SUBMIT_FORM_INIT, sagas_form_submitFormInitSaga)]);
}
// CONCATENATED MODULE: ./react/resetpass/store.js






const resetpass_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function resetpass_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: resetpass_store_reducers_auth,
    form: resetpass_store_reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, resetpass_store_bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(store_sagas_watchForm);
  return store;
}

/* harmony default export */ var resetpass_store = (resetpass_store_configureStore);
// CONCATENATED MODULE: ./react/forgetpassword/store/reducers/auth.js
const forgetpassword_store_reducers_auth_initialState = {
  userID: 'user_id'
};

const forgetpassword_store_reducers_auth_reducer = (state = forgetpassword_store_reducers_auth_initialState, action) => {
  return state;
};

/* harmony default export */ var forgetpassword_store_reducers_auth = (forgetpassword_store_reducers_auth_reducer);
// CONCATENATED MODULE: ./react/forgetpassword/store/actions/actionTypes.js
const actionTypes_SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const actionTypes_SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const actionTypes_SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const actionTypes_SUBMIT_FORM = 'SUBMIT_FORM';
const actionTypes_FORM_SUBMITTED = 'FORM_SUBMITTED';
// CONCATENATED MODULE: ./react/forgetpassword/shared/utility.js
function shared_utility_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function shared_utility_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { shared_utility_ownKeys(Object(source), true).forEach(function (key) { shared_utility_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { shared_utility_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function shared_utility_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const utility_updateObject = (oldObject, updatedProperties) => {
  return shared_utility_objectSpread({}, oldObject, {}, updatedProperties);
};
const utility_checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};
// CONCATENATED MODULE: ./react/forgetpassword/store/reducers/form.js


const forgetpassword_store_reducers_form_initialState = {
  submitError: null,
  submitted: false,
  start: true
};

const store_reducers_form_submitFormStart = (state, action) => {
  return utility_updateObject(state, {
    submitError: null,
    start: false
  });
};

const store_reducers_form_submitFormFail = (state, action) => {
  return utility_updateObject(state, {
    submitError: {
      message: action.err
    },
    start: true
  });
};

const store_reducers_form_formSubmitted = (state, action) => {
  return utility_updateObject(state, {
    submitted: true,
    start: true
  });
};

const forgetpassword_store_reducers_form_reducer = (state = forgetpassword_store_reducers_form_initialState, action) => {
  switch (action.type) {
    case actionTypes_SUBMIT_FORM_START:
      return store_reducers_form_submitFormStart(state, action);

    case actionTypes_SUBMIT_FORM_FAIL:
      return store_reducers_form_submitFormFail(state, action);

    case actionTypes_FORM_SUBMITTED:
      return store_reducers_form_formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var forgetpassword_store_reducers_form = (forgetpassword_store_reducers_form_reducer);
// CONCATENATED MODULE: ./react/forgetpassword/store/actions/form.js

const form_submitFormInit = formData => {
  return {
    type: actionTypes_SUBMIT_FORM_INIT,
    formData
  };
};
const store_actions_form_submitFormFail = err => {
  return {
    type: actionTypes_SUBMIT_FORM_FAIL,
    err
  };
};
const store_actions_form_submitFormStart = () => {
  return {
    type: actionTypes_SUBMIT_FORM_START
  };
};
const store_actions_form_formSubmitted = () => {
  return {
    type: actionTypes_FORM_SUBMITTED
  };
};
// CONCATENATED MODULE: ./react/forgetpassword/store/actions/index.js

// CONCATENATED MODULE: ./react/forgetpassword/axios.js


const forgetpassword_axios_instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
forgetpassword_axios_instance.defaults.headers.common['authorization'] = 'authorization';
forgetpassword_axios_instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var forgetpassword_axios = (forgetpassword_axios_instance);
// CONCATENATED MODULE: ./react/forgetpassword/store/sagas/form.js



function* store_sagas_form_submitFormInitSaga(action) {
  yield Object(effects_["put"])(store_actions_form_submitFormStart());

  try {
    yield forgetpassword_axios.post('/forget/password', action.formData);
    yield Object(effects_["put"])(store_actions_form_formSubmitted());
  } catch (err) {
    let error = null;

    if (err.response) {
      if (err.response.data && err.response.data.keyValue) {
        for (let key in err.response.data.keyValue) {
          if (key === 'email') {
            error = `${key}  already taken`;
          } else if (key === 'username') {
            error = `${key} already taken`;
          } else {
            error = err.message;
          }
        }
      } else {
        error = typeof err.response.data !== 'object' ? err.response.data : 'Connection Error';
      }
    } else {
      error = err.message;
    }

    yield Object(effects_["put"])(store_actions_form_submitFormFail(error));
  }
}
// CONCATENATED MODULE: ./react/forgetpassword/store/sagas/index.js



function* forgetpassword_store_sagas_watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes_SUBMIT_FORM_INIT, store_sagas_form_submitFormInitSaga)]);
}
// CONCATENATED MODULE: ./react/forgetpassword/store.js






const forgetpassword_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function forgetpassword_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: forgetpassword_store_reducers_auth,
    form: forgetpassword_store_reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, forgetpassword_store_bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(forgetpassword_store_sagas_watchForm);
  return store;
}

/* harmony default export */ var forgetpassword_store = (forgetpassword_store_configureStore);
// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__("ZSx1");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// CONCATENATED MODULE: ./react/addgroup/store/actions/actionTypes.js
const CHECK_AUTH_INIT = 'CHECK_AUTH_INIT';
const CHECK_AUTH = 'CHECK_AUTH';
const CHECK_USERIMG = 'CHECK_USERIMG';
const CHECK_USERNAME = 'CHECK_USERNAME';
const HEADER_FORM_EXPAND = 'HEADER_FORM_EXPAND';
const HEADER_FORM_SM = 'HEADER_FORM_SM';
const HEADER_NAV_DEFAULT = 'HEADER_NAV_DEFAULT';
const HEADER_FILTER_INIT = 'HEADER_FILTER_INIT';
const HEADER_FILTER_START = 'HEADER_FILTER_START';
const HEADER_FILTER_FAIL = 'HEADER_FILTER_FAIL';
const HEADER_FILTER = 'HEADER_FILTER';
const HEADER_FILTER_CLOSE = 'HEADER_FILTER_CLOSE';
const HEADER_ADD_NEW = 'HEADER_ADD_NEW';
const FETCH_NOTIFY_INIT = 'FETCH_NOTIFY_INIT';
const FETCH_NOTIFY_START = 'FETCH_NOTIFY_START';
const FETCH_NOTIFY_SUCCESS = 'FETCH_NOTIFY_SUCCESS';
const FETCH_NOTIFY_FAIL = 'FETCH_NOTIFY_FAIL';
const FETCH_NOTIFY = 'FETCH_NOTIFY';
const CHANGE_FAVORITE_NOTIFY_INIT = 'CHANGE_FAVORITE_NOTIFY_INIT';
const CHANGE_FAVORITE_NOTIFY_START = 'CHANGE_FAVORITE_NOTIFY_START';
const CHANGE_FAVORITE_NOTIFY_FAIL = 'CHANGE_FAVORITE_NOTIFY_FAIL';
const CHANGE_FAVORITE_NOTIFY = 'CHANGE_FAVORITE_NOTIFY';
const SHOW_NAV_LIST = 'SHOW_NAV_LIST';
const FETCH_NAVLIST_INIT = 'FETCH_NAVLIST_INIT';
const FETCH_NAVLIST_START = 'FETCH_NAVLIST_START';
const FETCH_NAVLIST_SUCCESS = 'FETCH_NAVLIST_SUCCESS';
const FETCH_NAVLIST_FAIL = 'FETCH_NAVLIST_FAIL';
const FETCH_NAVLIST = 'FETCH_NAVLIST';
const SHOW_USER_OPTION = 'SHOW_USER_OPTION';
const FETCH_SHARE_ACTIVE_INIT = 'FETCH_SHARE_ACTIVE_INIT';
const FETCH_SHARE_ACTIVE = 'FETCH_SHARE_ACTIVE';
const RESET_ACTIVE_INIT = 'RESET_ACTIVE_INIT';
const RESET_ACTIVE = 'RESET_ACTIVE';
const FETCH_NOTIFY_ACTIVE_INIT = 'FETCH_NOTIFY_ACTIVE_INIT';
const FETCH_NOTIFY_ACTIVE = 'FETCH_NOTIFY_ACTIVE';
const DEFAULT_NOTIFYACTIVE_INIT = 'DEFAULT_NOTIFYACTIVE_INIT';
const DEFAULT_NOTIFYACTIVE = 'DEFAULT_NOTIFYACTIVE';
const FETCH_CATEG_INIT = 'FETCH_CATEG_INIT';
const FETCH_CATEG_START = 'FETCH_CATEG_START';
const FETCH_CATEG_FAIL = 'FETCH_CATEG_FAIL';
const FETCH_CATEG_RESET = 'FETCH_CATEG_RESET';
const FETCH_CATEG = 'FETCH_CATEG';
const ADD_CATEG_INIT = 'ADD_CATEG_INIT';
const ADD_CATEG = 'ADD_CATEG';
const HIDE_MEDIA_BOX = 'HIDE_MEDIA_BOX';
const SHOW_MEDIA_BOX = 'SHOW_MEDIA_BOX';
const CHECK_LINK_INIT = 'CHECK_LINK_INIT';
const CHECK_LINK = 'CHECK_LINK';
const RESET_LINK = 'RESET_LINK';
const ADD_SNAPSHOT = 'ADD_SNAPSHOT';
const REMOVE_SNAPSHOT = 'REMOVE_SNAPSHOT';
const SUBMIT_MEDIA = 'SUBMIT_MEDIA';
const FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const RESET_TAB = 'RESET_TAB';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const FETCH_USERS = 'FETCH_USERS';
const INPUT_DEFAULT_VALUE = 'INPUT_DEFAULT_VALUE';
const FILTER_USER_INIT = 'FILTER_USER_INIT';
const FILTER_USER = 'FILTER_USER';
const USER_SELECT = 'USER_SELECT';
const REMOVE_MEDIA = 'REMOVE_MEDIA';
const SHOW_USER_SELECT_INIT = 'SHOW_USER_SELECT_INIT';
const SHOW_USER_SELECT = 'SHOW_USER_SELECT';
const actions_actionTypes_SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const actions_actionTypes_SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
const actions_actionTypes_SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const actions_actionTypes_SUBMIT_FORM = 'SUBMIT_FORM';
const actions_actionTypes_FORM_SUBMITTED = 'FORM_SUBMITTED';
const IMAGE_CAPTURE = 'IMAGE_CAPTURE';
// CONCATENATED MODULE: ./react/addgroup/shared/utility.js
function addgroup_shared_utility_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function addgroup_shared_utility_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { addgroup_shared_utility_ownKeys(Object(source), true).forEach(function (key) { addgroup_shared_utility_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { addgroup_shared_utility_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function addgroup_shared_utility_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const shared_utility_updateObject = (oldObject, updatedProperties) => {
  return addgroup_shared_utility_objectSpread({}, oldObject, {}, updatedProperties);
};
const transformNumber = favNumber => {
  const favNumArray = String(favNumber).split("");

  if (favNumArray.length === 4) {
    return `${favNumArray[0]}K`;
  }

  if (favNumArray.length === 5) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}K`;
  }

  if (favNumArray.length === 6) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}K`;
  }

  if (favNumArray.length === 7) {
    const favNum = favNumArray[0];
    return `${favNum}M`;
  }

  if (favNumArray.length === 8) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}M`;
  }

  if (favNumArray.length === 9) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}M`;
  }

  if (favNumArray.length === 10) {
    const favNum = favNumArray[0];
    return `${favNum}B`;
  }

  if (favNumArray.length === 11) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}B`;
  }

  return favNumber;
};
const transformString = val => {
  const curVal = String(val).substr(0, 115);
  return curVal;
};
function utility_changeFav(datas, dataID) {
  const dataArray = [...datas];
  let dtIndex;
  let dtArray = dataArray.filter((data, index) => {
    if (data.id === dataID) {
      dtIndex = index;
      return true;
    }

    return false;
  });

  if (dtArray.length > 0) {
    let data = dtArray[0];
    data = shared_utility_updateObject(data, {
      liked: !data.liked
    });

    if (data.liked) {
      data = shared_utility_updateObject(data, {
        favorite: data.favorite + 1
      });
    } else {
      data = shared_utility_updateObject(data, {
        favorite: data.favorite - 1
      });
    }

    const updateDataArray = [...dataArray];
    updateDataArray[dtIndex] = data;
    let updateStartArray = [...updateDataArray];
    data = shared_utility_updateObject(data, {
      changeFavActive: data.liked
    });
    updateStartArray[dtIndex] = data;
    return {
      updateStartArray,
      updateDataArray
    };
  }

  return dataArray;
}
;
const shared_utility_checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};
const dataURLtoBlob = dataurl => {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {
    type: mime
  });
};
const getImageURL = image => {
  let canvas = document.createElement('canvas');
  return new Promise((resolve, reject) => {
    if (canvas.getContext) {
      canvas.width = image.videoWidth;
      canvas.height = image.videoHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
      let snapShot = canvas.toDataURL('image/png');
      resolve(snapShot);
      ;
    } else {
      reject('Please update your Browser');
    }
  });
};
// CONCATENATED MODULE: ./react/addgroup/store/reducers/auth.js


const addgroup_store_reducers_auth_initialState = {
  status: false,
  img: null,
  username: null
};

const auth_checkAuth = (state, action) => {
  return shared_utility_updateObject(state, {
    status: action.status
  });
};

const auth_checkUserImg = (state, action) => {
  return shared_utility_updateObject(state, {
    img: action.img
  });
};

const auth_checkUserName = (state, action) => {
  return shared_utility_updateObject(state, {
    username: action.name
  });
};

const addgroup_store_reducers_auth_reducer = (state = addgroup_store_reducers_auth_initialState, action) => {
  switch (action.type) {
    case CHECK_AUTH:
      return auth_checkAuth(state, action);

    case CHECK_USERIMG:
      return auth_checkUserImg(state, action);

    case CHECK_USERNAME:
      return auth_checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var addgroup_store_reducers_auth = (addgroup_store_reducers_auth_reducer);
// CONCATENATED MODULE: ./react/addgroup/store/reducers/header.js


const reducers_header_initialState = {
  expand: false,
  hideFormSm: false,
  addNew: false,
  notify: null,
  hidNotify: false,
  navList: null,
  navListCateg: null,
  hidNavList: false,
  hidUserOption: false,
  notifyActive: null,
  default: false,
  searchCnt: null,
  filterPos: 0,
  filterLastPos: 0,
  searchCntErr: null,
  filterStart: false
};

const header_formExpand = (state, action) => {
  return shared_utility_updateObject(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const header_formSm = (state, action) => {
  return shared_utility_updateObject(state, {
    hideFormSm: false,
    default: false
  });
};

const header_navDefault = (state, action) => {
  return shared_utility_updateObject(state, {
    expand: false,
    hideFormSm: true,
    addNew: false,
    hidNotify: true,
    hidNavList: true,
    hidUserOption: true,
    default: true
  });
};

const header_addNew = (state, action) => {
  return shared_utility_updateObject(state, {
    addNew: !state.addNew,
    default: false
  });
};

const header_fetchNotify = (state, action) => {
  return shared_utility_updateObject(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const header_fetchNotifyStart = (state, action) => {
  return shared_utility_updateObject(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const header_changeFavNotifyStart = (state, action) => {
  return shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const header_changeFavNotify = (state, action) => {
  return shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const header_showNavList = (state, action) => {
  return shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const header_fetchNavListStart = (state, action) => {
  return shared_utility_updateObject(state, {
    navList: null,
    navListCateg: null
  });
};

const header_fetchNavList = (state, action) => {
  return shared_utility_updateObject(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const header_showUserOption = (state, action) => {
  return shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const header_fetchNotifyActive = (state, action) => {
  return shared_utility_updateObject(state, {
    notifyActive: action.notifyActive
  });
};

const header_defaultNotifyActive = (state, action) => {
  return shared_utility_updateObject(state, {
    notifyActive: null
  });
};

const header_headerFilterStart = (state, action) => {
  return shared_utility_updateObject(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const header_headerFilterFail = (state, action) => {
  return shared_utility_updateObject(state, {
    searchCntErr: action.searchCntErr
  });
};

const header_headerFilter = (state, action) => {
  return shared_utility_updateObject(state, {
    searchCnt: action.searchCnt
  });
};

const header_headerFilterClose = (state, action) => {
  return shared_utility_updateObject(state, {
    searchCnt: null,
    filterStart: false
  });
};

const reducers_header_reducer = (state = reducers_header_initialState, action) => {
  switch (action.type) {
    case HEADER_FORM_EXPAND:
      return header_formExpand(state, action);

    case HEADER_FORM_SM:
      return header_formSm(state, action);

    case HEADER_NAV_DEFAULT:
      return header_navDefault(state, action);

    case HEADER_ADD_NEW:
      return header_addNew(state, action);

    case FETCH_NOTIFY_START:
      return header_fetchNotifyStart(state, action);

    case FETCH_NOTIFY:
      return header_fetchNotify(state, action);

    case CHANGE_FAVORITE_NOTIFY_START:
      return header_changeFavNotifyStart(state, action);

    case CHANGE_FAVORITE_NOTIFY:
      return header_changeFavNotify(state, action);

    case SHOW_NAV_LIST:
      return header_showNavList(state, action);

    case FETCH_NAVLIST_START:
      return header_fetchNavListStart(state, action);

    case FETCH_NAVLIST:
      return header_fetchNavList(state, action);

    case SHOW_USER_OPTION:
      return header_showUserOption(state, action);

    case FETCH_NOTIFY_ACTIVE:
      return header_fetchNotifyActive(state, action);

    case DEFAULT_NOTIFYACTIVE:
      return header_defaultNotifyActive(state, action);

    case HEADER_FILTER_START:
      return header_headerFilterStart(state, action);

    case HEADER_FILTER_FAIL:
      return header_headerFilterFail(state, action);

    case HEADER_FILTER_CLOSE:
      return header_headerFilterClose(state, action);

    case HEADER_FILTER:
      return header_headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var reducers_header = (reducers_header_reducer);
// CONCATENATED MODULE: ./react/addgroup/store/reducers/form.js


const addgroup_store_reducers_form_initialState = {
  categ: null,
  showCateg: false,
  categErr: null,
  newCateg: null,
  hideMediaBox: false,
  hidAddItm: false,
  linkValid: null,
  snapshot: [],
  media: {},
  curTab: 'online',
  startUser: true,
  users: null,
  onlineUser: [],
  offlineUser: [],
  filteredUser: null,
  defaultValue: false,
  uploadPercent: null,
  submitError: null,
  submitForm: false,
  imageCapture: null,
  id: null
};

const fetchCategStart = (state, action) => {
  return shared_utility_updateObject(state, {
    showCateg: true,
    categErr: null
  });
};

const fetchCategFail = (state, action) => {
  return shared_utility_updateObject(state, {
    categErr: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const fetchCategReset = (state, action) => {
  return shared_utility_updateObject(state, {
    categErr: null,
    showCateg: false
  });
};

const form_fetchCateg = (state, action) => {
  return shared_utility_updateObject(state, {
    categ: action.categ,
    showCateg: action.categ !== null
  });
};

const addCateg = (state, action) => {
  return shared_utility_updateObject(state, {
    newCateg: action.categ
  });
};

const checkLink = (state, action) => {
  return shared_utility_updateObject(state, {
    linkValid: {
      err: action.err,
      media: action.media
    }
  });
};

const resetLink = (state, action) => {
  return shared_utility_updateObject(state, {
    linkValid: null
  });
};

const addSnapshot = (state, action) => {
  return shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const removeSnapshot = (state, action) => {
  return shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const removeMedia = (state, action) => {
  return shared_utility_updateObject(state, {
    media: action.media
  });
};

const form_imageCapture = (state, action) => {
  return shared_utility_updateObject(state, {
    imageCapture: action.imageCapture
  });
};

const submitMedia = (state, action) => {
  return shared_utility_updateObject(state, {
    media: action.media,
    hideMediaBox: true
  });
};

const hideMediaBox = (state, action) => {
  return shared_utility_updateObject(state, {
    hideMediaBox: true
  });
};

const showMediaBox = (state, action) => {
  return shared_utility_updateObject(state, {
    hideMediaBox: false
  });
};

const form_fetchUsers = (state, action) => {
  return shared_utility_updateObject(state, {
    users: action.users,
    filteredUser: null,
    startUser: false,
    defaultValue: true,
    onlineUser: action.status === 'online' ? action.users : state.onlineUser,
    offlineUser: action.status === 'offline' ? action.users : state.offlineUser,
    curTab: action.status
  });
};

const fetchUsersFail = (state, action) => {
  return shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const resetTab = (state, action) => {
  return shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const inputDefaultValue = (state, action) => {
  return shared_utility_updateObject(state, {
    defaultValue: false
  });
};

const form_filterUser = (state, action) => {
  return shared_utility_updateObject(state, {
    filteredUser: action.users
  });
};

const form_userSelect = (state, action) => {
  return shared_utility_updateObject(state, {
    media: action.users
  });
};

const showUserSelect = (state, action) => {
  return shared_utility_updateObject(state, {
    users: action.users,
    curTab: 'userSelect',
    filteredUser: null,
    defaultValue: true
  });
};

const addgroup_store_reducers_form_submitFormStart = (state, action) => {
  return shared_utility_updateObject(state, {
    submitForm: true,
    submitError: null,
    submitFiles: 0
  });
};

const submitFormSuccess = (state, action) => {
  return shared_utility_updateObject(state, {
    uploadPercent: action.uploadPercent
  });
};

const addgroup_store_reducers_form_submitFormFail = (state, action) => {
  return shared_utility_updateObject(state, {
    submitError: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const addgroup_store_reducers_form_formSubmitted = (state, action) => {
  return shared_utility_updateObject(state, {
    id: action.id
  });
};

const addgroup_store_reducers_form_reducer = (state = addgroup_store_reducers_form_initialState, action) => {
  switch (action.type) {
    case FETCH_CATEG_START:
      return fetchCategStart(state, action);

    case FETCH_CATEG_FAIL:
      return fetchCategFail(state, action);

    case FETCH_CATEG_RESET:
      return fetchCategReset(state, action);

    case FETCH_CATEG:
      return form_fetchCateg(state, action);

    case ADD_CATEG:
      return addCateg(state, action);

    case HIDE_MEDIA_BOX:
      return hideMediaBox(state, action);

    case SHOW_MEDIA_BOX:
      return showMediaBox(state, action);

    case CHECK_LINK:
      return checkLink(state, action);

    case RESET_LINK:
      return resetLink(state, action);

    case ADD_SNAPSHOT:
      return addSnapshot(state, action);

    case REMOVE_SNAPSHOT:
      return removeSnapshot(state, action);

    case IMAGE_CAPTURE:
      return form_imageCapture(state, action);

    case REMOVE_MEDIA:
      return removeMedia(state, action);

    case SUBMIT_MEDIA:
      return submitMedia(state, action);

    case FETCH_USERS:
      return form_fetchUsers(state, action);

    case FETCH_USERS_FAIL:
      return fetchUsersFail(state, action);

    case RESET_TAB:
      return resetTab(state, action);

    case INPUT_DEFAULT_VALUE:
      return inputDefaultValue(state, action);

    case FILTER_USER:
      return form_filterUser(state, action);

    case USER_SELECT:
      return form_userSelect(state, action);

    case SHOW_USER_SELECT:
      return showUserSelect(state, action);

    case actions_actionTypes_SUBMIT_FORM_START:
      return addgroup_store_reducers_form_submitFormStart(state, action);

    case SUBMIT_FORM_SUCCESS:
      return submitFormSuccess(state, action);

    case actions_actionTypes_SUBMIT_FORM_FAIL:
      return addgroup_store_reducers_form_submitFormFail(state, action);

    case actions_actionTypes_FORM_SUBMITTED:
      return addgroup_store_reducers_form_formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var addgroup_store_reducers_form = (addgroup_store_reducers_form_reducer);
// CONCATENATED MODULE: ./react/addgroup/store/reducers/main.js
function main_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function main_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { main_ownKeys(Object(source), true).forEach(function (key) { main_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { main_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function main_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const reducers_main_initialState = {
  shareActive: null
};

const main_fetchShareActive = (state, action) => {
  return shared_utility_updateObject(state, {
    shareActive: action.shareActive
  });
};

const main_resetActive = (state, action) => {
  let reset = action.curTab === 'post' ? {
    ptActive: null
  } : {
    shareActive: null
  };
  return shared_utility_updateObject(state, main_objectSpread({}, reset));
};

const reducers_main_reducer = (state = reducers_main_initialState, action) => {
  switch (action.type) {
    case FETCH_SHARE_ACTIVE:
      return main_fetchShareActive(state, action);

    case RESET_ACTIVE:
      return main_resetActive(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var reducers_main = (reducers_main_reducer);
// CONCATENATED MODULE: ./react/addgroup/store/actions/auth.js

const checkAuthInit = () => {
  return {
    type: CHECK_AUTH_INIT
  };
};
const actions_auth_checkAuth = status => {
  return {
    type: CHECK_AUTH,
    status
  };
};
const actions_auth_checkUserImg = img => {
  return {
    type: CHECK_USERIMG,
    img
  };
};
const actions_auth_checkUserName = name => {
  return {
    type: CHECK_USERNAME,
    name
  };
};
// CONCATENATED MODULE: ./react/addgroup/store/actions/header.js

const headerFormExpand = () => {
  return {
    type: HEADER_FORM_EXPAND
  };
};
const headerFormSm = () => {
  return {
    type: HEADER_FORM_SM
  };
};
const headerNavDefault = () => {
  return {
    type: HEADER_NAV_DEFAULT
  };
};
const headerAddNew = () => {
  return {
    type: HEADER_ADD_NEW
  };
};
const fetchNotifyInit = () => {
  return {
    type: FETCH_NOTIFY_INIT
  };
};
const actions_header_fetchNotifyStart = () => {
  return {
    type: FETCH_NOTIFY_START
  };
};
const fetchNotifySuccess = () => {
  return {
    type: FETCH_NOTIFY_SUCCESS
  };
};
const fetchNotifyFail = err => {
  return {
    type: FETCH_NOTIFY_FAIL,
    err
  };
};
const actions_header_fetchNotify = notify => {
  return {
    type: FETCH_NOTIFY,
    notify
  };
};
const changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: CHANGE_FAVORITE_NOTIFY_INIT,
    notify,
    notifyID
  };
};
const actions_header_changeFavNotifyStart = notify => {
  return {
    type: CHANGE_FAVORITE_NOTIFY_START,
    notify
  };
};
const changeFavNotifyFail = notify => {
  return {
    type: CHANGE_FAVORITE_NOTIFY_FAIL,
    notify
  };
};
const actions_header_changeFavNotify = notify => {
  return {
    type: CHANGE_FAVORITE_NOTIFY,
    notify
  };
};
const actions_header_showNavList = () => {
  return {
    type: SHOW_NAV_LIST
  };
};
const fetchNavlistInit = category => {
  return {
    type: FETCH_NAVLIST_INIT,
    category
  };
};
const fetchNavlistStart = () => {
  return {
    type: FETCH_NAVLIST_START
  };
};
const fetchNavlist = (category, navList) => {
  return {
    type: FETCH_NAVLIST,
    category,
    navList
  };
};
const actions_header_showUserOption = () => {
  return {
    type: SHOW_USER_OPTION
  };
};
const fetchNotifyactiveInit = userID => {
  return {
    type: FETCH_NOTIFY_ACTIVE_INIT,
    userID
  };
};
const actions_header_fetchNotifyActive = notifyActive => {
  return {
    type: FETCH_NOTIFY_ACTIVE,
    notifyActive
  };
};
const defaultNotifyactiveInit = () => {
  return {
    type: DEFAULT_NOTIFYACTIVE_INIT
  };
};
const actions_header_defaultNotifyActive = () => {
  return {
    type: DEFAULT_NOTIFYACTIVE
  };
};
const headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: HEADER_FILTER_INIT,
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const actions_header_headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: HEADER_FILTER_START,
    filterPos,
    filterLastPos
  };
};
const actions_header_headerFilterFail = searchCntErr => {
  return {
    type: HEADER_FILTER_FAIL,
    searchCntErr
  };
};
const actions_header_headerFilter = searchCnt => {
  return {
    type: HEADER_FILTER,
    searchCnt
  };
};
const actions_header_headerFilterClose = () => {
  return {
    type: HEADER_FILTER_CLOSE
  };
};
// CONCATENATED MODULE: ./react/addgroup/store/actions/main.js

const fetchShareactiveInit = userID => {
  return {
    type: FETCH_SHARE_ACTIVE_INIT,
    userID
  };
};
const actions_main_fetchShareActive = shareActive => {
  return {
    type: FETCH_SHARE_ACTIVE,
    shareActive
  };
};
const resetActiveInit = (userID, curTab) => {
  return {
    type: RESET_ACTIVE_INIT,
    userID,
    curTab
  };
};
const actions_main_resetActive = curTab => {
  return {
    type: RESET_ACTIVE,
    curTab
  };
};
// CONCATENATED MODULE: ./react/addgroup/store/actions/form.js

const fetchCategInit = () => {
  return {
    type: FETCH_CATEG_INIT
  };
};
const form_fetchCategStart = () => {
  return {
    type: FETCH_CATEG_START
  };
};
const form_fetchCategFail = err => {
  return {
    type: FETCH_CATEG_FAIL,
    err
  };
};
const form_fetchCategReset = () => {
  return {
    type: FETCH_CATEG_RESET
  };
};
const actions_form_fetchCateg = categ => {
  return {
    type: FETCH_CATEG,
    categ
  };
};
const addCategInit = categ => {
  return {
    type: ADD_CATEG_INIT,
    categ
  };
};
const form_addCateg = categ => {
  return {
    type: ADD_CATEG,
    categ
  };
};
const checkLinkInit = (link, mediaType) => {
  return {
    type: CHECK_LINK_INIT,
    link,
    mediaType
  };
};
const form_checkLink = (err, media) => {
  return {
    type: CHECK_LINK,
    err,
    media
  };
};
const form_resetLink = () => {
  return {
    type: RESET_LINK
  };
};
const form_addSnapshot = snapshot => {
  return {
    type: ADD_SNAPSHOT,
    snapshot
  };
};
const form_removeSnapshot = snapshot => {
  return {
    type: REMOVE_SNAPSHOT,
    snapshot
  };
};
const form_removeMedia = media => {
  return {
    type: REMOVE_MEDIA,
    media
  };
};
const form_submitMedia = media => {
  return {
    type: SUBMIT_MEDIA,
    media
  };
};
const form_hideMediaBox = () => {
  return {
    type: HIDE_MEDIA_BOX
  };
};
const form_showMediaBox = () => {
  return {
    type: SHOW_MEDIA_BOX
  };
};
const fetchUsersInit = userStatus => {
  return {
    type: FETCH_USERS_INIT,
    userStatus
  };
};
const actions_form_fetchUsers = (users, status) => {
  return {
    type: FETCH_USERS,
    users,
    status
  };
};
const form_fetchUsersFail = err => {
  return {
    type: FETCH_USERS_FAIL,
    err
  };
};
const form_resetTab = () => {
  return {
    type: RESET_TAB
  };
};
const form_inputDefaultValue = () => {
  return {
    type: INPUT_DEFAULT_VALUE
  };
};
const filterUserInit = (users, filterContent) => {
  return {
    type: FILTER_USER_INIT,
    users,
    filterContent
  };
};
const actions_form_filterUser = users => {
  return {
    type: FILTER_USER,
    users
  };
};
const actions_form_userSelect = users => {
  return {
    type: USER_SELECT,
    users
  };
};
const showUserSelectInit = (users, userID) => {
  return {
    type: SHOW_USER_SELECT_INIT,
    users,
    userID
  };
};
const form_showUserSelect = users => {
  return {
    type: SHOW_USER_SELECT,
    users
  };
};
const actions_form_submitFormInit = formData => {
  return {
    type: actions_actionTypes_SUBMIT_FORM_INIT,
    formData
  };
};
const addgroup_store_actions_form_submitFormFail = err => {
  return {
    type: actions_actionTypes_SUBMIT_FORM_FAIL,
    err
  };
};
const form_submitFormSuccess = uploadPercent => {
  return {
    type: SUBMIT_FORM_SUCCESS,
    uploadPercent
  };
};
const addgroup_store_actions_form_submitFormStart = () => {
  return {
    type: actions_actionTypes_SUBMIT_FORM_START
  };
};
const submitForm = () => {
  return {
    type: actions_actionTypes_SUBMIT_FORM
  };
};
const addgroup_store_actions_form_formSubmitted = id => {
  return {
    type: actions_actionTypes_FORM_SUBMITTED,
    id
  };
};
const groupImage = imageCapture => {
  return {
    type: IMAGE_CAPTURE,
    imageCapture
  };
};
// CONCATENATED MODULE: ./react/addgroup/axios.js


const addgroup_axios_instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
addgroup_axios_instance.defaults.headers.common['authorization'] = 'authorization';
addgroup_axios_instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var addgroup_axios = (addgroup_axios_instance);
// CONCATENATED MODULE: ./react/addgroup/store/thunk/submit.js


const submit_submit = formData => {
  return dispatch => {
    dispatch(addgroup_store_actions_form_submitFormStart());
    let formContent = new FormData();

    for (let key in formData) {
      if (key !== 'video' && key !== 'image') {
        formContent.append(key, formData[key]);
      }

      if (key === 'video' && formData[key].length > 0) {
        for (let video of formData[key]) {
          let ext = video.file.type.split('/').pop();
          formContent.append(key, video.file, `${video.id}.${ext}`);
        }
      }

      if (key === 'image' && formData[key].length > 0) {
        for (let image of formData[key]) {
          let ext = image.imageCapture.type.split('/').pop();
          formContent.append(key, image.imageCapture, `${image.id}.${ext}`);
        }
      }
    }

    addgroup_axios.post('/add/group', formContent, {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.lengthComputable) {
          const percentage = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          dispatch(form_submitFormSuccess(percentage));
        }
      }
    }).then(res => {
      dispatch(addgroup_store_actions_form_formSubmitted(res.data));
    }).catch(err => {
      dispatch(addgroup_store_actions_form_submitFormFail(err));
    });
  };
};
// CONCATENATED MODULE: ./react/addgroup/store/actions/index.js





// CONCATENATED MODULE: ./react/addgroup/store/sagas/auth.js



function* auth_checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(effects_["put"])(actions_auth_checkAuth(true));

    try {
      let response = yield addgroup_axios.post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(effects_["put"])(actions_auth_checkUserImg(response.data.url));
      } else {
        yield Object(effects_["put"])(actions_auth_checkUserName(response.data.name));
      }
    } catch (err) {}
  }
}
// CONCATENATED MODULE: ./react/addgroup/store/sagas/header.js




function* header_fetchNotifyInitSaga(action) {
  try {
    yield Object(effects_["put"])(actions_header_fetchNotifyStart());
    let response = yield addgroup_axios.post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(actions_header_fetchNotify(response.data.coll));
    } else {
      yield Object(effects_["put"])(actions_header_fetchNotify([]));
    }
  } catch (err) {
    yield Object(effects_["put"])(fetchNotifyFail(err));
  }
}
function* header_changeFavNotifySaga(action) {
  let notify = utility_changeFav(action.notify, action.notifyID);
  yield Object(effects_["put"])(actions_header_changeFavNotifyStart(notify.updateStartArray));
  yield Object(effects_["put"])(actions_header_changeFavNotify(notify.updateDataArray));
}
function* header_fetchNavlistInitSaga(action) {
  try {
    yield Object(effects_["put"])(fetchNavlistStart());
    let response = yield addgroup_axios.post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(effects_["put"])(fetchNavlist(action.category, response.data));
  } catch (e) {}
}
function* header_fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield addgroup_axios.post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(actions_header_fetchNotifyActive(response.data.collTotal));
    }

    ;
  } catch (err) {}
}
function* header_defaultNotifyActiveInitSaga(action) {
  try {
    yield addgroup_axios.post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(effects_["put"])(actions_header_defaultNotifyActive());
  } catch (err) {}
}
function* header_headerFilterInitSaga(action) {
  try {
    yield Object(effects_["put"])(actions_header_headerFilterStart(action.filterPos, action.filterLastPos));
    let response = yield addgroup_axios.post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(effects_["put"])(actions_header_headerFilter(response.data));
  } catch (err) {
    yield Object(effects_["put"])(actions_header_headerFilterFail(err));
  }
}
// CONCATENATED MODULE: ./react/addgroup/store/sagas/main.js



function* main_fetchShareActiveInitSaga(action) {
  try {
    let response = yield addgroup_axios.post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });

    if (response.data > 0) {
      yield Object(effects_["put"])(actions_main_fetchShareActive(response.data));
    }

    return;
  } catch (err) {}
}
function* main_resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'share') {
      yield addgroup_axios.patch('/header', {
        userID: action.userID
      }, {
        headers: {
          'data-categ': action.curTab
        }
      });
    }

    yield Object(effects_["put"])(actions_main_resetActive(action.curTab));
  } catch (err) {}
}
// CONCATENATED MODULE: ./react/addgroup/store/sagas/form.js




function* form_fetchCategInitSaga(action) {
  try {
    yield Object(effects_["put"])(form_fetchCategStart());
    const category = yield addgroup_axios.post('/group', null, {
      headers: {
        'data-categ': 'groupCateg'
      }
    });
    const categ = category.data && category.data.length > 0 ? category.data : null;
    yield Object(effects_["put"])(actions_form_fetchCateg(categ));
  } catch (err) {
    yield Object(effects_["put"])(form_fetchCategFail(err));
    yield Object(effects_["delay"])(2000);
    yield Object(effects_["put"])(form_fetchCategReset());
  }
}
function* addCategInitSaga(action) {
  let categs = String(action.categ).split(',');
  let transformCateg = [];

  for (let categ of categs) {
    transformCateg.push(String(categ).trim().charAt(0).toUpperCase() + String(categ).trim().toLowerCase().slice(1));
  }

  let removeDuplicate = [...new Set(transformCateg)];
  yield Object(effects_["put"])(form_addCateg(removeDuplicate));
}
function* checkLinkInitSaga(action) {
  let link = String(action.link).trim();

  try {
    let response = yield external_axios_default.a.get(link, {
      responseType: 'blob',
      timeout: 8000
    });

    if (response.data.type.startsWith(action.mediaType + '/')) {
      yield Object(effects_["put"])(form_checkLink(null, {
        file: response.data,
        url: window.URL.createObjectURL(response.data)
      }));
      return;
    }

    throw new Error(`Unknown format, Only ${action.mediaType} files`);
  } catch (err) {
    yield Object(effects_["put"])(form_checkLink(err, null));
  }
}
function* form_fetchUsersInitSaga(action) {
  try {
    let response = yield addgroup_axios.post('/users', null, {
      headers: {
        'data-categ': `allteacher-${action.userStatus}`
      }
    });
    yield Object(effects_["put"])(actions_form_fetchUsers(response.data, action.userStatus));
  } catch (err) {
    yield Object(effects_["put"])(form_fetchUsersFail(err));
  }
}
function* form_filterUserInitSaga(action) {
  let filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);

  if (!action.filterContent && action.users && action.users.length > 0) {
    filterUser = [...action.users];
  }

  yield Object(effects_["put"])(actions_form_filterUser(filterUser));
}
function* showUserSelectInitSaga(action) {
  let filterUser = action.users.filter(user => action.userID.indexOf(user.id) !== -1);
  yield Object(effects_["put"])(form_showUserSelect(filterUser));
}
// CONCATENATED MODULE: ./react/addgroup/store/sagas/index.js






function* sagas_watchAuth() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(CHECK_AUTH_INIT, auth_checkAuthInitSaga)]);
}
function* sagas_watchHeader() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(FETCH_NOTIFY_INIT, header_fetchNotifyInitSaga), Object(effects_["takeEvery"])(CHANGE_FAVORITE_NOTIFY_INIT, header_changeFavNotifySaga), Object(effects_["takeEvery"])(FETCH_NAVLIST_INIT, header_fetchNavlistInitSaga), Object(effects_["takeEvery"])(FETCH_NOTIFY_ACTIVE_INIT, header_fetchNotifyActiveInitSaga), Object(effects_["takeEvery"])(DEFAULT_NOTIFYACTIVE_INIT, header_defaultNotifyActiveInitSaga), Object(effects_["takeEvery"])(FETCH_SHARE_ACTIVE_INIT, main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(HEADER_FILTER_INIT, header_headerFilterInitSaga)]);
}
function* addgroup_store_sagas_watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(FETCH_CATEG_INIT, form_fetchCategInitSaga), Object(effects_["takeEvery"])(ADD_CATEG_INIT, addCategInitSaga), Object(effects_["takeEvery"])(CHECK_LINK_INIT, checkLinkInitSaga), Object(effects_["takeEvery"])(FETCH_USERS_INIT, form_fetchUsersInitSaga), Object(effects_["takeEvery"])(FILTER_USER_INIT, form_filterUserInitSaga), Object(effects_["takeEvery"])(SHOW_USER_SELECT_INIT, showUserSelectInitSaga)]);
}
function* sagas_watchMain() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(FETCH_SHARE_ACTIVE_INIT, main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(RESET_ACTIVE_INIT, main_resetActiveInitSaga)]);
}
function* sagas_rootSaga() {
  yield Object(effects_["all"])([sagas_watchAuth(), sagas_watchHeader(), addgroup_store_sagas_watchForm(), sagas_watchMain()]);
}
// CONCATENATED MODULE: ./react/addgroup/store.js









const addgroup_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function addgroup_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: addgroup_store_reducers_auth,
    header: reducers_header,
    main: reducers_main,
    form: addgroup_store_reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, addgroup_store_bindMiddleware([external_redux_thunk_default.a, sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(sagas_rootSaga);
  return store;
}

/* harmony default export */ var addgroup_store = (addgroup_store_configureStore);
// CONCATENATED MODULE: ./react/addpoet/store/actions/actionTypes.js
const actionTypes_CHECK_AUTH_INIT = 'CHECK_AUTH_INIT';
const actionTypes_CHECK_AUTH = 'CHECK_AUTH';
const actionTypes_CHECK_USERIMG = 'CHECK_USERIMG';
const actionTypes_CHECK_USERNAME = 'CHECK_USERNAME';
const actionTypes_HEADER_FORM_EXPAND = 'HEADER_FORM_EXPAND';
const actionTypes_HEADER_FORM_SM = 'HEADER_FORM_SM';
const actionTypes_HEADER_NAV_DEFAULT = 'HEADER_NAV_DEFAULT';
const actionTypes_HEADER_FILTER_INIT = 'HEADER_FILTER_INIT';
const actionTypes_HEADER_FILTER_START = 'HEADER_FILTER_START';
const actionTypes_HEADER_FILTER_FAIL = 'HEADER_FILTER_FAIL';
const actionTypes_HEADER_FILTER = 'HEADER_FILTER';
const actionTypes_HEADER_FILTER_CLOSE = 'HEADER_FILTER_CLOSE';
const actionTypes_HEADER_ADD_NEW = 'HEADER_ADD_NEW';
const actionTypes_FETCH_NOTIFY_INIT = 'FETCH_NOTIFY_INIT';
const actionTypes_FETCH_NOTIFY_START = 'FETCH_NOTIFY_START';
const actionTypes_FETCH_NOTIFY_SUCCESS = 'FETCH_NOTIFY_SUCCESS';
const actionTypes_FETCH_NOTIFY_FAIL = 'FETCH_NOTIFY_FAIL';
const actionTypes_FETCH_NOTIFY = 'FETCH_NOTIFY';
const actionTypes_CHANGE_FAVORITE_NOTIFY_INIT = 'CHANGE_FAVORITE_NOTIFY_INIT';
const actionTypes_CHANGE_FAVORITE_NOTIFY_START = 'CHANGE_FAVORITE_NOTIFY_START';
const actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL = 'CHANGE_FAVORITE_NOTIFY_FAIL';
const actionTypes_CHANGE_FAVORITE_NOTIFY = 'CHANGE_FAVORITE_NOTIFY';
const actionTypes_SHOW_NAV_LIST = 'SHOW_NAV_LIST';
const actionTypes_FETCH_NAVLIST_INIT = 'FETCH_NAVLIST_INIT';
const actionTypes_FETCH_NAVLIST_START = 'FETCH_NAVLIST_START';
const actionTypes_FETCH_NAVLIST_SUCCESS = 'FETCH_NAVLIST_SUCCESS';
const actionTypes_FETCH_NAVLIST_FAIL = 'FETCH_NAVLIST_FAIL';
const actionTypes_FETCH_NAVLIST = 'FETCH_NAVLIST';
const actionTypes_SHOW_USER_OPTION = 'SHOW_USER_OPTION';
const actionTypes_FETCH_SHARE_ACTIVE_INIT = 'FETCH_SHARE_ACTIVE_INIT';
const actionTypes_FETCH_SHARE_ACTIVE = 'FETCH_SHARE_ACTIVE';
const actionTypes_RESET_ACTIVE_INIT = 'RESET_ACTIVE_INIT';
const actionTypes_RESET_ACTIVE = 'RESET_ACTIVE';
const actionTypes_FETCH_NOTIFY_ACTIVE_INIT = 'FETCH_NOTIFY_ACTIVE_INIT';
const actionTypes_FETCH_NOTIFY_ACTIVE = 'FETCH_NOTIFY_ACTIVE';
const actionTypes_DEFAULT_NOTIFYACTIVE_INIT = 'DEFAULT_NOTIFYACTIVE_INIT';
const actionTypes_DEFAULT_NOTIFYACTIVE = 'DEFAULT_NOTIFYACTIVE';
const actionTypes_FETCH_CATEG_INIT = 'FETCH_CATEG_INIT';
const actionTypes_FETCH_CATEG_START = 'FETCH_CATEG_START';
const actionTypes_FETCH_CATEG_FAIL = 'FETCH_CATEG_FAIL';
const actionTypes_FETCH_CATEG_RESET = 'FETCH_CATEG_RESET';
const actionTypes_FETCH_CATEG = 'FETCH_CATEG';
const actionTypes_ADD_CATEG_INIT = 'ADD_CATEG_INIT';
const actionTypes_ADD_CATEG = 'ADD_CATEG';
const actionTypes_HIDE_MEDIA_BOX = 'HIDE_MEDIA_BOX';
const actionTypes_SHOW_MEDIA_BOX = 'SHOW_MEDIA_BOX';
const actionTypes_CHECK_LINK_INIT = 'CHECK_LINK_INIT';
const actionTypes_CHECK_LINK = 'CHECK_LINK';
const actionTypes_RESET_LINK = 'RESET_LINK';
const actionTypes_ADD_SNAPSHOT = 'ADD_SNAPSHOT';
const actionTypes_REMOVE_SNAPSHOT = 'REMOVE_SNAPSHOT';
const actionTypes_SUBMIT_MEDIA = 'SUBMIT_MEDIA';
const actionTypes_FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const actionTypes_RESET_TAB = 'RESET_TAB';
const actionTypes_FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const actionTypes_FETCH_USERS = 'FETCH_USERS';
const actionTypes_INPUT_DEFAULT_VALUE = 'INPUT_DEFAULT_VALUE';
const actionTypes_FILTER_USER_INIT = 'FILTER_USER_INIT';
const actionTypes_FILTER_USER = 'FILTER_USER';
const actionTypes_USER_SELECT = 'USER_SELECT';
const actionTypes_REMOVE_MEDIA = 'REMOVE_MEDIA';
const actionTypes_SHOW_USER_SELECT_INIT = 'SHOW_USER_SELECT_INIT';
const actionTypes_SHOW_USER_SELECT = 'SHOW_USER_SELECT';
const store_actions_actionTypes_SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const store_actions_actionTypes_SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const actionTypes_SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
const store_actions_actionTypes_SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const store_actions_actionTypes_SUBMIT_FORM = 'SUBMIT_FORM';
const store_actions_actionTypes_FORM_SUBMITTED = 'FORM_SUBMITTED';
// CONCATENATED MODULE: ./react/addpoet/shared/utility.js
function addpoet_shared_utility_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function addpoet_shared_utility_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { addpoet_shared_utility_ownKeys(Object(source), true).forEach(function (key) { addpoet_shared_utility_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { addpoet_shared_utility_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function addpoet_shared_utility_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const addpoet_shared_utility_updateObject = (oldObject, updatedProperties) => {
  return addpoet_shared_utility_objectSpread({}, oldObject, {}, updatedProperties);
};
const utility_transformNumber = favNumber => {
  const favNumArray = String(favNumber).split("");

  if (favNumArray.length === 4) {
    return `${favNumArray[0]}K`;
  }

  if (favNumArray.length === 5) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}K`;
  }

  if (favNumArray.length === 6) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}K`;
  }

  if (favNumArray.length === 7) {
    const favNum = favNumArray[0];
    return `${favNum}M`;
  }

  if (favNumArray.length === 8) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}M`;
  }

  if (favNumArray.length === 9) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}M`;
  }

  if (favNumArray.length === 10) {
    const favNum = favNumArray[0];
    return `${favNum}B`;
  }

  if (favNumArray.length === 11) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}B`;
  }

  return favNumber;
};
const utility_transformString = val => {
  const curVal = String(val).substr(0, 115);
  return curVal;
};
function shared_utility_changeFav(datas, dataID) {
  const dataArray = [...datas];
  let dtIndex;
  let dtArray = dataArray.filter((data, index) => {
    if (data.id === dataID) {
      dtIndex = index;
      return true;
    }

    return false;
  });

  if (dtArray.length > 0) {
    let data = dtArray[0];
    data = addpoet_shared_utility_updateObject(data, {
      liked: !data.liked
    });

    if (data.liked) {
      data = addpoet_shared_utility_updateObject(data, {
        favorite: data.favorite + 1
      });
    } else {
      data = addpoet_shared_utility_updateObject(data, {
        favorite: data.favorite - 1
      });
    }

    const updateDataArray = [...dataArray];
    updateDataArray[dtIndex] = data;
    let updateStartArray = [...updateDataArray];
    data = addpoet_shared_utility_updateObject(data, {
      changeFavActive: data.liked
    });
    updateStartArray[dtIndex] = data;
    return {
      updateStartArray,
      updateDataArray
    };
  }

  return dataArray;
}
;
const addpoet_shared_utility_checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};
const getSnapshot = (url, mediaType) => {
  let canvas = document.createElement('canvas');
  return new Promise((resolve, reject) => {
    if (canvas.getContext) {
      let media = document.createElement(mediaType);

      function multipleEventListener(el, mediaLoadHandler) {
        'loadedmetadata loadeddata suspend'.split(' ').forEach(event => {
          el.addEventListener(event, mediaLoadHandler, false);
        });
      }

      media.src = url;
      multipleEventListener(media, mediaLoadHandler);
      let event_fired = 0;

      function mediaLoadHandler() {
        if (++event_fired === 3) {
          media.currentTime = 1000;
          media.addEventListener('seeked', function (event) {
            canvas.width = media.videoWidth;
            canvas.height = media.videoHeight;
            canvas.getContext('2d').drawImage(media, 0, 0);
            let snapshot = canvas.toDataURL('image/png');
            resolve(snapshot);
          });
        }
      }
    } else {
      reject('Please update your Browser');
    }
  });
};
const utility_getImageURL = url => {
  let image = new Image();
  image.src = url;
  let canvas = document.createElement('canvas');
  return new Promise((resolve, reject) => {
    if (canvas.getContext) {
      image.onload = function () {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0);
        let snapShot = canvas.toDataURL('image/png');
        resolve(snapShot);
      };
    } else {
      reject('Please update your Browser');
    }
  });
};
// CONCATENATED MODULE: ./react/addpoet/store/reducers/auth.js


const addpoet_store_reducers_auth_initialState = {
  status: false,
  img: null,
  username: null
};

const reducers_auth_checkAuth = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    status: action.status
  });
};

const reducers_auth_checkUserImg = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    img: action.img
  });
};

const reducers_auth_checkUserName = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    username: action.name
  });
};

const addpoet_store_reducers_auth_reducer = (state = addpoet_store_reducers_auth_initialState, action) => {
  switch (action.type) {
    case actionTypes_CHECK_AUTH:
      return reducers_auth_checkAuth(state, action);

    case actionTypes_CHECK_USERIMG:
      return reducers_auth_checkUserImg(state, action);

    case actionTypes_CHECK_USERNAME:
      return reducers_auth_checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var addpoet_store_reducers_auth = (addpoet_store_reducers_auth_reducer);
// CONCATENATED MODULE: ./react/addpoet/store/reducers/header.js


const store_reducers_header_initialState = {
  expand: false,
  hideFormSm: false,
  addNew: false,
  notify: null,
  hidNotify: false,
  navList: null,
  navListCateg: null,
  hidNavList: false,
  hidUserOption: false,
  notifyActive: null,
  default: false,
  searchCnt: null,
  filterPos: 0,
  filterLastPos: 0,
  searchCntErr: null,
  filterStart: false
};

const reducers_header_formExpand = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const reducers_header_formSm = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    hideFormSm: false,
    default: false
  });
};

const reducers_header_navDefault = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    expand: false,
    hideFormSm: true,
    addNew: false,
    hidNotify: true,
    hidNavList: true,
    hidUserOption: true,
    default: true
  });
};

const reducers_header_addNew = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    addNew: !state.addNew,
    default: false
  });
};

const reducers_header_fetchNotify = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const reducers_header_fetchNotifyStart = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const reducers_header_changeFavNotifyStart = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const reducers_header_changeFavNotify = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const reducers_header_showNavList = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const reducers_header_fetchNavListStart = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    navList: null,
    navListCateg: null
  });
};

const reducers_header_fetchNavList = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const reducers_header_showUserOption = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const reducers_header_fetchNotifyActive = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    notifyActive: action.notifyActive
  });
};

const reducers_header_defaultNotifyActive = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    notifyActive: null
  });
};

const reducers_header_headerFilterStart = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const reducers_header_headerFilterFail = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    searchCntErr: action.searchCntErr
  });
};

const reducers_header_headerFilter = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    searchCnt: action.searchCnt
  });
};

const reducers_header_headerFilterClose = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    searchCnt: null,
    filterStart: false
  });
};

const store_reducers_header_reducer = (state = store_reducers_header_initialState, action) => {
  switch (action.type) {
    case actionTypes_HEADER_FORM_EXPAND:
      return reducers_header_formExpand(state, action);

    case actionTypes_HEADER_FORM_SM:
      return reducers_header_formSm(state, action);

    case actionTypes_HEADER_NAV_DEFAULT:
      return reducers_header_navDefault(state, action);

    case actionTypes_HEADER_ADD_NEW:
      return reducers_header_addNew(state, action);

    case actionTypes_FETCH_NOTIFY_START:
      return reducers_header_fetchNotifyStart(state, action);

    case actionTypes_FETCH_NOTIFY:
      return reducers_header_fetchNotify(state, action);

    case actionTypes_CHANGE_FAVORITE_NOTIFY_START:
      return reducers_header_changeFavNotifyStart(state, action);

    case actionTypes_CHANGE_FAVORITE_NOTIFY:
      return reducers_header_changeFavNotify(state, action);

    case actionTypes_SHOW_NAV_LIST:
      return reducers_header_showNavList(state, action);

    case actionTypes_FETCH_NAVLIST_START:
      return reducers_header_fetchNavListStart(state, action);

    case actionTypes_FETCH_NAVLIST:
      return reducers_header_fetchNavList(state, action);

    case actionTypes_SHOW_USER_OPTION:
      return reducers_header_showUserOption(state, action);

    case actionTypes_FETCH_NOTIFY_ACTIVE:
      return reducers_header_fetchNotifyActive(state, action);

    case actionTypes_DEFAULT_NOTIFYACTIVE:
      return reducers_header_defaultNotifyActive(state, action);

    case actionTypes_HEADER_FILTER_START:
      return reducers_header_headerFilterStart(state, action);

    case actionTypes_HEADER_FILTER_FAIL:
      return reducers_header_headerFilterFail(state, action);

    case actionTypes_HEADER_FILTER_CLOSE:
      return reducers_header_headerFilterClose(state, action);

    case actionTypes_HEADER_FILTER:
      return reducers_header_headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var store_reducers_header = (store_reducers_header_reducer);
// CONCATENATED MODULE: ./react/addpoet/store/reducers/form.js


const addpoet_store_reducers_form_initialState = {
  categ: null,
  showCateg: false,
  categErr: null,
  newCateg: null,
  hideMediaBox: false,
  hidAddItm: false,
  linkValid: null,
  snapshot: [],
  media: {},
  curTab: 'online',
  startUser: true,
  users: null,
  onlineUser: [],
  offlineUser: [],
  filteredUser: null,
  defaultValue: false,
  uploadPercent: null,
  submitError: null,
  submitForm: false,
  id: null
};

const reducers_form_fetchCategStart = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    showCateg: true,
    categErr: null
  });
};

const reducers_form_fetchCategFail = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    categErr: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const reducers_form_fetchCategReset = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    categErr: null,
    showCateg: false
  });
};

const reducers_form_fetchCateg = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    categ: action.categ,
    showCateg: action.categ !== null
  });
};

const reducers_form_addCateg = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    newCateg: action.categ
  });
};

const reducers_form_checkLink = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    linkValid: {
      err: action.err,
      media: action.media
    }
  });
};

const reducers_form_resetLink = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    linkValid: null
  });
};

const reducers_form_addSnapshot = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const reducers_form_removeSnapshot = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const reducers_form_removeMedia = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    media: action.media
  });
};

const reducers_form_submitMedia = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    media: action.media,
    hideMediaBox: true
  });
};

const reducers_form_hideMediaBox = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    hideMediaBox: true
  });
};

const reducers_form_showMediaBox = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    hideMediaBox: false
  });
};

const reducers_form_fetchUsers = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    users: action.users,
    filteredUser: null,
    startUser: false,
    defaultValue: true,
    onlineUser: action.status === 'online' ? action.users : state.onlineUser,
    offlineUser: action.status === 'offline' ? action.users : state.offlineUser,
    curTab: action.status
  });
};

const reducers_form_fetchUsersFail = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const reducers_form_resetTab = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const reducers_form_inputDefaultValue = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    defaultValue: false
  });
};

const reducers_form_filterUser = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    filteredUser: action.users
  });
};

const reducers_form_userSelect = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    media: action.users
  });
};

const reducers_form_showUserSelect = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    users: action.users,
    curTab: 'userSelect',
    filteredUser: null,
    defaultValue: true
  });
};

const addpoet_store_reducers_form_submitFormStart = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    submitForm: true,
    submitError: null,
    submitFiles: 0
  });
};

const reducers_form_submitFormSuccess = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    uploadPercent: action.uploadPercent
  });
};

const addpoet_store_reducers_form_submitFormFail = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    submitError: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const addpoet_store_reducers_form_formSubmitted = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    id: action.id
  });
};

const addpoet_store_reducers_form_reducer = (state = addpoet_store_reducers_form_initialState, action) => {
  switch (action.type) {
    case actionTypes_FETCH_CATEG_START:
      return reducers_form_fetchCategStart(state, action);

    case actionTypes_FETCH_CATEG_FAIL:
      return reducers_form_fetchCategFail(state, action);

    case actionTypes_FETCH_CATEG_RESET:
      return reducers_form_fetchCategReset(state, action);

    case actionTypes_FETCH_CATEG:
      return reducers_form_fetchCateg(state, action);

    case actionTypes_ADD_CATEG:
      return reducers_form_addCateg(state, action);

    case actionTypes_HIDE_MEDIA_BOX:
      return reducers_form_hideMediaBox(state, action);

    case actionTypes_SHOW_MEDIA_BOX:
      return reducers_form_showMediaBox(state, action);

    case actionTypes_CHECK_LINK:
      return reducers_form_checkLink(state, action);

    case actionTypes_RESET_LINK:
      return reducers_form_resetLink(state, action);

    case actionTypes_ADD_SNAPSHOT:
      return reducers_form_addSnapshot(state, action);

    case actionTypes_REMOVE_SNAPSHOT:
      return reducers_form_removeSnapshot(state, action);

    case actionTypes_REMOVE_MEDIA:
      return reducers_form_removeMedia(state, action);

    case actionTypes_SUBMIT_MEDIA:
      return reducers_form_submitMedia(state, action);

    case actionTypes_FETCH_USERS:
      return reducers_form_fetchUsers(state, action);

    case actionTypes_FETCH_USERS_FAIL:
      return reducers_form_fetchUsersFail(state, action);

    case actionTypes_RESET_TAB:
      return reducers_form_resetTab(state, action);

    case actionTypes_INPUT_DEFAULT_VALUE:
      return reducers_form_inputDefaultValue(state, action);

    case actionTypes_FILTER_USER:
      return reducers_form_filterUser(state, action);

    case actionTypes_USER_SELECT:
      return reducers_form_userSelect(state, action);

    case actionTypes_SHOW_USER_SELECT:
      return reducers_form_showUserSelect(state, action);

    case store_actions_actionTypes_SUBMIT_FORM_START:
      return addpoet_store_reducers_form_submitFormStart(state, action);

    case actionTypes_SUBMIT_FORM_SUCCESS:
      return reducers_form_submitFormSuccess(state, action);

    case store_actions_actionTypes_SUBMIT_FORM_FAIL:
      return addpoet_store_reducers_form_submitFormFail(state, action);

    case store_actions_actionTypes_FORM_SUBMITTED:
      return addpoet_store_reducers_form_formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var addpoet_store_reducers_form = (addpoet_store_reducers_form_reducer);
// CONCATENATED MODULE: ./react/addpoet/store/reducers/main.js
function reducers_main_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function reducers_main_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { reducers_main_ownKeys(Object(source), true).forEach(function (key) { reducers_main_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { reducers_main_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function reducers_main_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const store_reducers_main_initialState = {
  shareActive: null
};

const reducers_main_fetchShareActive = (state, action) => {
  return addpoet_shared_utility_updateObject(state, {
    shareActive: action.shareActive
  });
};

const reducers_main_resetActive = (state, action) => {
  let reset = action.curTab === 'post' ? {
    ptActive: null
  } : {
    shareActive: null
  };
  return addpoet_shared_utility_updateObject(state, reducers_main_objectSpread({}, reset));
};

const store_reducers_main_reducer = (state = store_reducers_main_initialState, action) => {
  switch (action.type) {
    case actionTypes_FETCH_SHARE_ACTIVE:
      return reducers_main_fetchShareActive(state, action);

    case actionTypes_RESET_ACTIVE:
      return reducers_main_resetActive(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var store_reducers_main = (store_reducers_main_reducer);
// CONCATENATED MODULE: ./react/addpoet/store/actions/auth.js

const auth_checkAuthInit = () => {
  return {
    type: actionTypes_CHECK_AUTH_INIT
  };
};
const store_actions_auth_checkAuth = status => {
  return {
    type: actionTypes_CHECK_AUTH,
    status
  };
};
const store_actions_auth_checkUserImg = img => {
  return {
    type: actionTypes_CHECK_USERIMG,
    img
  };
};
const store_actions_auth_checkUserName = name => {
  return {
    type: actionTypes_CHECK_USERNAME,
    name
  };
};
// CONCATENATED MODULE: ./react/addpoet/store/actions/header.js

const header_headerFormExpand = () => {
  return {
    type: actionTypes_HEADER_FORM_EXPAND
  };
};
const header_headerFormSm = () => {
  return {
    type: actionTypes_HEADER_FORM_SM
  };
};
const header_headerNavDefault = () => {
  return {
    type: actionTypes_HEADER_NAV_DEFAULT
  };
};
const header_headerAddNew = () => {
  return {
    type: actionTypes_HEADER_ADD_NEW
  };
};
const header_fetchNotifyInit = () => {
  return {
    type: actionTypes_FETCH_NOTIFY_INIT
  };
};
const store_actions_header_fetchNotifyStart = () => {
  return {
    type: actionTypes_FETCH_NOTIFY_START
  };
};
const header_fetchNotifySuccess = () => {
  return {
    type: actionTypes_FETCH_NOTIFY_SUCCESS
  };
};
const header_fetchNotifyFail = err => {
  return {
    type: actionTypes_FETCH_NOTIFY_FAIL,
    err
  };
};
const store_actions_header_fetchNotify = notify => {
  return {
    type: actionTypes_FETCH_NOTIFY,
    notify
  };
};
const header_changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: actionTypes_CHANGE_FAVORITE_NOTIFY_INIT,
    notify,
    notifyID
  };
};
const store_actions_header_changeFavNotifyStart = notify => {
  return {
    type: actionTypes_CHANGE_FAVORITE_NOTIFY_START,
    notify
  };
};
const header_changeFavNotifyFail = notify => {
  return {
    type: actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL,
    notify
  };
};
const store_actions_header_changeFavNotify = notify => {
  return {
    type: actionTypes_CHANGE_FAVORITE_NOTIFY,
    notify
  };
};
const store_actions_header_showNavList = () => {
  return {
    type: actionTypes_SHOW_NAV_LIST
  };
};
const header_fetchNavlistInit = category => {
  return {
    type: actionTypes_FETCH_NAVLIST_INIT,
    category
  };
};
const header_fetchNavlistStart = () => {
  return {
    type: actionTypes_FETCH_NAVLIST_START
  };
};
const header_fetchNavlist = (category, navList) => {
  return {
    type: actionTypes_FETCH_NAVLIST,
    category,
    navList
  };
};
const store_actions_header_showUserOption = () => {
  return {
    type: actionTypes_SHOW_USER_OPTION
  };
};
const header_fetchNotifyactiveInit = userID => {
  return {
    type: actionTypes_FETCH_NOTIFY_ACTIVE_INIT,
    userID
  };
};
const store_actions_header_fetchNotifyActive = notifyActive => {
  return {
    type: actionTypes_FETCH_NOTIFY_ACTIVE,
    notifyActive
  };
};
const header_defaultNotifyactiveInit = () => {
  return {
    type: actionTypes_DEFAULT_NOTIFYACTIVE_INIT
  };
};
const store_actions_header_defaultNotifyActive = () => {
  return {
    type: actionTypes_DEFAULT_NOTIFYACTIVE
  };
};
const header_headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: actionTypes_HEADER_FILTER_INIT,
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const store_actions_header_headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: actionTypes_HEADER_FILTER_START,
    filterPos,
    filterLastPos
  };
};
const store_actions_header_headerFilterFail = searchCntErr => {
  return {
    type: actionTypes_HEADER_FILTER_FAIL,
    searchCntErr
  };
};
const store_actions_header_headerFilter = searchCnt => {
  return {
    type: actionTypes_HEADER_FILTER,
    searchCnt
  };
};
const store_actions_header_headerFilterClose = () => {
  return {
    type: actionTypes_HEADER_FILTER_CLOSE
  };
};
// CONCATENATED MODULE: ./react/addpoet/store/actions/main.js

const main_fetchShareactiveInit = userID => {
  return {
    type: actionTypes_FETCH_SHARE_ACTIVE_INIT,
    userID
  };
};
const store_actions_main_fetchShareActive = shareActive => {
  return {
    type: actionTypes_FETCH_SHARE_ACTIVE,
    shareActive
  };
};
const main_resetActiveInit = (userID, curTab) => {
  return {
    type: actionTypes_RESET_ACTIVE_INIT,
    userID,
    curTab
  };
};
const store_actions_main_resetActive = curTab => {
  return {
    type: actionTypes_RESET_ACTIVE,
    curTab
  };
};
// CONCATENATED MODULE: ./react/addpoet/store/actions/form.js

const form_fetchCategInit = () => {
  return {
    type: actionTypes_FETCH_CATEG_INIT
  };
};
const actions_form_fetchCategStart = () => {
  return {
    type: actionTypes_FETCH_CATEG_START
  };
};
const actions_form_fetchCategFail = err => {
  return {
    type: actionTypes_FETCH_CATEG_FAIL,
    err
  };
};
const actions_form_fetchCategReset = () => {
  return {
    type: actionTypes_FETCH_CATEG_RESET
  };
};
const store_actions_form_fetchCateg = categ => {
  return {
    type: actionTypes_FETCH_CATEG,
    categ
  };
};
const form_addCategInit = categ => {
  return {
    type: actionTypes_ADD_CATEG_INIT,
    categ
  };
};
const actions_form_addCateg = categ => {
  return {
    type: actionTypes_ADD_CATEG,
    categ
  };
};
const form_checkLinkInit = (link, mediaType) => {
  return {
    type: actionTypes_CHECK_LINK_INIT,
    link,
    mediaType
  };
};
const actions_form_checkLink = (err, media) => {
  return {
    type: actionTypes_CHECK_LINK,
    err,
    media
  };
};
const actions_form_resetLink = () => {
  return {
    type: actionTypes_RESET_LINK
  };
};
const actions_form_addSnapshot = snapshot => {
  return {
    type: actionTypes_ADD_SNAPSHOT,
    snapshot
  };
};
const actions_form_removeSnapshot = snapshot => {
  return {
    type: actionTypes_REMOVE_SNAPSHOT,
    snapshot
  };
};
const actions_form_removeMedia = media => {
  return {
    type: actionTypes_REMOVE_MEDIA,
    media
  };
};
const actions_form_submitMedia = media => {
  return {
    type: actionTypes_SUBMIT_MEDIA,
    media
  };
};
const actions_form_hideMediaBox = () => {
  return {
    type: actionTypes_HIDE_MEDIA_BOX
  };
};
const actions_form_showMediaBox = () => {
  return {
    type: actionTypes_SHOW_MEDIA_BOX
  };
};
const form_fetchUsersInit = userStatus => {
  return {
    type: actionTypes_FETCH_USERS_INIT,
    userStatus
  };
};
const store_actions_form_fetchUsers = (users, status) => {
  return {
    type: actionTypes_FETCH_USERS,
    users,
    status
  };
};
const actions_form_fetchUsersFail = err => {
  return {
    type: actionTypes_FETCH_USERS_FAIL,
    err
  };
};
const actions_form_resetTab = () => {
  return {
    type: actionTypes_RESET_TAB
  };
};
const actions_form_inputDefaultValue = () => {
  return {
    type: actionTypes_INPUT_DEFAULT_VALUE
  };
};
const form_filterUserInit = (users, filterContent) => {
  return {
    type: actionTypes_FILTER_USER_INIT,
    users,
    filterContent
  };
};
const store_actions_form_filterUser = users => {
  return {
    type: actionTypes_FILTER_USER,
    users
  };
};
const store_actions_form_userSelect = users => {
  return {
    type: actionTypes_USER_SELECT,
    users
  };
};
const form_showUserSelectInit = (users, userID) => {
  return {
    type: actionTypes_SHOW_USER_SELECT_INIT,
    users,
    userID
  };
};
const actions_form_showUserSelect = users => {
  return {
    type: actionTypes_SHOW_USER_SELECT,
    users
  };
};
const store_actions_form_submitFormInit = formData => {
  return {
    type: store_actions_actionTypes_SUBMIT_FORM_INIT,
    formData
  };
};
const addpoet_store_actions_form_submitFormFail = err => {
  return {
    type: store_actions_actionTypes_SUBMIT_FORM_FAIL,
    err
  };
};
const actions_form_submitFormSuccess = uploadPercent => {
  return {
    type: actionTypes_SUBMIT_FORM_SUCCESS,
    uploadPercent
  };
};
const addpoet_store_actions_form_submitFormStart = () => {
  return {
    type: store_actions_actionTypes_SUBMIT_FORM_START
  };
};
const form_submitForm = () => {
  return {
    type: store_actions_actionTypes_SUBMIT_FORM
  };
};
const addpoet_store_actions_form_formSubmitted = id => {
  return {
    type: store_actions_actionTypes_FORM_SUBMITTED,
    id
  };
};
// CONCATENATED MODULE: ./react/addpoet/axios.js


const addpoet_axios_instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
addpoet_axios_instance.defaults.headers.common['authorization'] = 'authorization';
addpoet_axios_instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var addpoet_axios = (addpoet_axios_instance);
// CONCATENATED MODULE: ./react/addpoet/store/thunk/submit.js


const thunk_submit_submit = formData => {
  return dispatch => {
    dispatch(addpoet_store_actions_form_submitFormStart());
    let formContent = new FormData();

    for (let key in formData) {
      if (key !== 'video' && key !== 'image' && key !== 'snapshot') {
        formContent.append(key, formData[key]);
      }

      if (key === 'video' && formData[key].length > 0) {
        for (let video of formData[key]) {
          formContent.append(key, video.file, video.id);
        }
      }

      if (key === 'image' && formData[key].length > 0) {
        for (let image of formData[key]) {
          formContent.append(key, image.file);
        }
      }

      if (key === 'snapshot' && formData[key].length > 0) {
        formContent.append(key, JSON.stringify(formData[key]));
      }
    }

    addpoet_axios.post('/add/poet', formContent, {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.lengthComputable) {
          const percentage = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          dispatch(actions_form_submitFormSuccess(percentage));
        }
      }
    }).then(res => {
      dispatch(addpoet_store_actions_form_formSubmitted(res.data));
    }).catch(err => {
      dispatch(addpoet_store_actions_form_submitFormFail(err));
    });
  };
};
// CONCATENATED MODULE: ./react/addpoet/store/actions/index.js





// CONCATENATED MODULE: ./react/addpoet/store/sagas/auth.js



function* sagas_auth_checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(effects_["put"])(store_actions_auth_checkAuth(true));

    try {
      let response = yield addpoet_axios.post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(effects_["put"])(store_actions_auth_checkUserImg(response.data.url));
      } else {
        yield Object(effects_["put"])(store_actions_auth_checkUserName(response.data.name));
      }
    } catch (err) {}
  }
}
// CONCATENATED MODULE: ./react/addpoet/store/sagas/header.js




function* sagas_header_fetchNotifyInitSaga(action) {
  try {
    yield Object(effects_["put"])(store_actions_header_fetchNotifyStart());
    let response = yield addpoet_axios.post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(store_actions_header_fetchNotify(response.data.coll));
    } else {
      yield Object(effects_["put"])(store_actions_header_fetchNotify([]));
    }
  } catch (err) {
    yield Object(effects_["put"])(header_fetchNotifyFail(err));
  }
}
function* sagas_header_changeFavNotifySaga(action) {
  let notify = shared_utility_changeFav(action.notify, action.notifyID);
  yield Object(effects_["put"])(store_actions_header_changeFavNotifyStart(notify.updateStartArray));
  yield Object(effects_["put"])(store_actions_header_changeFavNotify(notify.updateDataArray));
}
function* sagas_header_fetchNavlistInitSaga(action) {
  try {
    yield Object(effects_["put"])(header_fetchNavlistStart());
    let response = yield addpoet_axios.post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(effects_["put"])(header_fetchNavlist(action.category, response.data));
  } catch (e) {}
}
function* sagas_header_fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield addpoet_axios.post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(store_actions_header_fetchNotifyActive(response.data.collTotal));
    }

    ;
  } catch (err) {}
}
function* sagas_header_defaultNotifyActiveInitSaga(action) {
  try {
    yield addpoet_axios.post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(effects_["put"])(store_actions_header_defaultNotifyActive());
  } catch (err) {}
}
function* sagas_header_headerFilterInitSaga(action) {
  try {
    yield Object(effects_["put"])(store_actions_header_headerFilterStart(action.filterPos, action.filterLastPos));
    let response = yield addpoet_axios.post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(effects_["put"])(store_actions_header_headerFilter(response.data));
  } catch (err) {
    yield Object(effects_["put"])(store_actions_header_headerFilterFail(err));
  }
}
// CONCATENATED MODULE: ./react/addpoet/store/sagas/main.js



function* sagas_main_fetchShareActiveInitSaga(action) {
  try {
    let response = yield addpoet_axios.post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });

    if (response.data > 0) {
      yield Object(effects_["put"])(store_actions_main_fetchShareActive(response.data));
    }

    return;
  } catch (err) {}
}
function* sagas_main_resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'share') {
      yield addpoet_axios.patch('/header', {
        userID: action.userID
      }, {
        headers: {
          'data-categ': action.curTab
        }
      });
    }

    yield Object(effects_["put"])(store_actions_main_resetActive(action.curTab));
  } catch (err) {}
}
// CONCATENATED MODULE: ./react/addpoet/store/sagas/form.js




function* sagas_form_fetchCategInitSaga(action) {
  try {
    yield Object(effects_["put"])(actions_form_fetchCategStart());
    const category = yield addpoet_axios.post('/poet', null, {
      headers: {
        'data-categ': 'category'
      }
    });
    const categ = category.data && category.data.length > 0 ? category.data : null;
    yield Object(effects_["put"])(store_actions_form_fetchCateg(categ));
  } catch (err) {
    yield Object(effects_["put"])(actions_form_fetchCategFail(err));
    yield Object(effects_["delay"])(2000);
    yield Object(effects_["put"])(actions_form_fetchCategReset());
  }
}
function* form_addCategInitSaga(action) {
  let categs = String(action.categ).split(',');
  let transformCateg = [];

  for (let categ of categs) {
    transformCateg.push(String(categ).trim().charAt(0).toUpperCase() + String(categ).trim().toLowerCase().slice(1));
  }

  let removeDuplicate = [...new Set(transformCateg)];
  yield Object(effects_["put"])(actions_form_addCateg(removeDuplicate));
}
function* form_checkLinkInitSaga(action) {
  let link = String(action.link).trim();

  try {
    let response = yield external_axios_default.a.get(link, {
      responseType: 'blob',
      timeout: 8000
    });

    if (response.data.type.startsWith(action.mediaType + '/')) {
      yield Object(effects_["put"])(actions_form_checkLink(null, {
        file: response.data,
        url: window.URL.createObjectURL(response.data)
      }));
      return;
    }

    throw new Error(`Unknown format, Only ${action.mediaType} files`);
  } catch (err) {
    yield Object(effects_["put"])(actions_form_checkLink(err, null));
  }
}
function* sagas_form_fetchUsersInitSaga(action) {
  try {
    let response = yield addpoet_axios.post('/users', null, {
      headers: {
        'data-categ': `allteacher-${action.userStatus}`
      }
    });
    yield Object(effects_["put"])(store_actions_form_fetchUsers(response.data, action.userStatus));
  } catch (err) {
    yield Object(effects_["put"])(actions_form_fetchUsersFail(err));
  }
}
function* sagas_form_filterUserInitSaga(action) {
  let filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);

  if (!action.filterContent && action.users && action.users.length > 0) {
    filterUser = [...action.users];
  }

  yield Object(effects_["put"])(store_actions_form_filterUser(filterUser));
}
function* form_showUserSelectInitSaga(action) {
  let filterUser = action.users.filter(user => action.userID.indexOf(user.id) !== -1);
  yield Object(effects_["put"])(actions_form_showUserSelect(filterUser));
}
// CONCATENATED MODULE: ./react/addpoet/store/sagas/index.js






function* store_sagas_watchAuth() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes_CHECK_AUTH_INIT, sagas_auth_checkAuthInitSaga)]);
}
function* store_sagas_watchHeader() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes_FETCH_NOTIFY_INIT, sagas_header_fetchNotifyInitSaga), Object(effects_["takeEvery"])(actionTypes_CHANGE_FAVORITE_NOTIFY_INIT, sagas_header_changeFavNotifySaga), Object(effects_["takeEvery"])(actionTypes_FETCH_NAVLIST_INIT, sagas_header_fetchNavlistInitSaga), Object(effects_["takeEvery"])(actionTypes_FETCH_NOTIFY_ACTIVE_INIT, sagas_header_fetchNotifyActiveInitSaga), Object(effects_["takeEvery"])(actionTypes_DEFAULT_NOTIFYACTIVE_INIT, sagas_header_defaultNotifyActiveInitSaga), Object(effects_["takeEvery"])(actionTypes_FETCH_SHARE_ACTIVE_INIT, sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(actionTypes_HEADER_FILTER_INIT, sagas_header_headerFilterInitSaga)]);
}
function* addpoet_store_sagas_watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes_FETCH_CATEG_INIT, sagas_form_fetchCategInitSaga), Object(effects_["takeEvery"])(actionTypes_ADD_CATEG_INIT, form_addCategInitSaga), Object(effects_["takeEvery"])(actionTypes_CHECK_LINK_INIT, form_checkLinkInitSaga), Object(effects_["takeEvery"])(actionTypes_FETCH_USERS_INIT, sagas_form_fetchUsersInitSaga), Object(effects_["takeEvery"])(actionTypes_FILTER_USER_INIT, sagas_form_filterUserInitSaga), Object(effects_["takeEvery"])(actionTypes_SHOW_USER_SELECT_INIT, form_showUserSelectInitSaga)]);
}
function* store_sagas_watchMain() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes_FETCH_SHARE_ACTIVE_INIT, sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(actionTypes_RESET_ACTIVE_INIT, sagas_main_resetActiveInitSaga)]);
}
function* store_sagas_rootSaga() {
  yield Object(effects_["all"])([store_sagas_watchAuth(), store_sagas_watchHeader(), addpoet_store_sagas_watchForm(), store_sagas_watchMain()]);
}
// CONCATENATED MODULE: ./react/addpoet/store.js









const addpoet_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function addpoet_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: addpoet_store_reducers_auth,
    header: store_reducers_header,
    main: store_reducers_main,
    form: addpoet_store_reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, addpoet_store_bindMiddleware([external_redux_thunk_default.a, sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(store_sagas_rootSaga);
  return store;
}

/* harmony default export */ var addpoet_store = (addpoet_store_configureStore);
// CONCATENATED MODULE: ./react/addpost/store/actions/actionTypes.js
const actions_actionTypes_CHECK_AUTH_INIT = 'CHECK_AUTH_INIT';
const actions_actionTypes_CHECK_AUTH = 'CHECK_AUTH';
const actions_actionTypes_CHECK_USERIMG = 'CHECK_USERIMG';
const actions_actionTypes_CHECK_USERNAME = 'CHECK_USERNAME';
const actions_actionTypes_HEADER_FORM_EXPAND = 'HEADER_FORM_EXPAND';
const actions_actionTypes_HEADER_FORM_SM = 'HEADER_FORM_SM';
const actions_actionTypes_HEADER_NAV_DEFAULT = 'HEADER_NAV_DEFAULT';
const actions_actionTypes_HEADER_FILTER_INIT = 'HEADER_FILTER_INIT';
const actions_actionTypes_HEADER_FILTER_START = 'HEADER_FILTER_START';
const actions_actionTypes_HEADER_FILTER_FAIL = 'HEADER_FILTER_FAIL';
const actions_actionTypes_HEADER_FILTER = 'HEADER_FILTER';
const actions_actionTypes_HEADER_FILTER_CLOSE = 'HEADER_FILTER_CLOSE';
const actions_actionTypes_HEADER_ADD_NEW = 'HEADER_ADD_NEW';
const actions_actionTypes_FETCH_NOTIFY_INIT = 'FETCH_NOTIFY_INIT';
const actions_actionTypes_FETCH_NOTIFY_START = 'FETCH_NOTIFY_START';
const actions_actionTypes_FETCH_NOTIFY_SUCCESS = 'FETCH_NOTIFY_SUCCESS';
const actions_actionTypes_FETCH_NOTIFY_FAIL = 'FETCH_NOTIFY_FAIL';
const actions_actionTypes_FETCH_NOTIFY = 'FETCH_NOTIFY';
const actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT = 'CHANGE_FAVORITE_NOTIFY_INIT';
const actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START = 'CHANGE_FAVORITE_NOTIFY_START';
const actions_actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL = 'CHANGE_FAVORITE_NOTIFY_FAIL';
const actions_actionTypes_CHANGE_FAVORITE_NOTIFY = 'CHANGE_FAVORITE_NOTIFY';
const actions_actionTypes_SHOW_NAV_LIST = 'SHOW_NAV_LIST';
const actions_actionTypes_FETCH_NAVLIST_INIT = 'FETCH_NAVLIST_INIT';
const actions_actionTypes_FETCH_NAVLIST_START = 'FETCH_NAVLIST_START';
const actions_actionTypes_FETCH_NAVLIST_SUCCESS = 'FETCH_NAVLIST_SUCCESS';
const actions_actionTypes_FETCH_NAVLIST_FAIL = 'FETCH_NAVLIST_FAIL';
const actions_actionTypes_FETCH_NAVLIST = 'FETCH_NAVLIST';
const actions_actionTypes_SHOW_USER_OPTION = 'SHOW_USER_OPTION';
const actions_actionTypes_FETCH_SHARE_ACTIVE_INIT = 'FETCH_SHARE_ACTIVE_INIT';
const actions_actionTypes_FETCH_SHARE_ACTIVE = 'FETCH_SHARE_ACTIVE';
const actions_actionTypes_RESET_ACTIVE_INIT = 'RESET_ACTIVE_INIT';
const actions_actionTypes_RESET_ACTIVE = 'RESET_ACTIVE';
const actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT = 'FETCH_NOTIFY_ACTIVE_INIT';
const actions_actionTypes_FETCH_NOTIFY_ACTIVE = 'FETCH_NOTIFY_ACTIVE';
const actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT = 'DEFAULT_NOTIFYACTIVE_INIT';
const actions_actionTypes_DEFAULT_NOTIFYACTIVE = 'DEFAULT_NOTIFYACTIVE';
const actions_actionTypes_FETCH_CATEG_INIT = 'FETCH_CATEG_INIT';
const actions_actionTypes_FETCH_CATEG_START = 'FETCH_CATEG_START';
const actions_actionTypes_FETCH_CATEG_FAIL = 'FETCH_CATEG_FAIL';
const actions_actionTypes_FETCH_CATEG_RESET = 'FETCH_CATEG_RESET';
const actions_actionTypes_FETCH_CATEG = 'FETCH_CATEG';
const actions_actionTypes_ADD_CATEG_INIT = 'ADD_CATEG_INIT';
const actions_actionTypes_ADD_CATEG = 'ADD_CATEG';
const actions_actionTypes_HIDE_MEDIA_BOX = 'HIDE_MEDIA_BOX';
const actions_actionTypes_SHOW_MEDIA_BOX = 'SHOW_MEDIA_BOX';
const actions_actionTypes_CHECK_LINK_INIT = 'CHECK_LINK_INIT';
const actions_actionTypes_CHECK_LINK = 'CHECK_LINK';
const actions_actionTypes_RESET_LINK = 'RESET_LINK';
const actions_actionTypes_ADD_SNAPSHOT = 'ADD_SNAPSHOT';
const actions_actionTypes_REMOVE_SNAPSHOT = 'REMOVE_SNAPSHOT';
const actions_actionTypes_SUBMIT_MEDIA = 'SUBMIT_MEDIA';
const actions_actionTypes_FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const actions_actionTypes_RESET_TAB = 'RESET_TAB';
const actions_actionTypes_FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const actions_actionTypes_FETCH_USERS = 'FETCH_USERS';
const actions_actionTypes_INPUT_DEFAULT_VALUE = 'INPUT_DEFAULT_VALUE';
const actions_actionTypes_FILTER_USER_INIT = 'FILTER_USER_INIT';
const actions_actionTypes_FILTER_USER = 'FILTER_USER';
const actions_actionTypes_USER_SELECT = 'USER_SELECT';
const actions_actionTypes_REMOVE_MEDIA = 'REMOVE_MEDIA';
const actions_actionTypes_SHOW_USER_SELECT_INIT = 'SHOW_USER_SELECT_INIT';
const actions_actionTypes_SHOW_USER_SELECT = 'SHOW_USER_SELECT';
const addpost_store_actions_actionTypes_SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const addpost_store_actions_actionTypes_SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const actions_actionTypes_SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
const addpost_store_actions_actionTypes_SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const addpost_store_actions_actionTypes_SUBMIT_FORM = 'SUBMIT_FORM';
const addpost_store_actions_actionTypes_FORM_SUBMITTED = 'FORM_SUBMITTED';
// CONCATENATED MODULE: ./react/addpost/shared/utility.js
function addpost_shared_utility_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function addpost_shared_utility_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { addpost_shared_utility_ownKeys(Object(source), true).forEach(function (key) { addpost_shared_utility_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { addpost_shared_utility_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function addpost_shared_utility_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const addpost_shared_utility_updateObject = (oldObject, updatedProperties) => {
  return addpost_shared_utility_objectSpread({}, oldObject, {}, updatedProperties);
};
const shared_utility_transformNumber = favNumber => {
  const favNumArray = String(favNumber).split("");

  if (favNumArray.length === 4) {
    return `${favNumArray[0]}K`;
  }

  if (favNumArray.length === 5) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}K`;
  }

  if (favNumArray.length === 6) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}K`;
  }

  if (favNumArray.length === 7) {
    const favNum = favNumArray[0];
    return `${favNum}M`;
  }

  if (favNumArray.length === 8) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}M`;
  }

  if (favNumArray.length === 9) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}M`;
  }

  if (favNumArray.length === 10) {
    const favNum = favNumArray[0];
    return `${favNum}B`;
  }

  if (favNumArray.length === 11) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}B`;
  }

  return favNumber;
};
const shared_utility_transformString = val => {
  const curVal = String(val).substr(0, 115);
  return curVal;
};
function addpost_shared_utility_changeFav(datas, dataID) {
  const dataArray = [...datas];
  let dtIndex;
  let dtArray = dataArray.filter((data, index) => {
    if (data.id === dataID) {
      dtIndex = index;
      return true;
    }

    return false;
  });

  if (dtArray.length > 0) {
    let data = dtArray[0];
    data = addpost_shared_utility_updateObject(data, {
      liked: !data.liked
    });

    if (data.liked) {
      data = addpost_shared_utility_updateObject(data, {
        favorite: data.favorite + 1
      });
    } else {
      data = addpost_shared_utility_updateObject(data, {
        favorite: data.favorite - 1
      });
    }

    const updateDataArray = [...dataArray];
    updateDataArray[dtIndex] = data;
    let updateStartArray = [...updateDataArray];
    data = addpost_shared_utility_updateObject(data, {
      changeFavActive: data.liked
    });
    updateStartArray[dtIndex] = data;
    return {
      updateStartArray,
      updateDataArray
    };
  }

  return dataArray;
}
;
const addpost_shared_utility_checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};
const utility_getSnapshot = (url, mediaType) => {
  return new Promise((resolve, reject) => {
    let media = document.createElement(mediaType);

    function multipleEventListener(el, mediaLoadHandler) {
      'loadedmetadata loadeddata suspend'.split(' ').forEach(event => {
        el.addEventListener(event, mediaLoadHandler, false);
      });
    }

    media.onerror = function () {
      reject(media.error.message);
    };

    media.src = url;
    multipleEventListener(media, mediaLoadHandler);
    let event_fired = 0;

    function mediaLoadHandler() {
      if (++event_fired === 3) {
        media.currentTime = 1;
        media.addEventListener('seeked', function (event) {
          resolve();
        });
      }
    }
  });
};
const shared_utility_getImageURL = url => {
  let image = new Image();
  image.src = url;
  let canvas = document.createElement('canvas');
  return new Promise((resolve, reject) => {
    if (canvas.getContext) {
      image.onload = function () {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0);
        let snapShot = canvas.toDataURL('image/png');
        resolve(snapShot);
      };
    } else {
      reject('Please update your Browser');
    }
  });
};
// CONCATENATED MODULE: ./react/addpost/store/reducers/auth.js


const addpost_store_reducers_auth_initialState = {
  status: false,
  img: null,
  username: null
};

const store_reducers_auth_checkAuth = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    status: action.status
  });
};

const store_reducers_auth_checkUserImg = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    img: action.img
  });
};

const store_reducers_auth_checkUserName = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    username: action.name
  });
};

const addpost_store_reducers_auth_reducer = (state = addpost_store_reducers_auth_initialState, action) => {
  switch (action.type) {
    case actions_actionTypes_CHECK_AUTH:
      return store_reducers_auth_checkAuth(state, action);

    case actions_actionTypes_CHECK_USERIMG:
      return store_reducers_auth_checkUserImg(state, action);

    case actions_actionTypes_CHECK_USERNAME:
      return store_reducers_auth_checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var addpost_store_reducers_auth = (addpost_store_reducers_auth_reducer);
// CONCATENATED MODULE: ./react/addpost/store/reducers/header.js


const addpost_store_reducers_header_initialState = {
  expand: false,
  hideFormSm: false,
  addNew: false,
  notify: null,
  hidNotify: false,
  navList: null,
  navListCateg: null,
  hidNavList: false,
  hidUserOption: false,
  notifyActive: null,
  default: false,
  searchCnt: null,
  filterPos: 0,
  filterLastPos: 0,
  searchCntErr: null,
  filterStart: false
};

const store_reducers_header_formExpand = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const store_reducers_header_formSm = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    hideFormSm: false,
    default: false
  });
};

const store_reducers_header_navDefault = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    expand: false,
    hideFormSm: true,
    addNew: false,
    hidNotify: true,
    hidNavList: true,
    hidUserOption: true,
    default: true
  });
};

const store_reducers_header_addNew = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    addNew: !state.addNew,
    default: false
  });
};

const store_reducers_header_fetchNotify = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const store_reducers_header_fetchNotifyStart = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const store_reducers_header_changeFavNotifyStart = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const store_reducers_header_changeFavNotify = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const store_reducers_header_showNavList = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const store_reducers_header_fetchNavListStart = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    navList: null,
    navListCateg: null
  });
};

const store_reducers_header_fetchNavList = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const store_reducers_header_showUserOption = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const store_reducers_header_fetchNotifyActive = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    notifyActive: action.notifyActive
  });
};

const store_reducers_header_defaultNotifyActive = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    notifyActive: null
  });
};

const store_reducers_header_headerFilterStart = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const store_reducers_header_headerFilterFail = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    searchCntErr: action.searchCntErr
  });
};

const store_reducers_header_headerFilter = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    searchCnt: action.searchCnt
  });
};

const store_reducers_header_headerFilterClose = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    searchCnt: null,
    filterStart: false
  });
};

const addpost_store_reducers_header_reducer = (state = addpost_store_reducers_header_initialState, action) => {
  switch (action.type) {
    case actions_actionTypes_HEADER_FORM_EXPAND:
      return store_reducers_header_formExpand(state, action);

    case actions_actionTypes_HEADER_FORM_SM:
      return store_reducers_header_formSm(state, action);

    case actions_actionTypes_HEADER_NAV_DEFAULT:
      return store_reducers_header_navDefault(state, action);

    case actions_actionTypes_HEADER_ADD_NEW:
      return store_reducers_header_addNew(state, action);

    case actions_actionTypes_FETCH_NOTIFY_START:
      return store_reducers_header_fetchNotifyStart(state, action);

    case actions_actionTypes_FETCH_NOTIFY:
      return store_reducers_header_fetchNotify(state, action);

    case actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START:
      return store_reducers_header_changeFavNotifyStart(state, action);

    case actions_actionTypes_CHANGE_FAVORITE_NOTIFY:
      return store_reducers_header_changeFavNotify(state, action);

    case actions_actionTypes_SHOW_NAV_LIST:
      return store_reducers_header_showNavList(state, action);

    case actions_actionTypes_FETCH_NAVLIST_START:
      return store_reducers_header_fetchNavListStart(state, action);

    case actions_actionTypes_FETCH_NAVLIST:
      return store_reducers_header_fetchNavList(state, action);

    case actions_actionTypes_SHOW_USER_OPTION:
      return store_reducers_header_showUserOption(state, action);

    case actions_actionTypes_FETCH_NOTIFY_ACTIVE:
      return store_reducers_header_fetchNotifyActive(state, action);

    case actions_actionTypes_DEFAULT_NOTIFYACTIVE:
      return store_reducers_header_defaultNotifyActive(state, action);

    case actions_actionTypes_HEADER_FILTER_START:
      return store_reducers_header_headerFilterStart(state, action);

    case actions_actionTypes_HEADER_FILTER_FAIL:
      return store_reducers_header_headerFilterFail(state, action);

    case actions_actionTypes_HEADER_FILTER_CLOSE:
      return store_reducers_header_headerFilterClose(state, action);

    case actions_actionTypes_HEADER_FILTER:
      return store_reducers_header_headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var addpost_store_reducers_header = (addpost_store_reducers_header_reducer);
// CONCATENATED MODULE: ./react/addpost/store/reducers/form.js


const addpost_store_reducers_form_initialState = {
  categ: null,
  showCateg: false,
  categErr: null,
  newCateg: null,
  hideMediaBox: false,
  hidAddItm: false,
  linkValid: null,
  snapshot: [],
  media: {},
  curTab: 'online',
  startUser: true,
  users: null,
  onlineUser: [],
  offlineUser: [],
  filteredUser: null,
  defaultValue: false,
  uploadPercent: null,
  submitError: null,
  submitForm: false,
  id: null
};

const store_reducers_form_fetchCategStart = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    showCateg: true,
    categErr: null
  });
};

const store_reducers_form_fetchCategFail = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    categErr: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const store_reducers_form_fetchCategReset = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    categErr: null,
    showCateg: false
  });
};

const store_reducers_form_fetchCateg = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    categ: action.categ,
    showCateg: action.categ !== null
  });
};

const store_reducers_form_addCateg = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    newCateg: action.categ
  });
};

const store_reducers_form_checkLink = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    linkValid: {
      err: action.err,
      media: action.media
    }
  });
};

const store_reducers_form_resetLink = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    linkValid: null
  });
};

const store_reducers_form_addSnapshot = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const store_reducers_form_removeSnapshot = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const store_reducers_form_removeMedia = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    media: action.media
  });
};

const store_reducers_form_submitMedia = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    media: action.media,
    hideMediaBox: true
  });
};

const store_reducers_form_hideMediaBox = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    hideMediaBox: true
  });
};

const store_reducers_form_showMediaBox = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    hideMediaBox: false
  });
};

const store_reducers_form_fetchUsers = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    users: action.users,
    filteredUser: null,
    startUser: false,
    defaultValue: true,
    onlineUser: action.status === 'online' ? action.users : state.onlineUser,
    offlineUser: action.status === 'offline' ? action.users : state.offlineUser,
    curTab: action.status
  });
};

const store_reducers_form_fetchUsersFail = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const store_reducers_form_resetTab = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const store_reducers_form_inputDefaultValue = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    defaultValue: false
  });
};

const store_reducers_form_filterUser = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    filteredUser: action.users
  });
};

const store_reducers_form_userSelect = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    media: action.users
  });
};

const store_reducers_form_showUserSelect = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    users: action.users,
    curTab: 'userSelect',
    filteredUser: null,
    defaultValue: true
  });
};

const addpost_store_reducers_form_submitFormStart = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    submitForm: true,
    submitError: null,
    submitFiles: 0
  });
};

const store_reducers_form_submitFormSuccess = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    uploadPercent: action.uploadPercent
  });
};

const addpost_store_reducers_form_submitFormFail = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    submitError: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const addpost_store_reducers_form_formSubmitted = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    id: action.id
  });
};

const addpost_store_reducers_form_reducer = (state = addpost_store_reducers_form_initialState, action) => {
  switch (action.type) {
    case actions_actionTypes_FETCH_CATEG_START:
      return store_reducers_form_fetchCategStart(state, action);

    case actions_actionTypes_FETCH_CATEG_FAIL:
      return store_reducers_form_fetchCategFail(state, action);

    case actions_actionTypes_FETCH_CATEG_RESET:
      return store_reducers_form_fetchCategReset(state, action);

    case actions_actionTypes_FETCH_CATEG:
      return store_reducers_form_fetchCateg(state, action);

    case actions_actionTypes_ADD_CATEG:
      return store_reducers_form_addCateg(state, action);

    case actions_actionTypes_HIDE_MEDIA_BOX:
      return store_reducers_form_hideMediaBox(state, action);

    case actions_actionTypes_SHOW_MEDIA_BOX:
      return store_reducers_form_showMediaBox(state, action);

    case actions_actionTypes_CHECK_LINK:
      return store_reducers_form_checkLink(state, action);

    case actions_actionTypes_RESET_LINK:
      return store_reducers_form_resetLink(state, action);

    case actions_actionTypes_ADD_SNAPSHOT:
      return store_reducers_form_addSnapshot(state, action);

    case actions_actionTypes_REMOVE_SNAPSHOT:
      return store_reducers_form_removeSnapshot(state, action);

    case actions_actionTypes_REMOVE_MEDIA:
      return store_reducers_form_removeMedia(state, action);

    case actions_actionTypes_SUBMIT_MEDIA:
      return store_reducers_form_submitMedia(state, action);

    case actions_actionTypes_FETCH_USERS:
      return store_reducers_form_fetchUsers(state, action);

    case actions_actionTypes_FETCH_USERS_FAIL:
      return store_reducers_form_fetchUsersFail(state, action);

    case actions_actionTypes_RESET_TAB:
      return store_reducers_form_resetTab(state, action);

    case actions_actionTypes_INPUT_DEFAULT_VALUE:
      return store_reducers_form_inputDefaultValue(state, action);

    case actions_actionTypes_FILTER_USER:
      return store_reducers_form_filterUser(state, action);

    case actions_actionTypes_USER_SELECT:
      return store_reducers_form_userSelect(state, action);

    case actions_actionTypes_SHOW_USER_SELECT:
      return store_reducers_form_showUserSelect(state, action);

    case addpost_store_actions_actionTypes_SUBMIT_FORM_START:
      return addpost_store_reducers_form_submitFormStart(state, action);

    case actions_actionTypes_SUBMIT_FORM_SUCCESS:
      return store_reducers_form_submitFormSuccess(state, action);

    case addpost_store_actions_actionTypes_SUBMIT_FORM_FAIL:
      return addpost_store_reducers_form_submitFormFail(state, action);

    case addpost_store_actions_actionTypes_FORM_SUBMITTED:
      return addpost_store_reducers_form_formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var addpost_store_reducers_form = (addpost_store_reducers_form_reducer);
// CONCATENATED MODULE: ./react/addpost/store/reducers/main.js
function store_reducers_main_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function store_reducers_main_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { store_reducers_main_ownKeys(Object(source), true).forEach(function (key) { store_reducers_main_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { store_reducers_main_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function store_reducers_main_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const addpost_store_reducers_main_initialState = {
  shareActive: null
};

const store_reducers_main_fetchShareActive = (state, action) => {
  return addpost_shared_utility_updateObject(state, {
    shareActive: action.shareActive
  });
};

const store_reducers_main_resetActive = (state, action) => {
  let reset = action.curTab === 'post' ? {
    ptActive: null
  } : {
    shareActive: null
  };
  return addpost_shared_utility_updateObject(state, store_reducers_main_objectSpread({}, reset));
};

const addpost_store_reducers_main_reducer = (state = addpost_store_reducers_main_initialState, action) => {
  switch (action.type) {
    case actions_actionTypes_FETCH_SHARE_ACTIVE:
      return store_reducers_main_fetchShareActive(state, action);

    case actions_actionTypes_RESET_ACTIVE:
      return store_reducers_main_resetActive(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var addpost_store_reducers_main = (addpost_store_reducers_main_reducer);
// CONCATENATED MODULE: ./react/addpost/store/actions/auth.js

const actions_auth_checkAuthInit = () => {
  return {
    type: actions_actionTypes_CHECK_AUTH_INIT
  };
};
const addpost_store_actions_auth_checkAuth = status => {
  return {
    type: actions_actionTypes_CHECK_AUTH,
    status
  };
};
const addpost_store_actions_auth_checkUserImg = img => {
  return {
    type: actions_actionTypes_CHECK_USERIMG,
    img
  };
};
const addpost_store_actions_auth_checkUserName = name => {
  return {
    type: actions_actionTypes_CHECK_USERNAME,
    name
  };
};
// CONCATENATED MODULE: ./react/addpost/store/actions/header.js

const actions_header_headerFormExpand = () => {
  return {
    type: actions_actionTypes_HEADER_FORM_EXPAND
  };
};
const actions_header_headerFormSm = () => {
  return {
    type: actions_actionTypes_HEADER_FORM_SM
  };
};
const actions_header_headerNavDefault = () => {
  return {
    type: actions_actionTypes_HEADER_NAV_DEFAULT
  };
};
const actions_header_headerAddNew = () => {
  return {
    type: actions_actionTypes_HEADER_ADD_NEW
  };
};
const actions_header_fetchNotifyInit = () => {
  return {
    type: actions_actionTypes_FETCH_NOTIFY_INIT
  };
};
const addpost_store_actions_header_fetchNotifyStart = () => {
  return {
    type: actions_actionTypes_FETCH_NOTIFY_START
  };
};
const actions_header_fetchNotifySuccess = () => {
  return {
    type: actions_actionTypes_FETCH_NOTIFY_SUCCESS
  };
};
const actions_header_fetchNotifyFail = err => {
  return {
    type: actions_actionTypes_FETCH_NOTIFY_FAIL,
    err
  };
};
const addpost_store_actions_header_fetchNotify = notify => {
  return {
    type: actions_actionTypes_FETCH_NOTIFY,
    notify
  };
};
const actions_header_changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT,
    notify,
    notifyID
  };
};
const addpost_store_actions_header_changeFavNotifyStart = notify => {
  return {
    type: actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START,
    notify
  };
};
const actions_header_changeFavNotifyFail = notify => {
  return {
    type: actions_actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL,
    notify
  };
};
const addpost_store_actions_header_changeFavNotify = notify => {
  return {
    type: actions_actionTypes_CHANGE_FAVORITE_NOTIFY,
    notify
  };
};
const addpost_store_actions_header_showNavList = () => {
  return {
    type: actions_actionTypes_SHOW_NAV_LIST
  };
};
const actions_header_fetchNavlistInit = category => {
  return {
    type: actions_actionTypes_FETCH_NAVLIST_INIT,
    category
  };
};
const actions_header_fetchNavlistStart = () => {
  return {
    type: actions_actionTypes_FETCH_NAVLIST_START
  };
};
const actions_header_fetchNavlist = (category, navList) => {
  return {
    type: actions_actionTypes_FETCH_NAVLIST,
    category,
    navList
  };
};
const addpost_store_actions_header_showUserOption = () => {
  return {
    type: actions_actionTypes_SHOW_USER_OPTION
  };
};
const actions_header_fetchNotifyactiveInit = userID => {
  return {
    type: actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT,
    userID
  };
};
const addpost_store_actions_header_fetchNotifyActive = notifyActive => {
  return {
    type: actions_actionTypes_FETCH_NOTIFY_ACTIVE,
    notifyActive
  };
};
const actions_header_defaultNotifyactiveInit = () => {
  return {
    type: actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT
  };
};
const addpost_store_actions_header_defaultNotifyActive = () => {
  return {
    type: actions_actionTypes_DEFAULT_NOTIFYACTIVE
  };
};
const actions_header_headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: actions_actionTypes_HEADER_FILTER_INIT,
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const addpost_store_actions_header_headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: actions_actionTypes_HEADER_FILTER_START,
    filterPos,
    filterLastPos
  };
};
const addpost_store_actions_header_headerFilterFail = searchCntErr => {
  return {
    type: actions_actionTypes_HEADER_FILTER_FAIL,
    searchCntErr
  };
};
const addpost_store_actions_header_headerFilter = searchCnt => {
  return {
    type: actions_actionTypes_HEADER_FILTER,
    searchCnt
  };
};
const addpost_store_actions_header_headerFilterClose = () => {
  return {
    type: actions_actionTypes_HEADER_FILTER_CLOSE
  };
};
// CONCATENATED MODULE: ./react/addpost/store/actions/main.js

const actions_main_fetchShareactiveInit = userID => {
  return {
    type: actions_actionTypes_FETCH_SHARE_ACTIVE_INIT,
    userID
  };
};
const addpost_store_actions_main_fetchShareActive = shareActive => {
  return {
    type: actions_actionTypes_FETCH_SHARE_ACTIVE,
    shareActive
  };
};
const actions_main_resetActiveInit = (userID, curTab) => {
  return {
    type: actions_actionTypes_RESET_ACTIVE_INIT,
    userID,
    curTab
  };
};
const addpost_store_actions_main_resetActive = curTab => {
  return {
    type: actions_actionTypes_RESET_ACTIVE,
    curTab
  };
};
// CONCATENATED MODULE: ./react/addpost/store/actions/form.js

const actions_form_fetchCategInit = () => {
  return {
    type: actions_actionTypes_FETCH_CATEG_INIT
  };
};
const store_actions_form_fetchCategStart = () => {
  return {
    type: actions_actionTypes_FETCH_CATEG_START
  };
};
const store_actions_form_fetchCategFail = err => {
  return {
    type: actions_actionTypes_FETCH_CATEG_FAIL,
    err
  };
};
const store_actions_form_fetchCategReset = () => {
  return {
    type: actions_actionTypes_FETCH_CATEG_RESET
  };
};
const addpost_store_actions_form_fetchCateg = categ => {
  return {
    type: actions_actionTypes_FETCH_CATEG,
    categ
  };
};
const actions_form_addCategInit = categ => {
  return {
    type: actions_actionTypes_ADD_CATEG_INIT,
    categ
  };
};
const store_actions_form_addCateg = categ => {
  return {
    type: actions_actionTypes_ADD_CATEG,
    categ
  };
};
const actions_form_checkLinkInit = (link, mediaType) => {
  return {
    type: actions_actionTypes_CHECK_LINK_INIT,
    link,
    mediaType
  };
};
const store_actions_form_checkLink = (err, media) => {
  return {
    type: actions_actionTypes_CHECK_LINK,
    err,
    media
  };
};
const store_actions_form_resetLink = () => {
  return {
    type: actions_actionTypes_RESET_LINK
  };
};
const store_actions_form_addSnapshot = snapshot => {
  return {
    type: actions_actionTypes_ADD_SNAPSHOT,
    snapshot
  };
};
const store_actions_form_removeSnapshot = snapshot => {
  return {
    type: actions_actionTypes_REMOVE_SNAPSHOT,
    snapshot
  };
};
const store_actions_form_removeMedia = media => {
  return {
    type: actions_actionTypes_REMOVE_MEDIA,
    media
  };
};
const store_actions_form_submitMedia = media => {
  return {
    type: actions_actionTypes_SUBMIT_MEDIA,
    media
  };
};
const store_actions_form_hideMediaBox = () => {
  return {
    type: actions_actionTypes_HIDE_MEDIA_BOX
  };
};
const store_actions_form_showMediaBox = () => {
  return {
    type: actions_actionTypes_SHOW_MEDIA_BOX
  };
};
const actions_form_fetchUsersInit = userStatus => {
  return {
    type: actions_actionTypes_FETCH_USERS_INIT,
    userStatus
  };
};
const addpost_store_actions_form_fetchUsers = (users, status) => {
  return {
    type: actions_actionTypes_FETCH_USERS,
    users,
    status
  };
};
const store_actions_form_fetchUsersFail = err => {
  return {
    type: actions_actionTypes_FETCH_USERS_FAIL,
    err
  };
};
const store_actions_form_resetTab = () => {
  return {
    type: actions_actionTypes_RESET_TAB
  };
};
const store_actions_form_inputDefaultValue = () => {
  return {
    type: actions_actionTypes_INPUT_DEFAULT_VALUE
  };
};
const actions_form_filterUserInit = (users, filterContent) => {
  return {
    type: actions_actionTypes_FILTER_USER_INIT,
    users,
    filterContent
  };
};
const addpost_store_actions_form_filterUser = users => {
  return {
    type: actions_actionTypes_FILTER_USER,
    users
  };
};
const addpost_store_actions_form_userSelect = users => {
  return {
    type: actions_actionTypes_USER_SELECT,
    users
  };
};
const actions_form_showUserSelectInit = (users, userID) => {
  return {
    type: actions_actionTypes_SHOW_USER_SELECT_INIT,
    users,
    userID
  };
};
const store_actions_form_showUserSelect = users => {
  return {
    type: actions_actionTypes_SHOW_USER_SELECT,
    users
  };
};
const addpost_store_actions_form_submitFormInit = formData => {
  return {
    type: addpost_store_actions_actionTypes_SUBMIT_FORM_INIT,
    formData
  };
};
const addpost_store_actions_form_submitFormFail = err => {
  return {
    type: addpost_store_actions_actionTypes_SUBMIT_FORM_FAIL,
    err
  };
};
const store_actions_form_submitFormSuccess = uploadPercent => {
  return {
    type: actions_actionTypes_SUBMIT_FORM_SUCCESS,
    uploadPercent
  };
};
const addpost_store_actions_form_submitFormStart = () => {
  return {
    type: addpost_store_actions_actionTypes_SUBMIT_FORM_START
  };
};
const actions_form_submitForm = () => {
  return {
    type: addpost_store_actions_actionTypes_SUBMIT_FORM
  };
};
const addpost_store_actions_form_formSubmitted = id => {
  return {
    type: addpost_store_actions_actionTypes_FORM_SUBMITTED,
    id
  };
};
// CONCATENATED MODULE: ./react/addpost/axios.js


const addpost_axios_instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
addpost_axios_instance.defaults.headers.common['authorization'] = 'authorization';
addpost_axios_instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var addpost_axios = (addpost_axios_instance);
// CONCATENATED MODULE: ./react/addpost/store/thunk/submit.js


const store_thunk_submit_submit = formData => {
  return dispatch => {
    dispatch(addpost_store_actions_form_submitFormStart());
    let formContent = new FormData();

    for (let key in formData) {
      if (key !== 'video' && key !== 'image') {
        formContent.append(key, formData[key]);
      }

      if (key === 'video' && formData[key].length > 0) {
        for (let video of formData[key]) {
          let ext = video.file.type.split('/').pop();
          formContent.append(key, video.file, `${video.id}.${ext}`);
        }
      }

      if (key === 'image' && formData[key].length > 0) {
        for (let image of formData[key]) {
          let ext = image.file.type.split('/').pop();
          formContent.append(key, image.file, `${image.id}.${ext}`);
        }
      }
    }

    addpost_axios.post('/add/post', formContent, {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.lengthComputable) {
          const percentage = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          dispatch(store_actions_form_submitFormSuccess(percentage));
        }
      }
    }).then(res => {
      dispatch(addpost_store_actions_form_formSubmitted(res.data));
    }).catch(err => {
      dispatch(addpost_store_actions_form_submitFormFail(err));
    });
  };
};
// CONCATENATED MODULE: ./react/addpost/store/actions/index.js





// CONCATENATED MODULE: ./react/addpost/store/sagas/auth.js



function* store_sagas_auth_checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(effects_["put"])(addpost_store_actions_auth_checkAuth(true));

    try {
      let response = yield addpost_axios.post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(effects_["put"])(addpost_store_actions_auth_checkUserImg(response.data.url));
      } else {
        yield Object(effects_["put"])(addpost_store_actions_auth_checkUserName(response.data.name));
      }
    } catch (err) {}
  }
}
// CONCATENATED MODULE: ./react/addpost/store/sagas/header.js




function* store_sagas_header_fetchNotifyInitSaga(action) {
  try {
    yield Object(effects_["put"])(addpost_store_actions_header_fetchNotifyStart());
    let response = yield addpost_axios.post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(addpost_store_actions_header_fetchNotify(response.data.coll));
    } else {
      yield Object(effects_["put"])(addpost_store_actions_header_fetchNotify([]));
    }
  } catch (err) {
    yield Object(effects_["put"])(actions_header_fetchNotifyFail(err));
  }
}
function* store_sagas_header_changeFavNotifySaga(action) {
  let notify = addpost_shared_utility_changeFav(action.notify, action.notifyID);
  yield Object(effects_["put"])(addpost_store_actions_header_changeFavNotifyStart(notify.updateStartArray));
  yield Object(effects_["put"])(addpost_store_actions_header_changeFavNotify(notify.updateDataArray));
}
function* store_sagas_header_fetchNavlistInitSaga(action) {
  try {
    yield Object(effects_["put"])(actions_header_fetchNavlistStart());
    let response = yield addpost_axios.post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(effects_["put"])(actions_header_fetchNavlist(action.category, response.data));
  } catch (e) {}
}
function* store_sagas_header_fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield addpost_axios.post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(addpost_store_actions_header_fetchNotifyActive(response.data.collTotal));
    }

    ;
  } catch (err) {}
}
function* store_sagas_header_defaultNotifyActiveInitSaga(action) {
  try {
    yield addpost_axios.post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(effects_["put"])(addpost_store_actions_header_defaultNotifyActive());
  } catch (err) {}
}
function* store_sagas_header_headerFilterInitSaga(action) {
  try {
    yield Object(effects_["put"])(addpost_store_actions_header_headerFilterStart(action.filterPos, action.filterLastPos));
    let response = yield addpost_axios.post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(effects_["put"])(addpost_store_actions_header_headerFilter(response.data));
  } catch (err) {
    yield Object(effects_["put"])(addpost_store_actions_header_headerFilterFail(err));
  }
}
// CONCATENATED MODULE: ./react/addpost/store/sagas/main.js



function* store_sagas_main_fetchShareActiveInitSaga(action) {
  try {
    let response = yield addpost_axios.post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });

    if (response.data > 0) {
      yield Object(effects_["put"])(addpost_store_actions_main_fetchShareActive(response.data));
    }

    return;
  } catch (err) {}
}
function* store_sagas_main_resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'share') {
      yield addpost_axios.patch('/header', {
        userID: action.userID
      }, {
        headers: {
          'data-categ': action.curTab
        }
      });
    }

    yield Object(effects_["put"])(addpost_store_actions_main_resetActive(action.curTab));
  } catch (err) {}
}
// CONCATENATED MODULE: ./react/addpost/store/sagas/form.js




function* store_sagas_form_fetchCategInitSaga(action) {
  try {
    yield Object(effects_["put"])(store_actions_form_fetchCategStart());
    const category = yield addpost_axios.post('/post', null, {
      headers: {
        'data-categ': 'postCateg'
      }
    });
    const categ = category.data && category.data.length > 0 ? category.data : null;
    yield Object(effects_["put"])(addpost_store_actions_form_fetchCateg(categ));
  } catch (err) {
    yield Object(effects_["put"])(store_actions_form_fetchCategFail(err));
    yield Object(effects_["delay"])(2000);
    yield Object(effects_["put"])(store_actions_form_fetchCategReset());
  }
}
function* sagas_form_addCategInitSaga(action) {
  let categs = String(action.categ).split(',');
  let transformCateg = [];

  for (let categ of categs) {
    transformCateg.push(String(categ).trim().charAt(0).toUpperCase() + String(categ).trim().toLowerCase().slice(1));
  }

  let removeDuplicate = [...new Set(transformCateg)];
  yield Object(effects_["put"])(store_actions_form_addCateg(removeDuplicate));
}
function* sagas_form_checkLinkInitSaga(action) {
  let link = String(action.link).trim();

  try {
    let response = yield external_axios_default.a.get(link, {
      responseType: 'blob',
      timeout: 8000
    });

    if (response.data.type.startsWith(action.mediaType + '/')) {
      yield Object(effects_["put"])(store_actions_form_checkLink(null, {
        file: response.data,
        url: window.URL.createObjectURL(response.data)
      }));
      return;
    }

    throw new Error(`Unknown format, Only ${action.mediaType} files`);
  } catch (err) {
    yield Object(effects_["put"])(store_actions_form_checkLink(err, null));
  }
}
function* store_sagas_form_fetchUsersInitSaga(action) {
  try {
    let response = yield addpost_axios.post('/users', null, {
      headers: {
        'data-categ': `allteacher-${action.userStatus}`
      }
    });
    yield Object(effects_["put"])(addpost_store_actions_form_fetchUsers(response.data, action.userStatus));
  } catch (err) {
    yield Object(effects_["put"])(store_actions_form_fetchUsersFail(err));
  }
}
function* store_sagas_form_filterUserInitSaga(action) {
  let filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);

  if (!action.filterContent && action.users && action.users.length > 0) {
    filterUser = [...action.users];
  }

  yield Object(effects_["put"])(addpost_store_actions_form_filterUser(filterUser));
}
function* sagas_form_showUserSelectInitSaga(action) {
  let filterUser = action.users.filter(user => action.userID.indexOf(user.id) !== -1);
  yield Object(effects_["put"])(store_actions_form_showUserSelect(filterUser));
}
// CONCATENATED MODULE: ./react/addpost/store/sagas/index.js






function* addpost_store_sagas_watchAuth() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actions_actionTypes_CHECK_AUTH_INIT, store_sagas_auth_checkAuthInitSaga)]);
}
function* addpost_store_sagas_watchHeader() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actions_actionTypes_FETCH_NOTIFY_INIT, store_sagas_header_fetchNotifyInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT, store_sagas_header_changeFavNotifySaga), Object(effects_["takeEvery"])(actions_actionTypes_FETCH_NAVLIST_INIT, store_sagas_header_fetchNavlistInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT, store_sagas_header_fetchNotifyActiveInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT, store_sagas_header_defaultNotifyActiveInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_FETCH_SHARE_ACTIVE_INIT, store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_HEADER_FILTER_INIT, store_sagas_header_headerFilterInitSaga)]);
}
function* addpost_store_sagas_watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actions_actionTypes_FETCH_CATEG_INIT, store_sagas_form_fetchCategInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_ADD_CATEG_INIT, sagas_form_addCategInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_CHECK_LINK_INIT, sagas_form_checkLinkInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_FETCH_USERS_INIT, store_sagas_form_fetchUsersInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_FILTER_USER_INIT, store_sagas_form_filterUserInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_SHOW_USER_SELECT_INIT, sagas_form_showUserSelectInitSaga)]);
}
function* addpost_store_sagas_watchMain() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actions_actionTypes_FETCH_SHARE_ACTIVE_INIT, store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(actions_actionTypes_RESET_ACTIVE_INIT, store_sagas_main_resetActiveInitSaga)]);
}
function* addpost_store_sagas_rootSaga() {
  yield Object(effects_["all"])([addpost_store_sagas_watchAuth(), addpost_store_sagas_watchHeader(), addpost_store_sagas_watchForm(), addpost_store_sagas_watchMain()]);
}
// CONCATENATED MODULE: ./react/addpost/store.js









const addpost_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function addpost_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: addpost_store_reducers_auth,
    header: addpost_store_reducers_header,
    main: addpost_store_reducers_main,
    form: addpost_store_reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, addpost_store_bindMiddleware([external_redux_thunk_default.a, sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(addpost_store_sagas_rootSaga);
  return store;
}

/* harmony default export */ var addpost_store = (addpost_store_configureStore);
// CONCATENATED MODULE: ./react/addque/store/actions/actionTypes.js
const store_actions_actionTypes_CHECK_AUTH_INIT = 'CHECK_AUTH_INIT';
const store_actions_actionTypes_CHECK_AUTH = 'CHECK_AUTH';
const store_actions_actionTypes_CHECK_USERIMG = 'CHECK_USERIMG';
const store_actions_actionTypes_CHECK_USERNAME = 'CHECK_USERNAME';
const store_actions_actionTypes_HEADER_FORM_EXPAND = 'HEADER_FORM_EXPAND';
const store_actions_actionTypes_HEADER_FORM_SM = 'HEADER_FORM_SM';
const store_actions_actionTypes_HEADER_NAV_DEFAULT = 'HEADER_NAV_DEFAULT';
const store_actions_actionTypes_HEADER_FILTER_INIT = 'HEADER_FILTER_INIT';
const store_actions_actionTypes_HEADER_FILTER_START = 'HEADER_FILTER_START';
const store_actions_actionTypes_HEADER_FILTER_FAIL = 'HEADER_FILTER_FAIL';
const store_actions_actionTypes_HEADER_FILTER = 'HEADER_FILTER';
const store_actions_actionTypes_HEADER_FILTER_CLOSE = 'HEADER_FILTER_CLOSE';
const store_actions_actionTypes_HEADER_ADD_NEW = 'HEADER_ADD_NEW';
const store_actions_actionTypes_FETCH_NOTIFY_INIT = 'FETCH_NOTIFY_INIT';
const store_actions_actionTypes_FETCH_NOTIFY_START = 'FETCH_NOTIFY_START';
const store_actions_actionTypes_FETCH_NOTIFY_SUCCESS = 'FETCH_NOTIFY_SUCCESS';
const store_actions_actionTypes_FETCH_NOTIFY_FAIL = 'FETCH_NOTIFY_FAIL';
const store_actions_actionTypes_FETCH_NOTIFY = 'FETCH_NOTIFY';
const store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT = 'CHANGE_FAVORITE_NOTIFY_INIT';
const store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START = 'CHANGE_FAVORITE_NOTIFY_START';
const store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL = 'CHANGE_FAVORITE_NOTIFY_FAIL';
const store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY = 'CHANGE_FAVORITE_NOTIFY';
const store_actions_actionTypes_SHOW_NAV_LIST = 'SHOW_NAV_LIST';
const store_actions_actionTypes_FETCH_NAVLIST_INIT = 'FETCH_NAVLIST_INIT';
const store_actions_actionTypes_FETCH_NAVLIST_START = 'FETCH_NAVLIST_START';
const store_actions_actionTypes_FETCH_NAVLIST_SUCCESS = 'FETCH_NAVLIST_SUCCESS';
const store_actions_actionTypes_FETCH_NAVLIST_FAIL = 'FETCH_NAVLIST_FAIL';
const store_actions_actionTypes_FETCH_NAVLIST = 'FETCH_NAVLIST';
const store_actions_actionTypes_SHOW_USER_OPTION = 'SHOW_USER_OPTION';
const store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT = 'FETCH_SHARE_ACTIVE_INIT';
const store_actions_actionTypes_FETCH_SHARE_ACTIVE = 'FETCH_SHARE_ACTIVE';
const store_actions_actionTypes_RESET_ACTIVE_INIT = 'RESET_ACTIVE_INIT';
const store_actions_actionTypes_RESET_ACTIVE = 'RESET_ACTIVE';
const store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT = 'FETCH_NOTIFY_ACTIVE_INIT';
const store_actions_actionTypes_FETCH_NOTIFY_ACTIVE = 'FETCH_NOTIFY_ACTIVE';
const store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT = 'DEFAULT_NOTIFYACTIVE_INIT';
const store_actions_actionTypes_DEFAULT_NOTIFYACTIVE = 'DEFAULT_NOTIFYACTIVE';
const store_actions_actionTypes_FETCH_CATEG_INIT = 'FETCH_CATEG_INIT';
const store_actions_actionTypes_FETCH_CATEG_START = 'FETCH_CATEG_START';
const store_actions_actionTypes_FETCH_CATEG_FAIL = 'FETCH_CATEG_FAIL';
const store_actions_actionTypes_FETCH_CATEG_RESET = 'FETCH_CATEG_RESET';
const store_actions_actionTypes_FETCH_CATEG = 'FETCH_CATEG';
const store_actions_actionTypes_ADD_CATEG_INIT = 'ADD_CATEG_INIT';
const store_actions_actionTypes_ADD_CATEG = 'ADD_CATEG';
const store_actions_actionTypes_HIDE_MEDIA_BOX = 'HIDE_MEDIA_BOX';
const store_actions_actionTypes_SHOW_MEDIA_BOX = 'SHOW_MEDIA_BOX';
const store_actions_actionTypes_CHECK_LINK_INIT = 'CHECK_LINK_INIT';
const store_actions_actionTypes_CHECK_LINK = 'CHECK_LINK';
const store_actions_actionTypes_RESET_LINK = 'RESET_LINK';
const store_actions_actionTypes_ADD_SNAPSHOT = 'ADD_SNAPSHOT';
const store_actions_actionTypes_REMOVE_SNAPSHOT = 'REMOVE_SNAPSHOT';
const store_actions_actionTypes_SUBMIT_MEDIA = 'SUBMIT_MEDIA';
const store_actions_actionTypes_FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const store_actions_actionTypes_RESET_TAB = 'RESET_TAB';
const store_actions_actionTypes_FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const store_actions_actionTypes_FETCH_USERS = 'FETCH_USERS';
const store_actions_actionTypes_INPUT_DEFAULT_VALUE = 'INPUT_DEFAULT_VALUE';
const store_actions_actionTypes_FILTER_USER_INIT = 'FILTER_USER_INIT';
const store_actions_actionTypes_FILTER_USER = 'FILTER_USER';
const store_actions_actionTypes_USER_SELECT = 'USER_SELECT';
const store_actions_actionTypes_REMOVE_MEDIA = 'REMOVE_MEDIA';
const store_actions_actionTypes_SHOW_USER_SELECT_INIT = 'SHOW_USER_SELECT_INIT';
const store_actions_actionTypes_SHOW_USER_SELECT = 'SHOW_USER_SELECT';
const addque_store_actions_actionTypes_SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const addque_store_actions_actionTypes_SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const store_actions_actionTypes_SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
const addque_store_actions_actionTypes_SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const addque_store_actions_actionTypes_SUBMIT_FORM = 'SUBMIT_FORM';
const addque_store_actions_actionTypes_FORM_SUBMITTED = 'FORM_SUBMITTED';
// CONCATENATED MODULE: ./react/addque/shared/utility.js
function addque_shared_utility_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function addque_shared_utility_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { addque_shared_utility_ownKeys(Object(source), true).forEach(function (key) { addque_shared_utility_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { addque_shared_utility_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function addque_shared_utility_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const addque_shared_utility_updateObject = (oldObject, updatedProperties) => {
  return addque_shared_utility_objectSpread({}, oldObject, {}, updatedProperties);
};
const addque_shared_utility_transformNumber = favNumber => {
  const favNumArray = String(favNumber).split("");

  if (favNumArray.length === 4) {
    return `${favNumArray[0]}K`;
  }

  if (favNumArray.length === 5) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}K`;
  }

  if (favNumArray.length === 6) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}K`;
  }

  if (favNumArray.length === 7) {
    const favNum = favNumArray[0];
    return `${favNum}M`;
  }

  if (favNumArray.length === 8) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}M`;
  }

  if (favNumArray.length === 9) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}M`;
  }

  if (favNumArray.length === 10) {
    const favNum = favNumArray[0];
    return `${favNum}B`;
  }

  if (favNumArray.length === 11) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}B`;
  }

  return favNumber;
};
const addque_shared_utility_transformString = val => {
  const curVal = String(val).substr(0, 115);
  return curVal;
};
function addque_shared_utility_changeFav(datas, dataID) {
  const dataArray = [...datas];
  let dtIndex;
  let dtArray = dataArray.filter((data, index) => {
    if (data.id === dataID) {
      dtIndex = index;
      return true;
    }

    return false;
  });

  if (dtArray.length > 0) {
    let data = dtArray[0];
    data = addque_shared_utility_updateObject(data, {
      liked: !data.liked
    });

    if (data.liked) {
      data = addque_shared_utility_updateObject(data, {
        favorite: data.favorite + 1
      });
    } else {
      data = addque_shared_utility_updateObject(data, {
        favorite: data.favorite - 1
      });
    }

    const updateDataArray = [...dataArray];
    updateDataArray[dtIndex] = data;
    let updateStartArray = [...updateDataArray];
    data = addque_shared_utility_updateObject(data, {
      changeFavActive: data.liked
    });
    updateStartArray[dtIndex] = data;
    return {
      updateStartArray,
      updateDataArray
    };
  }

  return dataArray;
}
;
const addque_shared_utility_checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};
const shared_utility_getSnapshot = (url, mediaType) => {
  return new Promise((resolve, reject) => {
    let media = document.createElement(mediaType);

    function multipleEventListener(el, mediaLoadHandler) {
      'loadedmetadata loadeddata suspend'.split(' ').forEach(event => {
        el.addEventListener(event, mediaLoadHandler, false);
      });
    }

    media.onerror = function () {
      reject(media.error.message);
    };

    media.src = url;
    multipleEventListener(media, mediaLoadHandler);
    let event_fired = 0;

    function mediaLoadHandler() {
      if (++event_fired === 3) {
        media.currentTime = 1;
        media.addEventListener('seeked', function (event) {
          resolve();
        });
      }
    }
  });
};
const addque_shared_utility_getImageURL = url => {
  let image = new Image();
  image.src = url;
  let canvas = document.createElement('canvas');
  return new Promise((resolve, reject) => {
    if (canvas.getContext) {
      image.onload = function () {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0);
        let snapShot = canvas.toDataURL('image/png');
        resolve(snapShot);
      };
    } else {
      reject('Please update your Browser');
    }
  });
};
// CONCATENATED MODULE: ./react/addque/store/reducers/auth.js


const addque_store_reducers_auth_initialState = {
  status: false,
  img: null,
  username: null
};

const addque_store_reducers_auth_checkAuth = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    status: action.status
  });
};

const addque_store_reducers_auth_checkUserImg = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    img: action.img
  });
};

const addque_store_reducers_auth_checkUserName = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    username: action.name
  });
};

const addque_store_reducers_auth_reducer = (state = addque_store_reducers_auth_initialState, action) => {
  switch (action.type) {
    case store_actions_actionTypes_CHECK_AUTH:
      return addque_store_reducers_auth_checkAuth(state, action);

    case store_actions_actionTypes_CHECK_USERIMG:
      return addque_store_reducers_auth_checkUserImg(state, action);

    case store_actions_actionTypes_CHECK_USERNAME:
      return addque_store_reducers_auth_checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var addque_store_reducers_auth = (addque_store_reducers_auth_reducer);
// CONCATENATED MODULE: ./react/addque/store/reducers/header.js


const addque_store_reducers_header_initialState = {
  expand: false,
  hideFormSm: false,
  addNew: false,
  notify: null,
  hidNotify: false,
  navList: null,
  navListCateg: null,
  hidNavList: false,
  hidUserOption: false,
  notifyActive: null,
  default: false,
  searchCnt: null,
  filterPos: 0,
  filterLastPos: 0,
  searchCntErr: null,
  filterStart: false
};

const addque_store_reducers_header_formExpand = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const addque_store_reducers_header_formSm = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    hideFormSm: false,
    default: false
  });
};

const addque_store_reducers_header_navDefault = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    expand: false,
    hideFormSm: true,
    addNew: false,
    hidNotify: true,
    hidNavList: true,
    hidUserOption: true,
    default: true
  });
};

const addque_store_reducers_header_addNew = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    addNew: !state.addNew,
    default: false
  });
};

const addque_store_reducers_header_fetchNotify = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const addque_store_reducers_header_fetchNotifyStart = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const addque_store_reducers_header_changeFavNotifyStart = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const addque_store_reducers_header_changeFavNotify = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const addque_store_reducers_header_showNavList = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const addque_store_reducers_header_fetchNavListStart = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    navList: null,
    navListCateg: null
  });
};

const addque_store_reducers_header_fetchNavList = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const addque_store_reducers_header_showUserOption = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const addque_store_reducers_header_fetchNotifyActive = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    notifyActive: action.notifyActive
  });
};

const addque_store_reducers_header_defaultNotifyActive = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    notifyActive: null
  });
};

const addque_store_reducers_header_headerFilterStart = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const addque_store_reducers_header_headerFilterFail = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    searchCntErr: action.searchCntErr
  });
};

const addque_store_reducers_header_headerFilter = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    searchCnt: action.searchCnt
  });
};

const addque_store_reducers_header_headerFilterClose = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    searchCnt: null,
    filterStart: false
  });
};

const addque_store_reducers_header_reducer = (state = addque_store_reducers_header_initialState, action) => {
  switch (action.type) {
    case store_actions_actionTypes_HEADER_FORM_EXPAND:
      return addque_store_reducers_header_formExpand(state, action);

    case store_actions_actionTypes_HEADER_FORM_SM:
      return addque_store_reducers_header_formSm(state, action);

    case store_actions_actionTypes_HEADER_NAV_DEFAULT:
      return addque_store_reducers_header_navDefault(state, action);

    case store_actions_actionTypes_HEADER_ADD_NEW:
      return addque_store_reducers_header_addNew(state, action);

    case store_actions_actionTypes_FETCH_NOTIFY_START:
      return addque_store_reducers_header_fetchNotifyStart(state, action);

    case store_actions_actionTypes_FETCH_NOTIFY:
      return addque_store_reducers_header_fetchNotify(state, action);

    case store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START:
      return addque_store_reducers_header_changeFavNotifyStart(state, action);

    case store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY:
      return addque_store_reducers_header_changeFavNotify(state, action);

    case store_actions_actionTypes_SHOW_NAV_LIST:
      return addque_store_reducers_header_showNavList(state, action);

    case store_actions_actionTypes_FETCH_NAVLIST_START:
      return addque_store_reducers_header_fetchNavListStart(state, action);

    case store_actions_actionTypes_FETCH_NAVLIST:
      return addque_store_reducers_header_fetchNavList(state, action);

    case store_actions_actionTypes_SHOW_USER_OPTION:
      return addque_store_reducers_header_showUserOption(state, action);

    case store_actions_actionTypes_FETCH_NOTIFY_ACTIVE:
      return addque_store_reducers_header_fetchNotifyActive(state, action);

    case store_actions_actionTypes_DEFAULT_NOTIFYACTIVE:
      return addque_store_reducers_header_defaultNotifyActive(state, action);

    case store_actions_actionTypes_HEADER_FILTER_START:
      return addque_store_reducers_header_headerFilterStart(state, action);

    case store_actions_actionTypes_HEADER_FILTER_FAIL:
      return addque_store_reducers_header_headerFilterFail(state, action);

    case store_actions_actionTypes_HEADER_FILTER_CLOSE:
      return addque_store_reducers_header_headerFilterClose(state, action);

    case store_actions_actionTypes_HEADER_FILTER:
      return addque_store_reducers_header_headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var addque_store_reducers_header = (addque_store_reducers_header_reducer);
// CONCATENATED MODULE: ./react/addque/store/reducers/form.js


const addque_store_reducers_form_initialState = {
  categ: null,
  showCateg: false,
  categErr: null,
  newCateg: null,
  hideMediaBox: false,
  hidAddItm: false,
  linkValid: null,
  snapshot: [],
  media: {},
  curTab: 'online',
  startUser: true,
  users: null,
  onlineUser: [],
  offlineUser: [],
  filteredUser: null,
  defaultValue: false,
  uploadPercent: null,
  submitError: null,
  submitForm: false,
  id: null
};

const addque_store_reducers_form_fetchCategStart = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    showCateg: true,
    categErr: null
  });
};

const addque_store_reducers_form_fetchCategFail = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    categErr: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const addque_store_reducers_form_fetchCategReset = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    categErr: null,
    showCateg: false
  });
};

const addque_store_reducers_form_fetchCateg = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    categ: action.categ,
    showCateg: action.categ !== null
  });
};

const addque_store_reducers_form_addCateg = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    newCateg: action.categ
  });
};

const addque_store_reducers_form_checkLink = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    linkValid: {
      err: action.err,
      media: action.media
    }
  });
};

const addque_store_reducers_form_resetLink = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    linkValid: null
  });
};

const addque_store_reducers_form_addSnapshot = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const addque_store_reducers_form_removeSnapshot = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const addque_store_reducers_form_removeMedia = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    media: action.media
  });
};

const addque_store_reducers_form_submitMedia = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    media: action.media,
    hideMediaBox: true
  });
};

const addque_store_reducers_form_hideMediaBox = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    hideMediaBox: true
  });
};

const addque_store_reducers_form_showMediaBox = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    hideMediaBox: false
  });
};

const addque_store_reducers_form_fetchUsers = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    users: action.users,
    filteredUser: null,
    startUser: false,
    defaultValue: true,
    onlineUser: action.status === 'online' ? action.users : state.onlineUser,
    offlineUser: action.status === 'offline' ? action.users : state.offlineUser,
    curTab: action.status
  });
};

const addque_store_reducers_form_fetchUsersFail = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const addque_store_reducers_form_resetTab = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const addque_store_reducers_form_inputDefaultValue = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    defaultValue: false
  });
};

const addque_store_reducers_form_filterUser = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    filteredUser: action.users
  });
};

const addque_store_reducers_form_userSelect = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    media: action.users
  });
};

const addque_store_reducers_form_showUserSelect = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    users: action.users,
    curTab: 'userSelect',
    filteredUser: null,
    defaultValue: true
  });
};

const addque_store_reducers_form_submitFormStart = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    submitForm: true,
    submitError: null,
    submitFiles: 0
  });
};

const addque_store_reducers_form_submitFormSuccess = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    uploadPercent: action.uploadPercent
  });
};

const addque_store_reducers_form_submitFormFail = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    submitError: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const addque_store_reducers_form_formSubmitted = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    id: action.id
  });
};

const addque_store_reducers_form_reducer = (state = addque_store_reducers_form_initialState, action) => {
  switch (action.type) {
    case store_actions_actionTypes_FETCH_CATEG_START:
      return addque_store_reducers_form_fetchCategStart(state, action);

    case store_actions_actionTypes_FETCH_CATEG_FAIL:
      return addque_store_reducers_form_fetchCategFail(state, action);

    case store_actions_actionTypes_FETCH_CATEG_RESET:
      return addque_store_reducers_form_fetchCategReset(state, action);

    case store_actions_actionTypes_FETCH_CATEG:
      return addque_store_reducers_form_fetchCateg(state, action);

    case store_actions_actionTypes_ADD_CATEG:
      return addque_store_reducers_form_addCateg(state, action);

    case store_actions_actionTypes_HIDE_MEDIA_BOX:
      return addque_store_reducers_form_hideMediaBox(state, action);

    case store_actions_actionTypes_SHOW_MEDIA_BOX:
      return addque_store_reducers_form_showMediaBox(state, action);

    case store_actions_actionTypes_CHECK_LINK:
      return addque_store_reducers_form_checkLink(state, action);

    case store_actions_actionTypes_RESET_LINK:
      return addque_store_reducers_form_resetLink(state, action);

    case store_actions_actionTypes_ADD_SNAPSHOT:
      return addque_store_reducers_form_addSnapshot(state, action);

    case store_actions_actionTypes_REMOVE_SNAPSHOT:
      return addque_store_reducers_form_removeSnapshot(state, action);

    case store_actions_actionTypes_REMOVE_MEDIA:
      return addque_store_reducers_form_removeMedia(state, action);

    case store_actions_actionTypes_SUBMIT_MEDIA:
      return addque_store_reducers_form_submitMedia(state, action);

    case store_actions_actionTypes_FETCH_USERS:
      return addque_store_reducers_form_fetchUsers(state, action);

    case store_actions_actionTypes_FETCH_USERS_FAIL:
      return addque_store_reducers_form_fetchUsersFail(state, action);

    case store_actions_actionTypes_RESET_TAB:
      return addque_store_reducers_form_resetTab(state, action);

    case store_actions_actionTypes_INPUT_DEFAULT_VALUE:
      return addque_store_reducers_form_inputDefaultValue(state, action);

    case store_actions_actionTypes_FILTER_USER:
      return addque_store_reducers_form_filterUser(state, action);

    case store_actions_actionTypes_USER_SELECT:
      return addque_store_reducers_form_userSelect(state, action);

    case store_actions_actionTypes_SHOW_USER_SELECT:
      return addque_store_reducers_form_showUserSelect(state, action);

    case addque_store_actions_actionTypes_SUBMIT_FORM_START:
      return addque_store_reducers_form_submitFormStart(state, action);

    case store_actions_actionTypes_SUBMIT_FORM_SUCCESS:
      return addque_store_reducers_form_submitFormSuccess(state, action);

    case addque_store_actions_actionTypes_SUBMIT_FORM_FAIL:
      return addque_store_reducers_form_submitFormFail(state, action);

    case addque_store_actions_actionTypes_FORM_SUBMITTED:
      return addque_store_reducers_form_formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var addque_store_reducers_form = (addque_store_reducers_form_reducer);
// CONCATENATED MODULE: ./react/addque/store/reducers/main.js
function addque_store_reducers_main_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function addque_store_reducers_main_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { addque_store_reducers_main_ownKeys(Object(source), true).forEach(function (key) { addque_store_reducers_main_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { addque_store_reducers_main_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function addque_store_reducers_main_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const addque_store_reducers_main_initialState = {
  shareActive: null
};

const addque_store_reducers_main_fetchShareActive = (state, action) => {
  return addque_shared_utility_updateObject(state, {
    shareActive: action.shareActive
  });
};

const addque_store_reducers_main_resetActive = (state, action) => {
  let reset = action.curTab === 'post' ? {
    ptActive: null
  } : {
    shareActive: null
  };
  return addque_shared_utility_updateObject(state, addque_store_reducers_main_objectSpread({}, reset));
};

const addque_store_reducers_main_reducer = (state = addque_store_reducers_main_initialState, action) => {
  switch (action.type) {
    case store_actions_actionTypes_FETCH_SHARE_ACTIVE:
      return addque_store_reducers_main_fetchShareActive(state, action);

    case store_actions_actionTypes_RESET_ACTIVE:
      return addque_store_reducers_main_resetActive(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var addque_store_reducers_main = (addque_store_reducers_main_reducer);
// CONCATENATED MODULE: ./react/addque/store/actions/auth.js

const store_actions_auth_checkAuthInit = () => {
  return {
    type: store_actions_actionTypes_CHECK_AUTH_INIT
  };
};
const addque_store_actions_auth_checkAuth = status => {
  return {
    type: store_actions_actionTypes_CHECK_AUTH,
    status
  };
};
const addque_store_actions_auth_checkUserImg = img => {
  return {
    type: store_actions_actionTypes_CHECK_USERIMG,
    img
  };
};
const addque_store_actions_auth_checkUserName = name => {
  return {
    type: store_actions_actionTypes_CHECK_USERNAME,
    name
  };
};
// CONCATENATED MODULE: ./react/addque/store/actions/header.js

const store_actions_header_headerFormExpand = () => {
  return {
    type: store_actions_actionTypes_HEADER_FORM_EXPAND
  };
};
const store_actions_header_headerFormSm = () => {
  return {
    type: store_actions_actionTypes_HEADER_FORM_SM
  };
};
const store_actions_header_headerNavDefault = () => {
  return {
    type: store_actions_actionTypes_HEADER_NAV_DEFAULT
  };
};
const store_actions_header_headerAddNew = () => {
  return {
    type: store_actions_actionTypes_HEADER_ADD_NEW
  };
};
const store_actions_header_fetchNotifyInit = () => {
  return {
    type: store_actions_actionTypes_FETCH_NOTIFY_INIT
  };
};
const addque_store_actions_header_fetchNotifyStart = () => {
  return {
    type: store_actions_actionTypes_FETCH_NOTIFY_START
  };
};
const store_actions_header_fetchNotifySuccess = () => {
  return {
    type: store_actions_actionTypes_FETCH_NOTIFY_SUCCESS
  };
};
const store_actions_header_fetchNotifyFail = err => {
  return {
    type: store_actions_actionTypes_FETCH_NOTIFY_FAIL,
    err
  };
};
const addque_store_actions_header_fetchNotify = notify => {
  return {
    type: store_actions_actionTypes_FETCH_NOTIFY,
    notify
  };
};
const store_actions_header_changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT,
    notify,
    notifyID
  };
};
const addque_store_actions_header_changeFavNotifyStart = notify => {
  return {
    type: store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START,
    notify
  };
};
const store_actions_header_changeFavNotifyFail = notify => {
  return {
    type: store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL,
    notify
  };
};
const addque_store_actions_header_changeFavNotify = notify => {
  return {
    type: store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY,
    notify
  };
};
const addque_store_actions_header_showNavList = () => {
  return {
    type: store_actions_actionTypes_SHOW_NAV_LIST
  };
};
const store_actions_header_fetchNavlistInit = category => {
  return {
    type: store_actions_actionTypes_FETCH_NAVLIST_INIT,
    category
  };
};
const store_actions_header_fetchNavlistStart = () => {
  return {
    type: store_actions_actionTypes_FETCH_NAVLIST_START
  };
};
const store_actions_header_fetchNavlist = (category, navList) => {
  return {
    type: store_actions_actionTypes_FETCH_NAVLIST,
    category,
    navList
  };
};
const addque_store_actions_header_showUserOption = () => {
  return {
    type: store_actions_actionTypes_SHOW_USER_OPTION
  };
};
const store_actions_header_fetchNotifyactiveInit = userID => {
  return {
    type: store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT,
    userID
  };
};
const addque_store_actions_header_fetchNotifyActive = notifyActive => {
  return {
    type: store_actions_actionTypes_FETCH_NOTIFY_ACTIVE,
    notifyActive
  };
};
const store_actions_header_defaultNotifyactiveInit = () => {
  return {
    type: store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT
  };
};
const addque_store_actions_header_defaultNotifyActive = () => {
  return {
    type: store_actions_actionTypes_DEFAULT_NOTIFYACTIVE
  };
};
const store_actions_header_headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: store_actions_actionTypes_HEADER_FILTER_INIT,
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const addque_store_actions_header_headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: store_actions_actionTypes_HEADER_FILTER_START,
    filterPos,
    filterLastPos
  };
};
const addque_store_actions_header_headerFilterFail = searchCntErr => {
  return {
    type: store_actions_actionTypes_HEADER_FILTER_FAIL,
    searchCntErr
  };
};
const addque_store_actions_header_headerFilter = searchCnt => {
  return {
    type: store_actions_actionTypes_HEADER_FILTER,
    searchCnt
  };
};
const addque_store_actions_header_headerFilterClose = () => {
  return {
    type: store_actions_actionTypes_HEADER_FILTER_CLOSE
  };
};
// CONCATENATED MODULE: ./react/addque/store/actions/main.js

const store_actions_main_fetchShareactiveInit = userID => {
  return {
    type: store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT,
    userID
  };
};
const addque_store_actions_main_fetchShareActive = shareActive => {
  return {
    type: store_actions_actionTypes_FETCH_SHARE_ACTIVE,
    shareActive
  };
};
const store_actions_main_resetActiveInit = (userID, curTab) => {
  return {
    type: store_actions_actionTypes_RESET_ACTIVE_INIT,
    userID,
    curTab
  };
};
const addque_store_actions_main_resetActive = curTab => {
  return {
    type: store_actions_actionTypes_RESET_ACTIVE,
    curTab
  };
};
// CONCATENATED MODULE: ./react/addque/store/actions/form.js

const store_actions_form_fetchCategInit = () => {
  return {
    type: store_actions_actionTypes_FETCH_CATEG_INIT
  };
};
const addque_store_actions_form_fetchCategStart = () => {
  return {
    type: store_actions_actionTypes_FETCH_CATEG_START
  };
};
const addque_store_actions_form_fetchCategFail = err => {
  return {
    type: store_actions_actionTypes_FETCH_CATEG_FAIL,
    err
  };
};
const addque_store_actions_form_fetchCategReset = () => {
  return {
    type: store_actions_actionTypes_FETCH_CATEG_RESET
  };
};
const addque_store_actions_form_fetchCateg = categ => {
  return {
    type: store_actions_actionTypes_FETCH_CATEG,
    categ
  };
};
const store_actions_form_addCategInit = categ => {
  return {
    type: store_actions_actionTypes_ADD_CATEG_INIT,
    categ
  };
};
const addque_store_actions_form_addCateg = categ => {
  return {
    type: store_actions_actionTypes_ADD_CATEG,
    categ
  };
};
const store_actions_form_checkLinkInit = (link, mediaType) => {
  return {
    type: store_actions_actionTypes_CHECK_LINK_INIT,
    link,
    mediaType
  };
};
const addque_store_actions_form_checkLink = (err, media) => {
  return {
    type: store_actions_actionTypes_CHECK_LINK,
    err,
    media
  };
};
const addque_store_actions_form_resetLink = () => {
  return {
    type: store_actions_actionTypes_RESET_LINK
  };
};
const addque_store_actions_form_addSnapshot = snapshot => {
  return {
    type: store_actions_actionTypes_ADD_SNAPSHOT,
    snapshot
  };
};
const addque_store_actions_form_removeSnapshot = snapshot => {
  return {
    type: store_actions_actionTypes_REMOVE_SNAPSHOT,
    snapshot
  };
};
const addque_store_actions_form_removeMedia = media => {
  return {
    type: store_actions_actionTypes_REMOVE_MEDIA,
    media
  };
};
const addque_store_actions_form_submitMedia = media => {
  return {
    type: store_actions_actionTypes_SUBMIT_MEDIA,
    media
  };
};
const addque_store_actions_form_hideMediaBox = () => {
  return {
    type: store_actions_actionTypes_HIDE_MEDIA_BOX
  };
};
const addque_store_actions_form_showMediaBox = () => {
  return {
    type: store_actions_actionTypes_SHOW_MEDIA_BOX
  };
};
const store_actions_form_fetchUsersInit = userStatus => {
  return {
    type: store_actions_actionTypes_FETCH_USERS_INIT,
    userStatus
  };
};
const addque_store_actions_form_fetchUsers = (users, status) => {
  return {
    type: store_actions_actionTypes_FETCH_USERS,
    users,
    status
  };
};
const addque_store_actions_form_fetchUsersFail = err => {
  return {
    type: store_actions_actionTypes_FETCH_USERS_FAIL,
    err
  };
};
const addque_store_actions_form_resetTab = () => {
  return {
    type: store_actions_actionTypes_RESET_TAB
  };
};
const addque_store_actions_form_inputDefaultValue = () => {
  return {
    type: store_actions_actionTypes_INPUT_DEFAULT_VALUE
  };
};
const store_actions_form_filterUserInit = (users, filterContent) => {
  return {
    type: store_actions_actionTypes_FILTER_USER_INIT,
    users,
    filterContent
  };
};
const addque_store_actions_form_filterUser = users => {
  return {
    type: store_actions_actionTypes_FILTER_USER,
    users
  };
};
const addque_store_actions_form_userSelect = users => {
  return {
    type: store_actions_actionTypes_USER_SELECT,
    users
  };
};
const store_actions_form_showUserSelectInit = (users, userID) => {
  return {
    type: store_actions_actionTypes_SHOW_USER_SELECT_INIT,
    users,
    userID
  };
};
const addque_store_actions_form_showUserSelect = users => {
  return {
    type: store_actions_actionTypes_SHOW_USER_SELECT,
    users
  };
};
const addque_store_actions_form_submitFormInit = formData => {
  return {
    type: addque_store_actions_actionTypes_SUBMIT_FORM_INIT,
    formData
  };
};
const addque_store_actions_form_submitFormFail = err => {
  return {
    type: addque_store_actions_actionTypes_SUBMIT_FORM_FAIL,
    err
  };
};
const addque_store_actions_form_submitFormSuccess = uploadPercent => {
  return {
    type: store_actions_actionTypes_SUBMIT_FORM_SUCCESS,
    uploadPercent
  };
};
const addque_store_actions_form_submitFormStart = () => {
  return {
    type: addque_store_actions_actionTypes_SUBMIT_FORM_START
  };
};
const store_actions_form_submitForm = () => {
  return {
    type: addque_store_actions_actionTypes_SUBMIT_FORM
  };
};
const addque_store_actions_form_formSubmitted = id => {
  return {
    type: addque_store_actions_actionTypes_FORM_SUBMITTED,
    id
  };
};
// CONCATENATED MODULE: ./react/addque/axios.js


const addque_axios_instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
addque_axios_instance.defaults.headers.common['authorization'] = 'authorization';
addque_axios_instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var addque_axios = (addque_axios_instance);
// CONCATENATED MODULE: ./react/addque/store/thunk/submit.js


const addque_store_thunk_submit_submit = formData => {
  return dispatch => {
    dispatch(addque_store_actions_form_submitFormStart());
    let formContent = new FormData();

    for (let key in formData) {
      if (key !== 'video' && key !== 'image') {
        formContent.append(key, formData[key]);
      }

      if (key === 'video' && formData[key].length > 0) {
        for (let video of formData[key]) {
          let ext = video.file.type.split('/').pop();
          formContent.append(key, video.file, `${video.id}.${ext}`);
        }
      }

      if (key === 'image' && formData[key].length > 0) {
        for (let image of formData[key]) {
          let ext = image.file.type.split('/').pop();
          formContent.append(key, image.file, `${image.id}.${ext}`);
        }
      }
    }

    addque_axios.post('/add/question', formContent, {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.lengthComputable) {
          const percentage = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          dispatch(addque_store_actions_form_submitFormSuccess(percentage));
        }
      }
    }).then(res => {
      dispatch(addque_store_actions_form_formSubmitted(res.data));
    }).catch(err => {
      dispatch(addque_store_actions_form_submitFormFail(err));
    });
  };
};
// CONCATENATED MODULE: ./react/addque/store/actions/index.js





// CONCATENATED MODULE: ./react/addque/store/sagas/auth.js



function* addque_store_sagas_auth_checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(effects_["put"])(addque_store_actions_auth_checkAuth(true));

    try {
      let response = yield addque_axios.post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(effects_["put"])(addque_store_actions_auth_checkUserImg(response.data.url));
      } else {
        yield Object(effects_["put"])(addque_store_actions_auth_checkUserName(response.data.name));
      }
    } catch (err) {}
  }
}
// CONCATENATED MODULE: ./react/addque/store/sagas/header.js




function* addque_store_sagas_header_fetchNotifyInitSaga(action) {
  try {
    yield Object(effects_["put"])(addque_store_actions_header_fetchNotifyStart());
    let response = yield addque_axios.post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(addque_store_actions_header_fetchNotify(response.data.coll));
    } else {
      yield Object(effects_["put"])(addque_store_actions_header_fetchNotify([]));
    }
  } catch (err) {
    yield Object(effects_["put"])(store_actions_header_fetchNotifyFail(err));
  }
}
function* addque_store_sagas_header_changeFavNotifySaga(action) {
  let notify = addque_shared_utility_changeFav(action.notify, action.notifyID);
  yield Object(effects_["put"])(addque_store_actions_header_changeFavNotifyStart(notify.updateStartArray));
  yield Object(effects_["put"])(addque_store_actions_header_changeFavNotify(notify.updateDataArray));
}
function* addque_store_sagas_header_fetchNavlistInitSaga(action) {
  try {
    yield Object(effects_["put"])(store_actions_header_fetchNavlistStart());
    let response = yield addque_axios.post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(effects_["put"])(store_actions_header_fetchNavlist(action.category, response.data));
  } catch (e) {}
}
function* addque_store_sagas_header_fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield addque_axios.post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(addque_store_actions_header_fetchNotifyActive(response.data.collTotal));
    }

    ;
  } catch (err) {}
}
function* addque_store_sagas_header_defaultNotifyActiveInitSaga(action) {
  try {
    yield addque_axios.post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(effects_["put"])(addque_store_actions_header_defaultNotifyActive());
  } catch (err) {}
}
function* addque_store_sagas_header_headerFilterInitSaga(action) {
  try {
    yield Object(effects_["put"])(addque_store_actions_header_headerFilterStart(action.filterPos, action.filterLastPos));
    let response = yield addque_axios.post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(effects_["put"])(addque_store_actions_header_headerFilter(response.data));
  } catch (err) {
    yield Object(effects_["put"])(addque_store_actions_header_headerFilterFail(err));
  }
}
// CONCATENATED MODULE: ./react/addque/store/sagas/main.js



function* addque_store_sagas_main_fetchShareActiveInitSaga(action) {
  try {
    let response = yield addque_axios.post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });

    if (response.data > 0) {
      yield Object(effects_["put"])(addque_store_actions_main_fetchShareActive(response.data));
    }

    return;
  } catch (err) {}
}
function* addque_store_sagas_main_resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'share') {
      yield addque_axios.patch('/header', {
        userID: action.userID
      }, {
        headers: {
          'data-categ': action.curTab
        }
      });
    }

    yield Object(effects_["put"])(addque_store_actions_main_resetActive(action.curTab));
  } catch (err) {}
}
// CONCATENATED MODULE: ./react/addque/store/sagas/form.js




function* addque_store_sagas_form_fetchCategInitSaga(action) {
  try {
    yield Object(effects_["put"])(addque_store_actions_form_fetchCategStart());
    const category = yield addque_axios.post('/question', null, {
      headers: {
        'data-categ': 'category'
      }
    });
    const categ = category.data && category.data.length > 0 ? category.data : null;
    yield Object(effects_["put"])(addque_store_actions_form_fetchCateg(categ));
  } catch (err) {
    yield Object(effects_["put"])(addque_store_actions_form_fetchCategFail(err));
    yield Object(effects_["delay"])(2000);
    yield Object(effects_["put"])(addque_store_actions_form_fetchCategReset());
  }
}
function* store_sagas_form_addCategInitSaga(action) {
  let categs = String(action.categ).split(',');
  let transformCateg = [];

  for (let categ of categs) {
    transformCateg.push(String(categ).trim().charAt(0).toUpperCase() + String(categ).trim().toLowerCase().slice(1));
  }

  let removeDuplicate = [...new Set(transformCateg)];
  yield Object(effects_["put"])(addque_store_actions_form_addCateg(removeDuplicate));
}
function* store_sagas_form_checkLinkInitSaga(action) {
  let link = String(action.link).trim();

  try {
    let response = yield external_axios_default.a.get(link, {
      responseType: 'blob',
      timeout: 8000
    });

    if (response.data.type.startsWith(action.mediaType + '/')) {
      yield Object(effects_["put"])(addque_store_actions_form_checkLink(null, {
        file: response.data,
        url: window.URL.createObjectURL(response.data)
      }));
      return;
    }

    throw new Error(`Unknown format, Only ${action.mediaType} files`);
  } catch (err) {
    yield Object(effects_["put"])(addque_store_actions_form_checkLink(err, null));
  }
}
function* addque_store_sagas_form_fetchUsersInitSaga(action) {
  try {
    let response = yield addque_axios.post('/users', null, {
      headers: {
        'data-categ': `allteacher-${action.userStatus}`
      }
    });
    yield Object(effects_["put"])(addque_store_actions_form_fetchUsers(response.data, action.userStatus));
  } catch (err) {
    yield Object(effects_["put"])(addque_store_actions_form_fetchUsersFail(err));
  }
}
function* addque_store_sagas_form_filterUserInitSaga(action) {
  let filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);

  if (!action.filterContent && action.users && action.users.length > 0) {
    filterUser = [...action.users];
  }

  yield Object(effects_["put"])(addque_store_actions_form_filterUser(filterUser));
}
function* store_sagas_form_showUserSelectInitSaga(action) {
  let filterUser = action.users.filter(user => action.userID.indexOf(user.id) !== -1);
  yield Object(effects_["put"])(addque_store_actions_form_showUserSelect(filterUser));
}
// CONCATENATED MODULE: ./react/addque/store/sagas/index.js






function* addque_store_sagas_watchAuth() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(store_actions_actionTypes_CHECK_AUTH_INIT, addque_store_sagas_auth_checkAuthInitSaga)]);
}
function* addque_store_sagas_watchHeader() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(store_actions_actionTypes_FETCH_NOTIFY_INIT, addque_store_sagas_header_fetchNotifyInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT, addque_store_sagas_header_changeFavNotifySaga), Object(effects_["takeEvery"])(store_actions_actionTypes_FETCH_NAVLIST_INIT, addque_store_sagas_header_fetchNavlistInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT, addque_store_sagas_header_fetchNotifyActiveInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT, addque_store_sagas_header_defaultNotifyActiveInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT, addque_store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_HEADER_FILTER_INIT, addque_store_sagas_header_headerFilterInitSaga)]);
}
function* addque_store_sagas_watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(store_actions_actionTypes_FETCH_CATEG_INIT, addque_store_sagas_form_fetchCategInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_ADD_CATEG_INIT, store_sagas_form_addCategInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_CHECK_LINK_INIT, store_sagas_form_checkLinkInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_FETCH_USERS_INIT, addque_store_sagas_form_fetchUsersInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_FILTER_USER_INIT, addque_store_sagas_form_filterUserInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_SHOW_USER_SELECT_INIT, store_sagas_form_showUserSelectInitSaga)]);
}
function* addque_store_sagas_watchMain() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT, addque_store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(store_actions_actionTypes_RESET_ACTIVE_INIT, addque_store_sagas_main_resetActiveInitSaga)]);
}
function* addque_store_sagas_rootSaga() {
  yield Object(effects_["all"])([addque_store_sagas_watchAuth(), addque_store_sagas_watchHeader(), addque_store_sagas_watchForm(), addque_store_sagas_watchMain()]);
}
// CONCATENATED MODULE: ./react/addque/store.js









const addque_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function addque_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: addque_store_reducers_auth,
    header: addque_store_reducers_header,
    main: addque_store_reducers_main,
    form: addque_store_reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, addque_store_bindMiddleware([external_redux_thunk_default.a, sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(addque_store_sagas_rootSaga);
  return store;
}

/* harmony default export */ var addque_store = (addque_store_configureStore);
// CONCATENATED MODULE: ./react/editpoet/store/actions/actionTypes.js
const editpoet_store_actions_actionTypes_CHECK_AUTH_INIT = 'CHECK_AUTH_INIT';
const editpoet_store_actions_actionTypes_CHECK_AUTH = 'CHECK_AUTH';
const editpoet_store_actions_actionTypes_CHECK_USERIMG = 'CHECK_USERIMG';
const editpoet_store_actions_actionTypes_CHECK_USERNAME = 'CHECK_USERNAME';
const editpoet_store_actions_actionTypes_HEADER_FORM_EXPAND = 'HEADER_FORM_EXPAND';
const editpoet_store_actions_actionTypes_HEADER_FORM_SM = 'HEADER_FORM_SM';
const editpoet_store_actions_actionTypes_HEADER_NAV_DEFAULT = 'HEADER_NAV_DEFAULT';
const editpoet_store_actions_actionTypes_HEADER_FILTER_INIT = 'HEADER_FILTER_INIT';
const editpoet_store_actions_actionTypes_HEADER_FILTER_START = 'HEADER_FILTER_START';
const editpoet_store_actions_actionTypes_HEADER_FILTER_FAIL = 'HEADER_FILTER_FAIL';
const editpoet_store_actions_actionTypes_HEADER_FILTER = 'HEADER_FILTER';
const editpoet_store_actions_actionTypes_HEADER_FILTER_CLOSE = 'HEADER_FILTER_CLOSE';
const editpoet_store_actions_actionTypes_HEADER_ADD_NEW = 'HEADER_ADD_NEW';
const editpoet_store_actions_actionTypes_FETCH_NOTIFY_INIT = 'FETCH_NOTIFY_INIT';
const editpoet_store_actions_actionTypes_FETCH_NOTIFY_START = 'FETCH_NOTIFY_START';
const editpoet_store_actions_actionTypes_FETCH_NOTIFY_SUCCESS = 'FETCH_NOTIFY_SUCCESS';
const editpoet_store_actions_actionTypes_FETCH_NOTIFY_FAIL = 'FETCH_NOTIFY_FAIL';
const editpoet_store_actions_actionTypes_FETCH_NOTIFY = 'FETCH_NOTIFY';
const editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT = 'CHANGE_FAVORITE_NOTIFY_INIT';
const editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START = 'CHANGE_FAVORITE_NOTIFY_START';
const editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL = 'CHANGE_FAVORITE_NOTIFY_FAIL';
const editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY = 'CHANGE_FAVORITE_NOTIFY';
const editpoet_store_actions_actionTypes_SHOW_NAV_LIST = 'SHOW_NAV_LIST';
const editpoet_store_actions_actionTypes_FETCH_NAVLIST_INIT = 'FETCH_NAVLIST_INIT';
const editpoet_store_actions_actionTypes_FETCH_NAVLIST_START = 'FETCH_NAVLIST_START';
const editpoet_store_actions_actionTypes_FETCH_NAVLIST_SUCCESS = 'FETCH_NAVLIST_SUCCESS';
const editpoet_store_actions_actionTypes_FETCH_NAVLIST_FAIL = 'FETCH_NAVLIST_FAIL';
const editpoet_store_actions_actionTypes_FETCH_NAVLIST = 'FETCH_NAVLIST';
const editpoet_store_actions_actionTypes_SHOW_USER_OPTION = 'SHOW_USER_OPTION';
const editpoet_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT = 'FETCH_SHARE_ACTIVE_INIT';
const editpoet_store_actions_actionTypes_FETCH_SHARE_ACTIVE = 'FETCH_SHARE_ACTIVE';
const editpoet_store_actions_actionTypes_RESET_ACTIVE_INIT = 'RESET_ACTIVE_INIT';
const editpoet_store_actions_actionTypes_RESET_ACTIVE = 'RESET_ACTIVE';
const editpoet_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT = 'FETCH_NOTIFY_ACTIVE_INIT';
const editpoet_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE = 'FETCH_NOTIFY_ACTIVE';
const editpoet_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT = 'DEFAULT_NOTIFYACTIVE_INIT';
const editpoet_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE = 'DEFAULT_NOTIFYACTIVE';
const FETCH_CNT_INIT = 'FETCH_CNT_INIT';
const FETCH_CNT_FAIL = 'FETCH_CNT_FAIL';
const FETCH_CNT = 'FETCH_CNT';
const editpoet_store_actions_actionTypes_FETCH_CATEG_INIT = 'FETCH_CATEG_INIT';
const editpoet_store_actions_actionTypes_FETCH_CATEG_START = 'FETCH_CATEG_START';
const editpoet_store_actions_actionTypes_FETCH_CATEG_FAIL = 'FETCH_CATEG_FAIL';
const editpoet_store_actions_actionTypes_FETCH_CATEG_RESET = 'FETCH_CATEG_RESET';
const editpoet_store_actions_actionTypes_FETCH_CATEG = 'FETCH_CATEG';
const editpoet_store_actions_actionTypes_ADD_CATEG_INIT = 'ADD_CATEG_INIT';
const editpoet_store_actions_actionTypes_ADD_CATEG = 'ADD_CATEG';
const editpoet_store_actions_actionTypes_HIDE_MEDIA_BOX = 'HIDE_MEDIA_BOX';
const editpoet_store_actions_actionTypes_SHOW_MEDIA_BOX = 'SHOW_MEDIA_BOX';
const editpoet_store_actions_actionTypes_CHECK_LINK_INIT = 'CHECK_LINK_INIT';
const editpoet_store_actions_actionTypes_CHECK_LINK = 'CHECK_LINK';
const editpoet_store_actions_actionTypes_RESET_LINK = 'RESET_LINK';
const editpoet_store_actions_actionTypes_ADD_SNAPSHOT = 'ADD_SNAPSHOT';
const editpoet_store_actions_actionTypes_REMOVE_SNAPSHOT = 'REMOVE_SNAPSHOT';
const editpoet_store_actions_actionTypes_SUBMIT_MEDIA = 'SUBMIT_MEDIA';
const editpoet_store_actions_actionTypes_FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const editpoet_store_actions_actionTypes_RESET_TAB = 'RESET_TAB';
const editpoet_store_actions_actionTypes_FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const editpoet_store_actions_actionTypes_FETCH_USERS = 'FETCH_USERS';
const editpoet_store_actions_actionTypes_INPUT_DEFAULT_VALUE = 'INPUT_DEFAULT_VALUE';
const editpoet_store_actions_actionTypes_FILTER_USER_INIT = 'FILTER_USER_INIT';
const editpoet_store_actions_actionTypes_FILTER_USER = 'FILTER_USER';
const editpoet_store_actions_actionTypes_USER_SELECT = 'USER_SELECT';
const editpoet_store_actions_actionTypes_REMOVE_MEDIA = 'REMOVE_MEDIA';
const editpoet_store_actions_actionTypes_SHOW_USER_SELECT_INIT = 'SHOW_USER_SELECT_INIT';
const editpoet_store_actions_actionTypes_SHOW_USER_SELECT = 'SHOW_USER_SELECT';
const editpoet_store_actions_actionTypes_SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const editpoet_store_actions_actionTypes_SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const editpoet_store_actions_actionTypes_SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
const editpoet_store_actions_actionTypes_SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const editpoet_store_actions_actionTypes_SUBMIT_FORM = 'SUBMIT_FORM';
const editpoet_store_actions_actionTypes_FORM_SUBMITTED = 'FORM_SUBMITTED';
// CONCATENATED MODULE: ./react/editpoet/shared/utility.js
function editpoet_shared_utility_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function editpoet_shared_utility_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { editpoet_shared_utility_ownKeys(Object(source), true).forEach(function (key) { editpoet_shared_utility_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { editpoet_shared_utility_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function editpoet_shared_utility_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const editpoet_shared_utility_updateObject = (oldObject, updatedProperties) => {
  return editpoet_shared_utility_objectSpread({}, oldObject, {}, updatedProperties);
};
const editpoet_shared_utility_transformNumber = favNumber => {
  const favNumArray = String(favNumber).split("");

  if (favNumArray.length === 4) {
    return `${favNumArray[0]}K`;
  }

  if (favNumArray.length === 5) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}K`;
  }

  if (favNumArray.length === 6) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}K`;
  }

  if (favNumArray.length === 7) {
    const favNum = favNumArray[0];
    return `${favNum}M`;
  }

  if (favNumArray.length === 8) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}M`;
  }

  if (favNumArray.length === 9) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}M`;
  }

  if (favNumArray.length === 10) {
    const favNum = favNumArray[0];
    return `${favNum}B`;
  }

  if (favNumArray.length === 11) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}B`;
  }

  return favNumber;
};
const editpoet_shared_utility_transformString = val => {
  const curVal = String(val).substr(0, 115);
  return curVal;
};
function editpoet_shared_utility_changeFav(datas, dataID) {
  const dataArray = [...datas];
  let dtIndex;
  let dtArray = dataArray.filter((data, index) => {
    if (data.id === dataID) {
      dtIndex = index;
      return true;
    }

    return false;
  });

  if (dtArray.length > 0) {
    let data = dtArray[0];
    data = editpoet_shared_utility_updateObject(data, {
      liked: !data.liked
    });

    if (data.liked) {
      data = editpoet_shared_utility_updateObject(data, {
        favorite: data.favorite + 1
      });
    } else {
      data = editpoet_shared_utility_updateObject(data, {
        favorite: data.favorite - 1
      });
    }

    const updateDataArray = [...dataArray];
    updateDataArray[dtIndex] = data;
    let updateStartArray = [...updateDataArray];
    data = editpoet_shared_utility_updateObject(data, {
      changeFavActive: data.liked
    });
    updateStartArray[dtIndex] = data;
    return {
      updateStartArray,
      updateDataArray
    };
  }

  return dataArray;
}
;
const editpoet_shared_utility_checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};
const editpoet_shared_utility_getSnapshot = (url, mediaType) => {
  let canvas = document.createElement('canvas');
  return new Promise((resolve, reject) => {
    if (canvas.getContext) {
      let media = document.createElement(mediaType);

      function multipleEventListener(el, mediaLoadHandler) {
        'loadedmetadata loadeddata suspend'.split(' ').forEach(event => {
          el.addEventListener(event, mediaLoadHandler, false);
        });
      }

      media.src = url;
      multipleEventListener(media, mediaLoadHandler);
      let event_fired = 0;

      function mediaLoadHandler() {
        if (++event_fired === 3) {
          media.currentTime = 1000;
          media.addEventListener('seeked', function (event) {
            canvas.width = media.videoWidth;
            canvas.height = media.videoHeight;
            canvas.getContext('2d').drawImage(media, 0, 0);
            let snapshot = canvas.toDataURL('image/png');
            resolve(snapshot);
          });
        }
      }
    } else {
      reject('Please update your Browser');
    }
  });
};
const editpoet_shared_utility_getImageURL = url => {
  let image = new Image();
  image.src = url;
  let canvas = document.createElement('canvas');
  return new Promise((resolve, reject) => {
    if (canvas.getContext) {
      image.onload = function () {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0);
        let snapShot = canvas.toDataURL('image/png');
        resolve(snapShot);
      };
    } else {
      reject('Please update your Browser');
    }
  });
};
// CONCATENATED MODULE: ./react/editpoet/store/reducers/auth.js


const editpoet_store_reducers_auth_initialState = {
  status: false,
  img: null,
  username: null
};

const editpoet_store_reducers_auth_checkAuth = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    status: action.status
  });
};

const editpoet_store_reducers_auth_checkUserImg = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    img: action.img
  });
};

const editpoet_store_reducers_auth_checkUserName = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    username: action.name
  });
};

const editpoet_store_reducers_auth_reducer = (state = editpoet_store_reducers_auth_initialState, action) => {
  switch (action.type) {
    case editpoet_store_actions_actionTypes_CHECK_AUTH:
      return editpoet_store_reducers_auth_checkAuth(state, action);

    case editpoet_store_actions_actionTypes_CHECK_USERIMG:
      return editpoet_store_reducers_auth_checkUserImg(state, action);

    case editpoet_store_actions_actionTypes_CHECK_USERNAME:
      return editpoet_store_reducers_auth_checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var editpoet_store_reducers_auth = (editpoet_store_reducers_auth_reducer);
// CONCATENATED MODULE: ./react/editpoet/store/reducers/header.js


const editpoet_store_reducers_header_initialState = {
  expand: false,
  hideFormSm: false,
  addNew: false,
  notify: null,
  hidNotify: false,
  navList: null,
  navListCateg: null,
  hidNavList: false,
  hidUserOption: false,
  notifyActive: null,
  default: false,
  searchCnt: null,
  filterPos: 0,
  filterLastPos: 0,
  searchCntErr: null,
  filterStart: false
};

const editpoet_store_reducers_header_formExpand = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const editpoet_store_reducers_header_formSm = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    hideFormSm: false,
    default: false
  });
};

const editpoet_store_reducers_header_navDefault = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    expand: false,
    hideFormSm: true,
    addNew: false,
    hidNotify: true,
    hidNavList: true,
    hidUserOption: true,
    default: true
  });
};

const editpoet_store_reducers_header_addNew = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    addNew: !state.addNew,
    default: false
  });
};

const editpoet_store_reducers_header_fetchNotify = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const editpoet_store_reducers_header_fetchNotifyStart = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const editpoet_store_reducers_header_changeFavNotifyStart = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const editpoet_store_reducers_header_changeFavNotify = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const editpoet_store_reducers_header_showNavList = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const editpoet_store_reducers_header_fetchNavListStart = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    navList: null,
    navListCateg: null
  });
};

const editpoet_store_reducers_header_fetchNavList = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const editpoet_store_reducers_header_showUserOption = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const editpoet_store_reducers_header_fetchNotifyActive = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    notifyActive: action.notifyActive
  });
};

const editpoet_store_reducers_header_defaultNotifyActive = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    notifyActive: null
  });
};

const editpoet_store_reducers_header_headerFilterStart = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const editpoet_store_reducers_header_headerFilterFail = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    searchCntErr: action.searchCntErr
  });
};

const editpoet_store_reducers_header_headerFilter = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    searchCnt: action.searchCnt
  });
};

const editpoet_store_reducers_header_headerFilterClose = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    searchCnt: null,
    filterStart: false
  });
};

const editpoet_store_reducers_header_reducer = (state = editpoet_store_reducers_header_initialState, action) => {
  switch (action.type) {
    case editpoet_store_actions_actionTypes_HEADER_FORM_EXPAND:
      return editpoet_store_reducers_header_formExpand(state, action);

    case editpoet_store_actions_actionTypes_HEADER_FORM_SM:
      return editpoet_store_reducers_header_formSm(state, action);

    case editpoet_store_actions_actionTypes_HEADER_NAV_DEFAULT:
      return editpoet_store_reducers_header_navDefault(state, action);

    case editpoet_store_actions_actionTypes_HEADER_ADD_NEW:
      return editpoet_store_reducers_header_addNew(state, action);

    case editpoet_store_actions_actionTypes_FETCH_NOTIFY_START:
      return editpoet_store_reducers_header_fetchNotifyStart(state, action);

    case editpoet_store_actions_actionTypes_FETCH_NOTIFY:
      return editpoet_store_reducers_header_fetchNotify(state, action);

    case editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START:
      return editpoet_store_reducers_header_changeFavNotifyStart(state, action);

    case editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY:
      return editpoet_store_reducers_header_changeFavNotify(state, action);

    case editpoet_store_actions_actionTypes_SHOW_NAV_LIST:
      return editpoet_store_reducers_header_showNavList(state, action);

    case editpoet_store_actions_actionTypes_FETCH_NAVLIST_START:
      return editpoet_store_reducers_header_fetchNavListStart(state, action);

    case editpoet_store_actions_actionTypes_FETCH_NAVLIST:
      return editpoet_store_reducers_header_fetchNavList(state, action);

    case editpoet_store_actions_actionTypes_SHOW_USER_OPTION:
      return editpoet_store_reducers_header_showUserOption(state, action);

    case editpoet_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE:
      return editpoet_store_reducers_header_fetchNotifyActive(state, action);

    case editpoet_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE:
      return editpoet_store_reducers_header_defaultNotifyActive(state, action);

    case editpoet_store_actions_actionTypes_HEADER_FILTER_START:
      return editpoet_store_reducers_header_headerFilterStart(state, action);

    case editpoet_store_actions_actionTypes_HEADER_FILTER_FAIL:
      return editpoet_store_reducers_header_headerFilterFail(state, action);

    case editpoet_store_actions_actionTypes_HEADER_FILTER_CLOSE:
      return editpoet_store_reducers_header_headerFilterClose(state, action);

    case editpoet_store_actions_actionTypes_HEADER_FILTER:
      return editpoet_store_reducers_header_headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var editpoet_store_reducers_header = (editpoet_store_reducers_header_reducer);
// CONCATENATED MODULE: ./react/editpoet/store/reducers/form.js


const editpoet_store_reducers_form_initialState = {
  cntErr: null,
  categ: null,
  showCateg: false,
  categErr: null,
  newCateg: null,
  hideMediaBox: false,
  hidAddItm: false,
  linkValid: null,
  snapshot: [],
  media: {},
  curTab: 'online',
  startUser: true,
  users: null,
  onlineUser: [],
  offlineUser: [],
  filteredUser: null,
  defaultValue: false,
  uploadPercent: null,
  submitError: null,
  submitForm: false,
  id: null,
  content: null,
  redirect: false
};

const form_fetchCnt = (state, action) => {
  if (action.cnt) {
    let desc = JSON.parse(action.cnt.desc);
    desc.blocks[0].text = action.cnt.title;
    return editpoet_shared_utility_updateObject(state, {
      newCateg: action.cnt.category,
      content: desc,
      cntErr: null
    });
  }

  return editpoet_shared_utility_updateObject(state, {
    redirect: true
  });
};

const fetchCntFail = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    cntErr: action.err
  });
};

const editpoet_store_reducers_form_fetchCategStart = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    showCateg: true,
    categErr: null
  });
};

const editpoet_store_reducers_form_fetchCategFail = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    categErr: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const editpoet_store_reducers_form_fetchCategReset = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    categErr: null,
    showCateg: false
  });
};

const editpoet_store_reducers_form_fetchCateg = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    categ: action.categ,
    showCateg: action.categ !== null
  });
};

const editpoet_store_reducers_form_addCateg = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    newCateg: action.categ
  });
};

const editpoet_store_reducers_form_checkLink = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    linkValid: {
      err: action.err,
      media: action.media
    }
  });
};

const editpoet_store_reducers_form_resetLink = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    linkValid: null
  });
};

const editpoet_store_reducers_form_addSnapshot = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const editpoet_store_reducers_form_removeSnapshot = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const editpoet_store_reducers_form_removeMedia = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    media: action.media
  });
};

const editpoet_store_reducers_form_submitMedia = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    media: action.media,
    hideMediaBox: true
  });
};

const editpoet_store_reducers_form_hideMediaBox = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    hideMediaBox: true
  });
};

const editpoet_store_reducers_form_showMediaBox = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    hideMediaBox: false
  });
};

const editpoet_store_reducers_form_fetchUsers = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    users: action.users,
    filteredUser: null,
    startUser: false,
    defaultValue: true,
    onlineUser: action.status === 'online' ? action.users : state.onlineUser,
    offlineUser: action.status === 'offline' ? action.users : state.offlineUser,
    curTab: action.status
  });
};

const editpoet_store_reducers_form_fetchUsersFail = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const editpoet_store_reducers_form_resetTab = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const editpoet_store_reducers_form_inputDefaultValue = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    defaultValue: false
  });
};

const editpoet_store_reducers_form_filterUser = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    filteredUser: action.users
  });
};

const editpoet_store_reducers_form_userSelect = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    media: action.users
  });
};

const editpoet_store_reducers_form_showUserSelect = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    users: action.users,
    curTab: 'userSelect',
    filteredUser: null,
    defaultValue: true
  });
};

const editpoet_store_reducers_form_submitFormStart = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    submitForm: true,
    submitError: null,
    submitFiles: 0
  });
};

const editpoet_store_reducers_form_submitFormSuccess = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    uploadPercent: action.uploadPercent
  });
};

const editpoet_store_reducers_form_submitFormFail = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    submitError: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const editpoet_store_reducers_form_formSubmitted = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    id: action.id
  });
};

const editpoet_store_reducers_form_reducer = (state = editpoet_store_reducers_form_initialState, action) => {
  switch (action.type) {
    case FETCH_CNT:
      return form_fetchCnt(state, action);

    case FETCH_CNT_FAIL:
      return fetchCntFail(state, action);

    case editpoet_store_actions_actionTypes_FETCH_CATEG_START:
      return editpoet_store_reducers_form_fetchCategStart(state, action);

    case editpoet_store_actions_actionTypes_FETCH_CATEG_FAIL:
      return editpoet_store_reducers_form_fetchCategFail(state, action);

    case editpoet_store_actions_actionTypes_FETCH_CATEG_RESET:
      return editpoet_store_reducers_form_fetchCategReset(state, action);

    case editpoet_store_actions_actionTypes_FETCH_CATEG:
      return editpoet_store_reducers_form_fetchCateg(state, action);

    case editpoet_store_actions_actionTypes_ADD_CATEG:
      return editpoet_store_reducers_form_addCateg(state, action);

    case editpoet_store_actions_actionTypes_HIDE_MEDIA_BOX:
      return editpoet_store_reducers_form_hideMediaBox(state, action);

    case editpoet_store_actions_actionTypes_SHOW_MEDIA_BOX:
      return editpoet_store_reducers_form_showMediaBox(state, action);

    case editpoet_store_actions_actionTypes_CHECK_LINK:
      return editpoet_store_reducers_form_checkLink(state, action);

    case editpoet_store_actions_actionTypes_RESET_LINK:
      return editpoet_store_reducers_form_resetLink(state, action);

    case editpoet_store_actions_actionTypes_ADD_SNAPSHOT:
      return editpoet_store_reducers_form_addSnapshot(state, action);

    case editpoet_store_actions_actionTypes_REMOVE_SNAPSHOT:
      return editpoet_store_reducers_form_removeSnapshot(state, action);

    case editpoet_store_actions_actionTypes_REMOVE_MEDIA:
      return editpoet_store_reducers_form_removeMedia(state, action);

    case editpoet_store_actions_actionTypes_SUBMIT_MEDIA:
      return editpoet_store_reducers_form_submitMedia(state, action);

    case editpoet_store_actions_actionTypes_FETCH_USERS:
      return editpoet_store_reducers_form_fetchUsers(state, action);

    case editpoet_store_actions_actionTypes_FETCH_USERS_FAIL:
      return editpoet_store_reducers_form_fetchUsersFail(state, action);

    case editpoet_store_actions_actionTypes_RESET_TAB:
      return editpoet_store_reducers_form_resetTab(state, action);

    case editpoet_store_actions_actionTypes_INPUT_DEFAULT_VALUE:
      return editpoet_store_reducers_form_inputDefaultValue(state, action);

    case editpoet_store_actions_actionTypes_FILTER_USER:
      return editpoet_store_reducers_form_filterUser(state, action);

    case editpoet_store_actions_actionTypes_USER_SELECT:
      return editpoet_store_reducers_form_userSelect(state, action);

    case editpoet_store_actions_actionTypes_SHOW_USER_SELECT:
      return editpoet_store_reducers_form_showUserSelect(state, action);

    case editpoet_store_actions_actionTypes_SUBMIT_FORM_START:
      return editpoet_store_reducers_form_submitFormStart(state, action);

    case editpoet_store_actions_actionTypes_SUBMIT_FORM_SUCCESS:
      return editpoet_store_reducers_form_submitFormSuccess(state, action);

    case editpoet_store_actions_actionTypes_SUBMIT_FORM_FAIL:
      return editpoet_store_reducers_form_submitFormFail(state, action);

    case editpoet_store_actions_actionTypes_FORM_SUBMITTED:
      return editpoet_store_reducers_form_formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var editpoet_store_reducers_form = (editpoet_store_reducers_form_reducer);
// CONCATENATED MODULE: ./react/editpoet/store/reducers/main.js
function editpoet_store_reducers_main_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function editpoet_store_reducers_main_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { editpoet_store_reducers_main_ownKeys(Object(source), true).forEach(function (key) { editpoet_store_reducers_main_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { editpoet_store_reducers_main_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function editpoet_store_reducers_main_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const editpoet_store_reducers_main_initialState = {
  shareActive: null
};

const editpoet_store_reducers_main_fetchShareActive = (state, action) => {
  return editpoet_shared_utility_updateObject(state, {
    shareActive: action.shareActive
  });
};

const editpoet_store_reducers_main_resetActive = (state, action) => {
  let reset = action.curTab === 'post' ? {
    ptActive: null
  } : {
    shareActive: null
  };
  return editpoet_shared_utility_updateObject(state, editpoet_store_reducers_main_objectSpread({}, reset));
};

const editpoet_store_reducers_main_reducer = (state = editpoet_store_reducers_main_initialState, action) => {
  switch (action.type) {
    case editpoet_store_actions_actionTypes_FETCH_SHARE_ACTIVE:
      return editpoet_store_reducers_main_fetchShareActive(state, action);

    case editpoet_store_actions_actionTypes_RESET_ACTIVE:
      return editpoet_store_reducers_main_resetActive(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var editpoet_store_reducers_main = (editpoet_store_reducers_main_reducer);
// CONCATENATED MODULE: ./react/editpoet/store/actions/auth.js

const editpoet_store_actions_auth_checkAuthInit = () => {
  return {
    type: editpoet_store_actions_actionTypes_CHECK_AUTH_INIT
  };
};
const editpoet_store_actions_auth_checkAuth = status => {
  return {
    type: editpoet_store_actions_actionTypes_CHECK_AUTH,
    status
  };
};
const editpoet_store_actions_auth_checkUserImg = img => {
  return {
    type: editpoet_store_actions_actionTypes_CHECK_USERIMG,
    img
  };
};
const editpoet_store_actions_auth_checkUserName = name => {
  return {
    type: editpoet_store_actions_actionTypes_CHECK_USERNAME,
    name
  };
};
// CONCATENATED MODULE: ./react/editpoet/store/actions/header.js

const editpoet_store_actions_header_headerFormExpand = () => {
  return {
    type: editpoet_store_actions_actionTypes_HEADER_FORM_EXPAND
  };
};
const editpoet_store_actions_header_headerFormSm = () => {
  return {
    type: editpoet_store_actions_actionTypes_HEADER_FORM_SM
  };
};
const editpoet_store_actions_header_headerNavDefault = () => {
  return {
    type: editpoet_store_actions_actionTypes_HEADER_NAV_DEFAULT
  };
};
const editpoet_store_actions_header_headerAddNew = () => {
  return {
    type: editpoet_store_actions_actionTypes_HEADER_ADD_NEW
  };
};
const editpoet_store_actions_header_fetchNotifyInit = () => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_NOTIFY_INIT
  };
};
const editpoet_store_actions_header_fetchNotifyStart = () => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_NOTIFY_START
  };
};
const editpoet_store_actions_header_fetchNotifySuccess = () => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_NOTIFY_SUCCESS
  };
};
const editpoet_store_actions_header_fetchNotifyFail = err => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_NOTIFY_FAIL,
    err
  };
};
const editpoet_store_actions_header_fetchNotify = notify => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_NOTIFY,
    notify
  };
};
const editpoet_store_actions_header_changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT,
    notify,
    notifyID
  };
};
const editpoet_store_actions_header_changeFavNotifyStart = notify => {
  return {
    type: editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START,
    notify
  };
};
const editpoet_store_actions_header_changeFavNotifyFail = notify => {
  return {
    type: editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL,
    notify
  };
};
const editpoet_store_actions_header_changeFavNotify = notify => {
  return {
    type: editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY,
    notify
  };
};
const editpoet_store_actions_header_showNavList = () => {
  return {
    type: editpoet_store_actions_actionTypes_SHOW_NAV_LIST
  };
};
const editpoet_store_actions_header_fetchNavlistInit = category => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_NAVLIST_INIT,
    category
  };
};
const editpoet_store_actions_header_fetchNavlistStart = () => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_NAVLIST_START
  };
};
const editpoet_store_actions_header_fetchNavlist = (category, navList) => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_NAVLIST,
    category,
    navList
  };
};
const editpoet_store_actions_header_showUserOption = () => {
  return {
    type: editpoet_store_actions_actionTypes_SHOW_USER_OPTION
  };
};
const editpoet_store_actions_header_fetchNotifyactiveInit = userID => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT,
    userID
  };
};
const editpoet_store_actions_header_fetchNotifyActive = notifyActive => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE,
    notifyActive
  };
};
const editpoet_store_actions_header_defaultNotifyactiveInit = () => {
  return {
    type: editpoet_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT
  };
};
const editpoet_store_actions_header_defaultNotifyActive = () => {
  return {
    type: editpoet_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE
  };
};
const editpoet_store_actions_header_headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: editpoet_store_actions_actionTypes_HEADER_FILTER_INIT,
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const editpoet_store_actions_header_headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: editpoet_store_actions_actionTypes_HEADER_FILTER_START,
    filterPos,
    filterLastPos
  };
};
const editpoet_store_actions_header_headerFilterFail = searchCntErr => {
  return {
    type: editpoet_store_actions_actionTypes_HEADER_FILTER_FAIL,
    searchCntErr
  };
};
const editpoet_store_actions_header_headerFilter = searchCnt => {
  return {
    type: editpoet_store_actions_actionTypes_HEADER_FILTER,
    searchCnt
  };
};
const editpoet_store_actions_header_headerFilterClose = () => {
  return {
    type: editpoet_store_actions_actionTypes_HEADER_FILTER_CLOSE
  };
};
// CONCATENATED MODULE: ./react/editpoet/store/actions/main.js

const editpoet_store_actions_main_fetchShareactiveInit = userID => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT,
    userID
  };
};
const editpoet_store_actions_main_fetchShareActive = shareActive => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_SHARE_ACTIVE,
    shareActive
  };
};
const editpoet_store_actions_main_resetActiveInit = (userID, curTab) => {
  return {
    type: editpoet_store_actions_actionTypes_RESET_ACTIVE_INIT,
    userID,
    curTab
  };
};
const editpoet_store_actions_main_resetActive = curTab => {
  return {
    type: editpoet_store_actions_actionTypes_RESET_ACTIVE,
    curTab
  };
};
// CONCATENATED MODULE: ./react/editpoet/store/actions/form.js

const fetchCntInit = id => {
  return {
    type: FETCH_CNT_INIT,
    id
  };
};
const form_fetchCntFail = err => {
  return {
    type: FETCH_CNT_FAIL,
    err
  };
};
const actions_form_fetchCnt = cnt => {
  return {
    type: FETCH_CNT,
    cnt
  };
};
const editpoet_store_actions_form_fetchCategInit = () => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_CATEG_INIT
  };
};
const editpoet_store_actions_form_fetchCategStart = () => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_CATEG_START
  };
};
const editpoet_store_actions_form_fetchCategFail = err => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_CATEG_FAIL,
    err
  };
};
const editpoet_store_actions_form_fetchCategReset = () => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_CATEG_RESET
  };
};
const editpoet_store_actions_form_fetchCateg = categ => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_CATEG,
    categ
  };
};
const editpoet_store_actions_form_addCategInit = categ => {
  return {
    type: editpoet_store_actions_actionTypes_ADD_CATEG_INIT,
    categ
  };
};
const editpoet_store_actions_form_addCateg = categ => {
  return {
    type: editpoet_store_actions_actionTypes_ADD_CATEG,
    categ
  };
};
const editpoet_store_actions_form_checkLinkInit = (link, mediaType) => {
  return {
    type: editpoet_store_actions_actionTypes_CHECK_LINK_INIT,
    link,
    mediaType
  };
};
const editpoet_store_actions_form_checkLink = (err, media) => {
  return {
    type: editpoet_store_actions_actionTypes_CHECK_LINK,
    err,
    media
  };
};
const editpoet_store_actions_form_resetLink = () => {
  return {
    type: editpoet_store_actions_actionTypes_RESET_LINK
  };
};
const editpoet_store_actions_form_addSnapshot = snapshot => {
  return {
    type: editpoet_store_actions_actionTypes_ADD_SNAPSHOT,
    snapshot
  };
};
const editpoet_store_actions_form_removeSnapshot = snapshot => {
  return {
    type: editpoet_store_actions_actionTypes_REMOVE_SNAPSHOT,
    snapshot
  };
};
const editpoet_store_actions_form_removeMedia = media => {
  return {
    type: editpoet_store_actions_actionTypes_REMOVE_MEDIA,
    media
  };
};
const editpoet_store_actions_form_submitMedia = media => {
  return {
    type: editpoet_store_actions_actionTypes_SUBMIT_MEDIA,
    media
  };
};
const editpoet_store_actions_form_hideMediaBox = () => {
  return {
    type: editpoet_store_actions_actionTypes_HIDE_MEDIA_BOX
  };
};
const editpoet_store_actions_form_showMediaBox = () => {
  return {
    type: editpoet_store_actions_actionTypes_SHOW_MEDIA_BOX
  };
};
const editpoet_store_actions_form_fetchUsersInit = userStatus => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_USERS_INIT,
    userStatus
  };
};
const editpoet_store_actions_form_fetchUsers = (users, status) => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_USERS,
    users,
    status
  };
};
const editpoet_store_actions_form_fetchUsersFail = err => {
  return {
    type: editpoet_store_actions_actionTypes_FETCH_USERS_FAIL,
    err
  };
};
const editpoet_store_actions_form_resetTab = () => {
  return {
    type: editpoet_store_actions_actionTypes_RESET_TAB
  };
};
const editpoet_store_actions_form_inputDefaultValue = () => {
  return {
    type: editpoet_store_actions_actionTypes_INPUT_DEFAULT_VALUE
  };
};
const editpoet_store_actions_form_filterUserInit = (users, filterContent) => {
  return {
    type: editpoet_store_actions_actionTypes_FILTER_USER_INIT,
    users,
    filterContent
  };
};
const editpoet_store_actions_form_filterUser = users => {
  return {
    type: editpoet_store_actions_actionTypes_FILTER_USER,
    users
  };
};
const editpoet_store_actions_form_userSelect = users => {
  return {
    type: editpoet_store_actions_actionTypes_USER_SELECT,
    users
  };
};
const editpoet_store_actions_form_showUserSelectInit = (users, userID) => {
  return {
    type: editpoet_store_actions_actionTypes_SHOW_USER_SELECT_INIT,
    users,
    userID
  };
};
const editpoet_store_actions_form_showUserSelect = users => {
  return {
    type: editpoet_store_actions_actionTypes_SHOW_USER_SELECT,
    users
  };
};
const editpoet_store_actions_form_submitFormInit = formData => {
  return {
    type: editpoet_store_actions_actionTypes_SUBMIT_FORM_INIT,
    formData
  };
};
const editpoet_store_actions_form_submitFormFail = err => {
  return {
    type: editpoet_store_actions_actionTypes_SUBMIT_FORM_FAIL,
    err
  };
};
const editpoet_store_actions_form_submitFormSuccess = uploadPercent => {
  return {
    type: editpoet_store_actions_actionTypes_SUBMIT_FORM_SUCCESS,
    uploadPercent
  };
};
const editpoet_store_actions_form_submitFormStart = () => {
  return {
    type: editpoet_store_actions_actionTypes_SUBMIT_FORM_START
  };
};
const editpoet_store_actions_form_submitForm = () => {
  return {
    type: editpoet_store_actions_actionTypes_SUBMIT_FORM
  };
};
const editpoet_store_actions_form_formSubmitted = id => {
  return {
    type: editpoet_store_actions_actionTypes_FORM_SUBMITTED,
    id
  };
};
// CONCATENATED MODULE: ./react/editpoet/axios.js


const editpoet_axios_instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
editpoet_axios_instance.defaults.headers.common['authorization'] = 'authorization';
editpoet_axios_instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var editpoet_axios = (editpoet_axios_instance);
// CONCATENATED MODULE: ./react/editpoet/store/thunk/submit.js


const editpoet_store_thunk_submit_submit = formData => {
  return dispatch => {
    dispatch(editpoet_store_actions_form_submitFormStart());
    let formContent = new FormData();

    for (let key in formData) {
      if (key !== 'video' && key !== 'image' && key !== 'snapshot') {
        formContent.append(key, formData[key]);
      }

      if (key === 'video' && formData[key].length > 0) {
        for (let video of formData[key]) {
          formContent.append(key, video.file, video.id);
        }
      }

      if (key === 'image' && formData[key].length > 0) {
        for (let image of formData[key]) {
          formContent.append(key, image.file);
        }
      }

      if (key === 'snapshot' && formData[key].length > 0) {
        formContent.append(key, JSON.stringify(formData[key]));
      }
    }

    editpoet_axios.post('/edit/poet', formContent, {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.lengthComputable) {
          const percentage = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          dispatch(editpoet_store_actions_form_submitFormSuccess(percentage));
        }
      }
    }).then(res => {
      dispatch(editpoet_store_actions_form_formSubmitted(res.data));
    }).catch(err => {
      dispatch(editpoet_store_actions_form_submitFormFail(err));
    });
  };
};
// CONCATENATED MODULE: ./react/editpoet/store/actions/index.js





// CONCATENATED MODULE: ./react/editpoet/store/sagas/auth.js



function* editpoet_store_sagas_auth_checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(effects_["put"])(editpoet_store_actions_auth_checkAuth(true));

    try {
      let response = yield editpoet_axios.post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(effects_["put"])(editpoet_store_actions_auth_checkUserImg(response.data.url));
      } else {
        yield Object(effects_["put"])(editpoet_store_actions_auth_checkUserName(response.data.name));
      }
    } catch (err) {}
  }
}
// CONCATENATED MODULE: ./react/editpoet/store/sagas/header.js




function* editpoet_store_sagas_header_fetchNotifyInitSaga(action) {
  try {
    yield Object(effects_["put"])(editpoet_store_actions_header_fetchNotifyStart());
    let response = yield editpoet_axios.post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(editpoet_store_actions_header_fetchNotify(response.data.coll));
    } else {
      yield Object(effects_["put"])(editpoet_store_actions_header_fetchNotify([]));
    }
  } catch (err) {
    yield Object(effects_["put"])(editpoet_store_actions_header_fetchNotifyFail(err));
  }
}
function* editpoet_store_sagas_header_changeFavNotifySaga(action) {
  let notify = editpoet_shared_utility_changeFav(action.notify, action.notifyID);
  yield Object(effects_["put"])(editpoet_store_actions_header_changeFavNotifyStart(notify.updateStartArray));
  yield Object(effects_["put"])(editpoet_store_actions_header_changeFavNotify(notify.updateDataArray));
}
function* editpoet_store_sagas_header_fetchNavlistInitSaga(action) {
  try {
    yield Object(effects_["put"])(editpoet_store_actions_header_fetchNavlistStart());
    let response = yield editpoet_axios.post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(effects_["put"])(editpoet_store_actions_header_fetchNavlist(action.category, response.data));
  } catch (e) {}
}
function* editpoet_store_sagas_header_fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield editpoet_axios.post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(editpoet_store_actions_header_fetchNotifyActive(response.data.collTotal));
    }

    ;
  } catch (err) {}
}
function* editpoet_store_sagas_header_defaultNotifyActiveInitSaga(action) {
  try {
    yield editpoet_axios.post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(effects_["put"])(editpoet_store_actions_header_defaultNotifyActive());
  } catch (err) {}
}
function* editpoet_store_sagas_header_headerFilterInitSaga(action) {
  try {
    yield Object(effects_["put"])(editpoet_store_actions_header_headerFilterStart(action.filterPos, action.filterLastPos));
    let response = yield editpoet_axios.post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(effects_["put"])(editpoet_store_actions_header_headerFilter(response.data));
  } catch (err) {
    yield Object(effects_["put"])(editpoet_store_actions_header_headerFilterFail(err));
  }
}
// CONCATENATED MODULE: ./react/editpoet/store/sagas/main.js



function* editpoet_store_sagas_main_fetchShareActiveInitSaga(action) {
  try {
    let response = yield editpoet_axios.post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });

    if (response.data > 0) {
      yield Object(effects_["put"])(editpoet_store_actions_main_fetchShareActive(response.data));
    }

    return;
  } catch (err) {}
}
function* editpoet_store_sagas_main_resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'share') {
      yield editpoet_axios.patch('/header', {
        userID: action.userID
      }, {
        headers: {
          'data-categ': action.curTab
        }
      });
    }

    yield Object(effects_["put"])(editpoet_store_actions_main_resetActive(action.curTab));
  } catch (err) {}
}
// CONCATENATED MODULE: ./react/editpoet/store/sagas/form.js




function* form_fetchCntInitSaga(action) {
  try {
    const response = yield editpoet_axios.post('/header', {
      id: action.id,
      model: 'poet'
    }, {
      headers: {
        'data-categ': `editform`
      }
    });
    yield Object(effects_["put"])(actions_form_fetchCnt(response.data));
  } catch (err) {
    yield Object(effects_["put"])(form_fetchCntFail(err));
  }
}
function* editpoet_store_sagas_form_fetchCategInitSaga(action) {
  try {
    yield Object(effects_["put"])(editpoet_store_actions_form_fetchCategStart());
    const category = yield editpoet_axios.post('/poet', null, {
      headers: {
        'data-categ': 'category'
      }
    });
    const categ = category.data && category.data.length > 0 ? category.data : null;
    yield Object(effects_["put"])(editpoet_store_actions_form_fetchCateg(categ));
  } catch (err) {
    yield Object(effects_["put"])(editpoet_store_actions_form_fetchCategFail(err));
    yield Object(effects_["delay"])(2000);
    yield Object(effects_["put"])(editpoet_store_actions_form_fetchCategReset());
  }
}
function* editpoet_store_sagas_form_addCategInitSaga(action) {
  let categs = String(action.categ).split(',');
  let transformCateg = [];

  for (let categ of categs) {
    transformCateg.push(String(categ).trim().charAt(0).toUpperCase() + String(categ).trim().toLowerCase().slice(1));
  }

  let removeDuplicate = [...new Set(transformCateg)];
  yield Object(effects_["put"])(editpoet_store_actions_form_addCateg(removeDuplicate));
}
function* editpoet_store_sagas_form_checkLinkInitSaga(action) {
  let link = String(action.link).trim();

  try {
    let response = yield external_axios_default.a.get(link, {
      responseType: 'blob',
      timeout: 8000
    });

    if (response.data.type.startsWith(action.mediaType + '/')) {
      yield Object(effects_["put"])(editpoet_store_actions_form_checkLink(null, {
        file: response.data,
        url: window.URL.createObjectURL(response.data)
      }));
      return;
    }

    throw new Error(`Unknown format, Only ${action.mediaType} files`);
  } catch (err) {
    yield Object(effects_["put"])(editpoet_store_actions_form_checkLink(err, null));
  }
}
function* editpoet_store_sagas_form_fetchUsersInitSaga(action) {
  try {
    let response = yield editpoet_axios.post('/users', null, {
      headers: {
        'data-categ': `allteacher-${action.userStatus}`
      }
    });
    yield Object(effects_["put"])(editpoet_store_actions_form_fetchUsers(response.data, action.userStatus));
  } catch (err) {
    yield Object(effects_["put"])(editpoet_store_actions_form_fetchUsersFail(err));
  }
}
function* editpoet_store_sagas_form_filterUserInitSaga(action) {
  let filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);

  if (!action.filterContent && action.users && action.users.length > 0) {
    filterUser = [...action.users];
  }

  yield Object(effects_["put"])(editpoet_store_actions_form_filterUser(filterUser));
}
function* editpoet_store_sagas_form_showUserSelectInitSaga(action) {
  let filterUser = action.users.filter(user => action.userID.indexOf(user.id) !== -1);
  yield Object(effects_["put"])(editpoet_store_actions_form_showUserSelect(filterUser));
}
// CONCATENATED MODULE: ./react/editpoet/store/sagas/index.js






function* editpoet_store_sagas_watchAuth() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_CHECK_AUTH_INIT, editpoet_store_sagas_auth_checkAuthInitSaga)]);
}
function* editpoet_store_sagas_watchHeader() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_FETCH_NOTIFY_INIT, editpoet_store_sagas_header_fetchNotifyInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT, editpoet_store_sagas_header_changeFavNotifySaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_FETCH_NAVLIST_INIT, editpoet_store_sagas_header_fetchNavlistInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT, editpoet_store_sagas_header_fetchNotifyActiveInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT, editpoet_store_sagas_header_defaultNotifyActiveInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT, editpoet_store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_HEADER_FILTER_INIT, editpoet_store_sagas_header_headerFilterInitSaga)]);
}
function* editpoet_store_sagas_watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(FETCH_CNT_INIT, form_fetchCntInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_FETCH_CATEG_INIT, editpoet_store_sagas_form_fetchCategInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_ADD_CATEG_INIT, editpoet_store_sagas_form_addCategInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_CHECK_LINK_INIT, editpoet_store_sagas_form_checkLinkInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_FETCH_USERS_INIT, editpoet_store_sagas_form_fetchUsersInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_FILTER_USER_INIT, editpoet_store_sagas_form_filterUserInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_SHOW_USER_SELECT_INIT, editpoet_store_sagas_form_showUserSelectInitSaga)]);
}
function* editpoet_store_sagas_watchMain() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT, editpoet_store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(editpoet_store_actions_actionTypes_RESET_ACTIVE_INIT, editpoet_store_sagas_main_resetActiveInitSaga)]);
}
function* editpoet_store_sagas_rootSaga() {
  yield Object(effects_["all"])([editpoet_store_sagas_watchAuth(), editpoet_store_sagas_watchHeader(), editpoet_store_sagas_watchForm(), editpoet_store_sagas_watchMain()]);
}
// CONCATENATED MODULE: ./react/editpoet/store.js









const editpoet_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function editpoet_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: editpoet_store_reducers_auth,
    header: editpoet_store_reducers_header,
    main: editpoet_store_reducers_main,
    form: editpoet_store_reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, editpoet_store_bindMiddleware([external_redux_thunk_default.a, sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(editpoet_store_sagas_rootSaga);
  return store;
}

/* harmony default export */ var editpoet_store = (editpoet_store_configureStore);
// CONCATENATED MODULE: ./react/editpost/store/actions/actionTypes.js
const editpost_store_actions_actionTypes_CHECK_AUTH_INIT = 'CHECK_AUTH_INIT';
const editpost_store_actions_actionTypes_CHECK_AUTH = 'CHECK_AUTH';
const editpost_store_actions_actionTypes_CHECK_USERIMG = 'CHECK_USERIMG';
const editpost_store_actions_actionTypes_CHECK_USERNAME = 'CHECK_USERNAME';
const editpost_store_actions_actionTypes_HEADER_FORM_EXPAND = 'HEADER_FORM_EXPAND';
const editpost_store_actions_actionTypes_HEADER_FORM_SM = 'HEADER_FORM_SM';
const editpost_store_actions_actionTypes_HEADER_NAV_DEFAULT = 'HEADER_NAV_DEFAULT';
const editpost_store_actions_actionTypes_HEADER_FILTER_INIT = 'HEADER_FILTER_INIT';
const editpost_store_actions_actionTypes_HEADER_FILTER_START = 'HEADER_FILTER_START';
const editpost_store_actions_actionTypes_HEADER_FILTER_FAIL = 'HEADER_FILTER_FAIL';
const editpost_store_actions_actionTypes_HEADER_FILTER = 'HEADER_FILTER';
const editpost_store_actions_actionTypes_HEADER_FILTER_CLOSE = 'HEADER_FILTER_CLOSE';
const editpost_store_actions_actionTypes_HEADER_ADD_NEW = 'HEADER_ADD_NEW';
const editpost_store_actions_actionTypes_FETCH_NOTIFY_INIT = 'FETCH_NOTIFY_INIT';
const editpost_store_actions_actionTypes_FETCH_NOTIFY_START = 'FETCH_NOTIFY_START';
const editpost_store_actions_actionTypes_FETCH_NOTIFY_SUCCESS = 'FETCH_NOTIFY_SUCCESS';
const editpost_store_actions_actionTypes_FETCH_NOTIFY_FAIL = 'FETCH_NOTIFY_FAIL';
const editpost_store_actions_actionTypes_FETCH_NOTIFY = 'FETCH_NOTIFY';
const editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT = 'CHANGE_FAVORITE_NOTIFY_INIT';
const editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START = 'CHANGE_FAVORITE_NOTIFY_START';
const editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL = 'CHANGE_FAVORITE_NOTIFY_FAIL';
const editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY = 'CHANGE_FAVORITE_NOTIFY';
const editpost_store_actions_actionTypes_SHOW_NAV_LIST = 'SHOW_NAV_LIST';
const editpost_store_actions_actionTypes_FETCH_NAVLIST_INIT = 'FETCH_NAVLIST_INIT';
const editpost_store_actions_actionTypes_FETCH_NAVLIST_START = 'FETCH_NAVLIST_START';
const editpost_store_actions_actionTypes_FETCH_NAVLIST_SUCCESS = 'FETCH_NAVLIST_SUCCESS';
const editpost_store_actions_actionTypes_FETCH_NAVLIST_FAIL = 'FETCH_NAVLIST_FAIL';
const editpost_store_actions_actionTypes_FETCH_NAVLIST = 'FETCH_NAVLIST';
const editpost_store_actions_actionTypes_SHOW_USER_OPTION = 'SHOW_USER_OPTION';
const editpost_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT = 'FETCH_SHARE_ACTIVE_INIT';
const editpost_store_actions_actionTypes_FETCH_SHARE_ACTIVE = 'FETCH_SHARE_ACTIVE';
const editpost_store_actions_actionTypes_RESET_ACTIVE_INIT = 'RESET_ACTIVE_INIT';
const editpost_store_actions_actionTypes_RESET_ACTIVE = 'RESET_ACTIVE';
const editpost_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT = 'FETCH_NOTIFY_ACTIVE_INIT';
const editpost_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE = 'FETCH_NOTIFY_ACTIVE';
const editpost_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT = 'DEFAULT_NOTIFYACTIVE_INIT';
const editpost_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE = 'DEFAULT_NOTIFYACTIVE';
const actionTypes_FETCH_CNT_INIT = 'FETCH_CNT_INIT';
const actionTypes_FETCH_CNT_FAIL = 'FETCH_CNT_FAIL';
const actionTypes_FETCH_CNT = 'FETCH_CNT';
const FETCH_VIDEO_INIT = 'FETCH_VIDEO_INIT';
const FETCH_VIDEO_FAIL = 'FETCH_VIDEO_FAIL';
const VIDEO_FETCHED = 'VIDEO_FETCHED';
const FETCH_VIDEO = 'FETCH_VIDEO';
const editpost_store_actions_actionTypes_FETCH_CATEG_INIT = 'FETCH_CATEG_INIT';
const editpost_store_actions_actionTypes_FETCH_CATEG_START = 'FETCH_CATEG_START';
const editpost_store_actions_actionTypes_FETCH_CATEG_FAIL = 'FETCH_CATEG_FAIL';
const editpost_store_actions_actionTypes_FETCH_CATEG_RESET = 'FETCH_CATEG_RESET';
const IMAGE_EDIT = 'IMAGE_EDIT';
const VIDEO_EDIT = 'VIDEO_EDIT';
const editpost_store_actions_actionTypes_FETCH_CATEG = 'FETCH_CATEG';
const editpost_store_actions_actionTypes_ADD_CATEG_INIT = 'ADD_CATEG_INIT';
const editpost_store_actions_actionTypes_ADD_CATEG = 'ADD_CATEG';
const editpost_store_actions_actionTypes_HIDE_MEDIA_BOX = 'HIDE_MEDIA_BOX';
const editpost_store_actions_actionTypes_SHOW_MEDIA_BOX = 'SHOW_MEDIA_BOX';
const editpost_store_actions_actionTypes_CHECK_LINK_INIT = 'CHECK_LINK_INIT';
const editpost_store_actions_actionTypes_CHECK_LINK = 'CHECK_LINK';
const editpost_store_actions_actionTypes_RESET_LINK = 'RESET_LINK';
const editpost_store_actions_actionTypes_ADD_SNAPSHOT = 'ADD_SNAPSHOT';
const editpost_store_actions_actionTypes_REMOVE_SNAPSHOT = 'REMOVE_SNAPSHOT';
const editpost_store_actions_actionTypes_SUBMIT_MEDIA = 'SUBMIT_MEDIA';
const editpost_store_actions_actionTypes_FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const editpost_store_actions_actionTypes_RESET_TAB = 'RESET_TAB';
const editpost_store_actions_actionTypes_FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const editpost_store_actions_actionTypes_FETCH_USERS = 'FETCH_USERS';
const editpost_store_actions_actionTypes_INPUT_DEFAULT_VALUE = 'INPUT_DEFAULT_VALUE';
const editpost_store_actions_actionTypes_FILTER_USER_INIT = 'FILTER_USER_INIT';
const editpost_store_actions_actionTypes_FILTER_USER = 'FILTER_USER';
const editpost_store_actions_actionTypes_USER_SELECT = 'USER_SELECT';
const editpost_store_actions_actionTypes_REMOVE_MEDIA = 'REMOVE_MEDIA';
const SAVE_REMOVE_SNAP = 'SAVE_REMOVE_SNAP';
const editpost_store_actions_actionTypes_SHOW_USER_SELECT_INIT = 'SHOW_USER_SELECT_INIT';
const editpost_store_actions_actionTypes_SHOW_USER_SELECT = 'SHOW_USER_SELECT';
const editpost_store_actions_actionTypes_SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const editpost_store_actions_actionTypes_SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const editpost_store_actions_actionTypes_SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
const editpost_store_actions_actionTypes_SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const editpost_store_actions_actionTypes_SUBMIT_FORM = 'SUBMIT_FORM';
const editpost_store_actions_actionTypes_FORM_SUBMITTED = 'FORM_SUBMITTED';
// CONCATENATED MODULE: ./react/editpost/shared/utility.js
function editpost_shared_utility_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function editpost_shared_utility_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { editpost_shared_utility_ownKeys(Object(source), true).forEach(function (key) { editpost_shared_utility_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { editpost_shared_utility_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function editpost_shared_utility_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const editpost_shared_utility_updateObject = (oldObject, updatedProperties) => {
  return editpost_shared_utility_objectSpread({}, oldObject, {}, updatedProperties);
};
const editpost_shared_utility_transformNumber = favNumber => {
  const favNumArray = String(favNumber).split("");

  if (favNumArray.length === 4) {
    return `${favNumArray[0]}K`;
  }

  if (favNumArray.length === 5) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}K`;
  }

  if (favNumArray.length === 6) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}K`;
  }

  if (favNumArray.length === 7) {
    const favNum = favNumArray[0];
    return `${favNum}M`;
  }

  if (favNumArray.length === 8) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}M`;
  }

  if (favNumArray.length === 9) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}M`;
  }

  if (favNumArray.length === 10) {
    const favNum = favNumArray[0];
    return `${favNum}B`;
  }

  if (favNumArray.length === 11) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}B`;
  }

  return favNumber;
};
const editpost_shared_utility_transformString = val => {
  const curVal = String(val).substr(0, 115);
  return curVal;
};
function editpost_shared_utility_changeFav(datas, dataID) {
  const dataArray = [...datas];
  let dtIndex;
  let dtArray = dataArray.filter((data, index) => {
    if (data.id === dataID) {
      dtIndex = index;
      return true;
    }

    return false;
  });

  if (dtArray.length > 0) {
    let data = dtArray[0];
    data = editpost_shared_utility_updateObject(data, {
      liked: !data.liked
    });

    if (data.liked) {
      data = editpost_shared_utility_updateObject(data, {
        favorite: data.favorite + 1
      });
    } else {
      data = editpost_shared_utility_updateObject(data, {
        favorite: data.favorite - 1
      });
    }

    const updateDataArray = [...dataArray];
    updateDataArray[dtIndex] = data;
    let updateStartArray = [...updateDataArray];
    data = editpost_shared_utility_updateObject(data, {
      changeFavActive: data.liked
    });
    updateStartArray[dtIndex] = data;
    return {
      updateStartArray,
      updateDataArray
    };
  }

  return dataArray;
}
;
const editpost_shared_utility_checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};
const editpost_shared_utility_getSnapshot = (url, mediaType) => {
  return new Promise((resolve, reject) => {
    let media = document.createElement(mediaType);

    function multipleEventListener(el, mediaLoadHandler) {
      'loadedmetadata loadeddata suspend'.split(' ').forEach(event => {
        el.addEventListener(event, mediaLoadHandler, false);
      });
    }

    media.onerror = function () {
      reject(media.error.message);
    };

    media.src = url;
    multipleEventListener(media, mediaLoadHandler);
    let event_fired = 0;

    function mediaLoadHandler() {
      if (++event_fired === 3) {
        media.currentTime = 1;
        media.addEventListener('seeked', function (event) {
          resolve();
        });
      }
    }
  });
};
const editpost_shared_utility_getImageURL = url => {
  let image = new Image();
  image.src = url;
  let canvas = document.createElement('canvas');
  return new Promise((resolve, reject) => {
    if (canvas.getContext) {
      image.onload = function () {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0);
        let snapShot = canvas.toDataURL('image/png');
        resolve(snapShot);
      };
    } else {
      reject('Please update your Browser');
    }
  });
};
const utility_dataURLtoBlob = dataurl => {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {
    type: mime
  });
};
// CONCATENATED MODULE: ./react/editpost/store/reducers/auth.js


const editpost_store_reducers_auth_initialState = {
  status: false,
  img: null,
  username: null
};

const editpost_store_reducers_auth_checkAuth = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    status: action.status
  });
};

const editpost_store_reducers_auth_checkUserImg = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    img: action.img
  });
};

const editpost_store_reducers_auth_checkUserName = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    username: action.name
  });
};

const editpost_store_reducers_auth_reducer = (state = editpost_store_reducers_auth_initialState, action) => {
  switch (action.type) {
    case editpost_store_actions_actionTypes_CHECK_AUTH:
      return editpost_store_reducers_auth_checkAuth(state, action);

    case editpost_store_actions_actionTypes_CHECK_USERIMG:
      return editpost_store_reducers_auth_checkUserImg(state, action);

    case editpost_store_actions_actionTypes_CHECK_USERNAME:
      return editpost_store_reducers_auth_checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var editpost_store_reducers_auth = (editpost_store_reducers_auth_reducer);
// CONCATENATED MODULE: ./react/editpost/store/reducers/header.js


const editpost_store_reducers_header_initialState = {
  expand: false,
  hideFormSm: false,
  addNew: false,
  notify: null,
  hidNotify: false,
  navList: null,
  navListCateg: null,
  hidNavList: false,
  hidUserOption: false,
  notifyActive: null,
  default: false,
  searchCnt: null,
  filterPos: 0,
  filterLastPos: 0,
  searchCntErr: null,
  filterStart: false
};

const editpost_store_reducers_header_formExpand = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const editpost_store_reducers_header_formSm = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    hideFormSm: false,
    default: false
  });
};

const editpost_store_reducers_header_navDefault = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    expand: false,
    hideFormSm: true,
    addNew: false,
    hidNotify: true,
    hidNavList: true,
    hidUserOption: true,
    default: true
  });
};

const editpost_store_reducers_header_addNew = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    addNew: !state.addNew,
    default: false
  });
};

const editpost_store_reducers_header_fetchNotify = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const editpost_store_reducers_header_fetchNotifyStart = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const editpost_store_reducers_header_changeFavNotifyStart = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const editpost_store_reducers_header_changeFavNotify = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const editpost_store_reducers_header_showNavList = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const editpost_store_reducers_header_fetchNavListStart = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    navList: null,
    navListCateg: null
  });
};

const editpost_store_reducers_header_fetchNavList = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const editpost_store_reducers_header_showUserOption = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const editpost_store_reducers_header_fetchNotifyActive = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    notifyActive: action.notifyActive
  });
};

const editpost_store_reducers_header_defaultNotifyActive = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    notifyActive: null
  });
};

const editpost_store_reducers_header_headerFilterStart = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const editpost_store_reducers_header_headerFilterFail = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    searchCntErr: action.searchCntErr
  });
};

const editpost_store_reducers_header_headerFilter = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    searchCnt: action.searchCnt
  });
};

const editpost_store_reducers_header_headerFilterClose = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    searchCnt: null,
    filterStart: false
  });
};

const editpost_store_reducers_header_reducer = (state = editpost_store_reducers_header_initialState, action) => {
  switch (action.type) {
    case editpost_store_actions_actionTypes_HEADER_FORM_EXPAND:
      return editpost_store_reducers_header_formExpand(state, action);

    case editpost_store_actions_actionTypes_HEADER_FORM_SM:
      return editpost_store_reducers_header_formSm(state, action);

    case editpost_store_actions_actionTypes_HEADER_NAV_DEFAULT:
      return editpost_store_reducers_header_navDefault(state, action);

    case editpost_store_actions_actionTypes_HEADER_ADD_NEW:
      return editpost_store_reducers_header_addNew(state, action);

    case editpost_store_actions_actionTypes_FETCH_NOTIFY_START:
      return editpost_store_reducers_header_fetchNotifyStart(state, action);

    case editpost_store_actions_actionTypes_FETCH_NOTIFY:
      return editpost_store_reducers_header_fetchNotify(state, action);

    case editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START:
      return editpost_store_reducers_header_changeFavNotifyStart(state, action);

    case editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY:
      return editpost_store_reducers_header_changeFavNotify(state, action);

    case editpost_store_actions_actionTypes_SHOW_NAV_LIST:
      return editpost_store_reducers_header_showNavList(state, action);

    case editpost_store_actions_actionTypes_FETCH_NAVLIST_START:
      return editpost_store_reducers_header_fetchNavListStart(state, action);

    case editpost_store_actions_actionTypes_FETCH_NAVLIST:
      return editpost_store_reducers_header_fetchNavList(state, action);

    case editpost_store_actions_actionTypes_SHOW_USER_OPTION:
      return editpost_store_reducers_header_showUserOption(state, action);

    case editpost_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE:
      return editpost_store_reducers_header_fetchNotifyActive(state, action);

    case editpost_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE:
      return editpost_store_reducers_header_defaultNotifyActive(state, action);

    case editpost_store_actions_actionTypes_HEADER_FILTER_START:
      return editpost_store_reducers_header_headerFilterStart(state, action);

    case editpost_store_actions_actionTypes_HEADER_FILTER_FAIL:
      return editpost_store_reducers_header_headerFilterFail(state, action);

    case editpost_store_actions_actionTypes_HEADER_FILTER_CLOSE:
      return editpost_store_reducers_header_headerFilterClose(state, action);

    case editpost_store_actions_actionTypes_HEADER_FILTER:
      return editpost_store_reducers_header_headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var editpost_store_reducers_header = (editpost_store_reducers_header_reducer);
// CONCATENATED MODULE: ./react/editpost/store/reducers/form.js
function form_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function form_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { form_ownKeys(Object(source), true).forEach(function (key) { form_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { form_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function form_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const editpost_store_reducers_form_initialState = {
  cntErr: null,
  categ: null,
  showCateg: false,
  categErr: null,
  newCateg: null,
  hideMediaBox: false,
  hidAddItm: false,
  linkValid: null,
  snapshot: [],
  media: {},
  curTab: 'online',
  startUser: true,
  users: null,
  onlineUser: [],
  offlineUser: [],
  filteredUser: null,
  defaultValue: false,
  uploadPercent: null,
  submitError: null,
  removedSnap: [],
  submitForm: false,
  id: null,
  content: null,
  title: null,
  videoFetched: false,
  showVideo: false,
  editImage: false,
  editVideo: false,
  redirect: false
};

const reducers_form_fetchCnt = (state, action) => {
  if (action.cnt) {
    let desc = JSON.parse(action.cnt.desc);
    let snapshot = [...action.cnt.snapshot];
    let image = [...action.cnt.image];
    let video = [...action.cnt.video];
    return editpost_shared_utility_updateObject(state, {
      newCateg: action.cnt.category,
      title: action.cnt.title,
      content: desc,
      cntErr: null,
      snapshot,
      media: {
        image,
        video
      }
    });
  }

  return editpost_shared_utility_updateObject(state, {
    redirect: true
  });
};

const reducers_form_fetchCntFail = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    cntErr: action.err
  });
};

const form_fetchVideo = (state, action) => {
  let media = form_objectSpread({}, state.media);

  let videos = [...action.videos];
  media.video = videos;
  return editpost_shared_utility_updateObject(state, {
    media,
    videoFetched: true
  });
};

const fetchVideoFail = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    cntErr: action.err
  });
};

const videoFetched = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    showVideo: true
  });
};

const imageEdit = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    editImage: true
  });
};

const videoEdit = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    editVideo: true
  });
};

const editpost_store_reducers_form_fetchCategStart = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    showCateg: true,
    categErr: null
  });
};

const editpost_store_reducers_form_fetchCategFail = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    categErr: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const editpost_store_reducers_form_fetchCategReset = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    categErr: null,
    showCateg: false
  });
};

const editpost_store_reducers_form_fetchCateg = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    categ: action.categ,
    showCateg: action.categ !== null
  });
};

const editpost_store_reducers_form_addCateg = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    newCateg: action.categ
  });
};

const editpost_store_reducers_form_checkLink = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    linkValid: {
      err: action.err,
      media: action.media
    }
  });
};

const editpost_store_reducers_form_resetLink = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    linkValid: null
  });
};

const editpost_store_reducers_form_addSnapshot = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const editpost_store_reducers_form_removeSnapshot = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const saveRemoveSnap = (state, action) => {
  let snap = [...state.removedSnap];
  snap.push(action.snapshotDet);
  return editpost_shared_utility_updateObject(state, {
    removedSnap: snap
  });
};

const editpost_store_reducers_form_removeMedia = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    media: action.media
  });
};

const editpost_store_reducers_form_submitMedia = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    media: action.media,
    hideMediaBox: true
  });
};

const editpost_store_reducers_form_hideMediaBox = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    hideMediaBox: true
  });
};

const editpost_store_reducers_form_showMediaBox = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    hideMediaBox: false
  });
};

const editpost_store_reducers_form_fetchUsers = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    users: action.users,
    filteredUser: null,
    startUser: false,
    defaultValue: true,
    onlineUser: action.status === 'online' ? action.users : state.onlineUser,
    offlineUser: action.status === 'offline' ? action.users : state.offlineUser,
    curTab: action.status
  });
};

const editpost_store_reducers_form_fetchUsersFail = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const editpost_store_reducers_form_resetTab = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const editpost_store_reducers_form_inputDefaultValue = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    defaultValue: false
  });
};

const editpost_store_reducers_form_filterUser = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    filteredUser: action.users
  });
};

const editpost_store_reducers_form_userSelect = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    media: action.users
  });
};

const editpost_store_reducers_form_showUserSelect = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    users: action.users,
    curTab: 'userSelect',
    filteredUser: null,
    defaultValue: true
  });
};

const editpost_store_reducers_form_submitFormStart = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    submitForm: true,
    submitError: null,
    submitFiles: 0
  });
};

const editpost_store_reducers_form_submitFormSuccess = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    uploadPercent: action.uploadPercent
  });
};

const editpost_store_reducers_form_submitFormFail = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    submitError: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const editpost_store_reducers_form_formSubmitted = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    id: action.id
  });
};

const editpost_store_reducers_form_reducer = (state = editpost_store_reducers_form_initialState, action) => {
  switch (action.type) {
    case actionTypes_FETCH_CNT:
      return reducers_form_fetchCnt(state, action);

    case actionTypes_FETCH_CNT_FAIL:
      return reducers_form_fetchCntFail(state, action);

    case FETCH_VIDEO:
      return form_fetchVideo(state, action);

    case FETCH_VIDEO_FAIL:
      return fetchVideoFail(state, action);

    case VIDEO_FETCHED:
      return videoFetched(state, action);

    case VIDEO_EDIT:
      return videoEdit(state, action);

    case IMAGE_EDIT:
      return imageEdit(state, action);

    case editpost_store_actions_actionTypes_FETCH_CATEG_START:
      return editpost_store_reducers_form_fetchCategStart(state, action);

    case editpost_store_actions_actionTypes_FETCH_CATEG_FAIL:
      return editpost_store_reducers_form_fetchCategFail(state, action);

    case editpost_store_actions_actionTypes_FETCH_CATEG_RESET:
      return editpost_store_reducers_form_fetchCategReset(state, action);

    case editpost_store_actions_actionTypes_FETCH_CATEG:
      return editpost_store_reducers_form_fetchCateg(state, action);

    case editpost_store_actions_actionTypes_ADD_CATEG:
      return editpost_store_reducers_form_addCateg(state, action);

    case editpost_store_actions_actionTypes_HIDE_MEDIA_BOX:
      return editpost_store_reducers_form_hideMediaBox(state, action);

    case editpost_store_actions_actionTypes_SHOW_MEDIA_BOX:
      return editpost_store_reducers_form_showMediaBox(state, action);

    case editpost_store_actions_actionTypes_CHECK_LINK:
      return editpost_store_reducers_form_checkLink(state, action);

    case editpost_store_actions_actionTypes_RESET_LINK:
      return editpost_store_reducers_form_resetLink(state, action);

    case editpost_store_actions_actionTypes_ADD_SNAPSHOT:
      return editpost_store_reducers_form_addSnapshot(state, action);

    case editpost_store_actions_actionTypes_REMOVE_SNAPSHOT:
      return editpost_store_reducers_form_removeSnapshot(state, action);

    case SAVE_REMOVE_SNAP:
      return saveRemoveSnap(state, action);

    case editpost_store_actions_actionTypes_REMOVE_MEDIA:
      return editpost_store_reducers_form_removeMedia(state, action);

    case editpost_store_actions_actionTypes_SUBMIT_MEDIA:
      return editpost_store_reducers_form_submitMedia(state, action);

    case editpost_store_actions_actionTypes_FETCH_USERS:
      return editpost_store_reducers_form_fetchUsers(state, action);

    case editpost_store_actions_actionTypes_FETCH_USERS_FAIL:
      return editpost_store_reducers_form_fetchUsersFail(state, action);

    case editpost_store_actions_actionTypes_RESET_TAB:
      return editpost_store_reducers_form_resetTab(state, action);

    case editpost_store_actions_actionTypes_INPUT_DEFAULT_VALUE:
      return editpost_store_reducers_form_inputDefaultValue(state, action);

    case editpost_store_actions_actionTypes_FILTER_USER:
      return editpost_store_reducers_form_filterUser(state, action);

    case editpost_store_actions_actionTypes_USER_SELECT:
      return editpost_store_reducers_form_userSelect(state, action);

    case editpost_store_actions_actionTypes_SHOW_USER_SELECT:
      return editpost_store_reducers_form_showUserSelect(state, action);

    case editpost_store_actions_actionTypes_SUBMIT_FORM_START:
      return editpost_store_reducers_form_submitFormStart(state, action);

    case editpost_store_actions_actionTypes_SUBMIT_FORM_SUCCESS:
      return editpost_store_reducers_form_submitFormSuccess(state, action);

    case editpost_store_actions_actionTypes_SUBMIT_FORM_FAIL:
      return editpost_store_reducers_form_submitFormFail(state, action);

    case editpost_store_actions_actionTypes_FORM_SUBMITTED:
      return editpost_store_reducers_form_formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var editpost_store_reducers_form = (editpost_store_reducers_form_reducer);
// CONCATENATED MODULE: ./react/editpost/store/reducers/main.js
function editpost_store_reducers_main_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function editpost_store_reducers_main_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { editpost_store_reducers_main_ownKeys(Object(source), true).forEach(function (key) { editpost_store_reducers_main_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { editpost_store_reducers_main_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function editpost_store_reducers_main_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const editpost_store_reducers_main_initialState = {
  shareActive: null
};

const editpost_store_reducers_main_fetchShareActive = (state, action) => {
  return editpost_shared_utility_updateObject(state, {
    shareActive: action.shareActive
  });
};

const editpost_store_reducers_main_resetActive = (state, action) => {
  let reset = action.curTab === 'post' ? {
    ptActive: null
  } : {
    shareActive: null
  };
  return editpost_shared_utility_updateObject(state, editpost_store_reducers_main_objectSpread({}, reset));
};

const editpost_store_reducers_main_reducer = (state = editpost_store_reducers_main_initialState, action) => {
  switch (action.type) {
    case editpost_store_actions_actionTypes_FETCH_SHARE_ACTIVE:
      return editpost_store_reducers_main_fetchShareActive(state, action);

    case editpost_store_actions_actionTypes_RESET_ACTIVE:
      return editpost_store_reducers_main_resetActive(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var editpost_store_reducers_main = (editpost_store_reducers_main_reducer);
// CONCATENATED MODULE: ./react/editpost/store/actions/auth.js

const editpost_store_actions_auth_checkAuthInit = () => {
  return {
    type: editpost_store_actions_actionTypes_CHECK_AUTH_INIT
  };
};
const editpost_store_actions_auth_checkAuth = status => {
  return {
    type: editpost_store_actions_actionTypes_CHECK_AUTH,
    status
  };
};
const editpost_store_actions_auth_checkUserImg = img => {
  return {
    type: editpost_store_actions_actionTypes_CHECK_USERIMG,
    img
  };
};
const editpost_store_actions_auth_checkUserName = name => {
  return {
    type: editpost_store_actions_actionTypes_CHECK_USERNAME,
    name
  };
};
// CONCATENATED MODULE: ./react/editpost/store/actions/header.js

const editpost_store_actions_header_headerFormExpand = () => {
  return {
    type: editpost_store_actions_actionTypes_HEADER_FORM_EXPAND
  };
};
const editpost_store_actions_header_headerFormSm = () => {
  return {
    type: editpost_store_actions_actionTypes_HEADER_FORM_SM
  };
};
const editpost_store_actions_header_headerNavDefault = () => {
  return {
    type: editpost_store_actions_actionTypes_HEADER_NAV_DEFAULT
  };
};
const editpost_store_actions_header_headerAddNew = () => {
  return {
    type: editpost_store_actions_actionTypes_HEADER_ADD_NEW
  };
};
const editpost_store_actions_header_fetchNotifyInit = () => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_NOTIFY_INIT
  };
};
const editpost_store_actions_header_fetchNotifyStart = () => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_NOTIFY_START
  };
};
const editpost_store_actions_header_fetchNotifySuccess = () => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_NOTIFY_SUCCESS
  };
};
const editpost_store_actions_header_fetchNotifyFail = err => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_NOTIFY_FAIL,
    err
  };
};
const editpost_store_actions_header_fetchNotify = notify => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_NOTIFY,
    notify
  };
};
const editpost_store_actions_header_changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT,
    notify,
    notifyID
  };
};
const editpost_store_actions_header_changeFavNotifyStart = notify => {
  return {
    type: editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START,
    notify
  };
};
const editpost_store_actions_header_changeFavNotifyFail = notify => {
  return {
    type: editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL,
    notify
  };
};
const editpost_store_actions_header_changeFavNotify = notify => {
  return {
    type: editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY,
    notify
  };
};
const editpost_store_actions_header_showNavList = () => {
  return {
    type: editpost_store_actions_actionTypes_SHOW_NAV_LIST
  };
};
const editpost_store_actions_header_fetchNavlistInit = category => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_NAVLIST_INIT,
    category
  };
};
const editpost_store_actions_header_fetchNavlistStart = () => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_NAVLIST_START
  };
};
const editpost_store_actions_header_fetchNavlist = (category, navList) => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_NAVLIST,
    category,
    navList
  };
};
const editpost_store_actions_header_showUserOption = () => {
  return {
    type: editpost_store_actions_actionTypes_SHOW_USER_OPTION
  };
};
const editpost_store_actions_header_fetchNotifyactiveInit = userID => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT,
    userID
  };
};
const editpost_store_actions_header_fetchNotifyActive = notifyActive => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE,
    notifyActive
  };
};
const editpost_store_actions_header_defaultNotifyactiveInit = () => {
  return {
    type: editpost_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT
  };
};
const editpost_store_actions_header_defaultNotifyActive = () => {
  return {
    type: editpost_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE
  };
};
const editpost_store_actions_header_headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: editpost_store_actions_actionTypes_HEADER_FILTER_INIT,
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const editpost_store_actions_header_headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: editpost_store_actions_actionTypes_HEADER_FILTER_START,
    filterPos,
    filterLastPos
  };
};
const editpost_store_actions_header_headerFilterFail = searchCntErr => {
  return {
    type: editpost_store_actions_actionTypes_HEADER_FILTER_FAIL,
    searchCntErr
  };
};
const editpost_store_actions_header_headerFilter = searchCnt => {
  return {
    type: editpost_store_actions_actionTypes_HEADER_FILTER,
    searchCnt
  };
};
const editpost_store_actions_header_headerFilterClose = () => {
  return {
    type: editpost_store_actions_actionTypes_HEADER_FILTER_CLOSE
  };
};
// CONCATENATED MODULE: ./react/editpost/store/actions/main.js

const editpost_store_actions_main_fetchShareactiveInit = userID => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT,
    userID
  };
};
const editpost_store_actions_main_fetchShareActive = shareActive => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_SHARE_ACTIVE,
    shareActive
  };
};
const editpost_store_actions_main_resetActiveInit = (userID, curTab) => {
  return {
    type: editpost_store_actions_actionTypes_RESET_ACTIVE_INIT,
    userID,
    curTab
  };
};
const editpost_store_actions_main_resetActive = curTab => {
  return {
    type: editpost_store_actions_actionTypes_RESET_ACTIVE,
    curTab
  };
};
// CONCATENATED MODULE: ./react/editpost/store/actions/form.js

const form_fetchCntInit = id => {
  return {
    type: actionTypes_FETCH_CNT_INIT,
    id
  };
};
const actions_form_fetchCntFail = err => {
  return {
    type: actionTypes_FETCH_CNT_FAIL,
    err
  };
};
const store_actions_form_fetchCnt = cnt => {
  return {
    type: actionTypes_FETCH_CNT,
    cnt
  };
};
const fetchVideoInit = videosID => {
  return {
    type: FETCH_VIDEO_INIT,
    videosID
  };
};
const form_fetchVideoFail = err => {
  return {
    type: FETCH_VIDEO_FAIL,
    err
  };
};
const actions_form_fetchVideo = videos => {
  return {
    type: FETCH_VIDEO,
    videos
  };
};
const form_videoFetched = () => {
  return {
    type: VIDEO_FETCHED
  };
};
const form_imageEdit = () => {
  return {
    type: IMAGE_EDIT
  };
};
const form_videoEdit = () => {
  return {
    type: VIDEO_EDIT
  };
};
const editpost_store_actions_form_fetchCategInit = () => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_CATEG_INIT
  };
};
const editpost_store_actions_form_fetchCategStart = () => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_CATEG_START
  };
};
const editpost_store_actions_form_fetchCategFail = err => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_CATEG_FAIL,
    err
  };
};
const editpost_store_actions_form_fetchCategReset = () => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_CATEG_RESET
  };
};
const editpost_store_actions_form_fetchCateg = categ => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_CATEG,
    categ
  };
};
const editpost_store_actions_form_addCategInit = categ => {
  return {
    type: editpost_store_actions_actionTypes_ADD_CATEG_INIT,
    categ
  };
};
const editpost_store_actions_form_addCateg = categ => {
  return {
    type: editpost_store_actions_actionTypes_ADD_CATEG,
    categ
  };
};
const editpost_store_actions_form_checkLinkInit = (link, mediaType) => {
  return {
    type: editpost_store_actions_actionTypes_CHECK_LINK_INIT,
    link,
    mediaType
  };
};
const editpost_store_actions_form_checkLink = (err, media) => {
  return {
    type: editpost_store_actions_actionTypes_CHECK_LINK,
    err,
    media
  };
};
const editpost_store_actions_form_resetLink = () => {
  return {
    type: editpost_store_actions_actionTypes_RESET_LINK
  };
};
const editpost_store_actions_form_addSnapshot = snapshot => {
  return {
    type: editpost_store_actions_actionTypes_ADD_SNAPSHOT,
    snapshot
  };
};
const editpost_store_actions_form_removeSnapshot = snapshot => {
  return {
    type: editpost_store_actions_actionTypes_REMOVE_SNAPSHOT,
    snapshot
  };
};
const form_saveRemoveSnap = snapshotDet => {
  return {
    type: SAVE_REMOVE_SNAP,
    snapshotDet
  };
};
const editpost_store_actions_form_removeMedia = media => {
  return {
    type: editpost_store_actions_actionTypes_REMOVE_MEDIA,
    media
  };
};
const editpost_store_actions_form_submitMedia = media => {
  return {
    type: editpost_store_actions_actionTypes_SUBMIT_MEDIA,
    media
  };
};
const editpost_store_actions_form_hideMediaBox = () => {
  return {
    type: editpost_store_actions_actionTypes_HIDE_MEDIA_BOX
  };
};
const editpost_store_actions_form_showMediaBox = () => {
  return {
    type: editpost_store_actions_actionTypes_SHOW_MEDIA_BOX
  };
};
const editpost_store_actions_form_fetchUsersInit = userStatus => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_USERS_INIT,
    userStatus
  };
};
const editpost_store_actions_form_fetchUsers = (users, status) => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_USERS,
    users,
    status
  };
};
const editpost_store_actions_form_fetchUsersFail = err => {
  return {
    type: editpost_store_actions_actionTypes_FETCH_USERS_FAIL,
    err
  };
};
const editpost_store_actions_form_resetTab = () => {
  return {
    type: editpost_store_actions_actionTypes_RESET_TAB
  };
};
const editpost_store_actions_form_inputDefaultValue = () => {
  return {
    type: editpost_store_actions_actionTypes_INPUT_DEFAULT_VALUE
  };
};
const editpost_store_actions_form_filterUserInit = (users, filterContent) => {
  return {
    type: editpost_store_actions_actionTypes_FILTER_USER_INIT,
    users,
    filterContent
  };
};
const editpost_store_actions_form_filterUser = users => {
  return {
    type: editpost_store_actions_actionTypes_FILTER_USER,
    users
  };
};
const editpost_store_actions_form_userSelect = users => {
  return {
    type: editpost_store_actions_actionTypes_USER_SELECT,
    users
  };
};
const editpost_store_actions_form_showUserSelectInit = (users, userID) => {
  return {
    type: editpost_store_actions_actionTypes_SHOW_USER_SELECT_INIT,
    users,
    userID
  };
};
const editpost_store_actions_form_showUserSelect = users => {
  return {
    type: editpost_store_actions_actionTypes_SHOW_USER_SELECT,
    users
  };
};
const editpost_store_actions_form_submitFormInit = formData => {
  return {
    type: editpost_store_actions_actionTypes_SUBMIT_FORM_INIT,
    formData
  };
};
const editpost_store_actions_form_submitFormFail = err => {
  return {
    type: editpost_store_actions_actionTypes_SUBMIT_FORM_FAIL,
    err
  };
};
const editpost_store_actions_form_submitFormSuccess = uploadPercent => {
  return {
    type: editpost_store_actions_actionTypes_SUBMIT_FORM_SUCCESS,
    uploadPercent
  };
};
const editpost_store_actions_form_submitFormStart = () => {
  return {
    type: editpost_store_actions_actionTypes_SUBMIT_FORM_START
  };
};
const editpost_store_actions_form_submitForm = () => {
  return {
    type: editpost_store_actions_actionTypes_SUBMIT_FORM
  };
};
const editpost_store_actions_form_formSubmitted = id => {
  return {
    type: editpost_store_actions_actionTypes_FORM_SUBMITTED,
    id
  };
};
// CONCATENATED MODULE: ./react/editpost/axios.js


const editpost_axios_instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
editpost_axios_instance.defaults.headers.common['authorization'] = 'authorization';
editpost_axios_instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var editpost_axios = (editpost_axios_instance);
// CONCATENATED MODULE: ./react/editpost/store/thunk/submit.js


const editpost_store_thunk_submit_submit = formData => {
  return dispatch => {
    dispatch(editpost_store_actions_form_submitFormStart());
    let formContent = new FormData();

    for (let key in formData) {
      if (key !== 'video' && key !== 'image' && key !== 'removedSnap' && key !== 'snapshot') {
        formContent.append(key, formData[key]);
      }

      if (key === 'video') {
        for (let video of formData[key]) {
          let ext = video.file.type.split('/').pop();
          formContent.append(key, video.file, `${video.id}.${ext}`);
        }
      }

      if (key === 'image') {
        let send = 0;
        let uploaded = [];

        for (let image of formData[key]) {
          if (image.mediaType) {
            uploaded.push({
              id: image.id,
              filename: image.filename,
              type: image.type
            });
            ++send;

            if (send === formData[key].length) {
              formContent.append('uploadedimage', JSON.stringify(uploaded));
            }
          } else {
            let ext = image.file.type.split('/').pop();
            formContent.append(key, image.file, `${image.id}.${ext}`);
            ++send;

            if (send === formData[key].length) {
              formContent.append('uploadedimage', JSON.stringify(uploaded));
            }
          }
        }
      }

      if (key === 'snapshot') {
        let uploadedSnap = [];
        let uploadedVideo = [];

        for (let media of formData[key]) {
          uploadedSnap.push({
            id: media.id,
            videoID: media.videoID,
            videoCnt: media.videoCnt
          });
          uploadedVideo.push({
            id: media.video.id,
            snapshotID: media.video.snapshotID,
            type: media.video.type
          });
        }

        formContent.append('uploadedvideo', JSON.stringify(uploadedVideo));
        formContent.append('uploadedsnap', JSON.stringify(uploadedSnap));
      }

      if (key === 'removedSnap' && formData[key].length > 0) {
        formContent.append('removedmedia', JSON.stringify(formData[key]));
      }
    }

    editpost_axios.post('/edit/post', formContent, {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.lengthComputable) {
          const percentage = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          dispatch(editpost_store_actions_form_submitFormSuccess(percentage));
        }
      }
    }).then(res => {
      dispatch(editpost_store_actions_form_formSubmitted(res.data));
    }).catch(err => {
      dispatch(editpost_store_actions_form_submitFormFail(err));
    });
  };
};
// CONCATENATED MODULE: ./react/editpost/store/actions/index.js





// CONCATENATED MODULE: ./react/editpost/store/sagas/auth.js



function* editpost_store_sagas_auth_checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(effects_["put"])(editpost_store_actions_auth_checkAuth(true));

    try {
      let response = yield editpost_axios.post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(effects_["put"])(editpost_store_actions_auth_checkUserImg(response.data.url));
      } else {
        yield Object(effects_["put"])(editpost_store_actions_auth_checkUserName(response.data.name));
      }
    } catch (err) {}
  }
}
// CONCATENATED MODULE: ./react/editpost/store/sagas/header.js




function* editpost_store_sagas_header_fetchNotifyInitSaga(action) {
  try {
    yield Object(effects_["put"])(editpost_store_actions_header_fetchNotifyStart());
    let response = yield editpost_axios.post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(editpost_store_actions_header_fetchNotify(response.data.coll));
    } else {
      yield Object(effects_["put"])(editpost_store_actions_header_fetchNotify([]));
    }
  } catch (err) {
    yield Object(effects_["put"])(editpost_store_actions_header_fetchNotifyFail(err));
  }
}
function* editpost_store_sagas_header_changeFavNotifySaga(action) {
  let notify = editpost_shared_utility_changeFav(action.notify, action.notifyID);
  yield Object(effects_["put"])(editpost_store_actions_header_changeFavNotifyStart(notify.updateStartArray));
  yield Object(effects_["put"])(editpost_store_actions_header_changeFavNotify(notify.updateDataArray));
}
function* editpost_store_sagas_header_fetchNavlistInitSaga(action) {
  try {
    yield Object(effects_["put"])(editpost_store_actions_header_fetchNavlistStart());
    let response = yield editpost_axios.post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(effects_["put"])(editpost_store_actions_header_fetchNavlist(action.category, response.data));
  } catch (e) {}
}
function* editpost_store_sagas_header_fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield editpost_axios.post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(editpost_store_actions_header_fetchNotifyActive(response.data.collTotal));
    }

    ;
  } catch (err) {}
}
function* editpost_store_sagas_header_defaultNotifyActiveInitSaga(action) {
  try {
    yield editpost_axios.post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(effects_["put"])(editpost_store_actions_header_defaultNotifyActive());
  } catch (err) {}
}
function* editpost_store_sagas_header_headerFilterInitSaga(action) {
  try {
    yield Object(effects_["put"])(editpost_store_actions_header_headerFilterStart(action.filterPos, action.filterLastPos));
    let response = yield editpost_axios.post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(effects_["put"])(editpost_store_actions_header_headerFilter(response.data));
  } catch (err) {
    yield Object(effects_["put"])(editpost_store_actions_header_headerFilterFail(err));
  }
}
// CONCATENATED MODULE: ./react/editpost/store/sagas/main.js



function* editpost_store_sagas_main_fetchShareActiveInitSaga(action) {
  try {
    let response = yield editpost_axios.post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });

    if (response.data > 0) {
      yield Object(effects_["put"])(editpost_store_actions_main_fetchShareActive(response.data));
    }

    return;
  } catch (err) {}
}
function* editpost_store_sagas_main_resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'share') {
      yield editpost_axios.patch('/header', {
        userID: action.userID
      }, {
        headers: {
          'data-categ': action.curTab
        }
      });
    }

    yield Object(effects_["put"])(editpost_store_actions_main_resetActive(action.curTab));
  } catch (err) {}
}
// CONCATENATED MODULE: ./react/editpost/store/sagas/form.js
function sagas_form_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function sagas_form_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { sagas_form_ownKeys(Object(source), true).forEach(function (key) { sagas_form_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { sagas_form_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function sagas_form_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function* sagas_form_fetchCntInitSaga(action) {
  try {
    const response = yield editpost_axios.post('/header', {
      id: action.id,
      model: 'post'
    }, {
      headers: {
        'data-categ': `editform`
      }
    });

    if (response.data && (response.data.image.length > 0 || response.data.snapshot.length > 0)) {
      let images = [];
      let snaps = [];

      for (let image of response.data.image) {
        images.push(sagas_form_objectSpread({
          url: `${global_default.a.url}/media/image/${image.id}`
        }, image, {
          mediaType: 'image'
        }));
      }

      for (let snap of response.data.snapshot) {
        let video = response.data.video.filter(videoDet => videoDet.snapshotID === snap.videoID);
        snaps.push(sagas_form_objectSpread({
          url: `${global_default.a.url}/media/image/${snap.id}`
        }, snap, {
          mediaType: 'snapshot',
          video: video[0]
        }));
      }

      response.data.image = images;
      response.data.snapshot = snaps;
      response.data.video = [];
    }

    yield Object(effects_["put"])(store_actions_form_fetchCnt(response.data));
  } catch (err) {
    yield Object(effects_["put"])(actions_form_fetchCntFail(err));
  }
}
function* fetchVideoInitSaga(action) {
  try {
    let videos = [];
    let video = 0;

    if (action.videosID.length < 1) {
      yield Object(effects_["put"])(actions_form_fetchVideo([]));
      return;
    }

    for (let vid of action.videosID) {
      let media = yield editpost_axios.post('/media', {
        mediaID: vid.id
      }, {
        headers: {
          'data-categ': 'media'
        }
      });
      let vidData = utility_dataURLtoBlob(media.data);
      let url = window.URL.createObjectURL(vidData);
      ++video;
      videos.push({
        file: vidData,
        url,
        id: vid.snapshotID
      });

      if (video === action.videosID.length) {
        yield Object(effects_["put"])(actions_form_fetchVideo(videos));
      }
    }
  } catch (err) {
    yield Object(effects_["put"])(form_fetchVideoFail(err));
  }
}
function* editpost_store_sagas_form_fetchCategInitSaga(action) {
  try {
    yield Object(effects_["put"])(editpost_store_actions_form_fetchCategStart());
    const category = yield editpost_axios.post('/post', null, {
      headers: {
        'data-categ': 'postCateg'
      }
    });
    const categ = category.data && category.data.length > 0 ? category.data : null;
    yield Object(effects_["put"])(editpost_store_actions_form_fetchCateg(categ));
  } catch (err) {
    yield Object(effects_["put"])(editpost_store_actions_form_fetchCategFail(err));
    yield Object(effects_["delay"])(2000);
    yield Object(effects_["put"])(editpost_store_actions_form_fetchCategReset());
  }
}
function* editpost_store_sagas_form_addCategInitSaga(action) {
  let categs = String(action.categ).split(',');
  let transformCateg = [];

  for (let categ of categs) {
    transformCateg.push(String(categ).trim().charAt(0).toUpperCase() + String(categ).trim().toLowerCase().slice(1));
  }

  let removeDuplicate = [...new Set(transformCateg)];
  yield Object(effects_["put"])(editpost_store_actions_form_addCateg(removeDuplicate));
}
function* editpost_store_sagas_form_checkLinkInitSaga(action) {
  let link = String(action.link).trim();

  try {
    let response = yield external_axios_default.a.get(link, {
      responseType: 'blob',
      timeout: 8000
    });

    if (response.data.type.startsWith(action.mediaType + '/')) {
      yield Object(effects_["put"])(editpost_store_actions_form_checkLink(null, {
        file: response.data,
        url: window.URL.createObjectURL(response.data)
      }));
      return;
    }

    throw new Error(`Unknown format, Only ${action.mediaType} files`);
  } catch (err) {
    yield Object(effects_["put"])(editpost_store_actions_form_checkLink(err, null));
  }
}
function* editpost_store_sagas_form_fetchUsersInitSaga(action) {
  try {
    let response = yield editpost_axios.post('/users', null, {
      headers: {
        'data-categ': `allteacher-${action.userStatus}`
      }
    });
    yield Object(effects_["put"])(editpost_store_actions_form_fetchUsers(response.data, action.userStatus));
  } catch (err) {
    yield Object(effects_["put"])(editpost_store_actions_form_fetchUsersFail(err));
  }
}
function* editpost_store_sagas_form_filterUserInitSaga(action) {
  let filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);

  if (!action.filterContent && action.users && action.users.length > 0) {
    filterUser = [...action.users];
  }

  yield Object(effects_["put"])(editpost_store_actions_form_filterUser(filterUser));
}
function* editpost_store_sagas_form_showUserSelectInitSaga(action) {
  let filterUser = action.users.filter(user => action.userID.indexOf(user.id) !== -1);
  yield Object(effects_["put"])(editpost_store_actions_form_showUserSelect(filterUser));
}
// CONCATENATED MODULE: ./react/editpost/store/sagas/index.js






function* editpost_store_sagas_watchAuth() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_CHECK_AUTH_INIT, editpost_store_sagas_auth_checkAuthInitSaga)]);
}
function* editpost_store_sagas_watchHeader() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_FETCH_NOTIFY_INIT, editpost_store_sagas_header_fetchNotifyInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT, editpost_store_sagas_header_changeFavNotifySaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_FETCH_NAVLIST_INIT, editpost_store_sagas_header_fetchNavlistInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT, editpost_store_sagas_header_fetchNotifyActiveInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT, editpost_store_sagas_header_defaultNotifyActiveInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT, editpost_store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_HEADER_FILTER_INIT, editpost_store_sagas_header_headerFilterInitSaga)]);
}
function* editpost_store_sagas_watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes_FETCH_CNT_INIT, sagas_form_fetchCntInitSaga), Object(effects_["takeEvery"])(FETCH_VIDEO_INIT, fetchVideoInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_FETCH_CATEG_INIT, editpost_store_sagas_form_fetchCategInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_ADD_CATEG_INIT, editpost_store_sagas_form_addCategInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_CHECK_LINK_INIT, editpost_store_sagas_form_checkLinkInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_FETCH_USERS_INIT, editpost_store_sagas_form_fetchUsersInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_FILTER_USER_INIT, editpost_store_sagas_form_filterUserInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_SHOW_USER_SELECT_INIT, editpost_store_sagas_form_showUserSelectInitSaga)]);
}
function* editpost_store_sagas_watchMain() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT, editpost_store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(editpost_store_actions_actionTypes_RESET_ACTIVE_INIT, editpost_store_sagas_main_resetActiveInitSaga)]);
}
function* editpost_store_sagas_rootSaga() {
  yield Object(effects_["all"])([editpost_store_sagas_watchAuth(), editpost_store_sagas_watchHeader(), editpost_store_sagas_watchForm(), editpost_store_sagas_watchMain()]);
}
// CONCATENATED MODULE: ./react/editpost/store.js









const editpost_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function editpost_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: editpost_store_reducers_auth,
    header: editpost_store_reducers_header,
    main: editpost_store_reducers_main,
    form: editpost_store_reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, editpost_store_bindMiddleware([external_redux_thunk_default.a, sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(editpost_store_sagas_rootSaga);
  return store;
}

/* harmony default export */ var editpost_store = (editpost_store_configureStore);
// CONCATENATED MODULE: ./react/editque/store/actions/actionTypes.js
const editque_store_actions_actionTypes_CHECK_AUTH_INIT = 'CHECK_AUTH_INIT';
const editque_store_actions_actionTypes_CHECK_AUTH = 'CHECK_AUTH';
const editque_store_actions_actionTypes_CHECK_USERIMG = 'CHECK_USERIMG';
const editque_store_actions_actionTypes_CHECK_USERNAME = 'CHECK_USERNAME';
const editque_store_actions_actionTypes_HEADER_FORM_EXPAND = 'HEADER_FORM_EXPAND';
const editque_store_actions_actionTypes_HEADER_FORM_SM = 'HEADER_FORM_SM';
const editque_store_actions_actionTypes_HEADER_NAV_DEFAULT = 'HEADER_NAV_DEFAULT';
const editque_store_actions_actionTypes_HEADER_FILTER_INIT = 'HEADER_FILTER_INIT';
const editque_store_actions_actionTypes_HEADER_FILTER_START = 'HEADER_FILTER_START';
const editque_store_actions_actionTypes_HEADER_FILTER_FAIL = 'HEADER_FILTER_FAIL';
const editque_store_actions_actionTypes_HEADER_FILTER = 'HEADER_FILTER';
const editque_store_actions_actionTypes_HEADER_FILTER_CLOSE = 'HEADER_FILTER_CLOSE';
const editque_store_actions_actionTypes_HEADER_ADD_NEW = 'HEADER_ADD_NEW';
const editque_store_actions_actionTypes_FETCH_NOTIFY_INIT = 'FETCH_NOTIFY_INIT';
const editque_store_actions_actionTypes_FETCH_NOTIFY_START = 'FETCH_NOTIFY_START';
const editque_store_actions_actionTypes_FETCH_NOTIFY_SUCCESS = 'FETCH_NOTIFY_SUCCESS';
const editque_store_actions_actionTypes_FETCH_NOTIFY_FAIL = 'FETCH_NOTIFY_FAIL';
const editque_store_actions_actionTypes_FETCH_NOTIFY = 'FETCH_NOTIFY';
const editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT = 'CHANGE_FAVORITE_NOTIFY_INIT';
const editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START = 'CHANGE_FAVORITE_NOTIFY_START';
const editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL = 'CHANGE_FAVORITE_NOTIFY_FAIL';
const editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY = 'CHANGE_FAVORITE_NOTIFY';
const editque_store_actions_actionTypes_SHOW_NAV_LIST = 'SHOW_NAV_LIST';
const editque_store_actions_actionTypes_FETCH_NAVLIST_INIT = 'FETCH_NAVLIST_INIT';
const editque_store_actions_actionTypes_FETCH_NAVLIST_START = 'FETCH_NAVLIST_START';
const editque_store_actions_actionTypes_FETCH_NAVLIST_SUCCESS = 'FETCH_NAVLIST_SUCCESS';
const editque_store_actions_actionTypes_FETCH_NAVLIST_FAIL = 'FETCH_NAVLIST_FAIL';
const editque_store_actions_actionTypes_FETCH_NAVLIST = 'FETCH_NAVLIST';
const editque_store_actions_actionTypes_SHOW_USER_OPTION = 'SHOW_USER_OPTION';
const editque_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT = 'FETCH_SHARE_ACTIVE_INIT';
const editque_store_actions_actionTypes_FETCH_SHARE_ACTIVE = 'FETCH_SHARE_ACTIVE';
const editque_store_actions_actionTypes_RESET_ACTIVE_INIT = 'RESET_ACTIVE_INIT';
const editque_store_actions_actionTypes_RESET_ACTIVE = 'RESET_ACTIVE';
const editque_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT = 'FETCH_NOTIFY_ACTIVE_INIT';
const editque_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE = 'FETCH_NOTIFY_ACTIVE';
const editque_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT = 'DEFAULT_NOTIFYACTIVE_INIT';
const editque_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE = 'DEFAULT_NOTIFYACTIVE';
const actions_actionTypes_FETCH_CNT_INIT = 'FETCH_CNT_INIT';
const actions_actionTypes_FETCH_CNT_FAIL = 'FETCH_CNT_FAIL';
const actions_actionTypes_FETCH_CNT = 'FETCH_CNT';
const actionTypes_FETCH_VIDEO_INIT = 'FETCH_VIDEO_INIT';
const actionTypes_FETCH_VIDEO_FAIL = 'FETCH_VIDEO_FAIL';
const actionTypes_VIDEO_FETCHED = 'VIDEO_FETCHED';
const actionTypes_FETCH_VIDEO = 'FETCH_VIDEO';
const editque_store_actions_actionTypes_FETCH_CATEG_INIT = 'FETCH_CATEG_INIT';
const editque_store_actions_actionTypes_FETCH_CATEG_START = 'FETCH_CATEG_START';
const editque_store_actions_actionTypes_FETCH_CATEG_FAIL = 'FETCH_CATEG_FAIL';
const editque_store_actions_actionTypes_FETCH_CATEG_RESET = 'FETCH_CATEG_RESET';
const actionTypes_IMAGE_EDIT = 'IMAGE_EDIT';
const actionTypes_VIDEO_EDIT = 'VIDEO_EDIT';
const editque_store_actions_actionTypes_FETCH_CATEG = 'FETCH_CATEG';
const editque_store_actions_actionTypes_ADD_CATEG_INIT = 'ADD_CATEG_INIT';
const editque_store_actions_actionTypes_ADD_CATEG = 'ADD_CATEG';
const editque_store_actions_actionTypes_HIDE_MEDIA_BOX = 'HIDE_MEDIA_BOX';
const editque_store_actions_actionTypes_SHOW_MEDIA_BOX = 'SHOW_MEDIA_BOX';
const editque_store_actions_actionTypes_CHECK_LINK_INIT = 'CHECK_LINK_INIT';
const editque_store_actions_actionTypes_CHECK_LINK = 'CHECK_LINK';
const editque_store_actions_actionTypes_RESET_LINK = 'RESET_LINK';
const editque_store_actions_actionTypes_ADD_SNAPSHOT = 'ADD_SNAPSHOT';
const editque_store_actions_actionTypes_REMOVE_SNAPSHOT = 'REMOVE_SNAPSHOT';
const editque_store_actions_actionTypes_SUBMIT_MEDIA = 'SUBMIT_MEDIA';
const editque_store_actions_actionTypes_FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const editque_store_actions_actionTypes_RESET_TAB = 'RESET_TAB';
const editque_store_actions_actionTypes_FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const editque_store_actions_actionTypes_FETCH_USERS = 'FETCH_USERS';
const editque_store_actions_actionTypes_INPUT_DEFAULT_VALUE = 'INPUT_DEFAULT_VALUE';
const editque_store_actions_actionTypes_FILTER_USER_INIT = 'FILTER_USER_INIT';
const editque_store_actions_actionTypes_FILTER_USER = 'FILTER_USER';
const editque_store_actions_actionTypes_USER_SELECT = 'USER_SELECT';
const editque_store_actions_actionTypes_REMOVE_MEDIA = 'REMOVE_MEDIA';
const actionTypes_SAVE_REMOVE_SNAP = 'SAVE_REMOVE_SNAP';
const editque_store_actions_actionTypes_SHOW_USER_SELECT_INIT = 'SHOW_USER_SELECT_INIT';
const editque_store_actions_actionTypes_SHOW_USER_SELECT = 'SHOW_USER_SELECT';
const editque_store_actions_actionTypes_SUBMIT_FORM_INIT = 'SUBMIT_FORM_INIT';
const editque_store_actions_actionTypes_SUBMIT_FORM_START = 'SUBMIT_FORM_START';
const editque_store_actions_actionTypes_SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
const editque_store_actions_actionTypes_SUBMIT_FORM_FAIL = 'SUBMIT_FORM_FAIL';
const editque_store_actions_actionTypes_SUBMIT_FORM = 'SUBMIT_FORM';
const editque_store_actions_actionTypes_FORM_SUBMITTED = 'FORM_SUBMITTED';
// CONCATENATED MODULE: ./react/editque/shared/utility.js
function editque_shared_utility_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function editque_shared_utility_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { editque_shared_utility_ownKeys(Object(source), true).forEach(function (key) { editque_shared_utility_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { editque_shared_utility_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function editque_shared_utility_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const editque_shared_utility_updateObject = (oldObject, updatedProperties) => {
  return editque_shared_utility_objectSpread({}, oldObject, {}, updatedProperties);
};
const editque_shared_utility_transformNumber = favNumber => {
  const favNumArray = String(favNumber).split("");

  if (favNumArray.length === 4) {
    return `${favNumArray[0]}K`;
  }

  if (favNumArray.length === 5) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}K`;
  }

  if (favNumArray.length === 6) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}K`;
  }

  if (favNumArray.length === 7) {
    const favNum = favNumArray[0];
    return `${favNum}M`;
  }

  if (favNumArray.length === 8) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}M`;
  }

  if (favNumArray.length === 9) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}M`;
  }

  if (favNumArray.length === 10) {
    const favNum = favNumArray[0];
    return `${favNum}B`;
  }

  if (favNumArray.length === 11) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}B`;
  }

  return favNumber;
};
const editque_shared_utility_transformString = val => {
  const curVal = String(val).substr(0, 115);
  return curVal;
};
function editque_shared_utility_changeFav(datas, dataID) {
  const dataArray = [...datas];
  let dtIndex;
  let dtArray = dataArray.filter((data, index) => {
    if (data.id === dataID) {
      dtIndex = index;
      return true;
    }

    return false;
  });

  if (dtArray.length > 0) {
    let data = dtArray[0];
    data = editque_shared_utility_updateObject(data, {
      liked: !data.liked
    });

    if (data.liked) {
      data = editque_shared_utility_updateObject(data, {
        favorite: data.favorite + 1
      });
    } else {
      data = editque_shared_utility_updateObject(data, {
        favorite: data.favorite - 1
      });
    }

    const updateDataArray = [...dataArray];
    updateDataArray[dtIndex] = data;
    let updateStartArray = [...updateDataArray];
    data = editque_shared_utility_updateObject(data, {
      changeFavActive: data.liked
    });
    updateStartArray[dtIndex] = data;
    return {
      updateStartArray,
      updateDataArray
    };
  }

  return dataArray;
}
;
const editque_shared_utility_checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};
const editque_shared_utility_getSnapshot = (url, mediaType) => {
  return new Promise((resolve, reject) => {
    let media = document.createElement(mediaType);

    function multipleEventListener(el, mediaLoadHandler) {
      'loadedmetadata loadeddata suspend'.split(' ').forEach(event => {
        el.addEventListener(event, mediaLoadHandler, false);
      });
    }

    media.onerror = function () {
      reject(media.error.message);
    };

    media.src = url;
    multipleEventListener(media, mediaLoadHandler);
    let event_fired = 0;

    function mediaLoadHandler() {
      if (++event_fired === 3) {
        media.currentTime = 1;
        media.addEventListener('seeked', function (event) {
          resolve();
        });
      }
    }
  });
};
const editque_shared_utility_getImageURL = url => {
  let image = new Image();
  image.src = url;
  let canvas = document.createElement('canvas');
  return new Promise((resolve, reject) => {
    if (canvas.getContext) {
      image.onload = function () {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0);
        let snapShot = canvas.toDataURL('image/png');
        resolve(snapShot);
      };
    } else {
      reject('Please update your Browser');
    }
  });
};
const shared_utility_dataURLtoBlob = dataurl => {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {
    type: mime
  });
};
// CONCATENATED MODULE: ./react/editque/store/reducers/auth.js


const editque_store_reducers_auth_initialState = {
  status: false,
  img: null,
  username: null
};

const editque_store_reducers_auth_checkAuth = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    status: action.status
  });
};

const editque_store_reducers_auth_checkUserImg = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    img: action.img
  });
};

const editque_store_reducers_auth_checkUserName = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    username: action.name
  });
};

const editque_store_reducers_auth_reducer = (state = editque_store_reducers_auth_initialState, action) => {
  switch (action.type) {
    case editque_store_actions_actionTypes_CHECK_AUTH:
      return editque_store_reducers_auth_checkAuth(state, action);

    case editque_store_actions_actionTypes_CHECK_USERIMG:
      return editque_store_reducers_auth_checkUserImg(state, action);

    case editque_store_actions_actionTypes_CHECK_USERNAME:
      return editque_store_reducers_auth_checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var editque_store_reducers_auth = (editque_store_reducers_auth_reducer);
// CONCATENATED MODULE: ./react/editque/store/reducers/header.js


const editque_store_reducers_header_initialState = {
  expand: false,
  hideFormSm: false,
  addNew: false,
  notify: null,
  hidNotify: false,
  navList: null,
  navListCateg: null,
  hidNavList: false,
  hidUserOption: false,
  notifyActive: null,
  default: false,
  searchCnt: null,
  filterPos: 0,
  filterLastPos: 0,
  searchCntErr: null,
  filterStart: false
};

const editque_store_reducers_header_formExpand = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const editque_store_reducers_header_formSm = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    hideFormSm: false,
    default: false
  });
};

const editque_store_reducers_header_navDefault = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    expand: false,
    hideFormSm: true,
    addNew: false,
    hidNotify: true,
    hidNavList: true,
    hidUserOption: true,
    default: true
  });
};

const editque_store_reducers_header_addNew = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    addNew: !state.addNew,
    default: false
  });
};

const editque_store_reducers_header_fetchNotify = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const editque_store_reducers_header_fetchNotifyStart = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const editque_store_reducers_header_changeFavNotifyStart = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const editque_store_reducers_header_changeFavNotify = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    notify: action.notify
  });
};

const editque_store_reducers_header_showNavList = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const editque_store_reducers_header_fetchNavListStart = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    navList: null,
    navListCateg: null
  });
};

const editque_store_reducers_header_fetchNavList = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const editque_store_reducers_header_showUserOption = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const editque_store_reducers_header_fetchNotifyActive = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    notifyActive: action.notifyActive
  });
};

const editque_store_reducers_header_defaultNotifyActive = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    notifyActive: null
  });
};

const editque_store_reducers_header_headerFilterStart = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const editque_store_reducers_header_headerFilterFail = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    searchCntErr: action.searchCntErr
  });
};

const editque_store_reducers_header_headerFilter = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    searchCnt: action.searchCnt
  });
};

const editque_store_reducers_header_headerFilterClose = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    searchCnt: null,
    filterStart: false
  });
};

const editque_store_reducers_header_reducer = (state = editque_store_reducers_header_initialState, action) => {
  switch (action.type) {
    case editque_store_actions_actionTypes_HEADER_FORM_EXPAND:
      return editque_store_reducers_header_formExpand(state, action);

    case editque_store_actions_actionTypes_HEADER_FORM_SM:
      return editque_store_reducers_header_formSm(state, action);

    case editque_store_actions_actionTypes_HEADER_NAV_DEFAULT:
      return editque_store_reducers_header_navDefault(state, action);

    case editque_store_actions_actionTypes_HEADER_ADD_NEW:
      return editque_store_reducers_header_addNew(state, action);

    case editque_store_actions_actionTypes_FETCH_NOTIFY_START:
      return editque_store_reducers_header_fetchNotifyStart(state, action);

    case editque_store_actions_actionTypes_FETCH_NOTIFY:
      return editque_store_reducers_header_fetchNotify(state, action);

    case editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START:
      return editque_store_reducers_header_changeFavNotifyStart(state, action);

    case editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY:
      return editque_store_reducers_header_changeFavNotify(state, action);

    case editque_store_actions_actionTypes_SHOW_NAV_LIST:
      return editque_store_reducers_header_showNavList(state, action);

    case editque_store_actions_actionTypes_FETCH_NAVLIST_START:
      return editque_store_reducers_header_fetchNavListStart(state, action);

    case editque_store_actions_actionTypes_FETCH_NAVLIST:
      return editque_store_reducers_header_fetchNavList(state, action);

    case editque_store_actions_actionTypes_SHOW_USER_OPTION:
      return editque_store_reducers_header_showUserOption(state, action);

    case editque_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE:
      return editque_store_reducers_header_fetchNotifyActive(state, action);

    case editque_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE:
      return editque_store_reducers_header_defaultNotifyActive(state, action);

    case editque_store_actions_actionTypes_HEADER_FILTER_START:
      return editque_store_reducers_header_headerFilterStart(state, action);

    case editque_store_actions_actionTypes_HEADER_FILTER_FAIL:
      return editque_store_reducers_header_headerFilterFail(state, action);

    case editque_store_actions_actionTypes_HEADER_FILTER_CLOSE:
      return editque_store_reducers_header_headerFilterClose(state, action);

    case editque_store_actions_actionTypes_HEADER_FILTER:
      return editque_store_reducers_header_headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var editque_store_reducers_header = (editque_store_reducers_header_reducer);
// CONCATENATED MODULE: ./react/editque/store/reducers/form.js
function reducers_form_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function reducers_form_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { reducers_form_ownKeys(Object(source), true).forEach(function (key) { reducers_form_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { reducers_form_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function reducers_form_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const editque_store_reducers_form_initialState = {
  cntErr: null,
  categ: null,
  showCateg: false,
  categErr: null,
  newCateg: null,
  hideMediaBox: false,
  hidAddItm: false,
  linkValid: null,
  snapshot: [],
  media: {},
  curTab: 'online',
  startUser: true,
  users: null,
  onlineUser: [],
  offlineUser: [],
  filteredUser: null,
  defaultValue: false,
  uploadPercent: null,
  submitError: null,
  removedSnap: [],
  submitForm: false,
  id: null,
  content: null,
  title: null,
  videoFetched: false,
  showVideo: false,
  editImage: false,
  editVideo: false,
  redirect: false
};

const store_reducers_form_fetchCnt = (state, action) => {
  if (action.cnt) {
    let snapshot = [...action.cnt.snapshot];
    let image = [...action.cnt.image];
    let video = [...action.cnt.video];
    let desc = JSON.parse(action.cnt.desc);
    desc.blocks[0].text = action.cnt.title;
    return editque_shared_utility_updateObject(state, {
      newCateg: action.cnt.category,
      content: desc,
      cntErr: null,
      snapshot,
      media: {
        image,
        video
      }
    });
  }

  return editque_shared_utility_updateObject(state, {
    redirect: true
  });
};

const store_reducers_form_fetchCntFail = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    cntErr: action.err
  });
};

const reducers_form_fetchVideo = (state, action) => {
  let media = reducers_form_objectSpread({}, state.media);

  let videos = [...action.videos];
  media.video = videos;
  return editque_shared_utility_updateObject(state, {
    media,
    videoFetched: true
  });
};

const reducers_form_fetchVideoFail = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    cntErr: action.err
  });
};

const reducers_form_videoFetched = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    showVideo: true
  });
};

const reducers_form_imageEdit = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    editImage: true
  });
};

const reducers_form_videoEdit = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    editVideo: true
  });
};

const editque_store_reducers_form_fetchCategStart = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    showCateg: true,
    categErr: null
  });
};

const editque_store_reducers_form_fetchCategFail = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    categErr: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const editque_store_reducers_form_fetchCategReset = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    categErr: null,
    showCateg: false
  });
};

const editque_store_reducers_form_fetchCateg = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    categ: action.categ,
    showCateg: action.categ !== null
  });
};

const editque_store_reducers_form_addCateg = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    newCateg: action.categ
  });
};

const editque_store_reducers_form_checkLink = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    linkValid: {
      err: action.err,
      media: action.media
    }
  });
};

const editque_store_reducers_form_resetLink = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    linkValid: null
  });
};

const editque_store_reducers_form_addSnapshot = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const editque_store_reducers_form_removeSnapshot = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    snapshot: action.snapshot
  });
};

const reducers_form_saveRemoveSnap = (state, action) => {
  let snap = [...state.removedSnap];
  snap.push(action.snapshotDet);
  return editque_shared_utility_updateObject(state, {
    removedSnap: snap
  });
};

const editque_store_reducers_form_removeMedia = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    media: action.media
  });
};

const editque_store_reducers_form_submitMedia = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    media: action.media,
    hideMediaBox: true
  });
};

const editque_store_reducers_form_hideMediaBox = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    hideMediaBox: true
  });
};

const editque_store_reducers_form_showMediaBox = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    hideMediaBox: false
  });
};

const editque_store_reducers_form_fetchUsers = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    users: action.users,
    filteredUser: null,
    startUser: false,
    defaultValue: true,
    onlineUser: action.status === 'online' ? action.users : state.onlineUser,
    offlineUser: action.status === 'offline' ? action.users : state.offlineUser,
    curTab: action.status
  });
};

const editque_store_reducers_form_fetchUsersFail = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const editque_store_reducers_form_resetTab = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    users: null,
    filteredUser: null,
    startUser: false
  });
};

const editque_store_reducers_form_inputDefaultValue = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    defaultValue: false
  });
};

const editque_store_reducers_form_filterUser = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    filteredUser: action.users
  });
};

const editque_store_reducers_form_userSelect = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    media: action.users
  });
};

const editque_store_reducers_form_showUserSelect = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    users: action.users,
    curTab: 'userSelect',
    filteredUser: null,
    defaultValue: true
  });
};

const editque_store_reducers_form_submitFormStart = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    submitForm: true,
    submitError: null,
    submitFiles: 0
  });
};

const editque_store_reducers_form_submitFormSuccess = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    uploadPercent: action.uploadPercent
  });
};

const editque_store_reducers_form_submitFormFail = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    submitError: {
      message: action.err.message,
      code: action.err.code
    }
  });
};

const editque_store_reducers_form_formSubmitted = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    id: action.id
  });
};

const editque_store_reducers_form_reducer = (state = editque_store_reducers_form_initialState, action) => {
  switch (action.type) {
    case actions_actionTypes_FETCH_CNT:
      return store_reducers_form_fetchCnt(state, action);

    case actions_actionTypes_FETCH_CNT_FAIL:
      return store_reducers_form_fetchCntFail(state, action);

    case actionTypes_FETCH_VIDEO:
      return reducers_form_fetchVideo(state, action);

    case actionTypes_FETCH_VIDEO_FAIL:
      return reducers_form_fetchVideoFail(state, action);

    case actionTypes_VIDEO_FETCHED:
      return reducers_form_videoFetched(state, action);

    case actionTypes_VIDEO_EDIT:
      return reducers_form_videoEdit(state, action);

    case actionTypes_IMAGE_EDIT:
      return reducers_form_imageEdit(state, action);

    case editque_store_actions_actionTypes_FETCH_CATEG_START:
      return editque_store_reducers_form_fetchCategStart(state, action);

    case editque_store_actions_actionTypes_FETCH_CATEG_FAIL:
      return editque_store_reducers_form_fetchCategFail(state, action);

    case editque_store_actions_actionTypes_FETCH_CATEG_RESET:
      return editque_store_reducers_form_fetchCategReset(state, action);

    case editque_store_actions_actionTypes_FETCH_CATEG:
      return editque_store_reducers_form_fetchCateg(state, action);

    case editque_store_actions_actionTypes_ADD_CATEG:
      return editque_store_reducers_form_addCateg(state, action);

    case editque_store_actions_actionTypes_HIDE_MEDIA_BOX:
      return editque_store_reducers_form_hideMediaBox(state, action);

    case editque_store_actions_actionTypes_SHOW_MEDIA_BOX:
      return editque_store_reducers_form_showMediaBox(state, action);

    case editque_store_actions_actionTypes_CHECK_LINK:
      return editque_store_reducers_form_checkLink(state, action);

    case editque_store_actions_actionTypes_RESET_LINK:
      return editque_store_reducers_form_resetLink(state, action);

    case editque_store_actions_actionTypes_ADD_SNAPSHOT:
      return editque_store_reducers_form_addSnapshot(state, action);

    case editque_store_actions_actionTypes_REMOVE_SNAPSHOT:
      return editque_store_reducers_form_removeSnapshot(state, action);

    case actionTypes_SAVE_REMOVE_SNAP:
      return reducers_form_saveRemoveSnap(state, action);

    case editque_store_actions_actionTypes_REMOVE_MEDIA:
      return editque_store_reducers_form_removeMedia(state, action);

    case editque_store_actions_actionTypes_SUBMIT_MEDIA:
      return editque_store_reducers_form_submitMedia(state, action);

    case editque_store_actions_actionTypes_FETCH_USERS:
      return editque_store_reducers_form_fetchUsers(state, action);

    case editque_store_actions_actionTypes_FETCH_USERS_FAIL:
      return editque_store_reducers_form_fetchUsersFail(state, action);

    case editque_store_actions_actionTypes_RESET_TAB:
      return editque_store_reducers_form_resetTab(state, action);

    case editque_store_actions_actionTypes_INPUT_DEFAULT_VALUE:
      return editque_store_reducers_form_inputDefaultValue(state, action);

    case editque_store_actions_actionTypes_FILTER_USER:
      return editque_store_reducers_form_filterUser(state, action);

    case editque_store_actions_actionTypes_USER_SELECT:
      return editque_store_reducers_form_userSelect(state, action);

    case editque_store_actions_actionTypes_SHOW_USER_SELECT:
      return editque_store_reducers_form_showUserSelect(state, action);

    case editque_store_actions_actionTypes_SUBMIT_FORM_START:
      return editque_store_reducers_form_submitFormStart(state, action);

    case editque_store_actions_actionTypes_SUBMIT_FORM_SUCCESS:
      return editque_store_reducers_form_submitFormSuccess(state, action);

    case editque_store_actions_actionTypes_SUBMIT_FORM_FAIL:
      return editque_store_reducers_form_submitFormFail(state, action);

    case editque_store_actions_actionTypes_FORM_SUBMITTED:
      return editque_store_reducers_form_formSubmitted(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var editque_store_reducers_form = (editque_store_reducers_form_reducer);
// CONCATENATED MODULE: ./react/editque/store/reducers/main.js
function editque_store_reducers_main_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function editque_store_reducers_main_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { editque_store_reducers_main_ownKeys(Object(source), true).forEach(function (key) { editque_store_reducers_main_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { editque_store_reducers_main_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function editque_store_reducers_main_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const editque_store_reducers_main_initialState = {
  shareActive: null
};

const editque_store_reducers_main_fetchShareActive = (state, action) => {
  return editque_shared_utility_updateObject(state, {
    shareActive: action.shareActive
  });
};

const editque_store_reducers_main_resetActive = (state, action) => {
  let reset = action.curTab === 'post' ? {
    ptActive: null
  } : {
    shareActive: null
  };
  return editque_shared_utility_updateObject(state, editque_store_reducers_main_objectSpread({}, reset));
};

const editque_store_reducers_main_reducer = (state = editque_store_reducers_main_initialState, action) => {
  switch (action.type) {
    case editque_store_actions_actionTypes_FETCH_SHARE_ACTIVE:
      return editque_store_reducers_main_fetchShareActive(state, action);

    case editque_store_actions_actionTypes_RESET_ACTIVE:
      return editque_store_reducers_main_resetActive(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var editque_store_reducers_main = (editque_store_reducers_main_reducer);
// CONCATENATED MODULE: ./react/editque/store/actions/auth.js

const editque_store_actions_auth_checkAuthInit = () => {
  return {
    type: editque_store_actions_actionTypes_CHECK_AUTH_INIT
  };
};
const editque_store_actions_auth_checkAuth = status => {
  return {
    type: editque_store_actions_actionTypes_CHECK_AUTH,
    status
  };
};
const editque_store_actions_auth_checkUserImg = img => {
  return {
    type: editque_store_actions_actionTypes_CHECK_USERIMG,
    img
  };
};
const editque_store_actions_auth_checkUserName = name => {
  return {
    type: editque_store_actions_actionTypes_CHECK_USERNAME,
    name
  };
};
// CONCATENATED MODULE: ./react/editque/store/actions/header.js

const editque_store_actions_header_headerFormExpand = () => {
  return {
    type: editque_store_actions_actionTypes_HEADER_FORM_EXPAND
  };
};
const editque_store_actions_header_headerFormSm = () => {
  return {
    type: editque_store_actions_actionTypes_HEADER_FORM_SM
  };
};
const editque_store_actions_header_headerNavDefault = () => {
  return {
    type: editque_store_actions_actionTypes_HEADER_NAV_DEFAULT
  };
};
const editque_store_actions_header_headerAddNew = () => {
  return {
    type: editque_store_actions_actionTypes_HEADER_ADD_NEW
  };
};
const editque_store_actions_header_fetchNotifyInit = () => {
  return {
    type: editque_store_actions_actionTypes_FETCH_NOTIFY_INIT
  };
};
const editque_store_actions_header_fetchNotifyStart = () => {
  return {
    type: editque_store_actions_actionTypes_FETCH_NOTIFY_START
  };
};
const editque_store_actions_header_fetchNotifySuccess = () => {
  return {
    type: editque_store_actions_actionTypes_FETCH_NOTIFY_SUCCESS
  };
};
const editque_store_actions_header_fetchNotifyFail = err => {
  return {
    type: editque_store_actions_actionTypes_FETCH_NOTIFY_FAIL,
    err
  };
};
const editque_store_actions_header_fetchNotify = notify => {
  return {
    type: editque_store_actions_actionTypes_FETCH_NOTIFY,
    notify
  };
};
const editque_store_actions_header_changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT,
    notify,
    notifyID
  };
};
const editque_store_actions_header_changeFavNotifyStart = notify => {
  return {
    type: editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_START,
    notify
  };
};
const editque_store_actions_header_changeFavNotifyFail = notify => {
  return {
    type: editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_FAIL,
    notify
  };
};
const editque_store_actions_header_changeFavNotify = notify => {
  return {
    type: editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY,
    notify
  };
};
const editque_store_actions_header_showNavList = () => {
  return {
    type: editque_store_actions_actionTypes_SHOW_NAV_LIST
  };
};
const editque_store_actions_header_fetchNavlistInit = category => {
  return {
    type: editque_store_actions_actionTypes_FETCH_NAVLIST_INIT,
    category
  };
};
const editque_store_actions_header_fetchNavlistStart = () => {
  return {
    type: editque_store_actions_actionTypes_FETCH_NAVLIST_START
  };
};
const editque_store_actions_header_fetchNavlist = (category, navList) => {
  return {
    type: editque_store_actions_actionTypes_FETCH_NAVLIST,
    category,
    navList
  };
};
const editque_store_actions_header_showUserOption = () => {
  return {
    type: editque_store_actions_actionTypes_SHOW_USER_OPTION
  };
};
const editque_store_actions_header_fetchNotifyactiveInit = userID => {
  return {
    type: editque_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT,
    userID
  };
};
const editque_store_actions_header_fetchNotifyActive = notifyActive => {
  return {
    type: editque_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE,
    notifyActive
  };
};
const editque_store_actions_header_defaultNotifyactiveInit = () => {
  return {
    type: editque_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT
  };
};
const editque_store_actions_header_defaultNotifyActive = () => {
  return {
    type: editque_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE
  };
};
const editque_store_actions_header_headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: editque_store_actions_actionTypes_HEADER_FILTER_INIT,
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const editque_store_actions_header_headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: editque_store_actions_actionTypes_HEADER_FILTER_START,
    filterPos,
    filterLastPos
  };
};
const editque_store_actions_header_headerFilterFail = searchCntErr => {
  return {
    type: editque_store_actions_actionTypes_HEADER_FILTER_FAIL,
    searchCntErr
  };
};
const editque_store_actions_header_headerFilter = searchCnt => {
  return {
    type: editque_store_actions_actionTypes_HEADER_FILTER,
    searchCnt
  };
};
const editque_store_actions_header_headerFilterClose = () => {
  return {
    type: editque_store_actions_actionTypes_HEADER_FILTER_CLOSE
  };
};
// CONCATENATED MODULE: ./react/editque/store/actions/main.js

const editque_store_actions_main_fetchShareactiveInit = userID => {
  return {
    type: editque_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT,
    userID
  };
};
const editque_store_actions_main_fetchShareActive = shareActive => {
  return {
    type: editque_store_actions_actionTypes_FETCH_SHARE_ACTIVE,
    shareActive
  };
};
const editque_store_actions_main_resetActiveInit = (userID, curTab) => {
  return {
    type: editque_store_actions_actionTypes_RESET_ACTIVE_INIT,
    userID,
    curTab
  };
};
const editque_store_actions_main_resetActive = curTab => {
  return {
    type: editque_store_actions_actionTypes_RESET_ACTIVE,
    curTab
  };
};
// CONCATENATED MODULE: ./react/editque/store/actions/form.js

const actions_form_fetchCntInit = id => {
  return {
    type: actions_actionTypes_FETCH_CNT_INIT,
    id
  };
};
const store_actions_form_fetchCntFail = err => {
  return {
    type: actions_actionTypes_FETCH_CNT_FAIL,
    err
  };
};
const editque_store_actions_form_fetchCnt = cnt => {
  return {
    type: actions_actionTypes_FETCH_CNT,
    cnt
  };
};
const form_fetchVideoInit = videosID => {
  return {
    type: actionTypes_FETCH_VIDEO_INIT,
    videosID
  };
};
const actions_form_fetchVideoFail = err => {
  return {
    type: actionTypes_FETCH_VIDEO_FAIL,
    err
  };
};
const store_actions_form_fetchVideo = videos => {
  return {
    type: actionTypes_FETCH_VIDEO,
    videos
  };
};
const actions_form_videoFetched = () => {
  return {
    type: actionTypes_VIDEO_FETCHED
  };
};
const actions_form_imageEdit = () => {
  return {
    type: actionTypes_IMAGE_EDIT
  };
};
const actions_form_videoEdit = () => {
  return {
    type: actionTypes_VIDEO_EDIT
  };
};
const editque_store_actions_form_fetchCategInit = () => {
  return {
    type: editque_store_actions_actionTypes_FETCH_CATEG_INIT
  };
};
const editque_store_actions_form_fetchCategStart = () => {
  return {
    type: editque_store_actions_actionTypes_FETCH_CATEG_START
  };
};
const editque_store_actions_form_fetchCategFail = err => {
  return {
    type: editque_store_actions_actionTypes_FETCH_CATEG_FAIL,
    err
  };
};
const editque_store_actions_form_fetchCategReset = () => {
  return {
    type: editque_store_actions_actionTypes_FETCH_CATEG_RESET
  };
};
const editque_store_actions_form_fetchCateg = categ => {
  return {
    type: editque_store_actions_actionTypes_FETCH_CATEG,
    categ
  };
};
const editque_store_actions_form_addCategInit = categ => {
  return {
    type: editque_store_actions_actionTypes_ADD_CATEG_INIT,
    categ
  };
};
const editque_store_actions_form_addCateg = categ => {
  return {
    type: editque_store_actions_actionTypes_ADD_CATEG,
    categ
  };
};
const editque_store_actions_form_checkLinkInit = (link, mediaType) => {
  return {
    type: editque_store_actions_actionTypes_CHECK_LINK_INIT,
    link,
    mediaType
  };
};
const editque_store_actions_form_checkLink = (err, media) => {
  return {
    type: editque_store_actions_actionTypes_CHECK_LINK,
    err,
    media
  };
};
const editque_store_actions_form_resetLink = () => {
  return {
    type: editque_store_actions_actionTypes_RESET_LINK
  };
};
const editque_store_actions_form_addSnapshot = snapshot => {
  return {
    type: editque_store_actions_actionTypes_ADD_SNAPSHOT,
    snapshot
  };
};
const editque_store_actions_form_removeSnapshot = snapshot => {
  return {
    type: editque_store_actions_actionTypes_REMOVE_SNAPSHOT,
    snapshot
  };
};
const actions_form_saveRemoveSnap = snapshotDet => {
  return {
    type: actionTypes_SAVE_REMOVE_SNAP,
    snapshotDet
  };
};
const editque_store_actions_form_removeMedia = media => {
  return {
    type: editque_store_actions_actionTypes_REMOVE_MEDIA,
    media
  };
};
const editque_store_actions_form_submitMedia = media => {
  return {
    type: editque_store_actions_actionTypes_SUBMIT_MEDIA,
    media
  };
};
const editque_store_actions_form_hideMediaBox = () => {
  return {
    type: editque_store_actions_actionTypes_HIDE_MEDIA_BOX
  };
};
const editque_store_actions_form_showMediaBox = () => {
  return {
    type: editque_store_actions_actionTypes_SHOW_MEDIA_BOX
  };
};
const editque_store_actions_form_fetchUsersInit = userStatus => {
  return {
    type: editque_store_actions_actionTypes_FETCH_USERS_INIT,
    userStatus
  };
};
const editque_store_actions_form_fetchUsers = (users, status) => {
  return {
    type: editque_store_actions_actionTypes_FETCH_USERS,
    users,
    status
  };
};
const editque_store_actions_form_fetchUsersFail = err => {
  return {
    type: editque_store_actions_actionTypes_FETCH_USERS_FAIL,
    err
  };
};
const editque_store_actions_form_resetTab = () => {
  return {
    type: editque_store_actions_actionTypes_RESET_TAB
  };
};
const editque_store_actions_form_inputDefaultValue = () => {
  return {
    type: editque_store_actions_actionTypes_INPUT_DEFAULT_VALUE
  };
};
const editque_store_actions_form_filterUserInit = (users, filterContent) => {
  return {
    type: editque_store_actions_actionTypes_FILTER_USER_INIT,
    users,
    filterContent
  };
};
const editque_store_actions_form_filterUser = users => {
  return {
    type: editque_store_actions_actionTypes_FILTER_USER,
    users
  };
};
const editque_store_actions_form_userSelect = users => {
  return {
    type: editque_store_actions_actionTypes_USER_SELECT,
    users
  };
};
const editque_store_actions_form_showUserSelectInit = (users, userID) => {
  return {
    type: editque_store_actions_actionTypes_SHOW_USER_SELECT_INIT,
    users,
    userID
  };
};
const editque_store_actions_form_showUserSelect = users => {
  return {
    type: editque_store_actions_actionTypes_SHOW_USER_SELECT,
    users
  };
};
const editque_store_actions_form_submitFormInit = formData => {
  return {
    type: editque_store_actions_actionTypes_SUBMIT_FORM_INIT,
    formData
  };
};
const editque_store_actions_form_submitFormFail = err => {
  return {
    type: editque_store_actions_actionTypes_SUBMIT_FORM_FAIL,
    err
  };
};
const editque_store_actions_form_submitFormSuccess = uploadPercent => {
  return {
    type: editque_store_actions_actionTypes_SUBMIT_FORM_SUCCESS,
    uploadPercent
  };
};
const editque_store_actions_form_submitFormStart = () => {
  return {
    type: editque_store_actions_actionTypes_SUBMIT_FORM_START
  };
};
const editque_store_actions_form_submitForm = () => {
  return {
    type: editque_store_actions_actionTypes_SUBMIT_FORM
  };
};
const editque_store_actions_form_formSubmitted = id => {
  return {
    type: editque_store_actions_actionTypes_FORM_SUBMITTED,
    id
  };
};
// CONCATENATED MODULE: ./react/editque/axios.js


const editque_axios_instance = external_axios_default.a.create({
  baseURL: global_default.a.url
});
editque_axios_instance.defaults.headers.common['authorization'] = 'authorization';
editque_axios_instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* harmony default export */ var editque_axios = (editque_axios_instance);
// CONCATENATED MODULE: ./react/editque/store/thunk/submit.js


const editque_store_thunk_submit_submit = formData => {
  return dispatch => {
    dispatch(editque_store_actions_form_submitFormStart());
    let formContent = new FormData();

    for (let key in formData) {
      if (key !== 'video' && key !== 'image' && key !== 'removedSnap' && key !== 'snapshot') {
        formContent.append(key, formData[key]);
      }

      if (key === 'video') {
        for (let video of formData[key]) {
          let ext = video.file.type.split('/').pop();
          formContent.append(key, video.file, `${video.id}.${ext}`);
        }
      }

      if (key === 'image') {
        let send = 0;
        let uploaded = [];

        for (let image of formData[key]) {
          if (image.mediaType) {
            uploaded.push({
              id: image.id,
              filename: image.filename,
              type: image.type
            });
            ++send;

            if (send === formData[key].length) {
              formContent.append('uploadedimage', JSON.stringify(uploaded));
            }
          } else {
            let ext = image.file.type.split('/').pop();
            formContent.append(key, image.file, `${image.id}.${ext}`);
            ++send;

            if (send === formData[key].length) {
              formContent.append('uploadedimage', JSON.stringify(uploaded));
            }
          }
        }
      }

      if (key === 'snapshot') {
        let uploadedSnap = [];
        let uploadedVideo = [];

        for (let media of formData[key]) {
          uploadedSnap.push({
            id: media.id,
            videoID: media.videoID,
            videoCnt: media.videoCnt
          });
          uploadedVideo.push({
            id: media.video.id,
            snapshotID: media.video.snapshotID,
            type: media.video.type
          });
        }

        formContent.append('uploadedvideo', JSON.stringify(uploadedVideo));
        formContent.append('uploadedsnap', JSON.stringify(uploadedSnap));
      }

      if (key === 'removedSnap' && formData[key].length > 0) {
        formContent.append('removedmedia', JSON.stringify(formData[key]));
      }
    }

    editque_axios.post('/edit/question', formContent, {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.lengthComputable) {
          const percentage = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          dispatch(editque_store_actions_form_submitFormSuccess(percentage));
        }
      }
    }).then(res => {
      dispatch(editque_store_actions_form_formSubmitted(res.data));
    }).catch(err => {
      dispatch(editque_store_actions_form_submitFormFail(err));
    });
  };
};
// CONCATENATED MODULE: ./react/editque/store/actions/index.js





// CONCATENATED MODULE: ./react/editque/store/sagas/auth.js



function* editque_store_sagas_auth_checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(effects_["put"])(editque_store_actions_auth_checkAuth(true));

    try {
      let response = yield editque_axios.post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(effects_["put"])(editque_store_actions_auth_checkUserImg(response.data.url));
      } else {
        yield Object(effects_["put"])(editque_store_actions_auth_checkUserName(response.data.name));
      }
    } catch (err) {}
  }
}
// CONCATENATED MODULE: ./react/editque/store/sagas/header.js




function* editque_store_sagas_header_fetchNotifyInitSaga(action) {
  try {
    yield Object(effects_["put"])(editque_store_actions_header_fetchNotifyStart());
    let response = yield editque_axios.post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(editque_store_actions_header_fetchNotify(response.data.coll));
    } else {
      yield Object(effects_["put"])(editque_store_actions_header_fetchNotify([]));
    }
  } catch (err) {
    yield Object(effects_["put"])(editque_store_actions_header_fetchNotifyFail(err));
  }
}
function* editque_store_sagas_header_changeFavNotifySaga(action) {
  let notify = editque_shared_utility_changeFav(action.notify, action.notifyID);
  yield Object(effects_["put"])(editque_store_actions_header_changeFavNotifyStart(notify.updateStartArray));
  yield Object(effects_["put"])(editque_store_actions_header_changeFavNotify(notify.updateDataArray));
}
function* editque_store_sagas_header_fetchNavlistInitSaga(action) {
  try {
    yield Object(effects_["put"])(editque_store_actions_header_fetchNavlistStart());
    let response = yield editque_axios.post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(effects_["put"])(editque_store_actions_header_fetchNavlist(action.category, response.data));
  } catch (e) {}
}
function* editque_store_sagas_header_fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield editque_axios.post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(editque_store_actions_header_fetchNotifyActive(response.data.collTotal));
    }

    ;
  } catch (err) {}
}
function* editque_store_sagas_header_defaultNotifyActiveInitSaga(action) {
  try {
    yield editque_axios.post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(effects_["put"])(editque_store_actions_header_defaultNotifyActive());
  } catch (err) {}
}
function* editque_store_sagas_header_headerFilterInitSaga(action) {
  try {
    yield Object(effects_["put"])(editque_store_actions_header_headerFilterStart(action.filterPos, action.filterLastPos));
    let response = yield editque_axios.post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(effects_["put"])(editque_store_actions_header_headerFilter(response.data));
  } catch (err) {
    yield Object(effects_["put"])(editque_store_actions_header_headerFilterFail(err));
  }
}
// CONCATENATED MODULE: ./react/editque/store/sagas/main.js



function* editque_store_sagas_main_fetchShareActiveInitSaga(action) {
  try {
    let response = yield editque_axios.post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });

    if (response.data > 0) {
      yield Object(effects_["put"])(editque_store_actions_main_fetchShareActive(response.data));
    }

    return;
  } catch (err) {}
}
function* editque_store_sagas_main_resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'share') {
      yield editque_axios.patch('/header', {
        userID: action.userID
      }, {
        headers: {
          'data-categ': action.curTab
        }
      });
    }

    yield Object(effects_["put"])(editque_store_actions_main_resetActive(action.curTab));
  } catch (err) {}
}
// CONCATENATED MODULE: ./react/editque/store/sagas/form.js
function store_sagas_form_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function store_sagas_form_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { store_sagas_form_ownKeys(Object(source), true).forEach(function (key) { store_sagas_form_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { store_sagas_form_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function store_sagas_form_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function* store_sagas_form_fetchCntInitSaga(action) {
  try {
    const response = yield editque_axios.post('/header', {
      id: action.id,
      model: 'question'
    }, {
      headers: {
        'data-categ': `editform`
      }
    });

    if (response.data && (response.data.image.length > 0 || response.data.snapshot.length > 0)) {
      let images = [];
      let snaps = [];

      for (let image of response.data.image) {
        images.push(store_sagas_form_objectSpread({
          url: `${global_default.a.url}/media/image/${image.id}`
        }, image, {
          mediaType: 'image'
        }));
      }

      for (let snap of response.data.snapshot) {
        let video = response.data.video.filter(videoDet => videoDet.snapshotID === snap.videoID);
        snaps.push(store_sagas_form_objectSpread({
          url: `${global_default.a.url}/media/image/${snap.id}`
        }, snap, {
          mediaType: 'snapshot',
          video: video[0]
        }));
      }

      response.data.image = images;
      response.data.snapshot = snaps;
      response.data.video = [];
    }

    yield Object(effects_["put"])(editque_store_actions_form_fetchCnt(response.data));
  } catch (err) {
    yield Object(effects_["put"])(store_actions_form_fetchCntFail(err));
  }
}
function* form_fetchVideoInitSaga(action) {
  try {
    let videos = [];
    let video = 0;

    if (action.videosID.length < 1) {
      yield Object(effects_["put"])(store_actions_form_fetchVideo([]));
      return;
    }

    for (let vid of action.videosID) {
      let media = yield editque_axios.post('/media', {
        mediaID: vid.id
      }, {
        headers: {
          'data-categ': 'media'
        }
      });
      let vidData = shared_utility_dataURLtoBlob(media.data);
      let url = window.URL.createObjectURL(vidData);
      ++video;
      videos.push({
        file: vidData,
        url,
        id: vid.snapshotID
      });

      if (video === action.videosID.length) {
        yield Object(effects_["put"])(store_actions_form_fetchVideo(videos));
      }
    }
  } catch (err) {
    yield Object(effects_["put"])(actions_form_fetchVideoFail(err));
  }
}
function* editque_store_sagas_form_fetchCategInitSaga(action) {
  try {
    yield Object(effects_["put"])(editque_store_actions_form_fetchCategStart());
    const category = yield editque_axios.post('/question', null, {
      headers: {
        'data-categ': 'category'
      }
    });
    const categ = category.data && category.data.length > 0 ? category.data : null;
    yield Object(effects_["put"])(editque_store_actions_form_fetchCateg(categ));
  } catch (err) {
    yield Object(effects_["put"])(editque_store_actions_form_fetchCategFail(err));
    yield Object(effects_["delay"])(2000);
    yield Object(effects_["put"])(editque_store_actions_form_fetchCategReset());
  }
}
function* editque_store_sagas_form_addCategInitSaga(action) {
  let categs = String(action.categ).split(',');
  let transformCateg = [];

  for (let categ of categs) {
    transformCateg.push(String(categ).trim().charAt(0).toUpperCase() + String(categ).trim().toLowerCase().slice(1));
  }

  let removeDuplicate = [...new Set(transformCateg)];
  yield Object(effects_["put"])(editque_store_actions_form_addCateg(removeDuplicate));
}
function* editque_store_sagas_form_checkLinkInitSaga(action) {
  let link = String(action.link).trim();

  try {
    let response = yield external_axios_default.a.get(link, {
      responseType: 'blob',
      timeout: 8000
    });

    if (response.data.type.startsWith(action.mediaType + '/')) {
      yield Object(effects_["put"])(editque_store_actions_form_checkLink(null, {
        file: response.data,
        url: window.URL.createObjectURL(response.data)
      }));
      return;
    }

    throw new Error(`Unknown format, Only ${action.mediaType} files`);
  } catch (err) {
    yield Object(effects_["put"])(editque_store_actions_form_checkLink(err, null));
  }
}
function* editque_store_sagas_form_fetchUsersInitSaga(action) {
  try {
    let response = yield editque_axios.post('/users', null, {
      headers: {
        'data-categ': `allteacher-${action.userStatus}`
      }
    });
    yield Object(effects_["put"])(editque_store_actions_form_fetchUsers(response.data, action.userStatus));
  } catch (err) {
    yield Object(effects_["put"])(editque_store_actions_form_fetchUsersFail(err));
  }
}
function* editque_store_sagas_form_filterUserInitSaga(action) {
  let filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);

  if (!action.filterContent && action.users && action.users.length > 0) {
    filterUser = [...action.users];
  }

  yield Object(effects_["put"])(editque_store_actions_form_filterUser(filterUser));
}
function* editque_store_sagas_form_showUserSelectInitSaga(action) {
  let filterUser = action.users.filter(user => action.userID.indexOf(user.id) !== -1);
  yield Object(effects_["put"])(editque_store_actions_form_showUserSelect(filterUser));
}
// CONCATENATED MODULE: ./react/editque/store/sagas/index.js






function* editque_store_sagas_watchAuth() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(editque_store_actions_actionTypes_CHECK_AUTH_INIT, editque_store_sagas_auth_checkAuthInitSaga)]);
}
function* editque_store_sagas_watchHeader() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(editque_store_actions_actionTypes_FETCH_NOTIFY_INIT, editque_store_sagas_header_fetchNotifyInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_CHANGE_FAVORITE_NOTIFY_INIT, editque_store_sagas_header_changeFavNotifySaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_FETCH_NAVLIST_INIT, editque_store_sagas_header_fetchNavlistInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_FETCH_NOTIFY_ACTIVE_INIT, editque_store_sagas_header_fetchNotifyActiveInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_DEFAULT_NOTIFYACTIVE_INIT, editque_store_sagas_header_defaultNotifyActiveInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT, editque_store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_HEADER_FILTER_INIT, editque_store_sagas_header_headerFilterInitSaga)]);
}
function* editque_store_sagas_watchForm() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actions_actionTypes_FETCH_CNT_INIT, store_sagas_form_fetchCntInitSaga), Object(effects_["takeEvery"])(actionTypes_FETCH_VIDEO_INIT, form_fetchVideoInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_FETCH_CATEG_INIT, editque_store_sagas_form_fetchCategInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_ADD_CATEG_INIT, editque_store_sagas_form_addCategInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_CHECK_LINK_INIT, editque_store_sagas_form_checkLinkInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_FETCH_USERS_INIT, editque_store_sagas_form_fetchUsersInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_FILTER_USER_INIT, editque_store_sagas_form_filterUserInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_SHOW_USER_SELECT_INIT, editque_store_sagas_form_showUserSelectInitSaga)]);
}
function* editque_store_sagas_watchMain() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(editque_store_actions_actionTypes_FETCH_SHARE_ACTIVE_INIT, editque_store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(editque_store_actions_actionTypes_RESET_ACTIVE_INIT, editque_store_sagas_main_resetActiveInitSaga)]);
}
function* editque_store_sagas_rootSaga() {
  yield Object(effects_["all"])([editque_store_sagas_watchAuth(), editque_store_sagas_watchHeader(), editque_store_sagas_watchForm(), editque_store_sagas_watchMain()]);
}
// CONCATENATED MODULE: ./react/editque/store.js









const editque_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function editque_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: editque_store_reducers_auth,
    header: editque_store_reducers_header,
    main: editque_store_reducers_main,
    form: editque_store_reducers_form
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, editque_store_bindMiddleware([external_redux_thunk_default.a, sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(editque_store_sagas_rootSaga);
  return store;
}

/* harmony default export */ var editque_store = (editque_store_configureStore);
// EXTERNAL MODULE: ./react/view/store/actions/actionTypes.js
var view_store_actions_actionTypes = __webpack_require__("eVAK");

// EXTERNAL MODULE: ./react/view/shared/utility.js
var view_shared_utility = __webpack_require__("F5Z+");

// CONCATENATED MODULE: ./react/view/store/reducers/auth.js


const view_store_reducers_auth_initialState = {
  status: false,
  img: null,
  username: null
};

const view_store_reducers_auth_checkAuth = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    status: action.status
  });
};

const view_store_reducers_auth_checkUserImg = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    img: action.img
  });
};

const view_store_reducers_auth_checkUserName = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    username: action.name
  });
};

const view_store_reducers_auth_reducer = (state = view_store_reducers_auth_initialState, action) => {
  switch (action.type) {
    case view_store_actions_actionTypes["x" /* CHECK_AUTH */]:
      return view_store_reducers_auth_checkAuth(state, action);

    case view_store_actions_actionTypes["z" /* CHECK_USERIMG */]:
      return view_store_reducers_auth_checkUserImg(state, action);

    case view_store_actions_actionTypes["A" /* CHECK_USERNAME */]:
      return view_store_reducers_auth_checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var view_store_reducers_auth = (view_store_reducers_auth_reducer);
// CONCATENATED MODULE: ./react/view/store/reducers/model.js
function model_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function model_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { model_ownKeys(Object(source), true).forEach(function (key) { model_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { model_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function model_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const reducers_model_initialState = {
  cnts: null,
  cntErr: null,
  skipCnt: null,
  showLoader: false,
  changedFav: [],
  favChange: null,
  postVideo: {
    id: null
  },
  videoErr: null,
  filterDet: null,
  changeCnt: false,
  changeCntErr: null,
  changeCntStart: null,
  comments: [],
  submitStart: false,
  resetInput: false,
  commentID: null,
  commentTotal: 0
};

const model_fetchCnt = (state, action) => {
  let comments = [...state.comments];
  comments.push(...action.cnt.commentcnt);
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    cnts: action.cnt,
    comments,
    commentTotal: action.cnt.comment
  });
};

const model_fetchCntReset = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    cnts: null,
    comments: []
  });
};

const model_fetchCntStart = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    showLoader: true
  });
};

const model_fetchPostFail = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    cntErr: action.err,
    showLoader: false
  });
};

const submitComment = (state, action) => {
  let comments = [...state.comments];

  if (action.categ === 'reply') {
    let indexPos;
    let commentReply = comments.filter((comment, index) => {
      if (comment._id === action.id) {
        indexPos = index;
        return true;
      }

      return false;
    });

    let comment = model_objectSpread({}, commentReply[0]);

    if (comment.reply) {
      comment.reply.push(model_objectSpread({}, action.cnt));
    } else {
      comment['reply'] = [model_objectSpread({}, action.cnt)];
    }

    comments[indexPos] = comment;
    return Object(view_shared_utility["f" /* updateObject */])(state, {
      comments,
      submitStart: false,
      resetInput: true,
      commentTotal: state.commentTotal += 1
    });
  }

  comments.push(action.cnt);
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    comments,
    submitStart: false,
    resetInput: true,
    commentTotal: state.commentTotal += 1
  });
};

const submitCommentFail = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    cntErr: action.err,
    submitStart: false
  });
};

const submitCommentStart = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    submitStart: true
  });
};

const resetInput = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    resetInput: false,
    commentID: null
  });
};

const model_resetModel = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    cntErr: null,
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const ansCorrect = (state, action) => {
  let comments = [...state.comments];
  let indexPos;
  let comment = comments.filter((comment, index) => {
    if (comment._id === action.commentID) {
      indexPos = index;
      return true;
    }

    return false;
  });

  if (action.categ === 'smilereply') {
    let replyPos;
    let reply = comment[0].reply.filter((replyRes, index) => {
      if (replyRes._id === action.replyID) {
        replyPos = index;
        return true;
      }

      return false;
    });
    reply[0].smiled = reply[0].smile ? reply[0].smiled - 1 : reply[0].smiled + 1;
    reply[0].smile = !reply[0].smile;
    comment[0].reply[replyPos] = reply[0];
    comments[indexPos] = comment[0];
    return Object(view_shared_utility["f" /* updateObject */])(state, {
      comments
    });
  }

  if (action.categ === 'reply') {
    let replyPos;
    let reply = comment[0].reply.filter((replyRes, index) => {
      if (replyRes._id === action.replyID) {
        replyPos = index;
        return true;
      }

      return false;
    });
    reply[0].liked = reply[0].like ? reply[0].liked : reply[0].liked + 1;
    reply[0].disliked = reply[0].dislike ? reply[0].disliked - 1 : reply[0].disliked;
    reply[0].like = true;
    reply[0].dislike = false;
    comment[0].reply[replyPos] = reply[0];
    comments[indexPos] = comment[0];
    return Object(view_shared_utility["f" /* updateObject */])(state, {
      comments
    });
  }

  if (action.categ === 'smile') {
    comment[0].smiled = comment[0].smile ? comment[0].smiled - 1 : comment[0].smiled + 1;
    comment[0].smile = !comment[0].smile;
    comments[indexPos] = comment[0];
    return Object(view_shared_utility["f" /* updateObject */])(state, {
      comments
    });
  }

  comment[0].liked = comment[0].like ? comment[0].liked : comment[0].liked + 1;
  comment[0].disliked = comment[0].dislike ? comment[0].disliked - 1 : comment[0].disliked;
  comment[0].like = true;
  comment[0].dislike = false;
  comments[indexPos] = comment[0];
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    comments
  });
};

const ansWrong = (state, action) => {
  let comments = [...state.comments];
  let indexPos;
  let comment = comments.filter((comment, index) => {
    if (comment._id === action.commentID) {
      indexPos = index;
      return true;
    }

    return false;
  });

  if (action.categ === 'reply') {
    let replyPos;
    let reply = comment[0].reply.filter((replyRes, index) => {
      if (replyRes._id === action.replyID) {
        replyPos = index;
        return true;
      }

      return false;
    });
    reply[0].disliked = reply[0].dislike ? reply[0].disliked : reply[0].disliked + 1;
    reply[0].liked = reply[0].like ? reply[0].liked - 1 : reply[0].liked;
    reply[0].dislike = true;
    reply[0].like = false;
    comment[0].reply[replyPos] = reply[0];
    comments[indexPos] = comment[0];
    return Object(view_shared_utility["f" /* updateObject */])(state, {
      comments
    });
  }

  comment[0].disliked = comment[0].dislike ? comment[0].disliked : comment[0].disliked + 1;
  comment[0].liked = comment[0].like ? comment[0].liked - 1 : comment[0].liked;
  comment[0].dislike = true;
  comment[0].like = false;
  comments[indexPos] = comment[0];
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    comments
  });
};

const model_changeCntStart = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    changeCntStart: {
      title: action.title,
      id: action.id,
      det: action.det,
      modelType: action.modelType
    },
    changeCntErr: null
  });
};

const model_changeCntCancel = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const model_changeCntReset = (state, action) => {
  let cnts = model_objectSpread({}, state.cnts);

  if ((state.changeCntStart.det === 'publish' || state.changeCntStart.det === 'draft') && state.changeCntStart.det !== 'delete') {
    cnts.mode = state.changeCntStart.det;
    return Object(view_shared_utility["f" /* updateObject */])(state, {
      cnts: action.changed ? cnts : state.cnts,
      changeCntStart: null,
      changeCntErr: null,
      changeCnt: false
    });
  }

  return Object(view_shared_utility["f" /* updateObject */])(state, {
    cnts,
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const model_changeCntFail = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    changeCntErr: action.err
  });
};

const model_changeCnt = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    changeCnt: true
  });
};

const model_fetchVideo = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    postVideo: {
      id: action.id,
      url: action.url
    }
  });
};

const model_changeFavPtStart = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    favChange: {
      id: action.id,
      isLiked: action.isLiked
    }
  });
};

const model_changeFavPtFail = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    favChange: null
  });
};

const model_changeFav = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    changedFav: action.changedFav,
    favChange: null
  });
};

const model_filterPost = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    filterDet: action.filterDet
  });
};

const setCommentID = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    commentID: {
      id: action.commentID,
      categ: action.categ
    }
  });
};

const reducers_model_reducer = (state = reducers_model_initialState, action) => {
  switch (action.type) {
    case view_store_actions_actionTypes["J" /* FETCH_CNT */]:
      return model_fetchCnt(state, action);

    case view_store_actions_actionTypes["N" /* FETCH_CNT_START */]:
      return model_fetchCntStart(state, action);

    case view_store_actions_actionTypes["M" /* FETCH_CNT_RESET */]:
      return model_fetchCntReset(state, action);

    case view_store_actions_actionTypes["K" /* FETCH_CNT_FAIL */]:
      return model_fetchPostFail(state, action);

    case view_store_actions_actionTypes["Yb" /* SUBMIT_COMMENT */]:
      return submitComment(state, action);

    case view_store_actions_actionTypes["ac" /* SUBMIT_COMMENT_START */]:
      return submitCommentStart(state, action);

    case view_store_actions_actionTypes["Zb" /* SUBMIT_COMMENT_FAIL */]:
      return submitCommentFail(state, action);

    case view_store_actions_actionTypes["Mb" /* RESET_INPUT */]:
      return resetInput(state, action);

    case view_store_actions_actionTypes["Nb" /* RESET_MODEL */]:
      return model_resetModel(state, action);

    case view_store_actions_actionTypes["a" /* ANS_CORRECT */]:
      return ansCorrect(state, action);

    case view_store_actions_actionTypes["d" /* ANS_WRONG */]:
      return ansWrong(state, action);

    case view_store_actions_actionTypes["l" /* CHANGE_CNT_START */]:
      return model_changeCntStart(state, action);

    case view_store_actions_actionTypes["h" /* CHANGE_CNT_CANCEL */]:
      return model_changeCntCancel(state, action);

    case view_store_actions_actionTypes["k" /* CHANGE_CNT_RESET */]:
      return model_changeCntReset(state, action);

    case view_store_actions_actionTypes["i" /* CHANGE_CNT_FAIL */]:
      return model_changeCntFail(state, action);

    case view_store_actions_actionTypes["g" /* CHANGE_CNT */]:
      return model_changeCnt(state, action);

    case view_store_actions_actionTypes["tb" /* FETCH_VIDEO */]:
      return model_fetchVideo(state, action);

    case view_store_actions_actionTypes["m" /* CHANGE_FAVORITE */]:
      return model_changeFav(state, action);

    case view_store_actions_actionTypes["t" /* CHANGE_FAVORITE_PT_START */]:
      return model_changeFavPtStart(state, action);

    case view_store_actions_actionTypes["s" /* CHANGE_FAVORITE_PT_FAIL */]:
      return model_changeFavPtFail(state, action);

    case view_store_actions_actionTypes["ub" /* FILTER_POST */]:
      return model_filterPost(state, action);

    case view_store_actions_actionTypes["Ob" /* SET_COMMENTID */]:
      return setCommentID(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var store_reducers_model = (reducers_model_reducer);
// CONCATENATED MODULE: ./react/view/store/reducers/tags.js


const reducers_tags_initialState = {
  path: null,
  tags: null
};

const tags_fetchTags = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    tags: action.tags
  });
};

const tags_changeTagsPath = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    path: action.path
  });
};

const reducers_tags_reducer = (state = reducers_tags_initialState, action) => {
  switch (action.type) {
    case view_store_actions_actionTypes["w" /* CHANGE_TAGS_PATH */]:
      return tags_changeTagsPath(state, action);

    case view_store_actions_actionTypes["fb" /* FETCH_TAGS */]:
      return tags_fetchTags(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var reducers_tags = (reducers_tags_reducer);
// CONCATENATED MODULE: ./react/view/store/reducers/share.js


const reducers_share_initialState = {
  users: null,
  userSelect: null,
  filterUser: null,
  filterUserSelect: null,
  viewAllUsers: true,
  shareID: null,
  cntType: null,
  start: false,
  shareErr: null
};

const share_fetchUsers = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    users: action.users,
    filterUser: null
  });
};

const share_userSelect = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    userSelect: action.userSelect
  });
};

const share_viewUsers = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    viewAllUsers: !state.viewAllUsers
  });
};

const share_removeUser = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    userSelect: action.users,
    viewAllUsers: action.users && !action.users.length > 0
  });
};

const reducers_share_filterUser = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    filterUser: action.users
  });
};

const share_filterUserSelect = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    filterUserSelect: action.userSelect
  });
};

const share_shareID = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    shareID: String(action.shareID),
    cntType: action.cntType
  });
};

const share_shareUserStart = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    start: true
  });
};

const share_shareUserFail = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    shareErr: action.err
  });
};

const reducers_share_shareUser = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    users: null,
    userSelect: null,
    filterUser: null,
    filterUserSelect: null,
    viewAllUsers: true,
    shareID: null,
    share: false,
    start: false
  });
};

const reducers_share_reducer = (state = reducers_share_initialState, action) => {
  switch (action.type) {
    case view_store_actions_actionTypes["pb" /* FETCH_USERS */]:
      return share_fetchUsers(state, action);

    case view_store_actions_actionTypes["bc" /* USER_SELECT */]:
      return share_userSelect(state, action);

    case view_store_actions_actionTypes["cc" /* VIEW_USERS */]:
      return share_viewUsers(state, action);

    case view_store_actions_actionTypes["Jb" /* REMOVE_USER */]:
      return share_removeUser(state, action);

    case view_store_actions_actionTypes["vb" /* FILTER_USER */]:
      return reducers_share_filterUser(state, action);

    case view_store_actions_actionTypes["xb" /* FILTER_USER_SELECT */]:
      return share_filterUserSelect(state, action);

    case view_store_actions_actionTypes["Pb" /* SHARE_ID */]:
      return share_shareID(state, action);

    case view_store_actions_actionTypes["Tb" /* SHARE_USER_START */]:
      return share_shareUserStart(state, action);

    case view_store_actions_actionTypes["Rb" /* SHARE_USER_FAIL */]:
      return share_shareUserFail(state, action);

    case view_store_actions_actionTypes["Qb" /* SHARE_USER */]:
      return reducers_share_shareUser(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var reducers_share = (reducers_share_reducer);
// CONCATENATED MODULE: ./react/view/store/reducers/trend.js


const reducers_trend_initialState = {
  trends: null,
  show: false
};

const trend_fetchTrds = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    trends: action.trd
  });
};

const showTrd = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    show: true
  });
};

const defaultTrd = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    show: false
  });
};

const reducers_trend_reducer = (state = reducers_trend_initialState, action) => {
  switch (action.type) {
    case view_store_actions_actionTypes["kb" /* FETCH_TRD */]:
      return trend_fetchTrds(state, action);

    case view_store_actions_actionTypes["Wb" /* SHOW_TRD */]:
      return showTrd(state, action);

    case view_store_actions_actionTypes["D" /* DEFAULT_TRD */]:
      return defaultTrd(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var reducers_trend = (reducers_trend_reducer);
// CONCATENATED MODULE: ./react/view/store/reducers/setQue.js


const reducers_setQue_initialState = {
  categ: null
};

const setQue_fetchCateg = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    categ: action.categ
  });
};

const reducers_setQue_reducer = (state = reducers_setQue_initialState, action) => {
  switch (action.type) {
    case view_store_actions_actionTypes["E" /* FETCH_CATEG */]:
      return setQue_fetchCateg(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var reducers_setQue = (reducers_setQue_reducer);
// CONCATENATED MODULE: ./react/view/store/reducers/conv.js


const reducers_conv_initialState = {
  conv: null
};

const conv_fetchConv = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    conv: action.conv
  });
};

const reducers_conv_reducer = (state = reducers_conv_initialState, action) => {
  switch (action.type) {
    case view_store_actions_actionTypes["O" /* FETCH_CONV */]:
      return conv_fetchConv(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var reducers_conv = (reducers_conv_reducer);
// CONCATENATED MODULE: ./react/view/store/reducers/header.js


const view_store_reducers_header_initialState = {
  expand: false,
  hideFormSm: false,
  addNew: false,
  favChange: null,
  notify: null,
  hidNotify: false,
  navList: null,
  navListCateg: null,
  hidNavList: false,
  hidUserOption: false,
  notifyActive: null,
  default: false,
  searchCnt: null,
  filterPos: 0,
  filterLastPos: 0,
  searchCntErr: null,
  filterStart: false
};

const view_store_reducers_header_formExpand = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const view_store_reducers_header_formSm = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    hideFormSm: false,
    default: false
  });
};

const view_store_reducers_header_navDefault = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    expand: false,
    hideFormSm: true,
    addNew: false,
    hidNotify: true,
    hidNavList: true,
    hidUserOption: true,
    default: true
  });
};

const view_store_reducers_header_addNew = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    addNew: !state.addNew,
    default: false
  });
};

const header_changeMainFavStart = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    favChange: action.isLiked
  });
};

const header_changeMainFavReset = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    favChange: null
  });
};

const view_store_reducers_header_fetchNotify = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const view_store_reducers_header_fetchNotifyStart = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const view_store_reducers_header_changeFavNotifyStart = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    notify: action.notify
  });
};

const view_store_reducers_header_changeFavNotify = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    notify: action.notify
  });
};

const view_store_reducers_header_showNavList = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const view_store_reducers_header_fetchNavListStart = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    navList: null,
    navListCateg: null
  });
};

const view_store_reducers_header_fetchNavList = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const view_store_reducers_header_showUserOption = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const view_store_reducers_header_fetchNotifyActive = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    notifyActive: action.notifyActive
  });
};

const view_store_reducers_header_defaultNotifyActive = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    notifyActive: null
  });
};

const view_store_reducers_header_headerFilterStart = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const view_store_reducers_header_headerFilterFail = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    searchCntErr: action.searchCntErr
  });
};

const view_store_reducers_header_headerFilter = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    searchCnt: action.searchCnt
  });
};

const view_store_reducers_header_headerFilterClose = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    searchCnt: null,
    filterStart: false
  });
};

const view_store_reducers_header_reducer = (state = view_store_reducers_header_initialState, action) => {
  switch (action.type) {
    case view_store_actions_actionTypes["Fb" /* HEADER_FORM_EXPAND */]:
      return view_store_reducers_header_formExpand(state, action);

    case view_store_actions_actionTypes["Gb" /* HEADER_FORM_SM */]:
      return view_store_reducers_header_formSm(state, action);

    case view_store_actions_actionTypes["Hb" /* HEADER_NAV_DEFAULT */]:
      return view_store_reducers_header_navDefault(state, action);

    case view_store_actions_actionTypes["zb" /* HEADER_ADD_NEW */]:
      return view_store_reducers_header_addNew(state, action);

    case view_store_actions_actionTypes["v" /* CHANGE_MAINFAVORITE_START */]:
      return header_changeMainFavStart(state, action);

    case view_store_actions_actionTypes["u" /* CHANGE_MAINFAVORITE_RESET */]:
      return header_changeMainFavReset(state, action);

    case view_store_actions_actionTypes["bb" /* FETCH_NOTIFY_START */]:
      return view_store_reducers_header_fetchNotifyStart(state, action);

    case view_store_actions_actionTypes["W" /* FETCH_NOTIFY */]:
      return view_store_reducers_header_fetchNotify(state, action);

    case view_store_actions_actionTypes["r" /* CHANGE_FAVORITE_NOTIFY_START */]:
      return view_store_reducers_header_changeFavNotifyStart(state, action);

    case view_store_actions_actionTypes["o" /* CHANGE_FAVORITE_NOTIFY */]:
      return view_store_reducers_header_changeFavNotify(state, action);

    case view_store_actions_actionTypes["Vb" /* SHOW_NAV_LIST */]:
      return view_store_reducers_header_showNavList(state, action);

    case view_store_actions_actionTypes["V" /* FETCH_NAVLIST_START */]:
      return view_store_reducers_header_fetchNavListStart(state, action);

    case view_store_actions_actionTypes["T" /* FETCH_NAVLIST */]:
      return view_store_reducers_header_fetchNavList(state, action);

    case view_store_actions_actionTypes["Xb" /* SHOW_USER_OPTION */]:
      return view_store_reducers_header_showUserOption(state, action);

    case view_store_actions_actionTypes["X" /* FETCH_NOTIFY_ACTIVE */]:
      return view_store_reducers_header_fetchNotifyActive(state, action);

    case view_store_actions_actionTypes["B" /* DEFAULT_NOTIFYACTIVE */]:
      return view_store_reducers_header_defaultNotifyActive(state, action);

    case view_store_actions_actionTypes["Eb" /* HEADER_FILTER_START */]:
      return view_store_reducers_header_headerFilterStart(state, action);

    case view_store_actions_actionTypes["Cb" /* HEADER_FILTER_FAIL */]:
      return view_store_reducers_header_headerFilterFail(state, action);

    case view_store_actions_actionTypes["Bb" /* HEADER_FILTER_CLOSE */]:
      return view_store_reducers_header_headerFilterClose(state, action);

    case view_store_actions_actionTypes["Ab" /* HEADER_FILTER */]:
      return view_store_reducers_header_headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var view_store_reducers_header = (view_store_reducers_header_reducer);
// CONCATENATED MODULE: ./react/view/store/reducers/main.js
function view_store_reducers_main_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function view_store_reducers_main_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { view_store_reducers_main_ownKeys(Object(source), true).forEach(function (key) { view_store_reducers_main_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { view_store_reducers_main_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function view_store_reducers_main_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const view_store_reducers_main_initialState = {
  showBackdrop: false,
  shareActive: null
};

const view_store_reducers_main_fetchShareActive = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    shareActive: action.shareActive
  });
};

const view_store_reducers_main_resetActive = (state, action) => {
  let reset = action.curTab === 'question' ? {
    cntActive: null
  } : {
    shareActive: null,
    shareCntActive: null
  };
  return Object(view_shared_utility["f" /* updateObject */])(state, view_store_reducers_main_objectSpread({}, reset));
};

const main_showMainBackdrop = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    showBackdrop: true
  });
};

const main_hideMainBackdrop = (state, action) => {
  return Object(view_shared_utility["f" /* updateObject */])(state, {
    showBackdrop: false
  });
};

const view_store_reducers_main_reducer = (state = view_store_reducers_main_initialState, action) => {
  switch (action.type) {
    case view_store_actions_actionTypes["db" /* FETCH_SHARE_ACTIVE */]:
      return view_store_reducers_main_fetchShareActive(state, action);

    case view_store_actions_actionTypes["Kb" /* RESET_ACTIVE */]:
      return view_store_reducers_main_resetActive(state, action);

    case view_store_actions_actionTypes["Ub" /* SHOW_MAIN_BACKDROP */]:
      return main_showMainBackdrop(state, action);

    case view_store_actions_actionTypes["Ib" /* HIDE_MAIN_BACKDROP */]:
      return main_hideMainBackdrop(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var view_store_reducers_main = (view_store_reducers_main_reducer);
// EXTERNAL MODULE: ./react/view/store/actions/index.js + 10 modules
var view_store_actions = __webpack_require__("K8iy");

// EXTERNAL MODULE: ./react/view/axios.js
var view_axios = __webpack_require__("vO9P");

// CONCATENATED MODULE: ./react/view/store/sagas/auth.js



function* view_store_sagas_auth_checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(effects_["put"])(view_store_actions["u" /* checkAuth */](true));

    try {
      let response = yield view_axios["a" /* default */].post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(effects_["put"])(view_store_actions["w" /* checkUserImg */](response.data.url));
      } else {
        yield Object(effects_["put"])(view_store_actions["x" /* checkUserName */](response.data.name));
      }
    } catch (err) {}
  }
}
// CONCATENATED MODULE: ./react/view/store/sagas/model.js
function sagas_model_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function sagas_model_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { sagas_model_ownKeys(Object(source), true).forEach(function (key) { sagas_model_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { sagas_model_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function sagas_model_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






function* model_fetchCntInitSaga(action) {
  try {
    let response = yield view_axios["a" /* default */].post(`/view/${action.categ}/${action.id}`, null, {
      headers: {
        'data-categ': 'viewcnt'
      }
    });

    if (response.data) {
      let images = [];
      let snaps = [];

      for (let image of response.data.image) {
        images.push(sagas_model_objectSpread({
          url: `${global_default.a.url}/media/image/${image.id}`
        }, image, {
          mediaType: 'image'
        }));
      }

      for (let snap of response.data.snapshot) {
        snaps.push(sagas_model_objectSpread({
          url: `${global_default.a.url}/media/image/${snap.id}`
        }, snap, {
          mediaType: 'snapshot'
        }));
      }

      response.data.image = images;
      response.data.snapshot = snaps;
      response.data.video = [];
      yield Object(effects_["put"])(view_store_actions["C" /* fetchCnt */](response.data));
    }
  } catch (err) {
    yield Object(effects_["put"])(view_store_actions["D" /* fetchCntFail */](err));
  }
}
function* ansCorrectInitSaga(action) {
  try {
    if (action.categ === 'reply') {
      yield view_axios["a" /* default */].patch('/view', {
        id: action.commentID,
        replyID: action.replyID
      }, {
        headers: {
          'data-categ': 'answercorretreply'
        }
      });
    } else if (action.categ === 'smile') {
      yield view_axios["a" /* default */].patch('/view', {
        id: action.commentID
      }, {
        headers: {
          'data-categ': 'smile'
        }
      });
    } else if (action.categ === 'smilereply') {
      yield view_axios["a" /* default */].patch('/view', {
        id: action.commentID,
        replyID: action.replyID
      }, {
        headers: {
          'data-categ': 'smilereply'
        }
      });
    } else {
      yield view_axios["a" /* default */].patch('/view', {
        id: action.commentID
      }, {
        headers: {
          'data-categ': 'answercorrect'
        }
      });
    }

    yield Object(effects_["put"])(view_store_actions["a" /* ansCorrect */](action.commentID, action.categ, action.replyID));
  } catch (err) {
    yield Object(effects_["put"])(view_store_actions["D" /* fetchCntFail */](err));
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(view_store_actions["mb" /* resetModel */]());
  }
}
function* ansWrongInitSaga(action) {
  try {
    if (action.categ === 'reply') {
      yield view_axios["a" /* default */].patch('/view', {
        id: action.commentID,
        replyID: action.replyID
      }, {
        headers: {
          'data-categ': 'answerwrongreply'
        }
      });
    } else {
      yield view_axios["a" /* default */].patch('/view', {
        id: action.commentID
      }, {
        headers: {
          'data-categ': 'answerwrong'
        }
      });
    }

    yield Object(effects_["put"])(view_store_actions["c" /* ansWrong */](action.commentID, action.categ, action.replyID));
  } catch (err) {
    yield Object(effects_["put"])(view_store_actions["D" /* fetchCntFail */](err));
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(view_store_actions["mb" /* resetModel */]());
  }
}
function* model_changeFavSaga(action) {
  let updateFav = Object(view_shared_utility["a" /* changeFav */])(action.id, action.liked, action.favAdd, action.changedFav);
  yield Object(effects_["put"])(view_store_actions["s" /* changeMainFavoriteStart */](updateFav.favDet.liked));
  yield Object(effects_["put"])(view_store_actions["q" /* changeFavPtStart */](updateFav.favDet.id, updateFav.favDet.liked));

  try {
    let field = action.cntGrp === 'post' ? 'postID' : action.cntGrp === 'question' ? 'queID' : 'pwtID';
    yield view_axios["a" /* default */].patch('/header', {
      id: updateFav.favDet.id,
      model: action.cntGrp,
      field
    }, {
      headers: {
        'data-categ': 'changefavorite'
      }
    });
    yield Object(effects_["delay"])(500);
    yield Object(effects_["put"])(view_store_actions["r" /* changeMainFavoriteReset */]());
    yield Object(effects_["put"])(view_store_actions["k" /* changeFav */](updateFav.updateChangeFav));
  } catch (err) {
    yield Object(effects_["delay"])(500);
    yield Object(effects_["put"])(view_store_actions["r" /* changeMainFavoriteReset */]());
    yield Object(effects_["put"])(view_store_actions["p" /* changeFavPtFail */]());
  }
}
function* model_changeCntInitSaga(action) {
  let field = action.modelType === 'post' ? 'postID' : action.modelType === 'question' ? 'queID' : 'pwtID';

  if (!action.confirm) {
    yield Object(effects_["put"])(view_store_actions["j" /* changeCntStart */](action.title, action.id, action.det, action.modelType));
    return;
  }

  try {
    if (action.det === 'delete') {
      let payload = JSON.stringify({
        id: action.id,
        model: action.modelType,
        field
      });
      yield view_axios["a" /* default */].delete('/header', {
        headers: {
          'data-categ': `deletecnt-${payload}`
        }
      });
    } else if (action.det === 'draft') {
      yield view_axios["a" /* default */].patch('/header', {
        id: action.id,
        model: action.modelType,
        field
      }, {
        headers: {
          'data-categ': 'draftmode'
        }
      });
    } else {
      yield view_axios["a" /* default */].patch('/header', {
        id: action.id,
        model: action.modelType,
        field
      }, {
        headers: {
          'data-categ': 'publishmode'
        }
      });
    }

    yield Object(effects_["put"])(view_store_actions["e" /* changeCnt */]());
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(view_store_actions["i" /* changeCntReset */](true));
  } catch (err) {
    yield Object(effects_["put"])(view_store_actions["g" /* changeCntFail */](err));
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(view_store_actions["i" /* changeCntReset */](false));
  }
}
// CONCATENATED MODULE: ./react/view/store/sagas/share.js



function* share_fetchUsersInitSaga() {
  try {
    let response = yield view_axios["a" /* default */].post('/users', null, {
      headers: {
        'data-categ': `allteacher-notab`
      }
    });
    yield Object(effects_["put"])(view_store_actions["W" /* fetchUsers */](response.data));
  } catch (err) {
    yield Object(effects_["put"])(view_store_actions["X" /* fetchUsersFail */](err));
  }
}
function* share_filterUserInitSaga(action) {
  let filterUser = null;

  if (!action.filterContent) {
    filterUser = action.users;
  } else {
    filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
  }

  yield Object(effects_["put"])(view_store_actions["Z" /* filterUser */](filterUser));
}
function* share_filterUserSelectInitSaga(action) {
  let filterUser = null;

  if (!action.filterContent) {
    filterUser = action.userSelect;
  } else {
    filterUser = action.userSelect.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
  }

  yield Object(effects_["put"])(view_store_actions["ab" /* filterUserSelect */](filterUser));
}
function* share_shareUserInitSaga(action) {
  let shareUser = [];

  for (let user of [...action.userSelect]) {
    shareUser.push(user.id);
  }

  try {
    yield Object(effects_["put"])(view_store_actions["qb" /* shareUserStart */]());
    let field = action.cntType === 'post' ? 'postID' : action.cntType === 'question' ? 'queID' : 'pwtID';
    yield view_axios["a" /* default */].patch('/header', {
      users: JSON.stringify(shareUser),
      id: action.shareID,
      model: action.cntType,
      field
    }, {
      headers: {
        'data-categ': 'shareuser'
      }
    });
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(view_store_actions["pb" /* shareUser */]());
  } catch (err) {
    yield Object(effects_["put"])(view_store_actions["rb" /* shareUserfail */](err));
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(view_store_actions["pb" /* shareUser */]());
  }
}
// CONCATENATED MODULE: ./react/view/store/sagas/tags.js



function* tags_fetchTagsInitSaga() {
  try {
    let response = yield view_axios["a" /* default */].post('/post', null, {
      headers: {
        'data-categ': 'postCateg'
      }
    });
    yield Object(effects_["put"])(view_store_actions["T" /* fetchTags */](response.data));
  } catch (e) {}
}
// CONCATENATED MODULE: ./react/view/store/sagas/trend.js



function* trend_fetchTrdInitSaga(action) {
  try {
    let response = yield view_axios["a" /* default */].post(`/view/${action.cntGrp}/${action.id}`, null, {
      headers: {
        'data-categ': 'related'
      }
    });
    ;
    yield Object(effects_["put"])(view_store_actions["U" /* fetchTrd */](response.data));
  } catch (e) {}
}
// CONCATENATED MODULE: ./react/view/store/sagas/setQue.js


const setQue_CATEG = ['post', 'question', 'social', 'writers', 'poet', 'poeters', 'poem', 'post', 'question', 'social', 'writers', 'poet', 'poeters', 'poem'];
function* setQue_fetchCategInitSaga() {
  yield Object(effects_["put"])(view_store_actions["B" /* fetchCateg */](setQue_CATEG));
}
// CONCATENATED MODULE: ./react/view/store/sagas/conv.js


function* conv_fetchConvInitSaga(action) {
  const data = [{
    id: '63763637737',
    type: 'grpChat',
    groupImage: '/',
    title: 'The real community for programmers The real community for programmers The real community for programmers',
    lastMsg: 'Pls do you know the reson while Pls do you know the reson while Pls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson while',
    online: '5353535',
    offline: '63636363'
  }, {
    id: '7575848839939',
    type: 'pvtChat',
    userImage: '/',
    status: true,
    user: 'user user',
    convCreated: '2m ago',
    lastMsg: 'Pls do you know the reson while Pls do you know the reson while Pls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson while'
  }];
  yield Object(effects_["put"])(view_store_actions["G" /* fetchConv */]([...data]));
}
// CONCATENATED MODULE: ./react/view/store/sagas/header.js




function* view_store_sagas_header_fetchNotifyInitSaga(action) {
  try {
    yield Object(effects_["put"])(view_store_actions["P" /* fetchNotifyStart */]());
    let response = yield view_axios["a" /* default */].post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(view_store_actions["L" /* fetchNotify */](response.data.coll));
    } else {
      yield Object(effects_["put"])(view_store_actions["L" /* fetchNotify */]([]));
    }
  } catch (err) {
    yield Object(effects_["put"])(view_store_actions["N" /* fetchNotifyFail */](err));
  }
}
function* view_store_sagas_header_changeFavNotifySaga(action) {
  let notify = Object(view_shared_utility["a" /* changeFav */])(action.notify, action.notifyID);
  yield Object(effects_["put"])(view_store_actions["o" /* changeFavNotifyStart */](notify.updateStartArray));
  yield Object(effects_["put"])(view_store_actions["m" /* changeFavNotify */](notify.updateDataArray));
}
function* view_store_sagas_header_fetchNavlistInitSaga(action) {
  try {
    yield Object(effects_["put"])(view_store_actions["K" /* fetchNavlistStart */]());
    let response = yield view_axios["a" /* default */].post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(effects_["put"])(view_store_actions["I" /* fetchNavlist */](action.category, response.data));
  } catch (e) {}
}
function* view_store_sagas_header_fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield view_axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });
    yield Object(effects_["put"])(view_store_actions["M" /* fetchNotifyActive */](response.data.collTotal));
  } catch (err) {}
}
function* view_store_sagas_header_defaultNotifyActiveInitSaga(action) {
  try {
    yield view_axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(effects_["put"])(view_store_actions["y" /* defaultNotifyActive */]());
  } catch (err) {}
}
function* view_store_sagas_header_headerFilterInitSaga(action) {
  try {
    yield Object(effects_["put"])(view_store_actions["gb" /* headerFilterStart */](action.filterPos, action.filterLastPos));
    let response = yield view_axios["a" /* default */].post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(effects_["put"])(view_store_actions["cb" /* headerFilter */](response.data));
  } catch (err) {
    yield Object(effects_["put"])(view_store_actions["eb" /* headerFilterFail */](err));
  }
}
// CONCATENATED MODULE: ./react/view/store/sagas/main.js



function* view_store_sagas_main_fetchShareActiveInitSaga(action) {
  try {
    let response = yield view_axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });

    if (response.data > 0) {
      yield Object(effects_["put"])(view_store_actions["R" /* fetchShareActive */](response.data));
    }

    return;
  } catch (err) {}
}
function* view_store_sagas_main_resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'share') {
      yield view_axios["a" /* default */].patch('/header', {
        model: 'question'
      }, {
        headers: {
          'data-categ': action.curTab
        }
      });
    } else {
      yield view_axios["a" /* default */].patch('/header', {
        model: 'question'
      }, {
        headers: {
          'data-categ': 'modelNotify'
        }
      });
    }

    yield Object(effects_["put"])(view_store_actions["kb" /* resetActive */](action.curTab));
  } catch (err) {}
}
// CONCATENATED MODULE: ./react/view/store/sagas/index.js











function* view_store_sagas_watchAuth() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(view_store_actions_actionTypes["y" /* CHECK_AUTH_INIT */], view_store_sagas_auth_checkAuthInitSaga)]);
}
function* sagas_watchCnt() {
  yield Object(effects_["all"])([Object(effects_["takeLatest"])(view_store_actions_actionTypes["L" /* FETCH_CNT_INIT */], model_fetchCntInitSaga), Object(effects_["takeLatest"])(view_store_actions_actionTypes["c" /* ANS_CORRECT_INIT */], ansCorrectInitSaga), Object(effects_["takeLatest"])(view_store_actions_actionTypes["f" /* ANS_WRONG_INIT */], ansWrongInitSaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["n" /* CHANGE_FAVORITE_INIT */], model_changeFavSaga), Object(effects_["takeLatest"])(view_store_actions_actionTypes["j" /* CHANGE_CNT_INIT */], model_changeCntInitSaga)]);
}
function* sagas_watchShare() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(view_store_actions_actionTypes["rb" /* FETCH_USERS_INIT */], share_fetchUsersInitSaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["wb" /* FILTER_USER_INIT */], share_filterUserInitSaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["yb" /* FILTER_USER_SELECT_INIT */], share_filterUserSelectInitSaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["Sb" /* SHARE_USER_INIT */], share_shareUserInitSaga)]);
}
function* sagas_watchTags() {
  yield Object(effects_["takeEvery"])(view_store_actions_actionTypes["hb" /* FETCH_TAGS_INIT */], tags_fetchTagsInitSaga);
}
function* sagas_watchTrd() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(view_store_actions_actionTypes["mb" /* FETCH_TRD_INIT */], trend_fetchTrdInitSaga)]);
}
function* sagas_watchSetQue() {
  yield Object(effects_["takeEvery"])(view_store_actions_actionTypes["G" /* FETCH_CATEG_INIT */], setQue_fetchCategInitSaga);
}
function* sagas_watchConv() {
  yield Object(effects_["takeEvery"])(view_store_actions_actionTypes["Q" /* FETCH_CONV_INIT */], conv_fetchConvInitSaga);
}
function* view_store_sagas_watchHeader() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(view_store_actions_actionTypes["ab" /* FETCH_NOTIFY_INIT */], view_store_sagas_header_fetchNotifyInitSaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["q" /* CHANGE_FAVORITE_NOTIFY_INIT */], view_store_sagas_header_changeFavNotifySaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["U" /* FETCH_NAVLIST_INIT */], view_store_sagas_header_fetchNavlistInitSaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["Y" /* FETCH_NOTIFY_ACTIVE_INIT */], view_store_sagas_header_fetchNotifyActiveInitSaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["C" /* DEFAULT_NOTIFYACTIVE_INIT */], view_store_sagas_header_defaultNotifyActiveInitSaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["eb" /* FETCH_SHARE_ACTIVE_INIT */], view_store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["Db" /* HEADER_FILTER_INIT */], view_store_sagas_header_headerFilterInitSaga)]);
}
function* view_store_sagas_watchMain() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(view_store_actions_actionTypes["eb" /* FETCH_SHARE_ACTIVE_INIT */], view_store_sagas_main_fetchShareActiveInitSaga), Object(effects_["takeEvery"])(view_store_actions_actionTypes["Lb" /* RESET_ACTIVE_INIT */], view_store_sagas_main_resetActiveInitSaga)]);
}
function* view_store_sagas_rootSaga() {
  yield Object(effects_["all"])([view_store_sagas_watchAuth(), sagas_watchCnt(), sagas_watchTags(), sagas_watchTrd(), sagas_watchShare(), sagas_watchSetQue(), sagas_watchConv(), view_store_sagas_watchHeader(), view_store_sagas_watchMain()]);
}
// CONCATENATED MODULE: ./react/view/store.js














const view_store_bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function view_store_configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: view_store_reducers_auth,
    cnt: store_reducers_model,
    tags: reducers_tags,
    trd: reducers_trend,
    share: reducers_share,
    setQue: reducers_setQue,
    conv: reducers_conv,
    header: view_store_reducers_header,
    main: view_store_reducers_main
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, view_store_bindMiddleware([external_redux_thunk_default.a, sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(view_store_sagas_rootSaga);
  return store;
}

/* harmony default export */ var view_store = (view_store_configureStore);
// CONCATENATED MODULE: ./react/hoc/withStore/withStore.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return indexStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return signupStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return loginStore; });
/* unused harmony export resetpassStore */
/* unused harmony export forgetpassStore */
/* unused harmony export addgroupStore */
/* unused harmony export addpoetStore */
/* unused harmony export addpostStore */
/* unused harmony export addqueStore */
/* unused harmony export editpoetStore */
/* unused harmony export editpostStore */
/* unused harmony export editqueStore */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return viewStore; });















const indexStore = cmp => external_next_redux_wrapper_default()(index_store)(external_next_redux_saga_default()(cmp));
const signupStore = cmp => external_next_redux_wrapper_default()(signup_store)(external_next_redux_saga_default()(cmp));
const loginStore = cmp => external_next_redux_wrapper_default()(login_store)(external_next_redux_saga_default()(cmp));
const resetpassStore = cmp => external_next_redux_wrapper_default()(resetpass_store)(external_next_redux_saga_default()(cmp));
const forgetpassStore = cmp => external_next_redux_wrapper_default()(forgetpassword_store)(external_next_redux_saga_default()(cmp));
const addgroupStore = cmp => external_next_redux_wrapper_default()(addgroup_store)(external_next_redux_saga_default()(cmp));
const addpoetStore = cmp => external_next_redux_wrapper_default()(addpoet_store)(external_next_redux_saga_default()(cmp));
const addpostStore = cmp => external_next_redux_wrapper_default()(addpost_store)(external_next_redux_saga_default()(cmp));
const addqueStore = cmp => external_next_redux_wrapper_default()(addque_store)(external_next_redux_saga_default()(cmp));
const editpoetStore = cmp => external_next_redux_wrapper_default()(editpoet_store)(external_next_redux_saga_default()(cmp));
const editpostStore = cmp => external_next_redux_wrapper_default()(editpost_store)(external_next_redux_saga_default()(cmp));
const editqueStore = cmp => external_next_redux_wrapper_default()(editque_store)(external_next_redux_saga_default()(cmp));
const viewStore = cmp => external_next_redux_wrapper_default()(view_store)(external_next_redux_saga_default()(cmp));

/***/ }),

/***/ "ugmf":
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ }),

/***/ "uhWA":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ "vO9P":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0fJA");
/* harmony import */ var _global_global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_global_global__WEBPACK_IMPORTED_MODULE_1__);


const instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: _global_global__WEBPACK_IMPORTED_MODULE_1___default.a.url
});
instance.defaults.headers.common['authorization'] = 'authorization';
/* harmony default export */ __webpack_exports__["a"] = (instance);

/***/ }),

/***/ "vQuC":
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "vRIi":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies
 */

var XMLHttpRequest = __webpack_require__("dVXH");
var XHR = __webpack_require__("E9J3");
var JSONP = __webpack_require__("4t+r");
var websocket = __webpack_require__("eURV");

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling (opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (typeof location !== 'undefined') {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}


/***/ }),

/***/ "w7x8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./react/signup/store/actions/actionTypes.js
var actionTypes = __webpack_require__("edkJ");

// CONCATENATED MODULE: ./react/signup/store/actions/form.js

const submitFormInit = formData => {
  return {
    type: actionTypes["c" /* SUBMIT_FORM_INIT */],
    formData
  };
};
const submitFormFail = err => {
  return {
    type: actionTypes["b" /* SUBMIT_FORM_FAIL */],
    err
  };
};
const submitFormStart = () => {
  return {
    type: actionTypes["d" /* SUBMIT_FORM_START */]
  };
};
const formSubmitted = () => {
  return {
    type: actionTypes["a" /* FORM_SUBMITTED */]
  };
};
// CONCATENATED MODULE: ./react/signup/store/actions/index.js
/* concated harmony reexport submitFormInit */__webpack_require__.d(__webpack_exports__, "c", function() { return submitFormInit; });
/* concated harmony reexport submitFormFail */__webpack_require__.d(__webpack_exports__, "b", function() { return submitFormFail; });
/* concated harmony reexport submitFormStart */__webpack_require__.d(__webpack_exports__, "d", function() { return submitFormStart; });
/* concated harmony reexport formSubmitted */__webpack_require__.d(__webpack_exports__, "a", function() { return formSubmitted; });


/***/ }),

/***/ "w9Yd":
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),

/***/ "wQ0x":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Class representing an event.
 *
 * @private
 */
class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @param {Object} target A reference to the target to which the event was dispatched
   */
  constructor(type, target) {
    this.target = target;
    this.type = type;
  }
}

/**
 * Class representing a message event.
 *
 * @extends Event
 * @private
 */
class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor(data, target) {
    super('message', target);

    this.data = data;
  }
}

/**
 * Class representing a close event.
 *
 * @extends Event
 * @private
 */
class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {Number} code The status code explaining why the connection is being closed
   * @param {String} reason A human-readable string explaining why the connection is closing
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor(code, reason, target) {
    super('close', target);

    this.wasClean = target._closeFrameReceived && target._closeFrameSent;
    this.reason = reason;
    this.code = code;
  }
}

/**
 * Class representing an open event.
 *
 * @extends Event
 * @private
 */
class OpenEvent extends Event {
  /**
   * Create a new `OpenEvent`.
   *
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor(target) {
    super('open', target);
  }
}

/**
 * Class representing an error event.
 *
 * @extends Event
 * @private
 */
class ErrorEvent extends Event {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {Object} error The error that generated this event
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor(error, target) {
    super('error', target);

    this.message = error.message;
    this.error = error;
  }
}

/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */
const EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} method A string representing the event type to listen for
   * @param {Function} listener The listener to add
   * @public
   */
  addEventListener(method, listener) {
    if (typeof listener !== 'function') return;

    function onMessage(data) {
      listener.call(this, new MessageEvent(data, this));
    }

    function onClose(code, message) {
      listener.call(this, new CloseEvent(code, message, this));
    }

    function onError(error) {
      listener.call(this, new ErrorEvent(error, this));
    }

    function onOpen() {
      listener.call(this, new OpenEvent(this));
    }

    if (method === 'message') {
      onMessage._listener = listener;
      this.on(method, onMessage);
    } else if (method === 'close') {
      onClose._listener = listener;
      this.on(method, onClose);
    } else if (method === 'error') {
      onError._listener = listener;
      this.on(method, onError);
    } else if (method === 'open') {
      onOpen._listener = listener;
      this.on(method, onOpen);
    } else {
      this.on(method, listener);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} method A string representing the event type to remove
   * @param {Function} listener The listener to remove
   * @public
   */
  removeEventListener(method, listener) {
    const listeners = this.listeners(method);

    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener || listeners[i]._listener === listener) {
        this.removeListener(method, listeners[i]);
      }
    }
  }
};

module.exports = EventTarget;


/***/ }),

/***/ "x1MC":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__("HNiH")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "xumg":
/***/ (function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),

/***/ "y8Xw":
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__("mrZd")('socket.io-parser');
var Emitter = __webpack_require__("tFq7");
var binary = __webpack_require__("N2q1");
var isArray = __webpack_require__("lGS7");
var isBuf = __webpack_require__("hZIX");

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

var ERROR_PACKET = exports.ERROR + '"encode error"';

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  } else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    var payload = tryStringify(obj.data);
    if (payload !== false) {
      str += payload;
    } else {
      return ERROR_PACKET;
    }
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

function tryStringify(str) {
  try {
    return JSON.stringify(str);
  } catch(e){
    return false;
  }
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an encoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  } else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  } else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch(e){
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}


/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });