import { useState } from 'react';
import { React } from 'react';
import './App.css';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import { ScrollArea } from "./ui/scroll-area";
import {
  Clock,
  ShoppingBag,
  User,
  Award,
  Activity,
  Bell,
  Droplet,
  Wind,
  DropletIcon,
  PlayCircle,
  PauseCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const App = () => {
  const [scanComplete, setScanComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scanProgress, setScanProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1W');
  const [isScanning, setIsScanning] = useState(false);
  const [cartCount] = useState(0);
  const [isMassaging, setIsMassaging] = useState(false);
  const [massageType, setMassageType] = useState('circular');
  const [temperature, setTemperature] = useState(35); // Default temperature in Celsius
  const [serumApplied, setSerumApplied] = useState(false);
  const [massageTime, setMassageTime] = useState(10); // Default massage time in minutes
  const [targetArea, setTargetArea] = useState('full'); // Default target area for massage

  // Mock historical data for charts
  const historicalData = [
    { date: 'Mon', health: 75, moisture: 60, scalp: 80 },
    { date: 'Tue', health: 78, moisture: 65, scalp: 82 },
    { date: 'Wed', health: 76, moisture: 68, scalp: 85 },
    { date: 'Thu', health: 80, moisture: 70, scalp: 83 },
    { date: 'Fri', health: 82, moisture: 72, scalp: 86 },
    { date: 'Sat', health: 85, moisture: 75, scalp: 88 },
    { date: 'Sun', health: 88, moisture: 78, scalp: 90 },
  ];

  const mockScanResults = {
    hairHealth: 88,
    moistureLevel: 78,
    scalpCondition: 90,
    recommendedProducts: [
      {
        name: "L'Oréal Pro Scalp Care Serum",
        price: '$29.99',
        rating: 4.8,
        reviews: 128,
        benefits: ['Deep moisturizing', 'Scalp health', 'Anti-dandruff'],
      },
      {
        name: "L'Oréal Vitamin E Boost",
        price: '$24.99',
        rating: 4.6,
        reviews: 95,
        benefits: ['Vitamin enriched', 'Hair strength', 'Shine boost'],
      },
    ],
    treatment: {
      serumMix: '70% Moisture + 30% Repair',
      applicationMode: 'Direct Contact',
      duration: '15 minutes',
      frequency: 'Daily',
      temperature: 'Warm',
      pressure: 'Medium',
    },
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const toggleMassage = () => {
    setIsMassaging(!isMassaging);
  };

  const applySerum = () => {
    setSerumApplied(true);
    setTimeout(() => setSerumApplied(false), 5000); // Simulate serum application
  };

  const ProgressCircle = ({ progress, size = 150 }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          stroke="#e2e8f0"
          fill="none"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="#6366f1"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-500 ease-out"
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          className="text-2xl font-bold fill-indigo-600"
          transform={`rotate(90 ${size / 2} ${size / 2})`}
        >
          {progress}%
        </text>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      <div
        className={`fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 ${
          showNotification ? 'translate-y-0' : '-translate-y-24'
        }`}
      >
        {cartCount > 0 ? 'Product added to cart!' : 'Scan completed successfully!'}
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">SmartHair™</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <ShoppingBag className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <User className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'dashboard', icon: Activity, label: 'Dashboard' },
            { id: 'scan', icon: Clock, label: 'Daily Scan' },
            { id: 'massager', icon: Award, label: '3D Massager' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105
                ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Scan Card */}
          {activeTab === 'dashboard' && (
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Overview</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Device Dashboard</h1>
      <Tabs defaultValue="features" className="w-full">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="usage">How to Use</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <ScrollArea className="h-96 p-4 border rounded-lg">
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold">Key Features</h2>
                <ul className="list-disc ml-6 mt-2">
                  <li>Adjustable, Lightweight & Wearable</li>
                  <li>Detachable, Hygienic Inner Lining</li>
                  <li>Wireless & Rechargeable (6-8 hrs battery)</li>
                  <li>Customizable Massage & Intensity Settings</li>
                  <li>AI-Powered Hair Health Check-up</li>
                  <li>Smart Temperature Control</li>
                  <li>Scalp Mapping with AI</li>
                  <li>Eco-Friendly & Sustainable Materials</li>
                </ul>
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="usage">
          <ScrollArea className="h-96 p-4 border rounded-lg">
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold">How to Use</h2>
                <ol className="list-decimal ml-6 mt-2">
                  <li>Ensure the device is fully charged.</li>
                  <li>Adjust the fit for comfort.</li>
                  <li>Choose the desired massage & serum mode.</li>
                  <li>Turn on the device using the touch controls or app.</li>
                  <li>Enjoy the session as per the timer settings.</li>
                  <li>Clean the device after use for hygiene.</li>
                </ol>
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="components">
          <ScrollArea className="h-96 p-4 border rounded-lg">
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold">Components Used</h2>
                <ul className="list-disc ml-6 mt-2">
                  <li>Flexible Silicone Massage Nodes</li>
                  <li>Smart AI Sensors for Scalp Mapping</li>
                  <li>Eco-Friendly Biodegradable Body Material</li>
                  <li>USB-C Fast Charging Module</li>
                  <li>Bluetooth & Cloud Connectivity Module</li>
                  <li>Serum Dispensing System</li>
                  <li>Temperature Control Elements</li>
                </ul>
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
              </CardContent>
            </Card>
          )}
{activeTab === 'massager' && (
  <div className="w-full flex justify-center">
    <Card className="w-full max-w-[1400px] min-h-[800px] p-8 shadow-xl bg-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">3D Scalp Massager</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Scalp Image with Interactive Overlays */}
        <div className="w-full h-[750px] bg-gray-100 rounded-lg shadow-md relative flex items-center justify-center">
          <img
            src="/scalp.png"
            alt="Scalp"
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Overlay Buttons for Scalp Positions */}
          <div className="absolute inset-0 grid grid-cols-4 gap-6 p-8">
            {['front', 'back', 'left', 'right'].map((area) => (
              <button
                key={area}
                onClick={() => setTargetArea(area)}
                className={`w-20 h-20 rounded-full bg-indigo-600 text-white text-lg font-semibold flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all ${
                  targetArea === area ? 'ring-4 ring-indigo-500' : ''
                }`}
              >
                {area.charAt(0).toUpperCase() + area.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Massage Controls */}
        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <button
              onClick={toggleMassage}
              className="flex items-center space-x-3 bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 text-lg"
            >
              {isMassaging ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
              <span className="text-xl">{isMassaging ? 'Pause Massage' : 'Start Massage'}</span>
            </button>

            <button
              onClick={applySerum}
              disabled={serumApplied}
              className="flex items-center space-x-3 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 text-lg"
            >
              <DropletIcon className="w-6 h-6" />
              <span className="text-xl">{serumApplied ? 'Serum Applied' : 'Apply Serum'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <label className="text-xl text-gray-600">Massage Type</label>
              <select
                value={massageType}
                onChange={(e) => setMassageType(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              >
                <option value="circular">Circular</option>
                <option value="kneading">Kneading</option>
                <option value="tapping">Tapping</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-xl text-gray-600">Massage Time (mins)</label>
              <input
                type="number"
                value={massageTime}
                onChange={(e) => setMassageTime(Number(e.target.value))}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xl text-gray-600">Target Area</label>
              <select
                value={targetArea}
                onChange={(e) => setTargetArea(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              >
                <option value="full">Full Scalp</option>
                <option value="front">Front</option>
                <option value="back">Back</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)}


          {activeTab === 'scan' && (
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Daily Hair Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {!scanComplete ? (
                  <div className="text-center py-8">
                    {isScanning ? (
                      <div className="space-y-4">
                        <ProgressCircle progress={scanProgress} />
                        <p className="text-gray-600">Analyzing your hair condition...</p>
                      </div>
                    ) : (
                      <button
                        onClick={startScan}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        Start Daily Scan
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Alert className="bg-green-50 border-green-200">
                      <AlertDescription className="text-green-800">
                        Scan complete! Here are your personalized recommendations.
                      </AlertDescription>
                    </Alert>

                    {/* Health Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'Hair Health', value: mockScanResults.hairHealth, icon: Activity },
                        { label: 'Moisture', value: mockScanResults.moistureLevel, icon: Droplet },
                        { label: 'Scalp Condition', value: mockScanResults.scalpCondition, icon: Wind },
                      ].map((metric) => (
                        <div
                          key={metric.label}
                          className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                        >
                          <metric.icon className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                          <div className="text-2xl font-bold text-indigo-600">{metric.value}%</div>
                          <div className="text-sm text-gray-600">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Charts */}
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Trends</CardTitle>
                          <div className="flex space-x-2">
                            {['1W', '1M', '3M', '1Y'].map((timeframe) => (
                              <button
                                key={timeframe}
                                onClick={() => setSelectedTimeframe(timeframe)}
                                className={`px-3 py-1 rounded-lg text-sm ${
                                  selectedTimeframe === timeframe
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {timeframe}
                              </button>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={historicalData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="health" stroke="#6366f1" strokeWidth={2} />
                              <Line type="monotone" dataKey="moisture" stroke="#60a5fa" strokeWidth={2} />
                              <Line type="monotone" dataKey="scalp" stroke="#34d399" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Treatment Recommendations */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="font-semibold mb-4">Today's Treatment Plan</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {Object.entries(mockScanResults.treatment).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                            <p className="font-medium text-indigo-900">{value}</p>
                            <div className="h-1 bg-indigo-100 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
