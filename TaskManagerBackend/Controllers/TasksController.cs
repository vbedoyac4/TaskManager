using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using TaskManagerBackend.Dtos;
using TaskManagerBackend.Models;
using TaskManagerBackend.Services;

namespace TaskManagerBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetAllTasks()
        {
            var userId = User.FindFirst(ClaimTypes.Name)?.Value;

            if (userId == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var tasks = await _taskService.GetAllTasks(userId);
            return Ok(tasks);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> GetTaskById(string id)
        {
            var task = await _taskService.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult> AddTask([FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null");
            }

            await _taskService.AddTask(task);
            return CreatedAtAction(nameof(GetTaskById), new { id = task.Id.ToString() }, task);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(string id, [FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task is null or id mismatch");
            }

            var existingTask = await _taskService.GetTaskById(id);
            if (existingTask == null)
            {
                return NotFound();
            }
            task.Id = existingTask.Id;
            await _taskService.UpdateTask(id, task);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(string id)
        {
            var existingTask = await _taskService.GetTaskById(id);
            if (existingTask == null)
            {
                return NotFound();
            }

            await _taskService.DeleteTask(id);
            return NoContent();
        }
    }
}
