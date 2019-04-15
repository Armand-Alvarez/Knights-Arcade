using KnightsArcade.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnightsArcade.Infrastructure.Data.Interface
{
    public interface ISMTPData
    {
        void SendEmail(Email message);
    }
}
