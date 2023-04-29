using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.utils;

public static class PlayerRankCalculator
{
    public static int Calculate(int wins, int losses, int draws)
    {
        double total = wins + losses + draws;
        double victoryRatio = wins / (total - draws);
        if(victoryRatio < 0.4) 
        {
            victoryRatio = victoryRatio + 0.05;
        }
        int rank = Convert.ToInt32(total * victoryRatio);
        return rank;
    }
}
