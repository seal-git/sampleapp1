import React from 'react';
import SST2 from "./SST2";
import StoryRouter from 'storybook-react-router';

export default {
  title: 'pages/SST2',
  component: SST2,
  decorators: [StoryRouter()],
};

const Template = (args) => <SST2 {...args} />;

export const Sample = Template.bind({});
Sample.args = {
  // More on composing args: https://storybook.js.org/docs/react/writing-stories/args#args-composition
};