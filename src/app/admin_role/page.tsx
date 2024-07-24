"use client";
import React, { useEffect, useState } from "react";
// import "../../pages/transactions/transaction.css";

import { CSVLink, CSVDownload } from "react-csv";
// import XLSX from "xlsx";
import * as XLSX from "xlsx";
import { usePDF } from "react-to-pdf";
import { useReactToPrint } from "react-to-print";

// import Search from "../../assets/images/Search.svg";
// import filter from "../../assets/images/filterIcon.svg";
// import filterCancel from "../../assets/images/filtercancelweb1.svg";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Button,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
// import ButtonComponent from "../../components/buttons/buttonComponent";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import singlePayout from "../../assets/images/singlepayoutweb1.svg";
import bulkPayout from "../../assets/images/bulkpayoutweb1.svg";
import linkPayout from "../../assets/images/linkpayoutweb1.svg";
import scheduledPayout from "../../assets/images/sheduledpayoutweb1.svg";
import { isToken } from "typescript";
// import { useAuth } from "../../context/token/tokenContext";
// import nodata from "../../assets/images/NODATA.svg";
import {
  calculatePagination,
  calculatePaginationRows,
} from "../../utils/paginationNumbers";
import TooltipCopy from "@/components/tooltip/tooltip";
import dayjs from "dayjs";
import CollapsibleTable from "@/components/table/expandableTable";
import Image from "next/image";

interface apiBody {
  from_date?: string;
  to_date?: string;
  page_no?: number | string;
  ttl_no_of_result?: number | string;
  status?: string;
}

