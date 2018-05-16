var BlazorEditors = [];
Blazor.BlazorEditors = BlazorEditors;

Blazor.registerFunction('BlazorBits.Monaco.Interop.EditorInitialize', (editorModel) => {
	console.debug(`Registering new editor ${editorModel.Id}...`);
	let thisEditor = monaco.editor.create(document.getElementById(editorModel.Id), {
		value: editorModel.Script,
		language: editorModel.Language,
		automaticLayout: true
	});

	if (BlazorEditors.find(e => e.id === editorModel.Id)) {
		console.error(`Refused to register duplicate editor ${editorModel.Id}`);
	}
	else {
		console.debug(`Registered new editor ${editorModel.Id}`);
		BlazorEditors.push({ id: editorModel.Id, editor: thisEditor });
	}

	return true;
});

Blazor.registerFunction('BlazorBits.Monaco.Interop.EditorGet', (editorModel) => {
	console.debug(`Getting editor for ${editorModel.Id}...`);
	let myEditor = BlazorEditors.find(e => e.id === editorModel.Id);
	console.debug(`Found: ${myEditor}`);
	if (!myEditor) {
		throw `Could not find a editor with id: '${editorModel.Id}'`;
	}

	// Update the model
	editorModel.Script = myEditor.editor.getValue();

	return editorModel;
});

Blazor.registerFunction('BlazorBits.Monaco.Interop.EditorSet', (editorModel) => {
	console.debug(`Setting editor for ${editorModel.Id}...`);
	let myEditor = BlazorEditors.find(e => e.id === editorModel.Id);
	console.debug(`Found: ${myEditor}`);
	if (!myEditor) {
		throw `Could not find a editor with id: '${editorModel.Id}'`;
	}

	// Update the editor
	myEditor.editor.setValue(editorModel.Script);
	console.debug(`Setting value to success.`);

	return editorModel;
});
