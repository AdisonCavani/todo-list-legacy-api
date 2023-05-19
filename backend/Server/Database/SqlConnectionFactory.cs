using MySql.Data.MySqlClient;

namespace Server.Database;

public class SqlConnectionFactory : ISqlConnectionFactory
{
    private readonly string _sqlConnectionString;

    public SqlConnectionFactory(string sqlConnectionString)
    {
        _sqlConnectionString = sqlConnectionString;
    }

    public MySqlConnection Create()
    {
        return new(_sqlConnectionString);
    }
}