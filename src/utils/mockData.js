// ============================================
// FOODAXIS MOCK DATA
// ============================================

export const MOCK_USERS = {
  customer: { id: 1, name: 'John Doe', email: 'john@email.com', phone: '01711111111', role: 'customer', avatar: null, address: '123 Gulshan Ave, Dhaka' },
  admin: { id: 2, name: 'Karim Manager', email: 'admin@foodaxis.com', phone: '01722222222', role: 'admin', avatar: null, restaurant: 'FoodAxis Main Branch' },
  kitchen: { id: 3, name: 'Chef Rahim', email: 'kitchen@foodaxis.com', phone: '01733333333', role: 'kitchen', avatar: null },
  rider: { id: 4, name: 'Alex Rider', email: 'rider@foodaxis.com', phone: '01744444444', role: 'rider', avatar: null, vehicle: 'Bike', rating: 4.8 },
  superadmin: { id: 5, name: 'Super Admin', email: 'super@foodaxis.com', phone: '01755555555', role: 'superadmin', avatar: null },
}

export const MOCK_MENU_ITEMS = [
  {
    id: 1,
    name: 'Classic Chicken Burger',
    description: 'Juicy grilled chicken with fresh lettuce, tomato, and special sauce on a toasted bun',
    price: 450,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    prepTime: '15 min',
    rating: 4.5,
    calories: 520,
    isAvailable: true,
    ingredients: ['chicken', 'bun', 'lettuce', 'tomato', 'sauce'],
    tags: ['popular', 'spicy'],
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, and basil on thin crispy crust',
    price: 680,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
    prepTime: '20 min',
    rating: 4.7,
    calories: 800,
    isAvailable: true,
    ingredients: ['dough', 'mozzarella', 'tomato_sauce', 'basil'],
    tags: ['vegetarian'],
  },
  {
    id: 3,
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with lemon butter sauce and seasonal vegetables',
    price: 950,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    prepTime: '25 min',
    rating: 4.8,
    calories: 450,
    isAvailable: true,
    ingredients: ['salmon', 'lemon', 'butter', 'vegetables'],
    tags: ['healthy', 'gluten-free'],
  },
  {
    id: 4,
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan, croutons, and Caesar dressing',
    price: 320,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400',
    prepTime: '10 min',
    rating: 4.3,
    calories: 280,
    isAvailable: true,
    ingredients: ['lettuce', 'parmesan', 'croutons', 'caesar_dressing'],
    tags: ['healthy', 'vegetarian'],
  },
  {
    id: 5,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 380,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
    prepTime: '12 min',
    rating: 4.9,
    calories: 420,
    isAvailable: true,
    ingredients: ['chocolate', 'flour', 'egg', 'vanilla_ice_cream'],
    tags: ['popular', 'sweet'],
  },
  {
    id: 6,
    name: 'Mango Smoothie',
    description: 'Fresh mango blended with yogurt and honey',
    price: 220,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400',
    prepTime: '5 min',
    rating: 4.6,
    calories: 180,
    isAvailable: true,
    ingredients: ['mango', 'yogurt', 'honey'],
    tags: ['healthy', 'cold'],
  },
  {
    id: 7,
    name: 'Beef Steak',
    description: 'Premium beef steak with mashed potatoes and grilled asparagus',
    price: 1200,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
    prepTime: '30 min',
    rating: 4.9,
    calories: 750,
    isAvailable: true,
    ingredients: ['beef', 'potato', 'asparagus', 'butter'],
    tags: ['premium'],
  },
  {
    id: 8,
    name: 'Spring Rolls',
    description: 'Crispy vegetable spring rolls with sweet chili sauce',
    price: 280,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    prepTime: '12 min',
    rating: 4.4,
    calories: 220,
    isAvailable: true,
    ingredients: ['cabbage', 'carrot', 'wrapper', 'chili_sauce'],
    tags: ['vegetarian', 'crispy'],
  },
]

