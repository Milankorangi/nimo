import { render, screen, waitFor } from "@testing-library/react";
import Details from "./Details";
import * as api from "../services/api";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Details Page", () => {
  it("displays coin details from API", async () => {
    vi.spyOn(api, "getCoinDetails").mockResolvedValue({
      data: {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        image: { large: "logo.png" },
        market_cap_rank: 1,
        description: { en: "Bitcoin is digital money." },
        market_data: {
          current_price: { usd: 30000 },
          market_cap: { usd: 500000000 },
          fully_diluted_valuation: { usd: 600000000 },
          total_volume: { usd: 1000000 },
          high_24h: { usd: 31000 },
          low_24h: { usd: 29000 },
          price_change_24h: -500,
          price_change_percentage_24h: -1.5,
          market_cap_change_24h: -1000000,
          market_cap_change_percentage_24h: -0.5,
          circulating_supply: 19000000,
          total_supply: 21000000,
          max_supply: 21000000,
          ath: { usd: 69000 },
          ath_date: { usd: "2021-11-10" },
          ath_change_percentage: { usd: -56.5 },
          atl: { usd: 67.81 },
          atl_date: { usd: "2013-07-06" },
          atl_change_percentage: { usd: 44200 },
          last_updated: new Date().toISOString(),
        },
      },
    });

    render(
      <MemoryRouter initialEntries={["/details/bitcoin"]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Bitcoin \(BTC\)/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/\$30,000/)).toBeInTheDocument();
  });
});
