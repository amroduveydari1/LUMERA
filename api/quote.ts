import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      email,
      phone,
      quantity,
      finish,
      message,
      productName,
      productPrice,
      productSlug,
    } = req.body;

    // Basic validation
    if (!fullName || !email || !message || !productName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

    const { data, error } = await resend.emails.send({
      from: 'LUMÉRA Quotes <quotes@amrostudio.co>', // Note: This usually needs a verified domain in Resend
      to: ['hello@amrostudio.co'],
      subject: `New Quote Request – ${productName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #141414; background-color: #F3F1EE;">
          <h1 style="font-size: 24px; letter-spacing: 0.2em; text-transform: uppercase; border-bottom: 1px solid #141414; padding-bottom: 20px; margin-bottom: 30px;">LUMÉRA Inquiry</h1>
          
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #8E9299; margin-bottom: 10px;">Product Details</h2>
            <p style="font-size: 18px; margin: 0;"><strong>${productName}</strong></p>
            <p style="font-size: 14px; color: #8E9299; margin: 5px 0 0 0;">Price: ${productPrice}</p>
            <p style="font-size: 12px; color: #8E9299; margin: 5px 0 0 0;">Slug: ${productSlug}</p>
          </div>

          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #8E9299; margin-bottom: 10px;">Client Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid rgba(20,20,20,0.1); font-size: 14px; color: #8E9299;">Name</td>
                <td style="padding: 8px 0; border-bottom: 1px solid rgba(20,20,20,0.1); font-size: 14px; text-align: right;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid rgba(20,20,20,0.1); font-size: 14px; color: #8E9299;">Email</td>
                <td style="padding: 8px 0; border-bottom: 1px solid rgba(20,20,20,0.1); font-size: 14px; text-align: right;"><a href="mailto:${email}" style="color: #141414; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid rgba(20,20,20,0.1); font-size: 14px; color: #8E9299;">Phone</td>
                <td style="padding: 8px 0; border-bottom: 1px solid rgba(20,20,20,0.1); font-size: 14px; text-align: right;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid rgba(20,20,20,0.1); font-size: 14px; color: #8E9299;">Quantity</td>
                <td style="padding: 8px 0; border-bottom: 1px solid rgba(20,20,20,0.1); font-size: 14px; text-align: right;">${quantity}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid rgba(20,20,20,0.1); font-size: 14px; color: #8E9299;">Finish</td>
                <td style="padding: 8px 0; border-bottom: 1px solid rgba(20,20,20,0.1); font-size: 14px; text-align: right;">${finish || 'Standard'}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #8E9299; margin-bottom: 10px;">Message</h2>
            <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid rgba(20,20,20,0.05); font-size: 14px; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="border-top: 1px solid rgba(20,20,20,0.1); padding-top: 20px; margin-top: 40px;">
            <p style="font-size: 10px; color: #8E9299; text-transform: uppercase; letter-spacing: 0.05em;">
              Submitted at: ${timestamp} UTC
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('API error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
