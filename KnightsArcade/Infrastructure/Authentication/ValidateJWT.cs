using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace KnightsArcade.Infrastructure.Authentication
{
    public class ValidateJWT
    {
        private readonly string _cognitoAuth0Domain;
        private readonly string _customAuth0Domain;
        private readonly string _customAuth0Audience;
        private readonly SymmetricSecurityKey _sharedKey;
        private readonly ILogger<ValidateJWT> _logger;

        public ValidateJWT(ILogger<ValidateJWT> logger, IConfiguration configuration)
        {
            _logger = logger;
            _cognitoAuth0Domain = configuration.GetSection("Authentication:CognitoDomain").Value;
            _customAuth0Domain = configuration.GetSection("Authentication:CustomDomain").Value;
            _customAuth0Audience = configuration.GetSection("Authentication:CustomAudience").Value;
            _sharedKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("Authentication:SharedKey").Value));
        }

        public bool CheckValidation(string token)
        {
            try
            {
                string accessToken = token.Replace("Bearer ", "");
                if(!CognitoValidation(accessToken))
                {
                    return CustomValidation(accessToken);
                }

                return true;
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message, e);
                return false;
            }

        }

        public bool CustomValidation(string token)
        {
            try
            {
                string accessToken = token.Replace("Bearer ", "");
                TokenValidationParameters validationParameters =
                    new TokenValidationParameters
                    {
                        ValidIssuer = _customAuth0Domain,
                        ValidAudience = _customAuth0Audience,
                        IssuerSigningKey = _sharedKey,
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        ValidateAudience = true
                    };

                //IdentityModelEventSource.ShowPII = true;
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                ClaimsPrincipal user = handler.ValidateToken(accessToken, validationParameters, out SecurityToken validatedToken);


                return true;
            }
            catch(Exception e) //Throws error if no valid access token.
            {
                _logger.LogError(e.Message, e);
                return false;
            }
        }

        public bool CognitoValidation(string accessToken)
        {
            try
            {
                IConfigurationManager<OpenIdConnectConfiguration> configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>($"{_cognitoAuth0Domain}/.well-known/openid-configuration", new OpenIdConnectConfigurationRetriever());
                OpenIdConnectConfiguration openIdConfig = AsyncHelper.RunSync(async () => await configurationManager.GetConfigurationAsync(CancellationToken.None));

                TokenValidationParameters validationParameters =
                    new TokenValidationParameters
                    {
                        ValidIssuer = _cognitoAuth0Domain,
                        IssuerSigningKeys = openIdConfig.SigningKeys,
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        ValidateAudience = false
                    };

                //IdentityModelEventSource.ShowPII = true;
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                ClaimsPrincipal user = handler.ValidateToken(accessToken, validationParameters, out SecurityToken validatedToken);

                return true;
            }
            catch (Exception e) //Throws error if user has no valid access token.
            {
                _logger.LogCritical(e, e.Message);
                return false;
            }

        }
    }
}
