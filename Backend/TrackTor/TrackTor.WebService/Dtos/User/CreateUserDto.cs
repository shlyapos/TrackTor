namespace TrackTor.Dtos.User
{
    public class CreateUserDto
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public CreateUserDto(string login, 
            string password)
        {
            Login = login;
            Password = password;
        }
    }
}