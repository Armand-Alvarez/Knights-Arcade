using AutomatedTesting.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomatedTesting.Infrastructure.Data.Interface
{
    public interface IWebData
    {
        bool SendWebMessage(string url, object data);
        bool PutTestsQueue(TestsQueue myTest);
        bool PutTests(Tests myTest);
        bool DeleteTestQueue(int? gameID);
        TestsQueue GetFirstTestQueue();
        Games GetGamesByID(int? gameID);
    }
}
