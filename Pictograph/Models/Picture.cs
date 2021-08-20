using System;
using System.Collections.Generic;

namespace Pictograph.Models
{
    public class Picture
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public string Url { get; set; }

        public DateTimeOffset? CreatedOn { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public IReadOnlyList<string> Tags { get; set; }

        public Picture(string id, string name, string url, string title, string description, IReadOnlyList<string> tags, DateTimeOffset? createdOn)
        {
            Id = id;
            Name = name;
            Url = url;
            Title = title;
            Description = description;
            Tags = tags;
            CreatedOn = createdOn;
        }
    }
}
