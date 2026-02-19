const SaleTicket = ({ sale }) => {
  if (!sale) return null;
  return (
    <div
      className="ticket-print-style"
      style={{
        width: '270px',
        background: '#fff',
        fontFamily: 'monospace',
        fontSize: '13px',
        margin: '0 auto',
        marginTop: '8px',
        letterSpacing: '0.5px',
        boxSizing: 'border-box',
        border: '1px dashed #bbb',
        borderTop: '8px double #222',
        borderBottom: '8px double #222',
        padding: '12px',
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact',
        pageBreakInside: 'avoid',
      }}
    >
      <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '15px', letterSpacing: '1px', marginBottom: '2px' }}>
        TICKET DE VENTA
      </div>
      <div style={{ textAlign: 'center', fontSize: '11px', color: '#666', marginBottom: '0px' }}>
        Prueba ticket
      </div>
      <div style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', marginBottom: '4px' }}>
        {sale.date}
      </div>
      <hr style={{ border: 'none', borderTop: '1px dashed #bbb', margin: '6px 0' }} />
      <div style={{ fontWeight: 600, fontSize: '12px', marginBottom: '0px' }}>
        Cliente: <span style={{ fontWeight: 400 }}>{sale.customer || "-"}</span>
      </div>
      <div style={{ fontWeight: 600, fontSize: '12px', marginBottom: '4px' }}>
        Estado: <span style={{ fontWeight: 400 }}>{sale.status}</span>
      </div>
      <hr style={{ border: 'none', borderTop: '1px dashed #bbb', margin: '6px 0' }} />
      <div style={{ marginBottom: '4px' }}>
        {sale.products.map((prod, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '13px' }}>
            <span>{prod.qty} x</span>
            <span style={{ flex: 1, textAlign: 'left', marginLeft: '4px', marginRight: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.name}</span>
            <span>${prod.price}</span>
          </div>
        ))}
      </div>
      <hr style={{ border: 'none', borderTop: '1px dashed #bbb', margin: '6px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '13px', marginBottom: '0px' }}>
        <span>Total:</span>
        <span>${sale.total}</span>
      </div>
      <hr style={{ border: 'none', borderTop: '1px dashed #bbb', margin: '6px 0' }} />
      <div style={{ textAlign: 'center', color: '#888', fontSize: '11px', marginTop: '4px' }}>
        ¡Gracias por su compra!
      </div>
      {/* Estilos de impresión para asegurar formato igual en print y preview */}
      <style>{`
@media print {
  @page {
    size: 80mm auto;
    margin: 0;
  }
  html, body {
    width: 100vw !important;
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  #ticket-print-area, .ticket-print-style {
    width: 80mm !important;
    min-width: 80mm !important;
    max-width: 80mm !important;
    margin: 0 !important;
    background: #fff !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
    border: none !important;
    font-family: monospace !important;
    font-size: 13px !important;
    letter-spacing: 0.5px !important;
    color-adjust: exact !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    page-break-inside: avoid !important;
    display: block !important;
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
  }
  .ticket-print-style, .ticket-print-style * {
    border-color: #222 !important;
    color: #111 !important;
  }
  body > *:not(#ticket-print-area):not(.ticket-print-style) {
    display: none !important;
  }
}
`}</style>
    </div>
  );
};

export default SaleTicket;
