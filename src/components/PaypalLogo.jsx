import PaypalLogo from './PaypalLogo';

const cryptoAssets = [
  // Existing assets (Bitcoin, Ethereum, USDC)
  {
    id: 'paypal',
    name: 'PayPal',
    symbol: 'USD',
    balance: '1000.00',
    usdValue: 1000.0,
    icon: <PaypalLogo className="h-6 w-6 text-blue-600" />,
    color: 'bg-blue-100',
    textColor: 'text-blue-600',
    address: 'user@paypal.com', // Example PayPal email
    priceChange: 0,
    history: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  },
];