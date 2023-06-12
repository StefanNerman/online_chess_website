using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.DatabaseTypes;

public class Session
{
    public int userId { get; set; }
    public string session_token { get; set; }
    public string session_start { get; set; }
}
