const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const build = (path?: string) => `${API_BASE}${path}`;

export const Endpoint = {
  auth: {
    login: build(process.env.NEXT_PUBLIC_AUTH_LOGIN),
    register: build(process.env.NEXT_PUBLIC_AUTH_REGISTER),
    logout: build(process.env.NEXT_PUBLIC_AUTH_LOGOUT),
    forgotPassword: build(process.env.NEXT_PUBLIC_AUTH_FORGOT_PASSWORD),
    resetPassword: build(process.env.NEXT_PUBLIC_AUTH_RESET_PASSWORD)
  },

  user: {
    me: build(process.env.NEXT_PUBLIC_USER_ME)
  },

  admin: {
    // Buffer Endpoints
    addBuffer: build(process.env.NEXT_PUBLIC_ADMIN_ADD_BUFFER),
    deleteBuffer: build(process.env.NEXT_PUBLIC_ADMIN_DELETE_BUFFER),
    getBuffer: build(process.env.NEXT_PUBLIC_ADMIN_GET_BUFFER),

    // Blogs Endpoints
    addBlog: build(process.env.NEXT_PUBLIC_ADMIN_ADD_BLOG),
    updateBlog: build(process.env.NEXT_PUBLIC_ADMIN_UPDATE_BLOG),
    deleteBlog: build(process.env.NEXT_PUBLIC_ADMIN_DELETE_BLOG),
    getBlog: build(process.env.NEXT_PUBLIC_ADMIN_GET_BLOG),

    // Services Endpoints
    addService: build(process.env.NEXT_PUBLIC_ADMIN_ADD_SERVICE),
    updateService: build(process.env.NEXT_PUBLIC_ADMIN_UPDATE_SERVICE),
    deleteService: build(process.env.NEXT_PUBLIC_ADMIN_DELETE_SERVICE),
    getServices: build(process.env.NEXT_PUBLIC_ADMIN_GET_SERVICES),

    // Items Endpoints
    addItem: build(process.env.NEXT_PUBLIC_ADMIN_ADD_ITEM),
    updateItem: build(process.env.NEXT_PUBLIC_ADMIN_UPDATE_ITEM),
    deleteItem: build(process.env.NEXT_PUBLIC_ADMIN_DELETE_ITEM),
    getItems: build(process.env.NEXT_PUBLIC_ADMIN_GET_ITEMS),
  },

  manager: {
    updateProfile: build(process.env.NEXT_PUBLIC_MANAGER_UPDATE_PROFILE),
    getServices: build(process.env.NEXT_PUBLIC_MANAGER_GET_SERVICES),
    getItems: build(process.env.NEXT_PUBLIC_MANAGER_GET_ITEMS),
  },

  orders: {
    create: build(process.env.NEXT_PUBLIC_ORDER_CREATE),
    myOrders: build(process.env.NEXT_PUBLIC_ORDER_MY_ORDERS),
    allOrders: build(process.env.NEXT_PUBLIC_ORDER_ALL_ORDERS),
    updateStatus: build(process.env.NEXT_PUBLIC_ORDER_UPDATE_STATUS),
  }
} as const;
