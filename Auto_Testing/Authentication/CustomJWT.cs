using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Auto_Testing.Authentication
{
    public class CustomJWT
    {
        private readonly string _audience;
        private readonly string _issuer;
        private readonly byte[] _sharedKey;

        public CustomJWT(IConfiguration configuration)
        {
            _audience = configuration.GetSection("Authentication:Audience").Value;
            _issuer = configuration.GetSection("Authentication:Issuer").Value;
            _sharedKey = Encoding.UTF8.GetBytes(configuration.GetSection("Authentication:SharedKey").Value);
        }

        public string CreateJWT()
        {
            SecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, "automated-testing-user")
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_sharedKey), SecurityAlgorithms.HmacSha256Signature),
                Audience = _audience,
                Issuer = _issuer,
            };
            SecurityToken securityToken = tokenHandler.CreateToken(tokenDescriptor);
            string token = tokenHandler.WriteToken(securityToken);
            return token;
        }
    }
}
