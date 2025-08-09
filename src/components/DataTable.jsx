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
import { ROWS_PER_PAGE_OPTIONS } from "../utils/constants";

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
    { id: "name", numeric: false, label: "Coin" },
    { id: "current_price", numeric: true, label: "Price ($)" },
    { id: "market_cap", numeric: true, label: "Market Cap ($)" },
    { id: "max_supply", numeric: true, label: "Max Supply" },
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
              sx={{ color: "#000", fontWeight: "700" }}
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
    <Toolbar sx={{ pr: 1, "&.MuiToolbar-root": { pl: 0 } }}>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h5"
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
      <Paper sx={{ width: "100%", mb: 2, boxShadow: "none" }}>
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Skeleton variant="circular" width={25} height={25} />
                        <Skeleton width="100px" />
                        <Skeleton width="100px" />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        <Skeleton width="60px" />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        <Skeleton width="80px" />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        <Skeleton width="100px" />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        <Skeleton width="60px" />
                      </Box>
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <img
                          src={coin.image}
                          alt={coin.name}
                          width="25"
                          height="25"
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {coin.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#808080", marginLeft: 1 }}
                        >
                          {coin.symbol.toUpperCase()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      ${coin?.current_price?.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      ${coin?.market_cap?.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {coin?.max_supply
                        ? coin?.max_supply?.toLocaleString()
                        : "Not avil.."}
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
            count={global?.active_cryptocurrencies || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
}
