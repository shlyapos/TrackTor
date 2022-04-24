using System;
using TrackTor.Adaptor.Models;

namespace TrackTor.Dtos.User
{
    public class UserConverter: IDtoConverter<UserModel, CreateUserDto, UserDto>
    {
        public UserModel Convert(CreateUserDto dto) => new (
            id: Guid.NewGuid(), 
            login: dto.Login,
            password: dto.Password);

        public UserDto Convert(UserModel model) => new (
            id: model.Id,
            login: model.Login,
            password: model.Password);
    }
}