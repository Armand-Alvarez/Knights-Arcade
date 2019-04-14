using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace AutoTesting.Infrastructure.Data.Interface
{
    public interface IS3Data
    {
        Task<string> ReadObjectDataAsync(string key);
    }
}