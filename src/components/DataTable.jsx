import { useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Skeleton,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useNavigate } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const headCells = [
    { id: "image", numeric: false, label: "" },
    { id: "name", numeric: false, label: "Name" },
    { id: "symbol", numeric: false, label: "Symbol" },
    { id: "current_price", numeric: true, label: "Price ($)" },
    { id: "market_cap", numeric: true, label: "Market Cap ($)" },
    {
      id: "price_change_percentage_24h",
      numeric: true,
      label: "24h Change (%)",
    },
  ];

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar sx={{ pl: 2, pr: 1 }}>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Cryptocurrency Market Prices
      </Typography>
    </Toolbar>
  );
}

export default function DataTable({
  cryptoData,
  global,
  page,
  rowsPerPage,
  loading,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("market_cap");
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Memoize sorted rows
  const sortedRows = useMemo(() => {
    return cryptoData.slice().sort(getComparator(order, orderBy));
  }, [cryptoData, order, orderBy]);

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {loading ? (
                Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="circular" width={25} height={25} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="100px" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="60px" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton width="80px" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton width="100px" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton width="60px" />
                    </TableCell>
                  </TableRow>
                ))
              ) : sortedRows.length > 0 ? (
                sortedRows.map((coin) => (
                  <TableRow
                    key={coin.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/coins/${coin.id}`)}
                  >
                    <TableCell>
                      <img
                        src={coin.image}
                        alt={coin.name}
                        width="25"
                        height="25"
                      />
                    </TableCell>
                    <TableCell>{coin.name}</TableCell>
                    <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                    <TableCell align="right">
                      ${coin.current_price.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      ${coin.market_cap.toLocaleString()}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color:
                          coin.price_change_percentage_24h > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {cryptoData.length > 0 && (
          <TablePagination
            component="div"
            count={global.data?.active_cryptocurrencies || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[50, 100, 200, 300]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
}
