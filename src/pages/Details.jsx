import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinDetails } from "../services/api";
import {
  Container,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Paper,
  Grid,
  Divider,
  useTheme,
} from "@mui/material";
import { formatDate, formatNumber, formatPercentage } from "../utils/constants";

export default function Details() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    getCoinDetails(id).then((res) => setCoin(res.data));
  }, [id]);

  if (!coin) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const marketData = coin.market_data;
  const priceChange24h = marketData.price_change_percentage_24h;
  const priceChangeColor =
    priceChange24h > 0 ? theme.palette.success.main : theme.palette.error.main;

  const quickStats = [
    ["Market Cap", `$${formatNumber(marketData.market_cap.usd)}`],
    ["24h Volume", `$${formatNumber(marketData.total_volume.usd)}`],
    ["Circulating Supply", formatNumber(marketData.circulating_supply)],
    ["Max Supply", formatNumber(marketData.max_supply)],
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={3}
        >
          <Avatar
            src={coin.image.large}
            alt={coin.name}
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {coin.name} ({coin.symbol.toUpperCase()})
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h5" fontWeight="bold">
                ${formatNumber(marketData.current_price.usd)}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: priceChangeColor }}>
                {formatPercentage(priceChange24h)}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Market Cap Rank: #{coin.market_cap_rank}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Main information*/}
        <Grid container spacing={2}>
          {quickStats.map(([label, value], idx) => (
            <Grid item xs={6} md={3} key={idx}>
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {label}
                </Typography>
                <Typography variant="subtitle1" fontWeight="500">
                  {value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Description */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            About {coin.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            dangerouslySetInnerHTML={{
              __html: coin.description.en.split(". ")[0] + ".",
            }}
          />
        </Box>

        {/* Market Data */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Market Data
          </Typography>
          <Grid container spacing={2}>
            {[
              [
                "24h High / Low",
                `$${formatNumber(marketData.high_24h.usd)} / $${formatNumber(
                  marketData.low_24h.usd
                )}`,
              ],
              [
                "All-Time High",
                `$${formatNumber(marketData.ath.usd)} (${formatDate(
                  marketData.ath_date.usd
                )})`,
              ],
              [
                "All-Time Low",
                `$${formatNumber(marketData.atl.usd)} (${formatDate(
                  marketData.atl_date.usd
                )})`,
              ],
            ].map(([label, value], idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box
                  sx={{
                    p: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    backgroundColor: theme.palette.grey[50],
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="500">
                    {value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
