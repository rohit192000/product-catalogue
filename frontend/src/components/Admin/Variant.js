import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import VariantModal from "./VariantModal";

const Variant = (props) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Variant
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.variants.map((row) => (
              <TableRow key={row.image.fileName}>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.image.fileName}</TableCell>
                <TableCell align="center">{row.size}</TableCell>
                <TableCell align="center">{row.color}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} align="center">
                <VariantModal
                  variants={props.variants}
                  setVariants={props.setVariants}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Variant;
