using GenericClassesLibrary.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite;

public class ProfileInfo: IProfileInfo
{
    public int userId { get; set; }
    public int userRank { get; set; }
    public string profilePicture { get; set; }

}
