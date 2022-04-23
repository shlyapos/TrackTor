using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TrackTor.Adaptor.Models;
using TrackTor.DataBase;
using TrackTor.DataBase.Models;
using TrackTor.Repositories.Api;

namespace TrackTor.Repositories.Implementation
{
    public class UserRepository: IUserRepository
    {
        readonly private TrackTorDBContext _context;
        private static Random random = new Random();

        public UserRepository(TrackTorDBContext context)
        {
            _context = context;
        }
        
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public async Task AddUserAsync(UserModel user)
        {
            var salt = RandomString(8);
            var userDb = new User(
                id: user.Id,
                login: user.Login,
                salt: salt,
                hash: salt + user.Password
            );
            await _context.User!.AddAsync(userDb);
            await _context.SaveChangesAsync();
        }

        public async Task<List<UserModel>> GetUsersAsync()
        {
            var users =  await _context.User!.ToListAsync();
            return users.Select(user => new UserModel(
                id: user.Id,
                login: user.Login,
                password: user.Hash)).ToList();
        }

        public async Task<UserModel?> Login(string login, string password)
        {
            var account = await _context.User!
                .Where(c => c.Login == login)
                .FirstOrDefaultAsync();

            if (account == null)
            {
                throw new Exception($"Account with Login: {login} not found.");
            }

            return account.Hash != account.Salt + password ? null : new UserModel(
                id: account.Id,
                login: account.Login,
                password: password);
        }
    }
}