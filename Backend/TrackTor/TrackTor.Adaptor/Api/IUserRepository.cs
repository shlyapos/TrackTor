using System.Collections.Generic;
using System.Threading.Tasks;
using TrackTor.Adaptor.Models;

namespace TrackTor.Repositories.Api
{
    public interface IUserRepository
    {
        Task AddUserAsync(UserModel user);
        Task<List<UserModel>> GetUsersAsync();

        Task<UserModel?> Login(string login, string password);
    }
}