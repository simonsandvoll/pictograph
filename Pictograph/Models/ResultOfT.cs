using System;

namespace Pictograph.Models
{
    public class Result<T> : Result
    {
        public T Data { get; }

        protected Result(T data, string errorCode, string message, int statusCode)
            : base(errorCode, message, statusCode)
        {
            Data = data;
        }

        public static Result<T> Success(T data) =>
            new Result<T>(data, null, null, 200);

        public static Result<T> Failed(string errorCode, string message, int statusCode = 409)
        {
            if (string.IsNullOrWhiteSpace(errorCode))
            {
                throw new ArgumentException($"{nameof(errorCode)} cannot be empty", nameof(errorCode));
            }

            return new Result<T>(default, errorCode, message, statusCode);
        }

        public static Result<T> NotFound(string message) =>
            Failed(nameof(NotFound), message);

        public static Result<T> NoData(string message) =>
            Failed(nameof(NoData), message, 400);

        public static Result<T> Unauthorized() =>
            Failed(nameof(Unauthorized), nameof(Unauthorized), 401);

        public static Result<T> TooLarge(string message) =>
            Failed(nameof(TooLarge), message, 413);

        public static Result<T> Generic(string message) =>
            Failed(nameof(Generic), message, 500);
    }
}
