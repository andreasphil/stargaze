import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {
  createApolloClient,
  restartWebsockets
} from 'vue-cli-plugin-apollo/graphql-client'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,

  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: null,

  // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:4000/graphql',
  // LocalStorage token
  tokenName: AUTH_TOKEN,

  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,

  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,

  // Is being rendered on the server?
  ssr: false

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  // Override default cache
  // cache: myCache

  // Override the way the Authorization header is set
  // getAuth: (tokenName) => ...

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
}

/**
 * Initializes apollo. Call this in the vue app file.
 *
 * @param {*} options
 */
export function createProvider(options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options
  })
  apolloClient.wsClient = wsClient

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: { $query: {} },

    errorHandler(error) {
      console.error('Apollo error', error.message)

      if (error.networkError && error.networkError.statusCode === 401) {
        // Unauthorized, redirect to home page so the user can log in again
        onLogout(apolloClient)
        this.$router.push({ name: 'Home' })
        this.$toast('Looks like your session expired. Please sign in again.', {
          type: 'warning'
        })
      }
    }
  })

  return apolloProvider
}

/**
 * Save login token and re-initialize apollo after logging in.
 *
 * @param {*} apolloClient
 * @param {*} token The new login token
 */
export async function onLogin(apolloClient, token) {
  localStorage.setItem(AUTH_TOKEN, token)

  if (apolloClient.wsClient) {
    restartWebsockets(apolloClient.wsClient)
  }

  try {
    await apolloClient.resetStore()
  } catch (err) {
    console.error('Error on cache reset (login)', err.message)
  }
}

/**
 * Clean up stored data and reset apollo after logging out.
 *
 * @param {*} apolloClient
 */
export async function onLogout(apolloClient) {
  localStorage.removeItem(AUTH_TOKEN)

  if (apolloClient.wsClient) {
    restartWebsockets(apolloClient.wsClient)
  }

  try {
    await apolloClient.resetStore()
  } catch (err) {
    console.error('Error on cache reset (logout)', err.message)
  }
}

/**
 * Checks if a login token from apollo exists in local storage. Note that this says nothing about
 * the validity of the token.
 *
 * @returns True if a login token exists
 */
export function loginTokenExists() {
  const token = localStorage.getItem(AUTH_TOKEN)
  return !!token && token.trim() !== ''
}
