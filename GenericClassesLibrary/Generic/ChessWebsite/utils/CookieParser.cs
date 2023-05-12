using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.utils;

public static class CookieParser
{
    public static string GetValue(string cookie, string key)
    {
        if (cookie == null) { return ""; }
        if (cookie.Contains(key) == false) { return ""; }
        int keyIndex = cookie.IndexOf(key);
        string[] values = cookie.Substring(keyIndex + 3).Split(";");
        return values[0];
    }
}
