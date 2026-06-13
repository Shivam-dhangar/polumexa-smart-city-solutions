export type ChatMessage = { role: "user" | "assistant"; content: string };

export function getReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.match(/demo|pilot|trial|test/))
    return "We offer free 30-day pilots for municipalities, RWAs, and factories. Fill out the contact form and our team will reach out within 24 hours!";
  if (lower.match(/price|cost|pricing|plan|paid|₹|rupee/))
    return "We have Starter (₹49,999/mo for RWAs), Municipal (₹1.5L/mo for cities), and Enterprise (custom) plans. Check our Pricing section or contact us for a tailored quote!";
  if (lower.match(/feature|what.*do|how.*work|what.*offer|capability/))
    return "Polumexa offers AI waste segregation, IoT smart bins with real-time fill alerts, route optimization, citizen reward programs, carbon dashboards, and full ESG reporting — all in one platform.";
  if (lower.match(/bin|iot|sensor|fill|hardware/))
    return "Our smart bins use IoT sensors to monitor fill levels 24/7, trigger automatic pickup requests, and feed live telemetry to the command dashboard — with ≤2-second latency.";
  if (lower.match(/reward|point|citizen|gamif|incentive/))
    return "Citizens earn reward points for correct waste segregation, redeemable for discounts and local vouchers — driving 3× participation compared to traditional programs.";
  if (lower.match(/carbon|co2|environment|esg|green|sustain|emission/))
    return "Our platform tracks CO₂ reduction, trees saved, and recycling rates in real time, generating automatic ESG compliance reports for municipalities and corporate campuses.";
  if (lower.match(/government|municipality|municipal|smart city|civic|nagar/))
    return "Polumexa is Startup India certified and Smart City Mission compatible, with seamless integration into government digital infrastructure and SCADA/ERP systems.";
  if (lower.match(/route|vehicle|truck|pickup|fleet|driver/))
    return "Our AI route optimization reduces pickup vehicle fuel costs by up to 35%, planning optimal collection routes based on real-time bin fill levels and traffic data.";
  if (lower.match(/ai|segregat|sort|classif|machine learning|computer vision/))
    return "Our computer vision AI achieves 98% sorting accuracy, automatically identifying plastic, organic, paper, and metal waste at the point of disposal.";
  if (lower.match(/apartment|housing|society|rwa|residential|flat/))
    return "Our Starter plan is perfect for housing societies — deploy smart bins in each block, reward residents for correct segregation, and track impact in real time!";
  if (lower.match(/factory|industrial|manufactur|warehouse|plant/))
    return "For industrial clients we offer bulk waste tracking, hazardous material alerts, compliance reporting, and integration with existing ERP systems.";
  if (lower.match(/contact|reach|email|call|phone|number|address/))
    return "Reach us at hello@polumexa.com or fill out the contact form below. We're based in Narsinghpur, Madhya Pradesh and respond within one business day!";
  if (lower.match(/hello|hi\b|hey|greet|namaste|sup\b/))
    return "Hi there! 👋 I'm Polly, your Polumexa assistant. Ask me about smart bins, pricing, pilots, or anything about smart city waste management!";
  if (lower.match(/team|founder|who|company|about|founded/))
    return "Polumexa was founded by Sanskar Patwa (CEO), Shekhar Gupta (CTO), and Yashraj Singh (COO) — a team passionate about making Indian cities cleaner with technology.";
  if (lower.match(/install|setup|deploy|implement|how long|time/))
    return "Typical deployment takes 2–4 weeks: hardware installation, platform configuration, staff training, and go-live. Our team handles everything end-to-end.";
  if (lower.match(/app|mobile|android|ios|citizen app/))
    return "Yes! We have a citizen-facing mobile app (Android & iOS) where residents scan QR codes on bins, earn reward points, and track their recycling impact.";
  if (lower.match(/data|analytics|report|dashboard/))
    return "Our analytics dashboard shows live bin fill levels, waste composition, vehicle routes, carbon savings, and generates PDF/Excel reports for city councils and ESG auditors.";
  return "Great question! For detailed answers, please email hello@polumexa.com or fill out the contact form — our team responds within 24 hours.";
}
