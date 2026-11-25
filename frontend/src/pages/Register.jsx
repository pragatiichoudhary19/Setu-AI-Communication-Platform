import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'comms_team',
    organization: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.username.trim()) {
      setError('Username is required')
      return
    }

    if (!form.email.trim()) {
      setError('Email is required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await register({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        organization: form.organization.trim(),
      })

      navigate('/login')
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Registration failed. Try a different username or email.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 py-10 relative">

      <div className="w-full max-w-sm relative z-10">

        <div className="flex items-center gap-2 mb-2 justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]" />

          <span className="font-display font-semibold text-2xl">
            JanConnect AI
          </span>
        </div>

        <div className="flex justify-center mb-5">
          <span className="ai-badge">
            AI-Powered Communication
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="ai-card p-6 space-y-4"
        >

          <div className="text-center mb-2">
            <h1 className="font-display text-lg font-semibold">
              Join and Communicate
            </h1>

            <p className="text-text-dim text-xs mt-1">
              Create your AI communication workspace
            </p>
          </div>

          <div>
            <label className="text-xs text-text-dim block mb-1.5">
              Username
            </label>

            <input
              required
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full bg-surface-alt/70 border border-border rounded-lg px-3 py-2.5 text-sm focus:border-violet outline-none transition"
            />
          </div>

          <div>
            <label className="text-xs text-text-dim block mb-1.5">
              Email
            </label>

            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full bg-surface-alt/70 border border-border rounded-lg px-3 py-2.5 text-sm focus:border-violet outline-none transition"
            />
          </div>

          <div>
            <label className="text-xs text-text-dim block mb-1.5">
              Password
            </label>

            <input
              required
              type="password"
              minLength={6}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="w-full bg-surface-alt/70 border border-border rounded-lg px-3 py-2.5 text-sm focus:border-violet outline-none transition"
            />
          </div>

          <div>
            <label className="text-xs text-text-dim block mb-1.5">
              Confirm Password
            </label>

            <input
              required
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full bg-surface-alt/70 border border-border rounded-lg px-3 py-2.5 text-sm focus:border-violet outline-none transition"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-xs text-text-dim block mb-1.5">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="theme-select"
            >
              <option value="comms_team">
                Communication Team
              </option>

              <option value="campaign_manager">
                Campaign Manager
              </option>

              <option value="admin">
                Administrator
              </option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="text-danger text-xs bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="ai-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? 'Creating Account...'
              : 'Create Account'}
          </button>

          {/* Login Link */}
          <p className="text-[11px] text-text-dim text-center pt-1">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-violet hover:underline"
            >
              Sign in
            </Link>
          </p>

        </form>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-5 text-[10px] text-text-dim">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          AI communication network online
        </div>

      </div>

    </div>
  )
}