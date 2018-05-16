using Microsoft.AspNetCore.Blazor.Browser.Interop;

namespace BlazorBits.Monaco
{
	public static class Interop
	{
		public static bool EditorInitialize(EditorModel editorModel)
			=> RegisteredFunction.Invoke<bool>("BlazorBits.Monaco.Interop.EditorInitialize", new[] { editorModel });

		public static EditorModel EditorGet(EditorModel editorModel)
			=> RegisteredFunction.Invoke<EditorModel>("BlazorBits.Monaco.Interop.EditorGet", new[] { editorModel });

		public static EditorModel EditorSet(EditorModel editorModel)
			=> RegisteredFunction.Invoke<EditorModel>("BlazorBits.Monaco.Interop.EditorSet", new[] { editorModel });
	}
}
