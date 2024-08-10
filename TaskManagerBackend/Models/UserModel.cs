using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TaskManagerBackend.Models
{
    public class UserModel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("email")]
        public string Email { get; set; }
        [BsonElement("password")]
        public string PasswordHash { get; set; }
    }
}
