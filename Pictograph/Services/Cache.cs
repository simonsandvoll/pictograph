using System;
using System.Runtime.Caching;
using System.Threading.Tasks;

namespace Pictograph.Services
{
    public class Cache : ICache
    {
        private readonly MemoryCache _cache;

        public Cache()
        {
            _cache = MemoryCache.Default;
        }

        public async Task<T> GetOrAdd<T>(string key, Func<Task<T>> valueFactory, int ttlMinutes)
        {
            var cacheItem = _cache.GetCacheItem(key);
            if (cacheItem != null)
            {
                return (T)cacheItem.Value;
            }

            var value = await valueFactory();
            _cache.Set(key, value, DateTimeOffset.Now.AddMinutes(ttlMinutes));

            return value;
        }

        public void Remove(string key) => _cache.Remove(key);
    }
}
