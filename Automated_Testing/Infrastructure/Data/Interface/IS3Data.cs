using System.Web;
using Automated_Testing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automated_Testing.Infrastructure.Data.Interface
{
    public interface IS3Data
    {
        Task<string> ReadObjectDataAsync(string key);
    }
}