using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Azure;
using Pictograph.Models;

namespace Pictograph.Services
{
    public class StorageService : IStorageService
    {
        public static BlobServiceClient _serviceClient;
        public static BlobContainerClient _containerClient;
        public static string _containerName = "data";

        public StorageService(string connectionString)
        {
            _serviceClient = new BlobServiceClient(connectionString);
            _containerClient = _serviceClient.GetBlobContainerClient(_containerName);
            _containerClient.CreateIfNotExists();
        }

        public bool IsConnected()
        {
            return _serviceClient.AccountName != null;
        }

        public async Task<Result<IReadOnlyList<Picture>>> ListBlobs()
        {
            try
            {
                var blobNames = new List<Picture>();
                var blobs = _containerClient.GetBlobsAsync().AsPages();

                await foreach (Page<BlobItem> blobPage in blobs)
                {
                    foreach (BlobItem blobItem in blobPage.Values)
                    {
                        var tempClient = _containerClient.GetBlobClient(blobItem.Name);
                        blobNames.Add(new Picture(blobItem.Name, tempClient.Uri.ToString(), blobItem.Properties.CreatedOn));
                    }
                }
                return Result<IReadOnlyList<Picture>>.Success(blobNames.OrderByDescending(b => b.CreatedOn).ToList());
            }
            catch
            {
                return Result<IReadOnlyList<Picture>>.NotFound("No pictures found");
            }
        }

        public async Task<Result<bool>> UploadFile(FileModel file)
        {
            var client = _containerClient.GetBlobClient(file.FileName);
            try
            {
                await client.UploadAsync(file.FormFile.OpenReadStream());
                return Result<bool>.Success(true);
            }
            catch
            {
                return Result<bool>.Failed("UploadFailed", "Not able to upload file to directed resource");
            }
        }
    }
}
