import express from 'express'

export default (req: express.Request) => {
  // Note: headers are case insensitive: https://stackoverflow.com/questions/5258977/are-http-headers-case-sensitive

  /**
   * On staging and production, we use CloudFlare which adds a CF-Connecting-IP
   * header with every request which contains only the origin IP
   * https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-CloudFlare-handle-HTTP-Request-headers-.
   */
  if (req.header('CF-Connecting-IP')) {
    return req.header('CF-Connecting-IP')
  }

  /**
   * If CF-Connecting-IP isn't present, we use req.ip.
   * This is automatically parsed from the x-forwarded-for
   * header if we configure app.set('trust proxy').
   */
  return req.ip
}
