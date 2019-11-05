import { shallowMount } from '@vue/test-utils';
import runListener from '../../core/router/runListener';

describe('Listeners', () => {
  it('--', async () => {
    const listeners = '';
    const to = {};
    const from = {};
    const next = () => 'next';
    const context = {};
    const final = await runListener(['documentTitle'], context, to, from, next);
    expect(final).toMatch(false);
  });
});
