import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  first: string,
  last: string,
  description: string,
  twitter: string,
  instagram: string,
  github: string,
  email: string,
  whatsapp: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const body = req.body
  console.log('body: ', body)

  // Found the name.
  res.json({ first: `${body.first}`, last: `${body.last}`, description: `${body.description}`, twitter: `${body.twitter}`, instagram: `${body.instagram}`, github: `${body.github}`, whatsapp: `${body.whatsapp}`, email: `${body.email}` })
}
