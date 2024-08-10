namespace TaskManagerBackend.Settings
{
    public interface IMongoDbSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }

        JwtSettings Jwt { get; set; }
    }
}
