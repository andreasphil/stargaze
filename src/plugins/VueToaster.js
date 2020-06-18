// The list of handlers that are subscribed to new toast messages
const toastHandlers = new Set()

const defaultOpts = {
  icon: 'info'
}

const VueToaster = {
  install(Vue, options) {
    /**
     * Broadcast a toast message.
     *
     * @param {string} text The text of the message
     * @param {*} options Additional payload of the message
     */
    Vue.prototype.$toast = function(text, options) {
      const opts = { ...defaultOpts, ...options }
      toastHandlers.forEach(handler => handler(text, opts))
    }

    /**
     * Register a toast message handler. All handlers will receive all toasts broadcast via the
     * `$toast` function from the moment they subscribed.
     *
     * @param {Function} handler Handler function that will be called with the toast data
     */
    Vue.prototype.$toastOn = function(handler) {
      toastHandlers.add(handler)
    }

    /**
     * Removes a registered toast message handler. It will no longer receive new messages.
     *
     * @param {Function} handler The handler that should be removed
     */
    Vue.prototype.$toastOff = function(handler) {
      if (toastHandlers.has(handler)) {
        toastHandlers.delete(handler)
      }
    }
  }
}

export default VueToaster
