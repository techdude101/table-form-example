import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import InputText from '../../src/components/InputText.vue';

Vue.config.productionTip = false;

test('Default values when no props passed', () => {
  const wrapper = shallowMount(InputText);

  const titleLabel = wrapper.find('label');
  expect(titleLabel.text()).toBe('Label');
  expect(titleLabel.attributes('name')).toBe('label-name');

  const inputField = wrapper.find('input');
  expect(inputField.attributes('placeholder')).toBe('Placeholder');
  expect(inputField.attributes('name')).toBe('input-name');
});

test('Label and placeholder are displayed', () => {
  const title = 'Title';
  const placeholder = 'Title Placeholder';
  const tooltip = 'Title Tooltip';
  const inputName = 'title-input';
  const labelName = 'title-label';
  const wrapper = shallowMount(InputText, {
    propsData: {
      labelText: title,
      labelElementName: labelName,
      placeholderText: placeholder,
      tooltipText: tooltip,
      inputElementName: inputName,
    },
  });

  const titleLabel = wrapper.find('label');
  expect(titleLabel.text()).toBe(title);
  expect(titleLabel.attributes('name')).toBe(labelName);

  const inputField = wrapper.find('input');
  expect(inputField.attributes('placeholder')).toBe(placeholder);
  expect(inputField.attributes('name')).toBe(inputName);
});

// TODO: Write test to ensure an event is emitted when the input value changes
// test('Change event is emitted', async () => {
//   const title = 'Title';
//   const placeholder = 'Title Placeholder';
//   const tooltip = 'Title Tooltip';
//   const inputName = 'title-input';
//   const labelName = 'title-label';
//   const wrapper = mount(InputText, {
//     propsData: {
//       labelText: title,
//       labelElementName: labelName,
//       placeholderText: placeholder,
//       tooltipText: tooltip,
//       inputElementName: inputName,
//     },
//   });

//   const titleLabel = wrapper.find('label');
//   expect(titleLabel.text()).toBe(title);
//   expect(titleLabel.attributes('name')).toBe(labelName);

//   const inputField = wrapper.find('input');
//   expect(inputField.attributes('placeholder')).toBe(placeholder);
//   expect(inputField.attributes('name')).toBe(inputName);

//   await wrapper.trigger('keydown.enter');

//   expect(wrapper.emitted()).toHaveProperty('changed');
//   // const changedEvent = wrapper.emitted('changed');
//   // expect(changedEvent).toEqual('a');
// });
