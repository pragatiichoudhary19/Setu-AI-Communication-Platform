import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')

    if (!username.trim()) {
      setError('Username is required')
      return
    }

    if (!password) {
      setError('Password is required')
      return
    }

    setLoading(true)

    try {
      await login(username.trim(), password)


navigate('/dashboard')
      
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Invalid username or password.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">

      <div className="w-full max-w-sm relative z-10">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-2 justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]" />

          <span className="font-display font-semibold text-2xl">
            JanConnect AI
          </span>
        </div>

        <p className="text-center text-text-dim text-xs mb-4 whitespace-nowrap">
          Multilingual Mass Communication & Public Awareness Platform
        </p>

        {/* AI Badge */}
        <div className="flex justify-center mb-5">
          <span className="ai-badge">
            AI-Powered Communication
          </span>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="ai-card p-6 space-y-4"
        >

          {/* Header */}
          <div className="text-center mb-2">
            <h1 className="font-display text-lg font-semibold">
              Welcome Back
            </h1>

            <p className="text-text-dim text-xs mt-1">
              Sign in to access your AI communication workspace
            </p>
          </div>

          {/* Username */}
          <div>
            <label className="text-xs text-text-dim block mb-1.5">
              Username
            </label>

            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full bg-surface-alt/70 border border-border rounded-lg px-3 py-2.5 text-sm focus:border-violet outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-text-dim block mb-1.5">
              Password
            </label>

            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-surface-alt/70 border border-border rounded-lg px-3 py-2.5 text-sm focus:border-violet outline-none transition"
            />
          </div>
                    {/* Error Message */}
          {error && (
            <div className="text-danger text-xs bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="ai-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Register Link */}
          <p className="text-[11px] text-text-dim text-center">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-violet hover:underline"
            >
              Create an account
            </Link>
          </p>

        </form>

        {/* AI Network Status */}
        <div className="flex items-center justify-center gap-2 mt-5 text-[10px] text-text-dim">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          AI communication network online
        </div>

      </div>
    </div>
  )
}