using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes;

public class UserCredidentalInfo : IUserCredidentalInfo
{
    public int userId { get; set; }
    public string userName { get; set; }
    public string userPassword { get; set; }
}
