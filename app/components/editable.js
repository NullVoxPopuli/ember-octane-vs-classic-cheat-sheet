import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

import { trackedFunction } from 'ember-resources/util/function';

export default class Editable extends Component {
  code = trackedFunction(this, async () => {
    let { path, code } = this.args;

    if (code) return wrap(code);

    let response = await fetch(`/${path}`);
    let text = await response.text();

    return wrap(text);
  });

  get lines() {
    return this.code.value?.split(encodeURIComponent('\n'))?.length ?? 7;
  }

  get host() {
    if (window.location.host.includes('localhost')) {
      return 'http://localhost:4200';
    }

    return 'https://limber.glimdown.com/edit';
  }

  get title() {
    return this.args.title ?? guidFor(this.code);
  }
}

function wrap(code) {
  const params = new URLSearchParams();

  let sample = '' + code + '';

  params.set('t', sample);
  params.set('format', 'gjs');

  return params.toString();
}
