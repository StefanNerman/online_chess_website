using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Interface;

public interface IUserProfileData
{
    int userId { get; set; }
    
    IProfileInfo ProfileInfo { get; set; }
}
