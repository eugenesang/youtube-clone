export class ApiResponse {
  constructor(data, message = "success", statusCode = 200) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
  
}
