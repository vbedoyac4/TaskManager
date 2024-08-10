using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagerBackend.Models;

namespace TaskManagerBackend.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserModel>> GetAllUsers();
        Task<UserModel> GetUserById(string id);
        Task AddUser(UserModel user);
        Task UpdateUser(UserModel user);
        Task DeleteUser(string id);
        Task<UserModel> GetUserByEmail(string email);
        Task<bool> CheckUserExists(string email);
    }
}
