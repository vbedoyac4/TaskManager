using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TaskManagerBackend.Models
{
    public class TaskModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [BsonElement("userId")]
        public string UserId { get; set; }
        [BsonElement("title")]
        public string Title { get; set; }
        [BsonElement("description")]
        public string Description { get; set; }
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }
        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; }
        [BsonElement("imagePath")]
        public string? ImagePath { get; set; }
    }
}
