using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Interface;

public interface IUserGamedata
{
    int id { get; set; }
    int games_total { get; set; }
    int games_won { get; set; }
    int games_lost { get; set; }
    int draws { get; set; }
}
