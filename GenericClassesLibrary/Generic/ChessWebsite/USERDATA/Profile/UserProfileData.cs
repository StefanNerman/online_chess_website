using GenericClassesLibrary.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Profile;

public class UserProfileData : IUserProfileData
{
    public int userId { get; set; }

    public IProfileInfo ProfileInfo { get; set; }
    public UserProfileData(int userId, IProfileInfo profile)
    {
        this.userId = userId;
        ProfileInfo = profile;
    }
}
