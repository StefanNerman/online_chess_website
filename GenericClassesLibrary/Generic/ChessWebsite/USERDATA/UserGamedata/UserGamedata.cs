using GenericClassesLibrary.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.USERDATA.UserGamedata;

public class UserGamedata: IUserGamedata
{
    public int id { get; set; }
    public int games_total { get; set; }
    public int games_won { get; set; }
    public int games_lost { get; set; }
    public int draws { get; set; }
}
