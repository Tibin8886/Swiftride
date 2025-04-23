"use client"

import { useState, useEffect } from "react"
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  QrCode,
  Copy,
  RefreshCw,
  Search,
  Settings,
  Bell,
  ArrowRight,
  Bitcoin,
  Eclipse as Ethereum,
  DollarSign,
  BarChart3,
  Clock,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react"
import { ethers } from "ethers"

// USDC contract ABI (minimal for balanceOf and transfer)
const USDC_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)"
]

const CryptoWallet = () => {
  const [activeTab, setActiveTab] = useState("assets")
  const [showBalance, setShowBalance] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [showQR, setShowQR] = useState(false)
  const [cryptoAssets, setCryptoAssets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [walletAddress, setWalletAddress] = useState("")
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  // Default assets (Bitcoin is UI-only, ETH and USDC are blockchain-synced)
  const defaultAssets = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      balance: "0.0325",
      usdValue: 1950.0,
      icon: <Bitcoin className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-100",
      textColor: "text-orange-500",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      priceChange: 2.4,
      history: [42, 43, 44, 45, 47, 48, 47, 48, 47, 49, 50, 51, 52, 53, 54, 53, 54, 55, 56, 60],
      isBlockchain: false,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      balance: "0.0",
      usdValue: 0.0,
      icon: <Ethereum className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100",
      textColor: "text-purple-500",
      address: "",
      priceChange: -1.2,
      history: [30, 31, 32, 31, 30, 29, 28, 29, 30, 31, 32, 31, 30, 29, 30, 31, 32, 33, 32, 31],
      isBlockchain: true,
    },
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      balance: "0.0",
      usdValue: 0.0,
      icon: <DollarSign className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100",
      textColor: "text-blue-500",
      address: "",
      priceChange: 0.01,
      history: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      isBlockchain: true,
      contractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" // Sepolia USDC
    },
  ]

  // Initialize Web3 provider and MetaMask
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const web3Provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(web3Provider)

      // Handle account changes
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          const signer = await web3Provider.getSigner()
          setSigner(signer)
          setIsConnected(true)
          fetchBalances(accounts[0], web3Provider)
        } else {
          setIsConnected(false)
          setWalletAddress("")
          setSigner(null)
        }
      })

      // Handle chain changes
      window.ethereum.on("chainChanged", () => {
        window.location.reload()
      })
     } 
    else {
      alert("Please install MetaMask to use this wallet")
    }
  }, [])

  // Connect to MetaMask
  const connectWallet = async () => {
    if (provider) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const signer = await provider.getSigner()
        setWalletAddress(accounts[0])
        setSigner(signer)
        setIsConnected(true)
        fetchBalances(accounts[0], provider)
      } catch (error) {
        console.error("Failed to connect MetaMask:", error)
        alert("Failed to connect MetaMask")
      }
    }
  }

  // Fetch ETH and USDC balances
  const fetchBalances = async (address, web3Provider) => {
    try {
      // Fetch ETH balance
      const ethBalance = await web3Provider.getBalance(address)
      const ethBalanceEther = ethers.formatEther(ethBalance)

      // Fetch USDC balance
      const usdcContract = new ethers.Contract(
        defaultAssets.find(a => a.id === "usdc").contractAddress,
        USDC_ABI,
        web3Provider
      )
      const usdcBalanceRaw = await usdcContract.balanceOf(address)
      const usdcDecimals = await usdcContract.decimals()
      const usdcBalance = ethers.formatUnits(usdcBalanceRaw, usdcDecimals)

      // Mock USD conversion (replace with API for production)
      const ethPrice = 3000 // Mock price, use CoinGecko API in production
      const usdcPrice = 1 // USDC is stablecoin

      setCryptoAssets(prevAssets =>
        prevAssets.map(asset => {
          if (asset.id === "ethereum") {
            return {
              ...asset,
              balance: parseFloat(ethBalanceEther).toFixed(4),
              usdValue: (parseFloat(ethBalanceEther) * ethPrice).toFixed(2),
              address,
            }
          } else if (asset.id === "usdc") {
            return {
              ...asset,
              balance: parseFloat(usdcBalance).toFixed(2),
              usdValue: (parseFloat(usdcBalance) * usdcPrice).toFixed(2),
              address,
            }
          }
          return asset
        })
      )
    } catch (error) {
      console.error("Error fetching balances:", error)
      alert("Failed to fetch balances")
    }
  }

  // Load data from localStorage
  useEffect(() => {
    const storedAssets = localStorage.getItem("cryptoAssets")
    if (storedAssets) {
      try {
        const parsedAssets = JSON.parse(storedAssets)
        setCryptoAssets(parsedAssets.filter(asset => asset && asset.id && (asset.isBlockchain ? true : asset.balance)))
      } catch (error) {
        console.error("Error parsing cryptoAssets:", error)
        setCryptoAssets(defaultAssets)
      }
    } else {
      setCryptoAssets(defaultAssets)
      localStorage.setItem("cryptoAssets", JSON.stringify(defaultAssets))
    }

    const storedTransactions = localStorage.getItem("transactions")
    if (storedTransactions) {
      try {
        const parsedTransactions = JSON.parse(storedTransactions)
        setTransactions(parsedTransactions.filter(tx => tx && tx.id && tx.crypto && tx.amount))
      } catch (error) {
        console.error("Error parsing transactions:", error)
        setTransactions([])
      }
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    if (cryptoAssets.length > 0) {
      localStorage.setItem("cryptoAssets", JSON.stringify(cryptoAssets))
    }
  }, [cryptoAssets])

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions))
    }
  }, [transactions])

  const totalBalance = cryptoAssets.reduce((total, asset) => total + (parseFloat(asset.usdValue) || 0), 0)

  const refreshBalance = async () => {
    setIsRefreshing(true)
    if (isConnected && walletAddress) {
      await fetchBalances(walletAddress, provider)
    }
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const handleCryptoClick = (crypto) => {
    setSelectedCrypto(crypto)
  }

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address)
    alert("Address copied to clipboard!")
  }

  // Handle sending crypto (ETH or USDC)
  const handleSendCrypto = async (cryptoId, amount, toAddress) => {
    if (!isConnected || !signer) {
      alert("Please connect MetaMask")
      return
    }

    if (!ethers.isAddress(toAddress)) {
      alert("Invalid recipient address")
      return
    }

    const sendAmount = parseFloat(amount)
    if (isNaN(sendAmount) || sendAmount <= 0) {
      alert("Invalid amount")
      return
    }

    try {
      if (cryptoId === "ethereum") {
        // Send ETH
        const tx = await signer.sendTransaction({
          to: toAddress,
          value: ethers.parseEther(amount)
        })
        await tx.wait()
        alert(`Transaction sent: ${tx.hash}`)
        const usdValue = (sendAmount * 3000).toFixed(2) // Mock price
        recordTransaction(cryptoId, "sent", amount, usdValue, toAddress, null)
      } else if (cryptoId === "usdc") {
        // Send USDC
        const usdcContract = new ethers.Contract(
          defaultAssets.find(a => a.id === "usdc").contractAddress,
          USDC_ABI,
          signer
        )
        const decimals = await usdcContract.decimals()
        const amountInUnits = ethers.parseUnits(amount, decimals)
        const tx = await usdcContract.transfer(toAddress, amountInUnits)
        await tx.wait()
        alert(`Transaction sent: ${tx.hash}`)
        const usdValue = sendAmount.toFixed(2) // USDC is 1:1 with USD
        recordTransaction(cryptoId, "sent", amount, usdValue, toAddress, null)
      } else {
        // Bitcoin (UI-only)
        const asset = cryptoAssets.find(a => a.id === cryptoId)
        const currentBalance = parseFloat(asset.balance)
        if (sendAmount > currentBalance) {
          alert("Insufficient balance")
          return
        }
        const newBalance = (currentBalance - sendAmount).toFixed(4)
        const usdPerUnit = asset.usdValue / currentBalance
        const newUsdValue = (newBalance * usdPerUnit).toFixed(2)
        setCryptoAssets(prev =>
          prev.map(a =>
            a.id === cryptoId
              ? { ...a, balance: newBalance, usdValue: parseFloat(newUsdValue) }
              : a
          )
        )
        const usdValue = (sendAmount * usdPerUnit).toFixed(2)
        recordTransaction(cryptoId, "sent", amount, usdValue, toAddress, null)
      }
      await fetchBalances(walletAddress, provider)
    } catch (error) {
      console.error("Transaction failed:", error)
      alert("Transaction failed: " + error.message)
    }
  }

  // Handle receiving crypto (record only, as MetaMask handles actual receipt)
  const handleReceiveCrypto = (cryptoId, amount, fromAddress) => {
    const receiveAmount = parseFloat(amount)
    if (isNaN(receiveAmount) || receiveAmount <= 0) {
      alert("Invalid amount")
      return
    }

    if (cryptoId === "bitcoin") {
      // Bitcoin (UI-only)
      const asset = cryptoAssets.find(a => a.id === cryptoId)
      const currentBalance = parseFloat(asset.balance)
      const newBalance = (currentBalance + receiveAmount).toFixed(4)
      const usdPerUnit = asset.usdValue / currentBalance
      const newUsdValue = (newBalance * usdPerUnit).toFixed(2)
      setCryptoAssets(prev =>
        prev.map(a =>
          a.id === cryptoId
            ? { ...a, balance: newBalance, usdValue: parseFloat(newUsdValue) }
            : a
        )
      )
      const usdValue = (receiveAmount * usdPerUnit).toFixed(2)
      recordTransaction(cryptoId, "received", amount, usdValue, null, fromAddress)
    } else {
      // ETH/USDC: Record transaction, actual receipt happens in MetaMask
      const asset = cryptoAssets.find(a => a.id === cryptoId)
      const usdPerUnit = cryptoId === "usdc" ? 1 : 3000 // Mock prices
      const usdValue = (receiveAmount * usdPerUnit).toFixed(2)
      recordTransaction(cryptoId, "received", amount, usdValue, null, fromAddress)
    }
  }

  // Record transaction in localStorage
  const recordTransaction = (cryptoId, type, amount, usdValue, toAddress, fromAddress) => {
    const newTransaction = {
      id: Date.now(),
      type,
      amount,
      crypto: cryptoId,
      usdValue: parseFloat(usdValue),
      to: toAddress,
      from: fromAddress,
      date: new Date().toLocaleDateString(),
      status: "completed",
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  // Mini chart component
  const MiniChart = ({ data, color }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min

    return (
      <div className="h-10 flex items-end space-x-px">
        {data.map((value, index) => {
          const height = range === 0 ? 50 : ((value - min) / range) * 100
          return (
            <div key={index} className={`w-1 rounded-sm ${color}`} style={{ height: `${Math.max(10, height)}%` }}></div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {selectedCrypto ? (
          <CryptoDetail
            crypto={selectedCrypto}
            onBack={() => setSelectedCrypto(null)}
            transactions={transactions.filter((t) => t.crypto === selectedCrypto.id)}
            showQR={showQR}
            setShowQR={setShowQR}
            onCopyAddress={handleCopyAddress}
            onSendCrypto={handleSendCrypto}
            onReceiveCrypto={handleReceiveCrypto}
            walletAddress={walletAddress}
            isConnected={isConnected}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Crypto Wallet</h1>
              <div className="flex space-x-2">
                {isConnected ? (
                  <span className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    Connect Wallet
                  </button>
                )}
                <button className="p-2 rounded-full bg-white shadow-sm">
                  <Bell className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full bg-white shadow-sm">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Balance Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-gray-600">Total Balance</div>
                <button onClick={() => setShowBalance(!showBalance)} className="text-gray-500 hover:text-gray-700">
                  {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex items-baseline mb-4">
                <h2 className="text-3xl font-bold mr-2">
                  {showBalance ? `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "••••••"}
                </h2>
                <span className="text-green-600 text-sm font-medium">+2.4%</span>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 mr-2" />
                  Send
                </button>
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center">
                  <ArrowDownRight className="h-5 w-5 mr-2" />
                  Receive
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Buy
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                className={`pb-3 px-4 font-medium ${
                  activeTab === "assets"
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("assets")}
              >
                Assets
              </button>
              <button
                className={`pb-3 px-4 font-medium ${
                  activeTab === "activity"
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("activity")}
              >
                Activity
              </button>
              <button
                className={`pb-3 px-4 font-medium ${
                  activeTab === "explore"
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("explore")}
              >
                Explore
              </button>
            </div>

            {/* Assets Tab */}
            {activeTab === "assets" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search assets"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <button
                    onClick={refreshBalance}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                  >
                    <RefreshCw className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`} />
                  </button>
                </div>

                <div className="space-y-4">
                  {cryptoAssets.map((crypto) => (
                    <div
                      key={crypto.id}
                      className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                      onClick={() => handleCryptoClick(crypto)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-full ${crypto.color} flex items-center justify-center mr-3`}
                          >
                            {crypto.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{crypto.name}</h3>
                            <div className="text-sm text-gray-500">{crypto.symbol}</div>
                          </div>
                        </div>
                        <div className="flex-1 mx-4">
                          <MiniChart data={crypto.history} color={crypto.textColor} />
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {showBalance ? crypto.balance : "•••"} {crypto.symbol}
                          </div>
                          <div className="text-sm text-gray-500">
                            {showBalance ? `$${parseFloat(crypto.usdValue).toLocaleString()}` : "•••"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="font-medium">Recent Transactions</h3>
                  </div>
                  <div className="divide-y">
                    {transactions.map((transaction) => {
                      const crypto = cryptoAssets.find((c) => c.id === transaction.crypto)
                      return (
                        <div key={transaction.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div
                                className={`w-10 h-10 rounded-full ${
                                  transaction.type === "received" ? "bg-green-100" : "bg-red-100"
                                } flex items-center justify-center mr-3`}
                              >
                                {transaction.type === "received" ? (
                                  <ArrowDownRight
                                    className={`h-5 w-5 ${
                                      transaction.type === "received" ? "text-green-600" : "text-red-600"
                                    }`}
                                  />
                                ) : (
                                  <ArrowUpRight
                                    className={`h-5 w-5 ${
                                      transaction.type === "received" ? "text-green-600" : "text-red-600"
                                    }`}
                                  />
                                )}
                              </div>
                              <div>
                                <div className="font-medium capitalize">{transaction.type}</div>
                                <div className="text-sm text-gray-500">{transaction.date}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="mr-3">{crypto?.icon}</div>
                              <div className="text-right">
                                <div
                                  className={`font-medium ${
                                    transaction.type === "received" ? "text-green-600" : "text-red-600"
                                  }`}
                                >
                                  {transaction.type === "received" ? "+" : "-"}
                                  {transaction.amount} {crypto?.symbol}
                                </div>
                                <div className="text-sm text-gray-500">${parseFloat(transaction.usdValue).toLocaleString()}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="px-6 py-4 border-t bg-gray-50">
                    <button className="text-orange-600 font-medium flex items-center justify-center w-full">
                      View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Explore Tab */}
            {activeTab === "explore" && (
              <div>
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <BarChart3 className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Explore Cryptocurrencies</h3>
                  <p className="text-gray-600 mb-6">
                    Discover new cryptocurrencies, track prices, and learn about blockchain technology.
                  </p>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300">
                    Browse Markets
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Crypto Detail Component
const CryptoDetail = ({ crypto, onBack, transactions, showQR, setShowQR, onCopyAddress, onSendCrypto, onReceiveCrypto, walletAddress, isConnected }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [receiveAmount, setReceiveAmount] = useState("")
  const [receiveAddress, setReceiveAddress] = useState("")

  const handleSend = () => {
    if (!sendAmount || !sendAddress) {
      alert("Please enter amount and address")
      return
    }
    onSendCrypto(crypto.id, sendAmount, sendAddress)
    setSendAmount("")
    setSendAddress("")
  }

  const handleReceive = () => {
    if (!receiveAmount || !receiveAddress) {
      alert("Please enter amount and address")
      return
    }
    onReceiveCrypto(crypto.id, receiveAmount, receiveAddress)
    setReceiveAmount("")
    setReceiveAddress("")
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors duration-300"
        >
          <ArrowRight className="h-5 w-5 text-gray-600 transform rotate-180" />
        </button>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full ${crypto.color} flex items-center justify-center mr-3`}>
            {crypto.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{crypto.name}</h1>
            <div className="text-gray-500">{crypto.symbol}</div>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-600">Available Balance</div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              crypto.priceChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {crypto.priceChange >= 0 ? "+" : ""}
            {crypto.priceChange}%
          </div>
        </div>
        <div className="flex items-baseline mb-6">
          <h2 className="text-3xl font-bold mr-2">
            {crypto.balance} {crypto.symbol}
          </h2>
          <span className="text-gray-500">${parseFloat(crypto.usdValue).toLocaleString()}</span>
        </div>
        <div className="flex space-x-3">
          <button
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center"
            onClick={() => setShowQR(false)}
            disabled={!isConnected}
          >
            <ArrowUpRight className="h-5 w-5 mr-2" />
            Send
          </button>
          <button
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center"
            onClick={() => setShowQR(true)}
            disabled={!isConnected}
          >
            <ArrowDownRight className="h-5 w-5 mr-2" />
            Receive
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center">
            <Plus className="h-5 w-5 mr-2" />
            Buy
          </button>
        </div>
      </div>

      {/* Send Form */}
      {!showQR && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium mb-4">Send {crypto.name}</h3>
          {!isConnected ? (
            <p className="text-gray-600">Please connect MetaMask to send {crypto.symbol}</p>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ({crypto.symbol})</label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Address</label>
                <input
                  type="text"
                  value={sendAddress}
                  onChange={(e) => setSendAddress(e.target.value)}
                  placeholder="Enter recipient address"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <button
                onClick={handleSend}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300"
              >
                Send {crypto.symbol}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Receive Form / QR Code */}
      {showQR && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 text-center">
          <h3 className="text-lg font-medium mb-4">Receive {crypto.name}</h3>
          {!isConnected ? (
            <p className="text-gray-600">Please connect MetaMask to receive {crypto.symbol}</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount ({crypto.symbol})</label>
                  <input
                    type="number"
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Address</label>
                  <input
                    type="text"
                    value={receiveAddress}
                    onChange={(e) => setReceiveAddress(e.target.value)}
                    placeholder="Enter sender address"
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <button
                  onClick={handleReceive}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300"
                >
                  Record Receive {crypto.symbol}
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg inline-block mb-4 border">
                <QrCode className="h-48 w-48 text-gray-800 mx-auto" />
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Your {crypto.symbol} Address</p>
                <div className="relative max-w-md mx-auto">
                  <input
                    type="text"
                    value={crypto.address}
                    className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-800"
                    readOnly
                  />
                  <button
                    onClick={() => onCopyAddress(crypto.address)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <Copy className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Only send {crypto.symbol} to this address. Sending any other coin may result in permanent loss.
              </p>
            </>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`pb-3 px-4 font-medium ${
            activeTab === "overview"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`pb-3 px-4 font-medium ${
            activeTab === "transactions"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("transactions")}
        >
          Transactions
        </button>
        <button
          className={`pb-3 px-4 font-medium ${
            activeTab === "about" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-medium mb-4">Price Chart</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
            <span className="text-gray-500">Price chart visualization would go here</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Market Cap</div>
              <div className="font-bold">$950.2B</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Volume (24h)</div>
              <div className="font-bold">$28.5B</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Circulating Supply</div>
              <div className="font-bold">19.2M</div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="font-medium">Transaction History</h3>
          </div>
          <div className="divide-y">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${
                          transaction.type === "received" ? "bg-green-100" : "bg-red-100"
                        } flex items-center justify-center mr-3`}
                      >
                        {transaction.type === "received" ? (
                          <ArrowDownRight
                            className={`h-5 w-5 ${transaction.type === "received" ? "text-green-600" : "text-red-600"}`}
                          />
                        ) : (
                          <ArrowUpRight
                            className={`h-5 w-5 ${transaction.type === "received" ? "text-green-600" : "text-red-600"}`}
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-medium capitalize">{transaction.type}</div>
                        <div className="text-sm text-gray-500">
                          {transaction.type === "received" ? `From: ${transaction.from}` : `To: ${transaction.to}`}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-right">
                        <div
                          className={`font-medium ${
                            transaction.type === "received" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.type === "received" ? "+" : "-"}
                          {transaction.amount} {crypto.symbol}
                        </div>
                        <div className="text-sm text-gray-500">${parseFloat(transaction.usdValue).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="text-gray-500">{transaction.date}</div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-green-600">Completed</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-800 mb-2">No transactions yet</h3>
                <p className="text-gray-500">Your transaction history will appear here</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === "about" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-medium mb-4">About {crypto.name}</h3>
          <p className="text-gray-600 mb-4">
            {crypto.name} ({crypto.symbol}) is a decentralized digital currency that can be transferred on the
            peer-to-peer {crypto.name} network. {crypto.name} transactions are verified by network nodes through
            cryptography and recorded in a public distributed ledger called a blockchain.
          </p>

          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-3">Key Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Launch Date</div>
                <div className="font-medium">
                  {crypto.id === "bitcoin"
                    ? "January 3, 2009"
                    : crypto.id === "ethereum"
                      ? "July 30, 2015"
                      : "September 26, 2018"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Consensus Mechanism</div>
                <div className="font-medium">
                  {crypto.id === "bitcoin" ? "Proof of Work" : crypto.id === "ethereum" ? "Proof of Stake" : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Maximum Supply</div>
                <div className="font-medium">
                  {crypto.id === "bitcoin" ? "21,000,000" : crypto.id === "ethereum" ? "No Max Supply" : "Variable"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Block Time</div>
                <div className="font-medium">
                  {crypto.id === "bitcoin" ? "10 minutes" : crypto.id === "ethereum" ? "12 seconds" : "N/A"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="text-orange-600 font-medium flex items-center">
              Learn more about {crypto.name} <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CryptoWallet