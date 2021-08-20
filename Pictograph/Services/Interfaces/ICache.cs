using System;
using System.Threading.Tasks;

namespace Pictograph.Services
{
    public interface ICache
    {
        Task<T> GetOrAdd<T>(string key, Func<Task<T>> valueFactory, int ttlMinutes);

        void Remove(string key);
    }
}
