using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Pictograph.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pictograph.Repositories
{
    public class StorageRepository : IStorageRepository
    {
        public static BlobServiceClient _serviceClient;

        public static BlobContainerClient _containerClient;

        public static string _containerName = "data";

        public StorageRepository(string connectionString)
        {
            _serviceClient = new BlobServiceClient(connectionString);
            _containerClient = _serviceClient.GetBlobContainerClient(_containerName);
            _containerClient.CreateIfNotExists();
        }

        public async Task<IReadOnlyList<Picture>> GetAllBlobs()
        {
            var blobNames = new List<Picture>();
            try
            {
                var blobs = _containerClient.GetBlobsAsync().AsPages();

                await foreach (Page<BlobItem> blobPage in blobs)
                {
                    foreach (BlobItem blobItem in blobPage.Values)
                    {
                        var tempClient = _containerClient.GetBlobClient(blobItem.Name);
                        blobNames.Add(new Picture(blobItem.Name, tempClient.Uri.ToString(), blobItem.Properties.CreatedOn));
                    }
                }
                return blobNames.OrderByDescending(b => b.CreatedOn).ToList();
            }
            catch
            {
                return blobNames;
            }
        }

        public async Task<bool> UploadFile(FileModel file)
        {
            var client = _containerClient.GetBlobClient(file.FileName);
            try
            {
                await client.UploadAsync(file.FormFile.OpenReadStream());
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
