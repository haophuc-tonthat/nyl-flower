import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import { google, sheets_v4 } from 'googleapis';
import nodemailer from 'nodemailer';

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Lấy thông tin xác thực từ biến môi trường
const credentials = {
  type: process.env.GOOGLE_SHEETS_TYPE,
  project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
  private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.GOOGLE_SHEETS_CLIENT_X509_CERT_URL
};

if (!credentials.private_key || !credentials.client_email) {
  throw new Error('Missing Google Sheets credentials');
}

// Hàm định dạng thời gian theo kiểu Việt Nam
function formatVietnameseDateTime(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// Template email cơ bản
const emailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TIỆM HOA CINH NYL</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 0;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #e593cd;
      color: white;
      padding: 30px 20px;
      text-align: center;
      border-bottom: 4px solid #d17db3;
    }
    .header h1 {
      font-family: 'Montserrat', sans-serif;
      font-size: 28px;
      font-weight: 700;
      margin: 0;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .content {
      background-color: white;
      padding: 40px;
    }
    .info-box {
      background-color: #fdf9f0;
      border: 1px solid #e593cd;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
      border-top: 1px solid #f0f0f0;
    }
    .button {
      display: inline-block;
      background-color: #e593cd;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      margin: 30px 0;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #d17db3;
    }
    .details {
      margin: 30px 0;
    }
    .details h3 {
      font-family: 'Playfair Display', serif;
      color: #333;
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: 700;
    }
    .details p {
      margin: 8px 0;
      font-size: 15px;
    }
    .label {
      font-weight: 500;
      color: #666;
      min-width: 120px;
      display: inline-block;
    }
    h2 {
      font-family: 'Playfair Display', serif;
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
      font-weight: 700;
    }
    .copyright {
      font-size: 11px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>TIỆM HOA CINH NYL</h1>
    </div>
    <div class="content">
      ${content}
      <div class="footer">
        <p class="copyright">© 2024 TIỆM HOA CINH NYL. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Hàm gửi email
async function sendEmail(subject: string, html: string) {
  const adminEmail = await getAdminEmail();
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: adminEmail,
    subject: subject,
    html: emailTemplate(html),
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

interface SheetProperties {
  title: string;
  sheetId: number;
}

interface Sheet {
  properties: SheetProperties;
}

interface SheetsResponse {
  data: {
    sheets: Sheet[];
  };
}

async function appendToSheet(sheetName: string, data: string[]) {
  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    // Thêm dữ liệu mới
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:H`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [data],
      },
    });

    // Tự động điều chỉnh độ rộng cột
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: await getSheetId(sheets, sheetName),
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: data.length
              }
            }
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}

// Hàm phụ trợ để lấy sheetId
async function getSheetId(sheets: sheets_v4.Sheets, sheetName: string) {
  const response = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
    fields: 'sheets.properties'
  }) as SheetsResponse;

  const sheet = response.data.sheets.find((s) => s.properties.title === sheetName);
  return sheet?.properties.sheetId ?? 0;
}

// Hàm lấy admin email từ API contact
async function getAdminEmail(): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`);
    const data = await response.json();
    
    if (!data.data || !data.data.email) {
      throw new Error('No admin email found in contact info');
    }
    
    return data.data.email;
  } catch (error) {
    console.error('Error fetching admin email:', error);
    // Fallback to environment variable if API fails
    return process.env.ADMIN_EMAIL || 'admin@cinhnyl.com';
  }
}

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();

    if (type === 'order') {
      const rowData = [
        formatVietnameseDateTime(new Date()),
        data.fullName,
        data.phone,
        data.email,
        data.address,
        data.note,
        data.productName,
        data.productPrice,
      ];
      await appendToSheet('Orders', rowData);

      // Gửi email thông báo đơn hàng
      const emailContent = `
        <h2>Đơn hàng mới từ ${data.fullName}</h2>
        <div class="info-box">
          <p><span class="label">Thời gian:</span> ${rowData[0]}</p>
          <p><span class="label">Sản phẩm:</span> ${data.productName}</p>
          <p><span class="label">Giá:</span> ${data.productPrice}</p>
        </div>
        <div class="details">
          <h3>Thông tin khách hàng</h3>
          <p><span class="label">Họ tên:</span> ${data.fullName}</p>
          <p><span class="label">Số điện thoại:</span> ${data.phone}</p>
          <p><span class="label">Email:</span> ${data.email}</p>
          <p><span class="label">Địa chỉ:</span> ${data.address}</p>
          <p><span class="label">Ghi chú:</span> ${data.note || 'Không có'}</p>
        </div>
        <a href="mailto:${data.email}" class="button">Trả lời khách hàng</a>
      `;
      await sendEmail(`Đơn hàng mới từ ${data.fullName}`, emailContent);

    } else if (type === 'contact') {
      const rowData = [
        formatVietnameseDateTime(new Date()),
        data.name,
        data.email,
        data.message,
      ];
      await appendToSheet('Contacts', rowData);

      // Gửi email thông báo liên hệ
      const emailContent = `
        <h2>Tin nhắn liên hệ mới từ ${data.name}</h2>
        <div class="info-box">
          <p><span class="label">Thời gian:</span> ${rowData[0]}</p>
        </div>
        <div class="details">
          <h3>Thông tin người gửi</h3>
          <p><span class="label">Họ tên:</span> ${data.name}</p>
          <p><span class="label">Email:</span> ${data.email}</p>
          <h3>Nội dung tin nhắn</h3>
          <p>${data.message}</p>
        </div>
        <a href="mailto:${data.email}" class="button">Trả lời tin nhắn</a>
      `;
      await sendEmail(`Tin nhắn liên hệ từ ${data.name}`, emailContent);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
} 