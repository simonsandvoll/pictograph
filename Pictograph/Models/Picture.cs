using System;

namespace Pictograph.Models
{
    public class Picture
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public DateTimeOffset? CreatedOn { get; set; }

        public Picture(string name, string url, DateTimeOffset? createdOn)
        {
            Name = name;
            Url = url;
            CreatedOn = createdOn;
        }
    }
}
