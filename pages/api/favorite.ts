import {NextApiRequest, NextApiResponse} from "next";
import prismadb from "../../libs/prismadb";
import serverAuth from "../../libs/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
      
            const { movieId } = req.body;
        
            const existingMovie = await prismadb.movie.findUnique({
              where: {
                id: movieId,
              }
            });
        
            if (!existingMovie) {
              throw new Error('Invalid ID');
            }
        
            const user = await prismadb.user.update({
              where: {
                email: currentUser.email || '',
              },
              data: {
                favoriteIds: {
                  push: movieId
                }
              }
            });
        
            return res.status(200).json(user);
          }
      
  
          
          return res.status(405).end();
          

    } catch (error) {
        console.log(error);
        return res.status(400).end();
        
    }
}