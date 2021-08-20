using Pictograph.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictograph.Repositories
{
    public interface IStorageRepository
    {
        Task<IReadOnlyList<Picture>> GetAllBlobs();

        Task<bool> UploadFile(FileModel file);
    }
}
