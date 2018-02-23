// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    defaultLanguage: 'ar-EG',
    supportedLanguages: [
        'en-US',
        'fr-FR',
        'ar-EG'
    ],
    baseUrl: 'http://192.168.153.136:3000/api/admin',
    siteKey: "6LfjtEMUAAAAACnCnaYBFWzW8Id00qVZd3_64ibj"
};

