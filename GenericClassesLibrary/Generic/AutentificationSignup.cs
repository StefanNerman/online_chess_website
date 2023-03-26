using GenericClassesLibrary.Generic;
using GenericClassesLibrary.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary;

public class AutentificationSignup
{
    public static bool CreateNewUser(LoginSignupData data)
    {
        return true;
    }

    public static bool IsUsernameFree(string username)
    {
        if (username == "stefan") { return false; }
        return true;
    }
}
