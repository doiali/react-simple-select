import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import IconChevronUp from './icons/chevron-up-solid.svg';
import IconChevronDown from './icons/chevron-down-solid.svg';
import IconCheck from './icons/check-solid.svg';
import ClickAwayListener from 'react-click-away-listener';


type StyleProps = {
  open?: boolean;
};
const useStyles = createUseStyles(() => ({
  select: {
    minWidth: 300,
    position: 'relative',
  },
  dropdown: ({ open }: StyleProps) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1,
    display: open ? 'flex' : 'none',
    flexDirection: 'column',
    padding: 8,
    maxHeight: 300,
    overflow: 'auto',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: 16,
    marginTop: 8,
  }),
  option: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 8,
    cursor: 'pointer',

    '&.active .check': {
      height: 12,
      width: 12,
      backgroundColor: 'rgb(25, 118, 210)',
      mask: `url(${IconCheck}) no-repeat center`,
    },
    '&.active': {
      color: 'rgb(25, 118, 210)',
    },
    '&.active, &:hover, &:focus, &:focus-visible': {
      backgroundColor: 'rgba(25, 118, 210, 0.07)',
      outline: 'none',
    }
  }),
  selectBox: ({ open }: StyleProps) => ({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    border: '1px solid',
    borderColor: 'rgba(0,0,0,0.25)',
    padding: 8,
    ...(open ? {
      borderColor: 'rgb(25, 118, 210)',
      borderWidth: 2,
      outline: 'rgba(25, 118, 210, 0.25) solid 3px',
    } : {}),

    '&:hover': {
      borderColor: 'rgb(25, 118, 210)'
    },
    '&:focus, &:focus-visible': {
      borderColor: 'rgb(25, 118, 210)',
      borderWidth: 2,
      outline: 'rgba(25, 118, 210, 0.25) solid 3px',
    }
  })
}));

export type SelectOption = {
  value: string;
  label?: string;
};

export type SelectProps = {
  value: string;
  options: SelectOption[];
  onChange: (o: SelectOption) => void;
  placeholder?: string;
};

export function Select({ value, options, placeholder, onChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open });
  return (
    <>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div className={classes.select}>
          <div
            onClick={() => setOpen(p => !p)}
            onKeyDown={(e) => { if (e.key === 'Enter') setOpen(p => !p); }}
            className={classes.selectBox}
            tabIndex={0}
            role="button"
          >
            <span>
              {value ?? placeholder}
            </span>
            <img width={12} height={12} src={open ? IconChevronUp : IconChevronDown} />
          </div>
          <div className={classes.dropdown}>
            {options.map(o => {
              return (
                <div
                  role="button"
                  tabIndex={0}
                  className={classes.option + (o.value === value ? " active" : "")}
                  key={o.value}
                  data-value={o.value}
                  onClick={() => { onChange(o); }}
                  onKeyUp={(e) => { if (e.key === 'Enter') { onChange(o), setOpen(false); } }}
                >
                  {o.value === value
                    ? `Yeeeah, ${(o.label ?? o.value).toLowerCase()}!`
                    : (o.label ?? o.value)
                  }
                  <span className='check' />
                </div>
              );
            })}
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
}

export default Select;
