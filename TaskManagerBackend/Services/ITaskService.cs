using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagerBackend.Dtos;
using TaskManagerBackend.Models;


namespace TaskManagerBackend.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllTasks(string userId);
        Task<TaskModel> GetTaskById(string id);
        Task AddTask(TaskModel task);
        Task UpdateTask(string id, TaskModel updatedTask);
        Task DeleteTask(string id);
    }
}
