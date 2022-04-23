using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace TrackTor
{
    public class AuthOptions
    {
        /// <summary>Издатель токена</summary>
        public const string ISSUER = "AmebusServer"; 
        /// <summary>Потребитель токена</summary>
        public const string AUDIENCE = "AmebusClient"; 
        /// <summary>Ключ для шифрования</summary>
        const string KEY = "Amebusbus secret key for authentication";   
        /// <summary>Время жизни токена - сутки</summary>
        public const int LIFETIME = 1440; 
        
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}