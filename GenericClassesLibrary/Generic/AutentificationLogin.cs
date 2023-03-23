using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic;

public class AutentificationLogin
{
    public static bool CheckCredidentals(string username, string password)
    {
        if(username == "idontexist") { return false; }
        if(password == "wrongpassword") { return false; }
        return true;
    }
}
