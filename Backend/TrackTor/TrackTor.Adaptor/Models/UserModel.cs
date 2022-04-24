using System;

namespace TrackTor.Adaptor.Models
{
    public class UserModel
    {
        public Guid Id { get; }
        public string Login { get; set; }
        public string Password { get; set; }

        public UserModel(
            Guid id,
            string login,
            string password)
        {
            Id = id;
            Login = login;
            Password = password;
        }
    }
}