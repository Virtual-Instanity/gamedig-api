```csharp
using System;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

namespace ConsoleApp1;

class ConsoleApp1
{
    private static async Task Main(string[] args)
    {
        const string apiUrl = "http://127.0.0.1:3000/api/query";
        const string apiToken = "your_api_token";
        
        var requestData = new
        {
            type = "counterstrike16",
            host = "127.0.0.1",
            port = 27015
        };
        
        var jsonData = JsonConvert.SerializeObject(requestData);
        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        using var client = new HttpClient();
        
        client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiToken);

        try
        {
            var response = await client.PostAsync(apiUrl, content);
            
            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Response:");
                Console.WriteLine(responseBody);
            }
            else
            {
                Console.WriteLine($"Request failed. Status code: {response.StatusCode}");
                var errorBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error: {errorBody}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
}```