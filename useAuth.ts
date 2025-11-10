import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'student' | 'kitchen' | 'library'; // ✅ CORRIGIDO: Adicionado 'library'
  avatar_url?: string;
  class?: string;
  subject?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function now accepts an optional session to avoid redundant calls
    const fetchProfileForSession = async (currentSession: Session | null) => {
      setLoading(true);
      setSession(currentSession);

      if (currentSession?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profile:", profileError.message);
        } else if (profile) {
          // Type assertion to satisfy strict mode
          setUser(profile as User);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      fetchProfileForSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Re-fetch profile when auth state changes (e.g., login/logout)
      // Pass the session from the event directly to the function
      fetchProfileForSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const authApi = {
    signIn: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password }),
    signUp: (email: string, password: string, fullName: string, role: User['role']) =>
      supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      }),
    signOut: () => supabase.auth.signOut(),
  };

  return { user, session, loading, ...authApi };
};