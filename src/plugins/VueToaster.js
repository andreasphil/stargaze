/**
 * Specifies properties of a toast.
 *
 * @typedef {Object} ToastOptions
 * @property {string} type The icon of the toast
 */

// The list of handlers that are subscribed to new toast messages
const toastHandlers = new Set()

/** @type {ToastOptions} */
const defaultOpts = {}

export default {
  install(app) {
    /**
     * Broadcast a toast message.
     *
     * @param {string} text The text of the message
     * @param {ToastOptions} options Additional payload of the message
     */
    app.config.globalProperties.$toast = function (text, options) {
      const opts = { ...defaultOpts, ...options }
      toastHandlers.forEach((handler) => handler(text, opts))
    }

    /**
     * Register a toast message handler. All handlers will receive all toasts broadcast via the
     * `$toast` function from the moment they subscribed.
     *
     * @param {Function} handler Handler function that will be called with the toast data
     */
    app.config.globalProperties.$toastOn = function (handler) {
      toastHandlers.add(handler)
    }

    /**
     * Removes a registered toast message handler. It will no longer receive new messages.
     *
     * @param {Function} handler The handler that should be removed
     */
    app.config.globalProperties.$toastOff = function (handler) {
      if (toastHandlers.has(handler)) {
        toastHandlers.delete(handler)
      }
    }
  },
}