export const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    customerPhone: '01711111111',
    items: [
      { name: 'Classic Chicken Burger', qty: 2, price: 450 },
      { name: 'Mango Smoothie', qty: 1, price: 220 },
    ],
    total: 1120,
    status: 'preparing',
    type: 'delivery',
    address: '123 Gulshan Ave, Dhaka',
    time: '2026-08-10 12:30',
    rider: null,
    paymentMethod: 'cash',
    notes: 'Extra sauce please',
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Smith',
    customerPhone: '01722222222',
    items: [
      { name: 'Margherita Pizza', qty: 1, price: 680 },
    ],
    total: 680,
    status: 'received',
    type: 'dine-in',
    table: 'T-05',
    time: '2026-08-10 12:45',
    rider: null,
    paymentMethod: 'card',
    notes: '',
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    customerPhone: '01733333333',
    items: [
      { name: 'Grilled Salmon', qty: 1, price: 950 },
      { name: 'Caesar Salad', qty: 1, price: 320 },
    ],
    total: 1270,
    status: 'out_for_delivery',
    type: 'delivery',
    address: '456 Banani Rd, Dhaka',
    time: '2026-08-10 12:15',
    rider: 'Alex Rider',
    paymentMethod: 'card',
    notes: 'Ring the doorbell',
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    customerPhone: '01744444444',
    items: [
      { name: 'Chocolate Lava Cake', qty: 2, price: 380 },
      { name: 'Mango Smoothie', qty: 2, price: 220 },
    ],
    total: 1200,
    status: 'delivered',
    type: 'takeaway',
    address: 'Pickup at counter',
    time: '2026-08-10 11:30',
    rider: null,
    paymentMethod: 'wallet',
    notes: '',
  },
  {
    id: 'ORD-005',
    customer: 'David Wilson',
    customerPhone: '01755555555',
    items: [
      { name: 'Beef Steak', qty: 1, price: 1200 },
      { name: 'Spring Rolls', qty: 1, price: 280 },
    ],
    total: 1480,
    status: 'ready',
    type: 'dine-in',
    table: 'T-12',
    time: '2026-08-10 13:00',
    rider: null,
    paymentMethod: 'card',
    notes: 'Medium rare steak',
  },
]

export const MOCK_INVENTORY = [
  { id: 1, name: 'Chicken Breast', unit: 'kg', currentStock: 12, minThreshold: 10, maxStock: 50, category: 'Meat', lastUpdated: '2026-08-10', supplier: 'Fresh Farm' },
  { id: 2, name: 'Burger Bun', unit: 'pcs', currentStock: 45, minThreshold: 30, maxStock: 200, category: 'Bakery', lastUpdated: '2026-08-10', supplier: 'City Bakery' },
  { id: 3, name: 'Lettuce', unit: 'kg', currentStock: 3, minThreshold: 5, maxStock: 20, category: 'Vegetables', lastUpdated: '2026-08-09', supplier: 'Green Valley' },
  { id: 4, name: 'Tomato', unit: 'kg', currentStock: 8, minThreshold: 5, maxStock: 25, category: 'Vegetables', lastUpdated: '2026-08-10', supplier: 'Green Valley' },
  { id: 5, name: 'Mozzarella Cheese', unit: 'kg', currentStock: 4, minThreshold: 3, maxStock: 15, category: 'Dairy', lastUpdated: '2026-08-08', supplier: 'Dairy Fresh' },
  { id: 6, name: 'Salmon Fillet', unit: 'kg', currentStock: 2, minThreshold: 5, maxStock: 20, category: 'Seafood', lastUpdated: '2026-08-10', supplier: 'Ocean Catch' },
  { id: 7, name: 'Beef Tenderloin', unit: 'kg', currentStock: 6, minThreshold: 4, maxStock: 15, category: 'Meat', lastUpdated: '2026-08-10', supplier: 'Fresh Farm' },
  { id: 8, name: 'Chocolate', unit: 'kg', currentStock: 5, minThreshold: 2, maxStock: 10, category: 'Dessert', lastUpdated: '2026-08-07', supplier: 'Sweet Imports' },
]

