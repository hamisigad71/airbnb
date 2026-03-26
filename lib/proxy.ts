import { auth } from '@/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Protected routes based on role
  if (pathname.startsWith('/guest') && isLoggedIn) {
    if (req.auth?.user?.role !== 'guest' && req.auth?.user?.role !== 'admin') {
      return Response.redirect(new URL('/auth/login', req.nextUrl));
    }
  }

  if (pathname.startsWith('/host') && isLoggedIn) {
    if (req.auth?.user?.role !== 'host' && req.auth?.user?.role !== 'admin') {
      return Response.redirect(new URL('/auth/login', req.nextUrl));
    }
  }

  if (pathname.startsWith('/admin') && isLoggedIn) {
    if (req.auth?.user?.role !== 'admin') {
      return Response.redirect(new URL('/auth/login', req.nextUrl));
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith('/auth') && isLoggedIn) {
    const role = req.auth?.user?.role;
    if (role === 'guest') return Response.redirect(new URL('/guest', req.nextUrl));
    if (role === 'host') return Response.redirect(new URL('/host', req.nextUrl));
    if (role === 'admin') return Response.redirect(new URL('/admin', req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
