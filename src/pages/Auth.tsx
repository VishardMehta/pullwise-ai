import { DottedSurface } from "@/components/DottedSurface";
import { Button } from "@/components/ui/button";
import { Github, GitBranch, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const handleGitHubLogin = () => {
    // GitHub OAuth login logic will go here
    console.log("GitHub login clicked");
  };

  const handleGitLabLogin = () => {
    // GitLab OAuth login logic will go here
    console.log("GitLab login clicked");
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
                className="w-full text-lg py-6 bg-white hover:bg-white/90 text-black"
              >
                <Github className="mr-3 h-6 w-6" />
                Continue with GitHub
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
