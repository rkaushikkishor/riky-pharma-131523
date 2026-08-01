import '../../styles/print.css';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard, Banknote, Smartphone, Printer,
  CheckCircle, Package, Send, ShieldCheck,
  Receipt, ChevronUp, Phone,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Order, CartItem } from '../App';
import logoImage from '../../imports/Screenshot_2026-04-05_232705.png';
import {
  springs, btnHover, btnTap, staggerContainer,
  staggerItem, modalVariants,
} from '../utils/motionConfig';

interface PaymentPageProps {
  order: Order;
  onClearCart: () => void;
}

type PaymentMethod = 'upi' | 'cash' | 'card';

// ─── helpers ──────────────────────────────────────────────────────────────────
const GST_RATE = 0.05;
const gstOf = (mrp: number) => (mrp * GST_RATE) / (1 + GST_RATE);

function buildWhatsAppUrl(items: CartItem[], grandTotal: number): string {
  const lines = items
    .map(
      (item, i) =>
        `${i + 1}. ${item.name}%0A` +
        `   Qty: ${item.quantity}%0A` +
        `   MRP: Rs.${(item.mrp * item.quantity).toFixed(2)}%0A` +
        `   GST (5%25): Rs.${(gstOf(item.mrp) * item.quantity).toFixed(2)}`
    )
    .join('%0A%0A');
  return (
    `https://wa.me/919789555188?text=` +
    `Hello%20Riky%20Pharma!%20New%20Order%20Placed.%0A%0A` +
    lines +
    `%0A%0A*Total%20Bill%20Amount:*%20Rs.${grandTotal.toFixed(2)}` +
    `%0A%0APlease%20confirm%20and%20dispatch.`
  );
}

function buildSmsUrl(items: CartItem[], grandTotal: number): string {
  const lines = items
    .map(
      (item) =>
        `${item.name},Qty:${item.quantity},MRP:Rs.${(item.mrp * item.quantity).toFixed(2)},GST(5%25):Rs.${(gstOf(item.mrp) * item.quantity).toFixed(2)}`
    )
    .join('%20|%20');
  return `sms:+919789555188?body=Riky%20Pharma%20Order:%20${lines}%20|%20Total:Rs.${grandTotal.toFixed(2)}`;
}

// ─── Printable Bill ───────────────────────────────────────────────────────────
/**
 * This component renders into DOM id="riky-print-bill".
 * The @media print CSS in print.css makes ONLY this element visible when
 * the user clicks Print / Save as PDF.
 */
