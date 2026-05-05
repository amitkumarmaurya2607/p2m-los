import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthUser {
  method: 'mobile' | 'email'
  identifier: string
}

interface AuthState {
  isLoggedIn: boolean
  user: AuthUser | null
}

const getInitialState = (): AuthState => {
  if (typeof window === 'undefined') return { isLoggedIn: false, user: null }
  try {
    const raw = sessionStorage.getItem('p2m-auth')
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        isLoggedIn: parsed.isLoggedIn ?? false,
        user: parsed.user ?? null,
      }
    }
  } catch {
    /* ignore */
  }
  return { isLoggedIn: false, user: null }
}

const initialState: AuthState = getInitialState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUser>) => {
      state.isLoggedIn = true
      state.user = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user
