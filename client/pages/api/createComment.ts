// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "n6repj5a",
    useCdn: process.env.NODE_ENC === "production",
    token: process.env.SANITY_AUTH_TOKEN || "skigZooYCBXg1baKwl86xt6TuJU0RbAli5yeLbd0pk3Zcrw5qYDJ8XFLvdsXSSSmWpl7yJhmxD7bAFIR29m4mWqBe1MiJDYwlSXyYdl7jn9aqvdyQJVaNCIc2yjnCrfra5iy5HWDf2qsQkGHHJcuIOAGwNAbiHdKn60e0oXAIMuWHfU3hmcG",
}

const client = sanityClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // res.status(200).json(req.body)
    console.log(req.body)
    const { _id, name, email, comment } = JSON.parse(req.body);
    console.log(_id)


    try {
        await client.create({
            _type: "comment",
            post: {
                _type: 'reference',
                _ref: _id
            },
            name,
            email,
            comment,
        });
        console.log("comment submitted")
        return res.status(200).json({ message: `Comment submitted`})
    } catch(err){
        console.log(err)
        return res.status(500).json({ message: `Couldn't submit comment`, err })
    }
    
}