function PrintableBill({ order }: { order: Order }) {
  const totalQty  = order.items.reduce((s, i) => s + i.quantity, 0);
  const totalGst  = order.items.reduce((s, i) => s + gstOf(i.mrp) * i.quantity, 0);
  const grandTotal = order.total;

  return (
    <div
      id="riky-print-bill"
      className="bg-white text-gray-900 font-sans"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* ── Header ── */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #1e3a5f', paddingBottom: '10px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '4px' }}>
          <img src={logoImage} alt="Riky Pharma" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '20pt', fontWeight: '900', color: '#1e3a5f' }}>Riky Pharma</div>
            <div style={{ fontSize: '8pt', color: '#666' }}>Pharmaceutical Wholesaler &amp; Distributor</div>
          </div>
        </div>
        <div style={{ fontSize: '8.5pt', color: '#444', lineHeight: '1.6' }}>
          Owned by B. Indumathi Ramkumar<br />
          Tamil Sangam Road, Maninagaram, Madurai, Tamil Nadu – 625001<br />
          Ph: 9789555188 &nbsp;|&nbsp; Email: rikyfamily1@gmail.com
        </div>
        <div style={{ marginTop: '6px', fontSize: '13pt', fontWeight: '700', letterSpacing: '2px', color: '#1e3a5f' }}>
          TAX INVOICE
        </div>
      </div>

      {/* ── Bill meta ── */}
      <table style={{ width: '100%', marginBottom: '10px', fontSize: '9.5pt' }}>
        <tbody>
          <tr>
            <td style={{ width: '50%', verticalAlign: 'top' }}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ color: '#666', paddingRight: '8px', paddingBottom: '3px' }}>Bill No.</td>
                    <td style={{ fontWeight: '700' }}>{order.billNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#666', paddingRight: '8px', paddingBottom: '3px' }}>Date</td>
                    <td style={{ fontWeight: '700' }}>
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: '#666', paddingRight: '8px' }}>Time</td>
                    <td style={{ fontWeight: '700' }}>
                      {new Date(order.date).toLocaleTimeString('en-IN', {
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td style={{ width: '50%', verticalAlign: 'top', textAlign: 'right' }}>
              <table style={{ marginLeft: 'auto' }}>
                <tbody>
                  <tr>
                    <td style={{ color: '#666', paddingRight: '8px', paddingBottom: '3px' }}>Customer</td>
                    <td style={{ fontWeight: '700' }}>{order.user.name}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#666', paddingRight: '8px' }}>Mobile</td>
                    <td style={{ fontWeight: '700' }}>{order.user.mobile}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ── Line items table ── */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e3a5f', color: '#fff' }}>
            <th style={{ padding: '6px 8px', textAlign: 'left',   fontSize: '9pt', border: '1px solid #1e3a5f' }}>#</th>
            <th style={{ padding: '6px 8px', textAlign: 'left',   fontSize: '9pt', border: '1px solid #1e3a5f' }}>Product</th>
            <th style={{ padding: '6px 8px', textAlign: 'left',   fontSize: '9pt', border: '1px solid #1e3a5f' }}>Composition</th>
            <th style={{ padding: '6px 8px', textAlign: 'center', fontSize: '9pt', border: '1px solid #1e3a5f' }}>Qty</th>
            <th style={{ padding: '6px 8px', textAlign: 'right',  fontSize: '9pt', border: '1px solid #1e3a5f' }}>Unit MRP</th>
            <th style={{ padding: '6px 8px', textAlign: 'right',  fontSize: '9pt', border: '1px solid #1e3a5f' }}>GST&nbsp;5%</th>
            <th style={{ padding: '6px 8px', textAlign: 'right',  fontSize: '9pt', border: '1px solid #1e3a5f', fontWeight: '700' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => {
            const lineTotal = item.mrp * item.quantity;
            const lineGst   = gstOf(item.mrp) * item.quantity;
            return (
              <tr
                key={item.id}
                style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f7f8fa' }}
                className="print-no-break"
              >
                <td style={{ padding: '5px 8px', border: '1px solid #ddd', fontSize: '9pt', color: '#666' }}>
                  {index + 1}
                </td>
                <td style={{ padding: '5px 8px', border: '1px solid #ddd', fontSize: '9pt', fontWeight: '600' }}>
                  {item.name}
                </td>
                <td style={{ padding: '5px 8px', border: '1px solid #ddd', fontSize: '8.5pt', color: '#555' }}>
                  {item.composition}
                </td>
                <td style={{ padding: '5px 8px', border: '1px solid #ddd', fontSize: '9pt', textAlign: 'center', fontWeight: '700' }}>
                  {item.quantity}
                </td>
                <td style={{ padding: '5px 8px', border: '1px solid #ddd', fontSize: '9pt', textAlign: 'right' }}>
                  ₹{item.mrp.toFixed(2)}
                </td>
                <td style={{ padding: '5px 8px', border: '1px solid #ddd', fontSize: '9pt', textAlign: 'right', color: '#b45309' }}>
                  ₹{lineGst.toFixed(2)}
                </td>
                <td style={{ padding: '5px 8px', border: '1px solid #ddd', fontSize: '9pt', textAlign: 'right', fontWeight: '700' }}>
                  ₹{lineTotal.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ── Totals summary ── */}
      <table style={{ width: '100%', marginBottom: '12px' }}>
        <tbody>
          <tr>
            <td style={{ width: '55%' }}></td>
            <td style={{ width: '45%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5pt' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '3px 8px', color: '#555' }}>Total Quantity</td>
                    <td style={{ padding: '3px 8px', textAlign: 'right', fontWeight: '600' }}>{totalQty} units</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 8px', color: '#555' }}>Sub-Total (MRP)</td>
                    <td style={{ padding: '3px 8px', textAlign: 'right', fontWeight: '600' }}>₹{grandTotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 8px', color: '#b45309' }}>GST @ 5% (included)</td>
                    <td style={{ padding: '3px 8px', textAlign: 'right', fontWeight: '600', color: '#b45309' }}>₹{totalGst.toFixed(2)}</td>
                  </tr>
                  <tr className="print-total-row" style={{ borderTop: '2.5px solid #1e3a5f' }}>
                    <td style={{ padding: '6px 8px', fontWeight: '900', fontSize: '11pt', color: '#1e3a5f' }}>
                      Total Payable Amount
                    </td>
                    <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: '900', fontSize: '13pt', color: '#166534' }}>
                      ₹{grandTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ── Amount in words ── */}
      <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '6px 10px', marginBottom: '12px', fontSize: '9pt', backgroundColor: '#f0fdf4' }}>
        <strong>Amount in Words:</strong>&nbsp;
        {numberToWords(Math.round(grandTotal))} Rupees Only
      </div>

      {/* ── Declaration ── */}
      <div style={{ fontSize: '8pt', color: '#666', marginBottom: '12px', lineHeight: '1.6' }}>
        Declaration: This invoice is system-generated. Goods once sold will not be taken back. All disputes subject to Madurai jurisdiction.
      </div>

      {/* ── Footer ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '24px', fontSize: '8.5pt' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ borderTop: '1px solid #333', paddingTop: '4px', width: '140px' }}>Customer Signature</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '8pt', color: '#666', marginBottom: '4px' }}>For Riky Pharma</div>
          <div style={{ borderTop: '1px solid #333', paddingTop: '4px', width: '140px' }}>Authorised Signatory</div>
        </div>
      </div>

      <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '8pt', color: '#888', borderTop: '1px solid #ddd', paddingTop: '6px' }}>
        Thank you for choosing Riky Pharma — Your Trusted Health Partner Since 2017
      </div>
    </div>
  );
}

// ─── simple number-to-words (up to crore range) ───────────────────────────────
function numberToWords(n: number): string {
  if (n === 0) return 'Zero';
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const convert = (num: number): string => {
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + convert(num % 100) : '');
    if (num < 100000) return convert(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + convert(num % 1000) : '');
    if (num < 10000000) return convert(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + convert(num % 100000) : '');
    return convert(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + convert(num % 10000000) : '');
  };
  return convert(n);
}

// ─── item summary grid ────────────────────────────────────────────────────────
function ItemSummaryGrid({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(true);
  const grandTotal = order.total;
  const totalGst   = order.items.reduce((s, i) => s + gstOf(i.mrp) * i.quantity, 0);
  const totalQty   = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-[#f7f8fa]">
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white"
      >
        <div className="flex items-center gap-2.5">
          <Receipt className="w-4 h-4 text-blue-300" />
          <span className="font-bold text-sm tracking-wide">Order Line Items</span>
          <span className="bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {order.items.length} product{order.items.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-green-300 text-sm">₹{grandTotal.toFixed(2)}</span>
          <motion.div animate={{ rotate: expanded ? 0 : -90 }} transition={springs.swift}>
            <ChevronUp className="w-4 h-4 text-slate-300" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ...springs.gentle, opacity: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="p-4 space-y-2.5 max-h-72 overflow-y-auto scroll-area"
            >
              {order.items.map((item, i) => {
                const lineTotal = item.mrp * item.quantity;
                const lineGst   = gstOf(item.mrp) * item.quantity;
                return (
                  <motion.div
                    key={item.id}
                    variants={staggerItem}
                    className="bg-white rounded-xl border border-slate-200/80 p-3.5 hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                        <Package className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 text-sm truncate">{item.name}</p>
                        <p className="text-slate-400 text-xs mt-0.5 truncate">{item.composition}</p>
                        <div className="flex gap-1.5 mt-1.5">
                          <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">{item.category}</span>
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[9px] text-slate-400">MRP</p>
                        <p className="text-slate-800 font-bold text-sm">₹{lineTotal.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="mt-2.5 pt-2.5 border-t border-dashed border-slate-200 grid grid-cols-3 gap-1 text-center">
                      <div>
                        <p className="text-[8px] text-slate-400 uppercase tracking-wider">Unit MRP</p>
                        <p className="text-xs font-semibold text-slate-700">₹{item.mrp.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-400 uppercase tracking-wider">GST 5%</p>
                        <p className="text-xs font-semibold text-amber-600">₹{lineGst.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-400 uppercase tracking-wider">Total</p>
                        <p className="text-xs font-bold text-emerald-600">₹{lineTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* footer totals */}
      <div className="border-t border-slate-200 bg-white px-5 py-4 space-y-2">
        <div className="flex justify-between text-xs text-slate-500 pb-2 border-b border-dashed border-slate-200">
          <span>Customer</span>
          <span className="font-semibold text-slate-700">{order.user.name} · {order.user.mobile}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>Total Quantity</span>
          <span className="font-semibold text-slate-700">{totalQty} units</span>
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>MRP Amount</span>
          <span className="font-semibold text-slate-700">₹{grandTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs text-amber-600">
          <span>GST (5%) included</span>
          <span className="font-semibold">₹{totalGst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t-2 border-slate-800">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Total Payable Amount</p>
            <p className="text-[9px] text-slate-400">MRP inclusive of all taxes</p>
          </div>
          <p className="text-2xl font-black text-slate-900">₹{grandTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

// ─── notification panel ───────────────────────────────────────────────────────
function NotificationPanel({ order }: { order: Order }) {
  const [waSent, setWaSent]   = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const waUrl  = buildWhatsAppUrl(order.items, order.total);
  const smsUrl = buildSmsUrl(order.items, order.total);

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-5 py-3.5 flex items-center gap-2.5">
        <Send className="w-4 h-4 text-blue-300" />
        <span className="text-white font-bold text-sm tracking-wide">Send Order Notification</span>
      </div>
      <div className="bg-[#f7f8fa] p-4 space-y-3">
        {/* preview */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">Message Preview</p>
          {order.items.slice(0, 2).map((item, i) => (
            <div key={i} className="flex justify-between text-xs text-slate-600">
              <span className="truncate mr-2">📦 {item.name} × {item.quantity}</span>
              <span className="font-semibold whitespace-nowrap">₹{(item.mrp * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <p className="text-[10px] text-slate-400 italic">+{order.items.length - 2} more…</p>
          )}
          <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between text-xs font-bold">
            <span className="text-slate-600">*Total Bill Amount:*</span>
            <span className="text-slate-900">Rs.{order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* WhatsApp */}
        <motion.a
          href={waUrl} target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.025, boxShadow: '0 12px 28px rgba(22,163,74,0.35)' }}
          whileTap={{ scale: 0.975 }}
          transition={springs.swift}
          onClick={() => setWaSent(true)}
          className="flex items-center gap-3 w-full bg-[#25D366] hover:bg-[#20bc5c] text-white px-5 py-3.5 rounded-xl font-bold shadow-lg transition-colors relative overflow-hidden"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="text-sm relative z-10">{waSent ? '✓ Sent via WhatsApp' : 'Send via WhatsApp'}</span>
          <span className="ml-auto text-xs text-white/70 font-normal hidden sm:block">9789555188</span>
          <motion.div className="absolute inset-0 bg-white/15 skew-x-12 -translate-x-full" whileHover={{ translateX: '200%' }} transition={{ duration: 0.5 }} />
        </motion.a>

        {/* SMS */}
        <motion.a
          href={smsUrl}
          whileHover={{ scale: 1.025, boxShadow: '0 12px 28px rgba(37,99,235,0.3)' }}
          whileTap={{ scale: 0.975 }}
          transition={springs.swift}
          onClick={() => setSmsSent(true)}
          className="flex items-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 rounded-xl font-bold shadow-lg transition-colors relative overflow-hidden"
        >
          <Phone className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm relative z-10">{smsSent ? '✓ SMS Triggered' : 'Send via SMS'}</span>
          <span className="ml-auto text-xs text-white/70 font-normal hidden sm:block">9789555188</span>
          <motion.div className="absolute inset-0 bg-white/15 skew-x-12 -translate-x-full" whileHover={{ translateX: '200%' }} transition={{ duration: 0.5 }} />
        </motion.a>

        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
          Tapping either button pre-fills a complete order message with product, quantity, MRP, GST &amp; total.
        </p>
      </div>
    </div>
  );
}

// ─── payment method config ────────────────────────────────────────────────────
const paymentMethods = [
  { id: 'upi'  as PaymentMethod, label: 'UPI Payment',  sublabel: 'Scan QR · instant',    icon: Smartphone, activeBg: 'bg-blue-600',   activeBorder: 'border-blue-500'  },
  { id: 'cash' as PaymentMethod, label: 'Cash Payment', sublabel: 'Pay at the counter',   icon: Banknote,   activeBg: 'bg-green-600',  activeBorder: 'border-green-500' },
  { id: 'card' as PaymentMethod, label: 'Card Payment', sublabel: 'Debit / Credit card',  icon: CreditCard, activeBg: 'bg-purple-600', activeBorder: 'border-purple-500'},
];

// ─── main page ────────────────────────────────────────────────────────────────
export default function PaymentPage({ order, onClearCart }: PaymentPageProps) {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('upi');
  const [confirming, setConfirming] = useState(false);

  const upiId     = 'crramkumar1976-2@okicici';
  const upiString = `upi://pay?pa=${upiId}&pn=Riky Pharma&am=${order.total.toFixed(2)}&cu=INR`;

  const handlePrint = () => window.print();

  const handlePaymentComplete = async () => {
    setConfirming(true);
    await new Promise(r => setTimeout(r, 600));
    onClearCart();
    navigate('/success');
  };

  return (
    <div className="size-full min-h-screen p-4 md:p-8">
      {/*
        PrintableBill is always in the DOM (hidden on screen via opacity-0 / pointer-events-none).
        @media print in print.css makes ONLY #riky-print-bill visible — the rest of the page
        (this wrapper div and everything in it) is hidden via `body * { visibility: hidden }`.
      */}
      <div className="hidden">
        <PrintableBill order={order} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* page header */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.snappy}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-lg border border-white/40 rounded-full px-5 py-2 shadow-md mb-3">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Secure Checkout</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Payment & Bill</h1>
          <p className="text-slate-400 text-sm mt-1 font-mono">Bill #{order.billNumber}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── COL 1: on-screen bill preview + print/pdf actions ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springs.gentle, delay: 0.05 }}
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 overflow-hidden h-full flex flex-col">
              {/* on-screen bill preview (purely cosmetic, not used for print) */}
              <div className="p-6 flex-1">
                <div className="text-center mb-5 pb-4 border-b-2 border-gray-100">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <img src={logoImage} alt="Riky Pharma" className="w-10 h-10 object-contain" />
                    <div className="text-left">
                      <h2 className="text-lg font-black text-gray-800">Riky Pharma</h2>
                      <p className="text-[10px] text-gray-400">Pharmaceutical Wholesaler</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Owned by B. Indumathi Ramkumar<br />
                    Tamil Sangam Road, Maninagaram<br />
                    Madurai, Tamil Nadu – 625001<br />
                    Ph: 9789555188
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  {[
                    { l: 'Bill No.', v: order.billNumber },
                    { l: 'Date',     v: new Date(order.date).toLocaleDateString('en-IN') },
                    { l: 'Customer', v: order.user.name },
                    { l: 'Mobile',   v: order.user.mobile },
                  ].map(({ l, v }) => (
                    <div key={l}>
                      <p className="text-gray-400 text-[9px] uppercase tracking-wider">{l}</p>
                      <p className="font-semibold text-gray-800 text-xs">{v}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                        <th className="py-1.5 px-2 text-left">#</th>
                        <th className="py-1.5 px-2 text-left">Product</th>
                        <th className="py-1.5 px-2 text-center">Qty</th>
                        <th className="py-1.5 px-2 text-right">MRP</th>
                        <th className="py-1.5 px-2 text-right">GST</th>
                        <th className="py-1.5 px-2 text-right font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={item.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-1.5 px-2 text-gray-400">{i + 1}</td>
                          <td className="py-1.5 px-2">
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-[9px] text-gray-400">{item.composition}</p>
                          </td>
                          <td className="py-1.5 px-2 text-center font-bold">{item.quantity}</td>
                          <td className="py-1.5 px-2 text-right">₹{item.mrp.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-right text-amber-600 text-[10px]">₹{(gstOf(item.mrp) * item.quantity).toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-right font-bold">₹{(item.mrp * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t-2 border-gray-200 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-amber-600">
                    <span>GST (5%) included</span>
                    <span className="font-semibold">₹{order.items.reduce((s, i) => s + gstOf(i.mrp) * i.quantity, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-black text-base text-gray-900 pt-1 border-t border-gray-200">
                    <span>Total Payable Amount</span>
                    <span className="text-green-700">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>

                <p className="mt-4 text-center text-[9px] text-gray-400 border-t border-gray-100 pt-3">
                  Thank you for choosing Riky Pharma · 9789555188
                </p>
              </div>

              {/* print / PDF buttons */}
              <div className="p-3 bg-slate-50 border-t border-slate-200">
                <motion.button
                  whileHover={btnHover}
                  whileTap={btnTap}
                  onClick={handlePrint}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow"
                >
                  <Printer className="w-4 h-4" />
                  Print Bill / Save as PDF
                </motion.button>
                <p className="text-center text-[10px] text-slate-400 mt-2">
                  In the print dialog choose <strong>"Save as PDF"</strong> to download
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── COL 2: item summary grid + notification ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.12 }}
            className="flex flex-col gap-6"
          >
            <ItemSummaryGrid order={order} />
            <NotificationPanel order={order} />
          </motion.div>

          {/* ── COL 3: payment method + confirm ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springs.gentle, delay: 0.18 }}
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-5 py-4 flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-blue-300" />
                <span className="text-white font-bold text-sm tracking-wide">Payment Method</span>
              </div>
              <div className="p-5 space-y-3">
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-2.5">
                  {paymentMethods.map(m => {
                    const Icon = m.icon;
                    const isActive = selectedPayment === m.id;
                    return (
                      <motion.button
                        key={m.id}
                        variants={staggerItem}
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedPayment(m.id)}
                        className={`w-full p-3.5 rounded-xl border-2 flex items-center gap-3 relative overflow-hidden transition-all ${
                          isActive ? `${m.activeBorder} bg-white shadow-md` : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                        }`}
                      >
                        <AnimatePresence>
                          {isActive && (
                            <motion.div key="bar"
                              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }}
                              className={`absolute left-0 top-0 bottom-0 w-1 ${m.activeBg} origin-center rounded-l-xl`}
                            />
                          )}
                        </AnimatePresence>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isActive ? m.activeBg : 'bg-gray-200'} transition-colors`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-slate-800 text-sm">{m.label}</p>
                          <p className="text-slate-400 text-xs">{m.sublabel}</p>
                        </div>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                              transition={springs.bouncy}
                              className={`w-4 h-4 rounded-full border-2 ${m.activeBorder} flex items-center justify-center`}
                            >
                              <div className={`w-2 h-2 rounded-full ${m.activeBg}`} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </motion.div>

                <AnimatePresence mode="wait">
                  {selectedPayment === 'upi' && (
                    <motion.div key="upi" variants={modalVariants} initial="initial" animate="animate" exit="exit"
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 text-center border border-blue-100">
                      <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Scan to Pay</p>
                      <div className="bg-white p-3 rounded-xl shadow-md w-fit mx-auto">
                        <QRCodeSVG value={upiString} size={160} level="H" />
                      </div>
                      <p className="text-slate-500 text-[10px] mt-3 font-mono">{upiId}</p>
                      <p className="text-blue-700 text-xl font-black mt-1">₹{order.total.toFixed(2)}</p>
                    </motion.div>
                  )}
                  {selectedPayment === 'cash' && (
                    <motion.div key="cash" variants={modalVariants} initial="initial" animate="animate" exit="exit"
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-100">
                      <motion.div animate={{ rotate: [0, -4, 4, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}>
                        <Banknote className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-slate-600 text-sm font-semibold mb-1">Cash at Counter</p>
                      <p className="text-green-700 text-2xl font-black">₹{order.total.toFixed(2)}</p>
                    </motion.div>
                  )}
                  {selectedPayment === 'card' && (
                    <motion.div key="card" variants={modalVariants} initial="initial" animate="animate" exit="exit"
                      className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 text-center border border-purple-100">
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                        <CreditCard className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-slate-600 text-sm font-semibold mb-1">Swipe / Insert Card</p>
                      <p className="text-purple-700 text-2xl font-black">₹{order.total.toFixed(2)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* total reminder bar */}
                <div className="bg-slate-800 rounded-xl px-4 py-3 flex justify-between items-center">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Payable</p>
                  <p className="text-white font-black text-lg">₹{order.total.toFixed(2)}</p>
                </div>

                {/* confirm */}
                <motion.button
                  whileHover={!confirming ? btnHover : {}} whileTap={!confirming ? btnTap : {}}
                  disabled={confirming}
                  onClick={handlePaymentComplete}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-80"
                >
                  <AnimatePresence mode="wait">
                    {confirming ? (
                      <motion.span key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Confirming…
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Confirm Payment
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <motion.div className="absolute inset-0 bg-white/15 skew-x-12 -translate-x-full" whileHover={{ translateX: '200%' }} transition={{ duration: 0.5 }} />
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
