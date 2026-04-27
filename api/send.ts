import { Resend } from "resend";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Service account from server.ts
const serviceAccount = {
  type: "service_account",
  project_id: "decent-disposal",
  private_key_id: "eb027216cdfde7e26dd3e08ccb8c2d430f1f991d",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDIHkefo2TYBV6a\naZm6CGPPAOLt2jsF3AlJI2oblpP1AYARoLoWY1fmo1+5SjN0VpRE6F3I8/XCtVmg\n3+5z0MkXCSsE7EFxPlPLg+F0Yz2DM6ueXuzyO0FjE7orKmtgWrxLuBHLUvRE/Cqw\nKvHU+lgO9EZRuadw7DQ9PGykwS1UjzBR6PezMryJ9Le7OJsqTl1TVEPCb7/XpBnU\nVXE38mjxdrKBBcblSpJqXe1j5LHPuI1pM2v5tw0MiN9GBMFiP/IIpaQ/MWpKmWre\nuut0/T48CK5lXNMRq2HsORbhzXc0RwvHhzIlRvevKK3flvr4DN3eAnVvE3D7dUYW\nSxLeoCM/AgMBAAECggEAA0oarRzqSFrBJm+KqyxbZ6WviZ4YiS/wkJcGzR8cV97Y\nznFfjD8G5CQztyiMLW6oWxduun8VM6Waw74HrH3fAcocm9OP0I2iRYdpnphVMxAu\n6ozL0Kj5Dl0kd+jQO2aCbGceXH0QaKnjBhzaPSnPlL9ZAI//DShR5yTgCWX+ax+/\n9TUtYtx2fHAl1PXjV3FBjb0eFP3lLrirWYE7PKZIG7838j9oAIeMB65ZN4HN7I5A\nFoOkItOofIh6/dclcRJYrDZnywk8ddGaVHWGmtZr9f8p+2TPUZw4v0RDYT5fyW6b\nimhhoqb1cXF/R9hc+rNHoU0QvNqjqyGO/k5sswJ+cQKBgQD3Qn9PNVpD5LBo4SGA\n23ta1XycWAu3s0A2utSJGv6RdTN4YudROaFtXoAuNZLWkBnaGrglD2W5Hto4FmAF\ngocMSzlyKGULPniGOaWsLOkJAjHLqu7m4ra3Ov9m/KmoiZwT4c85W2dW1KvwXow3\nsz9Tf2J0QHQM04sakJM3BRmpRQKBgQDPMTCdHnsggXh7F2yJgiQ3vsCUuWvaoOdv\nTq6+4QJwNucj0fg/rWjkl64BiaHWdBMeiW/NZKRGchjhvc3dTq8xhXkR5zL6NhxH\nJDtGilSGnUsS242566mTLgaMq00glupASV83BRkzRaHxKa0cUwrx+JQG8qB6ErYI\neHZgrAwoswKBgB+32Qr5Jh4lfPfHQXv9K8LINhb8OGyVQvyCVPdNjjBsn3CnB1Nl\nGC8mezzyRGbfz2EqIksmwX7Q1V9yh1jNmLNcBv987RFXLzDQvk7q5+3u6SJeSA04\nMgYpPFAiw0TKekoWonWSIxyBZZkNF+GhTdNROPj+t6RZkrOSrj/VmKgdAoGAdIPu\nGb2Fcm88yMQQdnfoVC0CceCgRY+M9uxhmthAnchSTbOLjou/XCXsZdL3Xvlhsx+I\n7xF0zGTnlzM87QKNxSSRRD8nTMxXNK6sYuvxws375PvxBKgBcdJFPqAqvHQCAesB\nD5jfZhT3j/5m6nHMyuyGmi2hj2SsV7EeqRi3sb8CgYEA0avQDtXN0MhbhlE6EKeQ\njTwpt8tZhoU8Rk93iD3Sg7zD3HG87/Ik9dgu2gC2T5M4j4ra0f9ABwghFsojz3CO\n3AT/6SFUKJSRk0SQ9eAV1xGpInVyho9lYJccmXuzlMO96TK1ohQeaemoz5qUH+Jf\nrEuw3HOHMSArysljzs9fiio=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@decent-disposal.iam.gserviceaccount.com",
  client_id: "117530749172829733584",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40decent-disposal.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

let db: FirebaseFirestore.Firestore | null = null;
function getDb() {
  if (db) return db;
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount as any),
      projectId: serviceAccount.project_id
    });
  }
  db = getFirestore();
  return db;
}

export default async function handler(req: any, res: any) {
  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;
    
    // Save to Firestore
    const adminDb = getDb();
    const docRef = await adminDb.collection('leads').add({
      ...data,
      type: type,
      status: 'new',
      createdAt: new Date().toISOString()
    });

    // We can respond early if Vercel Edge/Serverless functions don't terminate background tasks,
    // but on some Vercel tiers, the function exits immediately when `res.send()` happens, killing background tasks.
    // It's safer to wait for Resend to finish before sending res.status(200).

    let resendResults = null;
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const adminEmail = "decentdisposal12@gmail.com";
      const subject = type === 'renovation' ? "New Renovation Lead!" : "New Scrap Inquiry!";
      
      const adminPromise = resend.emails.send({
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
                <a href="https://wa.me/${data.phone ? (data.phone as string).replace(/[\\s+]/g, '') : ''}" style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold;">Message Client on WhatsApp</a>
              </div>
              <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      }).catch(e => console.error("Admin Email Error:", e));

      let userPromise = Promise.resolve();
      if (data.email) {
        userPromise = resend.emails.send({
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
        }).then(res => res).catch(e => console.error("User Email Error:", e)) as any;
      }
      
      resendResults = await Promise.all([adminPromise, userPromise]);
    } else {
      console.warn("No RESEND_API_KEY environment variable provided.");
    }

    return res.status(200).json({ success: true, id: docRef.id, emails: resendResults });
  } catch (error: any) {
    console.error("API error:", error);
    return res.status(500).json({ success: false, error: error.message || "Internal Server Error" });
  }
}
