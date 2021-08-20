using Pictograph.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pictograph.Services
{
    public interface IStorageService
    {
        Task<Result<IReadOnlyList<Picture>>> ListBlobs();

        Task<Result<bool>> UploadFile(FileModel file);
    }
}
