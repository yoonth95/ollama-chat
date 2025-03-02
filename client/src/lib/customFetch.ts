import { z } from "zod";
import { toast } from "react-toastify";

type FetchOptionsType<T = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: T extends object ? string : never;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: {
    tags?: string[];
    revalidate?: number;
  };
  isToast?: boolean;
};

interface ApiResponseType<T> {
  ok: boolean;
  message: string;
  data: T | null;
}

/**
 * 커스텀 fetch 함수
 * @param endpoint API 엔드포인트
 * @param schema Zod 스키마
 * @param options 요청 옵션 (method, body, headers, next.js 옵션 등)
 * @returns 검증된 데이터와 메타데이터를 포함한 객체
 */
export async function customFetch<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  options: FetchOptionsType = {},
): Promise<{ data: T | null; message: string; ok: boolean }> {
  const { method = "GET", body, headers = {}, next, isToast = false } = options;

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache: options.cache,
    next,
  };

  // GET 요청이 아닐 경우 body 추가
  if (method !== "GET" && body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, requestOptions);
    const responseData = (await response.json()) as ApiResponseType<T>;

    const { ok, message, data } = responseData;

    if (!ok) {
      if (isToast) toast.error(message || "요청이 실패했습니다.");
      return { data: null, message, ok: false };
    }

    // 데이터가 있고 GET 요청인 경우에만 Zod로 검증
    if (method === "GET" && data) {
      try {
        const validatedData = schema.parse(data);

        if (isToast) toast.success(message || "요청이 성공적으로 처리되었습니다.");

        return { data: validatedData, message, ok: true };
      } catch (validationError) {
        console.error("데이터 형식이 올바르지 않습니다.", validationError);

        if (isToast) toast.error("데이터 형식이 올바르지 않습니다.");

        return { data: null, message: "데이터 유효성 검증 실패", ok: false };
      }
    }

    // POST, DELETE 등의 요청이거나 데이터가 없는 경우
    if (isToast) toast.success(message || "요청이 성공적으로 처리되었습니다.");
    return { data, message, ok: true };
  } catch (error) {
    console.error("Fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

    if (isToast) toast.error(errorMessage);

    return { data: null, message: errorMessage, ok: false };
  }
}
