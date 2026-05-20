using System;
using BCrypt.Net;

namespace scratch_hasher
{
    class Program
    {
        static void Main(string[] args)
        {
            string password = "1";
            string hash = BCrypt.Net.BCrypt.HashPassword(password);
            Console.WriteLine($"[HASH_START]{hash}[HASH_END]");
        }
    }
}