export const MOCK_RIDERS = [
  { id: 1, name: 'Alex Rider', phone: '01712345678', email: 'alex@foodaxis.com', status: 'available', location: { lat: 23.8103, lng: 90.4125 }, rating: 4.8, totalDeliveries: 342, vehicle: 'Honda CB150', vehicleNumber: 'DHK-1234' },
  { id: 2, name: 'Sam Courier', phone: '01787654321', email: 'sam@foodaxis.com', status: 'busy', location: { lat: 23.8150, lng: 90.4180 }, rating: 4.6, totalDeliveries: 215, vehicle: 'Yamaha FZS', vehicleNumber: 'DHK-5678' },
  { id: 3, name: 'Mike Deliver', phone: '01711223344', email: 'mike@foodaxis.com', status: 'available', location: { lat: 23.8050, lng: 90.4080 }, rating: 4.9, totalDeliveries: 510, vehicle: 'Suzuki Gixxer', vehicleNumber: 'DHK-9012' },
  { id: 4, name: 'Lisa Fast', phone: '01755667788', email: 'lisa@foodaxis.com', status: 'offline', location: null, rating: 4.7, totalDeliveries: 189, vehicle: 'Honda CB150', vehicleNumber: 'DHK-3456' },
]

export const MOCK_ANALYTICS = {
  today: {
    sales: 28450,
    orders: 89,
    avgOrderValue: 319.66,
    activeCustomers: 156,
    salesChange: 12.5,
    ordersChange: 8.3,
    aovChange: -2.1,
    customerChange: 15.2,
  },
  weekly: {
    sales: 198500,
    orders: 623,
    avgOrderValue: 318.62,
    activeCustomers: 412,
    salesChange: 8.4,
    ordersChange: 5.7,
    aovChange: 1.2,
    customerChange: 22.1,
  },
  topItems: [
    { name: 'Classic Chicken Burger', orders: 145, revenue: 65250 },
    { name: 'Margherita Pizza', orders: 128, revenue: 87040 },
    { name: 'Mango Smoothie', orders: 112, revenue: 24640 },
    { name: 'Chocolate Lava Cake', orders: 98, revenue: 37240 },
    { name: 'Grilled Salmon', orders: 87, revenue: 82650 },
  ],
  hourlyData: [
    { hour: '8AM', sales: 1200, orders: 4 },
    { hour: '10AM', sales: 3400, orders: 12 },
    { hour: '12PM', sales: 8900, orders: 28 },
    { hour: '2PM', sales: 5600, orders: 18 },
    { hour: '4PM', sales: 4200, orders: 14 },
    { hour: '6PM', sales: 7800, orders: 24 },
    { hour: '8PM', sales: 6500, orders: 20 },
    { hour: '10PM', sales: 2100, orders: 7 },
  ],
  wasteData: {
    totalWasteKg: 8.5,
    wasteCost: 4250,
    wasteReduction: 15,
    topWastedItems: [
      { name: 'Lettuce', quantity: '2.5 kg', cost: 375, reason: 'over-prepared' },
      { name: 'Burger Bun', quantity: '18 pcs', cost: 270, reason: 'expired' },
      { name: 'Tomato', quantity: '1.8 kg', cost: 216, reason: 'spoilage' },
    ]
  }
}

export const MOCK_AI_RECOMMENDATIONS = [
  { id: 1, type: 'prep', title: 'Reduce Chicken Burger Prep', description: 'Reduce daily prep by 15% on weekdays based on historical data', impact: 'Save ৳2,400/week', confidence: 92 },
  { id: 2, type: 'inventory', title: 'Order Lettuce More Frequently', description: 'Order every 2 days instead of 3 to reduce spoilage', impact: 'Reduce waste by 30%', confidence: 88 },
  { id: 3, type: 'promotion', title: 'Promote Mango Smoothie', description: 'Run 2-4 PM promotion to boost slow-hour sales', impact: '+৳8,500/month', confidence: 85 },
  { id: 4, type: 'pricing', title: 'Increase Steak Price', description: 'Market analysis suggests 10% price increase is viable', impact: '+৳12,000/month', confidence: 78 },
]

