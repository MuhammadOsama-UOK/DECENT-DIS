import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
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

const serviceAccount = {
  type: "service_account",
  project_id: "decent-disposal",
  private_key_id: "eb027216cdfde7e26dd3e08ccb8c2d430f1f991d",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDIHkefo2TYBV6a\naZm6CGPPAOLt2jsF3AlJI2oblpP1AYARoLoWY1fmo1+5SjN0VpRE6F3I8/XCtVmg\n3+5z0MkXCSsE7EFxPlPLg+F0Yz2DM6ueXuzyO0FjE7orKmtgWrxLuBHLUvRE/Cqw\nKvHU+lgO9EZRuadw7DQ9PGykwS1UjzBR6PezMryJ9Le7OJsqTl1TVEPCb7/XpBnU\nVXE38mjxdrKBBcblSpJqXe1j5LHPuI1pM2v5tw0MiN9GBMFiP/IIpaQ/MWpKmWre\nuut0/T48CK5lXNMRq2HsORbhzXc0RwvHhzIlRvevKK3flvr4DN3eAnVvE3D7dUYW\nSxLeoCM/AgMBAAECggEAA0oarRzqSFrBJm+KqyxbZ6WviZ4YiS/wkJcGzR8cV97Y\nznFfjD8G5CQztyiMLW6oWxduun8VM6Waw74HrH3fAcocm9OP0I2iRYdpnphVMxAu\n6ozL0Kj5Dl0kd+jQO2aCbGceXH0QaKnjBhzaPSnPlL9ZAI//DShR5yTgCWX+ax+/\n9TUtYtx2fHAl1PXjV3FBjb0eFP3lLrirWYE7PKZIG7838j9oAIeMB65ZN4HN7I5A\nFoOkItOofIh6/dclcRJYrDZnywk8ddGaVHWGmtZr9f8p+2TPUZw4v0RDYT5fyW6b\nimhhoqb1cXF/R9hc+rNHoU0QvNqjqyGO/k5sswJ+cQKBgQD3Qn9PNVpD5LBo4SGA\n23ta1XycWAu3s0A2utSJGv6RdTN4YudROaFtXoAuNZLWkBnaGrglD2W5Hto4FmAF\ngocMSzlyKGULPniGOaWsLOkJAjHLqu7m4ra3Ov9m/KmoiZwT4c85W2dW1KvwXow3\nsz9Tf2J0QHQM04sakJM3BRmpRQKBgQDPMTCdHnsggXh7F2yJgiQ3vsCUuWvaoOdv\nTq6+4QJwNucj0fg/rWjkl64BiaHWdBMeiW/NZKRGchjhvc3dTq8xhXkR5zL6NhxH\nJDtGilSGnUsS242566mTLgaMq00glupASV83BRkzRaHxKa0cUwrx+JQG8qB6ErYI\neHZgrAwoswKBgB+32Qr5Jh4lfPfHQXv9K8LINhb8OGyVQvyCVPdNjjBsn3CnB1Nl\nGC8mezzyRGbfz2EqIksmwX7Q1V9yh1jNmLNcBv987RFXLzDQvk7q5+3u6SJeSA04\nMgYpPFAiw0TKekoWonWSIxyBZZkNF+GhTdNROPj+t6RZkrOSrj/VmKgdAoGAdIPu\nGb2Fcm88yMQQdnfoVC0CceCgRY+M9uxhmthAnchSTbOLjou/XCXsZdL3Xvlhsx+I\n7xF0zGTnlzM87QKNxSSRRD8nTMxXNK6sYuvxws375PvxBKgBcdJFPqAqvHQCAesB\nD5jfZhT3j/5m6nHMyuyGmi2hj2SsV7EeqRi3sb8CgYEA0avQDtXN0MhbhlE6EKeQ\njTwpt8tZhoU8Rk93iD3Sg7zD3HG87/Ik9dgu2gC2T5M4j4ra0f9ABwghFsojz3CO\n3AT/6SFUKJSRk0SQ9eAV1xGpInVyho9lYJccmXuzlMO96TK1ohQeaemoz5qUH+Jf\nrEuw3HOHMSArysljzs9fiio=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@decent-disposal.iam.gserviceaccount.com",
  "client_id": "117530749172829733584",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40decent-disposal.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

async function initAdmin() {
  if (db) return db;
  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    if (getApps().length === 0) {
      initializeApp({
        credential: cert(serviceAccount as any),
        projectId: firebaseConfig.projectId
      });
    }
    
    db = getFirestore();
    const authInstance = getAuth();
    
    // Seed Admin User
    const adminEmail = "decentdisposal12@gmail.com";
    const adminPass = "DarulMadinah";
    
    try {
      const authInstance = getAuth();
      await authInstance.getUserByEmail(adminEmail);
      console.log("Admin user already exists.");
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        await getAuth().createUser({
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

  // Verify SMTP on start
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });
    transporter.verify().then(() => console.log("SMTP Ready")).catch(e => console.error("SMTP Error", e));
  }

  // Logging middleware
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    }
    next();
  });

  // API Routes
  app.post("/api/leads/submit", async (req, res) => {
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
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // Use SSL/TLS
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          debug: true, // Show debug output
          logger: true // Log information in console
        });

        const adminEmail = "decentdisposal12@gmail.com";
        const subject = type === 'renovation' ? "New Renovation Lead!" : "New Scrap Inquiry!";
        
        // Detailed log for debugging
        console.log(`Attempting to send lead emails for type: ${type}`);

        // Handle emails individually so one failure doesn't block the other or go unnoticed
        const sendAdminEmail = async () => {
          try {
            await transporter.sendMail({
              from: `"Decent Disposal Lead" <${process.env.SMTP_USER}>`,
              to: adminEmail,
              subject: subject,
              html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                  <h2 style="color: #1a2e44;">${subject}</h2>
                  <hr />
                  ${Object.entries(data).map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join('')}
                  <hr />
                  <p style="font-size: 12px; color: #666;">Submitted at: ${new Date().toLocaleString()}</p>
                </div>
              `,
            });
            console.log("Admin notification email sent successfully.");
          } catch (e) {
            console.error("ADMIN EMAIL FAILED:", e);
          }
        };

        const sendUserEmail = async () => {
          if (!data.email) return;
          try {
            await transporter.sendMail({
              from: `"Decent Disposal" <${process.env.SMTP_USER}>`,
              to: data.email,
              subject: "Your Request is Now with Karachi's Best - Decent Disposal",
              html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1a2e44; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #efefef; border-radius: 20px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <div style="background: #f1c40f; color: black; display: inline-block; padding: 10px 20px; font-weight: 900; border-radius: 5px; font-size: 24px; margin-bottom: 10px;">DD</div>
                    <h1 style="margin: 0; font-size: 28px; color: #000; letter-spacing: -1px;">THANK YOU FOR REACHING OUT!</h1>
                  </div>
                  <p>Hello <strong>${data.fullName || data.name || 'Valued Partner'}</strong>,</p>
                  <p>We've received your inquiry regarding <strong>${type === 'renovation' ? 'Office Renovation' : 'Scrap Disposal'}</strong>. Our site experts will contact you within <strong>2 business hours</strong>.</p>
                  <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 4px solid #f1c40f;">
                     <p><strong>Trust & Quality:</strong> Karachi's premier choice for asset management.</p>
                  </div>
                  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                  <div style="text-align: center; font-size: 12px; color: #999;">
                    The Decent Disposal Team | SITE, Karachi
                  </div>
                </div>
              `,
            });
            console.log("Customer thank-you email sent successfully.");
          } catch (e) {
            console.error("USER EMAIL FAILED:", e);
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
    console.log("Vite middleware loaded");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
