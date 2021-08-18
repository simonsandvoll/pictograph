namespace Pictograph.Models
{
    public class Result : IResult
    {
        protected Result(string errorCode, string message, int statusCode)
        {
            ErrorCode = errorCode;
            Message = message;
            StatusCode = statusCode;
        }

        public string ErrorCode { get; }

        public string Message { get; }

        public bool IsSuccess => string.IsNullOrWhiteSpace(ErrorCode);

        public int StatusCode { get; }
    }
}
