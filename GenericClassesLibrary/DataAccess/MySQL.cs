using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using GenericClassesLibrary.Interface;
using MySql.Data.MySqlClient;

namespace GenericClassesLibrary.DataAccess;

public class MySQL: IMySQLDataAccess
{

    public async Task<List<T>> GetData<T, U>(string sql, U parameters, string connectionString)
    {
        using (MySqlConnection conn = new MySqlConnection(connectionString))
        {
            var rows = await conn.QueryAsync<T>(sql, parameters);
            return rows.ToList();
        }
    }

    public Task SaveData<T>(string sql, T parameters, string connectionString)
    {
        using (MySqlConnection conn = new MySqlConnection(connectionString))
        {
            return conn.ExecuteAsync(sql, parameters);
        }
    }

    public void DeleteData<T>(string sql, T parameters, string connectionString)
    {
        using (MySqlConnection conn =new MySqlConnection(connectionString))
        {
            conn.ExecuteAsync(sql, parameters);
        }
    }
}
