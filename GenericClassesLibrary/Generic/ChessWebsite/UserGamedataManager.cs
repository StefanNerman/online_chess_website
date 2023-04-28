using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite;

public static class UserGamedataManager
{
    public static async Task<UserGamedata> GetGamedata(int id)
    {
        return new UserGamedata(1, 3, 1, 1, 1);
    }
    public static async void UpdateGamedata(UpdateUserGamedata newData)
    {
        //updates the data
    }
}
