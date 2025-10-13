import { DottedSurface } from "@/components/DottedSurface";
import { Button } from "@/components/ui/button";
import { Github, GitBranch, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/profile");
      }
    };
    checkUser();
  }, [navigate]);

  const handleGitHubLogin = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/profile`,
          scopes: 'read:user user:email',
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "Failed to sign in with GitHub",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleGitLabLogin = () => {
    toast({
      title: "Coming Soon",
      description: "GitLab authentication will be available soon",
    });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dotted Surface Background */}
      <DottedSurface />

      {/* Content */}
      <div className="relative z-10">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white/70 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Auth Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Welcome to PullWise
              </h1>
              <p className="text-lg text-white/60">
                Connect your Git provider to get started
              </p>
            </div>

            <div className="space-y-4 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              {/* GitHub Login */}
              <Button
                size="lg"
                onClick={handleGitHubLogin}
                disabled={loading}
                className="w-full text-lg py-6 bg-white hover:bg-white/90 text-black"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Github className="mr-3 h-6 w-6" />
                    Continue with GitHub
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black text-white/40">OR</span>
                </div>
              </div>

              {/* GitLab Login */}
              <Button
                size="lg"
                onClick={handleGitLabLogin}
                className="w-full text-lg py-6 bg-[#FC6D26] hover:bg-[#FC6D26]/90 text-white"
              >
                <GitBranch className="mr-3 h-6 w-6" />
                Continue with GitLab
              </Button>
            </div>

            {/* Terms */}
            <p className="text-center text-sm text-white/40 mt-8">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Auth;
