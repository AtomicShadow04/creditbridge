'use client';
import { useState } from 'react';
import axios from 'axios';

type PipelineResult = any;

type AgentStep = {
  id: number;
  name: string;
  status: 'idle' | 'running' | 'done';
  color: string;
};

const initialSteps: AgentStep[] = [
  { id: 1, name: 'Data Harvesting', status: 'idle', color: '#00D4FF' },
  { id: 2, name: 'Risk Scoring', status: 'idle', color: '#F5A623' },
  { id: 3, name: 'Compliance / KYC', status: 'idle', color: '#B06EFF' },
  { id: 4, name: 'Disbursement', status: 'idle', color: '#00E5A0' },
];

export default function Home() {
  const [form, setForm] = useState({
    businessName: '',
    phoneNumber: '',
    bvn: '',
    businessRegNumber: '',
    requestedLoanAmount: '',
    recipientWalletAddress: '',
  });
  const [steps, setSteps] = useState<AgentStep[]>(initialSteps);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [error, setError] = useState('');

  const updateStep = (id: number, status: AgentStep['status']) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const simulateProgress = async () => {
    for (let i = 1; i <= 4; i++) {
      updateStep(i, 'running');
      await new Promise(r => setTimeout(r, 2000));
      updateStep(i, 'done');
    }
  };

  const handleSubmit = async () => {
    setError('');
    setResult(null);
    setSteps(initialSteps);
    setLoading(true);

    try {
      const progressPromise = simulateProgress();
      const apiPromise = axios.post('/api/agents/pipeline', {
        ...form,
        requestedLoanAmount: parseInt(form.requestedLoanAmount),
      });

      const [, response] = await Promise.all([progressPromise, apiPromise]);
      setResult(response.data.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Pipeline failed. Is the backend running?');
      setSteps(initialSteps);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    if (status === 'DISBURSED') return '#00E5A0';
    if (status === 'PENDING_REVIEW') return '#F5A623';
    if (status === 'REJECTED') return '#FF4D6A';
    return '#6B7A99';
  };

  const tierColor = (tier: string) => {
    if (tier === 'LOW') return '#00E5A0';
    if (tier === 'MEDIUM') return '#F5A623';
    if (tier === 'HIGH') return '#FF4D6A';
    return '#6B7A99';
  };

  return (
    <main className="grid-bg min-h-screen">
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        background: 'rgba(13,19,33,0.95)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 4 }}>
              AMD × Lablab Hackathon 2026
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>
              Credit<span style={{ color: 'var(--accent)' }}>Bridge</span>
            </h1>
          </div>
        </div>
        <div style={{
          fontSize: 10,
          color: 'var(--muted)',
          letterSpacing: 2,
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--green)',
            display: 'inline-block',
            animation: 'pulse-dot 2s infinite',
          }} />
          AI Credit Intelligence · Africa
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        {/* Hero */}
        <div className="fade-up-1" style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
            From street to <span style={{ color: 'var(--accent)' }}>bankable</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 13, maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
            4-agent AI system that evaluates African SME creditworthiness using alternative data
            and triggers autonomous loan disbursement via X402 payments.
          </p>
        </div>

        {/* Agent Steps */}
        <div className="fade-up-2" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          marginBottom: 40,
        }}>
          {steps.map((step, i) => (
            <div key={step.id} style={{
              background: step.status !== 'idle' ? 'var(--card)' : 'var(--surface)',
              borderTop: `3px solid ${step.color}`,
              borderRight: `1px solid ${step.status !== 'idle' ? step.color : 'var(--border)'}`,
              borderBottom: `1px solid ${step.status !== 'idle' ? step.color : 'var(--border)'}`,
              borderLeft: `1px solid ${step.status !== 'idle' ? step.color : 'var(--border)'}`,
              borderRadius: 8,
              padding: '14px 12px',
              transition: 'all 0.3s',
              boxShadow: step.status === 'running' ? `0 0 20px ${step.color}33` : 'none',
            }}>
              <div style={{ fontSize: 9, color: step.color, letterSpacing: 2, marginBottom: 6, textTransform: 'uppercase' }}>
                Agent {step.id}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{step.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {step.status === 'idle' && (
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>● Standby</span>
                )}
                {step.status === 'running' && (
                  <span style={{ fontSize: 10, color: step.color, animation: 'pulse-dot 1s infinite' }}>● Running</span>
                )}
                {step.status === 'done' && (
                  <span style={{ fontSize: 10, color: 'var(--green)' }}>✓ Complete</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="fade-up-3" style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 32,
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>
            SME Loan Application
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[
              { key: 'businessName', label: 'Business Name', placeholder: 'e.g. Amaka Foods Ltd' },
              { key: 'phoneNumber', label: 'Phone Number', placeholder: 'e.g. 08012345678' },
              { key: 'bvn', label: 'BVN', placeholder: 'e.g. 12345678901' },
              { key: 'businessRegNumber', label: 'Business Reg. Number', placeholder: 'e.g. RC123456' },
              { key: 'requestedLoanAmount', label: 'Loan Amount (₦)', placeholder: 'e.g. 500000' },
              { key: 'recipientWalletAddress', label: 'Wallet Address (0x...)', placeholder: '0xD2885...' },
            ].map(field => (
              <div key={field.key}>
                <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>
                  {field.label}
                </div>
                <input
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '10px 12px',
                    color: 'var(--text)',
                    fontSize: 12,
                    fontFamily: 'DM Mono, monospace',
                    outline: 'none',
                  }}
                />
              </div>
            ))}
          </div>

          {error && (
            <div style={{
              background: '#1A0810',
              border: '1px solid var(--red)',
              borderRadius: 6,
              padding: '10px 14px',
              fontSize: 12,
              color: 'var(--red)',
              marginBottom: 16,
            }}>
              ⚠ {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? 'var(--dim)' : 'var(--accent)',
              color: loading ? 'var(--muted)' : 'var(--bg)',
              border: 'none',
              borderRadius: 6,
              padding: '14px 24px',
              fontSize: 12,
              fontFamily: 'DM Mono, monospace',
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {loading ? '⟳ Running Agents...' : '→ Run Credit Pipeline'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Summary Card */}
            <div style={{
              background: 'var(--card)',
              border: `1px solid ${statusColor(result.pipelineStatus)}`,
              borderRadius: 12,
              padding: 28,
              boxShadow: `0 0 40px ${statusColor(result.pipelineStatus)}22`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: 2, marginBottom: 6 }}>PIPELINE RESULT</div>
                  <h3 style={{ fontSize: 24, fontWeight: 800 }}>{result.businessName}</h3>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                    Completed in {result.durationSeconds}s · {new Date().toLocaleString()}
                  </div>
                </div>
                <div style={{
                  background: `${statusColor(result.pipelineStatus)}22`,
                  border: `1px solid ${statusColor(result.pipelineStatus)}`,
                  borderRadius: 6,
                  padding: '8px 16px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: statusColor(result.pipelineStatus),
                  letterSpacing: 2,
                }}>
                  {result.pipelineStatus}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                  { label: 'Credit Score', value: `${result.summary.creditScore}/100`, color: tierColor(result.summary.riskTier) },
                  { label: 'Risk Tier', value: result.summary.riskTier, color: tierColor(result.summary.riskTier) },
                  { label: 'Compliance', value: result.summary.complianceDecision, color: result.summary.complianceDecision === 'PASS' ? 'var(--green)' : 'var(--gold)' },
                  { label: 'Disbursed', value: `₦${result.summary.amountDisbursed.toLocaleString()}`, color: 'var(--green)' },
                ].map(stat => (
                  <div key={stat.label} style={{
                    background: 'var(--surface)',
                    borderRadius: 8,
                    padding: '14px 16px',
                    border: '1px solid var(--border)',
                  }}>
                    <div style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>{stat.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: stat.color, fontFamily: 'Syne, sans-serif' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Narrative */}
            <div style={{
              background: 'var(--surface)',
              borderTop: '1px solid var(--border)',
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              borderLeft: '3px solid var(--gold)',
              borderRadius: 8,
              padding: '18px 20px',
            }}>
              <div style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: 2, marginBottom: 10 }}>AI RISK NARRATIVE</div>
              <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.8 }}>{result.agents.risk.narrativeExplanation}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--green)', letterSpacing: 1, marginBottom: 8 }}>✓ STRENGTHS</div>
                  {result.agents.risk.keyStrengths.map((s: string, i: number) => (
                    <div key={i} style={{ fontSize: 11, color: 'var(--muted)', padding: '3px 0', lineHeight: 1.6 }}>· {s}</div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--red)', letterSpacing: 1, marginBottom: 8 }}>⚠ RISKS</div>
                  {result.agents.risk.keyRisks.map((r: string, i: number) => (
                    <div key={i} style={{ fontSize: 11, color: 'var(--muted)', padding: '3px 0', lineHeight: 1.6 }}>· {r}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audit Log */}
            <div style={{
              background: 'var(--surface)',
              borderTop: '1px solid var(--border)',
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              borderLeft: '3px solid var(--accent)',
              borderRadius: 8,
              padding: '18px 20px',
            }}>
              <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: 2, marginBottom: 12 }}>AUDIT TRAIL</div>
              {[
                { label: 'Transaction Hash', value: result.agents.disbursement.transactionHash },
                { label: 'Recipient Wallet', value: result.agents.disbursement.recipientWalletAddress },
                { label: 'Compliance Narrative', value: result.agents.compliance.complianceNarrative },
                { label: 'Disbursed At', value: result.agents.disbursement.disbursedAt },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: 12,
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border)',
                  alignItems: 'flex-start',
                }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: 1, textTransform: 'uppercase', paddingTop: 2 }}>{row.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.6, wordBreak: 'break-all' }}>{row.value}</div>
                </div>
              ))}
            </div>

            {/* Try again */}
            <button
              onClick={() => { setResult(null); setSteps(initialSteps); setForm({ businessName: '', phoneNumber: '', bvn: '', businessRegNumber: '', requestedLoanAmount: '', recipientWalletAddress: '' }); }}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '12px 24px',
                fontSize: 11,
                color: 'var(--muted)',
                fontFamily: 'DM Mono, monospace',
                cursor: 'pointer',
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              ← New Application
            </button>
          </div>
        )}
      </div>
    </main>
  );
}