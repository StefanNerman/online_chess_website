﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.utils;

public static class PlayerRankCalculator
{
    public static int Calculate(double playerA, double playerB, double gameResult)
    {

        //E = 1 / 1 + 10^(pB - pA)/ 400
        //R = R + 20(result - E)

        return 2;
    }
}
