using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagerBackend.Models;
using TaskManagerBackend.Settings;
using TaskManagerBackend.Dtos;
using MongoDB.Bson;

namespace TaskManagerBackend.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly IMongoCollection<TaskModel> _tasksCollection;

        public TaskRepository(IMongoDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _tasksCollection = database.GetCollection<TaskModel>("Tasks");
        }

        public async Task<IEnumerable<TaskDto>> GetAllTasks(string userId)
        {
            var filter = Builders<TaskModel>.Filter.Eq(task => task.UserId, userId);
            var tasks = await _tasksCollection.Find(filter).ToListAsync();
            return tasks.Select(task => new TaskDto
            {
                Id = task.Id.ToString(),
                UserId = task.UserId,
                Title = task.Title,
                Description = task.Description,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt,
                ImagePath = task.ImagePath,
            });
        }


        public async Task<TaskModel> GetTaskById(string id)
        {
            if (ObjectId.TryParse(id, out ObjectId objectId))
            {
                var filter = Builders<TaskModel>.Filter.Eq(task => task.Id, objectId);

                return await _tasksCollection.Find(filter).FirstOrDefaultAsync();
            }
            else
            {
                throw new ArgumentException("Invalid ID format", nameof(id));
            }
        }

        public async Task AddTask(TaskModel task)
        {
            await _tasksCollection.InsertOneAsync(task);
        }

        public async Task UpdateTask(string id, TaskModel updatedTask)
        {

            if (ObjectId.TryParse(id, out ObjectId objectId))
            {
                var filter = Builders<TaskModel>.Filter.Eq(t => t.Id, objectId);
                var result = await _tasksCollection.ReplaceOneAsync(filter, updatedTask);

                if (result.MatchedCount == 0)
                {
                    throw new Exception("Task not found.");
                }
            }
            else
            {
                throw new ArgumentException("Invalid task ID format", nameof(id));
            }
        }

        public async Task DeleteTask(string id)
        {
            if (ObjectId.TryParse(id, out ObjectId objectId))
            {
                var filter = Builders<TaskModel>.Filter.Eq(task => task.Id, objectId);

                await _tasksCollection.DeleteOneAsync(filter);
            }
            else
            {
                throw new ArgumentException("Invalid ID format");
            }
        }
    }
}
