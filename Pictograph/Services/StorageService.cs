using System.Collections.Generic;
using System.Threading.Tasks;
using Pictograph.Models;
using Pictograph.Repositories;

namespace Pictograph.Services
{
    public class StorageService : IStorageService
    {

        private const string StorageKey = "Storage.GetAllBlobs";

        private const int CacheTtl = 2;

        private readonly ICache _cache;

        private readonly IStorageRepository _storageRepository;

        public StorageService(ICache cache, IStorageRepository storageRepository)
        {
            _cache = cache;
            _storageRepository = storageRepository;
        }

        public async Task<Result<IReadOnlyList<Picture>>> ListBlobs()
        {
            var blobs = await _cache.GetOrAdd(StorageKey, _storageRepository.GetAllBlobs, CacheTtl);
            return blobs?.Count > 0
                ? Result<IReadOnlyList<Picture>>.Success(blobs)
                : Result<IReadOnlyList<Picture>>.NotFound("No pictures found.");
        }

        public async Task<Result<bool>> UploadFile(FileModel file)
        {
            var result = await _storageRepository.UploadFile(file);
            return result
                ? Result<bool>.Success(result)
                : Result<bool>.Failed("UploadFailed", "Not able to upload file to directed resource");
        }
    }
}
