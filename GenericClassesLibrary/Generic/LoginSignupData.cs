using GenericClassesLibrary.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic;

public class LoginSignupData: IAutentificationData
{
    public string username { get; set; }
    public string password { get; set; }
}
