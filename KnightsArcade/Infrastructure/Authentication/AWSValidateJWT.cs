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
using System.Threading;
using System.Threading.Tasks;

namespace KnightsArcade.Infrastructure.Authentication
{
    public class AWSValidateJWT
    {
        private readonly string auth0Domain; // Your Auth0 domain
        private readonly ILogger<AWSValidateJWT> _logger;

        public AWSValidateJWT(ILogger<AWSValidateJWT> logger, IConfiguration configuration)
        {
            _logger = logger;
            auth0Domain = configuration.GetSection("Authentication:Domain").Value;
        }

        public bool CheckValidation(string accessToken)
        {
            try
            {
                IConfigurationManager<OpenIdConnectConfiguration> configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>($"{auth0Domain}/.well-known/openid-configuration", new OpenIdConnectConfigurationRetriever());
                OpenIdConnectConfiguration openIdConfig = AsyncHelper.RunSync(async () => await configurationManager.GetConfigurationAsync(CancellationToken.None));

                TokenValidationParameters validationParameters =
                    new TokenValidationParameters
                    {
                        ValidIssuer = auth0Domain,
                        IssuerSigningKeys = openIdConfig.SigningKeys,
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        ValidateAudience = false
                    };

                SecurityToken validatedToken;
                IdentityModelEventSource.ShowPII = true;
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                ClaimsPrincipal user = handler.ValidateToken(accessToken, validationParameters, out validatedToken);

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
