export const handleError = (error: Error) => {
  console.error(error);
  throw new Error(error.message);
};
export const handlePromise = async <T>(
  promise: Promise<T>,
  callback?: (res: T) => void
) => {
  return promise
    .then((res) => {
      if (callback) callback(res);
    })
    .catch(handleError);
};
