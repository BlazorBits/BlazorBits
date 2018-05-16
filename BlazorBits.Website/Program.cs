using Microsoft.AspNetCore.Blazor.Browser.Rendering;
using Microsoft.AspNetCore.Blazor.Browser.Services;

namespace BlazorBits.Website
{
	internal static class Program
	{
		private static void Main()
		{
			var serviceProvider = new BrowserServiceProvider(_ =>
			{
				// Add any custom services here
			});

			new BrowserRenderer(serviceProvider).AddComponent<App>("app");
		}
	}
}
