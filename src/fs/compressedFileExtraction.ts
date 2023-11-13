const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

export const extractConfigFromWar = (warFilePath: string, outputFolderPath: string) => {
	const zip = new AdmZip(warFilePath);
	const zipEntries = zip.getEntries();

	// Extract .json files from 'config/' folder
	const configFiles = zipEntries.filter(
		(entry: any) => entry.entryName.startsWith('config/') && entry.entryName.endsWith('.json')
	);
	configFiles.forEach((file: any) => {
		const filePath = path.join(outputFolderPath, path.basename(file.entryName));
		zip.extractEntryTo(file, outputFolderPath, false, true);
		console.log(`Extracted .json file: ${filePath}`);
	});

	// Extract .schema files from 'config/schema/' subfolder
	const schemaFiles = zipEntries.filter(
		(entry: any) => entry.entryName.startsWith('config/schema/') && entry.entryName.endsWith('.schema')
	);
	schemaFiles.forEach((file: any) => {
		const filePath = path.join(outputFolderPath, 'schema', path.basename(file.entryName));
		// Ensure the output folder structure exists
		const fileDirectory = path.dirname(filePath);
		if (!fs.existsSync(fileDirectory)) {
			fs.mkdirSync(fileDirectory, { recursive: true });
		}
		zip.extractEntryTo(file, fileDirectory, false, true);
		console.log(`Extracted .schema file: ${filePath}`);
	});

	console.log('Extraction complete.');
};
