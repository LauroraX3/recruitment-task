import Button from "@mui/material/Button";
import { date, number, object, string } from "yup";
import styles from "./PersonForm.module.scss";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Form, Formik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { InputLabel } from "@mui/material";
import DarkTurquoiseTextField from "../../../themes/mui-textfield-themes";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { addPerson } from "../../../reducers/PersonReducer";
import Person from "../../../models/Person";
import moment from "moment";

interface FormData {
  name: string;
  age: number;
  birthDate: Date | null;
  biography: string;
}

const initialValues: FormData = {
  name: "",
  age: 1,
  birthDate: null,
  biography: "",
};

let personSchema = object({
  name: string().required(),
  age: number().min(1).required().positive().integer(),
  birthDate: date().required(),
  biography: string().max(250).nullable(),
});

const PersonForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [t] = useTranslation();

  return (
    <div className={`${styles["person-form"]}`}>
      <Formik
        initialValues={initialValues}
        validationSchema={personSchema}
        onSubmit={(values: FormData) => {
          const newPerson: Person = {
            name: values.name,
            age: values.age,
            birth_date: moment(new Date(values.birthDate!)).format(
              "DD/MM/YYYY"
            ),
            biography: values.biography,
          };
          dispatch(addPerson(newPerson));
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className={`${styles["person-form__form"]}`}>
            <InputLabel htmlFor={"name"}>dsds</InputLabel>

            <DarkTurquoiseTextField
              id="name"
              variant="outlined"
              label={t("form.personName")}
              placeholder={`${t("form.enterPersonName")}`}
              InputLabelProps={{ shrink: true }}
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            ></DarkTurquoiseTextField>
            <DarkTurquoiseTextField
              id="age"
              type="number"
              variant="outlined"
              label={t("form.personAge")}
              placeholder={`${t("form.enterPersonAge")}`}
              InputLabelProps={{ shrink: true }}
              value={values.age}
              onChange={(e) => setFieldValue("age", e.target.value)}
              error={touched.age && !!errors.age}
              helperText={touched.age && errors.age}
            ></DarkTurquoiseTextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label={t("form.personBirthDate")}
                value={values.birthDate}
                onChange={(value) => setFieldValue("birthDate", value, true)}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    id: "birthDate",
                    sx: {
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
                    },
                    error: touched.birthDate && !!errors.birthDate,
                    helperText: errors.birthDate === undefined ? '' : `${
                      touched.birthDate &&
                      errors.birthDate
                    }`,
                    placeholder: "DD/MM/YYYY",
                    InputLabelProps: { shrink: true },
                  },
                }}
              />
            </LocalizationProvider>
            <DarkTurquoiseTextField
              id="biography"
              multiline
              minRows={4}
              label={t("form.personBiography")}
              placeholder={`${t("form.enterPersonBiography")}`}
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 250 }}
              onChange={(e) => setFieldValue("biography", e.target.value)}
            ></DarkTurquoiseTextField>
            <Button type="submit" variant="contained" color="darkTurquoise">
              {t("form.addPersonData")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonForm;
