import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import regeneratedImg from '../assets/images/regenerated_image_1778789751238.png';
import SEO from './SEO';

const SERVICE_DATA: Record<string, any> = {
  // Renovation
  'glass': {
    type: 'renovation',
    title: 'Glass Work',
    titleUr: 'گلاس ورک',
    desc: 'Smart Partitions, Glass Cabins & Toughened Glass Solutions.',
    romanUrdu: 'Ghar ya office me khubsurat glass partition aur cabins lagwayen taake space modern aur shaandar lage. Pure Karachi me sab se behtareen fitting aur hardware warranty k sath.',
    fullDesc: 'We provide premium glass work solutions for modern offices and commercial spaces. Our services include frameless glass partitions, toughened glass doors, smart switchable glass cabins, and custom decorative glass installations. Enhance your workspace aesthetics and bring in natural light with our durable, high-quality, and expertly engineered glass solutions.',
    fullDescUr: 'ہم جدید دفاتر اور تجارتی مقامات کے لیے پریمیم گلاس ورک سلوشنز فراہم کرتے ہیں۔ ہماری خدمات میں فریم لیس شیشے کے پارٹیشنز، سخت شیشے کے دروازے، اور کسٹم ڈیکوریٹو شیشے کی تنصیب شامل ہیں۔',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    features: ['Frameless Glass Partitions', 'Toughened Glass Doors', 'Smart Glass Cabins', 'Acoustic Glass Solutions'],
    seoTitle: "Why Invest in Our Premium Commercial Glass Solutions?",
    seoTitleUr: "ہمارا کمرشل گلاس ورک کیوں منتخب کریں؟",
    seoContent: "Modern corporate spaces demand transparency, elegance, and durability. Whether you require a sophisticated frameless entry, acoustic-rated meeting room cabins, or seamless switchable privacy glass, we install high-grade tempered materials ensuring long-term safety and aesthetic brilliance. Our dedicated team guarantees secure fittings, premium architectural hardware, and precision sealing that elevates your office ambiance.",
    seoContentUr: "آج کے جدید کارپوریٹ دفاتر شفافیت، خوبصورتی اور پائیداری کا تقاضا کرتے ہیں۔ چاہے آپ کو میٹنگ روم کے لیے ساؤنڈ پروف فریم لیس کیبن چاہیے یا سمارٹ پرائیویسی گلاس، ہم آپ کو بہترین ٹمپرڈ گلاس فراہم کرتے ہیں۔ ہماری ٹیم بہترین فٹنگ، پریمیم ہارڈویئر اور درست سیلنگ کی ضمانت دیتی ہے۔",
    ratesTitle: "Estimated Cost & Market Pricing",
    ratesTitleUr: "تخمینہ جات اور مارکیٹ کی قیمتیں",
    ratesDesc: "Actual pricing depends on square footage, glass density (8mm, 10mm, 12mm), and hardware choice (Patch fittings vs Floor springs). Standard 12mm tempered partitions typically range between PKR 850 to PKR 1,300 per sq.ft. Book a free consultation and site visit to get an exact measurement and quote instantly.",
    ratesDescUr: "شیشے کی موٹائی (8mm, 10mm, 12mm)، فٹنگ کے انداز اور مربع فٹ کے حساب سے قیمت مختلف ہوتی ہے۔ معیاری 12 ایم ایم ٹمپرڈ گلاس پارٹیشننگ عموماً 850 سے 1,300 روپے فی مربع فٹ تک ہوتی ہے۔ درست تخمینہ کے لیے آج ہی ہماری مفت سائیٹ وزٹ کی سہولت حاصل کریں۔"
  },
  'ceiling': {
    type: 'renovation',
    title: 'Designer Ceilings',
    titleUr: 'سیلنگ ڈیزائن',
    desc: 'Designer Gypsum ceilings, POP works & Grid Ceilings.',
    romanUrdu: 'Apne office ya ghar me fancy Gypsum ceilings banwayen jo mazboot aur behad khubsurat hon. Hamara kaam behtareen laser alignment k sath hota hai jis me koi jhol ya bending nahi ati.',
    fullDesc: 'Transform your office or residential space with our elegant designer ceiling solutions. We specialize in intricate Gypsum board ceilings, POP work, false ceilings, and acoustic grid ceilings. Proper ceiling design not only improves aesthetic appeal but also optimizes lighting and sound distribution within your environment.',
    fullDescUr: 'ہم بہترین ڈیزائنر سیلنگ، جپسم بورڈ سیلنگ اور پی او پی کے کام میں مہارت رکھتے ہیں۔ ایک اچھی سیلنگ نہ صرف خوبصورتی بڑھاتی ہے بلکہ روشنی اور آواز کی تقسیم کو بھی بہتر بناتی ہے۔',
    image: 'https://images.unsplash.com/photo-1660492039236-4e660d5a1a14?w=1200&auto=format&fit=crop&q=80',
    features: ['Gypsum Board False Ceilings', 'Acoustic Grid Ceilings', 'POP Designing & Execution', 'Integrated LED Lighting'],
    seoTitle: "Architectural Fake Ceilings & Lighting Integration",
    seoTitleUr: "جدید سیلنگ ڈیزائن اور لائٹنگ انٹیگریشن",
    seoContent: "The ceiling is the fifth wall of your room—it defines the acoustic balance and lighting topology of your space. We build rigid, laser-aligned, sag-free false ceilings using authentic Gypsum board and corrosion-resistant GI channels. From creating intricate layered borders with concealed cove lighting to functional commercial grid ceilings for hiding HVAC and cabling, we execute flawlessly.",
    seoContentUr: "چھت آپ کے کمرے کی پانچویں دیوار ہے جو آپ کی جگہ کی روشنی اور آواز کے توازن کو واضح کرتی ہے۔ ہم اصلی جپسم بورڈ اور زنگ سے پاک جی آئی چینلز کا استعمال کرتے ہوئے مضبوط اور پائیدار سیلنگ بناتے ہیں۔ خفیہ لائٹنگ سے لے کر کمرشل گرڈ سیلنگ تک، ہمارا کام بے مثال ہے۔",
    ratesTitle: "Ceiling Cost Estimations",
    ratesTitleUr: "سیلنگ کے اخراجات کا تخمینہ",
    ratesDesc: "Plain Gypsum false ceiling installations average between PKR 140 to PKR 180 per sq.ft. Designer drop ceilings with multiple steps and coves average between PKR 180 to PKR 250+ per sq.ft. Grid ceilings vary based on tile acoustics (PKR 130 - 200 per sq.ft). For completely tailored solutions, reach out to our project managers.",
    ratesDescUr: "سادہ جپسم فالس سیلنگ کی تنصیب عام طور پر 140 سے 180 روپے فی مربع فٹ کے درمیان ہوتی ہے۔ مختلف ڈیزائن اور اسٹیپس والی سیلنگ 180 سے 250+ روپے فی مربع فٹ تک جا سکتی ہے۔ گرڈ سیلنگ 130 سے 200 روپے کے درمیان ہوتی ہے۔ اپنے پروجیکٹ کے درست اخراجات جاننے کے لیے ہم سے رابطہ کریں۔"
  },
  'paint': {
    type: 'renovation',
    title: 'Premium Paint',
    titleUr: 'پریمیم پینٹ',
    desc: 'Luxury textures, Royal shine & Corporate finish paints.',
    romanUrdu: 'Seep (seepage) ya deewaron ki kharabi door kr k luxury wall finishes aur texture paints lagwayen. Hum professional putty layers aur high-quality weather shield use krtay hain taake paint saalo saal chalta rahay.',
    fullDesc: 'Revitalize your walls with our premium painting services. We offer a comprehensive range of painting solutions including luxury textures, corporate finishes, royal shine coats, and weather-resistant exterior paints. Our expert painters ensure flawless execution, using high-quality materials to guarantee long-lasting vibrance.',
    fullDescUr: 'ہمارے پریمیم پینٹ کی خدمات سے اپنی دیواروں کو نیا روپ دیں۔ ہم لگژری ٹیکسچر، کارپوریٹ فنشز اور پائیدار پینٹ سلوشنز پیش کرتے ہیں۔',
    image: 'https://images.unsplash.com/photo-1562619371-b67725b6fde2?auto=format&fit=crop&w=1200&q=80',
    features: ['Luxury Wall Textures', 'Corporate & Commercial Painting', 'Weather Shield Exterior', 'Surface Preparation & Putty'],
    seoTitle: "Enduring Finish: Luxury Paints & Weather Coating",
    seoTitleUr: "لازوال چمک: لگژری پینٹس اور ویدر کوٹنگ",
    seoContent: "Your walls speak to your brand. We strip away the flaking past, fix seepage, prepare an ultra-smooth base using multiple putty coats, and apply top-tier emulsions. From matt finishes to washable silks and robust exterior weather shields, our systematic approach prevents peeling and fading, giving you a fresh environment that truly lasts.",
    seoContentUr: "آپ کی دیواریں آپ کے برانڈ کی عکاسی کرتی ہیں۔ ہم پرانے پینٹ، نمی اور دراڑوں کو ختم کر کے ایک ہموار بیس بناتے ہیں اور اس کے بعد اعلیٰ کوالٹی کا پینٹ لگاتے ہیں۔ ہموار میٹ فنش، قابل دھلائی سلک یا بیرونی ویدر شیلڈ، ہم ہر طرح کے کام کی گارنٹی دیتے ہیں۔",
    ratesTitle: "Painting Labor & Material Estimates",
    ratesTitleUr: "پینٹ، لیبر اور میٹریل کا تخمینہ",
    ratesDesc: "Basic distemper and wall refresh can start as low as PKR 15 - 20 per sq.ft. However, premium plastic emulsions with deep wall base preparation and crack-filling costs roughly PKR 35 to PKR 65 per sq.ft covering labor and premium paints. High-end custom textures are quoted individually per wall.",
    ratesDescUr: "بنیادی پینٹ اور ریفریش عام طور پر 15 سے 20 روپے فی مربع فٹ سے شروع ہو سکتا ہے۔ تاہم، پریمیم پلاسٹک ایمولشن اور فلنگ کے ساتھ دیواروں کی مکمل تیاری پر لیبر اور پینٹ کے مٹیریل سمیت 35 سے 65 روپے فی مربع فٹ کا خرچ آتا ہے۔ کسٹم ٹیکسچر پینٹ کی قیمت فی دیوار مختلف ہوتی ہے۔"
  },
  'flooring': {
    type: 'renovation',
    title: 'Flooring',
    titleUr: 'فلورنگ',
    desc: 'Vinyl flooring, Italian Marble & High-end Tile works.',
    romanUrdu: 'Stylish aur lambay chalnay wale Vinyl floors, Italian Marble aur customized tiles lagwayen. Leveling aur joints bilkul zero error k sath fix hotay hain.',
    fullDesc: 'Upgrade your floors with our high-end flooring solutions. We supply and install imported vinyl flooring, premium hardwood, Italian marble, and corporate-grade carpeting. Whether you need a highly durable industrial floor or luxurious aesthetic finishes for an executive suite, we have the perfect solution.',
    fullDescUr: 'ہم اعلیٰ معیار کی فلورنگ سروسز فراہم کرتے ہیں، جن میں ونائل فلورنگ، ماربل، اور جدید ٹائل ورک شامل ہیں۔ اپنے دفتر یا گھر کے فرشوں کو ہمارے ساتھ جدید بنائیں۔',
    image: regeneratedImg, // using regenerated image
    features: ['Vinyl & LVT Flooring', 'Italian Marble & Granite', 'Corporate Carpet Tiles', 'Hardwood & Laminate Floors'],
    seoTitle: "Flawless Foundations: Corporate & Luxury Flooring",
    seoTitleUr: "بے عیب بنیادیں: کارپوریٹ اور لگژری فلورنگ",
    seoContent: "Flooring takes the heaviest toll in any structure. We provide resilient, high-traffic flooring solutions ranging from easy-maintenance Vinyl (PVC/LVT) for tech hubs, heavy-duty carpet tiles for silent acoustics, to bespoke Italian Marble and Porcelain Tiles for grand executive spaces. Our certified installers ensure zero-lippage, perfect leveling, and exact cuts.",
    seoContentUr: "آپ کے دفتر کا فرش سب سے زیادہ استعمال ہونے والا حصہ ہے۔ ہم دفاتر کے لیے جدید ونائل (PVC/LVT)، خاموش ماحول کے لیے کارپٹ ٹائلز اور لگژری کمروں کے لیے اٹالین ماربل اور پورسیلین ٹائلز فراہم کرتے ہیں۔ ہمارے ماہرین بالکل ہموار اور صفر خرابی کے ساتھ فرش تیار کرتے ہیں۔",
    ratesTitle: "Flooring Rate Benchmark",
    ratesTitleUr: "فلورنگ کی قیمتوں کا معیار",
    ratesDesc: "Quality commercial Vinyl/LVT flooring generally costs PKR 150 to PKR 250+ per sq.ft depending on wear layer thickness. Porcelain Tile work (including material and expert adhesive setting) ranges from PKR 250 to PKR 500+ per sq.ft. Imported carpet tiles range between 200 to 450 PKR per sq.ft. Final prices depend on the brand chosen.",
    ratesDescUr: "بہترین کمرشل ونائل فلورنگ کی موٹائی کے حساب سے 150 سے 250+ روپے فی مربع فٹ تک لاگت آ سکتی ہے۔ پورسیلین ٹائلز کا کام (مٹیریل اور لیبر کے ساتھ) 250 سے 500+ روپے فی مربع فٹ ہوتا ہے۔ امپورٹڈ کارپٹ ٹائلز 200 سے 450 روپے فی مربع فٹ ہوتی ہیں۔"
  },
  'electric': {
    type: 'renovation',
    title: 'Electric Work',
    titleUr: 'الیکٹریکل ورک',
    desc: 'Smart Lighting, Concealed Wiring & Server setup.',
    romanUrdu: 'Safety k sath androni wiring, smart lightning setup aur heavy database server configuration karwayen. Pakistan Cables k genuine wires aur brand safety switchgears use krtay hain.',
    fullDesc: 'Ensure seamless operations with our professional electrical work services. We handle concealed wiring, smart lighting installations, server room power configurations, and load balancing for commercial and industrial setups. Safety and efficiency are our top priorities.',
    fullDescUr: 'ہم پیشہ ورانہ الیکٹریکل ورک، سمارٹ لائٹنگ، وائرنگ اور سرور روم سیٹ اپ کی بہترین خدمات فراہم کرتے ہیں۔ حفاظت اور کارکردگی ہماری اولین ترجیح ہے۔',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    features: ['Concealed Wiring & Piping', 'Commercial Load Management', 'Server Room Cabling', 'Smart Office Lighting'],
    seoTitle: "Safe, Organized & Heavy-Duty Commercial Electrics",
    seoTitleUr: "محفوظ اور منظم الیکٹریکل سروسز",
    seoContent: "Avoid corporate downtime and hazardous fires caused by poor wiring. We design robust electrical infrastructures that can handle server loads, industrial ACs, and continuous workstation usage. From concealed high-gauge Pakistan Cable wiring and dedicated UPS/Generator DB boards, to sleek aesthetic spotlights and smart switches, we build for safety and scale.",
    seoContentUr: "خراب وائرنگ سے ہونے والے حادثات اور نقصانات سے بچیں۔ ہم سرور لوڈ، انڈسٹریل اے سی اور دفتری کمپیوٹرز کے لیے محفوظ الیکٹریکل نیٹ ورک ڈیزائن کرتے ہیں۔ مستند وائرنگ، سرکٹ بریکرز، یو پی ایس کنکشن اور جدید لائٹنگ تک سب ایک ہی چھت کے نیچے۔",
    ratesTitle: "Electrical Deployment Costs",
    ratesTitleUr: "الیکٹریکل کام کے اخراجات",
    ratesDesc: "Electrical work is usually quoted on a per-point or per-board basis rather than square feet. Standard light/plug points cost between PKR 1,000 to 2,500 in labor. When combined with premium switchgears, raw Pakistan cables, distribution boards and safety breakers, a holistic office estimation requires our engineer's audit.",
    ratesDescUr: "عام طور پر الیکٹریکل کام مربع فٹ کے بجائے فی پوائنٹ پر ماپا جاتا ہے۔ عام لائٹ اور پلگ پوائنٹ کی لیبر 1,000 سے 2,500 روپے کے درمیان ہوتی ہے۔ پریمیم تاریں, ڈسٹریبیوشن بورڈز اور سیفٹی بریکرز کے ساتھ دفتر کے مکمل تخمینے کے لیے ہمارے انجینئر کا معائنہ ضروری ہے۔"
  },
  'wood': {
    type: 'renovation',
    title: 'Wood Work',
    titleUr: 'وڈ ورک',
    desc: 'Custom Designer Tables, Cabinets & Modular Furniture.',
    romanUrdu: 'High-quality designer tables, wooden wardrobes aur customize office cabinets jo saalo saal chalain. Scratch-resistant laminates aur imported components use krtay hain.',
    fullDesc: 'Craftsmanship meets durability in our custom woodworking solutions. We design, build, and install modular office furniture, executive desks, custom cabinetry, and premium wooden partitions. Whether a contemporary minimal style or a traditional heavy corporate look, our artisans bring your vision to life.',
    fullDescUr: 'ہمارا وڈ ورک پائیداری اور خوبصورتی کا بہترین امتزاج ہے۔ ہم درزی ساختہ دفتری فرنیچر، کیبنٹ اور لکڑی کے پارٹیشنز تیار اور نصب کرتے ہیں۔',
    image: 'https://images.unsplash.com/photo-1659930087003-2d64e33181f7?w=1200&auto=format&fit=crop&q=80',
    features: ['Custom Executive Desks', 'Modular Workstations', 'Premium Wall Paneling', 'Bespoke Cabinetry & Storage'],
    seoTitle: "Master Craftsmanship in Office Furniture & Paneling",
    seoTitleUr: "دفتری فرنیچر اور پینلنگ میں ماہر کاریگری",
    seoContent: "From high-density Lasani (MDF) modular workstations with seamless edging to majestic ash-wood executive desks and wall cladding, our woodwork brings warmth and authority to your workspace. We utilize top-grade imported hardware, soft-close channels, and scratch-resistant laminates, ensuring your custom furniture withstands a decade of intense commercial use.",
    seoContentUr: "کمرشل گریڈ کے اعلیٰ فرنیچر سے لے کر پرتعیش ایگزیکٹو ڈیسک اور وال پینلنگ تک، ہمارا وڈ ورک آپ کے دفتر میں جان ڈال دیتا ہے۔ ہم بہترین کوالٹی کا MDF، اوریجنل ہارڈویئر اور سکریچ پروف لیمینیشن استعمال کرتے ہیں تاکہ روزمرہ کے استعمال میں آپ کا فرنیچر سالوں نیا رہے۔",
    ratesTitle: "Woodworking Estimates",
    ratesTitleUr: "وڈ ورک کے اخراجات",
    ratesDesc: "Custom workstations (Linear/L-shape) range from PKR 25,000 to PKR 65,000+ per seat based on partition height and finish. Full-height wooden storage cabinets range from PKR 2,000 to 3,500 per sq.ft of surface area. Decorative louvered wall paneling averages PKR 800 to 1,500 per sq.ft.",
    ratesDescUr: "حسب ضرورت ورک اسٹیشنز اپنے ڈیزائن کے لحاظ سے فی سیٹ 25,000 سے 65,000 روپے کے درمیان تیار ہوتے ہیں۔ پوری اونچائی والے لکڑی کے کیبنٹ سطح کے رقبے کے لحاظ سے 2,000 سے 3,500 روپے فی مربع فٹ ہوتے ہیں۔ آرائشی وال پینلنگ 800 سے 1,500 روپے فی مربع فٹ کے لگ بھگ ہوتی ہے۔"
  },

  // Scrap
  'ac': {
    type: 'scrap',
    title: 'AC & Chillers',
    titleUr: 'اے سی اور Chillers',
    desc: 'Split AC, AHU systems, copper piping.',
    romanUrdu: 'Purane ya used AC, Split units aur heavy chillers becho aur instant cash kamao. State Bank aur NADRA k trusted partner hone k naate, hum on-site digital weighing k sath highest payouts daitay hain.',
    fullDesc: 'We buy all kinds of used, non-functional, or obsolete air conditioning units and chiller plants. From split ACs to massive industrial AHU systems, we provide the best market rates in Pakistan. Turn your defunct cooling equipment and copper piping into instant cash while supporting sustainable recycling efforts.',
    fullDescUr: 'ہم استعمال شدہ یا خراب اے سی اور چِلر پلانٹس بہترین قیمت پر خریدتے ہیں۔ فالتو کولنگ آلات سے فوری نقد رقم حاصل کریں۔',
    image: 'https://images.unsplash.com/photo-1762341123870-d706f257a12e?auto=format&fit=crop&q=80&w=1200',
    features: ['Split & Window ACs', 'Industrial Chiller Plants', 'AHU & HVAC Systems', 'Copper Pipes & Coils'],
    seoTitle: "How We Evaluate AC & HVAC Scrap?",
    seoTitleUr: "ہم پرانے ائیر کنڈیشنر اور چِلر سکریپ کا تخمینہ کیسے لگاتے ہیں؟",
    seoContent: "Air conditioning equipment holds immense value due to its pure copper coils, heavy-duty compressors, and thick aluminum fins. We have a proven track record of clearing massive 500-Ton industrial chiller plants and HVAC systems for top-tier institutions, including State Bank, NADRA, and PIA. We bring our own expert dismantling workforce, load heavy units directly from your site, and offer the highest per-kg or lump-sum payouts instantly.",
    seoContentUr: "ائیر کنڈیشنر اندر موجود تانبے، کمپریسر اور ایلومینیم کے باعث قابل قدر اہمیت رکھتے ہیں۔ ہم نے سٹیٹ بینک، نادرا اور پی آئی اے جیسے نامور اداروں کے بڑے انڈسٹریل چِلر پلانٹس اور اے سی سسٹم کامیابی سے اٹھائے ہیں۔ ہماری ماہر ٹیم موقع پر پہنچ کر خود سارا سامان اتارتی ہے اور بلاتعطل سب سے زیادہ نقد ریٹ ادا کرتی ہے۔",
    ratesTitle: "Copper & Compressor Weight Driving AC Rates",
    ratesTitleUr: "پرانے اے سی کی قیمت تانبے اور کمپریسر پر منحصر ہے",
    ratesDesc: "Rates for split and window ACs heavily depend on whether the copper coils are intact. A standard 1.5 Ton split (indoor + outdoor) generally yields between PKR 8,000 to PKR 15,000 based on weight and market copper prices. Industrial AHUs and chillers are evaluated per kg of combined metal.",
    ratesDescUr: "سپلٹ اور ونڈو اے سی کی قیمتیں بنیادی طور پر تانبے کے کوائل کے محفوظ ہونے پر منحصر ہوتی ہیں۔ عام طور پر، ایک نارمل 1.5 ٹن سپلٹ کی قیمت وزن اور تانبے کی مارکیٹ کی قیمت کے لحاظ سے 8,000 سے 15,000 روپے کے درمیان ملتی ہے۔ انڈسٹریل چِلرز کی جانچ پڑتال فی کلو دھات کے حساب سے کی جاتی ہے۔"
  },
  'furniture': {
    type: 'scrap',
    title: 'Office Furniture',
    titleUr: 'دفتری فرنیچر',
    desc: 'Chairs, tables, workstations.',
    romanUrdu: 'Purane office chairs, workstations, wooden tables aur bulky safe cabinets bulk me sale krain. PTCL aur National Bank k authorized buyer hone k naate hum poori laant bina kisi takleef k aik transaction me clear krtay hain.',
    fullDesc: 'Upgrading your corporate workspace? We buy scrap and used office furniture in bulk. Dispose of old chairs, unneeded workstations, broken desks, and steel cabinets easily. We provide hassle-free pickup and immediate payment, making your office liquidation quick and profitable.',
    fullDescUr: 'اگر آپ اپنا دفتری فرنیچر تبدیل کر رہے ہیں، تو ہم پرانا اور سکریپ فرنیچر تھوک میں خریدتے ہیں۔ پرانی کرسیوں اور میزوں سے نجات پائیں۔',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=1200',
    features: ['Office Chairs & Sofas', 'Corporate Workstations', 'Executive Desks', 'Steel Almirahs & Cabinets'],
    seoTitle: "Bulk Office Furniture Liquidations Made Easy",
    seoTitleUr: "تھوک میں دفتری فرنیچر کی آسان خریداری",
    seoContent: "Relocating or modernizing your office usually involves discarding massive workstations, hundreds of revolving chairs, executive tables, and bulky metal filing cabinets. We have successfully executed giant bulk office furniture liquidations for enterprise giants like Pakistan Stock Exchange, PTCL, and National Bank. Our workforce carefully dismantles heavy cubicles without damaging your premises, buying out the complete lot in one smooth transaction.",
    seoContentUr: "دفتر کی منتقلی کے دوران پرانی کرسیوں، بڑی میزوں، ورک سٹیشنز اور الماریوں کو ٹھکانے لگانا ایک بڑا مسئلہ ہوتا ہے۔ ہم نے پاکستان سٹاک ایکسچینج، پی ٹی سی ایل، اور نیشنل بینک جیسے بڑے اداروں کے لیے سینکڑوں ورک سٹیشنز اور فرنیچر کی کامیاب خریداری کی ہے۔ ہماری لیبر محفوظ طریقے سے تمام مال ایک ہی بار خرید کر جگہ خالی کرتی ہے۔",
    ratesTitle: "How Used Furniture is Priced",
    ratesTitleUr: "پرانے فرنیچر کی قیمت کیسے طے ہوتی ہے؟",
    ratesDesc: "Used standard revolving chairs generally fetch PKR 800 - 2,500 a piece depending on mechanism health. MDF workstations are evaluated by sheer surface area and metal leg frames, often purchased as a bulk lot. Solid steel fire-proof cabinets are weighed and bought at premium iron/steel scrap rates per kg.",
    ratesDescUr: "استعمال شدہ عام کرسیاں حالت کے حساب سے 800 سے 2,500 روپے کے درمیان خریدی جاتی ہیں۔ ورک سٹیشن ان کی شیٹوں اور لوہے کے فریم کے طوالت کے لحاظ سے لاٹ کی صورت میں خریدے جاتے ہیں۔ جبکہ ٹھوس لوہے کی الماریوں کو تول کر لوہے کے سکریپ ریٹ کے حساب سے خریدا جاتا ہے۔"
  },
  'e-waste': {
    type: 'scrap',
    title: 'E-Waste',
    titleUr: 'ای ویسٹ',
    desc: 'Computers, UPS, batteries.',
    romanUrdu: 'Purane servers, towers, networking systems, UPS systems aur dead batteries nikalain. Absolute data security aur modern IT recycling k standard k sath direct high rates paen.',
    fullDesc: 'Responsibly dispose of your electronic waste with our secure IT equipment buying program. We purchase old computers, servers, UPS systems, dead batteries, and electronic scrap. We ensure safe, environmentally compliant handling of all E-waste from corporate liquidations.',
    fullDescUr: 'اپنا پرانا آئی ٹی سامان، کمپیوٹرز، یو پی ایس اور بیٹریاں محفوظ طریقے سے ہمیں فروخت کریں۔ ہم ای ویسٹ کی ذمہ دارانہ ری سائیکلنگ کو یقینی بناتے ہیں۔',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1200',
    features: ['Desktop Servers & Laptops', 'UPS & Inverter Systems', 'Dry & Lead-Acid Batteries', 'IT Network Equipment'],
    seoTitle: "Data-Safe IT & E-Waste Monetization",
    seoTitleUr: "محفوظ آئی ٹی سامان اور ای ویسٹ کا منافع بخش حل",
    seoContent: "E-Waste isn't just trash; it contains valuable precious metals, greenboards, and recyclable plastics. We securely acquire obsolete servers, towers, networking racks, and heavy-duty UPS batteries. Trusted by robust institutions like NADRA, Engro, and State Bank, we prioritize absolute data security during asset clearance. If you haven't destroyed the drives, our team can securely extract them before weighing mothersboards for top-tier scrap payouts.",
    seoContentUr: "ای ویسٹ کچرا نہیں ہے؛ اس میں قیمتی دھاتیں اور الیکٹرانک بورڈز شامل ہیں۔ ہم پرانے سرورز، کمپیوٹرز اور بیٹریاں خریدتے ہیں۔ نادرا، اینگرو اور سٹیٹ بینک جیسے بڑے اداروں نے ہم پر اعتماد کیا ہے۔ ہم ڈیٹا سکیورٹی کے پروٹوکول کو یقینی بناتے ہوئے خراب آئی ٹی سامان کو مارکیٹ کی بہترین قیمت پر خریدتے ہیں۔",
    ratesTitle: "E-Waste Valuation Process",
    ratesTitleUr: "ای ویسٹ کی قیمت کا تعین",
    ratesDesc: "UPS dry batteries (Pb/Lead) are bought strictly by weight at very competitive daily rates. Computer towers are evaluated by motherboards (green boards fetch excellent rates), power supplies, and processors. Server racks are evaluated individually based on weight and internal components. Expect significantly higher returns than regular metal scrap.",
    ratesDescUr: "یو پی ایس کی خشک بیٹریوں (لیڈ/پلاسٹک) کو موجودہ مارکیٹ کے روزانہ ریٹ پر کلو کے حساب سے خریدا جاتا ہے۔ کمپیوٹر کے مدر بورڈ اور پاور سپلائی کی قیمت بھی وزن کے لحاظ سے دی جاتی ہے۔ ای ویسٹ (خاص طور پر سرورز اور لیپ ٹاپس) عام لوہے کی نسبت بہت زیادہ منافع بخش ہوتے ہیں۔"
  },
  'metal': {
    type: 'scrap',
    title: 'Metal Scrap',
    titleUr: 'دھات کا کچرا',
    desc: 'Iron, aluminium, steel.',
    romanUrdu: 'Factory shed, loha, sarya, scrap machinery, aluminum frames aur stainless steel frames dukan ya site se heavy lifting aur on-the-spot payment k sath bechain.',
    fullDesc: 'We offer highly competitive scrap rates for ferrous and non-ferrous metals. Whether it’s iron rebars from demolition, aluminum frames, stainless steel machinery, or brass components, our scrap acquisition team handles bulk lifting from industrial and commercial sites with immediate cash payouts.',
    fullDescUr: 'ہم لوہے، ایلومینیم اور سٹیل کے سکریپ کی بہترین قیمت پیش کرتے ہیں۔ صنعتی سائیٹس سے سکریپ اٹھانے اور فوری ادائیگی کی سہولت دستیاب ہے۔',
    image: 'https://images.unsplash.com/photo-1516382799247-87df95d790b7?auto=format&fit=crop&q=80&w=1200',
    features: ['Iron & Heavy Steel', 'Aluminum Scrap', 'Brass & Copper Items', 'Industrial Demolition Debris'],
    seoTitle: "We Buy Bulk Industrial Metal, Iron & Aluminum Scrap",
    seoTitleUr: "ہم انڈسٹریل دھات، لوہا اور ایلومینیم سکریپ تھوک میں خریدتے ہیں",
    seoContent: "From dismantled factory sheds, rusty iron pipes, and steel beams to premium non-ferrous metals like block brass, and stainless steel—we buy it all under authentic commercial weighing scales. We handle massive structure demolitions and ton-scale metal lifting, successfully partnering with powerhouses like K-Electric and Engro. No middlemen cuts; you get direct, premium industry rates.",
    seoContentUr: "فیکٹریوں کے پرانے شیڈز، زنگ آلود لوہے کے پائپ، ایلومینیم کے دروازے اور سٹین لیس سٹیل کی بھاری مشینری کے ٹکڑے۔ ہم کے-الیکٹرک اور اینگرو جیسے بڑے صنعتی ناموں کا ٹنوں کے حساب سے بھاری دھاتی سکریپ اٹھا چکے ہیں۔ کسی مڈل مین کے بغیر فیکٹری ریٹ پر بڑی مقدار میں سکریپ براہِ راست ڈائریکٹ تول کر خریدتے ہیں۔",
    ratesTitle: "Daily Adjusted Scrap Metal Rates",
    ratesTitleUr: "روزمرہ کے سکریپ میٹل کے ریٹس",
    ratesDesc: "Metal rates fluctuate directly with global commodity markets. Heavy MS (Mild Steel) iron scrap pays solidly per kg. Aluminum (soft, hard, mixed) commands a significantly higher premium. Pure brass and SS (Stainless Steel 304/316) yield outstanding returns per kg. We ensure precise on-site digital weighing.",
    ratesDescUr: "دھاتوں کی قیمت عالمی مارکیٹ کے حساب سے روزانہ تبدیل ہوتی ہے۔ موٹے اور خالص لوہے کی قیمت بہترین ملتی ہے۔ خالص ایلومینیم، پیتل اور سٹین لیس سٹیل (304/316) সাধারণ لوہے کی نسبت بہت زیادہ منافع بخش ہیں۔ ہم موقع پر ڈیجیٹل کانٹے پر درست وزن کر کے رقم کی ادائیگی کرتے ہیں۔"
  },
  'elec': {
    type: 'scrap',
    title: 'Electrical',
    titleUr: 'الیکٹریکل',
    desc: 'Copper wiring, cables.',
    romanUrdu: 'Purani copper cables (bina cheeli hui ya stripped), used transformers aur panels ki highest scrap value paen. K-Electric aur PTCL projects k behtareen direct rates available hain.',
    fullDesc: 'Get top value for old electrical scrap. We rapidly acquire decommissioned cables, power transformers, switchboards, and copper wiring. Our transparent weighing and appraisal process guarantees you receive fair market value based on live scrap rates.',
    fullDescUr: 'پرانے الیکٹریکل سکریپ کی اعلیٰ قیمت حاصل کریں۔ ہم تانبے کی تاریں، ٹرانسفارمرز اور بجلی کا پرانا سامان خریدتے ہیں۔',
    image: 'https://images.unsplash.com/photo-1584774354932-62ceb99e6053?auto=format&fit=crop&q=80&w=1200',
    features: ['Heavy Copper Cables', 'Used Transformers', 'Distribution Panels', 'Electrical Scrap Gear'],
    seoTitle: "The Highest Value in Scrap: Cables, Transformers & Copper",
    seoTitleUr: "سکریپ کا سب سے قیمتی اثاثہ: کیبلز، ٹرانسفارمرز اور تانبا",
    seoContent: "Electrical scrap is the most lucrative category in industrial liquidations. Stripped copper wires, heavy-duty armored cables, defunct panel boards, and commercial oil-filled transformers hold immense value. We have safely extracted thousands of metric tons of electrical scrap for major grids and institutions including K-Electric, PTCL, and National Bank, ensuring optimal core copper valuation.",
    seoContentUr: "انڈسٹریل سکریپ میں الیکٹریکل سامان سب سے زیادہ منافع بخش ہوتا ہے۔ بجلی کی تانبے کی موٹی تاریں اور پرانے ٹرانسفارمرز انتہائی قیمتی ہوتے ہیں۔ ہم کے-الیکٹرک، پی ٹی سی ایل، اور نیشنل بینک جیسے بڑے کلائنٹس کے لیے الیکٹریکل سکریپ کی کامیابی سے خریداری کر چکے ہیں۔ ہم تار کے اندر موجود تانبے کی خالص قیمت ادا کرتے ہیں۔",
    ratesTitle: "Copper & Wire Recovery Pricing",
    ratesTitleUr: "تانبے اور تاروں کی وصولی کی قیمتیں",
    ratesDesc: "Because copper stands as the highest-priced common industrial metal, cables are priced either 'with insulation' based on projected recovery rates or 'stripped bare'. Bare bright copper wire fetches exceptional rates per kg. Transformers are bought generally by weight and core assessment.",
    ratesDescUr: "چونکہ تانبا ایک انتہائی مہنگی عام دھات ہے، لہذا تاروں کی قیمت ان کے موٹائی اور تانبے کی مقدار کے حساب سے لگائی جاتی ہے۔ چھلی ہوئی خالص تانبے کی تار کی قیمت فی کلو بے حد شاندار ہوتی ہے۔ ٹرانسفارمرز کو ان کے وزن اور اندر موجود کور کی مقدار کے حساب سے خریدا جاتا ہے۔"
  },
  'machinery': {
    type: 'scrap',
    title: 'Machinery',
    titleUr: 'مشینری',
    desc: 'Generators, motors, pumps.',
    fullDesc: 'Liquidating heavy industrial assets? We purchase defunct heavy machinery, diesel generators, massive industrial pumps, and electrical motors. Our team comes equipped with the heavy lifting gear required to dismantle and transport massive scrap items smoothly off your premises.',
    fullDescUr: 'ہم بھاری مشینری، جنریٹرز، اور انڈسٹریل موٹرز خریدتے ہیں۔ ہماری ٹیم کرین اور لفٹنگ آلات کے ساتھ خدمات انجام دیتی ہے۔',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1200',
    features: ['Industrial Diesel Generators', 'Heavy Water Pumps', 'Electric Industrial Motors', 'Defunct Plant Machinery'],
    seoTitle: "Industrial Asset Liquidation & Heavy Plant Dismantling",
    seoTitleUr: "انڈسٹریل مشینری، جنریٹرز اور پلانٹس کی کٹائی اور خریداری",
    seoContent: "Dealing with gigantic defunct machinery is a monumental task involving rigorous crane logistics, gas-cutter dismantling, and strict safety measures. We have safely dismantled massive industrial boilers, diesel generators, and outdated processing plants across Pakistan for premium clients including Engro, PIA, and State Bank. We safely extract, cut down, digitally weigh, and pay top industry standards instantly.",
    seoContentUr: "بڑی مشینوں، پلانٹس اور جنریٹرز کو نکالنا ایک مشکل کام ہوتا ہے۔ ہم گیس کٹر، بھاری کرین اور پیشہ ورانہ مہارت کے ساتھ اینگرو، پی آئی اے اور سٹیٹ بینک جیسے نامور کلائنٹس کے درجنوں بڑے بوائلر اور جنریٹر کاٹ اور اٹھا چکے ہیں۔ کام کو انتہائی محفوظ طریقے سے انجام دے کر موقع پر ڈیجیٹل کانٹے کا استعمال کرتے ہوئے مکمل ادائیگی کی جاتی ہے۔",
    ratesTitle: "Machinery Assessment Metrics",
    ratesTitleUr: "بھاری مشینری کی قیمت کیسے بنتی ہے؟",
    ratesDesc: "Industrial machinery involves a blend of MS Iron, cast iron, and valuable internal copper windings (especially in motors and generators). For very heavy equipment, we dispatch an appraiser to give you a lump-sum offer or set an agreed per-kg rate before commencing complex on-site dismantling.",
    ratesDescUr: "بھاری انڈسٹریل مشینری عام لوہے اور اندر موجود قیمتی تانبے (موٹرز اور جنریٹرز میں) کا مرکب ہوتی ہے۔ بڑے پلانٹس کے لیے، ہمارا ماہر موقع پر پہنچ کر مکمل جائزہ لیتا ہے اور کٹائی شروع کرنے سے پہلے ایک واضح پیکج یا فی کلو کا ریٹ طے کر لیا جاتا ہے جو عام لوہے کے ریٹ سے زیادہ ہوتا ہے۔"
  },
  'shifting': {
    type: 'renovation',
    title: 'Professional Lifting & Shifting',
    titleUr: 'پیشہ ورانہ لِفٹنگ اور شفٹنگ',
    desc: 'Safe item lifting, office relocation & professional shifting.',
    fullDesc: 'We provide specialized lifting and shifting services for office relocation, heavy machine moving, and general logistics. Professional renovation solutions to make your business environment modern and impressive.',
    fullDescUr: 'ہم آفس ریلوکیشن، بھاری مشینری کی منتقلی اور جنرل لاجسٹکس کے لیے ماہرانہ لِفٹنگ اور شفٹنگ کی خدمات فراہم کرتے ہیں۔ آپ کے کاروباری ماحول کو جدید اور متاثر کن بنانے کے لیے پریمیم رینوویشن حل۔',
    image: '/src/assets/images/lifting_shifting_service_1781519192459.jpg',
    features: ['Office Relocation', 'Heavy Machine Moving', 'Component Lifting & Positioning', 'Reliable Transportation'],
    seoTitle: "Professional Lifting & Shifting Services",
    seoTitleUr: "پیشہ ورانہ لِفٹنگ اور شفٹنگ کی خدمات",
    seoContent: "Moving items, especially heavy ones, requires professional expertise. We ensure your valuable assets, whether it's office cubicles, machinery, or furniture, are moved with care. Our lifting and shifting service is fully managed with safety, precision, and reliable transportation across your location.",
    seoContentUr: "بھاری سامان کی منتقلی کے لیے مہارت اور احتیاط کی ضرورت ہوتی ہے۔ ہم آپ کے دفتر کے فرنیچر، مشینوں یا دیگر اثاثوں کو پوری حفاظت کے ساتھ منتقل کرتے ہیں۔ ہماری شفٹنگ سروس محفوظ اور قابل اعتماد ہے۔",
    ratesTitle: "Estimated Shifting Rates",
    ratesTitleUr: "شفٹنگ کے تخمینہ جات",
    ratesDesc: "Shifting rates are calculated based on volume, distance, and weight of equipment/goods. For local moves or internal relocations, we provide a competitive day-rate or hourly package. For complex large-scale shifts, site visits are requested to provide a fixed quote.",
    ratesDescUr: "شفٹنگ کے اخراجات سامان کے حجم، وزن اور فاصلے پر منحصر ہیں۔ مقامی منتقلی یا اندرونی شفٹنگ کے لیے ہم مناسب گھنٹہ وار یا ایوریج پیکیج دیتے ہیں۔ بڑے کاموں کے لیے سائٹ کا دورہ ضروری ہے تاکہ حتمی قیمت بتائی جا سکے۔"
  }
};

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  const service = id ? SERVICE_DATA[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24 text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-500 mb-8">The service you are looking for does not exist.</p>
          <Link to="/" className="bg-[#0056b3] text-white px-6 py-3 rounded-lg font-bold">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const isRenovation = service.type === 'renovation';
  const themeColor = isRenovation ? 'blue' : 'green';

  return (
    <div className="pt-20 bg-[#f8f9fa] min-h-screen font-poppins relative">
      <SEO 
        title={`${isUrdu ? service.titleUr : service.title} | Decent Disposal`}
        description={isUrdu ? service.fullDescUr : service.fullDesc}
        url={`https://decentdisposal.pk/service/${id}`}
        image={service.image}
      />
      <motion.button 
        whileHover={{ scale: 1.1, x: isUrdu ? 4 : -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          navigate(-1);
          window.scrollTo(0, 0);
        }}
        className={cn(
          "fixed top-24 z-50 p-2.5 rounded-full bg-black/40 hover:bg-black/65 text-white border border-white/15 hover:border-white/25 backdrop-blur-md transition-all shadow-md flex items-center justify-center",
          isUrdu ? "right-4 md:right-8" : "left-4 md:left-8"
        )}
      >
        <ArrowLeft className={cn("w-5 h-5", isUrdu && "rotate-180")} />
      </motion.button>

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-10 opacity-60"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("max-w-3xl", isUrdu && "ml-auto text-right")}
          >
            <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6", 
              themeColor === 'blue' ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-green-500/20 text-green-300 border border-green-500/30",
              isUrdu && "flex-row-reverse"
            )}>
              {isRenovation ? (isUrdu ? 'پریمیم رینوویشن' : 'Premium Renovation') : (isUrdu ? 'انڈسٹریل سکریپ' : 'Industrial Scrap')}
            </div>
            <h1 className={cn("text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight font-outfit", isUrdu && "urdu-text leading-tight")}>
              {isUrdu ? service.titleUr : service.title}
            </h1>
            <p className={cn("text-xl text-gray-200", isUrdu && "urdu-text")}>
              {service.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content */}
            <div className={cn("lg:col-span-2 space-y-10", isUrdu && "text-right lg:order-last")}>
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100">
                <h2 className={cn("text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase", isUrdu && "urdu-text", 
                  themeColor === 'blue' ? "text-[#0056b3]" : "text-green-700"
                )}>
                  {isUrdu ? "سروس کی تفصیل" : "Service Overview"}
                </h2>
                <p className={cn("text-gray-600 leading-relaxed text-lg mb-8", isUrdu && "urdu-text leading-[1.8]")}>
                  {isUrdu ? service.fullDescUr : service.fullDesc}
                </p>

                {!isUrdu && service.romanUrdu && (
                  <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#64ffda]/5 via-[#64ffda]/10 to-transparent border border-[#64ffda]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#070b14] text-[#64ffda] font-mono font-bold text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                      Aasan Lafzon Me
                    </div>
                    <p className="text-gray-800 font-medium text-base leading-relaxed italic pr-12">
                      "{service.romanUrdu}"
                    </p>
                  </div>
                )}
                <div className="h-px bg-gray-100 w-full mb-8"></div>
                
                <h3 className={cn("text-2xl font-bold text-gray-900 mb-6 font-montserrat", isUrdu && "urdu-text")}>
                  {isUrdu ? "اہم خصوصیات" : "Key Offerings"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {service.features.map((feature: string, idx: number) => (
                    <div key={idx} className={cn("flex items-start gap-4", isUrdu && "flex-row-reverse")}>
                      <CheckCircle className={cn("w-6 h-6 mt-1 shrink-0", 
                        themeColor === 'blue' ? "text-blue-500" : "text-green-500"
                      )} />
                      <span className="text-gray-700 font-semibold text-lg">{feature}</span>
                    </div>
                  ))}
                </div>

                {service.seoTitle && (
                  <div className={cn("bg-gray-50 rounded-2xl p-8 mb-12 border-l-4", 
                    themeColor === 'blue' ? "border-blue-500" : "border-green-500"
                  )}>
                    <h3 className={cn("text-2xl font-bold text-gray-900 mb-4", isUrdu && "urdu-text",
                      themeColor === 'blue' ? "text-[#0056b3]" : "text-green-700"
                    )}>
                      {isUrdu ? service.seoTitleUr : service.seoTitle}
                    </h3>
                    <p className={cn("text-gray-700 leading-relaxed", isUrdu && "urdu-text leading-[1.8]")}>
                        {isUrdu ? service.seoContentUr : service.seoContent}
                    </p>
                  </div>
                )}

                {service.ratesTitle && (
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
                    <h3 className={cn("text-xl font-bold text-gray-900 mb-4 flex items-center gap-3", isUrdu && "urdu-text flex-row-reverse")}>
                      <span className={cn("w-3 h-3 rounded-full", themeColor === 'blue' ? "bg-blue-500" : "bg-green-500")}></span>
                      {isUrdu ? service.ratesTitleUr : service.ratesTitle}
                    </h3>
                    <p className={cn("text-gray-600 leading-relaxed mb-6", isUrdu && "urdu-text leading-[1.8]")}>
                        {isUrdu ? service.ratesDescUr : service.ratesDesc}
                    </p>

                    {!isRenovation && (
                      <Link to="/scrap-rates" className="inline-flex items-center justify-center gap-2 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto mt-2">
                        {isUrdu ? "مکمل سکریپ ریٹس دیکھیں" : "View Live Scrap Rates"}
                        {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Call to Action Box */}
              <div className={cn("rounded-3xl p-8 relative overflow-hidden text-center",
                themeColor === 'blue' ? "bg-gradient-to-br from-[#0056b3] to-[#003d82] text-white" : "bg-gradient-to-br from-green-600 to-green-800 text-white"
              )}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <h3 className="text-2xl font-black mb-4 uppercase">
                  {isUrdu ? "ابھی رابطہ کریں" : "Get a Quote Now"}
                </h3>
                <p className="text-white/80 mb-8 text-sm">
                  {isUrdu ? "بہترین قیمت اور معیاری کام کے لیے ہم سے رابطہ کریں۔" : "Contact us today for the best value and premium services."}
                </p>
                <a 
                  href={`https://wa.me/923152227331?text=${encodeURIComponent(isUrdu ? "ہیلو، میں سروس کے بارے میں معلومات چاہتا ہوں۔" : "Hi, I'm interested in this service: " + (isUrdu ? service.titleUr : service.title))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("w-full block py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-xl text-center",
                    themeColor === 'blue' ? "bg-white text-[#0056b3]" : "bg-white text-green-700"
                  )}
                >
                  {isUrdu ? "تخمینہ حاصل کریں" : "Request an Estimate"}
                </a>
                <div className="mt-6 flex items-center justify-center gap-2 opacity-90">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold">+92 315 222 7331</span>
                </div>
              </div>

              {/* Other Services */}
              <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100">
                <h3 className={cn("text-xl font-black text-gray-900 mb-6 uppercase", isUrdu && "text-right urdu-text")}>
                  {isUrdu ? "دیگر خدمات" : "Other Services"}
                </h3>
                <div className="space-y-4">
                  {Object.keys(SERVICE_DATA).filter(k => k !== id).slice(0, 4).map((key) => {
                    const svc = SERVICE_DATA[key];
                    return (
                      <Link 
                        key={key} 
                        to={`/service/${key}`}
                        className={cn("group flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:border-gray-200 transition-colors hover:bg-gray-50", isUrdu && "flex-row-reverse")}
                      >
                        <span className={cn("font-bold text-gray-700 group-hover:text-black", isUrdu && "urdu-text")}>
                          {isUrdu ? svc.titleUr : svc.title}
                        </span>
                        {isUrdu ? <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-black" /> : <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black" />}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
