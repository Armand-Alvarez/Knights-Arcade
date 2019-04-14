using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Threading.Tasks;
using Automated_Testing.Infrastructure.Logic;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Automated_Testing
{
    public class Program
    {
        public static void Main(string[] args)
        {/*
            IWebHost webHost = CreateWebHostBuilder(args).Build();
            webHost.RunAsync();

            using (var scope = webHost.Services.CreateScope())
            {
                var testing = scope.ServiceProvider.GetRequiredService<TestingLogic>();

                testing.RunAllEntryTests();
            }
        }
        /*
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
                */
        }
    }
}
