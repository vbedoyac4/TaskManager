using TaskManagerBackend.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagerBackend.Models;
using TaskManagerBackend.Dtos;

namespace TaskManagerBackend.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public async Task<IEnumerable<TaskDto>> GetAllTasks(string userId)
        {
            return await _taskRepository.GetAllTasks(userId);
        }

        public async Task<TaskModel> GetTaskById(string id)
        {
            return await _taskRepository.GetTaskById(id);
        }

        public async Task AddTask(TaskModel task)
        {
            await _taskRepository.AddTask(task);
        }

        public async Task UpdateTask(string id, TaskModel updatedTask)
        {
            await _taskRepository.UpdateTask(id, updatedTask);
        }

        public async Task DeleteTask(string id)
        {
            await _taskRepository.DeleteTask(id);
        }
    }
}
