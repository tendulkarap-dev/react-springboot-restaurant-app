import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid, TextField } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "@testing-library/dom";
import { createEventAction } from "../../State/Restaurant/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400, 
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// initial state (dates as null or dayjs)
const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

export const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = React.useState(initialValues);
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  const {restaurant}=useSelector(store=>store)
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // format dates only when submitting:
    const payload = {
      ...formValues,
      startedAt: formValues.startedAt
        ? formValues.startedAt.format("MMMM DD, YYYY hh:mm A")
        : "",
      endsAt: formValues.endsAt
        ? formValues.endsAt.format("MMMM DD, YYYY hh:mm A")
        : "",
    };

    console.log("submit", payload);
    dispatch(createEventAction({data:formValues,restaurantId:restaurant.usersRestaurant?.id,jwt}))
    setFormValues(initialValues);
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="p-5">
        <Button onClick={handleOpen} variant="contained">
          Create new Events
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} >
                <Grid item xs={12} width={"100%"}>
                  <TextField
                    fullWidth
                    name="image"
                    label="Image URL"
                    variant="outlined"
                    onChange={handleFormChange}
                    value={formValues.image}
                  />
                </Grid>

                <Grid item xs={12}width={"100%"}>
                  <TextField
                    fullWidth
                    name="location"
                    label="Location"
                    variant="outlined"
                    onChange={handleFormChange}
                    value={formValues.location}
                  />
                </Grid>

                <Grid item xs={12}width={"100%"}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Event name"
                    variant="outlined"
                    onChange={handleFormChange}
                    value={formValues.name}
                  />
                </Grid>

                <Grid item xs={12} size={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                      label="Start Date & Time"
                      value={formValues.startedAt} // ✅ dayjs or null
                      onChange={(newValue) =>
                        setFormValues({ ...formValues, startedAt: newValue })
                      }
                      renderInput={(params) => (
                        <TextField {...params}  />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} size={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="End Date & Time"
                      value={formValues.endsAt}// ✅ dayjs or null
                      onChange={(newValue) =>
                        setFormValues({ ...formValues, endsAt: newValue })
                      }
                      renderInput={(params) => (
                        <TextField {...params}  />
                      )}
                     
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
