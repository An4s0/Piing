export type ApiResponse<TData> =
  | { success: true; data: TData; error: null }
  | { success: false; data: null; error: { message: string } };
