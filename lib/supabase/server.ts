// biblioteca/supabase/servidor.ts
import { createServerClient } from "@supabase/ssr";

export const createClient = (req: any, res: any) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies?.[name];
        },
        set(name: string, value: string, options: any) {
          const cookie = `${name}=${value}; Path=/; HttpOnly`;
          res.setHeader("Set-Cookie", cookie);
        },
        remove(name: string) {
          res.setHeader("Set-Cookie", `${name}=; Path=/; Max-Age=0`);
        },
      },
    }
  );

  return supabase;
};
