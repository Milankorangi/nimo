// utils/constants.js
export const ROWS_PER_PAGE_OPTIONS = [50, 100, 200, 300];
export const BASE_URL = "https://api.coingecko.com/api/v3";

export const formatNumber = (num) =>
  num ? num.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "-";

export const formatPercentage = (num) =>
  num || num === 0 ? `${num.toFixed(2)}%` : "-";

export const formatDate = (dateString) =>
  dateString ? new Date(dateString).toLocaleDateString() : "-";
