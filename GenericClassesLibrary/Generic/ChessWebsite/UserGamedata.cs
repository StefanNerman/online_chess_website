using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite;

public class UserGamedata
{
    public UserGamedata(int id, int total, int wins, int losses, int draws)
    {
        this.Id= id;
        this.Total= total;
        this.Wins= wins;
        this.Losses= losses;
        this.Draws= draws;  
    }
    public int Id { get; set; }
    public int Total { get; set; }
    public int Wins { get; set; }
    public int Losses { get; set; }
    public int Draws { get; set; }
}
