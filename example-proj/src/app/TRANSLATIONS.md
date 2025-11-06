This project is configured to use Transloco for translations.

Files added:
- `src/assets/i18n/en.json`
- `src/assets/i18n/bg.json`

How it works (examples):

1) In templates (HTML)

Use the `transloco` pipe to translate keys inline:

  <h1>{{ 'home.title' | transloco }}</h1>

You can also translate attributes using the `transloco` directive:

  <a [transloco]="'home.cta.primary'" class="gjs-t-button primary-button"></a>

2) In TypeScript

Inject `TranslocoService` and call `translate` or `selectTranslate`:

  constructor(private transloco: TranslocoService) {}

  const title = this.transloco.translate('home.title');

  // or async stream
  this.transloco.selectTranslate('home.title').subscribe(value => console.log(value));

3) Toggling language

The navbar has a language button (`.language-button`). We attach a click handler at runtime
in the `NavbarComponent` which toggles between `en` and `bg` and updates the button label.

4) Adding new languages

- Add a new JSON file under `src/assets/i18n/{lang}.json` with the same key structure.
- Update the available languages in `src/app/app.config.ts` (TRANSLOCO_CONFIG -> availableLangs).

5) Notes

- Transloco is loaded from `/assets/i18n/{lang}.json`. Ensure `angular.json` copies `src/assets` to the build output (this project already includes assets configuration).
- If you prefer lazy-loading translations per route or module, Transloco supports per-module loaders (see Transloco docs).

If you want, I can also wire the templates to use the `transloco` pipe for the main page strings (I avoided altering HTML per your request).