namespace API.Entities;

public class Transaction
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int PeriodYear { get; set; }
    public int PeriodMonth { get; set; }
    public float Amount {get; set; }
    public int UserId { get; set; }
}
