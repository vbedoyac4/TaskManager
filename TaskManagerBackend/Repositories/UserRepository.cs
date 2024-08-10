using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagerBackend.Models;
using TaskManagerBackend.Settings;
using MongoDB.Bson;

namespace TaskManagerBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<UserModel> _usersCollection;

        public UserRepository(IMongoDbSettings settings)
        {
            if (string.IsNullOrEmpty(settings?.ConnectionString))
            {
                throw new ArgumentException("MongoDB connection string is null or empty", nameof(settings));
            }

            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _usersCollection = database.GetCollection<UserModel>("Users");
        }

        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            return await _usersCollection.Find(_ => true).ToListAsync();
        }

        public async Task<UserModel> GetUserById(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return null;
            }

            return await _usersCollection.Find(user => user.Id == objectId).FirstOrDefaultAsync();
        }

        public async Task AddUser(UserModel user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            await _usersCollection.InsertOneAsync(user);
        }

        public async Task UpdateUser(UserModel user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var result = await _usersCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
            if (result.ModifiedCount == 0)
            {
                throw new Exception("Update failed. User not found.");
            }
        }

        public async Task DeleteUser(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new ArgumentException("Invalid user ID format", nameof(id));
            }

            var result = await _usersCollection.DeleteOneAsync(user => user.Id == objectId);
            if (result.DeletedCount == 0)
            {
                throw new Exception("Delete failed. User not found.");
            }
        }

        public async Task<UserModel> GetUserByEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentException("Email cannot be null or empty", nameof(email));
            }

            return await _usersCollection.Find(user => user.Email == email).FirstOrDefaultAsync();
        }

        public async Task<bool> CheckUserExists(string email)
        {
            var user = await GetUserByEmail(email);
            return user != null;
        }
    }
}
