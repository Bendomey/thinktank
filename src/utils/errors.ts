import { is } from 'ramda';

export const createErrors = () => {
  class BaseError extends Error {
    constructor(message: string) {
      super();
      this.message = message;
    }

    getCode() {
      if (is(BadRequest, this)) return 400;
      if (is(NotFound, this)) return 404;
      return 500;
    }
  }

  class BadRequest extends BaseError {}
  class NotFound extends BaseError {}

  return {
    BaseError,
    BadRequest,
    NotFound,
  };
};

const errors = createErrors();
export type ICreateErrors = typeof errors;
