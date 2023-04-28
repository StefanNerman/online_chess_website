using GenericClassesLibrary.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericClassesLibrary.Interface;

namespace GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Profile;

public class ProfileManager
{
    public void CreateProfile(int userId, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"INSERT INTO profiles (userId, userRank, profilePicture) VALUES ({userId}, 0, 'https://i1.sndcdn.com/avatars-000488564466-9llnor-t200x200.jpg')";
        db.SaveData(sql, new { }, connectionString);
    }
    public void UpdateProfile(int userId, int rank, string profilePicture, string connectionString)
    {
        //make it so that if your pass rank or pfp as null it doesnt update them and keeps the old ones
    }

    public async Task<IProfileInfo> GetProfile(int userId, string connectionString)
    {
        MySQL db = new MySQL();
        string sql = $"SELECT * FROM profiles WHERE userId = {userId}";
        List<ProfileInfo> data = await db.GetData<ProfileInfo, dynamic>(sql, new { }, connectionString);
        return data[0];
    }
}
