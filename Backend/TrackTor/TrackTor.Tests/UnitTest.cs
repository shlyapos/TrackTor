using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrackTor.Controllers;
using Xunit;
using Moq;
using TrackTor.Adaptor.Models;
using TrackTor.Dtos;
using TrackTor.Dtos.User;
using TrackTor.Repositories.Api;

public class UserControllerTest
{
    private readonly UserController _userController;

    public UserControllerTest()
    {
        var rep = new Mock<IUserRepository>();
        var dtoconverter = new Mock<IDtoConverter<UserModel, CreateUserDto, UserDto>>();
        _userController = new UserController(rep.Object, dtoconverter.Object);
    }
    
    [Fact]
    public async void AddUserPositive()
    {
        var user = new CreateUserDto(login: "abba", password: "123");
        IActionResult resp = await _userController.AddUser(user);
        Assert.IsType<OkResult>(resp);
    }
    
    
    [Fact]
    public async void GetUsers()
    {
        IActionResult resp = await _userController.GetUsers();
        Assert.IsType<StatusCodeResult>(resp);
    }
    
    [Fact]
    public async void Login()
    {
        var user = new LoginDto(login: "abba", password: "123");
        IActionResult resp = await _userController.Login(user);
        Assert.IsType<UnauthorizedObjectResult>(resp);
    }
}
