using AutoMapper;
using shukuma.domain.Models;

namespace shukuma.persistence.firebase;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserModel, UserEntity>()
            .ReverseMap();

        CreateMap<UserInfo, UserEntity>()
            .ReverseMap();

        CreateMap<SignupModel, UserEntity>();
        CreateMap<SignupModel, UserModel>();
    }
}
