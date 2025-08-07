import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCoinDetails } from '../services/api';

const Details = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    getCoinDetails(id).then((res) => setCoin(res.data));
  }, [id]);

  if (!coin) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
      <img src={coin.image.large} alt={coin.name} width={80} />
      <p><strong>Market Cap Rank:</strong> {coin.market_cap_rank}</p>
      <p><strong>Current Price (USD):</strong> ${coin.market_data.current_price.usd.toLocaleString()}</p>
      <p><strong>Description:</strong></p>
      <div dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ')[0] + '.' }} />
    </div>
  );
};

export default Details;
