import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(process.env.CARD_SECRET_KEY),
    iv,
  );

  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([
    encrypted,
    cipher.final(),
  ]);

  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
  };
};