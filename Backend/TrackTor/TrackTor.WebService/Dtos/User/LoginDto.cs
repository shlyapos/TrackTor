namespace TrackTor.Dtos.User
{
    public class LoginDto
    {
        public string Login { get; set; }
        public string Password { get; set; }
        
        public LoginDto(string login, 
            string password)
        {
            Login = login;
            Password = password;
        }
    }
}