import { RenderableProps } from "preact";
import { useEffect } from "preact/hooks";

type LoginRedirectProps = RenderableProps<{
  to: string;
}>;

export default function LoginRedirect({ to }: LoginRedirectProps) {
  // GitHub auth is intended to run in the browser, not on the server, so we
  // can't do a server-side redirect after authenticating. We'll do a redirect
  // from the frontend instead.
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = to;
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return <div aria-busy="true" className="login"></div>;
}
