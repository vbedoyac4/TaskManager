using MongoDB.Bson;
using TaskManagerBackend.Dtos;
using TaskManagerBackend.Models;

namespace TaskManagerBackend.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskDto>> GetAllTasks(string userId);
        Task<TaskModel> GetTaskById(string id);
        Task AddTask(TaskModel task);
        Task UpdateTask(string id, TaskModel updatedTask);
        Task DeleteTask(string id);
    }
}