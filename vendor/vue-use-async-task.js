/** @import { Ref } from "vue" */
import { computed, ref } from "vue";

/**
 * Returns the parameters of a generic function T
 *
 * @template T
 * @typedef {T extends (...t: [...infer Params]) => any ? Params : never} InferArgs
 */

/**
 * Returns the return value of a generic function T
 *
 * @template T
 * @typedef {T extends (...t: any) => infer Return ? Return : never} InferReturn
 */

/**
 * @template {(...args: any[]) => Promise<any>} F
 * @template E
 * @param {F} fetcher
 * @param {Object} [shared]
 * @param {Ref<boolean>} [shared.isLoading]
 * @param {Ref<E | undefined>} [shared.error]
 */
export function useAsyncTask(fetcher, shared) {
  // State
  /** @type {Ref<Awaited<InferReturn<typeof fetcher>> | undefined>} */
  const data = ref();

  /** @type {Ref<E | undefined>} */
  const error = shared?.error ?? ref();

  const isLoading = shared?.isLoading ?? ref(false);
  const hasError = computed(() => !!error.value);

  /**
   * @param {InferArgs<F>} args
   * @return {Promise<[Awaited<InferReturn<typeof fetcher>>, undefined] | [undefined, E]>}
   */
  const run = async (...args) => {
    isLoading.value = true;
    error.value = undefined;

    try {
      const result = await fetcher(...args);
      data.value = result;
      return [result, undefined];
    } catch (e) {
      error.value = e;
      return [undefined, e];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    /**
     * Executes the task and updates all the state properties. Returns a tuple
     * of the shape `[data, error]` that contains the result of the task. If
     * the task succeeded, `data` will be set to the return value (if one
     * exists), `error` will be undefined. If the task threw, `data` will be
     * undefined and `error` will be set to the value that was thrown. Note
     * that `run` itself never throws, so you don't need to catch anything.
     *
     * Example:
     *
     * ```
     * const { run } = useAsyncTask(myTask);
     * const [data, error] = await run();
     * if (error) {
     *   // Handle error here
     * } else {
     *   // Do something with data here
     * }
     * ```
     */
    run,
    /** Return value of the task */
    data,
    /** True while the task is running */
    isLoading,
    /** Will receive the exception thrown by the task if one occurs */
    error,
    /** True if an exception has been thrown */
    hasError,
  };
}
