using System;
using BCrypt.Net;

public class Program
{
    public static void Main()
    {
        string password = "1";
        string hash = BCrypt.Net.BCrypt.HashPassword(password);
        Console.WriteLine($"[HASH_START]{hash}[HASH_END]");
    }
}
