import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const DarkTurquoiseTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1a3c40",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#1a3c40",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1a3c40",
    },
    "&:hover fieldset": {
      borderColor: "#1a3c40",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1a3c40",
    },
  },
});

export default DarkTurquoiseTextField;
