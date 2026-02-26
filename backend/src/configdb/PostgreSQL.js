import pg from "pg"; 
const { Client } = pg;
import dotenv from 'dotenv';
dotenv.config();

const config = {
  user: "avnadmin",


  password: process.env.DB_PASSWORD,
  host: "pg-3b8640b5-riteshsoni1138-a574.h.aivencloud.com",
  port: 17295,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIERDCCAqygAwIBAgIUDZ5RbgqLa/H8E8od+EkwN0HxjbAwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNGFlNGZkMmItYzg4NC00MDk1LTg4YWUtODkzNzdkNjU5
MmQ1IFByb2plY3QgQ0EwHhcNMjYwMjI1MTIzODMzWhcNMzYwMjIzMTIzODMzWjA6
MTgwNgYDVQQDDC80YWU0ZmQyYi1jODg0LTQwOTUtODhhZS04OTM3N2Q2NTkyZDUg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAItjhyfb
MPJQtKpptfuomg/V9PQ2OpTWmQpfNRazI/Jjg4C2P1o5LUeHN+lVS8k5hS+dh0Ex
Xu0zK8jpE9cSRseTA7q3KmujziQD5dIGaaFQhijOIBcTILcXGW10iBREAsm7zYgl
rGoAq4T4AYojynPSwYKwligu9Fs2jR5GjgCmjC5PRKAkNeN6n1Yv9qiE6s7tXELX
E3jVbE4AaY02l8p5M/HJIxeQVl+8+KWwa0XomGI/pJebTW7iQnMlOfkYjToJpzSl
y+0K+p7mgfEEgKnN3rD35XaT84PIp7M5y8dYf/QvHWG5PF9DfIDtVBE0zItk6KFp
NsmDIqAotMkcQUf3SE850XSXjLGhOu+9xqHdQ4Z/2rH3rnRs8RwgBjZs2vsz3wv+
MCXQXrVuwTQ9l7cgXuAuxQ2CqaARTo3Ia/Va+f8YQDcYd1TytvaJeCvN2cw8kdLC
PnI514bU1E0k2NyeDrcjNwJx2EK9aP13JFiCgWY9itpepRTRW25oofoPxwIDAQAB
o0IwQDAdBgNVHQ4EFgQUoH6K+NvegzodLs4OyDmCcOHSb1kwEgYDVR0TAQH/BAgw
BgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAAIJKUhLHsKi
OHAJPOBMTR1iM1+qONB/1ua/d8PdL0CxhZCI/M55mCuNks+38++zEujg0fqio/nn
ubRPFxUL2WtrYbqqhDkpeS2dZtDHrUwLT1wkzZwM8tVMWrP2wAcdYxTSCcaUe4Xx
iE0U/lbP5Jmfa1wfTaCjc8gXjOh6pfpAO2qgYhw4An/Pf3bpbqoGLbHEA9riMQu2
GHofl/e0cxgnl+AiB68EvSRgR2Hruz++yfRnLONRcYS/Nojv2K5JRyoQnjDt9IxA
2IgeUKU4Va1Z+sdV6QqeNZjDfa/pgoSQ6Jdi7K20fBeOMzMKwZwhhp9g3psRIXjX
OzgNG67KNriXXeY1jZ8TameyQsmhO8hl7/xv6zOw3uiRbKJFExpapiA3KfLXuRMp
DGK+MljbpU2j5pJMRAJ41s81QBvoVdolbbouctHIknW/GNthOG7ia3JOB8Urtx3/
hNbjLRwgwrn/Kf2PtoANTrrmO+sPS2zllZY/EUiReMQIoJ14SEctKg==
-----END CERTIFICATE-----`,
  },
};

const client = new Client(config);


const connectToDatabase = () => {
  client.connect(function (err) {
    if (err) {
      console.error("Error connecting to PostgreSQL database:", err.message);
      throw err;
    }
    console.log("Connected to PostgreSQL database successfully.");
    client.query("SELECT VERSION()", [], function (err, result) {
      if (err) {
        console.error("Error executing query:", err.message);
        throw err;
      }
      console.log("PostgreSQL Version:", result.rows[0].version);
    });
  });
};


export { client, connectToDatabase };

