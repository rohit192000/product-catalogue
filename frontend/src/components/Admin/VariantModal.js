import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { saveFile1 } from "./AddImage";
const VariantModal = (props) => {
  const style = {
    height: "70%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // FILE UPLOAD
  const [file, setFile] = useState({
    fileName: "",
    file: "",
  });

  const addFile = (e) => {
    saveFile1(e, setFile);
  };

  const addVariant = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    props.setVariants((prevState) => [
      ...prevState,
      {
        color: data.get("color"),
        size: data.get("size"),
        price: data.get("price"),
        description: data.get("description"),
        image: file,
      },
    ]);
  };
  useEffect(() => {
    console.log(props.variants);
  }, [props.variants]);
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add Variant
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={addVariant}>
            <Stack spacing={5}>
              <TextField
                variant="standard"
                type="text"
                label="Color"
                required
                name="color"
              />

              <TextField
                variant="standard"
                type="text"
                label="Size"
                placeholder="Enter size like X, Xl, 34, 32.."
                required
                name="size"
              />

              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                  type="number"
                  required
                  name="price"
                />
              </FormControl>

              <TextField
                id="standard-multiline-flexible"
                label="Add a short description"
                multiline
                maxRows={4}
                variant="standard"
                required
                name="description"
              />
              <TextField
                id="standard-basic"
                variant="outlined"
                type="file"
                sx={{ bgcolor: "ButtonHighlight" }}
                onChange={addFile}
                required
              />
              <Button type="submit" variant="outlined">
                Add Variant
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default VariantModal;
