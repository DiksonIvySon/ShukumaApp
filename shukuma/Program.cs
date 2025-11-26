using shukuma.persistence.firebase;

namespace shukuma
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            
            var config = builder.Configuration;

            //builder.Services.AddPersistenceLayer(config.GetConnectionString("DbConnection"));

            //builder.Services.AddTransient<IUserService, UserService>();
            //builder.Services.AddSingleton<IHashService, HashService>();

            builder.Services.ConnectFirestore(config);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller=Profile}/{action=SignUp}");
                endpoints.MapControllerRoute("sign-in", "{controller=Profile}/{action=SignIn}");
                endpoints.MapControllerRoute("profile", "{controller=Profile}/{action=Exercise}");
            });

            app.Run();
        }
    }
}