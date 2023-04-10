

namespace GenericClassesLibrary.Interface;

internal interface IMySQLDataAccess
{
    Task<List<T>> GetData<T, U>(string sql, U parameters, string connectionString);

    Task SaveData<T>(string sql, T parameters, string connectionString);
}
