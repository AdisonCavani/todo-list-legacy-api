using MySql.Data.MySqlClient;

namespace Server.Database;

public interface ISqlConnectionFactory
{
    MySqlConnection Create();
}