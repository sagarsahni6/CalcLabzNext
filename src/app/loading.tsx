export default function Loading() {
  return (
    <div className="card" style={{ minHeight: '60vh' }}>
      {/* Breadcrumb skeleton */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <div style={{ width: '50px', height: '14px', borderRadius: '6px', background: 'var(--bg3)', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ width: '8px', height: '14px', borderRadius: '4px', background: 'var(--bg3)' }} />
        <div style={{ width: '120px', height: '14px', borderRadius: '6px', background: 'var(--bg3)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.1s' }} />
      </div>

      {/* Title skeleton */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ width: '65%', maxWidth: '400px', height: '28px', borderRadius: '8px', background: 'var(--bg3)', marginBottom: '10px', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ width: '85%', maxWidth: '500px', height: '16px', borderRadius: '6px', background: 'var(--bg3)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.15s' }} />
      </div>

      {/* Input fields skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ width: '80px', height: '12px', borderRadius: '4px', background: 'var(--bg3)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
            <div style={{ height: '44px', borderRadius: 'var(--r-sm)', background: 'var(--bg2)', border: '1px solid var(--brd)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.1 + 0.05}s` }} />
          </div>
        ))}
      </div>

      {/* Button skeleton */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <div style={{ flex: 1, height: '46px', borderRadius: 'var(--r-sm)', background: 'var(--bg3)', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ width: '100px', height: '46px', borderRadius: 'var(--r-sm)', background: 'var(--bg2)', border: '1px solid var(--brd)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.1s' }} />
      </div>

      {/* Results skeleton */}
      <div style={{ padding: '24px', background: 'var(--bg2)', borderRadius: 'var(--r-lg)', border: '1px solid var(--brd)' }}>
        <div style={{ width: '120px', height: '14px', borderRadius: '6px', background: 'var(--bg3)', marginBottom: '12px', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ width: '180px', height: '32px', borderRadius: '8px', background: 'var(--bg3)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: '0.1s' }} />
      </div>
    </div>
  );
}
