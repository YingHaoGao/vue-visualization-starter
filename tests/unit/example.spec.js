import { shallowMount } from '@vue/test-utils';
import Test from '@/components/Test.vue';

describe('Test.vue', () => {
  it('renders props.msg when passed', () => {
    const text = '回到顶部';
    const wrapper = shallowMount(Test, {
      propsData: { text },
    });
    expect(wrapper.text()).toMatch(text);
  });
});
