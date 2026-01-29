export type AppError = {
    message: string;
    status?: number;
    code?: string;
};

export type ActionResult<T> =
    | { ok: true; data: T }
    | { ok: false; error: AppError };

export type FetchResult<T> =
    | { ok: true; data: T }
    | { ok: false; status: number; message: string };
