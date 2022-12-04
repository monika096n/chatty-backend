import * as HTTP_STATUS_CODE from 'http-status-codes';

export interface IErrorResponse {
	message: string;
	statusCode: number;
	status: string;
	serializeErrors(): IError; //doubt -> how it fetches this method
}

//interface --> data structure/format
export interface IError {
	message: string; //error message
	statusCode: number; //status code
	status: string; //status message
}

export abstract class CustomError extends Error {
    //Error --> global node Error Class which has message,stack etc...
	abstract statusCode: number;
	abstract status: string;
	constructor(message: string) {
		super(message); //extends Error class
	}
	serializeErrors(): IError {
		return {
			message: this.message,
			status: this.status,
			statusCode: this.statusCode,
		};
	}
}

export class JoiRequestValidationError extends CustomError {
	statusCode = HTTP_STATUS_CODE.BAD_REQUEST; //400
	//over-writing value declared in parent class
	status = 'error';

	constructor(message: string) {
		//can't create object and call directly for abstact classes , so we have constructor for child classes
		super(message); //inherits allmethods , variables from parent class
	}
}

export class BadRequestError extends CustomError {
	statusCode = HTTP_STATUS_CODE.BAD_REQUEST; //400
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}

export class NotFoundError extends CustomError {
	statusCode = HTTP_STATUS_CODE.NOT_FOUND; //404
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}

export class NotAuthorizedError extends CustomError {
	statusCode = HTTP_STATUS_CODE.UNAUTHORIZED; //401
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}
export class FileTooLargeError extends CustomError {
	statusCode = HTTP_STATUS_CODE.REQUEST_TOO_LONG; //413
	status = 'error';

	constructor(message: string) {
		super(message);
	}
	//which will have 3 variales , serializeErrors() method
}

export class ServerError extends CustomError {
	statusCode = HTTP_STATUS_CODE.SERVICE_UNAVAILABLE; //503
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}
