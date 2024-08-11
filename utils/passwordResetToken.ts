import * as crypto from 'crypto';
export function generateResetToken() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(resetToken).digest('hex');
  return { resetToken, hash };
}
