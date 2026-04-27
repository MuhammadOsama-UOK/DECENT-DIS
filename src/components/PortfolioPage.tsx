import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/src/lib/utils';

const PROOFS = [
  { title: 'Corporate Payment Proof - PKR 150,000', image: '/cheque-150k.jpg' },
  { title: 'Project Clearance Receipt - PKR 5,600', image: '/cheque-5k.jpg' },
  { title: 'Bulk Transaction Receipt - PKR 100,000', image: '/cheque-100k.jpg' },
  { title: 'Service Advance Proof - PKR 20,000', image: '/cheque-20k.jpg' },
  { title: 'Small Item Purchase Proof - PKR 3,000', image: '/cheque-3k.jpg' }
];

const RENOVATION_IMAGES = [
  'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80'
];

export default function PortfolioPage() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 overflow-hidden selection:bg-primary-blue selection:text-white">
      <div className="portfolio-main-container max-w-7xl mx-auto">
        {/* PAYMENT PROOFS SECTION */}
        <div className="section-heading">
          <h2 className={cn(isUrdu && "urdu-text")}>
            {isUrdu ? "ادائیگی کے ثبوت اور شواہد" : "Payment Evidence & Proofs"}
          </h2>
        </div>
        <div className="proof-grid-system px-4 md:px-0">
          {PROOFS.map((proof, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="proof-card"
            >
              <span className="badge-verified">Verified Transaction</span>
              <img src={proof.image} className="proof-img" alt={proof.title} />
              <div className={cn("proof-info", isUrdu && "urdu-text")}>
                {isUrdu ? "مالی کلیئرنس رسید" : proof.title}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. RENOVATION GALLERY SECTION */}
        <div className="section-heading">
          <h2 className={cn(isUrdu && "urdu-text")}>
            {isUrdu ? "رینوویشن اور سائٹ ایگزیکیوشن" : "Renovation & Site Execution"}
          </h2>
        </div>
        <div className="reno-grid-system px-4 md:px-0">
          {RENOVATION_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="reno-card"
            >
              <img src={img} alt={`Work ${i+1}`} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-main-container {
            padding: 40px 10px;
            background-color: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
        }

        .section-heading {
            text-align: center;
            margin: 40px 0 30px;
        }

        .section-heading h2 {
            font-size: 28px;
            color: #1a2e44;
            text-transform: uppercase;
            display: inline-block;
            border-bottom: 3px solid #007bff;
            padding-bottom: 10px;
            font-weight: 800;
        }

        .logo-grid-system {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
            gap: 20px;
            align-items: center;
            margin-bottom: 60px;
        }

        .logo-box {
            text-align: center;
            padding: 10px;
        }

        .logo-box img {
            max-width: 100%;
            height: 60px;
            object-fit: contain;
            filter: grayscale(100%);
            opacity: 0.6;
            transition: 0.3s ease-in-out;
        }

        .logo-box:hover img {
            filter: grayscale(0%);
            opacity: 1;
            transform: scale(1.1);
        }

        .proof-grid-system {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 60px;
        }

        .proof-card {
            background: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }

        .proof-img {
            width: 100%;
            height: 220px;
            object-fit: contain;
            object-position: center;
            background: #ffffff;
            filter: blur(4px);
            transition: 0.5s;
            display: block;
        }

        .proof-card:hover .proof-img {
            filter: blur(2px);
            transform: scale(1.05);
        }

        .badge-verified {
            position: absolute;
            top: 15px;
            left: 15px;
            background: #28a745;
            color: white;
            padding: 4px 12px;
            font-size: 11px;
            border-radius: 50px;
            z-index: 2;
        }

        .proof-info {
            padding: 15px;
            text-align: center;
            font-weight: 600;
            font-size: 14px;
            background: #fff;
        }

        .reno-grid-system {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 15px;
        }

        .reno-card {
            height: 250px;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #eee;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .reno-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.5s;
            display: block;
        }

        .reno-card:hover img {
            transform: scale(1.1);
        }

        @media (max-width: 768px) {
            .logo-grid-system { grid-template-columns: repeat(3, 1fr); }
            .section-heading h2 { font-size: 22px; }
        }
      `}</style>
    </div>
  );
}

