import { NextPageContext } from "next";
import Router from "next/router";
import cookie from "cookie";

export const isBrowser = typeof window !== "undefined";


export const useCookieParser = (req: any) => cookie.parse(req ? req.headers.cookie || "" : document.cookie);

export const redirectUnAuthenticatedSSR = async (context: NextPageContext) => {
  const { req, res, asPath } = context;

  const isServer = !!req;
  const isBrowser = !req;

  // FIXME: use correct method naming
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useCookieParser(req);

  if (isServer) {
      if (!data.ga_token) {
          res?.writeHead(302, {
              Location: `/login?from=${encodeURIComponent(asPath || "/")}`,
          });
          res?.end();
      }
  }
  if (isBrowser) {
      if (!data.ga_token)
          await Router.replace(`/login?from=${encodeURIComponent(asPath || "/")}`);
  }

  return { userAuth: { auth: data.ga_token ? true : null } };
};