using MongoDB.Bson;

namespace TaskManagerBackend.Models
{
    public class LoginModel
    {
        public ObjectId Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
