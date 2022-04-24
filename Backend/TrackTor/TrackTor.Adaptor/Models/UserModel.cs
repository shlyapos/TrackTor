using System;

namespace TrackTor.Adaptor.Models
{
    public class UserModel
    {
        public Guid Id { get; }
        public string Login { get; set; }
        public string Hash { get; set; }
        public string Salt { get; set; }

        public UserModel(
            Guid id,
            string login,
            string hash,
            string salt)
        {
            Id = id;
            Login = login;
            Hash = hash;
            Salt = salt;
        }
    }
}