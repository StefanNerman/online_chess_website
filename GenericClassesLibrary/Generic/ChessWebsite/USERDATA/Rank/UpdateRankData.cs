using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericClassesLibrary.Generic.ChessWebsite.USERDATA.Rating;

public class UpdateRankData
{
    public int userId { get; set; }
    public double rank { get; set; }
    public double opponentRank { get; set; }
    public double gameResult { get; set; }
}
