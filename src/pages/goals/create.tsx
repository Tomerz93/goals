import { Button, Input } from '@components/UI';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';

const INPUT_DATA = {
  title: {
    name: 'title',
    type: 'text',
  },
};

const CreateGoal: NextPage = () => {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <h1>Create Goal</h1>
      <form>
        <Input name="title" type="text" mode="uncontrolled" />
        <Input name="description" type="textarea" mode="uncontrolled" />
        <Input
          name="completion_date"
          labelText="Estimated Completion Date"
          type="date"
          mode="uncontrolled"
        />
        <Input name="categories" type="text" mode="uncontrolled" />
        <Input name="steps" type="text" mode="uncontrolled" />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default CreateGoal;
