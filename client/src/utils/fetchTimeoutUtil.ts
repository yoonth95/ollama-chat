export const fetchTimeout = <T>(fetchPromise: Promise<T>, timeout: number): Promise<T> => {
  const timeoutPromise = new Promise<T>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: null,
          message: "서버 오류가 발생했습니다.",
          ok: false,
          status: 500,
        } as T),
      timeout,
    ),
  );

  return Promise.race([fetchPromise, timeoutPromise]);
};
