using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Interface;

public interface IProfileInfo
{
    int userId { get; }
    int userRank { get; }
    string profilePicture { get; }
}
