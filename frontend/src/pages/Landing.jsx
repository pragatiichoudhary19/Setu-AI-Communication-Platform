import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { initializeOneSignal } from "../services/oneSignalService";
import api from "../services/api";

const FEATURES = [
  { title: 'AI Content Generation', desc: 'Turn a one-line brief into polished campaign copy, tuned to the tone you need.', accent: 'violet' },
  { title: 'Multilingual Translation', desc: 'Reach citizens in Hindi, Tamil, Bengali, and every major Indian language.', accent: 'teal' },
  { title: 'Smart Personalization', desc: 'Every recipient gets a message shaped around their name, role, and language.', accent: 'signal' },
  { title: 'Multi-Channel Dispatch', desc: 'Email, SMS, WhatsApp, push, and web — one campaign, every channel.', accent: 'violet' },
  { title: 'Engagement Tracking', desc: 'See opens, clicks, and responses roll in as they happen.', accent: 'teal' },
  { title: 'Feedback Sentiment', desc: 'Understand how your audience actually feels about every announcement.', accent: 'signal' },
]

const ACCENT_CLASSES = {
  violet: 'text-violet border-violet/30 bg-violet/10',
  teal: 'text-teal border-teal/30 bg-teal/10',
  signal: 'text-signal border-signal/30 bg-signal/10',
}

export default function Landing() {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const [subscriptionId, setSubscriptionId] = useState(null);

useEffect(() => {

  initializeOneSignal();

}, []);


const enableNotifications = async () => {
  console.log("Enable notification button clicked");

  try {
    if (!window.OneSignal) {
      alert("OneSignal is not initialized yet");
      return;
    }

    // Ask browser for notification permission
    const permission =
      await window.OneSignal.Notifications.requestPermission();

    console.log("Permission result:", permission);

    if (!permission) {
      alert("❌ Notification permission denied");
      return;
    }

    // Give OneSignal a moment to create the subscription
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get OneSignal subscription ID
    const id =
      window.OneSignal?.User?.PushSubscription?.id;

    console.log("OneSignal Subscription ID:", id);

    if (!id) {
      alert(
        "Unable to get OneSignal subscription ID. Please try again."
      );
      return;
    }

    // Save temporarily until language is selected
    setSubscriptionId(id);

    console.log("Subscription stored:", id);

    // Open language selection
    setShowLanguageSelector(true);

  } catch (error) {
    console.error("Notification Error:", error);

    alert("Unable to enable notifications");
  }
};

const saveNotificationLanguage = async () => {
  try {
    const id =
      subscriptionId ||
      window.OneSignal?.User?.PushSubscription?.id;

    console.log("Saving subscription:", id);
    console.log("Selected language:", selectedLanguage);

    if (!id) {
      alert("OneSignal subscription ID not available");
      return;
    }

    await axios.post(
      "http://localhost:8000/recipients/save-subscription",
      {
        subscription_id: id,
        language: selectedLanguage,
      }
    );

    console.log(
      "Subscription and language saved successfully"
    );

    setNotificationEnabled(true);
    setShowLanguageSelector(false);

    alert(
      `✅ Notifications enabled in ${selectedLanguage}`
    );

  } catch (error) {
    console.error(
      "Subscription save error:",
      error
    );

    console.error(
      "Backend error:",
      error.response?.data
    );

    alert(
      "Unable to save notification preferences"
    );
  }
};

const languageSelector = showLanguageSelector ? (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-surface border border-border rounded-xl p-6 w-[90%] max-w-md">

      <h2 className="text-xl font-semibold mb-2">
        Choose Notification Language
      </h2>

      <p className="text-text-dim text-sm mb-5">
        Choose the language in which you want to receive public notifications.
      </p>

      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="w-full bg-surface text-text border border-border rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-violet/40"
      >
        <option value="English">English</option>
        <option value="Telugu">Telugu</option>
        <option value="Hindi">Hindi</option>
        <option value="Tamil">Tamil</option>
        <option value="Bengali">Bengali</option>
        <option value="Kannada">Kannada</option>
        <option value="Malayalam">Malayalam</option>
        <option value="Marathi">Marathi</option>
        <option value="Gujarati">Gujarati</option>
      </select>

      <div className="flex gap-3">

        <button
          type="button"
          onClick={() => setShowLanguageSelector(false)}
          className="flex-1 border border-border rounded-lg px-4 py-2"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={saveNotificationLanguage}
          className="flex-1 bg-violet text-white rounded-lg px-4 py-2"
        >
          Save
        </button>

      </div>

    </div>
  </div>
) : null;


  return (
    <div className="min-h-screen text-text">
       {languageSelector}
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border">

  {/* Logo */}
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 bg-blue-500 animate-pulse rounded-full"></span>
    <span className="font-display font-semibold text-lg">
      JanConnect AI
    </span>
  </div>

  <button
  onClick={enableNotifications}
  className="border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 text-sm px-4 py-2 rounded-lg transition flex items-center gap-2"
>
  {notificationEnabled
    ? "✅ Notifications Enabled"
    : "🔔 Enable Notifications"}
</button>

</nav>

      {/* Hero */}
      <section className="px-8 py-24 max-w-4xl mx-auto text-center">
        <div className="inline-block text-[11px] tracking-wide uppercase text-violet border border-violet/30 bg-violet/10 rounded-full px-3 py-1 mb-6">
          AI-Based Multilingual Mass Communication Platform
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-5">
          Reach every citizen,<br />in their own language.
        </h1>
        <p className="text-text-dim text-base md:text-lg max-w-xl mx-auto mb-9 leading-relaxed">
          Generate, translate, personalize, and dispatch public communication campaigns
          across every channel — powered by AI, built for government and civic organizations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">

  <Link
    to="/register"
    className="ai-button"
  >
    Create an account
  </Link>

  <Link
    to="/login"
    className="border border-border text-sm px-6 py-3 rounded-lg hover:border-violet/40 transition"
  >
    Sign In
  </Link>

<Link
  to="/public"
  className="border border-violet/30 bg-violet/10 text-violet hover:bg-violet/20 hover:border-violet/50 text-sm px-6 py-3 rounded-lg transition flex items-center gap-2"
>
  Public Explore
</Link>



</div>
      </section>

      {/* Feature grid */}
      <section className="px-8 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-surface border border-border rounded-xl p-5">
              <span className={`inline-block text-[11px] px-2 py-0.5 rounded-full border mb-3 ${ACCENT_CLASSES[f.accent]}`}>
                {f.title}
              </span>
              <p className="text-text-dim text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signal strip footer */}
      <footer className="border-t border-border px-8 py-6 text-center text-[11px] text-text-dim">
        Setu — Multilingual Mass Communication &amp; Public Awareness Management Platform
      </footer>
    </div>
  )
}