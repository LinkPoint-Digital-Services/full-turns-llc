const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

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
    addBuffer: build(process.env.NEXT_PUBLIC_ADMIN_ADD_BUFFER),
    deleteBuffer: build(process.env.NEXT_PUBLIC_ADMIN_DELETE_BUFFER),
    getBuffer: build(process.env.NEXT_PUBLIC_ADMIN_GET_BUFFER),
  }
} as const;