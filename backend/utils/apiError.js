// export function apierror(statuscode, msg) {
//   const err = new Error(msg);
//   err.status = statuscode;
//   return err;
// }

export class ApiError extends Error {
  constructor(msg, status = 500) {
    super(msg);
    this.msg = msg;
    this.status = status;
  }
}
