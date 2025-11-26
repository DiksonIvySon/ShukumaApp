using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using shukuma.domain.Interfaces;
using shukuma.domain.Models;
using shukuma.persistence.firebase;

namespace shukuma.Controllers
{
    public class ProfileController : Controller
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public ProfileController(IUserService userService)
        {
            _userService = userService;

            var mappingConfig = new MapperConfiguration(cfg => cfg.AddProfile(new MappingProfile()));
            _mapper = new Mapper(mappingConfig);
        }

        public IActionResult SignUp()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(SignupModel userModel)
        {
            if (ModelState.IsValid)
            {
                var response = await _userService.SignUp(userModel);
                if (response.IsSuccess)
                {
                    var user = _mapper.Map<UserModel>(userModel);
                    return RedirectToAction("Exercise", user);
                }

                ViewData["Error"] = response.ErrorMessage;
                return View();
            }

            ViewData["Error"] = "User data is invalid. Please validate input data.";
            return View();
        }

        public IActionResult SignIn()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SignIn(SigninModel userModel)
        {
            if (ModelState.IsValid)
            {
                var response = await _userService.SignIn(userModel);
                if (response.IsSuccess)
                {
                    return RedirectToAction("Exercise", response.User);
                }

                ViewData["Error"] = response.ErrorMessage;
                return View();
            }

            ViewData["Error"] = "User data is invalid. Please validate input data.";
            return View();
        }

        public IActionResult Exercise(UserModel userModel)
        {
            return View(userModel);
        }

        [HttpPost]
        public async Task<IActionResult> Completed(UserModel userModel)
        {
            var response = await _userService.UpdatedUserInfo(userModel);
            if (response.IsSuccess)
            {
                var progress = Math.Round((int.Parse(userModel.CardsCompleted) / 52m) * 100);
                ViewData["ProgressValue"] = $"{progress}%";

                var progressClass = "progress-bar progress-bar-striped progress-bar-animated";
                if (progress < 25)
                    progressClass += " bg-danger";
                else if (progress < 50)
                    progressClass += " bg-warning";
                else if (progress < 75)
                    progressClass += " bg-info";
                else progressClass += " bg-success";

                ViewData["ProgressClass"] = progressClass;
                ViewData["Review"] = userModel.Review;

                return View(userModel);
            }
            else
            {
                ViewData["Error"] = response.ErrorMessage;
                return View(userModel);
            }
        }
    }
}
