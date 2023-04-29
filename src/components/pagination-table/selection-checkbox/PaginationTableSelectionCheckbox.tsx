import Checkbox from "@mui/material/Checkbox";
import React, { HTMLProps } from "react";

interface PaginationTableSelectionCheckboxProps {
  indeterminate?: boolean | undefined & HTMLProps<HTMLInputElement>
  disabled?: boolean | undefined
  checked?: boolean | undefined
  onChange?: React.FormEventHandler<HTMLInputElement> | undefined
}

function PaginationTableSelectionCheckbox({
  indeterminate,
  disabled,
  checked,
  onChange
}: PaginationTableSelectionCheckboxProps) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <Checkbox
      inputRef={ref}
      indeterminate={indeterminate}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
    />
  );
}

export default PaginationTableSelectionCheckbox;
