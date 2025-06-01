class apiError extends Error {
  constructor(
    statusCode,
    message = 'An error occurred',
    errors=[],
    stack=""
  ){
    super(message);
    this.statusCode = statusCode;
    this.data = null; // Initialize data to null
    this.message = message;
    this.errors= errors;
    this.success=false; 
    
    if(stack) {
      this.stack = stack;
    }   
    else{
        Error.captureStackTrace(this, this.constructor);
    }
  }

}

export default apiError;