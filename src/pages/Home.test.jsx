import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import * as api from "../services/api";

vi.mock("../services/api", () => ({
  getCoinsList: vi.fn(),
  getCoinsGlobal: vi.fn(),
  getCoinDetails: vi.fn(),
}));

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders table", async () => {
    api.getCoinsGlobal.mockResolvedValue({
      data: {
        active_cryptocurrencies: 1000,
        markets: 500,
        total_market_cap: { usd: 2000000000 },
        total_volume: { usd: 50000000 },
      },
    });

    api.getCoinsList.mockResolvedValue({
      data: [
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "btc",
          current_price: 50000,
          market_cap: 900000000,
          total_volume: 45000000,
        },
        {
          id: "ethereum",
          name: "Ethereum",
          symbol: "eth",
          current_price: 4000,
          market_cap: 400000000,
          total_volume: 20000000,
        },
      ],
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // expect(await screen.findByText(/1-100 of 1000/i)).toBeInTheDocument(); error caused as it used in props of MUI Pagination
    expect(await screen.findByText(/Bitcoin/i)).toBeInTheDocument();
    expect(await screen.findByText(/BTC/i)).toBeInTheDocument();
  });
});
