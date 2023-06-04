import { useState } from 'react';
import Select, { SelectOption } from './Select';
import { createUseStyles, } from 'react-jss';

const useStyles = createUseStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box'
    },
  },
  app: {
    display: 'flex',
    padding: 24,
  },
});

const baseOptions: SelectOption[] = [
  { value: 'Education' },
  { value: 'Science' },
  { value: 'Art' },
  { value: 'Sport' },
  { value: 'Games' },
  { value: 'Health' },
];

const options: SelectOption[] = [
  ...baseOptions,
  ...baseOptions.map(({ value }) => ({ value: 'new ' + value })),
  ...baseOptions.map(({ value }) => ({ value: 'advanced ' + value })),
];

function App() {
  const classes = useStyles();
  const [value, setValue] = useState('Science');
  const handleChange = (o: SelectOption) => {
    setValue(o.value);
  };
  return (
    <>
      <div className={classes.app}>
        <Select {...{ value, options }} onChange={handleChange} />
      </div>
    </>
  );
}

export default App;