function Settlements() {
  // const {
  //   isLoggedIn,
  //   isKYCCompleted,
  //   isToken,
  //   setIsToken,
  //   setIsLoggedIn,
  //   setIsKYCCompleted,
  // } = useAuth();

  const { toPDF, targetRef } = usePDF({ filename: "settlement.pdf" });

  const [rowsPerPage, setRowsPerPage] = useState("10"); //rowsperpage

  const [settlementData, setSettlementData] = useState([]);
  const [settlementHeader, setSettlementHeader] = useState([]);
  const [settlementBody, setSettlementBody] = useState<apiBody>({
    page_no: 1,
    ttl_no_of_result: 10,
  });
  const [page, setPage] = React.useState(1);
  const [searchedData, setSearchedData] = useState([]);
  const [totalTableData, setTotalTableData] = useState("");

  const [filterPopup, setFilterPopup] = useState(false);
  const [selectedTxnStatus, setSelectedTxnStatus] = useState<
    string | undefined
  >("All");
  const [selectedViewType, setSelectedViewType] = useState<string | undefined>(
    "Today"
  );

  const [selectedSettlementChips, setSelectedSettlementChips] = useState<
    string[]
  >([]);
  const [selectedPayoutChips, setSelectedPayoutChips] = useState<string[]>([]);

  const [searchedQuery, setSearchedQuery] = useState("");

  const [selectedStartDate, setSelectedStartDate] =
    useState<dayjs.Dayjs | null>(dayjs());
  const [selectedEndDate, setSelectedEndDate] = useState<dayjs.Dayjs | null>(
    dayjs()
  );

  const handleStartDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedStartDate(newValue);
  };

  const handleEndDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue?.isBefore(selectedStartDate)) {
      setSelectedEndDate(selectedStartDate);
    } else {
      setSelectedEndDate(newValue);
    }
  };

  const handleFIlterPopup = () => {
    setFilterPopup(!filterPopup);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSettlementBody({
      ...settlementBody,
      page_no: value,
      ttl_no_of_result: rowsPerPage,
    });
  };

  // const addChips = (value: string | null) => {
  //   if (value) {
  //     if (selectedTxnStatus && selectedViewType) {
  //       setSelectedChips((prevChips) => [selectedTxnStatus, selectedViewType]);
  //     }
  //   }
  // };

  const addSettlementChips = () => {
    if (selectedTxnStatus && selectedViewType) {
      setSelectedSettlementChips([
        selectedTxnStatus,
        selectedViewType,
        `${selectedStartDate ? selectedStartDate.format("YYYY-MM-DD") : ""} - ${
          selectedEndDate ? selectedEndDate.format("YYYY-MM-DD") : ""
        }`,
      ]);
    }
  };
  const addPayoutChips = () => {
    if (selectedTxnStatus && selectedViewType) {
      setSelectedPayoutChips([selectedTxnStatus, selectedViewType]);
    }
  };

  const removeSettlementChips = (chipIndex: number) => {
    setSelectedSettlementChips((prevChips) =>
      prevChips.filter((_, index) => index !== chipIndex)
    );
  };
  const removePayoutChips = (chipIndex: number) => {
    setSelectedPayoutChips((prevChips) =>
      prevChips.filter((_, index) => index !== chipIndex)
    );
  };

  const clearSettlementFilter = () => {
    setSelectedSettlementChips([]);
    setSettlementBody({
      page_no: 1,
      ttl_no_of_result: 10,
    });
  };

  const changeTxnStatus = (event: { target: { value: string } }) => {
    setSelectedTxnStatus(event.target.value);
    // addChips(event.target.value);
  };

  const changeViewType = (event: { target: { value: string } }) => {
    setSelectedViewType(event.target.value);
    // addChips(event.target.value);
  };

  const applySettlementFilter = () => {
    addSettlementChips();
    setFilterPopup(false);

    if (selectedTxnStatus !== "All") {
      setSettlementBody({
        page_no: page,
        ttl_no_of_result: 10,
        from_date: selectedStartDate
          ? selectedStartDate.format("YYYY-MM-DD")
          : "",
        to_date: selectedEndDate ? selectedEndDate.format("YYYY-MM-DD") : "",
        status: selectedTxnStatus,
      });
    } else {
      setSettlementBody({
        page_no: page,
        ttl_no_of_result: 10,
        from_date: selectedStartDate
          ? selectedStartDate.format("YYYY-MM-DD")
          : "",
        to_date: selectedEndDate ? selectedEndDate.format("YYYY-MM-DD") : "",
      });
    }
  };

  const applyPayoutFilter = () => {
    addPayoutChips();
    setFilterPopup(false);
  };

  const downloadable = [
    { key: "1", type: "CSV" },
    { key: "2", type: "Copy" },
    { key: "3", type: "Excel" },
    { key: "4", type: "PDF" },
    { key: "5", type: "Print" },
    // { key: "5", type: "Column Visibility" },
  ];

  const searchTransactions = (transactions: any, query: string): any => {
    setSearchedQuery(query);
    query = query.toLowerCase();
    const data = transactions.filter((transaction: any) => {
      // Check if any property of the transaction contains the search query
      return Object.values(transaction).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(query);
        }
        return false;
      });
    });
    setSearchedData(data);
  };

  const getSettlementData = async () => {
    try {
      const response = await fetch(
        `https://vaamoz.com/vampayUserAppNew/Web/GetSettlementDashboardData`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Token: isToken,
            Origin: "https://vaamoz.com",
          },
          body: JSON.stringify(settlementBody),
        }
      );
      const data = await response.json();
      setSettlementHeader(data.data.Payin_header);
      if (data.status) {
        setSettlementData(data.data.Payin_list);
        setSearchedData(data.data.Payin_list || []);
        setTotalTableData(data?.data?.Total_count[0]?.ttlrecord);
      }
      if (data.data.token) {
        // setIsToken(data.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downloadExcel = (data: any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
  });

  const copyTableDataToClipboard = () => {
    const table = targetRef.current; // Get reference to the table container element

    if (table) {
      const range = document.createRange();
      range.selectNode(table);

      window.getSelection()?.removeAllRanges(); // Clear current selection
      window.getSelection()?.addRange(range); // Select the table
      document.execCommand("copy"); // Copy to clipboard

      // Clean up selection
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleChangePage = (event: SelectChangeEvent) => {
    setPage(1);
    setRowsPerPage(event.target.value as string);
    setSettlementBody({
      ...settlementBody,
      ttl_no_of_result: event.target.value,
      page_no: 1,
    });
  };

  useEffect(() => {
    getSettlementData();
  }, [settlementBody]);

  const fetchTableData = async () => {
    const response = await fetch("/your-api-endpoint");
    const data = response.json();
    return data;
  };

  const handleActionClick = (action: any, row: any) => {
    console.log(`${action} clicked for`, row);
    // Add your action handling logic here
  };

  const headers = [
    { Header: "ID", accessor: "id" },
    { Header: "Merchant ID", accessor: "merchant_id" },
    { Header: "First Name", accessor: "first_name" },
    { Header: "Last Name", accessor: "last_name" },
    { Header: "Order ID", accessor: "order_id" },
    { Header: "Txn ID", accessor: "transaction_id" },
    { Header: "Status", accessor: "status" },
    { Header: "Amount", accessor: "amount" },
    { Header: "Charge", accessor: "charge" },
    { Header: "Payment Time", accessor: "transaction_time" },
  ];

  const actions = ["Edit", "Delete"];

  return (
    <div className="p-4 lg:p-0">
      <div className="  transaction-grid ">
        <div className="p-4 rounded-2xl my-4 ">
          <p className="text-[24px] font-bold text-text-primary">
            All Merchants
          </p>
          <div className="flex flex-col gap-2 my-4 lg:flex-row">
            <div className="flex gap-2">
              <div className="flex lg:w-[270px] border border-[#B9B9B9] bg-white rounded-md px-2 gap-2">
                <Image src={"/search.svg"} height={20} width={20} alt={"."} />
                <input
                  placeholder="Search"
                  className="w-full bg-white outline-none"
                  value={searchedQuery}
                  onChange={(e) =>
                    searchTransactions(settlementData, e.target.value)
                  }
                />
              </div>

              <Button
                onClick={handleFIlterPopup}
                variant="outlined"
                startIcon={
                  <Image
                    src={"/filter1.svg"}
                    height={15}
                    width={15}
                    alt={"."}
                  />
                }
              >
                Filter
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              {[1, 2, 3, 4].map((chip, index) => (
                <div
                  key={index}
                  className="bg-[#F1EAFF] flex gap-1 p-1 px-2 rounded-2xl"
                >
                  <p className="text-[#6769FE]">{"chip"}</p>
                  <button onClick={() => removeSettlementChips(index)}>
                    <Image
                      src={"/filterclose.svg"}
                      height={15}
                      width={15}
                      alt={"."}
                    />
                  </button>
                </div>
              ))}

              {selectedSettlementChips.length > 0 && (
                <div className="bg-[#696969] flex gap-1 p-1 px-2  rounded-2xl ">
                  <button
                    className="text-white text-nowrap"
                    onClick={clearSettlementFilter}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 my-4  ">
            {downloadable?.map((item) => (
              <div key={item.key}>
                {item?.type === "CSV" && (
                  <CSVLink data={searchedData} filename="settlement.csv">
                    <Button variant="contained" sx={{ borderRadius: 10 }}>
                      {item?.type}
                    </Button>
                  </CSVLink>
                )}

                {item?.type === "Excel" && (
                  <Button
                    variant="contained"
                    sx={{ borderRadius: 10 }}
                    onClick={() => downloadExcel(searchedData)}
                  >
                    {item?.type}
                  </Button>
                )}
                {item?.type === "PDF" && (
                  <Button
                    variant="contained"
                    sx={{ borderRadius: 10 }}
                    onClick={() => toPDF()}
                  >
                    {item?.type}
                  </Button>
                )}

                {item?.type === "Print" && (
                  <Button
                    variant="contained"
                    sx={{ borderRadius: 10 }}
                    onClick={handlePrint}
                  >
                    {item?.type}
                  </Button>
                )}

                {item?.type === "Copy" && (
                  <TooltipCopy
                    item={item?.type}
                    copyData={copyTableDataToClipboard}
                  />
                )}

                {item?.type !== "CSV" &&
                  item?.type !== "Excel" &&
                  item?.type !== "PDF" &&
                  item?.type !== "Print" &&
                  item?.type !== "Copy" &&
                  item?.type}
              </div>
            ))}
          </div>
          <div
            className="overflow-scroll border-2 border-border-color-primary   rounded-2xl"
            ref={targetRef}
          >
            <CollapsibleTable
              headers={headers}
              fetchData={fetchTableData}
              actions={actions}
              onActionClick={handleActionClick}
            />
            {/* {searchedData.length === 0 && (
              <div className="flex flex-col items-center justify-center p-4 gap-4">
                <Image src={"/NODATA.svg"} height={35} width={35} alt={"."} />
                <p className="text-[24px] font-bold text-primary text-center text-[#535353]">
                  No Data Found !
                </p>
              </div>
            )} */}
          </div>
          {settlementData.length > 0 && (
            <div className="flex flex-col gap-2 px-3 py-4 sm:items-center sm:justify-between sm:flex-row sm:gap-0">
              <p className="text-[#3D3E40] text-[14px] font-semibold">
                Showing{" "}
                {calculatePaginationRows(
                  totalTableData,
                  page,
                  Number(rowsPerPage)
                )[0] || 1}{" "}
                to{" "}
                {calculatePaginationRows(
                  totalTableData,
                  page,
                  Number(rowsPerPage)
                )[1] || 1}{" "}
                of {totalTableData || 1} Entries
              </p>
              <p className="text-[#3D3E40] text-[14px] font-semibold flex items-center gap-1">
                Rows per page
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rowsPerPage}
                  // label="Age"
                  onChange={handleChangePage}
                  sx={{
                    padding: 0,
                    margin: 0,
                    height: "25px",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6769FE", // Change this to your desired border color when selected
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray", // Default border color
                    },
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </p>

              <Stack spacing={0}>
                <Pagination
                  count={Number(
                    calculatePaginationRows(
                      totalTableData,
                      page,
                      Number(rowsPerPage)
                    )[2]
                  )}
                  page={page}
                  onChange={handleChange}
                  variant="outlined"
                  shape="rounded"
                  color="secondary"
                  onClick={(e) => console.log(e, "qwertyuigfdxcvbnbvcghj")}
                  sx={{
                    "& .MuiPaginationItem-root.Mui-selected": {
                      backgroundColor: "#6769FE",
                      color: "#FFF",
                      borderRadius: 2,
                      borderColor: "#6769FE",
                    },
                    "& .MuiPaginationItem-page.Mui-selected:hover": {
                      backgroundColor: "#6769FE", // Background color when hovered
                    },
                  }}
                />
              </Stack>
            </div>
          )}
        </div>
      </div>

      {filterPopup && (
        <div className="popupFilter  lg:max-w-[700px] lg:w-auto m-auto p-4 sm:p-8 bg-white shadow-2xl lg:p-10 rounded-2xl  text-poppins">
          <div className="flex justify-end">
            <button onClick={handleFIlterPopup}>
              {/* <img src={filterCancel} alt="cross" /> */}
            </button>
          </div>
          <div className="">
            <div>
              <InputLabel htmlFor="role" id="demo-simple-select-label">
                Txn Status:
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="role"
                name="role"
                value={selectedTxnStatus}
                onChange={changeTxnStatus}
                className="w-full my-2"
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Success"}>Success</MenuItem>
                <MenuItem value={"Failed"}>Failed</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel htmlFor="role" id="demo-simple-select-label">
                View Type:
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="role"
                name="role"
                value={selectedViewType}
                // label="Txn Status"
                onChange={changeViewType}
                // onChange={handleChange}
                // onFocus={(e) => (e.target.style.borderColor = "red")}
                className="w-full my-2"
              >
                <MenuItem value={"Today"}>Today</MenuItem>
                <MenuItem value={"Date range"}>Date range</MenuItem>
              </Select>
            </div>

            {selectedViewType === "Date range" && (
              <div>
                <div className="my-2">
                  <InputLabel htmlFor="role" id="demo-simple-select-label">
                    From Date:
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={selectedStartDate}
                      onChange={handleStartDateChange}
                      className="w-full"
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <InputLabel htmlFor="role" id="demo-simple-select-label">
                    To Date:
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={selectedEndDate}
                      onChange={handleEndDateChange}
                      className="w-full"
                    />
                  </LocalizationProvider>
                </div>
              </div>
            )}

            {/* <div className="my-4">
              <ButtonComponent
                buttonText="Apply"
                onClick={applySettlementFilter}
              />
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Settlements;
