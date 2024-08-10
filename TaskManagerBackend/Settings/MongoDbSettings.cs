using TaskManagerBackend.Settings;

namespace TaskManagerBackend.Settings
{
    public class MongoDbSettings : IMongoDbSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public JwtSettings Jwt { get; set; }
    }

}
