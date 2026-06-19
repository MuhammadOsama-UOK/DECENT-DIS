import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin (Server-side)
let db: FirebaseFirestore.Firestore | null = null;

async function initAdmin() {
  if (db) return db;
  try {
    let firebaseConfig: any = {};
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } else {
      console.warn("firebase-applet-config.json not found, relying on FIREBASE_SERVICE_ACCOUNT and environment variables.");
    }

    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

    let appInstance;
    if (getApps().length === 0) {
      if (!serviceAccount.project_id && !firebaseConfig.projectId) {
         console.warn("Missing Firebase project ID config. Admin SDK initialization skipped.");
         return null;
      }
      appInstance = initializeApp({
        credential: cert(serviceAccount),
        projectId: firebaseConfig.projectId || serviceAccount.project_id
      });
    } else {
      appInstance = getApps()[0];
    }
    
    db = firebaseConfig.firestoreDatabaseId === '(default)' 
      ? getFirestore(appInstance) 
      : getFirestore(appInstance, firebaseConfig.firestoreDatabaseId);
    const authInstance = getAuth(appInstance);
    
    // Seed Admin User
    const adminEmail = "decentdisposal12@gmail.com";
    const adminPass = "DarulMadinah";
    
    try {
      await authInstance.getUserByEmail(adminEmail);
      console.log("Admin user already exists.");
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        await authInstance.createUser({
          email: adminEmail,
          password: adminPass,
          emailVerified: true,
          displayName: 'Super Admin'
        });
        console.log("Admin user seeded successfully.");
      } else {
        console.warn("Could not check/seed admin user (missing permissions?):", error.message);
      }
    }

    // Seed Site Settings (Pillar 3)
    const settingsCol = db.collection('site_settings');
    const settingsDoc = await settingsCol.doc('contact_info').get();
    if (!settingsDoc.exists) {
      await settingsCol.doc('contact_info').set({
        adminEmail: 'ahmed786awan@gmail.com',
        phone1: '0331 3141853',
        phone2: '0310 2617722'
      });
      console.log("Site settings seeded at site_settings/contact_info");
    }

    // Seed Initial Rates if empty (Pillar 2 - Definitive Karachi List)
    const ratesCol = db.collection('scrap_rates');
    const ratesSnap = await ratesCol.limit(1).get();
    if (ratesSnap.empty) {
      const now = new Date().toISOString();
      const initialRates = [
        { label_en: 'Copper (Pure Tamba)', label_ur: 'پیور تانبا', category: 'Prime Metals', price: 2180, unit: 'kg', previous_price: 2150, lastUpdated: now },
        { label_en: 'Brass (Peetal)', label_ur: 'پیتل', category: 'Prime Metals', price: 1150, unit: 'kg', previous_price: 1150, lastUpdated: now },
        { label_en: 'Aluminum (Sliver)', label_ur: 'سلور', category: 'Prime Metals', price: 540, unit: 'kg', previous_price: 520, lastUpdated: now },
        { label_en: 'Heavy Steel (Loha)', label_ur: 'لوہا (بھاری)', category: 'Iron & Steel', price: 185, unit: 'kg', previous_price: 180, lastUpdated: now },
        { label_en: 'Light Iron (Patri)', label_ur: 'لوہا (پتری)', category: 'Iron & Steel', price: 162, unit: 'kg', previous_price: 165, lastUpdated: now },
        { label_en: 'Dead Battery (Dry/Acid)', label_ur: 'ڈیڈ بیٹری', category: 'Energy', price: 560, unit: 'kg', previous_price: 550, lastUpdated: now },
        { label_en: 'Copper Cable (Gauged)', label_ur: 'کاپر وائرینگ', category: 'Energy', price: 1050, unit: 'kg', previous_price: 1000, lastUpdated: now },
        { label_en: 'Industrial Chiller/AC', label_ur: 'اے سی سکریپ', category: 'E-Waste', price: 25000, unit: 'unit', previous_price: 25000, lastUpdated: now },
        { label_en: 'Server Mainframes', label_ur: 'سرور کیبنٹ', category: 'E-Waste', price: 8500, unit: 'unit', previous_price: 8500, lastUpdated: now },
        { label_en: 'Office Workstation (Alloy)', label_ur: 'ورک سٹیشن', category: 'Corporate', price: 3200, unit: 'unit', previous_price: 3200, lastUpdated: now }
      ];
      for (const r of initialRates) {
        await ratesCol.add(r);
      }
      console.log("Definitive scrap rates seeded.");
    }

    return db;
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
    return null;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Init Firebase Admin
  await initAdmin();

  // Verify Resend on start (optional, but good to know if key exists)
  if (process.env.RESEND_API_KEY) {
    console.log("Resend API Key found. Ready to send emails.");
  } else {
    console.warn("No RESEND_API_KEY found in environment variables. Emails will not be sent.");
  }

  // Logging middleware
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    }
    next();
  });

  // API Routes
  app.post("/api/send", async (req, res) => {
    const { type, data } = req.body;
    
    try {
      const adminDb = await initAdmin();
      if (!adminDb) {
        throw new Error("Firestore Admin not initialized");
      }

      const docRef = await adminDb.collection('leads').add({
        ...data,
        type: type,
        createdAt: new Date().toISOString()
      });

      // Respond to client immediately
      res.status(200).json({ success: true, id: docRef.id });

      // 2. Perform email notifications in background
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const adminEmail = "decentdisposal12@gmail.com";
        const subject = type === 'renovation' ? "New Renovation Lead!" : "New Scrap Inquiry!";
        
        // Detailed log for debugging
        console.log(`Attempting to send lead emails for type: ${type}`);

        // Handle emails individually so one failure doesn't block the other or go unnoticed
        const sendAdminEmail = async () => {
          try {
            const { data: resData, error } = await resend.emails.send({
              from: "onboarding@resend.dev",
              to: adminEmail,
              subject: subject,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #f4f7f6; max-width: 600px; margin: 0 auto; border-radius: 8px;">
                  <div style="background-color: #000000; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                    <h1 style="color: #22c55e; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">${subject}</h1>
                  </div>
                  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">You have received a new lead from the website.</p>
                    <table style="width: 100%; border-collapse: collapse;">
                      ${Object.entries(data).map(([key, value]) => `
                        <tr>
                          <td style="padding: 12px 15px; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 35%; text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1').trim()}</td>
                          <td style="padding: 12px 15px; border-bottom: 1px solid #eee; color: #222;">${value || '-'}</td>
                        </tr>
                      `).join('')}
                    </table>
                    <div style="margin-top: 30px; text-align: center;">
                      <a href="https://wa.me/${data.phone ? data.phone.replace(/[\s+]/g, '') : ''}" style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold;">Message Client on WhatsApp</a>
                    </div>
                    <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">Submitted at: ${new Date().toLocaleString()}</p>
                  </div>
                </div>
              `,
            });
            
            if (error) {
              console.error("ADMIN EMAIL FAILED:", error);
            } else {
              console.log("Admin notification email sent successfully:", resData);
            }
          } catch (e) {
            console.error("ADMIN EMAIL FAILED (Exception):", e);
          }
        };

        const sendUserEmail = async () => {
          if (!data.email) return;
          try {
            const { data: resData, error } = await resend.emails.send({
              from: "onboarding@resend.dev",
              to: data.email,
              subject: "Request Received - Decent Disposal",
              html: `
                <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #f9f9f9; max-width: 600px; margin: 0 auto; border-radius: 8px;">
                  <div style="background-color: #000000; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; font-size: 28px; color: #ffffff; letter-spacing: 1px;">DECENT <span style="color: #22c55e;">DISPOSAL</span></h1>
                  </div>
                  <div style="background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center;">
                    <h2 style="color: #111; margin-top: 0; font-size: 24px;">Thank you for your request!</h2>
                    <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                      Dear <strong>${data.fullName || data.name || 'Valued Client'}</strong>,<br><br>
                      We have successfully received your inquiry regarding <strong>${type === 'renovation' ? 'Office Renovation' : 'Scrap Disposal'}</strong>. Our dedicated experts are reviewing your details and will reach out to you very soon to discuss the next steps.
                    </p>
                    
                    <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin-bottom: 30px; text-align: left; border-radius: 0 8px 8px 0;">
                      <h3 style="color: #166534; margin-top: 0; margin-bottom: 10px; font-size: 18px;">Want a faster response?</h3>
                      <p style="color: #15803d; margin: 0; font-size: 15px; line-height: 1.5;">For immediate assistance or to share pictures of your items/project, please reach out directly to our support team on WhatsApp. Priority is given to WhatsApp inquiries.</p>
                      
                      <div style="margin-top: 20px; text-align: center;">
                        <a href="https://wa.me/923313141853" style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(37, 211, 102, 0.3);">
                          Chat with us on WhatsApp
                        </a>
                      </div>
                    </div>

                    <p style="color: #777; font-size: 14px; line-height: 1.6; text-align: left;">
                      At Decent Disposal, we pride ourselves on providing Karachi's most transparent and professional services. You're in good hands.
                    </p>
                    
                    <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #aaa; margin: 0;">
                      The Decent Disposal Team | SITE, Karachi<br>
                      Call us: 0331 3141853 | 0310 2617722
                    </p>
                  </div>
                </div>
              `,
            });
            
            if (error) {
              console.error("USER EMAIL FAILED:", error);
            } else {
              console.log("Customer thank-you email sent successfully:", resData);
            }
          } catch (e) {
            console.error("USER EMAIL FAILED (Exception):", e);
          }
        };

        sendAdminEmail();
        sendUserEmail();
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: (error as Error).message });
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false // Disable HMR to avoid WebSocket errors in restricted environments
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Fallback for SPA routing in development
    app.get('*', async (req, res, next) => {
      try {
        if (req.path.startsWith('/api')) return next();
        
        // CHANGE: __dirname ki jagah process.cwd() use karein
        const templatePath = path.resolve(process.cwd(), 'index.html');
        const template = fs.readFileSync(templatePath, 'utf-8');
        
        const transformedTemplate = await vite.transformIndexHtml(req.url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).send(transformedTemplate);
      } catch (e) {
        next(e);
      }
    });

    console.log("Vite middleware loaded");
  } else {
    // Production: Serve from dist
    const distPath = path.join(process.cwd(), 'dist');
    const clientPath = path.join(distPath, 'client'); // Often Vite builds to dist/client
  
    // Try to find which one exists
    const finalStaticPath = fs.existsSync(clientPath) ? clientPath : distPath;
  
    app.use(express.static(finalStaticPath));
  
    app.get("*", (req, res, next) => {
      // Don't interfere with API routes
      if (req.path.startsWith('/api')) return next();
    
      const indexPath = path.join(finalStaticPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Frontend build not found.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
