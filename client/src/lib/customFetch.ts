import { z } from "zod";

type FetchOptionsType<TReq = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: TReq;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: {
    tags?: string[];
    revalidate?: number;
  };
};

type ApiResponseType<T> = {
  ok: boolean;
  message: string;
  data: T | null;
};

type FetchResultType<T> = {
  data: T | null;
  message: string;
  ok: boolean;
  status: number;
};

/**
 * 커스텀 fetch 함수
 * @param endpoint API 엔드포인트
 * @param schema Zod 스키마 (응답 데이터 검증용)
 * @param options 요청 옵션 (method, body, headers, next.js 옵션 등)
 * @returns 검증된 데이터와 메타데이터를 포함한 객체
 */
export async function customFetch<TRes, TReq = unknown>(
  endpoint: string,
  schema?: z.ZodType<TRes>,
  options: FetchOptionsType<TReq> = {},
): Promise<FetchResultType<TRes>> {
  const { method = "GET", body, headers = {}, next } = options;

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
    const status = response.status;
    const responseData = (await response.json()) as ApiResponseType<TRes>;

    const { ok, message, data } = responseData;

    if (!ok) {
      return { data: null, message, ok: false, status };
    }

    // 데이터가 있고 스키마가 제공된 경우에만 Zod로 검증
    if (schema && data) {
      try {
        const validatedData = schema.parse(data);
        return { data: validatedData, message, ok: true, status: 200 };
      } catch (validationError) {
        console.log("데이터 형식이 올바르지 않습니다.", validationError);
        return { data: null, message: "데이터 유효성 검증 실패", ok: false, status: 400 };
      }
    }

    // POST, DELETE 등의 요청이거나 데이터가 없는 경우
    return { data, message, ok: true, status: 200 };
  } catch (error) {
    // 서버 에러, 네트워크 에러 등
    console.log("Fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

    return { data: null, message: errorMessage, ok: false, status: 500 };
  }
}
