"use client";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Image from "next/image";
import { Fragment, MouseEvent, useEffect, useState } from "react";

type RowProps = {
  row: Root2;
  actions: string[];
  onActionClick: (action: string, row: any) => void;
};

export type Root = Root2[];

export interface Root2 {
  id: number;
  fields: Field[];
  details: Detail[];
}

export interface Field {
  key: string;
  value: any;
}

export interface Detail {
  key: string;
  value: any;
}

function Row({ row, actions, onActionClick }: RowProps) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Image
                src={"/tablecolapse.svg"}
                height={15}
                width={15}
                alt={"."}
              />
            ) : (
              <Image
                src={"/tableexpand.svg"}
                height={15}
                width={15}
                alt={"."}
              />
            )}
          </IconButton>
        </TableCell>
        {row?.fields?.map((item, index) => (
          <TableCell key={index} align="right">
            {item?.value}
          </TableCell>
        ))}

        <TableCell align="right">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {actions.map((action) => (
              <MenuItem
                key={action}
                onClick={() => {
                  onActionClick(action, row);
                  handleMenuClose();
                }}
              >
                {action}
              </MenuItem>
            ))}
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={row?.fields?.length + 2}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableBody>
                  {row?.details?.map((desc, descIndex) => (
                    <TableRow key={descIndex}>
                      <TableCell component="th" scope="row">
                        {desc?.key}
                      </TableCell>
                      <TableCell> {desc?.value} </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

type DynamicTableProps = {
  headers?: { Header: string; accessor: string }[];
  fetchData?: () => Promise<any>;
  actions: string[];
  onActionClick: (action: string, row: any) => void;
};

export default function DynamicTable({
  headers,
  actions,
  onActionClick,
}: DynamicTableProps) {
  const [rows, setRows] = useState<Root>([
    {
      id: 1,
      fields: [
        { key: "name", value: "John Doe" },
        { key: "age", value: 30 },
      ],
      details: [
        { key: "Address", value: "123 Main St" },
        { key: "Phone", value: "555-1234" },
      ],
    },
    {
      id: 2,
      fields: [
        { key: "name", value: "Jane Smith" },
        { key: "age", value: 25 },
      ],
      details: [
        { key: "Address", value: "456 Oak Ave" },
        { key: "Phone", value: "555-5678" },
      ],
    },
    {
      id: 3,
      fields: [
        { key: "name", value: "Jane Smith" },
        { key: "age", value: 25 },
      ],
      details: [
        { key: "Address", value: "456 Oak Ave" },
        { key: "Phone", value: "555-5678" },
      ],
    },
    {
      id: 4,
      fields: [
        { key: "name", value: "Jane Smith" },
        { key: "age", value: 25 },
      ],
      details: [
        { key: "Address", value: "456 Oak Ave" },
        { key: "Phone", value: "555-5678" },
      ],
    },
    {
      id: 5,
      fields: [
        { key: "name", value: "Jane Smith" },
        { key: "age", value: 25 },
      ],
      details: [
        { key: "Address", value: "456 Oak Ave" },
        { key: "Phone", value: "555-5678" },
      ],
    },
  ]);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {rows?.[0]?.fields?.map((header, index) => (
              <TableCell key={index} align="right">
                {header.key}
              </TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((item, indexx) => (
            <Row
              key={item?.id}
              row={item}
              actions={actions}
              onActionClick={onActionClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
