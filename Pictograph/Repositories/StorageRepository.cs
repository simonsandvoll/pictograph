using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Pictograph.Models;
using System;
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
                        var metadata = tempClient.GetProperties().Value.Metadata;
                        metadata.TryGetValue("id", out string id);
                        metadata.TryGetValue("title", out string title);
                        metadata.TryGetValue("description", out string description);
                        metadata.TryGetValue("tags", out string tags);
                        blobNames.Add(new Picture(
                            id ?? Guid.NewGuid().ToString(),
                            blobItem.Name,
                            tempClient.Uri.ToString(),
                            title ?? blobItem.Name,
                            description ?? "",
                            tags?.Split(',') ?? Array.Empty<string>(),
                            blobItem.Properties.CreatedOn
                        ));
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
            var metaData = new Dictionary<string, string>();
            metaData.Add("id", Guid.NewGuid().ToString());
            metaData.Add("title", file.Title);
            metaData.Add("description", file.Description);
            metaData.Add("tags", string.Join(',', file.Tags));
            try
            {
                await client.UploadAsync(file.FormFile.OpenReadStream(), new BlobUploadOptions { Metadata = metaData });
                return true;
            }
            catch (RequestFailedException e)
            {
                return false;
            }
        }
    }
}
