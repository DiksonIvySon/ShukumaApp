using AutoMapper;
using Google.Cloud.Firestore;
using shukuma.domain.Interfaces;
using shukuma.domain.Models;

namespace shukuma.persistence.firebase;

public class UserServiceFB : IUserService
{
    readonly FirestoreDb _database;
    readonly IMapper _mapper;
    readonly FirestoreAppOptions _appOptions;
    readonly IHashService _hashService;

    public UserServiceFB(FirestoreDb database, FirestoreAppOptions appOptions, IHashService hashService)
    {
        _database = database;
        _appOptions = appOptions;
        _hashService = hashService;

        var mappingConfig = new MapperConfiguration(cfg => cfg.AddProfile(new MappingProfile()));
        _mapper = new Mapper(mappingConfig);
    }

    public async Task<List<UserInfo>> GetUsers()
    {
        try
        {
            var query = _database.Collection(_appOptions.Collection.User);
            var snapshot = await query.GetSnapshotAsync();

            if (snapshot.Any())
            {
                var users = new List<UserInfo>();

                foreach (var doc in snapshot.Documents)
                {
                    var entity = doc.ConvertTo<UserEntity>();
                    var user = _mapper.Map<UserInfo>(entity);
                    users.Add(user);
                }

                return users;
            }

            return new List<UserInfo>();
        }
        catch (Exception ex)
        {
            return new List<UserInfo>();
        }
    }

    public async Task<ResponseVm> SignIn(SigninModel user)
    {
        try
        {
            //check user exists:
            var users = _database.Collection(_appOptions.Collection.User);
            var query = users.WhereEqualTo("EmailAddress", user.EmailAddress);
            var querySnapshot = await query.GetSnapshotAsync();

            if (querySnapshot.Any())
            {
                var userEntity = querySnapshot.First().ConvertTo<UserEntity>();

                var isPasswordCorrect = userEntity.Password == _hashService.GetHash(user.Password);
                if (!isPasswordCorrect)
                    return new ResponseVm
                    {
                        IsSuccess = false,
                        ErrorMessage = $"Could not sign you in. The provided password is incorrect for {user.EmailAddress}."
                    };

                return new ResponseVm
                {
                    IsSuccess = true,
                    User = _mapper.Map<UserModel>(userEntity)
                };
            }

            return new ResponseVm
            {
                IsSuccess = false,
                ErrorMessage = $"Could not sign you in. No profile is linked to {user.EmailAddress}."
            };

        }
        catch (Exception ex)
        {
            return new ResponseVm
            {
                IsSuccess = false,
                ErrorMessage = $"Could not sign you in. {ex.Message}. Support is looking into it. Please try again later."
            };
        }
    }

    public async Task<ResponseVm> SignUp(SignupModel user)
    {
        try
        {
            //check user exists:
            var users = _database.Collection(_appOptions.Collection.User);
            var query = users.WhereEqualTo("EmailAddress", user.EmailAddress);
            var querySnapshot = await query.GetSnapshotAsync();

            if (querySnapshot.Any())
                return new ResponseVm
                {
                    IsSuccess = false,
                    ErrorMessage = $"Could not register you. {user.EmailAddress} is already linked to another Profile."
                };

            //add user:
            var userEntity = _mapper.Map<UserEntity>(user);
            userEntity.Id = Guid.NewGuid().ToString();
            userEntity.Password = _hashService.GetHash(userEntity.Password);
            userEntity.CreatedBy = DateTime.Now.ToString();

            var docRef = _database.Collection(_appOptions.Collection.User).Document(userEntity.Id);
            await docRef.SetAsync(userEntity);

            return new ResponseVm
            {
                IsSuccess = true,
                ErrorMessage = ""
            };
        }
        catch (Exception ex)
        {
            //could not add user:
            return new ResponseVm
            {
                IsSuccess = false,
                ErrorMessage = $"Profile could not be registered. {ex.Message}. Support is looking into it. Please try again later."
            };
        }
    }

    public async Task<ResponseVm> UpdatedUserInfo(UserModel user)
    {
        try
        {
            // check user exists:
            var users = _database.Collection(_appOptions.Collection.User);
            var query = users.WhereEqualTo("EmailAddress", user.EmailAddress);
            var querySnapshot = await query.GetSnapshotAsync();

            if (querySnapshot.Any())
            {
                var userEntity = querySnapshot.First().ConvertTo<UserEntity>();

                if (int.Parse(user.CardsCompleted) == 52)
                    userEntity.HasCompletedChallenge = true;

                userEntity.CompletedBy = DateTime.Now.ToString();
                userEntity.CardsCompleted = user.CardsCompleted;
                userEntity.TimeCompleted = user.TimeCompleted;

                if (userEntity.Review is null) userEntity.Review = user.Review;

                //update here
                var docRef = _database.Collection(_appOptions.Collection.User).Document(userEntity.Id);
                var docSnapshot = await docRef.GetSnapshotAsync();

                if (docSnapshot.Exists)
                {
                    await docRef.SetAsync(userEntity);
                    return new ResponseVm
                    {
                        IsSuccess = true,
                        ErrorMessage = ""
                    };
                }

                return new ResponseVm
                {
                    IsSuccess = false,
                    ErrorMessage = "Could not update profile. Support is looking into it."
                };
            }

            return new ResponseVm
                {
                    IsSuccess = false,
                    ErrorMessage = "Could not update profile. Support is looking into it."
                };

        }
        catch (Exception ex)
        {
            return new ResponseVm
            {
                IsSuccess = false,
                ErrorMessage = $"Could not update profile. {ex.Message}. Support is looking into it. Please try again later."
            };
        }
    }
}
