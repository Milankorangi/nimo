// pages/Home.jsx
import { useEffect, useState } from "react";
import { getCoinsGlobal, getCoinsList } from "../services/api";
import { Typography } from "@mui/material";
import DataTable from "../components/DataTable";

const Home = () => {
  const [global, setGlobal] = useState({});
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(0);
  const [perpage, setPerPage] = useState(100);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCoinsGlobal()
      .then((response) => {
        setGlobal(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch global data:", error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getCoinsList(perpage, page + 1)
      .then((response) => {
        setCoins(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch coins:", error);
        setCoins([]);
        setLoading(false);
      });
  }, [perpage, page]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Cryptocurrency Market
      </Typography>
      <DataTable
        cryptoData={coins}
        loading={loading}
        global={global}
        page={page}
        rowsPerPage={perpage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Home;
