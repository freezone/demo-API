using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] // /api/transactions

public class TransactionsController: ControllerBase
{
    private readonly DataContext _context;

    public TransactionsController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
    {
        var transactions = await _context.Transactions.ToListAsync();

        return transactions;
    }

    [HttpGet("{id}")] // /api/transactions/1
    public async Task<ActionResult<Transaction>> GetTransaction(int id)
    {
        return await _context.Transactions.FindAsync(id);
    }
}
