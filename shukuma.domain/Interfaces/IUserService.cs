using shukuma.domain.Models;

namespace shukuma.domain.Interfaces
{
    public interface IUserService
    {
        Task<ResponseVm> SignUp(SignupModel user);
        Task<ResponseVm> SignIn(SigninModel user);
        Task<ResponseVm> UpdatedUserInfo(UserModel user);
        Task<List<UserInfo>> GetUsers();
    }
}
