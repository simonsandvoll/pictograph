namespace Pictograph.Models
{
    public interface IResult
    {
        string ErrorCode { get; }

        string Message { get; }

        bool IsSuccess { get; }

        int StatusCode { get; }
    }
}
