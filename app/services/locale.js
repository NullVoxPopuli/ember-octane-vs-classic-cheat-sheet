import Service, { inject as service } from '@ember/service';

import ENV from 'ember-cheat-sheet/config/environment';

/*
  To help with maintenance, please list
  the supported locales in alphabetical order.
*/
export const supportedLocales = new Set(['en-US', 'eo', 'es', 'fr-FR', 'ja', 'pt-BR', 'tr']);

export default class LocaleService extends Service {
  @service intl;

  menuOptions = Array.from(supportedLocales)
    .map((locale) => {
      return {
        label: this.intl.t(`component.locale-menu.locale-${locale}`).toString(),
        value: locale,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label, this.intl.primaryLocale));

  async updateSiteLocale(locale) {
    if (!supportedLocales.has(locale)) {
      return;
    }

    let translationPath = `translations/${locale.toLowerCase()}.json`;

    if (ENV.environment === 'production') {
      let assetMap = await fetch('/assets/assetMap.json');
      let assetMapJson = await assetMap.json();

      translationPath = assetMapJson.assets[translationPath];
    }

    let translations = await fetch(`/${translationPath}`);
    let translationsJson = await translations.json();

    this.intl.addTranslations(locale, translationsJson);

    this.intl.setLocale(locale);
  }
}
