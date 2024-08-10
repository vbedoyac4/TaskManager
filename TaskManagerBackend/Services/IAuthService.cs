using TaskManagerBackend.Models;

namespace TaskManagerBackend.Services
{
    public interface IAuthService
    {
        Task<string> RegisterUser(string email, string password);
        Task<(string Token, string UserId)> LoginUser(string email, string password);
        Task<UserModel> Authenticate(string email, string password);
    }
}
