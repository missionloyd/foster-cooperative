// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const jdenticon = require("jdenticon");

//fs.writeFileSync("./testicon.png", png);
export default async function avatar(req, response) {
   const value = req || "icon value";
   const size = 200;
   let svg = null;
   svg = await jdenticon.toSvg(value, size);

   if(svg) {
     return response.status(200).json({
       svg
     });
   } else {
     return response.status(200).json({
       svg
     });
   }
}

// export default (req, res) => {
//   res.status(200).json({ name: 'John Doe' })
// }