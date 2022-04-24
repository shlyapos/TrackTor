using TrackTor.Adaptor.Models;

namespace TrackTor.Dtos.User
{
    public class UserConverter: IDtoConverter<UserModel, UserDto>
    {
        public UserModel Convert(UserDto dto) => new (
            id: dto.Id,
            login: dto.Login,
            password: dto.Password);

        public UserDto Convert(UserModel model) => new (
            id: model.Id,
            login: model.Login,
            password: model.Password);
    }
}