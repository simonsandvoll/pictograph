using Microsoft.AspNetCore.Mvc;
using Pictograph.Models;
using Pictograph.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pictograph.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StorageController : ControllerBase
    {
        private IStorageService _storageService;

        public StorageController(IStorageService storageService)
        {
            _storageService = storageService;
        }

        [HttpGet]
        public async Task<IReadOnlyList<Picture>> Get()
        {
            var pictures = await _storageService.ListBlobs();
            return pictures.Data;
        }

        [HttpPost]
        public async Task<bool> Post([FromForm] FileModel data)
        {
            var response = await _storageService.UploadFile(data);
            return response.Data;
        }
    }
}
