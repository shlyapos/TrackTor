using System;

namespace TrackTor.Dtos.User
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        public UserDto(Guid id,
                    string login, 
                    string password)
        {
            Id = id;
            Login = login;
            Password = password;
        }
    }
}