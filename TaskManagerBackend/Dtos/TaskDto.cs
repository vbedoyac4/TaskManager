using MongoDB.Bson.Serialization.Attributes;

namespace TaskManagerBackend.Dtos
{
    public class TaskDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string? ImagePath { get; set; }
    }
}
