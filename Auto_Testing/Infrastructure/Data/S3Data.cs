using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Auto_Testing.Infrastructure.Data.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Auto_Testing.Infrastructure.Data
{
	public class S3Data : IS3Data
	{
		private readonly ILogger<S3Data> _logger;
		private readonly IAmazonS3 _s3Client;
		private readonly IConfiguration _configuration;
		private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USEast1;

		//ToDo: Put credentials in a secret location
		public S3Data(ILogger<S3Data> logger, IConfiguration config)
		{
			_logger = logger;
			_configuration = config;
			_s3Client = new AmazonS3Client(config.GetSection("ConnectionStrings:AWSAccessKey").Value,
				config.GetSection("ConnectionStrings:AWSSecretKey").Value, bucketRegion);
		}

		public async Task<string> ReadObjectDataAsync(string key)
		{
			string filePath = "";
			try
			{
				GetObjectRequest request = new GetObjectRequest
				{
					BucketName = "knightsarcades3",
					Key = key
				};

				CancellationToken cancellationToken = new CancellationToken();

				using (GetObjectResponse response = await _s3Client.GetObjectAsync(request))
				using (Stream responseStream = response.ResponseStream)
				using (StreamReader reader = new StreamReader(responseStream))
				{
					string title = response.Metadata["x-amz-meta-title"];
					string contentType = response.Headers["Content-Type"];
					Console.WriteLine("Object metadata, Title: {0}", title);
					Console.WriteLine("Content type: {0}", contentType);

					//Saves to current directory
					string tempFileName = System.IO.Path.GetTempFileName();
					await response.WriteResponseStreamToFileAsync(tempFileName, true, cancellationToken);
					Guid guid;
					guid = Guid.NewGuid();
					filePath = AppDomain.CurrentDomain.BaseDirectory + "\\GamesFolder" + guid.ToString();

					ZipFile.ExtractToDirectory(tempFileName, filePath);
				}

				return filePath;
			}
			catch (AmazonS3Exception e)
			{
				_logger.LogError(e.Message, e);
				return null;
			}
			catch (Exception e)
			{
				_logger.LogError(e.Message, e);
				return null;
			}
		}
	}

}
