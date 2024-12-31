import { auth } from "./auth";



import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    apiAuthPrefix,
    authRoutes
} from "@/lib/routes"



/*
                    node_modules/next-auth/lib/index.d.ts
                export interface NextAuthRequest extends NextRequest {
                    auth: Session | null;
                }

*/

export default auth((req) => {
    const path = req.nextUrl.pathname;
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const isPublicPath = publicRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    
    if(isApiAuthRoute)return
    if(isPublicPath)return
    if(isAuthRoute && !isLoggedIn)return 
    if(!isLoggedIn)return Response.redirect(new URL('/login', nextUrl) )
   
    
    return Response.redirect(new URL('/', nextUrl))
  


    

    

    
})

export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }