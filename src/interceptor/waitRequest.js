const pausedRequests = [];
export const waitTokenRefresh = async (config) => {
  if (config.isInterceptor === false) return config;
  return new Promise((resolve, reject) => {
    pausedRequests.push(() => resolve());
  });
}
export const runPausedRequests = () => {
  while(pausedRequests.length) {
    const reop = pausedRequests.shift()
    reop();
  }
}