export const MOCK_FEEDBACK = [
  { id: 1, customer: 'John Doe', rating: 5, comment: 'Amazing food and fast delivery!', date: '2026-08-10', orderId: 'ORD-001' },
  { id: 2, customer: 'Sarah Smith', rating: 4, comment: 'Great pizza, but a bit slow today.', date: '2026-08-10', orderId: 'ORD-002' },
  { id: 3, customer: 'Mike Johnson', rating: 5, comment: 'Salmon was perfectly cooked!', date: '2026-08-09', orderId: 'ORD-003' },
  { id: 4, customer: 'Emily Davis', rating: 3, comment: 'Smoothie was too sweet.', date: '2026-08-09', orderId: 'ORD-004' },
  { id: 5, customer: 'David Wilson', rating: 5, comment: 'Best steak in town!', date: '2026-08-08', orderId: 'ORD-005' },
]

export const MOCK_STAFF = [
  { id: 1, name: 'Chef Rahim', role: 'kitchen', email: 'rahim@foodaxis.com', phone: '01733333333', status: 'active', joinDate: '2025-01-15' },
  { id: 2, name: 'Alex Rider', role: 'rider', email: 'alex@foodaxis.com', phone: '01744444444', status: 'active', joinDate: '2025-03-20' },
  { id: 3, name: 'Sam Courier', role: 'rider', email: 'sam@foodaxis.com', phone: '01787654321', status: 'active', joinDate: '2025-06-10' },
  { id: 4, name: 'Lisa Fast', role: 'rider', email: 'lisa@foodaxis.com', phone: '01755667788', status: 'on_leave', joinDate: '2025-08-01' },
  { id: 5, name: 'Manager Karim', role: 'admin', email: 'karim@foodaxis.com', phone: '01722222222', status: 'active', joinDate: '2024-12-01' },
]

export const MOCK_RESTAURANTS = [
  { id: 1, name: 'FoodAxis Main Branch', address: '123 Gulshan Ave, Dhaka', phone: '01999999999', status: 'active', manager: 'Karim Manager', ordersToday: 89, revenueToday: 28450 },
  { id: 2, name: 'FoodAxis Dhanmondi', address: '45 Dhanmondi Rd 27, Dhaka', phone: '01988888888', status: 'active', manager: 'Rahim Hossain', ordersToday: 56, revenueToday: 18200 },
  { id: 3, name: 'FoodAxis Uttara', address: '78 Sector 7, Uttara, Dhaka', phone: '01977777777', status: 'inactive', manager: 'Not Assigned', ordersToday: 0, revenueToday: 0 },
]

export const MOCK_LOYALTY = {
  points: 450,
  tier: 'Gold',
  nextTier: 'Platinum',
  pointsToNext: 550,
  history: [
    { id: 1, description: 'Order #ORD-001', points: 45, type: 'earned', date: '2026-08-10' },
    { id: 2, description: 'Birthday Bonus', points: 100, type: 'earned', date: '2026-08-01' },
    { id: 3, description: 'Redeemed Discount', points: -50, type: 'redeemed', date: '2026-07-28' },
    { id: 4, description: 'Order #ORD-002', points: 30, type: 'earned', date: '2026-07-25' },
  ],
  rewards: [
    { id: 1, name: '10% Off Next Order', points: 200, icon: 'percent' },
    { id: 2, name: 'Free Dessert', points: 350, icon: 'cake' },
    { id: 3, name: 'Free Delivery (5x)', points: 500, icon: 'truck' },
  ]
}