using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Pictograph.Models
{
    public class FileModel
    {
        public string FileName { get; set; }

        public IFormFile FormFile { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public IReadOnlyList<string> Tags { get; set; }
    }
}
