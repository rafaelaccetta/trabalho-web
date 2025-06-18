import type ErrorResponse from "../interfaces/ErrorResponse";

function isErrorResponse(error: any): error is ErrorResponse {
  return error && typeof error.requestUri === "string";
}
export default isErrorResponse;
