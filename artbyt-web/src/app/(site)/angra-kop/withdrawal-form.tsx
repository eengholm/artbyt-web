"use client";

import { useState } from "react";

type Ack = { orderRef: string; requestedAt: string; refundId: string };

export default function WithdrawalForm() {
  const [sessionId, setSessionId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ack, setAck] = useState<Ack | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/withdrawals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Något gick fel.");
        return;
      }
      setAck(data);
    } catch {
      setError("Nätverksfel – försök igen.");
    } finally {
      setLoading(false);
    }
  }

  if (ack) {
    return (
      <div className="border border-gray-200 p-4 text-sm space-y-2" role="status">
        <p className="font-medium">Din ånger är mottagen.</p>
        <p className="text-gray-600">
          Order: <span className="font-mono">{ack.orderRef}</span>
        </p>
        <p className="text-gray-600">
          Mottagen: {new Date(ack.requestedAt).toLocaleString("sv-SE")}
        </p>
        <p className="text-gray-600">
          Återbetalning: <span className="font-mono">{ack.refundId}</span> — pengarna är
          redan på väg tillbaka via din ursprungliga betalningsmetod.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="sessionId" className="block text-sm mb-1">
          Ordernummer (från din orderbekräftelse)
        </label>
        <input
          id="sessionId"
          type="text"
          required
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder="cs_..."
          className="w-full border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm mb-1">
          E-postadress du handlade med
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white text-sm py-3 px-4 hover:opacity-70 transition-opacity disabled:opacity-40"
      >
        {loading ? "Skickar…" : "Ångra köpet"}
      </button>
    </form>
  );
}
