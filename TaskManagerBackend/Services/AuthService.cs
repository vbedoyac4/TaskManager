using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaskManagerBackend.Models;
using TaskManagerBackend.Repositories;
using TaskManagerBackend.Settings;

namespace TaskManagerBackend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IMongoCollection<UserModel> _users;

        public AuthService(IUserRepository userRepository, IConfiguration configuration, IMongoClient mongoClient, IMongoDbSettings settings)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<UserModel>("Users");
        }

        public async Task<string> RegisterUser(string email, string password)
        {
            var existingUser = await _userRepository.GetUserByEmail(email);
            if (existingUser != null)
            {
                throw new Exception("User already exists.");
            }

            var user = new UserModel
            {
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password)
            };

            await _users.InsertOneAsync(user);

            return GenerateJwtToken(user);
        }

        public async Task<(string Token, string UserId)> LoginUser(string email, string password)
        {
            var user = await _userRepository.GetUserByEmail(email);
            if (user == null)
            {
                Console.WriteLine($"User with email {email} not found.");
                throw new Exception("Invalid email or password.");
            }

            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                Console.WriteLine($"Password verification failed for user {email}.");
                throw new Exception("Invalid email or password.");
            }

            var token = GenerateJwtToken(user);
            return (token, user.Id.ToString()); 
        }

        public async Task<UserModel> Authenticate(string email, string password)
        {
            var user = await _userRepository.GetUserByEmail(email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null;
            }
            return user;
        }

        private string GenerateJwtToken(UserModel user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Name, user.Id.ToString()) 
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
