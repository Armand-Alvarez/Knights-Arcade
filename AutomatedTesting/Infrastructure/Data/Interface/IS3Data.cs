using AutomatedTesting.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatedTesting.Infrastructure.Data.Interface
{
    public interface IS3Data
    {
        Task<string> ReadObjectDataAsync(string key);
    }
}
