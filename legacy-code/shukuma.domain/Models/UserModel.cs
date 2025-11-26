namespace shukuma.domain.Models
{
    public class UserModel
    {
        public string FirstName { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public string CompletedBy { get; set; } = string.Empty;
        public string TimeCompleted { get; set; } = string.Empty;
        public string CardsCompleted { get; set; } = string.Empty;
        public string? Review { get; set; }
    }
}
